const Appointment = require('../models/appointmentModel');
const Service = require('../models/serviceModel');
const validator = require('validator');
const { sendEmail } = require('../utilis/sendEmail');
const { z } = require('zod');
const response = require('../utilis/response');

const appointmentSchema = z.object({
    firstName: z.string().min(3, 'First name must be at least 3 characters'),
    lastName: z.string().optional(),
    email: z.string().email('Invalid email address'),
    phoneNo: z.string().regex(/^03\d{9}$/, 'Phone no must be like 03XXXXXXXXX'),
    ServiceCategory: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    time: z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i, 'Invalid time format (e.g. 10:30 AM)'),
});

const parseDateRange = (dateStr) => {
    const start = new Date(`${dateStr}T00:00:00.000Z`);
    const end = new Date(`${dateStr}T23:59:59.999Z`);
    return { start, end };
};

const formatDate = (date) => new Date(date).toISOString().slice(0, 10);

const sendUserEmail = async (to, subject, html) => {
    try {
        await sendEmail(process.env.ADMIN_EMAIL, subject, html, to);
    } catch (error) {
        console.error('Email failed:', error.message);
    }
};

const createAppointment = async (req, res) => {
    try {
        const data = appointmentSchema.parse(req.body);
        data.firstName = validator.escape(data.firstName);
        data.lastName = validator.escape(data.lastName || '');
        data.email = validator.normalizeEmail(data.email);
        data.phoneNo = validator.escape(data.phoneNo);
        const serviceId = data.ServiceCategory;
        data.ServiceCategory = validator.escape(data.ServiceCategory);
        const appointmentDate = new Date(`${data.date}T12:00:00.000Z`);
        data.date = appointmentDate;
        const isServiceAvail = await Service.findById(serviceId);
        if (!isServiceAvail) {
            return response.error(res, 'Service Category not found', 400);
        }
        const confirmedExists = await Appointment.findOne({
            date: appointmentDate,
            time: data.time,
            ServiceCategory: serviceId,
            status: 'confirmed',
        });
        if (confirmedExists) {
            return response.error(res, 'This time slot is already booked', 400);
        }
        const newAppointment = await Appointment.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNo: data.phoneNo,
            ServiceCategory: serviceId,
            date: appointmentDate,
            time: data.time,
            status: 'pending',
        });
        const adminSubject = `New Appointment Request from ${data.firstName} (${data.email})`;
        const adminHtml = `
            <div style="font-family:sans-serif;">
                <h2>New Appointment Request</h2>
                <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phoneNo}</p>
                <p><strong>Service:</strong> ${isServiceAvail.category}</p>
                <p><strong>Date:</strong> ${formatDate(appointmentDate)}</p>
                <p><strong>Time:</strong> ${data.time}</p>
                <p><strong>Status:</strong> Pending Review</p>
            </div>
        `;
        await sendUserEmail(process.env.ADMIN_EMAIL, adminSubject, adminHtml);
        const userSubject = 'Appointment Request Received - Denture Dental Clinic';
        const userHtml = `
            <div style="font-family:sans-serif;">
                <h2>Request Received</h2>
                <p>Hi ${data.firstName},</p>
                <p>Your appointment request for <strong>${formatDate(appointmentDate)}</strong> at <strong>${data.time}</strong> has been received.</p>
                <p>We will confirm your slot by email once the clinic approves your request.</p>
            </div>
        `;
        await sendUserEmail(data.email, userSubject, userHtml);
        response.success(res, 'Your appointment request has been received. We will confirm by email once approved.', newAppointment, 201);
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ success: false, errors: error.errors });
        }
        response.error(res, 'Internal server error', 500);
        console.log('Error in Appointment Controller:', error.message);
    }
};

const getSlotAvailability = async (req, res) => {
    try {
        const { date, serviceId } = req.query;
        if (!date || !serviceId) {
            return response.error(res, 'date and serviceId are required', 400);
        }
        const { start, end } = parseDateRange(date);
        const appointments = await Appointment.find({
            ServiceCategory: serviceId,
            date: { $gte: start, $lte: end },
            status: { $in: ['pending', 'confirmed'] },
        });
        const slots = {};
        appointments.forEach((item) => {
            if (item.status === 'confirmed') {
                slots[item.time] = { status: 'confirmed' };
            } else if (!slots[item.time] || slots[item.time].status !== 'confirmed') {
                const count = (slots[item.time]?.pendingCount || 0) + 1;
                slots[item.time] = { status: 'pending', pendingCount: count };
            }
        });
        response.success(res, 'Slot availability fetched', slots);
    } catch (error) {
        response.error(res, 'Internal server error', 500);
        console.log('Error in Appointment Controller:', error.message);
    }
};

const getAppointment = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const appointments = await Appointment.find(filter)
            .populate('ServiceCategory', 'price category')
            .sort({ createdAt: -1 });
        response.success(res, 'Appointments fetched successfully', appointments);
    } catch (error) {
        response.error(res, 'Internal server error', 500);
        console.log('Error in Appointment Controller:', error.message);
    }
};

const confirmAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return response.error(res, 'Appointment not found', 404);
        }
        if (appointment.status !== 'pending') {
            return response.error(res, 'Only pending appointments can be confirmed', 400);
        }
        const existingConfirmed = await Appointment.findOne({
            date: appointment.date,
            time: appointment.time,
            ServiceCategory: appointment.ServiceCategory,
            status: 'confirmed',
        });
        if (existingConfirmed) {
            return response.error(res, 'This time slot is already confirmed for another patient', 400);
        }
        appointment.status = 'confirmed';
        appointment.confirmedAt = new Date();
        try {
            await appointment.save();
        } catch (error) {
            if (error.code === 11000) {
                return response.error(res, 'This time slot is already confirmed for another patient', 400);
            }
            throw error;
        }
        const others = await Appointment.find({
            date: appointment.date,
            time: appointment.time,
            ServiceCategory: appointment.ServiceCategory,
            status: 'pending',
            _id: { $ne: appointment._id },
        });
        if (others.length > 0) {
            await Appointment.updateMany(
                {
                    date: appointment.date,
                    time: appointment.time,
                    ServiceCategory: appointment.ServiceCategory,
                    status: 'pending',
                    _id: { $ne: appointment._id },
                },
                {
                    status: 'rejected',
                    rejectedAt: new Date(),
                    adminNote: 'Slot assigned to another patient',
                }
            );
        }
        const service = await Service.findById(appointment.ServiceCategory);
        const confirmHtml = `
            <div style="font-family:sans-serif;">
                <h2>Appointment Confirmed</h2>
                <p>Hi ${appointment.firstName},</p>
                <p>Your appointment on <strong>${formatDate(appointment.date)}</strong> at <strong>${appointment.time}</strong> for <strong>${service?.category || 'dental service'}</strong> has been confirmed.</p>
            </div>
        `;
        await sendUserEmail(appointment.email, 'Appointment Confirmed - Denture Dental Clinic', confirmHtml);
        for (const other of others) {
            const rejectHtml = `
                <div style="font-family:sans-serif;">
                    <h2>Appointment Update</h2>
                    <p>Hi ${other.firstName},</p>
                    <p>Your request for <strong>${formatDate(other.date)}</strong> at <strong>${other.time}</strong> could not be confirmed because the slot was assigned to another patient.</p>
                    <p>Please choose another time on our website.</p>
                </div>
            `;
            await sendUserEmail(other.email, 'Appointment Not Confirmed - Denture Dental Clinic', rejectHtml);
        }
        response.success(res, 'Appointment confirmed successfully', appointment);
    } catch (error) {
        response.error(res, 'Internal server error', 500);
        console.log('Error in Appointment Controller:', error.message);
    }
};

const rejectAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminNote } = req.body;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return response.error(res, 'Appointment not found', 404);
        }
        if (appointment.status !== 'pending') {
            return response.error(res, 'Only pending appointments can be rejected', 400);
        }
        appointment.status = 'rejected';
        appointment.rejectedAt = new Date();
        appointment.adminNote = adminNote || 'Rejected by admin';
        await appointment.save();
        const rejectHtml = `
            <div style="font-family:sans-serif;">
                <h2>Appointment Declined</h2>
                <p>Hi ${appointment.firstName},</p>
                <p>Your appointment request for <strong>${formatDate(appointment.date)}</strong> at <strong>${appointment.time}</strong> was not confirmed.</p>
                ${adminNote ? `<p><strong>Note:</strong> ${adminNote}</p>` : ''}
                <p>Please choose another time on our website.</p>
            </div>
        `;
        await sendUserEmail(appointment.email, 'Appointment Declined - Denture Dental Clinic', rejectHtml);
        response.success(res, 'Appointment rejected successfully', appointment);
    } catch (error) {
        response.error(res, 'Internal server error', 500);
        console.log('Error in Appointment Controller:', error.message);
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return response.error(res, 'Appointment not found', 404);
        }
        response.success(res, 'Appointment deleted successfully', appointment);
    } catch (error) {
        response.error(res, 'Internal server error', 500);
        console.log('Error in Appointment Controller:', error.message);
    }
};

module.exports = {
    createAppointment,
    getSlotAvailability,
    getAppointment,
    confirmAppointment,
    rejectAppointment,
    deleteAppointment,
};
