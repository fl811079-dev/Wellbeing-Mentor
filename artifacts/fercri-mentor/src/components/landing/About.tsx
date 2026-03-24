import { motion } from "framer-motion";
import { Award, CheckCircle2, GraduationCap } from "lucide-react";

export function About() {
  const credentials = [
    { text: "10+ Años de Experiencia", icon: Award },
    { text: "Terapias Basadas en Evidencia", icon: CheckCircle2 },
    { text: "Certificación Internacional", icon: GraduationCap },
  ];

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
              {/* professional confident therapist portrait */}
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                alt="Dra. Fernanda Cristina" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="font-display font-bold text-2xl">Dra. Fernanda Cristina</div>
                <div className="text-white/80 font-medium">Fundadora FERCRI</div>
              </div>
            </div>
            
            {/* Decorative blob */}
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
            <h3 className="text-xl text-primary font-medium mb-6">Psicóloga Clínica & Mentora</h3>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
              <p>
                Con más de una década de experiencia en el ámbito clínico y corporativo, mi propósito es acompañarte en tu proceso de transformación personal y profesional.
              </p>
              <p>
                En FERCRI, unimos la rigurosidad de la ciencia psicológica con estrategias de mentoría ejecutiva para crear un espacio seguro donde puedas sanar, crecer y diseñar la vida que deseas.
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
