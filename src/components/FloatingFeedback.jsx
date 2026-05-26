import { AnimatePresence, motion } from 'framer-motion';

export default function FloatingFeedback({ value }) {
  return (
    <AnimatePresence>
      {value && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            y: -10,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -40,
            scale: 0.8,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="
            fixed
            top-24
            left-1/2
            -translate-x-1/2

            z-50

            px-5
            py-3

            rounded-full

            bg-blue-500
            text-white

            font-semibold

            shadow-2xl
            shadow-blue-300/40

            backdrop-blur-xl
          "
        >
          {value}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
