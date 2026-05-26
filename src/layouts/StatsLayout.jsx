// src/layouts/StatsLayout.jsx

import WeeklyStats from '../components/WeeklyStats';
import { getDateLabel } from '../utils/format';

export default function StatsLayout() {
  return (
    <div
      className="
        max-w-md
        mx-auto

        px-4
        pt-6
        pb-28

        relative
        z-10
      "
    >
      {/* Header */}
      <div className="mb-4">
        <h1
          className="
            text-2xl
            font-black
            tracking-tight
            text-slate-800
          "
        >
          Estadísticas
        </h1>

        <p className="text-xs text-slate-400 mt-1">{getDateLabel()}</p>
      </div>

      <WeeklyStats />
    </div>
  );
}
