import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { path: '/',         label: 'Home'     },
  { path: '/projects', label: 'Projects' },
  { path: '/skills',   label: 'Skills'   },
  { path: '/contact',  label: 'Contact'  },
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

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.ft { font-family: 'Plus Jakarta Sans', sans-serif; position: relative; overflow: hidden; }

.ft-line {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(99,102,241,.4) 25%, rgba(139,92,246,.3) 50%, rgba(99,102,241,.25) 75%, transparent 100%);
}

.ft-bg { position: absolute; inset: 0; background: rgba(4,5,14,.98); pointer-events: none; }
.ft-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
.ft-noise {
  position: absolute; inset: 0; pointer-events: none; opacity: .018;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}
.ft-grid-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(99,102,241,.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,.012) 1px, transparent 1px);
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
  border-bottom: 1px solid rgba(255,255,255,.045);
  margin-bottom: 32px;
}

/* brand */
.ft-logo {
  display: inline-flex; align-items: center; gap: 10px;
  text-decoration: none; margin-bottom: 18px;
}
.ft-logo-dot { width: 8px; height: 8px; border-radius: 50%; background: #6366f1; flex-shrink: 0; }
@keyframes ft-dot { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.6)} 50%{box-shadow:0 0 0 8px rgba(99,102,241,0)} }
.ft-logo-dot { animation: ft-dot 2.2s ease infinite; }
.ft-logo-text {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 19px; letter-spacing: -.3px;
  background: linear-gradient(130deg, #f1f1ff 0%, rgba(241,241,255,.5) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.ft-tagline { font-size: 14px; line-height: 1.75; color: rgba(241,241,255,.28); max-width: 300px; margin-bottom: 26px; }
.ft-avail {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 16px; border-radius: 100px;
  background: rgba(99,102,241,.08); border: 1px solid rgba(99,102,241,.16);
  font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #c7d2fe;
}
.ft-avail-dot { width: 6px; height: 6px; border-radius: 50%; background: #6366f1; }
@keyframes ft-adot { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)} 50%{box-shadow:0 0 0 6px rgba(99,102,241,0)} }
.ft-avail-dot { animation: ft-adot 2s infinite; }

/* col label */
.ft-col-label {
  font-family: 'Syne', sans-serif;
  font-size: 11px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(241,241,255,.2); margin-bottom: 22px;
  display: flex; align-items: center; gap: 8px;
}
.ft-col-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(99,102,241,.25), transparent); }

/* nav links */
.ft-nav-links { display: flex; flex-direction: column; gap: 3px; }
.ft-nav-link {
  display: flex; align-items: center;
  padding: 8px 10px; border-radius: 10px;
  font-size: 14px; font-weight: 500; color: rgba(241,241,255,.35);
  text-decoration: none; transition: all .22s;
  position: relative; overflow: hidden;
}
.ft-nav-link::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(135deg, #6366f1, #7c3aed); border-radius: 2px;
  transform: scaleY(0); transition: transform .22s;
}
.ft-nav-link:hover { color: #f1f1ff; background: rgba(99,102,241,.07); padding-left: 16px; }
.ft-nav-link:hover::before { transform: scaleY(1); }

/* socials */
.ft-social-links { display: flex; flex-direction: column; gap: 8px; }
.ft-social {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 15px; border-radius: 12px; text-decoration: none;
  background: rgba(255,255,255,.025); border: 1px solid rgba(255,255,255,.06);
  color: rgba(241,241,255,.4); font-size: 13.5px; font-weight: 600;
  transition: all .25s; position: relative; overflow: hidden;
}
.ft-social::after {
  content: '→'; position: absolute; right: 14px; font-size: 12px;
  opacity: 0; transform: translateX(-6px); transition: all .22s;
  color: rgba(99,102,241,.9);
}
.ft-social:hover { background: rgba(99,102,241,.1); border-color: rgba(99,102,241,.28); color: #c7d2fe; }
.ft-social:hover::after { opacity: 1; transform: translateX(0); }
.ft-social-ic {
  width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(99,102,241,.1); border: 1px solid rgba(99,102,241,.15); transition: all .22s;
}
.ft-social:hover .ft-social-ic { background: rgba(99,102,241,.22); }

/* bottom */
.ft-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.ft-copy {
  font-size: 12.5px; color: rgba(241,241,255,.2); font-weight: 500;
  display: flex; align-items: center; gap: 7px; flex-wrap: wrap;
}
.ft-copy-name {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 13px;
  background: linear-gradient(130deg, #a5b4fc, #c4b5fd);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.ft-sep { color: rgba(241,241,255,.1); }
@keyframes ft-beat { 0%,100%{transform:scale(1)} 40%{transform:scale(1.3)} }
.ft-heart { display: inline-block; color: #8b5cf6; animation: ft-beat 1.6s ease infinite; }
.ft-stack { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.ft-pill {
  padding: 3px 10px; border-radius: 100px; font-size: 10.5px; font-weight: 700;
  letter-spacing: .07em; background: rgba(99,102,241,.08); border: 1px solid rgba(99,102,241,.16);
  color: rgba(165,180,252,.55);
}
.ft-top-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 18px; border-radius: 100px; cursor: pointer;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
  color: rgba(241,241,255,.3); font-size: 11.5px; font-weight: 700;
  letter-spacing: .09em; text-transform: uppercase; transition: all .25s;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.ft-top-btn:hover { background: rgba(99,102,241,.1); border-color: rgba(99,102,241,.3); color: #a5b4fc; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(99,102,241,.2); }
.ft-top-btn:hover svg { transform: translateY(-2px); }
.ft-top-btn svg { transition: transform .25s; }

@media (max-width: 860px) {
  .ft-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
  .ft-brand-col { grid-column: 1 / -1; }
}
@media (max-width: 540px) {
  .ft-grid { grid-template-columns: 1fr; gap: 36px; }
  .ft-inner { padding: 48px 24px 32px; }
  .ft-bottom { flex-direction: column; align-items: flex-start; gap: 14px; }
}
`;

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <motion.footer
      className="ft"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: .7 }}
    >
      <style>{STYLES}</style>

      <div className="ft-line" />

      <div className="ft-bg">
        <div className="ft-orb" style={{ width: 480, height: 480, top: '-160px', left: '-100px', background: 'radial-gradient(circle, rgba(99,102,241,.06), transparent 70%)' }} />
        <div className="ft-orb" style={{ width: 360, height: 360, bottom: '-80px', right: '-60px', background: 'radial-gradient(circle, rgba(99,102,241,.045), transparent 70%)' }} />
        <div className="ft-orb" style={{ width: 280, height: 280, top: '40%', left: '50%', background: 'radial-gradient(circle, rgba(139,92,246,.04), transparent 70%)' }} />
        <div className="ft-noise" />
        <div className="ft-grid-bg" />
      </div>

      <div className="ft-inner">
        <div className="ft-grid">

          {/* Brand */}
          <div className="ft-brand-col">
            <Link to="/" className="ft-logo">
              <span className="ft-logo-dot" />
              <span className="ft-logo-text">HMH.</span>
            </Link>
            <p className="ft-tagline">
              Building fast, beautiful &amp; scalable web experiences — from pixel to production. Open to freelance and full-time opportunities.
            </p>
            <div className="ft-avail">
              <span className="ft-avail-dot" />
              Available for work
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="ft-col-label">Navigation</p>
            <nav className="ft-nav-links">
              {NAV_LINKS.map(({ path, label }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .05 }}
                >
                  <Link to={path} className="ft-nav-link">{label}</Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p className="ft-col-label">Connect</p>
            <div className="ft-social-links">
              {SOCIALS.map(({ label, href, icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="ft-social"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .07 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="ft-social-ic">{icon}</span>
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="ft-bottom">
          <div className="ft-copy">
            <span>© {new Date().getFullYear()}</span>
            <span className="ft-sep">·</span>
            <span className="ft-copy-name">Hafiz Muhammad Huzaifa</span>
            <span className="ft-sep">·</span>
            <span>Made with <span className="ft-heart">♥</span></span>
          </div>

          <div className="ft-stack">
            <span style={{ fontSize: 11.5, color: 'rgba(241,241,255,.15)', fontWeight: 500 }}>Built with</span>
            {['React', 'Vite', 'Framer Motion', 'Tailwind'].map(t => (
              <span key={t} className="ft-pill">{t}</span>
            ))}
          </div>

          <motion.button
            className="ft-top-btn"
            onClick={scrollTop}
            whileTap={{ scale: .94 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            Back to top
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
}