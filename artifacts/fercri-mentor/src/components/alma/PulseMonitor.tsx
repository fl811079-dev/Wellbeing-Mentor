import { motion } from "framer-motion";

type EmotionalState = {
  id: string;
  emoji: string;
  label: string;
  color: string;
  bg: string;
};

const STATES: EmotionalState[] = [
  { id: "Feliz",    emoji: "😊", label: "Bien",      color: "#2E7D5A", bg: "#F0FDF4" },
  { id: "Neutro",   emoji: "😐", label: "Normal",    color: "#1A56B0", bg: "#EFF6FF" },
  { id: "Ansioso",  emoji: "😰", label: "Ansioso/a", color: "#B07A00", bg: "#FEFCE8" },
  { id: "Triste",   emoji: "😔", label: "Triste",    color: "#5B21B6", bg: "#F5F3FF" },
  { id: "Furioso",  emoji: "😤", label: "Frustrado/a", color: "#B91C1C", bg: "#FEF2F2" },
];

type Props = {
  onSelect: (state: string) => void;
};

export function PulseMonitor({ onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3 }}
      className="mx-2 mb-3 rounded-2xl border border-border bg-background shadow-sm overflow-hidden"
    >
      {/* Header strip */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ background: "linear-gradient(135deg, #1A56B0 0%, #D4A017 100%)" }}
      >
        <span className="text-white text-xs font-bold tracking-wide uppercase">
          📊 Monitor de Pulso Emocional
        </span>
      </div>

      <div className="px-4 py-3">
        <p className="text-xs text-muted-foreground text-center mb-3 leading-snug">
          Para personalizar tu experiencia, ¿cómo te encuentras emocionalmente <strong>en este momento</strong>?
        </p>

        <div className="grid grid-cols-5 gap-1.5">
          {STATES.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className="flex flex-col items-center gap-1 px-1 py-2.5 rounded-xl border-2 transition-all duration-150 hover:scale-105 active:scale-95"
              style={{ borderColor: s.color, background: s.bg }}
            >
              <span className="text-xl leading-none">{s.emoji}</span>
              <span className="text-[10px] font-semibold leading-tight text-center" style={{ color: s.color }}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-2.5 leading-snug">
          Datos anónimos · Solo para estadísticas de impacto clínico
        </p>
      </div>
    </motion.div>
  );
}
