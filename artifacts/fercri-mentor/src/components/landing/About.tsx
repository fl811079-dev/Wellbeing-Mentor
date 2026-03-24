import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, Microscope, Users } from "lucide-react";

const credentials = [
  { text: "25 Años de Experiencia Clínica y Académica", icon: Award },
  { text: "Psicóloga Clínica Certificada", icon: GraduationCap },
  { text: "Profesora Universitaria de Psicología", icon: BookOpen },
  { text: "Investigadora en Bienestar Emocional", icon: Microscope },
  { text: "Mentora de Profesionales de la Salud Mental", icon: Users },
];

export function About() {
  return (
    <section id="sobre-mi" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image/Avatar Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-2xl shadow-primary/10 border border-white/50 dark:border-white/10 bg-white dark:bg-card">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Dra. Fernanda Cristina"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="font-display font-bold text-2xl">Dra. Fernanda Cristina</div>
                <div className="text-white/80 font-medium">Psicóloga Clínica · Profesora Universitaria</div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl -z-10" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Sobre la Mentora</h2>
            <h3 className="text-xl text-primary font-medium mb-6">Psicóloga Clínica & Profesora Universitaria</h3>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
              <p>
                Con <strong className="text-foreground">25 años de trayectoria</strong> en el campo de la psicología clínica y la docencia universitaria, la Dra. Fernanda Cristina ha dedicado su vida profesional a la comprensión profunda de la conducta humana, el bienestar emocional y el desarrollo integral de la persona.
              </p>
              <p>
                Como profesora universitaria, ha formado a generaciones de profesionales de la salud mental, integrando los últimos avances en neurociencia afectiva, psicoterapia basada en evidencia y teoría del apego en su práctica clínica y académica.
              </p>
              <p>
                Su enfoque combina el rigor científico de la psicología académica con una sensibilidad humana profunda, creando un espacio de mentoría donde la transformación personal y el crecimiento profesional se articulan de manera integral y sostenida.
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-10">
              {credentials.map((cred, i) => (
                <div key={i} className="flex items-center gap-3 bg-background border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <cred.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-foreground">{cred.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-xl font-semibold bg-white border-2 border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-200 shadow-sm"
            >
              Conocer más sobre el enfoque
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
