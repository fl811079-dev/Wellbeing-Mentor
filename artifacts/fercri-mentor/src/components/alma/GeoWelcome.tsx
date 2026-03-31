import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type LangKey = "es" | "en" | "pt" | "fr";

const SPANISH_COUNTRIES = new Set([
  "AR","BO","CL","CO","CR","CU","DO","EC","SV","GQ","GT","HN","MX","NI","PA","PY","PE","PR","ES","UY","VE",
]);
const PORTUGUESE_COUNTRIES = new Set(["BR","PT","AO","MZ","CV","GW","ST","TL"]);
const FRENCH_COUNTRIES = new Set([
  "FR","BE","LU","MC","SN","CI","ML","BF","NE","TG","BJ","CM","GA","CG","CD","GN","CF","TD","DJ","KM","MG","SC","MU",
]);

const GREETINGS: Record<LangKey, { greeting: string; authority: string }> = {
  es: {
    greeting: "Bienvenido a la Clínica Digital FERCRI. Soy ALMA, tu guía emocional. ¿En qué podemos trabajar hoy?",
    authority: "Bajo la Dirección Clínica del Dr. (c) Cristofer",
  },
  en: {
    greeting: "Welcome to FERCRI Digital Clinic. I am ALMA, your emotional guide. How can we work together today?",
    authority: "Under the Clinical Direction of Dr. (c) Cristofer",
  },
  pt: {
    greeting: "Bem-vindo à Clínica Digital FERCRI. Sou ALMA, seu guia emocional. Como podemos trabalhar juntos hoje?",
    authority: "Sob a Direção Clínica do Dr. (c) Cristofer",
  },
  fr: {
    greeting: "Bienvenue à la Clinique Numérique FERCRI. Je suis ALMA, votre guide émotionnel. Comment pouvons-nous travailler ensemble aujourd'hui?",
    authority: "Sous la Direction Clinique du Dr. (c) Cristofer",
  },
};

function getFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65));
}

function detectLang(countryCode: string): LangKey {
  if (SPANISH_COUNTRIES.has(countryCode)) return "es";
  if (PORTUGUESE_COUNTRIES.has(countryCode)) return "pt";
  if (FRENCH_COUNTRIES.has(countryCode)) return "fr";
  return "en";
}

type GeoData = {
  country_code: string;
  country_name: string;
  lang: LangKey;
  flag: string;
};

export function GeoWelcome() {
  const [geo, setGeo] = useState<GeoData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("geo-fail");
        const json = await res.json();
        if (cancelled) return;
        const cc: string = json.country_code ?? "BO";
        setGeo({
          country_code: cc,
          country_name: json.country_name ?? "",
          lang: detectLang(cc),
          flag: getFlagEmoji(cc),
        });
        setStatus("ready");
      } catch {
        if (!cancelled) {
          // Default to Bolivia / Spanish on failure
          setGeo({
            country_code: "BO",
            country_name: "Bolivia",
            lang: "es",
            flag: getFlagEmoji("BO"),
          });
          setStatus("ready");
        }
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="mx-0 px-4 py-2.5 border-b border-border bg-slate-50 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-slate-200 animate-pulse" />
        <span className="text-xs text-slate-400">Detectando ubicación...</span>
      </div>
    );
  }

  if (!geo) return null;

  const { greeting, authority } = GREETINGS[geo.lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="border-b border-border shrink-0"
      style={{ background: "linear-gradient(180deg, #f0f6ff 0%, #fafbff 100%)" }}
    >
      {/* FERCRI logo strip */}
      <div
        className="flex items-center justify-between px-4 pt-2.5 pb-1"
      >
        {/* Wordmark */}
        <div className="flex items-center gap-1.5">
          <span
            className="text-xs font-extrabold tracking-widest uppercase"
            style={{ color: "#1A56B0", letterSpacing: "0.15em" }}
          >
            FERCRI
          </span>
          <span className="text-[9px] font-semibold text-slate-400 leading-none mt-0.5">
            MENTOR &amp; CONSULTOR
          </span>
        </div>
        {/* Flag + country */}
        <div className="flex items-center gap-1.5">
          <span className="text-lg leading-none" title={geo.country_name}>
            {geo.flag}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">{geo.country_name}</span>
        </div>
      </div>

      {/* Greeting */}
      <div className="px-4 pb-2">
        <p className="text-xs text-slate-700 leading-snug font-medium">
          {greeting}
        </p>
        <p
          className="text-[10px] mt-1 font-semibold italic"
          style={{ color: "#D4A017" }}
        >
          {authority}
        </p>
      </div>
    </motion.div>
  );
}
