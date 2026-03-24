import { motion } from "framer-motion";
import { Quote, ShieldCheck, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "El proceso con el Dr. Fernando Cristian fue transformador en el sentido más riguroso del término. A lo largo de las sesiones, desarrollé herramientas concretas para identificar y regular mis respuestas emocionales ante situaciones de alta demanda profesional. Hoy puedo gestionar el estrés crónico con una eficacia que antes creía inalcanzable. Su enfoque, basado en evidencia y profundamente humano, marca una diferencia real.",
    author: "M. G.",
    role: "Paciente — Proceso de Regulación Emocional",
    stars: 5,
    tag: "Regulación Emocional",
  },
  {
    quote:
      "Llegué a la mentoría con el Dr. Fernando Cristian en un momento de quiebre profesional. La transición hacia un rol de liderazgo me generaba una disonancia interna que no lograba resolver solo. Su acompañamiento me permitió integrar mis valores personales con las exigencias del liderazgo consciente. Hoy dirijo equipos con una presencia y una claridad que no imaginaba posibles. Es un Psicólogo y Mentor de excepción.",
    author: "Dr. R.",
    role: "Profesional de Salud — Mentoría en Liderazgo Consciente",
    stars: 5,
    tag: "Liderazgo Consciente",
  },
  {
    quote:
      "El trabajo sobre identidad profesional que realicé junto al Dr. Fernando Cristian fue uno de los procesos más significativos de mi trayectoria académica. Como investigadora en formación, arrastraba una profunda ambigüedad sobre mi lugar en el campo científico. Su abordaje, que articula psicología clínica con mentoría de alto impacto, me ayudó a construir una identidad profesional sólida, auténtica y sostenida en mis propias fortalezas.",
    author: "L. M.",
    role: "Investigadora — Mentoría en Identidad Profesional",
    stars: 5,
    tag: "Identidad Profesional",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Experiencias de Transformación Real
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Relatos de pacientes y profesionales que han transitado procesos de cambio significativo junto al Dr. Fernando Cristian, Psicólogo Clínico y Mentor.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-background border border-border rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Tag */}
              <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-5">
                {t.tag}
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-5 text-amber-400">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-7 h-7 text-primary/20 mb-3 shrink-0" />

              {/* Quote text */}
              <p className="text-muted-foreground text-base leading-relaxed flex-1 mb-8">
                {t.quote}
              </p>

              {/* Author */}
              <div className="border-t border-border/60 pt-5">
                <div className="font-display font-bold text-foreground">{t.author}</div>
                <div className="text-muted-foreground text-sm mt-0.5">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Confidentiality disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-start gap-3 max-w-3xl mx-auto bg-secondary/50 border border-border/60 rounded-2xl px-6 py-4"
        >
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            <span className="font-semibold text-foreground">Nota de confidencialidad: </span>
            Los nombres y detalles identificatorios han sido modificados para proteger la confidencialidad de los consultantes, en estricto cumplimiento de las normas deontológicas de la práctica psicológica profesional.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
