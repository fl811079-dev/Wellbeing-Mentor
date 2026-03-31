import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const emotionalPulses = pgTable("emotional_pulses", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  emotionalState: text("emotional_state").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertEmotionalPulseSchema = createInsertSchema(emotionalPulses).omit({
  id: true,
  createdAt: true,
});

export type EmotionalPulse = typeof emotionalPulses.$inferSelect;
export type InsertEmotionalPulse = z.infer<typeof insertEmotionalPulseSchema>;
