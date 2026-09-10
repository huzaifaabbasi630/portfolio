import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/',         label: 'Home'     },
  { path: '/projects', label: 'Projects' },
  { path: '/skills',   label: 'Skills'   },
  { path: '/contact',  label: 'Contact'  },
];

const SCROLL_TOP_THRESHOLD = 600;

const HDR_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

.hdr-wrap {
  position: fixed; top: 0; left: 0; right: 0; z-index: 5000;
  display: flex; justify-content: center;
  padding: 20px 24px;
  transition: padding 0.2s ease;
}

.hdr-progress-track {
  position: fixed; top: 0; left: 0; right: 0; height: 2.5px;
  z-index: 5001;
  background: transparent;
  pointer-events: none;
}
.hdr-progress-fill {
  height: 100%;
  background: #FEF6E9;
  transform-origin: left;
  transition: background .3s ease;
}

.hdr-pill {
  position: relative;
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; max-width: 860px;
  padding: 10px 10px 10px 22px;
  border-radius: 100px;
  transition: box-shadow .35s cubic-bezier(.22,1,.36,1), border-color .35s cubic-bezier(.22,1,.36,1), max-width .35s cubic-bezier(.22,1,.36,1);
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;

  /* dark (brown/cream) theme is the default, always-on look — hovering
     any child never touches these three properties, so the pill itself
     never changes color. */
  background: #5A3A2B;
  border: 1px solid #5A3A2B;
  box-shadow: 0 8px 36px rgba(90,58,43,.24);
}
.hdr-wrap.small .hdr-pill {
  max-width: 500px;
  box-shadow: 0 12px 48px rgba(90,58,43,.28), 0 0 0 1px rgba(90,58,43,.35);
}

.hdr-glow {
  position: absolute;
  top: 0; left: 0;
  width: 220px; height: 220px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(255,255,255,.35) 0%, rgba(255,255,255,0) 70%);
  opacity: 0;
  transition: opacity .3s ease;
  z-index: 0;
  transform: translate(-50%, -50%);
}
.hdr-pill:hover .hdr-glow { opacity: 1; }

.hdr-logo {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: 16px; letter-spacing: -.3px;
  text-decoration: none; display: flex; align-items: center; gap: 8px;
  flex-shrink: 0; position: relative; z-index: 1;
  background: none; border: none; cursor: pointer; padding: 0;
}
.hdr-logo-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #FFFFFF; flex-shrink: 0;
  animation: hdr-dot 2s ease infinite;
  transition: transform .35s cubic-bezier(.34,1.56,.64,1);
}
.hdr-logo:hover .hdr-logo-dot { transform: scale(1.6) rotate(180deg); }
@keyframes hdr-dot {
  0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,.3); }
  50%      { box-shadow: 0 0 0 7px rgba(255,255,255,0); }
}
.hdr-logo-text {
  color: #FFFFFF; font-weight: 800;
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 34px;
  font-variant-numeric: tabular-nums;
  transition: letter-spacing .35s cubic-bezier(.22,1,.36,1);
}
.hdr-logo:hover .hdr-logo-text { letter-spacing: .5px; }

.hdr-nav { display: flex; align-items: center; gap: 4px; position: relative; z-index: 1; }
.hdr-link {
  position: relative; padding: 7px 14px; border-radius: 100px;
  font-size: 13px; font-weight: 600; letter-spacing: .03em;
  color: rgba(255,255,255,.65); text-decoration: none;
  transition: color .22s ease, letter-spacing .22s ease, background .22s ease;
  display: inline-block;
}
/* Visible per-link hover: only THIS link's pill darkens/lights up — the
   header pill background above is untouched, so nothing else moves. */
.hdr-link:hover { color: #FFFFFF; letter-spacing: .05em; background: rgba(255,255,255,.22); }
.hdr-link.active { color: #FFFFFF; }
.hdr-link-bg {
  position: absolute; inset: 0; border-radius: 100px;
  background: rgba(255,255,255,.16);
  border: 1px solid rgba(255,255,255,.2);
}

.hdr-link-underline {
  position: absolute; left: 14px; right: 14px; bottom: 3px;
  height: 1.5px; background: currentColor;
  transform: scaleX(0); transform-origin: left;
  transition: transform .3s cubic-bezier(.22,1,.36,1);
  z-index: 1;
}
.hdr-link:hover .hdr-link-underline { transform: scaleX(1); }
.hdr-link.active .hdr-link-underline { display: none; }

.hdr-cta {
  padding: 9px 22px; border-radius: 100px; flex-shrink: 0;
  background: #FEF6E9;
  color: #5A3A2B; font-size: 13px; font-weight: 700; letter-spacing: .04em;
  text-decoration: none; position: relative; overflow: hidden;
  transition: box-shadow .28s ease, filter .28s ease, background .28s ease;
  z-index: 1;
  will-change: transform;
}
.hdr-cta::after {
  content: '';
  position: absolute;
  top: 0; left: -60%;
  width: 40%; height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,.6), transparent);
  transform: skewX(-20deg);
  transition: left .55s cubic-bezier(.22,1,.36,1);
}
.hdr-cta:hover::after { left: 130%; }
.hdr-cta:hover { background: #ffffff; box-shadow: 0 10px 24px rgba(0,0,0,.18); }
.hdr-cta span { position: relative; z-index: 1; }

.hdr-resume {
  padding: 9px 18px; border-radius: 100px; flex-shrink: 0;
  border: 1px solid rgba(255,255,255,.45);
  background: transparent;
  color: #FFFFFF; font-size: 13px; font-weight: 700; letter-spacing: .04em;
  text-decoration: none; display: flex; align-items: center; gap: 7px;
  transition: background .28s ease, border-color .28s ease, box-shadow .28s ease;
  margin-right: 8px;
  z-index: 1;
  will-change: transform;
}
/* Visible per-button hover: resume fills solid white, text/icon flip to brown —
   this only happens to the resume pill itself. */
.hdr-resume:hover {
  background: #FEF6E9; border-color: #FEF6E9; color: #5A3A2B;
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
}
.hdr-resume svg {
  background: #EEDCC6; color: #5A3A2B; border-radius: 7px; padding: 4px; box-sizing: content-box;
  transition: transform .35s cubic-bezier(.34,1.56,.64,1), background .28s ease;
}
.hdr-resume:hover svg { animation: hdr-download-bob .7s ease infinite; background: #5A3A2B; color: #FEF6E9; }
@keyframes hdr-download-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(3px); }
}

.hdr-burger {
  display: none; width: 38px; height: 38px; border-radius: 50%;
  align-items: center; justify-content: center;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.25);
  color: #FFFFFF; cursor: pointer;
  transition: background .2s, transform .25s cubic-bezier(.34,1.56,.64,1);
  flex-shrink: 0; z-index: 1;
}
.hdr-burger:hover { background: rgba(255,255,255,.2); transform: rotate(-8deg) scale(1.06); }
.hdr-burger:active { transform: scale(.9); }

.hdr-mobile {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 199;
  display: flex; flex-direction: column;
  background: rgba(90,58,43,.98); backdrop-filter: blur(32px);
  padding: 100px 32px 48px;
}
.hdr-mob-link {
  display: block; padding: 18px 0;
  font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800;
  letter-spacing: -1px; color: rgba(255,255,255,.55);
  text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.15);
  transition: color .3s ease, padding-left .3s cubic-bezier(.22,1,.36,1), letter-spacing .3s ease;
}
.hdr-mob-link:hover, .hdr-mob-link.active { color: #FFFFFF; padding-left: 10px; letter-spacing: -.5px; }
.hdr-mob-cta {
  margin-top: 36px; display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 36px; border-radius: 100px;
  background: #5A3A2B; border: 1px solid #5A3A2B; color: #FEF6E9;
  font-size: 16px; font-weight: 700; text-decoration: none;
  align-self: flex-start;
  transition: transform .25s cubic-bezier(.34,1.56,.64,1);
}
.hdr-mob-cta:active { transform: scale(.95); }

@media (max-width: 768px) {
  .hdr-nav, .hdr-cta, .hdr-resume { display: none !important; }
  .hdr-burger { display: flex !important; }
  .hdr-pill { padding: 10px 10px 10px 18px; }
  .hdr-wrap.small .hdr-pill { max-width: 400px; }
}
`;

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function useScrambleText(target, duration = 700) {
  const [text, setText] = useState(target);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    const totalFrames = Math.round(duration / 40);
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealCount = Math.floor(progress * target.length);

      const next = target
        .split('')
        .map((ch, i) => (i < revealCount ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
        .join('');

      setText(next);

      if (frame >= totalFrames) {
        setText(target);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [target, duration]);

  return text;
}

function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * strength, y: relY * strength });
  };

  const onMouseLeave = () => setPos({ x: 0, y: 0 });

  return { ref, pos, onMouseMove, onMouseLeave };
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [pastTop, setPastTop] = useState(false);
  const location = useLocation();
  const pillRef = useRef(null);
  const glowRef = useRef(null);

  const logoText = useScrambleText('HMH', 700);
  const ctaMag = useMagnetic(0.3);
  const resumeMag = useMagnetic(0.3);

  // scroll tracking: shrink-on-scroll, progress bar, scroll-to-top threshold
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsSmall(true);
      } else if (currentScrollY < lastScrollY || currentScrollY === 0) {
        setIsSmall(false);
      }
      setLastScrollY(currentScrollY);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setScrollPct(Math.min(100, Math.max(0, pct)));

      setPastTop(currentScrollY > SCROLL_TOP_THRESHOLD);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  // inject styles once
  useEffect(() => {
    const id = 'hdr-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id; el.textContent = HDR_STYLES;
      document.head.appendChild(el);
    }
  }, []);

  // lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // pill 3D tilt + cursor glow
  const handlePillMouseMove = (e) => {
    const pill = pillRef.current;
    const glow = glowRef.current;
    if (!pill || !glow) return;
    const rect = pill.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;

    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 4;
    const rotateX = -((y - midY) / midY) * 4;
    pill.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handlePillMouseLeave = () => {
    const pill = pillRef.current;
    if (!pill) return;
    pill.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  };

  // logo doubles as scroll-to-top once you've scrolled past the threshold
  const handleLogoClick = (e) => {
    if (pastTop) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="hdr-progress-track">
        <div className="hdr-progress-fill" style={{ width: `${scrollPct}%` }} />
      </div>

      <motion.div
        className={`hdr-wrap ${isSmall ? 'small' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: .7, ease: [.22,1,.36,1] }}
      >
        <div
          className="hdr-pill"
          ref={pillRef}
          onMouseMove={handlePillMouseMove}
          onMouseLeave={handlePillMouseLeave}
        >
          <div className="hdr-glow" ref={glowRef} />

          <Link to="/" className="hdr-logo" onClick={handleLogoClick} aria-label={pastTop ? 'Scroll to top' : 'Home'}>
            <span className="hdr-logo-dot" />
            <span className="hdr-logo-text">
              <AnimatePresence mode="wait" initial={false}>
                {pastTop ? (
                  <motion.svg
                    key="up-arrow"
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ opacity: 0, rotate: -90, scale: 0.4 }}
                    animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                    exit={{    opacity: 0, rotate: 90,  scale: 0.4 }}
                    transition={{ duration: 0.3, ease: [.22,1,.36,1] }}
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </motion.svg>
                ) : (
                  <motion.span
                    key="logo-text"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1   }}
                    exit={{    opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {logoText}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </Link>

          <nav className="hdr-nav">
            {isSmall ? (
              <>
                {navLinks.map(({ path, label }) => {
                  if (location.pathname === path) {
                    return (
                      <Link key={path} to={path} className="hdr-link active">
                        <motion.span
                          className="hdr-link-bg"
                          layoutId="hdr-pill-active"
                          transition={{ type:'spring', stiffness:380, damping:32 }}
                        />
                        <span style={{ position:'relative', zIndex:1 }}>{label}</span>
                        <span className="hdr-link-underline" />
                      </Link>
                    );
                  }
                  return null;
                })}
              </>
            ) : (
              navLinks.map(({ path, label }) => {
                const active = location.pathname === path;
                return (
                  <motion.div key={path} whileTap={{ scale: 0.92 }} style={{ display: 'inline-block' }}>
                    <Link to={path} className={`hdr-link ${active ? 'active' : ''}`}>
                      {active && (
                        <motion.span
                          className="hdr-link-bg"
                          layoutId="hdr-pill-active"
                          transition={{ type:'spring', stiffness:380, damping:32 }}
                        />
                      )}
                      <span style={{ position:'relative', zIndex:1 }}>{label}</span>
                      <span className="hdr-link-underline" />
                    </Link>
                  </motion.div>
                );
              })
            )}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center' }} className="hdr-actions-desktop">
            <motion.a
              href="/assets/resume.pdf"
              className="hdr-resume"
              ref={resumeMag.ref}
              onMouseMove={resumeMag.onMouseMove}
              onMouseLeave={resumeMag.onMouseLeave}
              animate={{ x: resumeMag.pos.x, y: resumeMag.pos.y }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.5 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Resume</span>
            </motion.a>

            <motion.div
              ref={ctaMag.ref}
              onMouseMove={ctaMag.onMouseMove}
              onMouseLeave={ctaMag.onMouseLeave}
              animate={{ x: ctaMag.pos.x, y: ctaMag.pos.y }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.5 }}
              style={{ display: 'inline-block' }}
            >
              <Link to="/contact" className="hdr-cta">
                <span>Hire Me</span>
              </Link>
            </motion.div>
          </div>

          <motion.button
            className="hdr-burger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.85 }}
          >
            <motion.svg
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {open
                ? <><path d="M18 6 6 18"/><path d="M6 6l12 12"/></>
                : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/></>
              }
            </motion.svg>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="hdr-mobile"
            initial={{ opacity:0, y:-20 }}
            animate={{ opacity:1, y:0   }}
            exit={{   opacity:0, y:-20  }}
            transition={{ duration:.35, ease:[.22,1,.36,1] }}
          >
            {navLinks.map(({ path, label }, i) => (
              <motion.div
                key={path}
                initial={{ opacity:0, x:-24 }}
                animate={{ opacity:1, x:0   }}
                whileHover={{ x: 6 }}
                transition={{ delay: i * .06, type: 'spring', stiffness: 300, damping: 22 }}
              >
                <Link
                  to={path}
                  className={`hdr-mob-link ${location.pathname === path ? 'active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0  }}
              transition={{ delay:.35 }}
              className="flex flex-col gap-4 mt-6"
            >
              <motion.a
                href="/assets/resume.pdf"
                className="hdr-mob-cta"
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.95 }}
              >
                <span>Resume</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </motion.a>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="hdr-mob-cta" onClick={() => setOpen(false)}>
                  <span>Hire Me ↗</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}