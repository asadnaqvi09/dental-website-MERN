import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './features/Service/ServiceSlice';
import appointmentReducer from './features/Appointment/AppointmentSlice';
import contactReducer from './features/Contact/ContactSlice';
import authReducer from './features/Admin/authSlice';
import adminAppointmentReducer from './features/Admin/adminAppointmentSlice';
import adminContactReducer from './features/Admin/adminContactSlice';
import adminServiceReducer from './features/Admin/adminServiceSlice';

export const store = configureStore({
    reducer: {
        services: serviceReducer,
        appointment: appointmentReducer,
        contact: contactReducer,
        auth: authReducer,
        adminAppointments: adminAppointmentReducer,
        adminContacts: adminContactReducer,
        adminServices: adminServiceReducer,
    },
});
