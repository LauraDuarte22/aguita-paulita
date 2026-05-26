// src/layouts/HomeLayout.jsx

import DailyLog from '../components/DailyLog';
import HeroSection from '../components/sections/HeroSection';
import AddWaterSection from '../components/sections/AddWaterSection';

export default function HomeLayout({ water }) {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-28 relative z-10">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* ── LEFT — Hero + Add water ── */}
        <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
          <HeroSection water={water} />
          <AddWaterSection water={water} />

          {/* DailyLog solo visible en mobile */}
          <div className="lg:hidden bg-white/50 backdrop-blur-xl border border-white/70 rounded-[28px] shadow-xl shadow-blue-100/20 overflow-hidden">
            <DailyLog
              entries={water.entries}
              removeEntry={water.removeEntry}
              resetDay={water.resetDay}
              maxHeight="max-h-64"
            />
          </div>
        </div>

        {/* ── RIGHT — DailyLog solo en desktop ── */}
        <div className="hidden lg:flex w-[360px] shrink-0 flex-col gap-4">
          <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[28px] shadow-xl shadow-blue-100/20 overflow-hidden">
            <DailyLog
              entries={water.entries}
              removeEntry={water.removeEntry}
              resetDay={water.resetDay}
              maxHeight="max-h-[calc(100vh-12rem)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
