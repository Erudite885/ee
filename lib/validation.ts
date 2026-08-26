import { z } from "zod";

/**
 * Contact form schema. Session 13 is UI-only — this schema runs client-side
 * via zodResolver, and gets reused unmodified as the server-side validation
 * in Session 14 when `/api/contact` is built, so the two never drift apart.
 *
 * `website` field is a honeypot — real users never see or fill it (visually
 * hidden, not `display:none`/`type="hidden"`, see ContactForm), so any
 * submission with it populated is almost certainly a bot and gets silently
 * dropped rather than shown a validation error. Named "website" rather than
 * "honeypot" deliberately — bots skip fields with obvious tells.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid work email"),
  companyName: z.string().trim().min(2, "Enter your company name"),
  phone: z.string().trim().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a bit more — at least 20 characters")
    .max(2000, "Keep it under 2000 characters"),
  website: z.string().max(0, "").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
