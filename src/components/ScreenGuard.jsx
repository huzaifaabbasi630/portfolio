import { useState, useEffect } from 'react';

const BREAKPOINT = 1025;

export default function ScreenGuard({ children }) {
  const [isTooSmall, setIsTooSmall] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      const small = window.innerWidth < BREAKPOINT;
      setIsTooSmall(small);
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => {
    if (!isTooSmall) {
      setDismissed(false);
    }
  }, [isTooSmall]);

  const showModal = isTooSmall && !dismissed;

  return (
    <>
      {/* Underlying content */}
      <div
        className={`transition-all duration-300 ${
          showModal ? 'blur-md pointer-events-none select-none max-h-screen overflow-hidden' : ''
        }`}
      >
        {children}
      </div>

      {/* Overlay + Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#b2dfc3] backdrop-blur-lg p-4 overflow-y-auto"
          aria-modal="true"
          role="dialog"
          aria-labelledby="screen-guard-title"
        >
          {/* Modal box */}
          <div
            className="relative w-full max-w-md my-auto rounded-2xl border border-[#043221]/30 bg-[#b2dfc3] shadow-[0_0_60px_rgba(4,50,33,0.3)] overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#043221] via-emerald-800 to-[#043221]" />

            <div className="px-6 py-8 md:px-8 md:py-10 flex flex-col items-center text-center gap-6">
              {/* Icon */}
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full bg-[#043221]/10 border border-[#043221]/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-[#043221]"
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
                  className="text-xl font-bold tracking-tight text-[#043221]"
                >
                  Screen Too Small
                </h2>
                <p className="text-sm leading-relaxed text-[#043221]/70 max-w-xs mx-auto">
                  For a better experience, please use a{' '}
                  <span className="text-[#043221] font-bold">
                    desktop or larger screen device
                  </span>
                  .
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#043221]/15" />

              {/* Dismiss button */}
              <button
                onClick={() => setDismissed(true)}
                className="group relative w-full py-3 px-6 rounded-xl text-sm font-bold text-[#043221] overflow-hidden border border-[#043221]/40 bg-[#043221]/10 transition-all duration-200 hover:bg-[#043221]/20 hover:border-[#043221]/60 hover:shadow-[0_0_20px_rgba(4,50,33,0.15)] active:scale-[0.98] cursor-pointer"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/5 to-transparent"
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