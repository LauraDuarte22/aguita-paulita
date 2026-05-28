// src/sections/HeroSection.jsx

import ProgressRing from '../../components/ProgressRing';

import {
  formatWaterAmount,
  getStatusMsg,
} from '../../utils/format';

export default function HeroSection({ water }) {
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
          sm:p-5
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

        {/* CONTENT */}
        <div
          className="
            relative
            z-10

            flex
            flex-col

            sm:flex-row

            items-center
            gap-4
          "
        >
          {/* LEFT */}
          <div
            className="
              flex-1

              w-full

              flex
              flex-col
              items-center

              sm:items-start
            "
          >
            <p
              className="
                text-base
                sm:text-lg

                leading-relaxed

                text-slate-600

                text-center
                sm:text-left
              "
            >
              {getStatusMsg(
                total,
                goalMl
              )}
            </p>

            {/* Badge */}
            {total >= goalMl && (
              <div
                className="
                  mt-3

                  bg-emerald-100/80
                  text-emerald-700

                  border
                  border-emerald-200

                  rounded-full

                  px-4
                  py-2

                  text-xs
                  font-bold

                  shadow-sm
                "
              >
                🎉 Meta lograda
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div
            className="
              shrink-0

              flex
              items-center
              justify-center
            "
          >
            <ProgressRing
              progress={progress}
              total={total}
              goal={goalMl}
              displayTotal={
                displayTotal
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}