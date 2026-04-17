const Appointment = require("../models/appointmentModel");
const Service = require("../models/serviceModel");
const validator = require("validator");
const { sendEmail } = require("../utilis/sendEmail");
const { z } = require("zod");
const response = require('../utilis/response');

const appointmentSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNo: z.string().regex(/^03\d{9}$/, "Phone no must be like 03XXXXXXXXX"),
  ServiceCategory: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  time: z
    .string()
    .regex(
      /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i,
      "Invalid time format (e.g. 10:30 AM)"
    ),
});

const createAppointment = async (req, res) => {
  try {
    const data = appointmentSchema.parse(req.body);

    data.firstName = validator.escape(data.firstName);
    data.lastName = validator.escape(data.lastName || "");
    data.email = validator.normalizeEmail(data.email);
    data.phoneNo = validator.escape(data.phoneNo);
    data.ServiceCategory = validator.escape(data.ServiceCategory);
    data.date = new Date(`${data.date}`);

    const isServiceAvail = await Service.findById(data.ServiceCategory);
    if (!isServiceAvail) {
      return response.error(res, "Service Category not found", 400);
    }
    const isAppointmentExist = await Appointment.findOne({
      date: data.date,
      time: data.time,
      ServiceCategory: data.ServiceCategory,
    });
    if (isAppointmentExist) {
      return response.error(res, "Appointment already booked for this date", 400);
    }
    const newAppointment = await Appointment.create(data);
    const subject = `🦷 New Appointment Request from ${data.firstName} (${data.email})`;
    const html = `
    <div style="font-family:sans-serif;">
    <h2>New Appointment Request</h2>
    <p><strong>First Name:</strong> ${data.firstName}</p>
    <p><strong>Last Name:</strong> ${data.lastName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone No:</strong> ${data.phoneNo}</p>
    <p><strong>Service Category:</strong> ${isServiceAvail.category} </p>
    <p><strong>Date:</strong> ${data.date}</p>
    <p><strong>Time:</strong> ${data.time}</p>
    <br>
    <p style="font-size:14px; color:gray;">
        — This message was sent via the Denture Dental Clinic appointment form.
    </p>
    </div>
    `;
    await sendEmail(process.env.ADMIN_EMAIL, subject, html, data.email);
    response.success(res,"Appointment booked successfully",newAppointment);
  } catch (error) {
    if (error.name === "ZodError") {
    return res.status(400).json({
      success: false,
      errors: error.errors
    });
  }
    response.error(res, "Internal server error", 500);
    console.log("Error in Appoinment Controller : ", error.message);
  }
};

const getAppointment = async (req,res)=> {
  try {
    const appointments = await Appointment.find().populate("ServiceCategory", "price category");
    response.success(res,"Appointments fetched successfully",appointments);
  } catch (error) {
    response.error(res, "Internal server error", 500);
    console.log("Error in Appoinment Controller : ", error.message);
  }
}

const deleteAppointment = async (req,res)=> {
  try {
    const {id} = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return response.error(res, "Appointment not found", 404);
    }
    response.success(res,"Appointment deleted successfully",appointment);
  } catch (error) {
    response.error(res, "Internal server error", 500);
    console.log("Error in Appoinment Controller : ", error.message);
  }
}
module.exports = { createAppointment, getAppointment, deleteAppointment };