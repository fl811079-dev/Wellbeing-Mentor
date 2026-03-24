import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, Microscope, Users } from "lucide-react";

const credentials = [
  { text: "25 Años de Experiencia Clínica y Académica", icon: Award },
  { text: "Psicólogo Clínico Certificado", icon: GraduationCap },
  { text: "Profesor Universitario de Psicología", icon: BookOpen },
  { text: "Investigador en Bienestar Emocional", icon: Microscope },
  { text: "Mentor de Profesionales de la Salud Mental", icon: Users },
];

export function About() {
  return (
    <section id="sobre-mi" className="py-24 bg-secondary/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4">
            Sobre el Mentor
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Dr. Fernando Cristian
          </h2>
          <p className="text-primary text-lg font-medium">
            Psicólogo Clínico &amp; Profesor Universitario
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-background border border-border rounded-3xl p-8 md:p-12 shadow-sm mb-10"
        >
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              Con <strong className="text-foreground">25 años de trayectoria</strong> en el campo de la psicología clínica y la docencia universitaria, el Dr. Fernando Cristian ha dedicado su vida profesional a la comprensión profunda de la conducta humana, el bienestar emocional y el desarrollo integral de la persona.
            </p>
            <p>
              Como profesor universitario, ha formado a generaciones de profesionales de la salud mental, integrando los últimos avances en neurociencia afectiva, psicoterapia basada en evidencia y teoría del apego en su práctica clínica y académica.
            </p>
            <p>
              Su enfoque combina el rigor científico de la psicología académica con una sensibilidad humana profunda, creando un espacio de mentoría donde la transformación personal y el crecimiento profesional se articulan de manera integral y sostenida.
            </p>
          </div>
        </motion.div>

        {/* Credentials grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
        >
          {credentials.map((cred, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-background border border-border rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <cred.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-foreground text-sm">{cred.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => document.querySelector("#contacto-form")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-xl font-semibold bg-white border-2 border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-200 shadow-sm"
          >
            Conocer más sobre el enfoque
          </button>
        </motion.div>

      </div>
    </section>
  );
}
