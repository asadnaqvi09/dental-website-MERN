const cron = require('node-cron');
const Appointment = require('../models/appointmentModel');

const expirePendingAppointments = async (io) => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);

    const result = await Appointment.updateMany(
        {
            status: 'pending',
            date: { $lt: now },
        },
        {
            $set: { status: 'expired' },
        }
    );

    if (result.modifiedCount > 0) {
        console.log(`Expired ${result.modifiedCount} pending appointment(s)`);
        io?.emit('appointments:expired', { count: result.modifiedCount });
    }

    return result.modifiedCount;
};

const startExpireJob = (io) => {
    cron.schedule('0 * * * *', () => {
        expirePendingAppointments(io).catch((err) => {
            console.error('Expire appointments job failed:', err.message);
        });
    });
    console.log('Expire appointments cron job scheduled (hourly)');
};

module.exports = { startExpireJob, expirePendingAppointments };
