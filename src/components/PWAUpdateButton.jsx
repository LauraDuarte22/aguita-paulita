import { useEffect, useState } from "react";
import { registerSWUpdate } from "../hooks/useUpdatePWA";

export default function PWAUpdateButton() {
  const [worker, setWorker] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    registerSWUpdate((newWorker) => {
      setWorker(newWorker);
      setShow(true);
    });
  }, []);

  if (!show) return null;

  function updateApp() {
    if (!worker) return;

    worker.postMessage({ type: "SKIP_WAITING" });

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      () => {
        window.location.reload();
      }
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="
        bg-slate-900 text-white
        px-4 py-3
        rounded-2xl
        shadow-2xl
        flex items-center gap-3
      ">
        <span className="text-sm">
          ✨ Nueva versión disponible
        </span>

        <button
          onClick={updateApp}
          className="
            bg-cyan-500 hover:bg-cyan-400
            px-3 py-1
            rounded-xl
            text-sm font-semibold
          "
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}