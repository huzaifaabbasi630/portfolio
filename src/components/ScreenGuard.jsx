import { useState, useEffect } from 'react';

const BREAKPOINT = 1032;

/**
 * ScreenGuard — shows a centered modal warning when the viewport is
 * narrower than BREAKPOINT px.
 *
 * Props:
 *   children  – the rest of the app to render underneath
 */
export default function ScreenGuard({ children }) {
  const [isTooSmall, setIsTooSmall] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < BREAKPOINT
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const small = window.innerWidth < BREAKPOINT;
      setIsTooSmall(small);
      // Reset dismiss so warning re-appears if user shrinks again
      if (!small) setDismissed(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showModal = isTooSmall && !dismissed;

  return (
    <>
      {/* ── Underlying content ── */}
      <div
        className={`transition-all duration-300 ${
          showModal ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        {children}
      </div>

      {/* ── Overlay + Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center
                     bg-black/80 backdrop-blur-md px-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="screen-guard-title"
        >
          {/* Modal box */}
          <div
            className="relative w-full max-w-md rounded-2xl border border-purple-500/30
                       bg-[#0d0d12] shadow-[0_0_60px_rgba(139,92,246,0.15)]
                       overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400" />

            <div className="px-8 py-10 flex flex-col items-center text-center gap-6">
              {/* Icon */}
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full
                           bg-purple-500/10 border border-purple-500/30"
              >
                {/* Monitor + warning SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                  <path d="M12 7v4M12 13h.01" strokeWidth="2" />
                </svg>
              </div>

              {/* Heading */}
              <div className="flex flex-col gap-2">
                <h2
                  id="screen-guard-title"
                  className="text-xl font-semibold tracking-tight text-white"
                >
                  Screen Too Small
                </h2>
                <p className="text-sm leading-relaxed text-gray-400 max-w-xs mx-auto">
                  For a better experience, please use a{' '}
                  <span className="text-purple-400 font-medium">
                    desktop or larger screen device
                  </span>
                  .
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/5" />

              {/* Dismiss button */}
              <button
                onClick={() => setDismissed(true)}
                className="group relative w-full py-3 px-6 rounded-xl text-sm font-medium
                           text-white overflow-hidden
                           border border-purple-500/40
                           bg-purple-500/10
                           transition-all duration-200
                           hover:bg-purple-500/20 hover:border-purple-400/60
                           hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
                           active:scale-[0.98] cursor-pointer"
              >
                {/* Subtle shimmer on hover */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                             transition-transform duration-700 ease-in-out
                             bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
                <span className="relative">Anyway, I will use this device</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
