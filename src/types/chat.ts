
import { z } from "zod";

export const ChatMessageSchema = z.object({
  id: z.string().optional(),
  sender: z.enum(["user", "ai"]),
  message: z.string().min(1),
  timestamp: z.string().optional(),
  sentimentScore: z.number().optional(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema),
});

export const ChatResponseSchema = z.object({
  reply: z.string(),
  sentimentAnalysis: z.object({
    score: z.number(),
    category: z.string(),
  }).optional(),
});

// PHQ-9 categories
export const Phq9CategorySchema = z.enum([
  "interest",
  "depressed",
  "sleep",
  "fatigue",
  "appetite",
  "failure",
  "concentration",
  "psychomotor", 
  "suicidal"
]);

export type Phq9Category = z.infer<typeof Phq9CategorySchema>;

export const Phq9ScoreSchema = z.record(Phq9CategorySchema, z.number().min(0).max(3));

export type Phq9ScoresType = z.infer<typeof Phq9ScoreSchema>;
