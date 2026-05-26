import { motion } from 'framer-motion';

export default function HydrationBuddy({ progress }) {
  function getMood() {
    if (progress >= 1) {
      return {
        emoji: '🥳',
        text: '¡Lo lograste!',
      };
    }

    if (progress >= 0.7) {
      return {
        emoji: '😄',
        text: 'Ya casi 💧',
      };
    }

    if (progress >= 0.4) {
      return {
        emoji: '😊',
        text: 'Vas super bien',
      };
    }

    return {
      emoji: '🥺',
      text: 'Tomemos agüita',
    };
  }

  const mood = getMood();

  return (
    <motion.div
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="
        px-6
        py-5

        text-center

      
        shadow-blue-100/20
      "
    >
      <motion.div
        animate={{
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-6xl mb-2"
      >
        {mood.emoji}
      </motion.div>

      <div className="text-slate-700 font-semibold">{mood.text}</div>
    </motion.div>
  );
}
