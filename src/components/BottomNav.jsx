const ITEMS = [
  {
    id: 'home',
    label: 'Inicio',
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12L12 3l9 9" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    id: 'stats',
    label: 'Stats',
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="7" width="4" height="14" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Ajustes',
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const IDX = { home: 0, stats: 1, settings: 2 };

export default function BottomNav({ currentTab, setCurrentTab }) {
  const activeIdx = IDX[currentTab] ?? 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .bnav-wrap {
          position: fixed;
          bottom: 20px;
          left: 0; right: 0;
          z-index: 50;
          display: flex;
          justify-content: center;
          padding: 0 16px;
          font-family: 'DM Sans', sans-serif;
        }

        .bnav-pill {
          width: 100%;
          max-width: 380px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 28px;
          padding: 6px;
          box-shadow:
            0 8px 32px rgba(14, 90, 160, 0.12),
            0 2px 8px rgba(14, 90, 160, 0.08),
            inset 0 1px 0 rgba(255,255,255,0.8);
          position: relative;
        }

        .bnav-track {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          position: relative;
        }

        /* sliding pill background */
        .bnav-slider {
          position: absolute;
          top: 0; bottom: 0;
          width: calc(100% / 3);
          padding: 3px;
          transition: transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .bnav-slider-inner {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1d6fd4 0%, #0ea5c9 100%);
          border-radius: 22px;
          box-shadow: 0 4px 16px rgba(14, 90, 200, 0.35);
        }

        .bnav-btn {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 10px 4px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 22px;
          transition: opacity 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .bnav-btn:active { opacity: 0.75; }

        .bnav-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.25s;
          line-height: 0;
        }
        .bnav-btn.active .bnav-icon {
          transform: scale(1.1) translateY(-1px);
          color: #fff;
        }
        .bnav-btn:not(.active) .bnav-icon {
          color: #94a3b8;
        }

        .bnav-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: color 0.25s;
          line-height: 1;
        }
        .bnav-btn.active .bnav-label { color: #fff; }
        .bnav-btn:not(.active) .bnav-label { color: #94a3b8; }

        .bnav-btn:not(.active):hover .bnav-icon,
        .bnav-btn:not(.active):hover .bnav-label {
          color: #64748b;
        }

        /* dot indicator on active */
        .bnav-dot {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .bnav-btn.active .bnav-dot { opacity: 1; }
      `}</style>

      <nav className="bnav-wrap" aria-label="Navegación principal">
        <div className="bnav-pill">
          <div className="bnav-track">
            {/* sliding highlight */}
            <div
              className="bnav-slider"
              style={{ transform: `translateX(${activeIdx * 100}%)` }}
            >
              <div className="bnav-slider-inner" />
            </div>

            {ITEMS.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`bnav-btn${active ? ' active' : ''}`}
                  onClick={() => setCurrentTab(item.id)}
                  aria-current={active ? 'page' : undefined}
                  aria-label={item.label}
                >
                  <span className="bnav-icon">{item.icon(active)}</span>
                  <span className="bnav-label">{item.label}</span>
                  <span className="bnav-dot" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
