import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNo: z
    .string()
    .min(10, "Phone number too short")
    .regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone format"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export default contactSchema;