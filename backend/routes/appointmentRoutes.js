const express = require('express');
const { createAppointment, getAppointment, deleteAppointment } = require('../controllers/appointmentController');
const  protectedRoute = require('../middleware/protectedRoute');
const router = express.Router();

router.post('/create-appointment', createAppointment);
router.get('/get-appointment', protectedRoute ,getAppointment);
router.delete('/delete-appointment/:id', protectedRoute ,deleteAppointment);

module.exports = router;