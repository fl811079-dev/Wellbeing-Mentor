import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, User, MessageSquare, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "59164544229";
const WHATSAPP_MSG = encodeURIComponent("Hola, me gustaría agendar una sesión de psicología o mentoría profesional");

type FormState = "idle" | "submitting" | "success";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre.";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Por favor ingresa tu correo electrónico.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
      valid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = "Por favor escribe tu mensaje.";
      valid = false;
    } else if (form.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contacto-form" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: heading & info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Contáctanos</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              ¿Tienes preguntas sobre nuestros servicios o deseas iniciar tu proceso de mentoría? Completa el formulario y el Dr. Fernando Cristian se pondrá en contacto contigo a la brevedad.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: "WhatsApp / Teléfono",
                  value: "+591 64544229",
                  href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`,
                },
                {
                  icon: Mail,
                  label: "Correo electrónico",
                  value: "contacto@fercri.com",
                  href: "mailto:contacto@fercri.com",
                },
                {
                  icon: MessageSquare,
                  label: "Tiempo de respuesta",
                  value: "En menos de 24 horas hábiles",
                  href: null,
                },
                {
                  icon: User,
                  label: "Modalidad",
                  value: "Sesiones online para todo el mundo",
                  href: null,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-background border border-border rounded-3xl shadow-xl shadow-primary/5 p-8 md:p-10">
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-muted-foreground max-w-xs">
                    Gracias por escribirnos. El Dr. Fernando Cristian se pondrá en contacto contigo pronto.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-2 text-sm font-medium text-primary hover:underline transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Nombre completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:border-primary ${
                        errors.name ? "border-red-400 focus:ring-red-200" : "border-border"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@correo.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:border-primary ${
                        errors.email ? "border-red-400 focus:ring-red-200" : "border-border"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none ${
                        errors.message ? "border-red-400 focus:ring-red-200" : "border-border"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold text-base bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {formState === "submitting" ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
