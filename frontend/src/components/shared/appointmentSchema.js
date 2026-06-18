import { z } from 'zod';

const appointmentSchema = z.object({
    firstName: z.string().min(3, 'First name must be at least 3 characters'),
    lastName: z.string().optional(),
    email: z.string().email('Invalid email address'),
    phoneNo: z.string().regex(/^03\d{9}$/, 'Phone must be like 03XXXXXXXXX'),
    ServiceCategory: z.string().min(1, 'Please select a service'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
    time: z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i, 'Please select a valid time'),
});

export default appointmentSchema;
