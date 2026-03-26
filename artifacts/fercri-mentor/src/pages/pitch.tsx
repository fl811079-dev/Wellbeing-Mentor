import { motion } from "framer-motion";
import { Link } from "wouter";
import { AlertCircle, Lightbulb, Award, Target, Bot, ArrowLeft, Users, DollarSign, Clock } from "lucide-react";

const sections = [
  {
    icon: AlertCircle,
    tag: "El Problema",
    title: "Brecha crítica en salud mental",
    color: "from-red-500 to-rose-600",
    bg: "bg-red-50 border-red-100",
    tagColor: "text-red-600 bg-red-100",
    stats: [
      { icon: DollarSign, value: "$50+", label: "por sesión privada" },
      { icon: Users, value: "80%", label: "sin acceso a salud mental" },
      { icon: Clock, value: "0", label: "opciones gratuitas 24/7" },
    ],
    body: "En Bolivia, más del 80% de las personas no acceden a salud mental por costos y estigma. Una sesión clínica privada cuesta $50 o más — un obstáculo insalvable para comunidades vulnerables.",
  },
  {
    icon: Lightbulb,
    tag: "La Solución",
    title: "ALMA: Apoyo 24/7, costo $0",
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50 border-blue-100",
    tagColor: "text-blue-700 bg-blue-100",
    stats: [
      { icon: Bot, value: "IA", label: "Google Gemini" },
      { icon: Clock, value: "24/7", label: "disponible siempre" },
      { icon: DollarSign, value: "$0", label: "para el paciente" },
    ],
    body: "ALMA es una IA clínica basada en Google Gemini que cierra el vacío entre sesiones y ofrece apoyo emocional gratuito. Diseñada con los principios de la Logoterapia y supervisión clínica doctoral.",
  },
  {
    icon: Award,
    tag: "Nuestra Ventaja",
    title: "Rigor científico + Impacto social",
    color: "from-amber-500 to-yellow-600",
    bg: "bg-amber-50 border-amber-100",
    tagColor: "text-amber-700 bg-amber-100",
    stats: [
      { icon: Award, value: "25+", label: "años de experiencia" },
      { icon: Users, value: "APA 7", label: "ética aplicada" },
      { icon: Bot, value: "Gemini", label: "IA de vanguardia" },
    ],
    body: "Creada por un psicólogo clínico e investigador doctoral con experiencia real en Santa Cruz, Bolivia. No es solo tecnología — es salud mental ética, accesible y basada en evidencia.",
  },
  {
    icon: Target,
    tag: "El Impacto",
    title: "Meta: 10,000 personas atendidas",
    color: "from-emerald-500 to-green-700",
    bg: "bg-emerald-50 border-emerald-100",
    tagColor: "text-emerald-700 bg-emerald-100",
    stats: [
      { icon: Users, value: "10k", label: "usuarios meta" },
      { icon: DollarSign, value: "$0", label: "costo para el paciente" },
      { icon: Clock, value: "∞", label: "disponibilidad" },
    ],
    body: "La meta es atender a 10,000 usuarios con costo $0 para el paciente. ALMA no reemplaza al psicólogo — lo amplifica, democratizando el primer punto de contacto en salud mental.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55 },
};

export default function Pitch() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="relative py-20 px-4 text-center text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A56B0 0%, #0F3880 60%, #8B6914 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-10 w-48 h-48 rounded-full bg-yellow-400 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm mb-6">
            <Bot className="w-4 h-4" style={{ color: "#D4A017" }} />
            <span>Buildathon · FERCRI Mentor App</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
            Presentando{" "}
            <span style={{ color: "#D4A017" }}>ALMA</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Asistente Logoterapéutica y Mediadora del Aprendizaje —<br />
            salud mental accesible para todos en Bolivia.
          </p>
        </div>
      </div>

      {/* Pitch sections */}
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-10">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className={`rounded-3xl border p-8 md:p-10 ${section.bg}`}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-lg shrink-0`}
              >
                <section.icon className="w-7 h-7" />
              </div>

              <div className="flex-1">
                <span
                  className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${section.tagColor}`}
                >
                  {section.tag}
                </span>
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{section.body}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {section.stats.map((stat, j) => (
                    <div key={j} className="text-center">
                      <stat.icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* CTA */}
        <motion.div {...fadeUp} className="text-center py-8">
          <p className="text-muted-foreground mb-6 text-lg">
            ALMA ya está activa. Pruébala ahora mismo.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 text-lg"
            style={{ background: "linear-gradient(135deg, #1A56B0, #D4A017)" }}
          >
            <Bot className="w-5 h-5" />
            Hablar con ALMA
          </Link>
          <p className="text-xs text-muted-foreground mt-4">
            Supervisada clínicamente por el Dr. (c) Cristofer · Powered by Google Gemini
          </p>
        </motion.div>
      </div>
    </div>
  );
}
