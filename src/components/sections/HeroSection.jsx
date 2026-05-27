// src/sections/HeroSection.jsx

import ProgressRing from '../../components/ProgressRing';
import {
  formatWaterAmount,
  getDateLabel,
  getStatusMsg,
} from '../../utils/format';

export default function HeroSection({
  water,
}) {
  const {
    total,
    progress,
    goalMl,
    userName,
  } = water;

  const displayTotal =
    formatWaterAmount(total);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
    

      {/* HERO CARD */}
      <div
        className="
          relative

          overflow-hidden

          bg-white/60
          backdrop-blur-2xl

          border
          border-white/70

          rounded-[32px]

          shadow-xl
          shadow-blue-100/30

          p-4
        "
      >
        {/* Glow */}
        <div
          className="
            absolute
            top-0
            right-0

            w-40
            h-40

            bg-cyan-200/30

            blur-3xl

            rounded-full
          "
        />

        <div
          className="
            relative
            z-10

            grid
            

            gap-3

            items-center
          "
        >
          {/* LEFT */}
         
               <div className="flex-1">
              <p
                className="
                  text-xl
                  leading-relaxed
                  text-slate-600
                  mb-3
                  text-center
                "
              >
                {getStatusMsg(
                  total,
                  goalMl
                )}
              </p>

             

            
            </div>
            <ProgressRing
              progress={progress}
              total={total}
              goal={goalMl}
              displayTotal={
                displayTotal
              }
            />

         
       

          {/* RIGHT */}
          <div
            className="
              flex
              items-center
              justify-center
            "
          >
            {total >= goalMl && (
          <div
            className="
              shrink-0

              bg-emerald-100/80
              text-emerald-700

              border
              border-emerald-200

              rounded-full

              px-3
              py-1.5

              text-[11px]
              font-bold

              shadow-sm
            "
          >
            🎉 Meta lograda
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
