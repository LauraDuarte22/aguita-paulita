import { motion } from 'framer-motion';

export default function PresetButton({ icon, label, ml, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        y: -4,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.94,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 15,
      }}
      className="
        group
        relative
        overflow-hidden

        bg-white/70
        backdrop-blur-xl

        border
        border-white/60

        rounded-[28px]

        p-4

        shadow-lg
        shadow-blue-100/20
      "
    >
      {/* Glow */}
      <motion.div
        className="
          absolute
          inset-0

          bg-gradient-to-br
          from-blue-100/40
          to-cyan-100/30
        "
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />

      {/* Bubble effect */}
      <div
        className="
          absolute
          -top-10
          -right-10

          w-24
          h-24

          rounded-full

          bg-white/20
          blur-2xl
        "
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          whileHover={{
            rotate: [-5, 5, -3, 0],
          }}
          transition={{
            duration: 0.5,
          }}
          className="text-4xl mb-2"
        >
          {icon}
        </motion.div>

        <div className="text-sm font-semibold text-slate-700">{label}</div>

        <div className="text-xs text-slate-400 mt-1">{ml} ml</div>
      </div>
    </motion.button>
  );
}
