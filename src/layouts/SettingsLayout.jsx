// src/layouts/SettingsLayout.jsx

export default function SettingsLayout({ water }) {
  const {
    goalMl,
    setGoalMl,

    userName,
    setUserName,
  } = water;

  return (
    <div
      className="
        max-w-md
        mx-auto

        px-4
        pt-6
        pb-28
      "
    >
      <div
        className="
          bg-white/50
          backdrop-blur-xl

          border
          border-white/70

          rounded-[32px]

          p-6

          shadow-xl
          shadow-blue-100/20

          space-y-6
        "
      >
        {/* Header */}
        <div>
          <h2
            className="
              text-xl
              font-bold
              text-slate-800
            "
          >
            ⚙️ Configuración
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Personaliza tu experiencia
          </p>
        </div>

        {/* Name */}
        <div>
          <div
            className="
              text-sm
              font-semibold
              text-slate-600

              mb-2
            "
          >
            Nombre
          </div>

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Tu nombre..."
            className="
              w-full

              bg-white/60

              border
              border-white/70

              rounded-2xl

              px-4
              py-3

              text-sm

              outline-none

              focus:ring-4
              focus:ring-pink-100

              transition-all
            "
          />
        </div>

        {/* Goal */}
        <div>
          <div
            className="
              text-sm
              font-semibold
              text-slate-600

              mb-3
            "
          >
            Meta diaria
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[2000, 2500, 3000, 4000].map((goal) => {
              const active = goalMl === goal;

              return (
                <button
                  key={goal}
                  onClick={() => setGoalMl(goal)}
                  className={`
                      rounded-2xl
                      py-3

                      text-sm
                      font-semibold

                      transition-all

                      ${
                        active
                          ? `
                            bg-gradient-to-br
                            from-blue-500
                            to-cyan-400

                            text-white

                            shadow-lg
                            shadow-blue-200/40
                          `
                          : `
                            bg-white/60
                            text-slate-600

                            border
                            border-white/70
                          `
                      }
                    `}
                >
                  {goal / 1000}L
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
