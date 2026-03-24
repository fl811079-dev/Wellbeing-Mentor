import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuál es la diferencia entre psicoterapia y mentoría?",
    answer:
      "La psicoterapia y la mentoría son procesos complementarios pero epistemológicamente distintos. La psicoterapia clínica se orienta al diagnóstico, tratamiento y remisión de condiciones psicopatológicas —como trastornos del estado de ánimo, ansiedad o trauma—, empleando modelos de intervención validados empíricamente en el marco de una relación terapéutica estructurada. La mentoría, en cambio, es un proceso de acompañamiento prospectivo centrado en el potencial: se trabaja sobre competencias, propósito, desarrollo profesional y toma de decisiones estratégicas. En FERCRI, ambas dimensiones se integran desde un enfoque biopsicosocial que reconoce la complejidad del ser humano en su totalidad.",
  },
  {
    question: "¿Cómo contribuye la psicología clínica al equilibrio emocional?",
    answer:
      "La psicología clínica ofrece un marco científico riguroso para comprender los procesos de regulación emocional, identificar patrones cognitivos disfuncionales y promover el bienestar psicológico desde una perspectiva basada en evidencia. A través de modelos como la Terapia Cognitivo-Conductual, la Terapia de Aceptación y Compromiso (ACT) o los enfoques basados en mindfulness, se trabaja activamente sobre la capacidad del individuo para procesar sus emociones, construir resiliencia y establecer una relación más saludable con sus propios estados internos. El equilibrio emocional no es un estado pasivo, sino una habilidad que se desarrolla y fortalece con el acompañamiento adecuado.",
  },
  {
    question: "¿Cuál es su enfoque teórico como psicólogo y mentor con 25 años de experiencia?",
    answer:
      "Mi práctica clínica y de mentoría se sustenta en una perspectiva integradora que articula el modelo cognitivo-conductual de tercera generación, la psicología positiva de Seligman, la neurociencia afectiva y los principios del desarrollo humano adulto. A lo largo de 25 años de ejercicio clínico y académico, he comprendido que cada persona requiere una intervención singular, culturalmente sensible y éticamente comprometida. Rechazo los abordajes reduccionistas: entiendo al individuo como un ser en permanente construcción, influido por su historia vincular, su contexto sociocultural y su proyecto existencial. Este enfoque me permite trabajar con profundidad, precisión y genuino respeto por la singularidad de quien consulta.",
  },
  {
    question: "¿En qué se diferencia el bienestar emocional del bienestar mental? ¿Por qué es importante esta distinción?",
    answer:
      "El bienestar mental hace referencia a un estado amplio de funcionamiento psicológico óptimo, que incluye dimensiones cognitivas, emocionales, conductuales y sociales. El bienestar emocional, en cambio, se centra específicamente en la capacidad del individuo para identificar, comprender, expresar y regular sus emociones de manera adaptativa. Esta distinción es clínicamente relevante porque una persona puede mantener un funcionamiento cognitivo preservado y, sin embargo, experimentar un marcado déficit en su vida afectiva. Trabajar el bienestar emocional implica desarrollar inteligencia emocional, establecer vínculos de apego seguros y cultivar una actitud de autocompasión que, según la investigación contemporánea, constituye uno de los pilares fundamentales de la salud psicológica.",
  },
  {
    question: "¿Cómo sé si necesito psicoterapia, mentoría, o ambas?",
    answer:
      "Esta es una de las preguntas más frecuentes y más importantes que puede hacerse alguien que busca apoyo profesional. Como regla orientadora: si experimentas síntomas que afectan significativamente tu funcionamiento cotidiano —insomnio persistente, ansiedad intensa, estados depresivos, dificultades relacionales graves o secuelas de experiencias traumáticas—, la psicoterapia clínica es el punto de partida indicado. Si, en cambio, te encuentras en un momento de transición vital, buscas claridad sobre tu propósito, deseas potenciar tu rendimiento profesional o fortalecer habilidades de liderazgo desde un lugar emocionalmente saludable, la mentoría puede ser el recurso más pertinente. En muchos casos, ambos procesos se potencian mutuamente. Durante la sesión inicial, realizamos una evaluación comprehensiva para orientarte con rigor y honestidad profesional hacia el proceso que mejor responda a tus necesidades específicas.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4">
              Preguntas frecuentes
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5 leading-tight">
              Respuestas a tus dudas más importantes
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Resolvemos las consultas más comunes sobre psicología clínica, bienestar emocional y mentoría con la seriedad y claridad que mereces.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              25 años de experiencia clínica
            </div>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-border rounded-2xl px-6 bg-background shadow-sm hover:shadow-md transition-shadow duration-200 data-[state=open]:border-primary/30 data-[state=open]:shadow-md data-[state=open]:bg-primary/[0.02]"
                  >
                    <AccordionTrigger className="text-base font-semibold text-foreground py-5 hover:no-underline gap-4 [&[data-state=open]]:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
