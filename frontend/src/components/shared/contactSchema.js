import { z } from 'zod';

const contactSchema = z.object({
    firstName: z.string().min(3, 'First name must be at least 3 characters'),
    lastName: z.string().optional(),
    email: z.string().email('Invalid email address'),
    phoneNo: z.string().regex(/^03\d{9}$/, 'Phone must be like 03XXXXXXXXX'),
    message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export default contactSchema;
