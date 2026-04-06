import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/',        label: 'Home'     },
  { path: '/projects',label: 'Projects' },
  { path: '/skills',  label: 'Skills'   },
  { path: '/contact', label: 'Contact'  },
];

const HDR_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

.hdr-wrap {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200000;
  display: flex; justify-content: center;
  padding: 20px 24px;
  transition: padding 0.2s ease;
}

.hdr-pill {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; max-width: 860px;
  padding: 10px 10px 10px 22px;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,.07);
  background: rgba(4,5,14,.5);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 8px 48px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.05);
  transition: all 0.2s ease;
}
.hdr-wrap.small .hdr-pill {
  max-width: 500px;  /* Only width changes */
  border-color: rgba(99,102,241,.25);
  box-shadow: 0 12px 56px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06), 0 0 0 1px rgba(99,102,241,.15);
}

/* logo - always HMH */
.hdr-logo {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: 16px; letter-spacing: -.3px;
  text-decoration: none; display: flex; align-items: center; gap: 8px;
  flex-shrink: 0;
}
.hdr-logo-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #6366f1; flex-shrink: 0;
  animation: hdr-dot 2s ease infinite;
}
@keyframes hdr-dot {
  0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,.55); }
  50%      { box-shadow: 0 0 0 7px rgba(99,102,241,0); }
}
.hdr-logo-text {
  background: linear-gradient(130deg, #f1f1ff 0%, rgba(241,241,255,.55) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

/* desktop nav */
.hdr-nav { display: flex; align-items: center; gap: 4px; }
.hdr-link {
  position: relative; padding: 7px 14px; border-radius: 100px;
  font-size: 13px; font-weight: 600; letter-spacing: .03em;
  color: rgba(241,241,255,.45); text-decoration: none;
  transition: color 0.2s;
}
.hdr-link:hover { color: rgba(241,241,255,.85); }
.hdr-link.active { color: #f1f1ff; }
.hdr-link-bg {
  position: absolute; inset: 0; border-radius: 100px;
  background: rgba(99,102,241,.12);
  border: 1px solid rgba(99,102,241,.18);
}

/* hire me cta */
.hdr-cta {
  padding: 9px 22px; border-radius: 100px; flex-shrink: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff; font-size: 13px; font-weight: 700; letter-spacing: .04em;
  text-decoration: none; position: relative; overflow: hidden;
  transition: transform .22s, box-shadow .22s;
}
.hdr-cta::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, #818cf8, #a78bfa);
  opacity: 0; transition: opacity .22s;
}
.hdr-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(99,102,241,.45); }
.hdr-cta:hover::before { opacity: 1; }
.hdr-cta span { position: relative; z-index: 1; }

.hdr-resume {
  padding: 9px 18px; border-radius: 100px; flex-shrink: 0;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.03);
  color: rgba(241,241,255,.65); font-size: 13px; font-weight: 700; letter-spacing: .04em;
  text-decoration: none; display: flex; align-items: center; gap: 7px;
  transition: all .22s cubic-bezier(.22,1,.36,1);
  margin-right: 8px;
}
.hdr-resume:hover {
  background: rgba(99,102,241,.1); border-color: rgba(99,102,241,.35);
  color: #a5b4fc; transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99,102,241,.08);
}
.hdr-resume svg { transition: transform .2s; }
.hdr-resume:hover svg { transform: translateY(-1px); }

/* hamburger */
.hdr-burger {
  display: none; width: 38px; height: 38px; border-radius: 50%;
  align-items: center; justify-content: center;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
  color: rgba(241,241,255,.7); cursor: pointer;
  transition: background .2s, color .2s; flex-shrink: 0;
}
.hdr-burger:hover { background: rgba(99,102,241,.12); color: #f1f1ff; border-color: rgba(99,102,241,.3); }

/* mobile drawer */
.hdr-mobile {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 199;
  display: flex; flex-direction: column;
  background: rgba(4,5,14,.96); backdrop-filter: blur(32px);
  padding: 100px 32px 48px;
}
.hdr-mob-link {
  display: block; padding: 18px 0;
  font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800;
  letter-spacing: -1px; color: rgba(241,241,255,.35);
  text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.05);
  transition: color .2s;
}
.hdr-mob-link:hover, .hdr-mob-link.active { color: #f1f1ff; }
.hdr-mob-link.active {
  background: linear-gradient(130deg, #6366f1, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hdr-mob-cta {
  margin-top: 36px; display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 36px; border-radius: 100px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff; font-size: 16px; font-weight: 700; text-decoration: none;
  align-self: flex-start;
}

/* responsive */
@media (max-width: 640px) {
  .hdr-nav, .hdr-cta, .hdr-resume { display: none !important; }
  .hdr-burger { display: flex !important; }
  .hdr-pill { padding: 10px 10px 10px 18px; }
  .hdr-wrap.small .hdr-pill { max-width: 400px; }
}
`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Small navbar when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setIsSmall(true);
      } 
      // Full navbar when scrolling up ANY amount (even 1px)
      else if (currentScrollY < lastScrollY) {
        setIsSmall(false);
      }
      // At very top (scrollY === 0) always full
      else if (currentScrollY === 0) {
        setIsSmall(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial check
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

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <motion.div
        className={`hdr-wrap ${isSmall ? 'small' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: .7, ease: [.22,1,.36,1] }}
      >
        <div className="hdr-pill">

          {/* Logo - always HMH */}
          <Link to="/" className="hdr-logo" onClick={() => setOpen(false)}>
            <span className="hdr-logo-dot" />
            <span className="hdr-logo-text">HMH</span>
          </Link>

          {/* Desktop links - shows only current page when small, all links when full */}
          <nav className="hdr-nav">
            {isSmall ? (
              // When small, show only current page link
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
                      </Link>
                    );
                  }
                  return null;
                })}
              </>
            ) : (
              // When full, show all links
              navLinks.map(({ path, label }) => {
                const active = location.pathname === path;
                return (
                  <Link key={path} to={path} className={`hdr-link ${active ? 'active' : ''}`}>
                    {active && (
                      <motion.span
                        className="hdr-link-bg"
                        layoutId="hdr-pill-active"
                        transition={{ type:'spring', stiffness:380, damping:32 }}
                      />
                    )}
                    <span style={{ position:'relative', zIndex:1 }}>{label}</span>
                  </Link>
                );
              })
            )}
          </nav>

          {/* Right actions (Resume + Hire me) - always visible */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/assets/resume.pdf" className="hdr-resume">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Resume</span>
            </a>
            <Link to="/contact" className="hdr-cta">
              <span>Hire Me</span>
            </Link>
          </div>

          {/* Burger */}
          <button
            className="hdr-burger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open
                ? <><path d="M18 6 6 18"/><path d="M6 6l12 12"/></>
                : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/></>
              }
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Mobile full-screen menu */}
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
                transition={{ delay: i * .06 }}
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
            >
            <a href="/assets/resume.pdf" className="hdr-mob-cta" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(241,241,255,.6)', marginBottom: '12px' }} onClick={() => setOpen(false)}>
              <span>Resume</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
            <Link to="/contact" className="hdr-mob-cta" onClick={() => setOpen(false)}>
              <span>Hire Me</span>
              <span>↗</span>
            </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
