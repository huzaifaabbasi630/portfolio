import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const FORMSPREE_URL = 'https://formspree.io/f/xjkaekdn';
const MAX_MESSAGE_LENGTH = 1000;
const DRAFT_KEY = 'hmh-contact-draft-v2';

const INFO_CARDS = [
  {
    id: 'email',
    label: 'Email',
    value: 'huzaifaabbasi09123@gmail.com',
    accent: '90,58,43',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+92 321 3794233',
    accent: '90,58,43',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1.22h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 21 16.92z" />
      </svg>
    ),
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Pakistan 🇵🇰',
    accent: '90,58,43',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 'response',
    label: 'Response Time',
    value: 'Within 24 hours',
    accent: '90,58,43',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const PROJECT_OPTIONS = [
  'Website / Web App',
  'React / Frontend Project',
  'Mobile App',
  'AI / AI-powered Project',
  'UI/UX Design',
  'Auto Ustad',
  'Quran Academy',
  'ShareHub',
  'Resume Analyzer',
  'Portfolio',
  'Something else',
];

const BUDGET_OPTIONS = [
  'Just exploring',
  'Small project',
  '$100 – $300',
  '$300 – $700',
  '$700+',
];

const FLOAT_SYMBOLS = [
  { s: '</>', x: '3%', y: '10%', sz: 14, op: 0.07, dur: 14 },
  { s: '{ }', x: '91%', y: '8%', sz: 16, op: 0.06, dur: 17 },
  { s: '=>', x: '88%', y: '44%', sz: 13, op: 0.05, dur: 19 },
  { s: '( )', x: '4%', y: '58%', sz: 11, op: 0.05, dur: 12 },
  { s: '===', x: '12%', y: '82%', sz: 12, op: 0.05, dur: 20 },
  { s: '[ ]', x: '82%', y: '80%', sz: 11, op: 0.05, dur: 15 },
  { s: 'const', x: '76%', y: '20%', sz: 10, op: 0.04, dur: 18 },
  { s: 'npm run', x: '8%', y: '34%', sz: 10, op: 0.04, dur: 16 },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

.ct, .ct * { box-sizing: border-box; }
.ct {
  --green: #5A3A2B;
  --green-2: #6B4635;
  --green-3: #7A5140;
  --mint: #FEF6E9;
  --cream: #FFF9F0;
  --muted: rgba(90,58,43,.5);
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #FEF6E9;
  min-height: 100vh;
  overflow-x: hidden;
  color: #5A3A2B;
  position: relative;
}
.ct button, .ct input, .ct textarea { font: inherit; }
.ct button, .ct a { -webkit-tap-highlight-color: transparent; }

.ct-noise {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .024;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}
.ct-grid {
  background-image:
    linear-gradient(rgba(90,58,43,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(90,58,43,.018) 1px, transparent 1px);
  background-size: 60px 60px;
}
.ct-canvas {
  position: fixed; inset: 0; z-index: 0; opacity: .45; pointer-events: none;
}
.ct-spotlight {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(650px circle at var(--mx,50%) var(--my,50%), rgba(90,58,43,.065), transparent 70%);
}
.ct-progress {
  position: fixed; left: 0; top: 0; height: 3px; z-index: 10001;
  width: var(--progress, 0%);
  background: linear-gradient(90deg, #5A3A2B, #7A5140, #8C6250);
  box-shadow: 0 0 16px rgba(90,58,43,.35);
  transform-origin: left;
}

/* cursor */
@media (hover: hover) {
  .ct { cursor: none; }
  .ct-cur, .ct-curR, .ct-cur-halo, .ct-cur-label {
    position: fixed; pointer-events: none; transform: translate(-50%,-50%);
  }
  .ct-cur { z-index: 10000; width: 8px; height: 8px; border-radius: 50%; background: #fff; mix-blend-mode: difference; }
  .ct-cur.hov { width: 10px; height: 10px; mix-blend-mode: normal; background: #6B4635; box-shadow: 0 0 0 3px rgba(90,58,43,.16), 0 0 18px rgba(90,58,43,.45); }
  .ct-cur.clicking { width: 5px; height: 5px; background: #5A3A2B; box-shadow: 0 0 20px #5A3A2B; }
  .ct-cur.text-hov { width: 2px; height: 20px; border-radius: 1px; mix-blend-mode: normal; background: #6B4635; }
  .ct-curR { z-index: 9998; width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid rgba(90,58,43,.38); }
  .ct-curR.hov { width: 50px; height: 50px; border-color: rgba(90,58,43,.55); background: rgba(90,58,43,.04); }
  .ct-curR.clicking { width: 22px; height: 22px; border-color: #5A3A2B; }
  .ct-curR.text-hov { width: 2px; height: 28px; border-color: transparent; background: rgba(90,58,43,.15); }
  .ct-cur-halo { z-index: 9997; width: 80px; height: 80px; border-radius: 50%; opacity: 0; filter: blur(7px); background: radial-gradient(circle, rgba(90,58,43,.09), transparent 70%); }
  .ct-cur-halo.vis { opacity: 1; }
  .ct-cur-halo.hov { width: 112px; height: 112px; opacity: 1; }
  .ct-cur-halo.clicking { width: 56px; height: 56px; opacity: 1; }
  .ct-cur-label {
    z-index: 10002; padding: 4px 12px; border-radius: 100px;
    background: rgba(13,14,31,.92); color: #f1f1ff;
    border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(12px);
    font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase; white-space: nowrap; opacity: 0;
    transition: opacity .2s;
  }
  .ct-cur-label.vis { opacity: 1; }
}
.ct-trail-dot {
  position: fixed; pointer-events: none; z-index: 9995; border-radius: 50%;
  transform: translate(-50%,-50%); mix-blend-mode: multiply;
}

/* floating symbols */
.ct-float {
  position: fixed; pointer-events: none; user-select: none; z-index: 2;
  font-family: 'Syne', monospace; font-weight: 800; color: rgba(90,58,43,.4);
}
@keyframes ct-float {
  0%,100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-18px) rotate(3deg); }
  66% { transform: translateY(9px) rotate(-2deg); }
}

/* loader */
.ct-loader {
  position: fixed; inset: 0; z-index: 99999; background: #FEF6E9;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px;
}
.ct-loader-logo {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(36px,7vw,68px);
  letter-spacing: -2px; background: linear-gradient(130deg,#5A3A2B,#6B4635,#7A5140);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% 200%;
  animation: ct-grad 2s ease infinite;
}
.ct-loader-bar-wrap { width: min(300px,78vw); height: 2px; background: rgba(90,58,43,.1); border-radius: 2px; overflow: hidden; }
.ct-loader-bar { height: 100%; background: linear-gradient(90deg,#5A3A2B,#6B4635,#7A5140); transition: width .08s linear; }
.ct-loader-pct { font-family: 'Syne',sans-serif; font-weight:700; font-size:11px; letter-spacing:.22em; color:rgba(90,58,43,.5); text-transform:uppercase; }
.ct-loader-scan { position:absolute; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(90,58,43,.22),transparent); animation:ct-scan 1.2s ease-in-out infinite; }
@keyframes ct-scan { 0%{top:0;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0} }

/* hero */
.ct-hero {
  position: relative; z-index: 3; padding: 128px 24px 48px; text-align: center;
  max-width: 820px; margin: 0 auto; overflow: visible;
}
.ct-hero-orb { position:absolute; border-radius:50%; filter:blur(65px); pointer-events:none; }
.ct-badge {
  display:inline-flex; align-items:center; gap:9px; padding:8px 20px; border-radius:100px;
  border:1px solid rgba(90,58,43,.25); background:rgba(90,58,43,.08);
  font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:#5A3A2B; margin-bottom:28px;
}
.ct-bdot { width:7px; height:7px; border-radius:50%; background:#5A3A2B; animation:ct-bdot 2s infinite; }
@keyframes ct-bdot { 0%,100%{box-shadow:0 0 0 0 rgba(90,58,43,.4)} 50%{box-shadow:0 0 0 8px rgba(90,58,43,0)} }
.ct-title { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(38px,7vw,72px); line-height:.9; letter-spacing:-2.5px; margin:0 0 20px; }
.ct-t1 { display:block; color:#5A3A2B; }
.ct-t2 {
  display:block; background:linear-gradient(130deg,#5A3A2B 0%,#6B4635 45%,#7A5140 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  filter:drop-shadow(0 0 36px rgba(90,58,43,.22)); background-size:200% 200%; animation:ct-grad 4s ease infinite;
}
@keyframes ct-grad { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
.ct-sub { font-size:clamp(14px,1.8vw,16px); line-height:1.75; color:rgba(90,58,43,.52); font-style:italic; max-width:520px; margin:0 auto; }
.ct-hero-code {
  margin:22px auto 0; width:max-content; max-width:100%; padding:8px 14px; border-radius:100px;
  background:rgba(255,255,255,.22); border:1px solid rgba(90,58,43,.1); color:rgba(90,58,43,.55);
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:11px;
}

/* info cards */
.ct-info-grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:14px; max-width:980px; margin:0 auto;
  padding:0 24px 52px; position:relative; z-index:3;
}
.ct-info-card {
  --ca:90,58,43; position:relative; overflow:hidden; padding:20px 16px; border-radius:18px;
  background:rgba(90,58,43,.06); border:1px solid rgba(90,58,43,.12); backdrop-filter:blur(14px);
  text-align:center; cursor:pointer; transition:border-color .25s, box-shadow .25s, background .25s;
}
.ct-info-card::before {
  content:''; position:absolute; inset:0 0 auto; height:1px;
  background:linear-gradient(90deg,transparent,rgba(var(--ca),.55),transparent); opacity:0; transition:opacity .25s;
}
.ct-info-card:hover { border-color:rgba(var(--ca),.3); background:rgba(255,255,255,.15); box-shadow:0 18px 50px rgba(var(--ca),.09); }
.ct-info-card:hover::before { opacity:1; }
.ct-info-icon {
  width:44px; height:44px; border-radius:12px; margin:0 auto 12px; display:flex; align-items:center; justify-content:center;
  background:rgba(var(--ca),.1); border:1px solid rgba(var(--ca),.2); color:rgb(var(--ca)); transition:transform .3s,background .3s;
}
.ct-info-card:hover .ct-info-icon { transform:translateY(-2px) scale(1.08); background:rgba(var(--ca),.17); }
.ct-info-label { font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:rgba(90,58,43,.4); margin-bottom:5px; }
.ct-info-val { font-family:'Syne',sans-serif; font-weight:700; font-size:12px; color:rgba(90,58,43,.82); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

/* main */
.ct-main { display:grid; grid-template-columns:1fr 1.3fr; gap:32px; max-width:1080px; margin:0 auto; padding:0 24px 100px; position:relative; z-index:3; }
.ct-panel-title { font-family:'Syne',sans-serif; font-weight:800; font-size:20px; color:#5A3A2B; margin-bottom:7px; }
.ct-panel-sub { font-size:13px; color:rgba(90,58,43,.48); line-height:1.7; margin:0 0 26px; }
.ct-status-card {
  padding:18px; border-radius:18px; margin-bottom:20px; background:rgba(90,58,43,.06); border:1px solid rgba(90,58,43,.15);
  display:flex; align-items:center; gap:14px; position:relative; overflow:hidden;
}
.ct-status-card::after {
  content:''; position:absolute; width:150px; height:150px; right:-70px; top:-80px; border-radius:50%;
  background:radial-gradient(circle,rgba(90,58,43,.1),transparent 70%);
}
.ct-status-dot-wrap { flex-shrink:0; }
.ct-status-dot { width:10px; height:10px; border-radius:50%; background:#5A3A2B; animation:ct-ping 2s ease infinite; }
@keyframes ct-ping { 0%{box-shadow:0 0 0 0 rgba(90,58,43,.4)} 100%{box-shadow:0 0 0 14px rgba(90,58,43,0)} }
.ct-st1 { font-family:'Syne',sans-serif; font-weight:700; font-size:14px; color:#5A3A2B; }
.ct-st2 { font-size:12px; color:rgba(90,58,43,.45); margin-top:2px; }
.ct-time-row { margin-top:5px; font-size:10px; color:rgba(90,58,43,.38); font-variant-numeric:tabular-nums; }

.ct-quick-title { font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:rgba(90,58,43,.35); font-weight:700; margin:0 0 12px; }
.ct-quick-links { display:flex; flex-direction:column; gap:8px; }
.ct-quick-link {
  display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-radius:12px; text-decoration:none;
  background:rgba(90,58,43,.04); border:1px solid rgba(90,58,43,.1); color:rgba(90,58,43,.62); font-size:13px; font-weight:600;
  transition:background .25s,border-color .25s,color .25s,transform .25s; position:relative; overflow:hidden;
}
.ct-quick-link::after {
  content:''; position:absolute; inset:0; transform:translateX(-110%); background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);
  transition:transform .5s;
}
.ct-quick-link:hover { background:rgba(90,58,43,.09); border-color:rgba(90,58,43,.24); color:#5A3A2B; }
.ct-quick-link:hover::after { transform:translateX(110%); }
.ct-quick-link-arrow { opacity:.4; transition:all .22s; }
.ct-quick-link:hover .ct-quick-link-arrow { opacity:1; transform:translateX(3px); }

.ct-direct-copy {
  margin-top:10px; width:100%; display:flex; align-items:center; justify-content:space-between; gap:10px;
  border:1px dashed rgba(90,58,43,.18); background:rgba(255,255,255,.16); border-radius:12px; padding:10px 12px;
  color:rgba(90,58,43,.62); cursor:pointer; text-align:left;
}
.ct-direct-copy small { display:block; color:rgba(90,58,43,.35); font-size:9px; letter-spacing:.12em; text-transform:uppercase; margin-bottom:2px; }
.ct-direct-copy strong { font-size:11px; }
.ct-copy-icon { flex-shrink:0; font-size:16px; }

/* form card */
.ct-form-card {
  padding:30px 28px; border-radius:24px; background:rgba(255,255,255,.4); border:1px solid rgba(90,58,43,.15);
  backdrop-filter:blur(20px); position:relative; overflow:hidden; box-shadow:0 20px 70px rgba(90,58,43,.06);
}
.ct-form-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,rgba(90,58,43,.35),rgba(90,58,43,.12),transparent);
}
.ct-form-head { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; margin-bottom:22px; }
.ct-form-head h2 { margin:0; font-family:'Syne',sans-serif; font-size:20px; color:#5A3A2B; }
.ct-form-head p { margin:5px 0 0; font-size:11px; line-height:1.6; color:rgba(90,58,43,.4); }
.ct-step-count { flex-shrink:0; font-family:'Syne',sans-serif; font-size:11px; font-weight:800; color:rgba(90,58,43,.5); padding:7px 9px; border-radius:10px; background:rgba(90,58,43,.06); }
.ct-completion { height:4px; border-radius:10px; background:rgba(90,58,43,.08); overflow:hidden; margin-bottom:18px; }
.ct-completion-bar { height:100%; width:var(--completion,0%); background:linear-gradient(90deg,#5A3A2B,#7A5140); transition:width .35s ease; }
.ct-completion-label { display:flex; justify-content:space-between; font-size:9px; color:rgba(90,58,43,.35); margin:-12px 0 18px; text-transform:uppercase; letter-spacing:.1em; font-weight:700; }

.ct-field { margin-bottom:18px; }
.ct-label { display:flex; justify-content:space-between; gap:10px; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(90,58,43,.5); margin-bottom:8px; }
.ct-valid-mark { color:#7A5140; }
.ct-input-wrap { position:relative; }
.ct-input-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:rgba(90,58,43,.3); pointer-events:none; transition:color .2s; z-index:2; }
.ct-ta-icon { top:16px; transform:none; }
.ct-input {
  width:100%; padding:13px 14px 13px 42px; border-radius:12px; background:rgba(255,255,255,.5);
  border:1px solid rgba(90,58,43,.15); color:#5A3A2B; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:500;
  outline:none; transition:border-color .25s,background .25s,box-shadow .25s,transform .2s; resize:none;
}
.ct-input::placeholder { color:rgba(90,58,43,.3); }
.ct-input:focus { border-color:rgba(90,58,43,.42); background:rgba(255,255,255,.68); box-shadow:0 0 0 3px rgba(90,58,43,.07),0 10px 30px rgba(90,58,43,.04); }
.ct-input-wrap:focus-within .ct-input-icon { color:rgba(90,58,43,.75); }
.ct-input-wrap::after {
  content:''; position:absolute; left:12px; right:12px; bottom:-1px; height:2px; border-radius:2px;
  background:linear-gradient(90deg,#5A3A2B,#8C6250); transform:scaleX(0); transform-origin:left; transition:transform .35s; pointer-events:none;
}
.ct-input-wrap:focus-within::after { transform:scaleX(1); }
.ct-input.invalid { border-color:rgba(220,38,38,.35); box-shadow:0 0 0 3px rgba(220,38,38,.05); }
.ct-char-row { display:flex; justify-content:space-between; align-items:center; margin-top:5px; }
.ct-char { font-size:10px; color:rgba(90,58,43,.3); font-variant-numeric:tabular-nums; }
.ct-char.near { color:#9a6700; }
.ct-char.full { color:#dc2626; }

.ct-choice-label { margin-bottom:9px; }
.ct-choice-grid { display:flex; flex-wrap:wrap; gap:7px; }
.ct-choice {
  padding:8px 10px; border-radius:10px; border:1px solid rgba(90,58,43,.12); background:rgba(90,58,43,.035);
  color:rgba(90,58,43,.55); font-size:10px; font-weight:700; cursor:pointer; transition:all .2s;
}
.ct-choice:hover { border-color:rgba(90,58,43,.25); color:#5A3A2B; transform:translateY(-1px); }
.ct-choice.active { background:#5A3A2B; border-color:#5A3A2B; color:#FEF6E9; box-shadow:0 8px 20px rgba(90,58,43,.16); }

.ct-draft-row { display:flex; align-items:center; justify-content:space-between; margin-top:-10px; margin-bottom:18px; gap:8px; }
.ct-draft-status { font-size:9px; color:rgba(90,58,43,.32); }
.ct-clear-draft { border:none; background:none; color:rgba(90,58,43,.48); font-size:9px; font-weight:700; cursor:pointer; padding:3px; }
.ct-clear-draft:hover { color:#5A3A2B; }

.ct-error {
  display:flex; align-items:center; gap:9px; padding:12px 14px; border-radius:12px; margin-bottom:18px;
  background:rgba(239,68,68,.07); border:1px solid rgba(239,68,68,.22); color:#b91c1c; font-size:12px; font-weight:600;
}
.ct-field-error { margin-top:5px; font-size:10px; color:#b91c1c; }

.ct-submit {
  width:100%; padding:14px 24px; border-radius:14px; border:0; cursor:pointer;
  background:linear-gradient(135deg,#5A3A2B,#6B4635); color:#FEF6E9; font-family:'Syne',sans-serif;
  font-weight:700; font-size:14.5px; letter-spacing:.04em; position:relative; overflow:hidden;
  display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 10px 28px rgba(90,58,43,.13);
}
.ct-submit::before { content:''; position:absolute; inset:0; background:linear-gradient(110deg,transparent,rgba(255,255,255,.13),transparent); transform:translateX(-120%); transition:transform .6s; }
.ct-submit:hover:not(:disabled)::before { transform:translateX(120%); }
.ct-submit:hover:not(:disabled) { box-shadow:0 18px 45px rgba(90,58,43,.25); }
.ct-submit:disabled { opacity:.55; cursor:not-allowed; }
.ct-submit > * { position:relative; z-index:1; }
.ct-spinner { width:18px; height:18px; border:2px solid rgba(178,223,195,.3); border-top-color:#FEF6E9; border-radius:50%; animation:ct-spin 1s linear infinite; }
@keyframes ct-spin { to{transform:rotate(360deg)} }

.ct-success {
  padding:28px 20px; border-radius:18px; text-align:center; background:rgba(90,58,43,.055); border:1px solid rgba(90,58,43,.18);
}
.ct-success-ring {
  width:72px; height:72px; border-radius:50%; margin:0 auto 16px; display:flex; align-items:center; justify-content:center;
  background:rgba(90,58,43,.08); border:1px solid rgba(90,58,43,.18); color:#5A3A2B; font-size:30px;
  box-shadow:0 0 0 10px rgba(90,58,43,.025),0 16px 40px rgba(90,58,43,.08);
}
.ct-success-t { font-family:'Syne',sans-serif; font-weight:800; font-size:21px; color:#5A3A2B; margin-bottom:6px; }
.ct-success-s { font-size:12px; line-height:1.6; color:rgba(90,58,43,.5); }
.ct-response-box { margin:20px auto 0; max-width:360px; text-align:left; padding:14px; border-radius:14px; background:rgba(255,255,255,.22); border:1px solid rgba(90,58,43,.1); }
.ct-response-top { display:flex; justify-content:space-between; gap:12px; font-size:9px; color:rgba(90,58,43,.4); text-transform:uppercase; letter-spacing:.1em; font-weight:700; }
.ct-response-time { color:#5A3A2B; font-family:'Syne',sans-serif; }
.ct-response-track { height:6px; background:rgba(90,58,43,.08); border-radius:20px; overflow:hidden; margin-top:9px; }
.ct-response-bar { height:100%; width:var(--response-progress,100%); background:linear-gradient(90deg,#5A3A2B,#7A5140); transition:width 1s linear; }
.ct-response-note { font-size:10px; color:rgba(90,58,43,.42); margin-top:7px; }
.ct-success-actions { display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin-top:20px; }
.ct-secondary-btn {
  padding:9px 14px; border-radius:10px; background:rgba(90,58,43,.06); border:1px solid rgba(90,58,43,.13);
  color:#5A3A2B; font-size:11px; font-weight:700; cursor:pointer;
}
.ct-secondary-btn:hover { background:rgba(90,58,43,.11); }

.ct-connection {
  position:relative; z-index:3; max-width:1080px; margin:-55px auto 65px; padding:0 24px;
}
.ct-connection-inner {
  position:relative; display:flex; align-items:center; justify-content:center; gap:14px; min-height:56px;
}
.ct-connection-line {
  height:1px; flex:1; max-width:300px; background:linear-gradient(90deg,transparent,rgba(90,58,43,.2),transparent); position:relative; overflow:hidden;
}
.ct-connection-line::after {
  content:''; position:absolute; top:0; left:-20%; width:20%; height:100%; background:#5A3A2B; box-shadow:0 0 10px rgba(90,58,43,.5);
  animation:ct-travel 2.4s linear infinite;
}
@keyframes ct-travel { from{left:-20%} to{left:120%} }
.ct-connection-pill { padding:8px 13px; border-radius:100px; border:1px solid rgba(90,58,43,.12); background:rgba(255,255,255,.16); font-size:9px; letter-spacing:.15em; text-transform:uppercase; font-weight:800; color:rgba(90,58,43,.45); }

.ct-toast {
  position:fixed; right:22px; bottom:22px; z-index:10010; min-width:260px; max-width:390px; padding:12px 15px;
  border-radius:13px; display:flex; align-items:flex-start; gap:9px; color:#f9fafb; background:rgba(15,23,42,.96);
  border:1px solid rgba(148,163,184,.75); box-shadow:0 18px 60px rgba(15,23,42,.5); font-size:12px; font-weight:600;
}
.ct-toast.success { background:rgba(6,95,70,.97); border-color:rgba(52,211,153,.8); }
.ct-toast.error { background:rgba(127,29,29,.97); border-color:rgba(248,113,113,.85); }
.ct-toast-close { margin-left:auto; border:0; background:none; color:inherit; opacity:.55; cursor:pointer; font-size:15px; }

.ct-map-overlay {
  position:fixed; inset:0; z-index:10020; background:rgba(15,23,42,.72); backdrop-filter:blur(8px);
  display:flex; align-items:center; justify-content:center; padding:20px;
}
.ct-map-modal {
  width:min(90vw,720px); height:min(72vh,500px); background:#020617; border-radius:22px; overflow:hidden;
  border:1px solid rgba(148,163,184,.5); box-shadow:0 28px 90px rgba(15,23,42,.9); position:relative;
}
.ct-map-close {
  position:absolute; top:10px; right:12px; z-index:2; background:rgba(15,23,42,.88); border:1px solid rgba(255,255,255,.1);
  cursor:pointer; color:#e5e7eb; padding:7px 11px; border-radius:999px; font-size:11px; font-weight:700;
}
.ct-map-frame { width:100%; height:100%; border:0; }

.ct-burst {
  position:fixed; pointer-events:none; z-index:10009; border-radius:50%;
  animation:ct-burst-out var(--bd,.55s) ease-out forwards;
}
@keyframes ct-burst-out {
  0%{transform:translate(-50%,-50%) scale(.2);opacity:1}
  60%{opacity:.8}
  100%{transform:translate(calc(-50% + var(--tx)),calc(-50% + var(--ty))) scale(1);opacity:0}
}

@media (max-width:860px) {
  .ct-info-grid { grid-template-columns:repeat(2,1fr); }
  .ct-main { grid-template-columns:1fr; max-width:720px; }
  .ct-connection { margin:-25px auto 45px; }
}
@media (max-width:540px) {
  .ct-hero { padding:108px 20px 38px; }
  .ct-info-grid { grid-template-columns:repeat(2,1fr); padding:0 18px 42px; gap:9px; }
  .ct-info-card { padding:16px 9px; }
  .ct-info-val { font-size:10px; }
  .ct-main { padding:0 18px 70px; gap:20px; }
  .ct-form-card { padding:23px 17px; border-radius:20px; }
  .ct-form-head { flex-direction:column; gap:10px; }
  .ct-step-count { align-self:flex-start; }
  .ct-float { display:none; }
  .ct-toast { left:14px; right:14px; bottom:14px; min-width:0; }
  .ct-connection { padding:0 18px; }
  .ct-connection-line { max-width:80px; }
}
@media (prefers-reduced-motion:reduce) {
  .ct *, .ct *::before, .ct *::after { animation-duration:.001ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; transition-duration:.001ms !important; }
}
`;

function PageLoader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let value = 0;
    const timer = setInterval(() => {
      value += value < 70 ? 2 : 1;
      if (value >= 100) {
        value = 100;
        clearInterval(timer);
        setPct(value);
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 600);
        }, 180);
      } else {
        setPct(value);
      }
    }, 22);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="ct-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ct-loader-scan" />
          <motion.div
            className="ct-loader-logo"
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            HMH
          </motion.div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div className="ct-loader-bar-wrap">
              <div className="ct-loader-bar" style={{ width: `${pct}%` }} />
            </div>
            <div className="ct-loader-pct">{pct < 100 ? 'Loading' : 'Ready'} — {pct}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useAdvancedCursor() {
  const curRef = useRef(null);
  const curRRef = useRef(null);
  const haloRef = useRef(null);
  const labelRef = useRef(null);
  const trailRef = useRef([]);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const halo = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return undefined;

    const dots = [];
    for (let i = 0; i < 8; i += 1) {
      const dot = document.createElement('div');
      const size = Math.max(2, 7 - i * 0.75);
      dot.className = 'ct-trail-dot';
      dot.style.cssText = `width:${size}px;height:${size}px;opacity:${Math.max(0.02, 0.18 - i * 0.018)};left:-100px;top:-100px;background:rgba(90,58,43,.5);`;
      document.body.appendChild(dot);
      dots.push({ el: dot, x: -100, y: -100 });
    }
    trailRef.current = dots;

    return () => dots.forEach((item) => item.el.remove());
  }, []);

  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return undefined;

    const labels = [
      ['.ct-info-card', 'Open'],
      ['.ct-quick-link', 'Visit'],
      ['.ct-submit', 'Send'],
      ['.ct-choice', 'Select'],
      ['.ct-direct-copy', 'Copy'],
      ['input,textarea', 'Type'],
    ];

    const burst = (x, y) => {
      const palette = ['#5A3A2B', '#6B4635', '#7A5140', '#8C6250'];
      for (let i = 0; i < 12; i += 1) {
        const el = document.createElement('div');
        el.className = 'ct-burst';
        const angle = (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const distance = 20 + Math.random() * 30;
        const duration = 0.35 + Math.random() * 0.25;
        const size = 2.5 + Math.random() * 4;
        el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${palette[i % palette.length]};box-shadow:0 0 ${size * 2}px ${palette[i % palette.length]};--tx:${Math.cos(angle) * distance}px;--ty:${Math.sin(angle) * distance}px;--bd:${duration}s;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), (duration + 0.1) * 1000);
      }
    };

    let raf;
    let lastType = '';

    const onMove = (event) => {
      mouse.current = { x: event.clientX, y: event.clientY };

      const cur = curRef.current;
      const label = labelRef.current;
      if (!cur) return;

      cur.style.left = `${event.clientX}px`;
      cur.style.top = `${event.clientY}px`;

      const target = document.elementFromPoint(event.clientX, event.clientY);
      const isButton = Boolean(target?.closest('a,button'));
      const isInput = Boolean(target?.closest('input,textarea'));
      const isText = !isButton && !isInput && Boolean(target?.closest('p,h1,h2,h3,h4,span'));
      const type = isButton || isInput ? 'hov' : isText ? 'text' : 'normal';

      if (type !== lastType) {
        cur.classList.toggle('hov', type === 'hov');
        cur.classList.toggle('text-hov', type === 'text');
        curRRef.current?.classList.toggle('hov', type === 'hov');
        curRRef.current?.classList.toggle('text-hov', type === 'text');
        haloRef.current?.classList.toggle('hov', type === 'hov');
        lastType = type;
      }

      const spotlight = document.querySelector('.ct-spotlight');
      spotlight?.style.setProperty('--mx', `${event.clientX}px`);
      spotlight?.style.setProperty('--my', `${event.clientY}px`);

      if (label) {
        let found = '';
        for (const [selector, text] of labels) {
          if (target?.closest(selector)) {
            found = text;
            break;
          }
        }
        if (found) {
          label.textContent = found;
          label.style.left = `${event.clientX}px`;
          label.style.top = `${event.clientY - 44}px`;
          label.classList.add('vis');
        } else {
          label.classList.remove('vis');
        }
      }
    };

    const onClick = (event) => {
      curRef.current?.classList.add('clicking');
      curRRef.current?.classList.add('clicking');
      haloRef.current?.classList.add('clicking');
      burst(event.clientX, event.clientY);
      setTimeout(() => {
        curRef.current?.classList.remove('clicking');
        curRRef.current?.classList.remove('clicking');
        haloRef.current?.classList.remove('clicking');
      }, 300);
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      halo.current.x += (mouse.current.x - halo.current.x) * 0.065;
      halo.current.y += (mouse.current.y - halo.current.y) * 0.065;

      if (curRRef.current) {
        curRRef.current.style.left = `${ring.current.x}px`;
        curRRef.current.style.top = `${ring.current.y}px`;
      }
      if (haloRef.current) {
        haloRef.current.style.left = `${halo.current.x}px`;
        haloRef.current.style.top = `${halo.current.y}px`;
        haloRef.current.classList.add('vis');
      }

      trailRef.current.forEach((dot, index) => {
        const lag = 1.8 + index * 1.45;
        dot.x += (mouse.current.x - dot.x) / lag;
        dot.y += (mouse.current.y - dot.y) / lag;
        dot.el.style.left = `${dot.x}px`;
        dot.el.style.top = `${dot.y}px`;
      });

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, [curRef, curRRef, haloRef, labelRef]);

  return { curRef, curRRef, haloRef, labelRef };
}

function CountUp({ value = 0, duration = 900 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <>{display}</>;
}

function ConfettiBurst({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) return undefined;
    const next = Array.from({ length: 28 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: 45 + Math.random() * 10,
      top: 40 + Math.random() * 12,
      x: (Math.random() - 0.5) * 360,
      y: 80 + Math.random() * 280,
      rotate: (Math.random() - 0.5) * 720,
      delay: Math.random() * 0.12,
      size: 5 + Math.random() * 5,
      color: ['#5A3A2B', '#6B4635', '#7A5140', '#8C6250', '#d3a84c'][index % 5],
    }));
    setPieces(next);
    const timer = setTimeout(() => setPieces([]), 1500);
    return () => clearTimeout(timer);
  }, [active]);

  if (!pieces.length) return null;

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 10030, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map((piece) => (
        <span
          key={piece.id}
          style={{
            position: 'absolute',
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: piece.size,
            height: piece.size * 0.7,
            borderRadius: '45% 55% 45% 55%',
            background: piece.color,
            boxShadow: `0 0 ${piece.size * 2}px ${piece.color}`,
            animation: `ct-confetti 1.25s cubic-bezier(.2,.8,.25,1) ${piece.delay}s forwards`,
            transform: `translate(0,0) rotate(0deg)`,
            '--cx': `${piece.x}px`,
            '--cy': `${piece.y}px`,
            '--cr': `${piece.rotate}deg`,
          }}
        />
      ))}
      <style>{`@keyframes ct-confetti { to { transform: translate(var(--cx),var(--cy)) rotate(var(--cr)); opacity:0; } }`}</style>
    </div>
  );
}

function Magnetic({ children, strength = 0.16, className = '', style = {} }) {
  const ref = useRef(null);

  const onMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px,${y * strength}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <div ref={ref} className={className} style={{ transition: 'transform .25s cubic-bezier(.22,1,.36,1)', ...style }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </div>
  );
}

function Countdown({ start }) {
  const [remaining, setRemaining] = useState(24 * 60 * 60 * 1000);

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, start + 24 * 60 * 60 * 1000 - Date.now()));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [start]);

  const total = 24 * 60 * 60 * 1000;
  const progress = Math.min(100, Math.max(0, (remaining / total) * 100));
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);

  return (
    <>
      <div className="ct-response-top">
        <span>Response window</span>
        <span className="ct-response-time">{String(h).padStart(2, '0')}h {String(m).padStart(2, '0')}m {String(s).padStart(2, '0')}s</span>
      </div>
      <div className="ct-response-track">
        <div className="ct-response-bar" style={{ '--response-progress': `${progress}%` }} />
      </div>
      <div className="ct-response-note">
        {remaining > 0 ? 'Your 24-hour response window is active.' : 'The 24-hour window has passed — I still do my best to reply quickly.'}
      </div>
    </>
  );
}

export default function Contact() {
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      return saved ? JSON.parse(saved) : { name: '', email: '', message: '' };
    } catch {
      return { name: '', email: '', message: '' };
    }
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [hasDraft, setHasDraft] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState(null);
  const [toast, setToast] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [responseStart, setResponseStart] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [localTime, setLocalTime] = useState('');

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const toastTimerRef = useRef(null);
  const { curRef, curRRef, haloRef, labelRef } = useAdvancedCursor();

  const completion = useMemo(() => {
    let count = 0;
    if (form.name.trim()) count += 1;
    if (form.email.trim()) count += 1;
    if (form.message.trim()) count += 1;
    return Math.round((count / 3) * 100);
  }, [form]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  useEffect(() => {
    const id = 'ct-styles-v3';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = STYLES;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const move = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      document.documentElement.style.setProperty('--ct-scroll', `${progress}%`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let nodes = [];
    let time = 0;

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.38;
        this.vy = (Math.random() - 0.5) * 0.38;
        this.r = Math.random() * 1.25 + 0.4;
        this.c = [[90,58,43],[107,70,53],[122,81,64],[140,98,80]][Math.floor(Math.random() * 4)];
        this.o = Math.random() * 0.24 + 0.06;
      }
      update() {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const d = Math.hypot(dx, dy);
        if (d > 0 && d < 160) {
          this.vx += (dx / d) * 0.008;
          this.vy += (dy / d) * 0.008;
        }
        const speed = Math.hypot(this.vx, this.vy);
        if (speed > 0.8) {
          this.vx = (this.vx / speed) * 0.8;
          this.vy = (this.vy / speed) * 0.8;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.c},${this.o})`;
        ctx.fill();
      }
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.min(76, Math.max(42, Math.floor((width * height) / 17000)));
      nodes = Array.from({ length: count }, () => new Node());
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      const orbs = [
        { x: 0.12, y: 0.2, c: '90,58,43', r: 420 },
        { x: 0.88, y: 0.55, c: '107,70,53', r: 340 },
        { x: 0.5, y: 0.02, c: '122,81,64', r: 240 },
      ];

      orbs.forEach((orb, index) => {
        const ox = (orb.x + Math.sin(time + index) * 0.06) * width;
        const oy = (orb.y + Math.cos(time * 1.2 + index) * 0.05) * height;
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        gradient.addColorStop(0, `rgba(${orb.c},.075)`);
        gradient.addColorStop(1, `rgba(${orb.c},0)`);
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (j <= i) return;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 112) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(90,58,43,${0.045 * (1 - distance / 112)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        node.update();
        node.draw();
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name || parsed?.email || parsed?.message) {
          setHasDraft(true);
        }
      }
    } catch {
      // Ignore storage errors.
    }
  }, []);

  useEffect(() => {
    if (!form.name && !form.email && !form.message) return undefined;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
        setHasDraft(true);
        setDraftSavedAt(Date.now());
      } catch {
        // Ignore storage quota/privacy errors.
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) return;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError('');
    setFieldErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const clearDraft = () => {
    setForm({ name: '', email: '', message: '' });
    setProjectType('');
    setBudget('');
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // Ignore storage errors.
    }
    setHasDraft(false);
    setDraftSavedAt(null);
    showToast('Draft cleared.', 'success');
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Please enter your name.';
    if (!form.email.trim()) errors.email = 'Please enter your email.';
    else if (!emailValid) errors.email = 'Please enter a valid email address.';
    if (!form.message.trim()) errors.message = 'Please tell me a little about your idea.';
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      setError('Please check the highlighted fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading || !validate()) return;

    setLoading(true);
    setError('');

    const projectLine = projectType ? `Project type: ${projectType}` : '';
    const budgetLine = budget ? `Budget: ${budget}` : '';
    const composedMessage = [projectLine, budgetLine, form.message.trim()].filter(Boolean).join('\n\n');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: composedMessage,
          projectType,
          budget,
          _subject: `Portfolio contact from ${form.name.trim()}`,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message.');

      const now = Date.now();
      setSuccess(true);
      setResponseStart(now);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1600);
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // Ignore storage errors.
      }
      setForm({ name: '', email: '', message: '' });
      setProjectType('');
      setBudget('');
      setHasDraft(false);
      setDraftSavedAt(null);
      showToast('Message sent successfully!', 'success');
    } catch (submitError) {
      setError('Something went wrong. Please try again.');
      showToast('Message could not be sent. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text, successMessage = 'Copied to clipboard.') => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
      }
      showToast(successMessage, 'success');
    } catch {
      showToast('Copy failed. Please copy it manually.', 'error');
    }
  };

  const handleInfoCardClick = (card) => {
    if (card.id === 'email') {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(card.value)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    if (card.id === 'whatsapp') {
      window.open(`https://wa.me/${card.value.replace(/\D/g, '')}`, '_blank', 'noopener,noreferrer');
      return;
    }
    if (card.id === 'location') {
      setShowMap(true);
      return;
    }
    if (card.id === 'response') {
      if (!responseStart) {
        showToast('Send a message first to activate the response timer.', 'error');
      } else {
        showToast('Your 24-hour response window is active.', 'success');
      }
    }
  };

  const sharePage = async () => {
    const data = {
      title: 'Contact — Hafiz Muhammad Huzaifa',
      text: 'Let’s connect and build something great.',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await copyText(window.location.href, 'Page link copied.');
    } catch {
      // User cancelled native share.
    }
  };

  const fu = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const onLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Header />
      <PageLoader onDone={onLoaderDone} />

      <PageTransition>
        <div className="ct ct-grid">
          <div className="ct-progress" style={{ width: 'var(--ct-scroll,0%)' }} />
          <div ref={curRef} className="ct-cur" />
          <div ref={curRRef} className="ct-curR" />
          <div ref={haloRef} className="ct-cur-halo" />
          <div ref={labelRef} className="ct-cur-label" />
          <div className="ct-spotlight" />
          <div className="ct-noise" />
          <canvas ref={canvasRef} className="ct-canvas" />

          {FLOAT_SYMBOLS.map((item, index) => (
            <div
              key={`${item.s}-${index}`}
              className="ct-float"
              style={{
                left: item.x,
                top: item.y,
                fontSize: item.sz,
                opacity: item.op,
                animation: `ct-float ${item.dur}s ease-in-out ${index * 1.2}s infinite`,
              }}
            >
              {item.s}
            </div>
          ))}

          <section className="ct-hero">
            <div className="ct-hero-orb" style={{ width: 470, height: 470, left: '-35%', top: '-18%', background: 'radial-gradient(circle,rgba(90,58,43,.08),transparent 70%)' }} />
            <div className="ct-hero-orb" style={{ width: 390, height: 390, right: '-28%', bottom: '-30%', background: 'radial-gradient(circle,rgba(122,81,64,.08),transparent 70%)' }} />

            <motion.div className="ct-badge" {...fu(0)}>
              <span className="ct-bdot" />
              Available for new work
            </motion.div>

            <motion.h1 className="ct-title" {...fu(0.08)}>
              <span className="ct-t1">GET IN</span>
              <span className="ct-t2">TOUCH</span>
            </motion.h1>

            <motion.p className="ct-sub" {...fu(0.18)}>
              Got a project in mind, a question, or just want to say hi? Let’s turn your idea into something useful.
            </motion.p>

            <motion.div className="ct-hero-code" {...fu(0.28)}>
              {'const collaboration = "ready";'}
            </motion.div>
          </section>

          <motion.div className="ct-info-grid" {...fu(0.3)}>
            {INFO_CARDS.map((card, index) => (
              <motion.div
                key={card.id}
                className="ct-info-card"
                style={{ '--ca': card.accent }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                onClick={() => handleInfoCardClick(card)}
              >
                <div className="ct-info-icon">{card.icon}</div>
                <div className="ct-info-label">{card.label}</div>
                <div className="ct-info-val">{card.value}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="ct-connection">
            <div className="ct-connection-inner">
              <div className="ct-connection-line" />
              <div className="ct-connection-pill">Connection established</div>
              <div className="ct-connection-line" />
            </div>
          </div>

          <main className="ct-main">
            <motion.section {...fu(0.4)}>
              <div className="ct-panel-title">Let’s work together</div>
              <p className="ct-panel-sub">
                I’m available for freelance projects, full-time roles, and collaborations. Whether it’s a quick question or a full product, send the idea over.
              </p>

              <div className="ct-status-card">
                <div className="ct-status-dot-wrap"><div className="ct-status-dot" /></div>
                <div>
                  <div className="ct-st1">Currently Available</div>
                  <div className="ct-st2">Open to new opportunities</div>
                  <div className="ct-time-row">Local time · {localTime || '--:--:--'}</div>
                </div>
              </div>

              <p className="ct-quick-title">Or reach me directly</p>
              <div className="ct-quick-links">
                {[
                  { label: '📧 Send an Email', href: 'mailto:huzaifaabbasi09123@gmail.com' },
                  { label: '💼 LinkedIn Profile', href: 'https://www.linkedin.com/in/hafiz-muhammad-huzaifa/' },
                  { label: '⌨️ GitHub Profile', href: 'https://github.com/huzaifaabbasi630' },
                  { label: '📄 Download Resume', href: '/assets/resume.pdf' },
                ].map((item) => (
                  <Magnetic key={item.label} strength={0.08}>
                    <motion.a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="ct-quick-link"
                      whileHover={{ x: 4 }}
                    >
                      <span>{item.label}</span>
                      <span className="ct-quick-link-arrow">→</span>
                    </motion.a>
                  </Magnetic>
                ))}
              </div>

              <button
                type="button"
                className="ct-direct-copy"
                onClick={() => copyText('huzaifaabbasi09123@gmail.com', 'Email address copied.')}
              >
                <span>
                  <small>Quick copy</small>
                  <strong>huzaifaabbasi09123@gmail.com</strong>
                </span>
                <span className="ct-copy-icon">⧉</span>
              </button>

              <div style={{ display: 'flex', gap: 8, marginTop: 9 }}>
                <Magnetic strength={0.12} style={{ flex: 1 }}>
                  <button type="button" className="ct-secondary-btn" style={{ width: '100%' }} onClick={() => setShowMap(true)}>
                    📍 Open Map
                  </button>
                </Magnetic>
                <Magnetic strength={0.12} style={{ flex: 1 }}>
                  <button type="button" className="ct-secondary-btn" style={{ width: '100%' }} onClick={sharePage}>
                    ↗ Share Page
                  </button>
                </Magnetic>
              </div>
            </motion.section>

            <motion.section {...fu(0.48)}>
              <div className="ct-form-card">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      className="ct-success"
                      initial={{ opacity: 0, scale: 0.92, y: 18 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                    >
                      <div className="ct-success-ring">✓</div>
                      <div className="ct-success-t">Message Sent!</div>
                      <div className="ct-success-s">
                        Thanks for reaching out. I’ll get back to you within 24 hours.
                      </div>

                      {responseStart && (
                        <div className="ct-response-box">
                          <Countdown start={responseStart} />
                        </div>
                      )}

                      <div className="ct-success-actions">
                        <motion.button
                          type="button"
                          className="ct-secondary-btn"
                          onClick={() => setSuccess(false)}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          Send Another ↩
                        </motion.button>
                        <motion.button
                          type="button"
                          className="ct-secondary-btn"
                          onClick={sharePage}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          Share ↗
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} noValidate>
                      <div className="ct-form-head">
                        <div>
                          <h2>Start a conversation</h2>
                          <p>Tell me what you want to build and I’ll take it from there.</p>
                        </div>
                        <div className="ct-step-count">{completion === 100 ? 'READY' : `${Math.round(completion / 33.33)}/3`}</div>
                      </div>

                      <div className="ct-completion">
                        <div className="ct-completion-bar" style={{ '--completion': `${completion}%` }} />
                      </div>
                      <div className="ct-completion-label">
                        <span>Form progress</span>
                        <span>{completion}% complete</span>
                      </div>

                      {error && (
                        <motion.div
                          className="ct-error"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <span>⚠️</span>
                          <span>{error}</span>
                        </motion.div>
                      )}

                      <div className="ct-field">
                        <label htmlFor="name" className="ct-label">
                          <span>Your Name</span>
                          {form.name.trim() && <span className="ct-valid-mark">✓</span>}
                        </label>
                        <div className="ct-input-wrap">
                          <div className="ct-input-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            className={`ct-input ${fieldErrors.name ? 'invalid' : ''}`}
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>
                        {fieldErrors.name && <div className="ct-field-error">{fieldErrors.name}</div>}
                      </div>

                      <div className="ct-field">
                        <label htmlFor="email" className="ct-label">
                          <span>Email Address</span>
                          {form.email.trim() && emailValid && <span className="ct-valid-mark">✓</span>}
                        </label>
                        <div className="ct-input-wrap">
                          <div className="ct-input-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className={`ct-input ${fieldErrors.email ? 'invalid' : ''}`}
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>
                        {fieldErrors.email && <div className="ct-field-error">{fieldErrors.email}</div>}
                      </div>



                      <div className="ct-field">
                        <label htmlFor="message" className="ct-label">
                          <span>Message</span>
                          {form.message.trim() && <span className="ct-valid-mark">✓</span>}
                        </label>
                        <div className="ct-input-wrap">
                          <div className="ct-input-icon ct-ta-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            className={`ct-input ${fieldErrors.message ? 'invalid' : ''}`}
                            placeholder="Tell me about your project or idea..."
                            rows={6}
                            maxLength={MAX_MESSAGE_LENGTH}
                            value={form.message}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>
                        <div className="ct-char-row">
                          <span className="ct-char">{projectType || 'Add a project type above if useful'}</span>
                          <span className={`ct-char ${form.message.length > 850 ? 'near' : ''} ${form.message.length >= MAX_MESSAGE_LENGTH ? 'full' : ''}`}>
                            {form.message.length} / {MAX_MESSAGE_LENGTH}
                          </span>
                        </div>
                        {fieldErrors.message && <div className="ct-field-error">{fieldErrors.message}</div>}
                      </div>

                      <div className="ct-draft-row">
                        <span className="ct-draft-status">
                          {hasDraft ? `Draft saved${draftSavedAt ? ' just now' : ''}` : 'Your draft is saved locally'}
                        </span>
                        {(form.name || form.email || form.message) && (
                          <button type="button" className="ct-clear-draft" onClick={clearDraft}>
                            Clear draft ×
                          </button>
                        )}
                      </div>

                      <Magnetic strength={0.05}>
                        <motion.button
                          type="submit"
                          className="ct-submit"
                          disabled={loading}
                          whileHover={!loading ? { scale: 1.015, y: -2 } : {}}
                          whileTap={!loading ? { scale: 0.985 } : {}}
                        >
                          {loading ? (
                            <>
                              <span className="ct-spinner" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                              </svg>
                            </>
                          )}
                        </motion.button>
                      </Magnetic>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          </main>

          <AnimatePresence>
            {showMap && (
              <motion.div
                className="ct-map-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMap(false)}
              >
                <motion.div
                  className="ct-map-modal"
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button type="button" className="ct-map-close" onClick={() => setShowMap(false)}>
                    Close ✕
                  </button>
                  <iframe
                    className="ct-map-frame"
                    src="https://www.google.com/maps?q=Karachi,+Pakistan&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Pakistan map"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {toast && (
            <motion.div
              className={`ct-toast ${toast.type}`}
              initial={{ opacity: 0, y: 16, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <span>{toast.type === 'error' ? '⚠️' : '✓'}</span>
              <span>{toast.message}</span>
              <button type="button" className="ct-toast-close" onClick={() => setToast(null)}>×</button>
            </motion.div>
          )}

          <ConfettiBurst active={confetti} />
        </div>
        <Footer />
      </PageTransition>
    </>
  );
}
