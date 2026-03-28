import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-display font-bold text-lg">
                F
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                FERCRI
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Plataforma profesional de psicología clínica, mentoría y crecimiento personal liderada por el Dr. Fernando Cristian — Psicólogo Clínico y Profesor Universitario con 25 años de experiencia.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Enlaces</h4>
            <ul className="space-y-3">
              <li><button onClick={() => document.querySelector("#servicios")?.scrollIntoView()} className="text-muted-foreground hover:text-primary transition-colors">Servicios</button></li>
              <li><button onClick={() => document.querySelector("#sobre-mi")?.scrollIntoView()} className="text-muted-foreground hover:text-primary transition-colors">Sobre Mí</button></li>
              <li><button onClick={() => document.querySelector("#testimonios")?.scrollIntoView()} className="text-muted-foreground hover:text-primary transition-colors">Testimonios</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacidad</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Términos</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground space-y-1 text-center md:text-left">
            <p>© {currentYear} FERCRI Mentor &amp; Consultor. Todos los derechos reservados. Patente Pendiente.</p>
            <p>ALMA es una marca registrada bajo supervisión del Dr. (c) Cristofer.</p>
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-border" />
            <div className="w-2 h-2 rounded-full bg-border" />
            <div className="w-2 h-2 rounded-full bg-border" />
          </div>
        </div>
      </div>
    </footer>
  );
}
