import ProgressRing from "../../components/ProgressRing";
import {
  formatWaterAmount,
  getStatusMsg,
} from "../../utils/format";

export default function HeroSection({ water }) {
  const { total, progress, goalMl } = water;

  const displayTotal = formatWaterAmount(total);
  const statusMsg = getStatusMsg(total, goalMl);

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

          p-4 sm:p-5
        "
      >
        {/* Glow */}
        <div
          className="
            absolute
            top-0 right-0
            w-40 h-40
            bg-cyan-200/30
            blur-3xl
            rounded-full
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative z-10

            flex flex-col
            items-center
            text-center

            gap-5
          "
        >

          {/* STATUS ─ ARRIBA */}
          <p
            className="
              text-base sm:text-lg
              leading-relaxed
              text-slate-600
            "
          >
            {statusMsg}
          </p>

          {/* BADGE */}
          {total >= goalMl && (
            <div
              className="
                bg-emerald-100/80
                text-emerald-700
                border border-emerald-200
                rounded-full
                px-4 py-2
                text-xs font-bold
                shadow-sm
              "
            >
              🎉 Meta lograda
            </div>
          )}

          {/* PROGRESS ─ ABAJO */}
          <ProgressRing
            progress={progress}
            total={total}
            goal={goalMl}
            displayTotal={displayTotal}
          />

        </div>
      </div>
    </div>
  );
}