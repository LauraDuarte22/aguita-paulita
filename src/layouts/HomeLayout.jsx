// src/layouts/HomeLayout.jsx

import DailyLog from '../components/DailyLog';

import ShareCard from '../components/ShareCard';

import HeroSection from '../components/sections/HeroSection';
import AddWaterSection from '../components/sections/AddWaterSection';

import { getDateLabel } from '../utils/format';

export default function HomeLayout({
  water,
}) {
  const { userName } = water;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-28 relative z-10">
      {/* HEADER */}
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

      {/* CONTENT */}
      <div className="flex flex-col lg:flex-row gap-4 items-start mt-12">
        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
          <HeroSection water={water} />

          <AddWaterSection water={water} />



          {/* MOBILE DAILY LOG */}

          <div
            className="
    lg:hidden

    bg-white/50
    backdrop-blur-xl

    border
    border-white/70

    rounded-[28px]

    shadow-xl
    shadow-blue-100/20

    overflow-hidden
 
  "
          >
            <DailyLog
              entries={water.entries}
              removeEntry={water.removeEntry}
              resetDay={water.resetDay}
              maxHeight="max-h-64"
            />
            
          <ShareCard
            total={water.total}
            goalMl={water.goalMl}
            progress={water.progress}
            userName={water.userName}
          />
          </div>

        </div>

        {/* DESKTOP DAILY LOG */}

        <div className="hidden lg:flex w-[360px] shrink-0 flex-col gap-4">
          <DailyLog
            entries={water.entries}
            removeEntry={water.removeEntry}
            resetDay={water.resetDay}
            maxHeight="max-h-[calc(100vh-12rem)]"
          />
 <ShareCard
            total={water.total}
            goalMl={water.goalMl}
            progress={water.progress}
            userName={water.userName}
          />
        </div>
      </div>
    </div>
  );
}