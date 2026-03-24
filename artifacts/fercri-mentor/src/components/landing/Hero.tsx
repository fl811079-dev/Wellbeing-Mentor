import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToContact = () => {
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image / Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Abstract calming background" 
          className="w-full h-full object-cover opacity-60 dark:opacity-30 mix-blend-multiply"
        />
        {/* Subtle glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-300/10 rounded-full blur-[120px] -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span>Psicología y Mentoría Profesional</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-6 text-balance">
              Tu bienestar emocional, <span className="text-gradient">nuestra prioridad.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 text-balance leading-relaxed max-w-2xl">
              Un espacio digital diseñado para tu crecimiento personal. 
              Te acompañamos con psicología clínica basada en evidencia y mentoría profesional para que alcances tu máximo potencial.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={scrollToContact}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Agendar Primera Sesión
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollToServices}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center"
              >
                Conocer más
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
