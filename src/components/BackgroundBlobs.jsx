import { motion } from 'framer-motion';

export default function BackgroundBlobs() {
  return (
    <div
      className="
      fixed
      inset-0
      overflow-hidden
      pointer-events-none  
      z-0
    "
    >
      {/* Blob 1 */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          -top-32
          -left-24

          w-[420px]
          h-[420px]

          rounded-full

          bg-blue-300/40

          blur-[120px]
        "
      />

      {/* Blob 2 */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          -bottom-40
          -right-24

          w-[460px]
          h-[460px]

          rounded-full

          bg-cyan-300/40

          blur-[140px]
        "
      />

      {/* Blob 3 */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          top-[35%]
          left-[35%]

          w-[280px]
          h-[280px]

          rounded-full

          bg-sky-200/30

          blur-[100px]
        "
      />
    </div>
  );
}
