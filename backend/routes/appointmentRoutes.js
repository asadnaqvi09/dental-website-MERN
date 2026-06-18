const express = require('express');
const {
    createAppointment,
    getSlotAvailability,
    getAppointment,
    confirmAppointment,
    rejectAppointment,
    deleteAppointment,
} = require('../controllers/appointmentController');
const protectedRoute = require('../middleware/protectedRoute');
const router = express.Router();

router.post('/create-appointment', createAppointment);
router.get('/slot-availability', getSlotAvailability);
router.get('/get-appointment', protectedRoute, getAppointment);
router.patch('/confirm-appointment/:id', protectedRoute, confirmAppointment);
router.patch('/reject-appointment/:id', protectedRoute, rejectAppointment);
router.delete('/delete-appointment/:id', protectedRoute, deleteAppointment);

module.exports = router;
