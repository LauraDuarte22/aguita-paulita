export function registerSWUpdate(onUpdateReady) {
    if (!("serviceWorker" in navigator)) return;
  
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
  
        if (!newWorker) return;
  
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // 👉 nueva versión disponible
            onUpdateReady(newWorker);
          }
        });
      });
  
      // chequeo periódico (importante)
      setInterval(() => {
        reg.update();
      }, 60000);
    });
  }