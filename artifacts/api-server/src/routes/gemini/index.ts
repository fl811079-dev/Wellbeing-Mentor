import { Router } from "express";
import { db } from "@workspace/db";
import { conversationsTable, messagesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { ai } from "@workspace/integrations-gemini-ai";

const geminiRouter = Router();

const ALMA_SYSTEM_PROMPT =
  "Eres ALMA, Asistente Logoterapéutica y Mediadora del Aprendizaje, bajo la supervisión clínica del Dr. (c) Cristofer. " +
  "Tu misión es ser un puente de salud mental para comunidades vulnerables. Eres cálida, hablas con lenguaje sencillo y sin tecnicismos. " +
  "Sigues la ética de la APA 7ma edición. Respuestas breves (máximo 3 oraciones). " +
  "Si detectas riesgo de vida, deriva urgentemente a la línea 800-10-0024 en Bolivia.";

geminiRouter.get("/conversations", async (_req, res) => {
  const conversations = await db
    .select()
    .from(conversationsTable)
    .orderBy(conversationsTable.createdAt);
  res.json(conversations);
});

geminiRouter.post("/conversations", async (req, res) => {
  const { title } = req.body as { title?: string };
  const [conv] = await db
    .insert(conversationsTable)
    .values({ title: title ?? "ALMA Chat" })
    .returning();
  res.status(201).json(conv);
});

geminiRouter.get("/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [conv] = await db
    .select()
    .from(conversationsTable)
    .where(eq(conversationsTable.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const messages = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.conversationId, id))
    .orderBy(messagesTable.createdAt);
  res.json({ ...conv, messages });
});

geminiRouter.delete("/conversations/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [conv] = await db
    .select()
    .from(conversationsTable)
    .where(eq(conversationsTable.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  await db.delete(messagesTable).where(eq(messagesTable.conversationId, id));
  await db.delete(conversationsTable).where(eq(conversationsTable.id, id));
  res.status(204).end();
});

geminiRouter.get("/conversations/:id/messages", async (req, res) => {
  const id = parseInt(req.params.id);
  const messages = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.conversationId, id))
    .orderBy(messagesTable.createdAt);
  res.json(messages);
});

geminiRouter.post("/conversations/:id/messages", async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body as { content: string };

  const [conv] = await db
    .select()
    .from(conversationsTable)
    .where(eq(conversationsTable.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  await db.insert(messagesTable).values({
    conversationId: id,
    role: "user",
    content,
  });

  const history = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.conversationId, id))
    .orderBy(messagesTable.createdAt);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  const stream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    config: {
      maxOutputTokens: 8192,
      systemInstruction: ALMA_SYSTEM_PROMPT,
    },
  });

  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) {
      fullResponse += text;
      res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
    }
  }

  await db.insert(messagesTable).values({
    conversationId: id,
    role: "assistant",
    content: fullResponse,
  });

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

export default geminiRouter;
