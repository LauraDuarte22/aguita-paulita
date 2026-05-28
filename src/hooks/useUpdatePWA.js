export function registerAutoUpdateSW() {
    if (!("serviceWorker" in navigator)) return;
  
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      // fuerza chequeo de updates cada 1 min
      setInterval(() => {
        reg.update();
      }, 60000);
  
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
  
        if (!newWorker) return;
  
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // 👉 AUTO UPDATE SILENCIOSO
            autoApplyUpdate(newWorker);
          }
        });
      });
    });
  }
  
  function autoApplyUpdate(worker) {
    worker.postMessage({ type: "SKIP_WAITING" });
  
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  }