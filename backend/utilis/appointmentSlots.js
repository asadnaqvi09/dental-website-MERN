const Appointment = require('../models/appointmentModel');

const parseDateRange = (dateStr) => {
    const start = new Date(`${dateStr}T00:00:00.000Z`);
    const end = new Date(`${dateStr}T23:59:59.999Z`);
    return { start, end };
};

const formatDate = (date) => new Date(date).toISOString().slice(0, 10);

const buildSlotMap = (appointments) => {
    const slots = {};
    appointments.forEach((item) => {
        if (item.status === 'confirmed') {
            slots[item.time] = { status: 'confirmed' };
        } else if (!slots[item.time] || slots[item.time].status !== 'confirmed') {
            const count = (slots[item.time]?.pendingCount || 0) + 1;
            slots[item.time] = { status: 'pending', pendingCount: count };
        }
    });
    return slots;
};

const getSlotsForDate = async (dateStr, serviceId) => {
    const { start, end } = parseDateRange(dateStr);
    const appointments = await Appointment.find({
        ServiceCategory: serviceId,
        date: { $gte: start, $lte: end },
        status: { $in: ['pending', 'confirmed'] },
    });
    return buildSlotMap(appointments);
};

const emitSlotsUpdated = async (io, date, serviceId) => {
    if (!io || !date || !serviceId) return;
    const dateStr = typeof date === 'string' ? date : formatDate(date);
    io.emit('slots:updated', {
        date: dateStr,
        serviceId: String(serviceId),
    });
};

module.exports = {
    parseDateRange,
    formatDate,
    buildSlotMap,
    getSlotsForDate,
    emitSlotsUpdated,
};
