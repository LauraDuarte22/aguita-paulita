// src/sections/HeroSection.jsx

import ProgressRing from '../../components/ProgressRing';
import HydrationBuddy from '../../components/HydrationBuddy';
import WaterProgressBar from '../../components/WaterProgressBar';
import {
  formatWaterAmount,
  getDateLabel,
  getStatusMsg,
} from '../../utils/format';

export default function HeroSection({ water }) {
  const { total, progress, goalMl, userName } = water;
  const displayTotal = formatWaterAmount(total);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-800 leading-tight">
            💧 Agüita de {userName}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{getDateLabel()}</p>
        </div>

        {total >= goalMl && (
          <span className="shrink-0 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1 text-[11px] font-semibold">
            🎉 Meta lograda
          </span>
        )}
      </div>

      {/* Hero — 3 columnas en una sola fila */}
      <div className="grid grid-cols-1 gap-2">
        {/* Ring — 70% */}
        <div className="col-span-1 bg-white/50 backdrop-blur-xl border border-white/70 rounded-[24px] shadow-lg shadow-blue-100/20 p-3 flex items-center justify-center gap-3">
          <ProgressRing
            progress={progress}
            total={total}
            goal={goalMl}
            displayTotal={displayTotal}
          />

          <HydrationBuddy progress={progress} compact />
          <div>
            <p className="text-[11px] leading-snug text-slate-500 text-center">
              {getStatusMsg(total, goalMl)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
