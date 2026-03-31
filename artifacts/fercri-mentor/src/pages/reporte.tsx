import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useLocation } from "wouter";

type EmotionEntry = {
  state: string;
  count: number;
  percentage: number;
};

type StatsData = {
  uniqueSessions: number;
  totalConversations: number;
  totalMessages: number;
  narrativeSuccessRate: number;
  dominantEmotion: string;
  emotionBreakdown: EmotionEntry[];
  generatedAt: string;
};

const EMOTION_META: Record<string, { emoji: string; color: string; label: string }> = {
  Feliz:    { emoji: "😊", color: "#2E7D5A", label: "Bien" },
  Neutro:   { emoji: "😐", color: "#1A56B0", label: "Normal" },
  Ansioso:  { emoji: "😰", color: "#D4A017", label: "Ansioso/a" },
  Triste:   { emoji: "😔", color: "#5B21B6", label: "Triste" },
  Furioso:  { emoji: "😤", color: "#B91C1C", label: "Frustrado/a" },
};

const FALLBACK_COLOR = "#94a3b8";

function getColor(state: string) {
  return EMOTION_META[state]?.color ?? FALLBACK_COLOR;
}
function getEmoji(state: string) {
  return EMOTION_META[state]?.emoji ?? "❓";
}

function StatCard({
  value,
  label,
  sub,
  accent,
}: {
  value: string | number;
  label: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 flex flex-col gap-1">
      <span
        className="text-3xl font-extrabold leading-none"
        style={{ color: accent ?? "#1A56B0" }}
      >
        {value}
      </span>
      <span className="text-sm font-semibold text-slate-700 leading-snug">{label}</span>
      {sub && <span className="text-xs text-slate-400 leading-snug">{sub}</span>}
    </div>
  );
}

export default function Reporte() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [, navigate] = useLocation();

  const fetchStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/gemini/stats");
      if (!res.ok) throw new Error("error");
      const json = await res.json();
      setData(json);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const generatedAt = data
    ? new Date(data.generatedAt).toLocaleString("es-BO", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : "";

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Top bar */}
      <div
        className="w-full px-6 py-4 flex items-center justify-between text-white"
        style={{ background: "linear-gradient(135deg, #1A56B0 0%, #D4A017 100%)" }}
      >
        <div>
          <h1 className="text-lg font-extrabold tracking-tight leading-tight">
            FERCRI — Reporte de Impacto Clínico
          </h1>
          <p className="text-white/75 text-xs mt-0.5">
            División de Salud Mental Global Digital · Bajo la Dirección del Dr. (c) Cristofer
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchStats}
            className="text-xs px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/30 font-semibold transition-colors"
          >
            ↻ Actualizar
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-xs px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/30 font-semibold transition-colors"
          >
            ← Inicio
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {loading && (
          <div className="text-center py-20 text-slate-400 text-sm">
            Cargando datos clínicos...
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500 text-sm">
            Error al cargar el reporte. Verifica que el servidor esté activo.
          </div>
        )}

        {data && !loading && (
          <>
            {/* Timestamp */}
            <p className="text-xs text-slate-400 text-right -mb-4">
              Generado: {generatedAt}
            </p>

            {/* KPI Cards */}
            <section>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                Métricas Globales
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  value={data.uniqueSessions}
                  label="Usuarios Únicos"
                  sub="Sesiones anónimas registradas"
                  accent="#1A56B0"
                />
                <StatCard
                  value={data.totalConversations}
                  label="Conversaciones Totales"
                  sub="Sesiones con ALMA iniciadas"
                  accent="#1A56B0"
                />
                <StatCard
                  value={data.totalMessages}
                  label="Mensajes Intercambiados"
                  sub="Interacciones en la clínica digital"
                  accent="#1A3A6B"
                />
                <StatCard
                  value={`${data.narrativeSuccessRate}%`}
                  label="Tasa de Éxito Narrativo"
                  sub="Sesiones con compromiso profundo (6+ mensajes)"
                  accent="#D4A017"
                />
              </div>
            </section>

            {/* Dominant Emotion Banner */}
            <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 flex items-center gap-4">
              <span className="text-5xl leading-none">
                {getEmoji(data.dominantEmotion)}
              </span>
              <div>
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Emoción Predominante del Período
                </p>
                <p className="text-2xl font-extrabold" style={{ color: getColor(data.dominantEmotion) }}>
                  {data.dominantEmotion}
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Estado más frecuente reportado por los usuarios al iniciar sesión
                </p>
              </div>
            </section>

            {/* Charts */}
            {data.emotionBreakdown.length > 0 && (
              <section className="grid md:grid-cols-2 gap-6">
                {/* Bar chart */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Distribución Emocional — Barras
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      data={data.emotionBreakdown.map((e) => ({
                        name: `${getEmoji(e.state)} ${e.state}`,
                        Porcentaje: e.percentage,
                        fill: getColor(e.state),
                      }))}
                      margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} unit="%" />
                      <Tooltip
                        formatter={(v) => [`${v}%`, "Porcentaje"]}
                        contentStyle={{ borderRadius: 8, fontSize: 12 }}
                      />
                      <Bar dataKey="Porcentaje" radius={[6, 6, 0, 0]}>
                        {data.emotionBreakdown.map((e, i) => (
                          <Cell key={i} fill={getColor(e.state)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie chart */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Distribución Emocional — Proporción
                  </h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={data.emotionBreakdown.map((e) => ({
                          name: e.state,
                          value: e.count,
                        }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${getEmoji(name)} ${Math.round((percent ?? 0) * 100)}%`
                        }
                        labelLine={false}
                      >
                        {data.emotionBreakdown.map((e, i) => (
                          <Cell key={i} fill={getColor(e.state)} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v, name) => [v, `${getEmoji(String(name))} ${name}`]}
                        contentStyle={{ borderRadius: 8, fontSize: 12 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Legend */}
                  <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    {data.emotionBreakdown.map((e) => (
                      <span
                        key={e.state}
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium text-white"
                        style={{ background: getColor(e.state) }}
                      >
                        {getEmoji(e.state)} {e.state} — {e.count}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Research note */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
                Nota Metodológica — Investigación Doctoral
              </p>
              <p className="text-sm text-blue-900 leading-relaxed">
                La <strong>Tasa de Éxito Narrativo</strong> mide el porcentaje de conversaciones donde el usuario 
                intercambió 6 o más mensajes con ALMA — indicador proxy de que la metáfora terapéutica generó 
                compromiso sostenido y procesamiento emocional activo, coherente con el modelo de 
                Mediación del Aprendizaje (Feuerstein, 1980) y la Logoterapia Avanzada.
              </p>
              <p className="text-xs text-blue-600 mt-2">
                Todos los datos son anónimos y cumplen con los principios de ética de investigación APA 7ma edición.
              </p>
            </section>

            {/* Footer */}
            <footer className="text-center text-xs text-slate-400 pb-4 leading-relaxed">
              © 2026 FERCRI Mentor &amp; Consultor — División de Salud Mental Global Digital<br />
              Bajo la Dirección del Dr. (c) Cristofer · Patente de Biofeedback en Trámite
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
