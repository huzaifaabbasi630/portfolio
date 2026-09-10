import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
];

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/huzaifaabbasi630',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hafiz-muhammad-huzaifa/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

// Magnetic Wrapper Component
const MagneticButton = ({ children, className = '', ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.25);
    y.set(middleY * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.ft { 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  position: relative; 
  overflow: hidden; 
  color: #FFFFFF; 
  background: #5A3A2B; 
}

.ft-line {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.28) 25%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.28) 75%, transparent 100%);
}

.ft-bg { position: absolute; inset: 0; background: #5A3A2B; pointer-events: none; }
.ft-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
.ft-noise {
  position: absolute; inset: 0; pointer-events: none; opacity: .025;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}
.ft-grid-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

.ft-inner {
  position: relative; z-index: 2;
  max-width: 1100px; margin: 0 auto;
  padding: 72px 40px 44px;
}

.ft-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 56px;
  padding-bottom: 56px;
  border-bottom: 1px solid rgba(255,255,255,.18);
  margin-bottom: 32px;
}

/* brand */
.ft-logo {
  display: inline-flex; align-items: center; gap: 10px;
  text-decoration: none; margin-bottom: 18px;
}
.ft-logo-dot { width: 8px; height: 8px; border-radius: 50%; background: #FFFFFF; flex-shrink: 0; }
@keyframes ft-dot { 0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.5)} 50%{box-shadow:0 0 0 8px rgba(255,255,255,0)} }
.ft-logo-dot { animation: ft-dot 2.2s ease infinite; }
.ft-logo-text {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; letter-spacing: -.3px;
  color: #FFFFFF; transition: transform .3s ease;
}
.ft-logo:hover .ft-logo-text { transform: translateX(3px); }

.ft-tagline { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,.78); max-width: 320px; margin-bottom: 20px; }

/* Interactive Email Action */
.ft-email-box {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 14px; border-radius: 12px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.15);
  margin-bottom: 20px; cursor: pointer; transition: all .25s ease;
}
.ft-email-box:hover {
  background: rgba(255,255,255,.12);
  border-color: rgba(255,255,255,.3);
}
.ft-email-text { font-size: 12.5px; font-weight: 600; color: #FFFFFF; }
.ft-copy-badge {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  padding: 3px 8px; border-radius: 6px; background: #EEDCC6; color: #5A3A2B;
}

/* Status & Time */
.ft-status-container { display: flex; flex-direction: column; gap: 10px; }
.ft-avail {
  display: inline-flex; align-items: center; gap: 8px; width: fit-content;
  padding: 8px 16px; border-radius: 100px;
  background: #EEDCC6; border: 1px solid #EEDCC6;
  font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #5A3A2B;
  box-shadow: 0 4px 12px rgba(0,0,0,.08); transition: all .3s ease;
}
.ft-avail:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.15); }
.ft-avail-dot { width: 6px; height: 6px; border-radius: 50%; background: #5A3A2B; }
@keyframes ft-adot { 0%,100%{box-shadow:0 0 0 0 rgba(90,58,43,.4)} 50%{box-shadow:0 0 0 6px rgba(90,58,43,0)} }
.ft-avail-dot { animation: ft-adot 2s infinite; }

.ft-time-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 500; color: rgba(255,255,255,.75);
}

/* col label */
.ft-col-label {
  font-family: 'Syne', sans-serif;
  font-size: 11px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(255,255,255,.78); margin-bottom: 22px;
  display: flex; align-items: center; gap: 8px;
}
.ft-col-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,.25), transparent); }

/* nav links */
.ft-nav-links { display: flex; flex-direction: column; gap: 6px; }
.ft-nav-link {
  display: flex; align-items: center;
  padding: 8px 12px; border-radius: 10px;
  font-size: 14px; font-weight: 500; color: rgba(255,255,255,.78);
  text-decoration: none; transition: all .25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative; overflow: hidden;
}
.ft-nav-link::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: #EEDCC6; border-radius: 2px;
  transform: scaleY(0); transition: transform .25s cubic-bezier(0.4, 0, 0.2, 1);
}
.ft-nav-link:hover { 
  color: #5A3A2B; background: #EEDCC6; padding-left: 18px; 
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
}
.ft-nav-link:hover::before { transform: scaleY(1); }

/* socials */
.ft-social-links { display: flex; flex-direction: column; gap: 10px; }
.ft-social {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px; border-radius: 12px; text-decoration: none;
  background: #EEDCC6; border: 1px solid #EEDCC6;
  color: #5A3A2B; font-size: 13.5px; font-weight: 600;
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,.06); width: 100%;
}
.ft-social::after {
  content: '→'; position: absolute; right: 14px; font-size: 13px;
  opacity: 0; transform: translateX(-8px); transition: all .25s ease;
  color: #5A3A2B; font-weight: bold;
}
.ft-social:hover { 
  box-shadow: 0 8px 20px rgba(0,0,0,.15); padding-right: 34px;
}
.ft-social:hover::after { opacity: 1; transform: translateX(0); }
.ft-social-ic {
  width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(90,58,43,.08); border: 1px solid rgba(90,58,43,.1); 
  transition: all .25s ease;
}
.ft-social:hover .ft-social-ic { 
  background: rgba(90,58,43,.15); transform: scale(1.05) rotate(-3deg);
}

/* bottom */
.ft-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.ft-copy {
  font-size: 12.5px; color: rgba(255,255,255,.78); font-weight: 500;
  display: flex; align-items: center; gap: 7px; flex-wrap: wrap;
}
.ft-copy-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 13px; color: #FFFFFF; }
.ft-sep { color: rgba(255,255,255,.3); }
@keyframes ft-beat { 0%,100%{transform:scale(1)} 40%{transform:scale(1.25)} }
.ft-heart { display: inline-block; color: #FFFFFF; animation: ft-beat 1.6s ease infinite; }

.ft-stack { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.ft-pill {
  padding: 4px 12px; border-radius: 100px; font-size: 10.5px; font-weight: 700;
  letter-spacing: .07em; background: #EEDCC6; border: 1px solid #EEDCC6;
  color: #5A3A2B; transition: transform .2s ease; cursor: default;
}
.ft-pill:hover { transform: scale(1.08); }

/* Top Button */
.ft-top-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: 100px; cursor: pointer;
  background: transparent; border: 1px solid rgba(255,255,255,.55);
  color: #FFFFFF; font-size: 11.5px; font-weight: 700;
  letter-spacing: .09em; text-transform: uppercase; transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.ft-top-btn:hover { 
  background: #EEDCC6; border-color: #EEDCC6; color: #5A3A2B; 
  transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,.2); 
}
.ft-top-btn svg { transition: transform .3s ease; }
.ft-top-btn:hover svg { transform: translateY(-3px); }

@media (max-width: 860px) {
  .ft-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
  .ft-brand-col { grid-column: 1 / -1; }
}
@media (max-width: 540px) {
  .ft-grid { grid-template-columns: 1fr; gap: 36px; }
  .ft-inner { padding: 48px 24px 32px; }
  .ft-bottom { flex-direction: column; align-items: flex-start; gap: 20px; }
}
`;

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  const email = 'huzaifaabbasi630@gmail.com'; // Change to your preferred email address

  // Real-time Local Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy Email Handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <motion.footer
      className="ft"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <style>{STYLES}</style>

      <div className="ft-line" />

      {/* Dynamic Background */}
      <div className="ft-bg">
        <motion.div 
          className="ft-orb" 
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 480, height: 480, top: '-160px', left: '-100px', background: 'radial-gradient(circle, rgba(238,220,198,.15), transparent 70%)' }} 
        />
        <motion.div 
          className="ft-orb" 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -25, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ width: 360, height: 360, bottom: '-80px', right: '-60px', background: 'radial-gradient(circle, rgba(238,220,198,.12), transparent 70%)' }} 
        />
        <div className="ft-noise" />
        <div className="ft-grid-bg" />
      </div>

      <div className="ft-inner">
        <div className="ft-grid">

          {/* Brand & Status Column */}
          <motion.div 
            className="ft-brand-col"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/" className="ft-logo">
              <span className="ft-logo-dot" />
              <span className="ft-logo-text">HMH.</span>
            </Link>
            <p className="ft-tagline">
              Building fast, beautiful &amp; scalable web experiences — from pixel to production. Open to freelance and full-time opportunities.
            </p>

            {/* Copy Email Bar */}
            <div className="ft-email-box" onClick={handleCopyEmail}>
              <span className="ft-email-text">{email}</span>
              <span className="ft-copy-badge">{copied ? '✓ Copied!' : 'Copy'}</span>
            </div>

            <div className="ft-status-container">
              <div className="ft-avail">
                <span className="ft-avail-dot" />
                Available for work
              </div>
              <div className="ft-time-badge">
                <span>📍 Karachi, PK</span>
                <span>•</span>
                <span>{time || '00:00:00 AM'} PKT</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="ft-col-label">Navigation</p>
            <nav className="ft-nav-links">
              {NAV_LINKS.map(({ path, label }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  <Link to={path} className="ft-nav-link">{label}</Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Socials with Magnetic Animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="ft-col-label">Connect</p>
            <div className="ft-social-links">
              {SOCIALS.map(({ label, href, icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                >
                  <MagneticButton>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="ft-social"
                    >
                      <span className="ft-social-ic">{icon}</span>
                      {label}
                    </a>
                  </MagneticButton>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <motion.div 
          className="ft-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="ft-copy">
            <span>© {new Date().getFullYear()}</span>
            <span className="ft-sep">·</span>
            <span className="ft-copy-name">Hafiz Muhammad Huzaifa</span>
            <span className="ft-sep">·</span>
          </div>

          <div className="ft-stack">
            <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.6)', fontWeight: 500 }}>Built with</span>
            {['React', 'Vite', 'Framer Motion', 'Tailwind'].map(t => (
              <span key={t} className="ft-pill">{t}</span>
            ))}
          </div>

          <MagneticButton>
            <motion.button
              className="ft-top-btn"
              onClick={scrollTop}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
              Back to top
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.footer>
  );
}