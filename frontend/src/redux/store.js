import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./features/Service/ServiceSlice";
import appointmentReducer from "./features/Appointment/AppointmentSlice"
import contactReduer from './features/Contact/ContactSlice'

export const store = configureStore({
  reducer: {
    services: serviceReducer,
    appointment: appointmentReducer,
    contact: contactReduer,
  },
});