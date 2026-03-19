import { z } from "zod";

export const contactServiceOptions = [
  "web-design",
  "seo",
  "branding",
  "growth",
  "other",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z
    .enum(contactServiceOptions)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value)),
  message: z.string().trim().min(10).max(5000),
  website: z.string().trim().max(0).optional().or(z.literal("")),
  formStartedAt: z.number().int().positive().optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}