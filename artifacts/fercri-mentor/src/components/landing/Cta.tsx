import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const WA_URL = `https://wa.me/59164544229?text=${encodeURIComponent("Hola, me gustaría agendar una sesión de psicología o mentoría profesional")}`;

export function Cta() {
  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-primary px-8 py-16 md:py-20 text-center shadow-2xl shadow-primary/30"
        >
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              ¿Listo para dar el primer paso?
            </h2>
            <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 text-balance">
              Agenda tu primera sesión exploratoria. Juntos diseñaremos un plan personalizado para alcanzar tu bienestar emocional y tus metas profesionales.
            </p>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto px-8 py-4 rounded-xl font-bold text-lg bg-white text-primary shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all duration-300 inline-flex items-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              Agendar tu Sesión
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Modalidad online disponible para todo el mundo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
