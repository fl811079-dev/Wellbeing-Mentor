import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

const articles = [
  {
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    imageAlt: "Clinical psychology consultation setting",
    category: "Psicología Clínica",
    title: "Regulación Emocional y Psicopatología: Hacia una Comprensión Transdiagnóstica del Sufrimiento Psíquico",
    excerpt:
      "Los modelos transdiagnósticos contemporáneos proponen que los déficits en regulación emocional constituyen un factor común subyacente a una amplia gama de trastornos mentales. Esta perspectiva, sustentada en décadas de investigación empírica, desafía los enfoques categoriales tradicionales y abre nuevas vías para el diseño de intervenciones clínicas de mayor alcance y eficacia terapéutica.",
    reference: "Aldao, A., Nolen-Hoeksema, S., & Schweizer, S. (2010). Emotion-regulation strategies across psychopathology: A meta-analytic review. *Clinical Psychology Review*, *30*(2), 217–237. https://doi.org/10.1016/j.cpr.2009.11.004",
  },
  {
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80",
    imageAlt: "Academic research and mental health literature",
    category: "Bienestar Emocional",
    title: "Bienestar Eudaimónico y Florecimiento Humano: Más Allá de la Ausencia de Enfermedad Mental",
    excerpt:
      "La concepción hedónica del bienestar, centrada en la maximización del placer y la minimización del dolor, ha demostrado ser insuficiente para capturar la riqueza del funcionamiento psicológico óptimo. El modelo eudaimónico, derivado de la ética aristotélica y operacionalizado por Ryff y Singer, propone que el florecimiento humano emerge de la integración de propósito vital, autonomía, dominio del entorno, crecimiento personal y relaciones positivas de calidad.",
    reference: "Ryff, C. D., & Singer, B. H. (2008). Know thyself and become what you are: A eudaimonic approach to psychological well-being. *Journal of Happiness Studies*, *9*(1), 13–39. https://doi.org/10.1007/s10902-006-9019-0",
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    imageAlt: "Professional mentorship and leadership development",
    category: "Mentoría & Desarrollo",
    title: "La Alianza Terapéutica como Factor Común de Cambio: Implicaciones para la Práctica Clínica y la Mentoría de Alto Impacto",
    excerpt:
      "Décadas de investigación en psicoterapia han establecido que la calidad de la relación entre profesional y consultante constituye uno de los predictores más robustos del resultado terapéutico, con independencia de la orientación teórica empleada. Esta evidencia, extensamente replicada en meta-análisis de amplio espectro, tiene implicaciones directas para la práctica de la mentoría clínica, donde el vínculo relacional opera como condición de posibilidad del cambio subjetivo.",
    reference: "Norcross, J. C., & Lambert, M. J. (2019). *Psychotherapy relationships that work: Volume 1. Evidence-based therapist contributions* (3rd ed.). Oxford University Press. https://doi.org/10.1093/med-psych/9780190843953.001.0001",
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

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
            Blog Clínico
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Conocimiento Basado en Evidencia
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Artículos de divulgación científica sobre psicología clínica, bienestar emocional y desarrollo humano, fundamentados en la investigación contemporánea de mayor rigor académico.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-white backdrop-blur-sm">
                  <BookOpen className="w-3 h-3" />
                  {article.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-7">
                <h3 className="text-lg font-display font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                  {article.excerpt}
                </p>

                {/* APA Reference */}
                <div className="border-t border-border/60 pt-4 mb-5">
                  <p className="text-xs text-muted-foreground/70 leading-relaxed italic">
                    <span className="font-semibold not-italic text-muted-foreground">Referencia: </span>
                    {article.reference}
                  </p>
                </div>

                {/* CTA */}
                <button className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 self-start">
                  Leer artículo completo
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
