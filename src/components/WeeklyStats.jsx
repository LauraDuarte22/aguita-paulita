import { useEffect, useMemo, useState } from "react";
import { getWaterEntries } from "../services/waterService";

const GOAL = 3000;
const W = 320;
const H = 120;
const PAD_X = 16;
const PAD_Y = 12;

function getLast7Days() {
  return [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
}

function smooth(points) {
  if (points.length < 2) {
    return points.map((p) => `${p.x},${p.y}`).join(" ");
  }

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpx = (p0.x + p1.x) / 2;

    d += ` C ${cpx} ${p0.y}, ${cpx} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  return d;
}

export default function WeeklyStats() {
  const [hover, setHover] = useState(null);
  const [history, setHistory] = useState({});

  const days = useMemo(() => getLast7Days(), []);
  const today = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );

  /* ───────────────── LOAD DATA (OPTIMIZADO) ───────────────── */

  useEffect(() => {
    let mounted = true;

    async function loadHistory() {
      try {
        const results = await Promise.all(
          days.map(async (day) => {
            const entries = await getWaterEntries(day);
            return [day, entries];
          })
        );

        if (!mounted) return;

        setHistory(Object.fromEntries(results));
      } catch (err) {
        console.error("Error loading weekly stats:", err);
      }
    }

    loadHistory();

    return () => {
      mounted = false;
    };
  }, [days]);

  /* ───────────────── DATA DERIVADA (MEMO) ───────────────── */

  const data = useMemo(() => {
    return days.map((day) => {
      const entries = history[day] || [];
      const total = entries.reduce((s, e) => s + e.ml, 0);

      return { day, total };
    });
  }, [history, days]);

  const { max, average, best, daysHit } = useMemo(() => {
    const totals = data.map((d) => d.total);

    return {
      max: Math.max(...totals, GOAL),
      average: Math.round(
        totals.reduce((s, n) => s + n, 0) / 7
      ),
      best: Math.max(...totals),
      daysHit: data.filter((d) => d.total >= GOAL).length,
    };
  }, [data]);

  /* ───────────────── SVG CALCS (MEMO) ───────────────── */

  const { pts, linePath, fillPath, goalY, dayLabels } = useMemo(() => {
    const innerW = W - PAD_X * 2;
    const innerH = H - PAD_Y * 2;

    const pts = data.map((d, i) => ({
      x: PAD_X + (i / (data.length - 1)) * innerW,
      y: PAD_Y + innerH - (d.total / max) * innerH,
      ...d,
    }));

    const linePath = smooth(pts);

    const fillPath =
      linePath +
      ` L ${pts[pts.length - 1].x} ${PAD_Y + innerH}
        L ${pts[0].x} ${PAD_Y + innerH}
        Z`;

    const goalY =
      PAD_Y + innerH - (GOAL / max) * innerH;

    const dayLabels = data.map((d) => {
      const date = new Date(d.day + "T12:00:00");
      return date
        .toLocaleDateString("es-CO", { weekday: "short" })
        .slice(0, 3);
    });

    return { pts, linePath, fillPath, goalY, dayLabels };
  }, [data, max]);

  /* ───────────────── UI ───────────────── */

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.7)",
        borderRadius: 28,
        padding: 20,
        boxShadow: "0 8px 32px rgba(14,90,160,0.10)",
      }}
    >
      {/* ───────────────── STATS ───────────────── */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 8,
          marginBottom: 18,
        }}
      >
        {[
          {
            label: "Promedio",
            value: `${(average / 1000).toFixed(1)}L`,
          },
          {
            label: "Mejor día",
            value:
              best > 0
                ? `${(best / 1000).toFixed(1)}L`
                : "—",
          },
          {
            label: "Metas logradas",
            value: `${daysHit}/7`,
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.8)",
              borderRadius: 16,
              padding: "10px 8px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#1e40af",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#94a3b8",
                marginTop: 3,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ───────────────── CHART ───────────────── */}

      <svg
        viewBox={`0 0 ${W} ${H + 24}`}
        width="100%"
        style={{ display: "block" }}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="fillGrad">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
          </linearGradient>

          <linearGradient id="lineGrad">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Goal */}
        <line
          x1={PAD_X}
          y1={goalY}
          x2={W - PAD_X}
          y2={goalY}
          stroke="#bfdbfe"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />

        {/* Fill */}
        <path d={fillPath} fill="url(#fillGrad)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Points */}
        {pts.map((p, i) => {
          const isToday = p.day === today;
          const isHover = hover === i;
          const hasData = p.total > 0;

          return (
            <g key={p.day}>
              <rect
                x={p.x - 16}
                y={PAD_Y}
                width={32}
                height={H}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />

              {hasData && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHover || isToday ? 6 : 4}
                  fill={isToday ? "#2563eb" : "#fff"}
                  stroke={isToday ? "#fff" : "#38bdf8"}
                  strokeWidth={2}
                />
              )}

              <text
                x={p.x}
                y={H + 14}
                textAnchor="middle"
                fontSize="10"
                fill={isToday ? "#2563eb" : "#94a3b8"}
              >
                {dayLabels[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}