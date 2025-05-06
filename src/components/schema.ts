import { z } from "zod";

export const simpleEmailSchema = z.object({
    email:z.string().trim().email()
});

export type SimpleEmailingSchema = z.infer<typeof simpleEmailSchema>;

export const contactSchema = z.object({
    email:z.string().trim().email(),
    name:z.string().trim(),
    content:z.string().trim()
});

export type ContactSchema = z.infer<typeof contactSchema>;