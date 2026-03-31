import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wind, Moon, Zap, Flower2, ChevronRight } from "lucide-react";

type Tool = {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  title: string;
  steps: string[];
  closing: string;
};

const WHATSAPP_URL = "https://wa.me/59164544229";

const TOOLS: Tool[] = [
  {
    id: "respiracion",
    icon: <Wind className="w-5 h-5" />,
    label: "Respiración",
    color: "#1A56B0",
    title: "Respiración 4-7-8",
    steps: [
      "Siéntate con la espalda recta y los pies apoyados en el suelo.",
      "Inhala suavemente por la nariz durante 4 segundos.",
      "Retén el aire en tus pulmones durante 7 segundos.",
      "Exhala lentamente por la boca durante 8 segundos.",
      "Repite este ciclo 4 veces consecutivas.",
      "Con cada exhalación, imagina que sueltas lo que ya no necesitas cargar.",
    ],
    closing:
      "Esta técnica activa el sistema nervioso parasimpático y reduce la respuesta de estrés en minutos. Practícala cada vez que sientas que la tensión sube.",
  },
  {
    id: "sueno",
    icon: <Moon className="w-5 h-5" />,
    label: "Sueño",
    color: "#1A3A6B",
    title: "Higiene del Sueño",
    steps: [
      "Define un horario fijo para dormir y despertar, incluso los fines de semana.",
      "Apaga pantallas (teléfono, TV, computadora) 30 minutos antes de acostarte.",
      "Escribe en un papel todo lo que tienes pendiente — vacía tu mente antes de cerrar los ojos.",
      "Mantén tu habitación fresca, oscura y silenciosa.",
      "Evita cafeína después de las 14:00 horas.",
      "Si no puedes dormir en 20 minutos, levántate y realiza una actividad tranquila hasta sentir sueño.",
    ],
    closing:
      "El sueño no es un lujo, es el pilar de tu salud mental. Pequeños cambios en tu rutina nocturna tienen un impacto profundo en tu estado emocional diario.",
  },
  {
    id: "activacion",
    icon: <Zap className="w-5 h-5" />,
    label: "Activación",
    color: "#B07A00",
    title: "Activación Conductual",
    steps: [
      "Elige UNA actividad pequeña que solías disfrutar antes de sentirte así.",
      "No tiene que ser perfecta ni larga. Puede ser: dar 10 minutos de caminata, preparar un té, llamar a alguien que aprecias.",
      "Hazla HOY, aunque no tengas ganas. No esperes sentirte motivado/a.",
      "Al terminar, obsérvate: ¿Cómo te sientes en comparación con antes de hacerla?",
      "Anota en un papel esa diferencia, por pequeña que sea.",
      "Repite mañana con la misma actividad u otra diferente.",
    ],
    closing:
      "Recuerda: la acción no espera al estado de ánimo. El estado de ánimo responde a la acción. Cada pequeño paso rompe el ciclo de la inacción.",
  },
  {
    id: "mindfulness",
    icon: <Flower2 className="w-5 h-5" />,
    label: "Mindfulness",
    color: "#2E7D5A",
    title: "Ancla al Presente",
    steps: [
      "Detente donde estás. No tienes que ir a ningún lugar especial.",
      "Nombra mentalmente 5 cosas que puedes VER a tu alrededor ahora mismo.",
      "Nombra 4 cosas que puedes TOCAR. Toca una de ellas y percibe su textura.",
      "Nombra 3 cosas que puedes ESCUCHAR en este momento.",
      "Nombra 2 cosas que puedes OLER (o recuerda dos aromas que te gusten).",
      "Nombra 1 cosa que puedes SABOREAR, o bebe un sorbo de agua conscientemente.",
    ],
    closing:
      "Esta práctica de anclaje 5-4-3-2-1 interrumpe el ciclo de pensamientos intrusivos y devuelve tu mente al momento presente, donde estás seguro/a.",
  },
];

type ToolboxProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ToolboxModal({ isOpen, onClose }: ToolboxProps) {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleClose = () => {
    setActiveTool(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-10 flex flex-col rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.98)" }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center justify-between text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #1A56B0 0%, #D4A017 100%)" }}
          >
            <div>
              <p className="font-bold text-sm leading-tight">🧰 Caja de Herramientas FERCRI</p>
              <p className="text-white/80 text-xs">Técnicas clínicas breves · Dr. (c) Cristofer</p>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {!activeTool ? (
                /* Tool Grid */
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 grid grid-cols-2 gap-3"
                >
                  <p className="col-span-2 text-xs text-center text-muted-foreground pb-1">
                    Selecciona una técnica para comenzar
                  </p>
                  {TOOLS.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTool(tool)}
                      className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-md text-white"
                      style={{
                        background: tool.color,
                        borderColor: tool.color,
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        {tool.icon}
                      </div>
                      <span className="text-xs font-semibold leading-tight text-center">
                        {tool.label}
                      </span>
                    </button>
                  ))}
                </motion.div>
              ) : (
                /* Tool Detail */
                <motion.div
                  key={activeTool.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 flex flex-col gap-3"
                >
                  <button
                    onClick={() => setActiveTool(null)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
                  >
                    ← Volver
                  </button>

                  {/* Tool title */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white"
                    style={{ background: activeTool.color }}
                  >
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      {activeTool.icon}
                    </div>
                    <p className="font-bold text-sm">{activeTool.title}</p>
                  </div>

                  {/* Steps */}
                  <div className="flex flex-col gap-2">
                    {activeTool.steps.map((step, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                          style={{ background: activeTool.color }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-sm text-foreground leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Closing note */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl px-3.5 py-3 text-xs text-blue-900 leading-relaxed">
                    {activeTool.closing}
                  </div>

                  {/* Brand footer */}
                  <div className="mt-1 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
                    <p className="text-xs text-amber-900 font-medium leading-snug">
                      Si necesitas más apoyo, el Dr. Cristofer está a un clic de distancia.
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-1.5 rounded-full transition-opacity hover:opacity-90"
                      style={{ background: "#25D366" }}
                    >
                      <ChevronRight className="w-3 h-3" />
                      Escribir al Dr. Cristofer
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom bar */}
          <div className="px-4 py-2.5 border-t border-border bg-background shrink-0 text-center">
            <p className="text-xs text-muted-foreground leading-snug">
              © 2026 FERCRI Mentor & Consultor · Patente de Biofeedback en Trámite
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
