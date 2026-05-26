import { AnimatePresence, motion } from 'framer-motion';

export default function DailyLog({ entries, removeEntry, resetDay }) {
  return (
    <motion.div
      layout
      className="
        mt-4

        bg-white/70
        backdrop-blur-xl

        border
        border-white/70

        rounded-[32px]

        p-5

        shadow-xl
        shadow-blue-100/20
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-slate-500">
          Registro de hoy
        </span>

        <button
          onClick={resetDay}
          className="
            text-xs
            text-slate-400
            hover:text-red-400
            transition-colors
          "
        >
          🗑 Reiniciar
        </button>
      </div>

      {/* Empty */}
      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            text-center
            text-sm
            text-slate-400
            py-5
          "
        >
          Nada registrado aún 💧
        </motion.div>
      ) : (
        <motion.div layout className="space-y-2">
          <AnimatePresence>
            {[...entries].reverse().map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: 40,
                  scale: 0.9,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 18,
                }}
                className="
                    flex
                    items-center
                    gap-3

                    bg-white/60

                    rounded-2xl

                    px-4
                    py-3

                    border
                    border-white/60
                  "
              >
                {/* Amount */}
                <div
                  className="
                      text-sm
                      font-bold
                      text-blue-500

                      min-w-[70px]
                    "
                >
                  💧 {entry.ml}ml
                </div>

                {/* Label */}
                <div className="flex-1">
                  <div className="text-sm text-slate-700">{entry.label}</div>
                </div>

                {/* Time */}
                <div className="text-xs text-slate-400">{entry.time}</div>

                {/* Delete */}
                <motion.button
                  whileTap={{
                    scale: 0.85,
                  }}
                  onClick={() => removeEntry(entry.id)}
                  className="
                      text-slate-300
                      hover:text-red-400
                      transition-colors
                    "
                >
                  ✕
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
