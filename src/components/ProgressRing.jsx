import { motion } from 'framer-motion';

const CIRCUMFERENCE = 2 * Math.PI * 58;

export default function ProgressRing({
  progress,
  total,
  goal,
  displayTotal,
}) {
  const offset =
    CIRCUMFERENCE -
    CIRCUMFERENCE * progress;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
      }}
      className="
        w-full

        bg-white/70
        backdrop-blur-xl

        rounded-[32px]

        border
        border-white/70

        p-5

        shadow-xl
        shadow-blue-100/40
      "
    >
      <div
        className="
          flex
          flex-col

          sm:flex-row

          items-center
          justify-center

          gap-5
        "
      >
        {/* CIRCLE */}
        <div className="relative w-[190px] h-[190px] shrink-0">
          {/* Glow */}
          <div
            className="
              absolute
              inset-0

              rounded-full

              bg-blue-200/20

              blur-2xl
              scale-90
            "
          />

          <svg
            width="190"
            height="190"
            viewBox="0 0 190 190"
            className="relative z-10"
          >
            {/* Background */}
            <circle
              cx="95"
              cy="95"
              r="58"
              fill="none"
              stroke="#E2F1FF"
              strokeWidth="14"
            />

            {/* Progress */}
            <motion.circle
              cx="95"
              cy="95"
              r="58"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              animate={{
                strokeDashoffset: offset,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
              transform="rotate(-90 95 95)"
            />

            {/* Gradient */}
            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#60A5FA"
                />
                <stop
                  offset="100%"
                  stopColor="#22D3EE"
                />
              </linearGradient>
            </defs>
          </svg>

          {/* CENTER */}
          <motion.div
            key={total}
            initial={{
              scale: 0.85,
              opacity: 0.5,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 12,
            }}
            className="
              absolute
              inset-0

              flex
              flex-col
              items-center
              justify-center

              z-20
            "
          >
            <div className="text-3xl font-bold text-slate-800">
              {displayTotal}
            </div>

            <div className="text-xs sm:text-sm text-slate-400 mt-1">
  de {(goal / 1000).toFixed(1)}L
</div>
          </motion.div>
        </div>

        {/* TEXT */}
        <div
          className="
            flex
            flex-col
            items-center

            sm:items-start

            text-center
            sm:text-left
          "
        >
   
          <div className="text-lg font-bold text-slate-800">
            {Math.round(progress * 100)}%
          </div>

          <div className="text-sm text-slate-500">
            completado
          </div>
        </div>
      </div>
    </motion.div>
  );
}