import { z } from "zod";

export const PrioritySchema = z.enum(["High", "Medium", "Low"]);
export const CategorySchema = z.enum([
  "Bug",
  "Billing",
  "Feature Request",
  "General",
]);
export const StatusSchema = z.enum(["Open", "Resolved"]);

export const TicketSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  email: z.string(),
  body: z.string(),
  priority: PrioritySchema,
  category: CategorySchema,
  status: StatusSchema,
  createdAt: z.string(), // ISO String
});

// Extract types from the zod schema

export type Priority = z.infer<typeof PrioritySchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Status = z.infer<typeof StatusSchema>;
export type Ticket = z.infer<typeof TicketSchema>;
