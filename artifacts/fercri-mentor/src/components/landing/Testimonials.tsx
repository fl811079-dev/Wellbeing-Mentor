import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "La mentoría con Fernanda cambió por completo mi perspectiva profesional. Logré superar el síndrome del impostor y asumir un rol de liderazgo con confianza.",
    author: "Laura M.",
    role: "Directora de Marketing"
  },
  {
    quote: "El espacio terapéutico de FERCRI me brindó las herramientas necesarias para manejar mi ansiedad. Su enfoque basado en evidencia realmente funciona.",
    author: "Carlos R.",
    role: "Emprendedor"
  },
  {
    quote: "Buscaba un equilibrio entre mi vida personal y mi carrera exigente. El programa de crecimiento personal fue exactamente lo que necesitaba para reconectar conmigo misma.",
    author: "Sofia T.",
    role: "Abogada"
  }
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-muted-foreground text-lg">
            Historias reales de transformación y crecimiento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/40 border border-border/50 p-8 rounded-3xl"
            >
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-foreground text-lg italic mb-8 leading-relaxed">
                "{test.quote}"
              </p>
              <div>
                <div className="font-display font-semibold text-foreground">{test.author}</div>
                <div className="text-muted-foreground text-sm">{test.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
