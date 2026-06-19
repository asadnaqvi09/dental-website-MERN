import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './features/services/servicesSlice';
import appointmentsReducer from './features/appointments/appointmentsSlice';
import contactsReducer from './features/contacts/contactsSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
    reducer: {
        services: servicesReducer,
        appointments: appointmentsReducer,
        contacts: contactsReducer,
        auth: authReducer,
    },
});
