import { z } from "zod";

const appointmentSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNo: z
    .string()
    .min(10, "Phone number too short")
    .regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone format"),
  ServiceCategory: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
});

export default appointmentSchema;