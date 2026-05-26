import { useState } from 'react';

function getLast7Days() {
  return [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });
}

const GOAL = 3000;
const W = 320;
const H = 120;
const PAD_X = 16;
const PAD_Y = 12;

function smooth(points) {
  if (points.length < 2) return points.map((p) => `${p.x},${p.y}`).join(' ');
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

  const history = JSON.parse(localStorage.getItem('water_history') || '{}');
  const days = getLast7Days();
  const today = new Date().toISOString().split('T')[0];

  const data = days.map((day) => {
    const entries = history[day] || [];
    const total = entries.reduce((s, e) => s + e.ml, 0);
    return { day, total };
  });

  const max = Math.max(...data.map((d) => d.total), GOAL);
  const average = Math.round(data.reduce((s, d) => s + d.total, 0) / 7);
  const best = Math.max(...data.map((d) => d.total));
  const daysHit = data.filter((d) => d.total >= GOAL).length;

  // Map data to SVG coords
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_Y * 2;

  const pts = data.map((d, i) => ({
    x: PAD_X + (i / (data.length - 1)) * innerW,
    y: PAD_Y + innerH - (d.total / max) * innerH,
    ...d,
  }));

  const linePath = smooth(pts);

  // Close path for fill
  const fillPath =
    linePath +
    ` L ${pts[pts.length - 1].x} ${PAD_Y + innerH} L ${pts[0].x} ${
      PAD_Y + innerH
    } Z`;

  // Goal line y
  const goalY = PAD_Y + innerH - (GOAL / max) * innerH;

  const dayLabels = data.map((d) => {
    const date = new Date(d.day + 'T12:00:00');
    return date.toLocaleDateString('es-CO', { weekday: 'short' }).slice(0, 3);
  });

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.7)',
        borderRadius: 28,
        padding: '20px',
        boxShadow: '0 8px 32px rgba(14,90,160,0.10)',
        animation: 'wsIn 0.4s ease both',
      }}
    >
      <style>{`
        @keyframes wsIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { stroke-dashoffset: 1000; }
          to   { stroke-dashoffset: 0; }
        }
        .ws-line {
          stroke-dasharray: 1000;
          animation: lineGrow 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes dotPop {
          from { r: 0; }
          to   { r: 4; }
        }
        .ws-dot {
          animation: dotPop 0.3s ease both;
        }
      `}</style>

      {/* ── Stat pills ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 8,
          marginBottom: 18,
        }}
      >
        {[
          { label: 'Promedio', value: `${(average / 1000).toFixed(1)}L` },
          {
            label: 'Mejor día',
            value: best > 0 ? `${(best / 1000).toFixed(1)}L` : '—',
          },
          { label: 'Metas logradas', value: `${daysHit}/7` },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: 16,
              padding: '10px 8px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#1e40af',
                lineHeight: 1.1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 10,
                color: '#94a3b8',
                marginTop: 3,
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── SVG chart ── */}
      <div style={{ position: 'relative' }}>
        <svg
          viewBox={`0 0 ${W} ${H + 24}`}
          width="100%"
          style={{ overflow: 'visible', display: 'block' }}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Goal dashed line */}
          <line
            x1={PAD_X}
            y1={goalY}
            x2={W - PAD_X}
            y2={goalY}
            stroke="#bfdbfe"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text
            x={W - PAD_X + 4}
            y={goalY + 4}
            fontSize="9"
            fill="#93c5fd"
            fontWeight="600"
          >
            meta
          </text>

          {/* Fill area */}
          <path d={fillPath} fill="url(#fillGrad)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ws-line"
            filter="url(#glow)"
          />

          {/* Points + hover zones */}
          {pts.map((p, i) => {
            const isToday = p.day === today;
            const isHover = hover === i;
            const hasData = p.total > 0;
            return (
              <g key={p.day}>
                {/* Invisible wider hit area */}
                <rect
                  x={p.x - 16}
                  y={PAD_Y}
                  width={32}
                  height={innerH + PAD_Y}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHover(i)}
                  onTouchStart={() => setHover(hover === i ? null : i)}
                />

                {/* Vertical hover line */}
                {isHover && (
                  <line
                    x1={p.x}
                    y1={PAD_Y}
                    x2={p.x}
                    y2={PAD_Y + innerH}
                    stroke="#bfdbfe"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Dot */}
                {hasData && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHover || isToday ? 6 : 4}
                    fill={isToday ? '#2563eb' : '#fff'}
                    stroke={isToday ? '#fff' : '#38bdf8'}
                    strokeWidth={isToday ? 2 : 2}
                    className="ws-dot"
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      filter: isHover ? 'drop-shadow(0 0 4px #38bdf8)' : 'none',
                      transition: 'r 0.2s, filter 0.2s',
                    }}
                  />
                )}

                {/* Tooltip */}
                {isHover && (
                  <g>
                    <rect
                      x={Math.min(Math.max(p.x - 26, 0), W - 52)}
                      y={p.y - 36}
                      width={52}
                      height={26}
                      rx={8}
                      fill="#1e3a5f"
                    />
                    <text
                      x={Math.min(Math.max(p.x - 26, 0), W - 52) + 26}
                      y={p.y - 19}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="#fff"
                    >
                      {hasData
                        ? `${(p.total / 1000)
                            .toFixed(2)
                            .replace(/\.?0+$/, '')}L`
                        : '—'}
                    </text>
                  </g>
                )}

                {/* Day label */}
                <text
                  x={p.x}
                  y={H + 14}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={isToday ? '700' : '500'}
                  fill={isToday ? '#2563eb' : '#94a3b8'}
                >
                  {dayLabels[i]}
                </text>

                {/* Today dot under label */}
                {isToday && (
                  <circle cx={p.x} cy={H + 20} r={2} fill="#2563eb" />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
