import { motion } from 'framer-motion';

export default function WaterProgressBar({ progress }) {
  return (
    <div
      className="
        w-full
        h-4

        bg-white/50

        rounded-full

        overflow-hidden

        border
        border-white/60

        backdrop-blur-xl
      "
    >
      <motion.div
        initial={{
          width: 0,
        }}
        animate={{
          width: `${progress * 100}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 18,
        }}
        className="
          h-full

          rounded-full

          bg-gradient-to-r
          from-blue-400
          via-cyan-300
          to-sky-400

          relative
          overflow-hidden
        "
      >
        {/* Shine */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="
            absolute
            inset-0

            bg-gradient-to-r
            from-transparent
            via-white/40
            to-transparent

            skew-x-12
          "
        />
      </motion.div>
    </div>
  );
}
