// src/layouts/HomeLayout.jsx

import DailyLog from '../components/DailyLog';
import HeroSection from '../components/sections/HeroSection';
import AddWaterSection from '../components/sections/AddWaterSection';
import {
  getDateLabel

} from '../utils/format';

export default function HomeLayout({ water }) {
  const {
  
    userName,
  } = water;
  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-28 relative z-10">
        <div className="flex items-center justify-center flex-row gap-3">
        <div>
          <h1
            className="
              text-2xl
              font-black
              tracking-tight
              text-slate-800
              leading-tight
              text-center
            "
          >
            💧 Agüita de {userName}
          </h1>

          <p className="text-lg text-slate-400 mt-1 text-center">
            {getDateLabel()}
          </p>
        </div>

      
      </div>
      <div className="flex flex-col lg:flex-row gap-4 items-start mt-12">
        {/* ── LEFT — Hero + Add water ── */}
        <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
          <HeroSection water={water} />
          <AddWaterSection water={water} />

          {/* DailyLog solo visible en mobile */}
          <div className="lg:hidden bg-white/50 backdrop-blur-xl border border-white/70 rounded-[28px] 
          shadow-xl shadow-blue-100/20 overflow-hidden">
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
        
            <DailyLog
              entries={water.entries}
              removeEntry={water.removeEntry}
              resetDay={water.resetDay}
              maxHeight="max-h-[calc(100vh-12rem)]"
            />
       
        </div>
      </div>
    </div>
  );
}
