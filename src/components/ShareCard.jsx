// src/components/ShareCard.jsx

import html2canvas from "html2canvas";

export default function ShareCard({
  total,
  goalMl,
  progress,
  userName,
}) {
  const percent = Math.round(progress * 100);

  async function shareImage() {
    const card = document.getElementById("share-card");
    if (!card) return;

    const canvas = await html2canvas(card, {
      backgroundColor: null,
      scale: 3,
    });

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], "aguita.png", {
        type: "image/png",
      });

      if (
        navigator.share &&
        navigator.canShare?.({ files: [file] })
      ) {
        try {
          await navigator.share({
            title: "Mi progreso 💧",
            text: `Hoy llevo ${(total / 1000).toFixed(1)}L 💧`,
            files: [file],
          });
          return;
        } catch (err) {
          console.log(err);
        }
      }

      const link = document.createElement("a");
      link.download = "aguita-progress.png";
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  }

  return (
    <div className="mt-4">
      {/* 👇 CARD OCULTA (solo para captura) */}
      <div
        id="share-card"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "360px", // importante para consistencia
          background:
            "linear-gradient(135deg, #38bdf8 0%, #67e8f9 50%, #3b82f6 100%)",
        }}
      >
        <div className="p-6 text-white rounded-[36px]">
          <h2 className="text-2xl font-black">{userName}</h2>

          <div className="text-center mt-8">
            <div className="text-6xl font-black">{percent}%</div>
            <p>completado</p>
          </div>

          <div className="mt-6">
            <p>Consumido: {(total / 1000).toFixed(1)}L</p>
            <p>Meta: {goalMl / 1000}L</p>
          </div>
        </div>
      </div>

      {/* 👇 SOLO BOTÓN VISIBLE */}
      <button
        onClick={shareImage}
        style={{
          background:
            "linear-gradient(135deg, #1d6fd4 0%, #0ea5c9 100%)",
        }}
        className="
          w-full
          rounded-2xl
          text-white
          py-3
          font-semibold
          shadow-lg
          active:scale-[0.98]
          transition-all
          cursor-pointer

        "
      >
        Compartir progreso 💧
      </button>
    </div>
  );
}