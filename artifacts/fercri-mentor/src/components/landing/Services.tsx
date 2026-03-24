import { motion } from "framer-motion";
import { Brain, Compass, Sprout } from "lucide-react";

const services = [
  {
    title: "Psicología Clínica",
    description:
      "Abordaje clínico fundamentado en la evidencia científica y los más recientes avances en neurociencia afectiva. A través de una evaluación psicológica rigurosa, diseñamos intervenciones personalizadas orientadas a la regulación emocional, el procesamiento del trauma y la restauración del equilibrio psíquico, promoviendo una salud mental integral y sostenible a lo largo del tiempo.",
    icon: Brain,
    color: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Mentoría Profesional",
    description:
      "Proceso de acompañamiento estructurado y profundo, orientado al desarrollo de competencias de alto rendimiento, liderazgo consciente y toma de decisiones estratégica. Integramos herramientas de la psicología organizacional y el coaching ejecutivo para potenciar la identidad profesional, la resiliencia ante el cambio y el despliegue del máximo potencial humano en entornos académicos y corporativos.",
    icon: Compass,
    color: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Crecimiento Personal",
    description:
      "Programas de desarrollo personal de alta profundidad, sustentados en la psicología humanista, la teoría de la autoeficacia y los principios del bienestar eudaimónico. Acompañamos procesos de autodescubrimiento, fortalecimiento de la autoestima y construcción de una vida con sentido, cultivando la resiliencia emocional, la plenitud interior y el equilibrio vital desde una perspectiva científica e integradora.",
    icon: Sprout,
    color: "bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-muted-foreground text-lg">
            Ofrecemos un abordaje interdisciplinario del bienestar emocional y el crecimiento personal, sustentado en 25 años de experiencia clínica y académica, adaptado a cada etapa del desarrollo humano.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${service.color}`}
              >
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>

              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
