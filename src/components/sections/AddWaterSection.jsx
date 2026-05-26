// src/sections/AddWaterSection.jsx

import PresetButton from '../../components/PresetButton';

const PRESETS = [
  {
    ml: 200,
    label: 'Vasito',
    icon: '🥛',
  },
  {
    ml: 350,
    label: 'Vaso',
    icon: '🫗',
  },
  {
    ml: 500,
    label: 'Botella',
    icon: '🍶',
  },
  {
    ml: 750,
    label: 'Termo M',
    icon: '💧',
  },
  {
    ml: 1000,
    label: 'Termo 1L',
    icon: '🌊',
  },
  {
    ml: 250,
    label: 'Jugo/té',
    icon: '🍵',
  },
];

export default function AddWaterSection({ water }) {
  const {
    customMl,
    setCustomMl,

    addWater,
    addCustom,
  } = water;

  return (
    <div
      className="
        bg-white/50
        backdrop-blur-xl

        border
        border-white/70

        rounded-[28px]

        p-4

        shadow-xl
        shadow-blue-100/20
      "
    >
      <p
        className="
          text-xs
          font-semibold
          text-slate-400

          uppercase
          tracking-widest

          mb-3
        "
      >
        Agregar agua
      </p>

      {/* Presets */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {PRESETS.map((preset) => (
          <PresetButton
            key={preset.ml + preset.label}
            icon={preset.icon}
            label={preset.label}
            ml={preset.ml}
            onClick={() => addWater(preset.ml, preset.label)}
          />
        ))}
      </div>

      {/* Custom input */}
      <div className="flex gap-2">
        <input
          type="number"
          value={customMl}
          onChange={(e) => setCustomMl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCustom()}
          placeholder="ml personalizados..."
          className="
            flex-1

            bg-white/60

            border
            border-white/70

            rounded-2xl

            px-3
            py-2.5

            text-sm

            outline-none

            focus:ring-4
            focus:ring-blue-100

            transition-all
          "
        />

        <button
          onClick={addCustom}
          className="
            bg-gradient-to-br
            from-blue-500
            to-cyan-400

            hover:scale-[1.02]
            active:scale-95

            text-white

            rounded-2xl

            px-4
            py-2.5

            text-sm
            font-semibold

            shadow-lg
            shadow-blue-200/40

            transition-all
          "
        >
          + Agregar
        </button>
      </div>
    </div>
  );
}
