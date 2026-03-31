import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, ChevronDown, AlertTriangle, Wrench } from "lucide-react";
import { ToolboxModal } from "./Toolbox";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const DISCLAIMER =
  "⚠️ ALMA no reemplaza la atención profesional. Si estás en crisis, llama al 800-10-0024 (Bolivia).";

export function AlmaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !hasStarted) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Bienvenido/a. Soy ALMA 🌿 — Asistente Logoterapéutica bajo la supervisión clínica del Dr. (c) Cristofer, Psicólogo Clínico, Investigador Doctoral y especialista en Logoterapia Avanzada con más de 25 años de experiencia.\n\nEste es un espacio seguro, confidencial y basado en evidencia científica. Estoy aquí para acompañarte en tu bienestar emocional.\n\n¿Cómo te encuentras hoy? Cuéntame con confianza.",
        },
      ]);
      setHasStarted(true);
    }
  }, [isOpen, hasStarted]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const getOrCreateConversation = async (): Promise<number> => {
    if (conversationId) return conversationId;
    const res = await fetch("/api/gemini/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "ALMA Chat" }),
    });
    const data = await res.json();
    setConversationId(data.id);
    return data.id;
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    const almaMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: almaMsgId, role: "assistant", content: "" },
    ]);
    setIsStreaming(true);

    try {
      const convId = await getOrCreateConversation();
      const response = await fetch(`/api/gemini/conversations/${convId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const json = JSON.parse(line.slice(6));
            if (json.done) break;
            if (json.content) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === almaMsgId
                    ? { ...m, content: m.content + json.content }
                    : m
                )
              );
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === almaMsgId
            ? {
                ...m,
                content:
                  "Lo siento, tuve un inconveniente. Si necesitas ayuda urgente, llama al 800-10-0024.",
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ background: "linear-gradient(135deg, #D4A017 0%, #C8860A 100%)" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir ALMA"
      >
        <Bot className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl shadow-2xl overflow-hidden border border-border flex flex-col relative"
            style={{ height: "540px", maxHeight: "calc(100vh - 5rem)" }}
          >
            <ToolboxModal isOpen={toolboxOpen} onClose={() => setToolboxOpen(false)} />
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3 text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #1A56B0 0%, #D4A017 100%)" }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm leading-tight">ALMA</p>
                <p className="text-white/80 text-xs truncate">
                  Asistente Logoterapéutica · Supervisada por Dr. (c) Cristofer
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-start gap-2 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-800 leading-snug flex-1">{DISCLAIMER}</p>
            </div>

            {/* Toolbox bar */}
            <div className="px-4 py-2 border-b border-border bg-background shrink-0 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Herramientas clínicas disponibles</p>
              <button
                onClick={() => setToolboxOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1A56B0, #D4A017)" }}
              >
                <Wrench className="w-3 h-3" />
                Caja de Herramientas
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg, #1A56B0, #D4A017)" }}
                    >
                      A
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content ? (
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    ) : (
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-background border-t border-border shrink-0">
              <div className="flex items-center gap-2 bg-secondary rounded-2xl px-4 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Escribe aquí..."
                  disabled={isStreaming}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isStreaming}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-40"
                  style={{ background: "#D4A017" }}
                  aria-label="Enviar"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-1.5 leading-snug">
                © 2026 FERCRI - Todos los Derechos Reservados | Patente de Biofeedback en Trámite<br />
                Bajo Supervisión del Dr. (c) Cristofer - Científico de la Salud Mental Global Digital
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
