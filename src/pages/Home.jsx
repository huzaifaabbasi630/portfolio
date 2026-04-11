import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  animate,
} from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  {
    n: 11,
    suffix: "+",
    label: "Projects Built",
    icon: "🚀",
    color: "99,102,241",
  },
  {
    n: 20000,
    suffix: "+",
    label: "Coding Line Experienced",
    icon: "🤝",
    color: "139,92,246",
  },
  { n: 1, suffix: "+", label: "Years Coding", icon: "💻", color: "236,72,153" },
  {
    n: 99,
    suffix: "%",
    label: "Passion Level",
    icon: "🔥",
    color: "34,211,238",
  },
];

const PERSONALITY = [];

const FLOAT_SYMBOLS = [
  { s: "</>", x: "3%", y: "12%", sz: 14, op: 0.09, dur: 14, depth: 0.3 },
  { s: "{ }", x: "91%", y: "8%", sz: 16, op: 0.08, dur: 17, depth: 0.5 },
  { s: "=>", x: "88%", y: "42%", sz: 13, op: 0.07, dur: 19, depth: 0.2 },
  { s: "( )", x: "4%", y: "55%", sz: 11, op: 0.07, dur: 12, depth: 0.4 },
  { s: "===", x: "14%", y: "80%", sz: 12, op: 0.07, dur: 20, depth: 0.6 },
  { s: "[ ]", x: "80%", y: "78%", sz: 11, op: 0.06, dur: 15, depth: 0.3 },
  { s: "∞", x: "50%", y: "5%", sz: 20, op: 0.07, dur: 22, depth: 0.7 },
  { s: "//", x: "60%", y: "88%", sz: 12, op: 0.06, dur: 13, depth: 0.2 },
];

const SUBTITLES = [
 
  "Full Stack Developer",
  "MERN Stack Engineer",
  "Mobile App Developer (Using React-Native)",
  "React Specialist",
  "Backend Architect",
  "Problem Solver",
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

:root {
  --indigo: #6366f1; --violet: #8b5cf6; --pink: #ec4899;
  --cyan: #22d3ee;   --green: #4ade80;  --bg: #04050e;
}
.ab, .ab * { box-sizing: border-box; margin: 0; padding: 0; }
.ab {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg); min-height: 100vh;
  overflow-x: hidden; color: #f1f1ff;
}
.ab-noise {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .028;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}
.ab-canvas { position: fixed; inset: 0; z-index: 0; opacity: .5; pointer-events: none; }
.ab-spotlight {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(650px circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,.09), transparent 70%);
}
.ab-bgrid {
  background-image:
    linear-gradient(rgba(99,102,241,.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,.022) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ══════════════════════════════════════════════
   PAGE LOADER — REDESIGNED
══════════════════════════════════════════════ */
.ab-loader {
  position: fixed; inset: 0; z-index: 99999;
  background: var(--bg);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 0;
  overflow: hidden;
}

/* Animated grid lines inside loader */
.ab-loader::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(99,102,241,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,.04) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: ab-grid-drift 8s linear infinite;
  pointer-events: none;
}
@keyframes ab-grid-drift {
  from { transform: translateY(0); }
  to   { transform: translateY(50px); }
}

/* Scan line */
.ab-loader-scanline {
  position: absolute; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(99,102,241,.5), rgba(34,211,238,.4), transparent);
  animation: ab-loader-scan 2s ease-in-out infinite;
  pointer-events: none;
  filter: blur(1px);
}
@keyframes ab-loader-scan {
  0%   { top: -2px; opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* Corner brackets */
.ab-loader-corners {
  position: absolute; inset: 40px;
  pointer-events: none;
}
.ab-loader-corner {
  position: absolute; width: 28px; height: 28px;
  border-style: solid; border-color: rgba(99,102,241,.5);
  animation: ab-lc-pulse 2s ease-in-out infinite;
}
.ab-loader-corner.tl { top: 0; left: 0; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
.ab-loader-corner.tr { top: 0; right: 0; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; animation-delay: .5s; }
.ab-loader-corner.bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; animation-delay: 1s; }
.ab-loader-corner.br { bottom: 0; right: 0; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; animation-delay: 1.5s; }
@keyframes ab-lc-pulse { 0%,100%{opacity:.4; border-color:rgba(99,102,241,.5)} 50%{opacity:1; border-color:rgba(34,211,238,.8)} }

/* Center content */
.ab-loader-center {
  display: flex; flex-direction: column;
  align-items: center; gap: 20px;
  position: relative; z-index: 1;
}

/* Dev icon */
.ab-loader-icon-wrap {
  position: relative;
  width: 90px; height: 90px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 4px;
}
.ab-loader-icon-ring {
  position: absolute; inset: 0; border-radius: 50%;
  background: conic-gradient(from 0deg, #6366f1, #8b5cf6, #ec4899, #22d3ee, #6366f1);
  animation: ab-icon-ring-spin 3s linear infinite;
  padding: 2.5px;
}
.ab-loader-icon-ring::after {
  content: ''; position: absolute; inset: 3px; border-radius: 50%;
  background: var(--bg);
}
.ab-loader-icon-inner {
  position: relative; z-index: 2;
  width: 70px; height: 70px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(99,102,241,.15), rgba(139,92,246,.1));
  border: 1px solid rgba(99,102,241,.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 30px;
  box-shadow: 0 0 30px rgba(99,102,241,.25), inset 0 1px 0 rgba(255,255,255,.06);
}
@keyframes ab-icon-ring-spin { to { transform: rotate(360deg); } }

/* Glow pulse under icon */
.ab-loader-icon-glow {
  position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%);
  width: 60px; height: 20px; border-radius: 50%;
  background: rgba(99,102,241,.35);
  filter: blur(12px);
  animation: ab-glow-pulse 2s ease-in-out infinite;
}
@keyframes ab-glow-pulse { 0%,100%{opacity:.5; transform:translateX(-50%) scaleX(1)} 50%{opacity:1; transform:translateX(-50%) scaleX(1.3)} }

/* Welcome text */
.ab-loader-welcome {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(20px, 3.5vw, 28px);
  letter-spacing: -0.5px;
  color: #f1f1ff;
  text-align: center;
  line-height: 1.2;
}
.ab-loader-welcome span {
  display: block;
  background: linear-gradient(130deg, var(--indigo) 0%, #a78bfa 50%, var(--pink) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  background-size: 200% 200%; animation: ab-grad 2s ease infinite;
  font-size: clamp(14px, 2vw, 18px); font-weight: 700; letter-spacing: .05em;
  margin-top: 2px;
}

/* Social links */
.ab-loader-socials {
  display: flex; gap: 12px; align-items: center;
}
.ab-loader-social-link {
  display: flex; align-items: center; gap: 7px;
  padding: 7px 16px; border-radius: 10px;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
  color: rgba(165,180,252,.65); text-decoration: none;
  font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: .06em;
  transition: all .25s;
}
.ab-loader-social-link:hover {
  background: rgba(99,102,241,.12); border-color: rgba(99,102,241,.4);
  color: #a5b4fc; transform: translateY(-2px);
}

/* Progress bar */
.ab-loader-bar-section {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  width: min(340px, 80vw);
}
.ab-loader-bar-wrap {
  width: 100%; height: 2px;
  background: rgba(255,255,255,.06); border-radius: 2px; overflow: hidden;
  position: relative;
}
.ab-loader-bar {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--indigo), var(--violet), var(--pink));
  transition: width .08s linear;
  box-shadow: 0 0 12px rgba(99,102,241,.8);
  position: relative;
}
.ab-loader-bar::after {
  content: '';
  position: absolute; right: -1px; top: -3px;
  width: 8px; height: 8px; border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px rgba(255,255,255,.9), 0 0 16px rgba(99,102,241,.8);
}
.ab-loader-pct {
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 11px;
  letter-spacing: .2em; color: rgba(241,241,255,.25); text-transform: uppercase;
}

/* ══ CURSOR ══ */
@media (hover:hover) {
  .ab { cursor: none; }
  .ab-cur {
    position: fixed; pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    width: 8px; height: 8px; border-radius: 50%;
    background: #fff; mix-blend-mode: difference;
    will-change: left, top;
    transition: width .18s cubic-bezier(.22,1,.36,1), height .18s cubic-bezier(.22,1,.36,1),
                border-radius .18s, background .18s, box-shadow .18s, mix-blend-mode 0s;
  }
  .ab-cur.hov { width:10px; height:10px; mix-blend-mode:normal; background:var(--pink); box-shadow:0 0 0 3px rgba(236,72,153,.2),0 0 18px rgba(236,72,153,.7),0 0 36px rgba(236,72,153,.3); }
  .ab-cur.clicking { width:5px; height:5px; mix-blend-mode:normal; background:var(--cyan); box-shadow:0 0 20px var(--cyan),0 0 40px rgba(34,211,238,.5); }
  .ab-cur.text-hov { width:2px; height:20px; border-radius:1px; mix-blend-mode:normal; background:#a5b4fc; box-shadow:0 0 10px rgba(165,180,252,.8); }
  .ab-curR {
    position:fixed; pointer-events:none; z-index:9997;
    transform:translate(-50%,-50%);
    width:36px; height:36px; border-radius:50%;
    border:1.5px solid rgba(99,102,241,.5);
    will-change:left,top;
    transition:width .38s cubic-bezier(.22,1,.36,1),height .38s cubic-bezier(.22,1,.36,1),border-color .25s,border-radius .25s,background .25s;
  }
  .ab-curR.hov  { width:50px; height:50px; border-color:rgba(236,72,153,.65); background:rgba(236,72,153,.04); }
  .ab-curR.clicking { width:22px; height:22px; border-color:var(--cyan); background:rgba(34,211,238,.07); }
  .ab-curR.text-hov { width:2px; height:28px; border-radius:2px; border-color:transparent; background:rgba(165,180,252,.18); }
  .ab-cur-halo {
    position:fixed; pointer-events:none; z-index:9996;
    transform:translate(-50%,-50%);
    width:80px; height:80px; border-radius:50%;
    background:radial-gradient(circle,rgba(99,102,241,.1) 0%,transparent 70%);
    opacity:0; filter:blur(6px); will-change:left,top;
    transition:opacity .4s,width .5s cubic-bezier(.22,1,.36,1),height .5s cubic-bezier(.22,1,.36,1),background .3s;
  }
  .ab-cur-halo.vis { opacity:1; }
  .ab-cur-halo.hov { opacity:1; width:110px; height:110px; background:radial-gradient(circle,rgba(236,72,153,.13) 0%,transparent 70%); }
  .ab-cur-halo.clicking { opacity:1; width:55px; height:55px; background:radial-gradient(circle,rgba(34,211,238,.22) 0%,transparent 70%); }
  .ab-cur-label {
    position:fixed; pointer-events:none; z-index:10000;
    transform:translate(-50%,-50%);
    padding:4px 12px; border-radius:100px;
    background:rgba(13,14,31,.9); backdrop-filter:blur(12px);
    border:1px solid rgba(255,255,255,.1);
    font-family:'Syne',sans-serif; font-size:10px; font-weight:700;
    letter-spacing:.1em; text-transform:uppercase; color:#f1f1ff;
    white-space:nowrap; opacity:0; transition:opacity .2s;
  }
  .ab-cur-label.vis { opacity:1; }
}
.ab-trail-dot { position:fixed; pointer-events:none; z-index:9995; border-radius:50%; transform:translate(-50%,-50%); mix-blend-mode:screen; will-change:left,top; }
.ab-burst { position:fixed; pointer-events:none; z-index:9994; border-radius:50%; animation:ab-burst-out var(--bd,.5s) ease-out forwards; }
@keyframes ab-burst-out {
  0%   { transform:translate(-50%,-50%) scale(0); opacity:1; }
  60%  { opacity:.8; }
  100% { transform:translate(calc(-50% + var(--tx,0px)),calc(-50% + var(--ty,0px))) scale(1); opacity:0; }
}

/* ── FLOATING SYMBOLS ── */
.ab-float { position:fixed; pointer-events:none; font-family:'Syne',monospace; font-weight:700; color:var(--indigo); user-select:none; z-index:2; will-change:transform; }
@keyframes ab-float-sym {
  0%,100% { transform:translateY(0) rotate(0deg) scale(1); }
  25%     { transform:translateY(-18px) rotate(3deg) scale(1.05); }
  50%     { transform:translateY(-8px) rotate(-2deg) scale(0.98); }
  75%     { transform:translateY(12px) rotate(4deg) scale(1.02); }
}

/* ── HERO ── */
.ab-hero {
  position:relative; z-index:3;
  min-height:100vh;
  display:grid; grid-template-columns:1fr 1fr;
  align-items:center; gap:60px;
  padding:130px 80px 80px;
  max-width:1200px; margin:0 auto;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

/* ── BADGE ── */
.ab-badge { display:inline-flex; align-items:center; gap:9px; padding:8px 20px; border-radius:100px; border:1px solid rgba(34,211,238,.28); background:rgba(34,211,238,.07); font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--cyan); margin-bottom:28px; animation:ab-badge-glow 3s ease-in-out infinite; position:relative; overflow:hidden; }
.ab-badge::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(34,211,238,.08) 50%,transparent 60%); transform:translateX(-100%); animation:ab-badge-shimmer 3s ease-in-out 1s infinite; }
@keyframes ab-badge-shimmer { 0%,100%{transform:translateX(-100%)} 50%{transform:translateX(300%)} }
@keyframes ab-badge-glow { 0%,100%{box-shadow:0 0 20px rgba(34,211,238,.08)} 50%{box-shadow:0 0 32px rgba(34,211,238,.2)} }
@keyframes ab-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,.6)} 50%{box-shadow:0 0 0 8px rgba(34,211,238,0)} }
.ab-bdot { width:7px; height:7px; border-radius:50%; background:var(--cyan); animation:ab-pulse 2s infinite; flex-shrink:0; }

.ab-hi { font-size:clamp(16px,2vw,20px); font-weight:500; color:rgba(241,241,255,.4); margin-bottom:8px; letter-spacing:.05em; }
.ab-name { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(36px,5vw,60px); line-height:.92; letter-spacing:-2px; color:#f1f1ff; margin-bottom:4px; }
.ab-name-grad { display:block; background:linear-gradient(130deg,var(--indigo) 0%,#a78bfa 40%,var(--pink) 70%,#f472b6 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; filter:drop-shadow(0 0 40px rgba(99,102,241,.55)); background-size:300% 300%; animation:ab-grad 5s ease infinite; }
@keyframes ab-grad { 0%,100%{background-position:0%50%} 50%{background-position:100%50%} }

.ab-subtitle-wrap { margin:18px 0; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.ab-sub-pre { font-size:14px; color:rgba(241,241,255,.3); font-weight:500; }
.ab-sub-typed { font-family:'Syne',sans-serif; font-weight:700; font-size:clamp(15px,2vw,18px); background:linear-gradient(90deg,#a5b4fc,#f9a8d4); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
@keyframes ab-blink { 0%,100%{opacity:1} 50%{opacity:0} }
.ab-cursor { display:inline-block; width:2px; height:.8em; background:var(--indigo); vertical-align:middle; margin-left:3px; animation:ab-blink .75s step-end infinite; }

.ab-bio { font-size:clamp(14px,1.6vw,15.5px); line-height:1.85; color:rgba(241,241,255,.38); max-width:480px; margin-bottom:36px; }
.ab-cta { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:44px; }

/* ── MAGNETIC BUTTON ── */
.ab-mag-wrap { display:inline-block; position:relative; }
.ab-btn-p { display:inline-flex; align-items:center; gap:9px; padding:14px 32px; border-radius:14px; background:linear-gradient(135deg,var(--indigo),var(--violet)); color:#fff; font-family:'Syne',sans-serif; font-weight:700; font-size:13.5px; letter-spacing:.04em; text-decoration:none; position:relative; overflow:hidden; border:none; cursor:none; box-shadow:0 8px 32px rgba(99,102,241,.3); transition:box-shadow .3s; }
.ab-btn-p::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#818cf8,#a78bfa); opacity:0; transition:opacity .3s; }
.ab-btn-p::after { content:''; position:absolute; inset:-2px; border-radius:16px; z-index:-1; background:conic-gradient(from var(--angle,0deg),var(--indigo),var(--pink),var(--cyan),var(--indigo)); animation:ab-border-spin 3s linear infinite; opacity:0; transition:opacity .3s; }
.ab-btn-p:hover { box-shadow:0 24px 64px rgba(99,102,241,.6); }
.ab-btn-p:hover::before { opacity:1; } .ab-btn-p:hover::after { opacity:1; }
.ab-btn-p > * { position:relative; z-index:1; }
.ab-btn-p:hover .ab-btn-arrow { transform:translateX(5px); }
.ab-btn-arrow { transition:transform .25s cubic-bezier(.22,1,.36,1); display:inline-flex; }
@keyframes ab-border-spin { to { --angle:360deg; } }
@property --angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
.ab-btn-s { display:inline-flex; align-items:center; gap:9px; padding:14px 32px; border-radius:14px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.1); color:rgba(241,241,255,.5); font-family:'Syne',sans-serif; font-weight:700; font-size:13.5px; letter-spacing:.04em; text-decoration:none; cursor:none; transition:all .3s cubic-bezier(.22,1,.36,1); position:relative; overflow:hidden; backdrop-filter:blur(8px); }
.ab-btn-s::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(99,102,241,.1),rgba(236,72,153,.05)); opacity:0; transition:opacity .3s; }
.ab-btn-s:hover { border-color:rgba(99,102,241,.5); color:#f1f1ff; box-shadow:0 12px 40px rgba(99,102,241,.25); }
.ab-btn-s:hover::before { opacity:1; }
.ab-mag-ripple { position:absolute; border-radius:50%; transform:scale(0); pointer-events:none; background:rgba(255,255,255,.18); animation:ab-ripple-anim .6s ease-out forwards; }
@keyframes ab-ripple-anim { to { transform:scale(6); opacity:0; } }

/* ── STACK PILLS ── */
.ab-stack { display:flex; flex-wrap:wrap; gap:8px; }
.ab-stack-pill { padding:6px 14px; border-radius:8px; font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; background:rgba(99,102,241,.07); border:1px solid rgba(99,102,241,.16); color:rgba(165,180,252,.65); transition:all .25s cubic-bezier(.22,1,.36,1); position:relative; overflow:hidden; }
.ab-stack-pill::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(99,102,241,.15),rgba(139,92,246,.1)); opacity:0; transition:opacity .25s; }
.ab-stack-pill:hover { background:rgba(99,102,241,.15); color:#c7d2fe; transform:translateY(-3px); box-shadow:0 8px 24px rgba(99,102,241,.2); }
.ab-stack-pill:hover::before { opacity:1; }

/* ── HERO RIGHT ── */
.ab-hero-right { display:flex; justify-content:center; align-items:flex-start; position: relative; align-self: start; }

/* ══════════════════════════════════════════════
   HANGING ID CARD — REDESIGNED
══════════════════════════════════════════════ */

/* The entire hanging rig is fixed to top-center of viewport */
.id-fixed-anchor {
  position: absolute;
  top: -130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none; /* anchor itself — no pointer events */
}

/* Nail/pin at very top edge */
.id-nail {
  width: 20px; height: 20px; border-radius: 50%;
  background: linear-gradient(145deg, #c8d0e8 0%, #8892a8 50%, #3a3f55 100%);
  box-shadow: 0 2px 8px rgba(0,0,0,.8), inset 0 1px 3px rgba(255,255,255,.3), 0 0 0 3px rgba(255,255,255,.05);
  position: relative; flex-shrink: 0;
  pointer-events: none;
}
.id-nail::after {
  content:''; position:absolute; top:50%; left:50%;
  transform:translate(-50%,-50%);
  width:7px; height:7px; border-radius:50%;
  background:rgba(0,0,0,.55);
  box-shadow:inset 0 1px 2px rgba(0,0,0,.9);
}

/* Ribbon string */
.id-ribbon {
  width: 8px; height: 146px;
  position: relative;
  flex-shrink: 0;
  pointer-events: none;
}
.id-ribbon::before {
  content:''; position:absolute;
  left:50%; top:0; bottom:0; transform:translateX(-50%);
  width:4px;
  background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 35%, #a78bfa 65%, #6366f1 100%);
  border-radius:2px;
  box-shadow: 0 0 14px rgba(99,102,241,.55), 0 0 28px rgba(99,102,241,.2);
}
/* Ribbon sheen */
.id-ribbon::after {
  content:''; position:absolute;
  left:50%; top:0; bottom:0;
  transform:translateX(calc(-50% + 1px));
  width:1.5px;
  background:linear-gradient(180deg,rgba(255,255,255,.5),rgba(255,255,255,.1),rgba(255,255,255,.3));
  border-radius:2px;
}

/* Metal clip */
.id-clip {
  width:42px; height:22px;
  background:linear-gradient(135deg,#1a1b2e,#2d2f50,#1a1b2e);
  border:1px solid rgba(99,102,241,.45);
  border-radius:7px;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 3px 10px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.06);
  flex-shrink:0;
  position:relative; z-index:5;
  pointer-events:none;
}
.id-clip::before {
  content:''; position:absolute;
  inset:3px 8px;
  border:1.5px solid rgba(99,102,241,.4);
  border-radius:4px;
  background:rgba(4,5,14,.9);
}
.id-clip::after {
  content:''; position:absolute;
  top:50%; left:50%; transform:translate(-50%,-50%);
  width:8px; height:8px; border-radius:50%;
  border:1.5px solid rgba(99,102,241,.5);
  background:rgba(4,5,14,.8);
}

/* Draggable rig — pointer events ON */
.id-rig {
  pointer-events: all;
  cursor: grab;
  user-select: none;
  touch-action: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.id-rig:active { cursor: grabbing; }

/* ── THE CARD ── */
.id-card {
  width: 270px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg,
    rgba(14,15,36,0.98) 0%,
    rgba(18,16,42,0.99) 60%,
    rgba(22,14,38,1) 100%
  );
  border: 1px solid rgba(99,102,241,.22);
  box-shadow:
    0 50px 100px rgba(0,0,0,.75),
    0 25px 50px rgba(99,102,241,.15),
    0 0 0 1px rgba(255,255,255,.04) inset,
    0 1px 0 rgba(255,255,255,.09) inset;
}

/* Top accent strip — animated gradient */
.id-card-strip {
  position:absolute; top:0; left:0; right:0; height:4px;
  background:linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #22d3ee, #6366f1);
  background-size:300% 100%;
  animation:id-strip 5s linear infinite;
  z-index:10;
  border-radius:24px 24px 0 0;
}
@keyframes id-strip { 0%{background-position:0%} 100%{background-position:300%} }

/* Inner glow layers */
.id-card::before {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse at 50% -5%, rgba(99,102,241,.22) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 100%, rgba(236,72,153,.12) 0%, transparent 45%),
    radial-gradient(ellipse at 10% 60%, rgba(34,211,238,.07) 0%, transparent 40%);
  z-index:0;
}

/* Shimmer sweep */
.id-card::after {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.04) 50%,transparent 65%);
  transform:translateX(-100%);
  background:linear-gradient(to bottom,transparent 35%,rgba(255,255,255,.04) 50%,transparent 65%);
  transform:translateY(-100%);
  animation:id-shimmer 6s ease-in-out 3s infinite;
  z-index:1;
}
@keyframes id-shimmer { 0%{transform:translateX(-100%)} 50%,100%{transform:translateX(300%)} }
@keyframes id-shimmer { 0%{transform:translateY(-100%)} 50%,100%{transform:translateY(300%)} }

/* Scan effect */
.id-scan-wrap {
  position:absolute; inset:0; z-index:3; pointer-events:none;
  border-radius:24px; overflow:hidden;
}
.id-scan-wrap::after {
  content:''; position:absolute; left:0; right:0; top:-35%; height:35%;
  background:linear-gradient(to bottom,transparent,rgba(99,102,241,.07),transparent);
  animation:id-scan 7s linear 2s infinite;
}
@keyframes id-scan { from{top:-35%} to{top:120%} }

/* Corner brackets */
.id-c { position:absolute; width:18px; height:18px; z-index:4; border-style:solid; border-color:rgba(99,102,241,.6); animation:id-cp 3s ease-in-out infinite; }
.id-c.tl { top:12px; left:12px; border-width:2px 0 0 2px; border-radius:4px 0 0 0; }
.id-c.tr { top:12px; right:12px; border-width:2px 2px 0 0; border-radius:0 4px 0 0; animation-delay:.75s; }
.id-c.bl { bottom:12px; left:12px; border-width:0 0 2px 2px; border-radius:0 0 0 4px; animation-delay:1.5s; }
.id-c.br { bottom:12px; right:12px; border-width:0 2px 2px 0; border-radius:0 0 4px 0; animation-delay:2.25s; }
@keyframes id-cp { 0%,100%{opacity:.45;border-color:rgba(99,102,241,.55)} 50%{opacity:1;border-color:rgba(99,102,241,.9)} }

/* Card inner */
.id-inner {
  position:relative; z-index:2;
  display:flex; flex-direction:column; align-items:center;
  padding:30px 22px 28px;
}

/* Year badge */
.id-year {
  font-family:'Syne',sans-serif; font-size:9px; font-weight:700;
  letter-spacing:.3em; text-transform:uppercase;
  color:rgba(165,180,252,.35);
  margin-bottom:20px;
  position:relative;
}
.id-year::before, .id-year::after {
  content:'';
  position:absolute; top:50%; transform:translateY(-50%);
  width:20px; height:1px;
  background:linear-gradient(90deg,transparent,rgba(99,102,241,.35));
}
.id-year::before { right:calc(100% + 8px); }
.id-year::after  { left:calc(100% + 8px); background:linear-gradient(270deg,transparent,rgba(99,102,241,.35)); }

/* ── PROFILE IMAGE — big, dominant ── */
.id-photo-wrap {
  position:relative;
  width:150px; height:150px;
  margin-bottom:22px;
  flex-shrink:0;
}

/* Outer spinning gradient ring */
.id-photo-ring-outer {
  position:absolute; inset:-3px; border-radius:50%;
  background:conic-gradient(from 0deg, #6366f1 0%, #8b5cf6 25%, #ec4899 50%, #22d3ee 75%, #6366f1 100%);
  animation:id-ring-spin 4s linear infinite;
}
/* Inner bg gap */
.id-photo-ring-outer::after {
  content:''; position:absolute; inset:3px; border-radius:50%;
  background:rgba(14,15,36,1);
}

/* Second counter-rotating ring */
.id-photo-ring-inner {
  position:absolute; inset:5px; border-radius:50%;
  background:conic-gradient(from 180deg, rgba(99,102,241,.4) 0%, transparent 40%, rgba(236,72,153,.3) 70%, transparent 100%);
}

@keyframes id-ring-spin     { to { transform:rotate(360deg); } }
@keyframes id-ring-spin-rev { to { transform:rotate(-360deg); } }

/* The actual circular photo */
.id-photo {
  position:absolute; inset:5px; border-radius:50%;
  overflow:hidden; z-index:2;
  border:2px solid rgba(14,15,36,.95);
  box-shadow:0 0 0 1px rgba(99,102,241,.2);
}
.id-photo img {
  width:100%; height:100%;
  object-fit:cover; object-position:center top;
  border-radius:50%;
  display:block;
}
.id-photo-fallback {
  width:100%; height:100%;
  border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:48px;
  background:linear-gradient(135deg,rgba(99,102,241,.2),rgba(139,92,246,.15));
}

/* Online dot */
.id-online {
  position:absolute; bottom:6px; right:6px; z-index:5;
  width:16px; height:16px; border-radius:50%;
  background:#22c55e;
  border:3px solid rgba(14,15,36,1);
  box-shadow:0 0 10px rgba(34,197,94,.7);
  animation:id-online-pulse 2.5s ease-in-out infinite;
}
@keyframes id-online-pulse { 0%,100%{box-shadow:0 0 10px rgba(34,197,94,.7)} 50%{box-shadow:0 0 20px rgba(34,197,94,1),0 0 35px rgba(34,197,94,.4)} }

/* Glow under photo */
.id-photo-glow {
  position:absolute; bottom:-12px; left:50%; transform:translateX(-50%);
  width:100px; height:20px; border-radius:50%;
  background:rgba(99,102,241,.3);
  filter:blur(14px);
  z-index:0;
}

/* Name */
.id-name {
  font-family:'Syne',sans-serif; font-weight:800;
  font-size:22px; letter-spacing:-0.5px;
  color:#f1f1ff;
  text-align:center;
  margin-bottom:5px;
  line-height:1.1;
}

/* Role */
.id-role {
  font-size:10.5px; font-weight:700;
  letter-spacing:.2em; text-transform:uppercase;
  background:linear-gradient(90deg,#a5b4fc,#f9a8d4);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  margin-bottom:20px;
  text-align:center;
}

/* Divider */
.id-divider {
  width:100%; height:1px; margin-bottom:20px;
  background:linear-gradient(90deg,transparent,rgba(99,102,241,.35),rgba(236,72,153,.25),transparent);
  position:relative;
}
.id-divider::after {
  content:''; position:absolute; left:50%; top:50%;
  transform:translate(-50%,-50%);
  width:5px; height:5px; border-radius:50%;
  background:var(--indigo);
  box-shadow:0 0 10px rgba(99,102,241,.9);
}

/* Social icons row */
.id-socials {
  display:flex; gap:12px; justify-content:center;
  width:100%;
}
.id-social {
  display:flex; align-items:center; justify-content:center;
  width:44px; height:44px; border-radius:14px;
  background:rgba(255,255,255,.035);
  border:1px solid rgba(255,255,255,.07);
  color:rgba(165,180,252,.55);
  text-decoration:none;
  transition:all .3s cubic-bezier(.22,1,.36,1);
  position:relative; overflow:hidden;
}
.id-social::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(135deg,rgba(99,102,241,.15),rgba(139,92,246,.1));
  opacity:0; transition:opacity .3s;
  border-radius:14px;
}
.id-social:hover { color:#a5b4fc; border-color:rgba(99,102,241,.45); transform:translateY(-4px) scale(1.08); box-shadow:0 10px 28px rgba(99,102,241,.25); }
.id-social:hover::before { opacity:1; }
.id-social svg { position:relative; z-index:1; }

/* Drag hint fade */
.id-drag-hint {
  margin-top:14px;
  font-family:'Syne',sans-serif; font-size:9px; font-weight:700;
  letter-spacing:.2em; text-transform:uppercase;
  color:rgba(165,180,252,.18);
  animation:id-hint 3s ease-in-out 4s forwards;
}
@keyframes id-hint { 0%{opacity:1} 100%{opacity:0;pointer-events:none} }

/* ── SECTION ── */
.ab-section { position:relative; z-index:3; max-width:1100px; margin:0 auto; padding:0 40px 100px; }
.ab-sec-lbl { font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:rgba(241,241,255,.2); font-weight:700; margin-bottom:6px; display:inline-flex; align-items:center; gap:8px; }
.ab-sec-lbl::before { content:''; display:inline-block; width:20px; height:1px; background:linear-gradient(90deg,var(--indigo),transparent); }
.ab-sec-h { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(28px,4vw,42px); letter-spacing:-1.5px; color:#f1f1ff; margin-bottom:56px; line-height:1; }
.ab-sec-h em { font-style:normal; background:linear-gradient(130deg,var(--indigo),#a78bfa,var(--pink)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.ab-divider { width:100%; height:1px; background:linear-gradient(90deg,transparent,rgba(99,102,241,.35),rgba(236,72,153,.25),transparent); margin:0 0 80px; position:relative; }
.ab-divider::before { content:''; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:6px; height:6px; border-radius:50%; background:var(--indigo); box-shadow:0 0 14px rgba(99,102,241,.9); }

/* ── STATS with 3D effect ── */
.ab-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:80px; }
.ab-stat-card { 
  padding:32px 24px; 
  border-radius:20px; 
  text-align:center; 
  background:rgba(255,255,255,.025); 
  border:1px solid rgba(255,255,255,.07); 
  backdrop-filter:blur(16px); 
  position:relative; 
  overflow:hidden; 
  transition:all .35s cubic-bezier(.22,1,.36,1); 
  transform-style:preserve-3d;
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.ab-stat-card::before { 
  content:''; 
  position:absolute; 
  inset:0; 
  background:radial-gradient(circle at 50% -10%,rgba(var(--sc),0.18),transparent 65%); 
  opacity:0; 
  transition:opacity .35s; 
}
.ab-stat-card:hover { 
  border-color:rgba(var(--sc),.4); 
  transform: perspective(1000px) rotateX(4deg) rotateY(-2deg) translateY(-10px) translateZ(20px);
  box-shadow: 0 30px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(var(--sc),.15) inset;
}
.ab-stat-card:hover::before { opacity:1; }
.ab-stat-icon { 
  font-size:26px; 
  margin-bottom:12px; 
  display:block; 
  transition:transform .3s cubic-bezier(.22,1,.36,1);
  transform: translateZ(10px);
}
.ab-stat-card:hover .ab-stat-icon { transform:scale(1.25) translateY(-4px) translateZ(30px); }
.ab-stat-n { 
  font-family:'Syne',sans-serif; 
  font-weight:800; 
  font-size:clamp(36px,5vw,54px); 
  line-height:1; 
  background:linear-gradient(135deg,#a5b4fc,#c4b5fd,#f9a8d4); 
  -webkit-background-clip:text; 
  -webkit-text-fill-color:transparent; 
  background-clip:text; 
  filter:drop-shadow(0 0 24px rgba(99,102,241,.45)); 
  margin-bottom:8px;
  transform: translateZ(15px);
}
.ab-stat-l { 
  font-size:12px; 
  font-weight:600; 
  letter-spacing:.14em; 
  text-transform:uppercase; 
  color:rgba(241,241,255,.28);
  transform: translateZ(5px);
}

/* ── PERSONALITY with 3D effect ── */
.ab-pers-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:16px; }
.ab-pers-card { 
  padding:28px 16px; 
  border-radius:20px; 
  text-align:center; 
  background:rgba(255,255,255,.025); 
  border:1px solid rgba(255,255,255,.06); 
  backdrop-filter:blur(12px); 
  transition:all .35s cubic-bezier(.22,1,.36,1); 
  cursor:default; 
  position:relative; 
  overflow:hidden; 
  transform-style:preserve-3d;
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.ab-pers-card::before { 
  content:''; 
  position:absolute; 
  inset:0; 
  border-radius:20px; 
  background:radial-gradient(circle at 50% 100%,rgba(var(--pc),0.18),transparent 70%); 
  opacity:0; 
  transition:opacity .35s; 
}
.ab-pers-card:hover { 
  transform: perspective(1000px) rotateX(6deg) rotateY(2deg) translateY(-12px) translateZ(25px) scale(1.02); 
  border-color:rgba(var(--pc),.38); 
  box-shadow:0 30px 40px rgba(0,0,0,0.4);
}
.ab-pers-card:hover::before { opacity:1; }
.ab-pers-card:hover .ab-pers-icon { animation:ab-bounce .6s cubic-bezier(.22,1,.36,1); }
@keyframes ab-bounce { 
  0%,100%{transform:translateY(0) scale(1) translateZ(20px)} 
  40%{transform:translateY(-16px) scale(1.2) translateZ(40px)} 
  70%{transform:translateY(-5px) scale(1.06) translateZ(30px)} 
}
.ab-pers-icon { 
  font-size:34px; 
  margin-bottom:12px; 
  display:block; 
  transition:transform .3s;
  transform: translateZ(15px);
}
.ab-pers-lbl { 
  font-family:'Syne',sans-serif; 
  font-weight:700; 
  font-size:13px; 
  color:#f1f1ff; 
  margin-bottom:4px;
  transform: translateZ(10px);
}
.ab-pers-desc { 
  font-size:11px; 
  color:rgba(241,241,255,.28); 
  line-height:1.55;
  transform: translateZ(5px);
}

/* ── SCROLL REVEAL ── */
.ab-reveal {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.ab-reveal.vis { opacity:1; transform:translateY(0); }

/* ── RESPONSIVE ── */
@media (max-width:1024px) {
  .ab-hero { grid-template-columns:1fr; padding:120px 40px 60px; text-align:center; }
  .ab-hero-left { display:flex; flex-direction:column; align-items:center; }
  .ab-bio,.ab-stack,.ab-cta { justify-content:center; }
  .ab-stats-grid { grid-template-columns:repeat(2,1fr); }
  .ab-pers-grid { grid-template-columns:repeat(3,1fr); }
  .id-fixed-anchor { display:none; }
}
@media (max-width:640px) {
  .ab-hero { padding:110px 20px 60px; gap:40px; }
  .ab-section { padding:0 20px 80px; }
  .ab-stats-grid { grid-template-columns:repeat(2,1fr); }
  .ab-pers-grid { grid-template-columns:repeat(2,1fr); }
  .ab-float { display:none; }
  .ab-sec-h { margin-bottom:36px; }
  .id-fixed-anchor { display:none; }
}
`;

// ─── COUNT-UP ─────────────────────────────────────────────────────────────
function useCountUp(target, dur = 1800, start = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
      else setV(target);
    };
    requestAnimationFrame(step);
  }, [target, dur, start]);
  return v;
}

function StatCard({ n, suffix, label, icon, color, active }) {
  const count = useCountUp(n, 1800, active);
  return (
    <motion.div
      className="ab-stat-card"
      style={{ "--sc": color }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <span className="ab-stat-icon">{icon}</span>
      <div className="ab-stat-n">
        {count}
        {suffix}
      </div>
      <div className="ab-stat-l">{label}</div>
    </motion.div>
  );
}

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────
function MagBtn({ children, className, href }) {
  const wrapRef = useRef(null),
    btnRef = useRef(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.7 });
  const onMove = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2),
      dy = e.clientY - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy),
      z = 150;
    if (d < z) {
      const p = (1 - d / z) * 0.6;
      x.set(dx * p);
      y.set(dy * p);
    }
  };
  const addRipple = (e) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect(),
      sp = document.createElement("span");
    const sz = Math.max(r.width, r.height) * 2.5;
    sp.className = "ab-mag-ripple";
    sp.style.cssText = `width:${sz}px;height:${sz}px;top:${e.clientY - r.top - sz / 2}px;left:${e.clientX - r.left - sz / 2}px`;
    btnRef.current.appendChild(sp);
    setTimeout(() => sp.remove(), 700);
  };
  return (
    <motion.div
      ref={wrapRef}
      className="ab-mag-wrap"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <a ref={btnRef} href={href} className={className} onClick={addRipple}>
        {children}
      </a>
    </motion.div>
  );
}

// ─── 3D TILT CARD ─────────────────────────────────────────────────────────
function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), {
    stiffness: 200,
    damping: 25,
  });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), {
    stiffness: 200,
    damping: 25,
  });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── TYPING TEXT ──────────────────────────────────────────────────────────
function TypingText() {
  const [typed, setTyped] = useState("");
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = SUBTITLES[si];
    const t = setTimeout(
      () => {
        if (!del) {
          if (ci < word.length) {
            setTyped(word.slice(0, ci + 1));
            setCi((c) => c + 1);
          } else setTimeout(() => setDel(true), 2200);
        } else {
          if (ci > 0) {
            setTyped(word.slice(0, ci - 1));
            setCi((c) => c - 1);
          } else {
            setDel(false);
            setSi((s) => (s + 1) % SUBTITLES.length);
          }
        }
      },
      del ? 38 : 72,
    );
    return () => clearTimeout(t);
  }, [ci, del, si]);
  return (
    <>
      <span className="ab-sub-typed">{typed}</span>
      <span className="ab-cursor" />
    </>
  );
}

// ─── PAGE LOADER — REDESIGNED ─────────────────────────────────────────────
function PageLoader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let v = 0;
    const intervals = [
      { target: 25, speed: 15 },
      { target: 60, speed: 25 },
      { target: 85, speed: 40 },
      { target: 100, speed: 18 },
    ];
    let step = 0;
    const tick = () => {
      if (step >= intervals.length) {
        setDone(true);
        setTimeout(onDone, 700);
        return;
      }
      const { target, speed } = intervals[step];
      if (v < target) {
        v = Math.min(v + 1, target);
        setPct(v);
        setTimeout(tick, speed);
      } else {
        step++;
        setTimeout(tick, 90);
      }
    };
    tick();
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="ab-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Scan line */}
          <div className="ab-loader-scanline" />

          {/* Corner brackets */}
          <div className="ab-loader-corners">
            <div className="ab-loader-corner tl" />
            <div className="ab-loader-corner tr" />
            <div className="ab-loader-corner bl" />
            <div className="ab-loader-corner br" />
          </div>

          <div className="ab-loader-center">
            {/* Dev icon with spinning ring */}
            <motion.div
              className="ab-loader-icon-wrap"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ab-loader-icon-ring" />
              <div className="ab-loader-icon-inner">
                {/* Code bracket SVG icon — clearly "web developer" */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#devGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <linearGradient
                      id="devGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#a5b4fc" />
                      <stop offset="50%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#f9a8d4" />
                    </linearGradient>
                  </defs>
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line
                    x1="12"
                    y1="3"
                    x2="12"
                    y2="21"
                    stroke="url(#devGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                </svg>
              </div>
              <div className="ab-loader-icon-glow" />
            </motion.div>

            {/* Welcome text */}
            <motion.div
              className="ab-loader-welcome"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Welcome to My Portfolio
              <span>Hafiz Huzaifa — Full Stack Developer</span>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="ab-loader-socials"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                className="ab-loader-social-link"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                className="ab-loader-social-link"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                </svg>
                LinkedIn
              </a>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="ab-loader-bar-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="ab-loader-bar-wrap">
                <div className="ab-loader-bar" style={{ width: `${pct}%` }} />
              </div>
              <div className="ab-loader-pct">
                {pct < 100 ? "Loading" : "✦ Ready"} — {pct}%
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── ADVANCED CURSOR ──────────────────────────────────────────────────────
function useAdvancedCursor() {
  const curRef = useRef(null),
    curRRef = useRef(null),
    haloRef = useRef(null),
    labelRef = useRef(null);
  const trailsRef = useRef([]);
  const TRAIL_N = 8;
  const mx = useRef(0),
    my = useRef(0),
    rx = useRef(0),
    ry = useRef(0),
    hx = useRef(0),
    hy = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(hover:none)").matches) return;
    const dots = [];
    for (let i = 0; i < TRAIL_N; i++) {
      const d = document.createElement("div");
      d.className = "ab-trail-dot";
      const sz = Math.max(2, 7 - i * 0.75),
        op = Math.max(0.02, 0.28 - i * 0.028);
      const hue = 240 + i * 9,
        sat = 78 - i * 2;
      d.style.cssText = `width:${sz}px;height:${sz}px;opacity:${op};left:-300px;top:-300px;background:hsl(${hue},${sat}%,72%);`;
      document.body.appendChild(d);
      dots.push({ el: d, x: 0, y: 0 });
    }
    trailsRef.current = dots;
    return () => dots.forEach((d) => d.el.remove());
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover:none)").matches) return;
    const LABELS = [
      { sel: 'a[href="/projects"]', text: "Explore →" },
      { sel: 'a[href="/contact"]', text: "Let's Talk" },
      { sel: ".ab-stat-card", text: "Stats" },
      { sel: ".ab-pers-card", text: "Vibe Check" },
      { sel: ".ab-stack-pill", text: "Stack" },
      { sel: ".id-card", text: "✦ Drag Me" },
    ];
    const spawnBurst = (cx, cy) => {
      const pal = [
        "#6366f1",
        "#8b5cf6",
        "#ec4899",
        "#22d3ee",
        "#a78bfa",
        "#f9a8d4",
        "#67e8f9",
        "#c4b5fd",
      ];
      for (let i = 0; i < 14; i++) {
        const el = document.createElement("div");
        el.className = "ab-burst";
        const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const dist = 22 + Math.random() * 32,
          tx = Math.cos(angle) * dist,
          ty = Math.sin(angle) * dist;
        const sz = 2.5 + Math.random() * 4,
          dur = 0.35 + Math.random() * 0.25,
          col = pal[i % pal.length];
        el.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;background:${col};box-shadow:0 0 ${sz * 2.5}px ${col};--tx:${tx}px;--ty:${ty}px;--bd:${dur}s;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), (dur + 0.1) * 1000);
      }
    };
    let lastType = "";
    const onMove = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      const cur = curRef.current,
        curR = curRRef.current,
        halo = haloRef.current,
        lbl = labelRef.current;
      if (!cur) return;
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isBtn = !!el?.closest("a,button");
      const isText =
        !isBtn &&
        !!el?.closest("p,h1,h2,h3,span:not(.ab-bdot):not(.ab-cursor)");
      const isCard =
        !isBtn && !!el?.closest(".ab-pers-card,.ab-stat-card,.id-card");
      const isInter = isBtn || isCard;
      const t = isText ? "text" : isInter ? "hov" : "normal";
      if (t !== lastType) {
        cur.classList.toggle("hov", t === "hov");
        cur.classList.toggle("text-hov", t === "text");
        curR?.classList.toggle("hov", t === "hov");
        curR?.classList.toggle("text-hov", t === "text");
        halo?.classList.toggle("hov", t === "hov");
        lastType = t;
      }
      document
        .querySelector(".ab-spotlight")
        ?.style.setProperty("--mx", e.clientX + "px");
      document
        .querySelector(".ab-spotlight")
        ?.style.setProperty("--my", e.clientY + "px");
      if (lbl) {
        let found = "";
        for (const { sel, text } of LABELS) {
          if (el?.closest(sel)) {
            found = text;
            break;
          }
        }
        if (found && isInter) {
          lbl.textContent = found;
          lbl.style.left = e.clientX + "px";
          lbl.style.top = e.clientY - 46 + "px";
          lbl.classList.add("vis");
        } else lbl.classList.remove("vis");
      }
    };
    const onClick = (e) => {
      const cur = curRef.current,
        curR = curRRef.current,
        halo = haloRef.current;
      cur?.classList.add("clicking");
      curR?.classList.add("clicking");
      halo?.classList.add("clicking");
      spawnBurst(e.clientX, e.clientY);
      setTimeout(() => {
        cur?.classList.remove("clicking");
        curR?.classList.remove("clicking");
        halo?.classList.remove("clicking");
      }, 300);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    const trail = trailsRef.current;
    let af;
    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      if (curRRef.current) {
        curRRef.current.style.left = rx.current + "px";
        curRRef.current.style.top = ry.current + "px";
      }
      hx.current += (mx.current - hx.current) * 0.065;
      hy.current += (my.current - hy.current) * 0.065;
      if (haloRef.current) {
        haloRef.current.style.left = hx.current + "px";
        haloRef.current.style.top = hy.current + "px";
        haloRef.current.classList.add("vis");
      }
      trail.forEach((dot, i) => {
        const lag = 1 + i * 1.6;
        dot.x += (mx.current - dot.x) / lag;
        dot.y += (my.current - dot.y) / lag;
        dot.el.style.left = dot.x + "px";
        dot.el.style.top = dot.y + "px";
      });
      af = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(af);
    };
  }, []);

  return { curRef, curRRef, haloRef, labelRef };
}

// ─── PARALLAX HOOK (BLUR REMOVED) ────────────────────────────────────
function useParallax(revealRefs) {
  const heroTextRef = useRef(null);
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const floatRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;

      // Parallax background
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${sy * 0.45}px)`;
      }

      // Hero section fade - only opacity, no blur
      if (heroRef.current) {
        const startFade = 100;
        const endFade = 400;

        if (sy < startFade) {
          heroRef.current.style.opacity = "1";
          heroRef.current.style.transform = "translateY(0px)";
        } else if (sy > endFade) {
          heroRef.current.style.opacity = "0";
          heroRef.current.style.transform = "translateY(-40px)";
        } else {
          const progress = (sy - startFade) / (endFade - startFade);
          const translateY = -progress * 40;
          heroRef.current.style.opacity = String(1 - progress);
          heroRef.current.style.transform = `translateY(${translateY}px)`;
        }
      }

      // Subtle text parallax
      if (heroTextRef.current) {
        heroTextRef.current.style.transform = `translateY(${sy * 0.14}px)`;
      }

      // Floating symbols parallax
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = FLOAT_SYMBOLS[i]?.depth ?? 0.3;
        el.style.transform = `translateY(${sy * depth * 0.5}px)`;
      });

      // Section reveal elements - only opacity and translate, no blur
      if (revealRefs && revealRefs.current) {
        revealRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top;
          const elementBottom = rect.bottom;

          const transitionZone = vh * 0.3;

          if (elementTop < transitionZone && elementTop > -rect.height) {
            const progress = (transitionZone - elementTop) / transitionZone;

            if (progress > 0 && progress < 1) {
              const opacity = 1 - progress * 0.2;
              const translateY = -progress * 10;

              el.style.opacity = String(Math.max(0.8, opacity));
              el.style.transform = `translateY(${translateY}px)`;
              el.style.transition = "none";
            } else {
              el.style.opacity = "";
              el.style.transform = "";
              el.style.transition = "";
            }
          } else if (elementBottom < 0 || elementTop > vh) {
            el.style.opacity = "0.6";
          } else {
            el.style.opacity = "";
            el.style.transform = "";
            el.style.transition = "";
          }
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealRefs]);

  const setFloatRef = (i) => (el) => {
    floatRefs.current[i] = el;
  };
  return { heroTextRef, heroBgRef, heroRef, setFloatRef };
}

// ─── HANGING ID CARD ──────────────────────────────────────────────────────
function HangingIDCard() {
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  // Drag motion values
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 130, damping: 16, mass: 0.9 });

  // Rotation from drag (pivot at top)
  const rotateZ = useTransform(springX, [-150, 150], [35, -35]);

  // Initial drop animation
  const dropY = useMotionValue(-650);
  const dropSpringY = useSpring(dropY, {
    stiffness: 80,
    damping: 12,
    mass: 1.4,
  });

  // Idle swing
  const swingRot = useMotionValue(0);
  const swingSpring = useSpring(swingRot, {
    stiffness: 35,
    damping: 7,
    mass: 1.8,
  });

  // Combined rotation
  const totalRotation = useTransform([rotateZ, swingSpring], ([r, s]) => r + s);

  useEffect(() => {
    // 3 second delay before showing the card
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Drop in animation after visibility
      animate(dropY, 0, {
        type: "spring",
        stiffness: 60,
        damping: 10,
        mass: 1.2,
        duration: 1.2,
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX - dragX.get();
    animate(swingRot, 0, { duration: 0.15 });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    dragX.set(e.clientX - dragStartX.current);
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    animate(dragX, 0, { type: "spring", stiffness: 110, damping: 15, mass: 1 });
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
  const handleTouchStart = (e) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX - dragX.get();
    animate(swingRot, 0, { duration: 0.15 });
  };
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    dragX.set(e.touches[0].clientX - dragStartX.current);
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
    animate(dragX, 0, { type: "spring", stiffness: 110, damping: 15, mass: 1 });
  };

  return (
    /* Fixed anchor — top of viewport, centered */
    <div className="id-fixed-anchor">
      {/* Nail is absolutely fixed, never moves */}
      <div className="id-nail" />

      {/* Drop wrapper — drops in after 3 seconds */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
          >
            {/* Draggable rig — rotates around top pivot */}
            <motion.div
              className="id-rig"
              style={{
                rotate: totalRotation,
                transformOrigin: "top center",
                y: dropSpringY,
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Ribbon */}
              <div className="id-ribbon" />

              {/* Metal clip */}
              <div className="id-clip" />

              {/* THE CARD */}
              <div className="id-card">
                <div className="id-card-strip" />
                <div className="id-c tl" />
                <div className="id-c tr" />
                <div className="id-c bl" />
                <div className="id-c br" />
                <div className="id-scan-wrap" />

                <div className="id-inner">
                  {/* Year badge */}
                  <div className="id-year">Portfolio 2026</div>

                  {/* Profile photo with larger rings and image */}
                  <div className="id-photo-wrap">
                    {/* Outer ring - made larger */}
                    <div
                      className="id-photo-ring-outer"
                      style={{ inset: "-8px" }}
                    />
                    {/* Inner ring - adjusted */}
                    <div
                      className="id-photo-ring-inner"
                      style={{ inset: "2px" }}
                    />
                    {/* Photo container - larger image area */}
                    <div className="id-photo" style={{ inset: "2px" }}>
                      <img
                        src="/assets/image.png"
                        alt="Hafiz Huzaifa"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center top",
                          borderRadius: "50%",
                          transform:
                            "scale(1.1)" /* Makes image slightly larger */,
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.querySelector(
                            ".id-photo-fallback",
                          ).style.display = "flex";
                        }}
                      />
                      <div
                        className="id-photo-fallback"
                        style={{ display: "none", fontSize: "64px" }}
                      >
                        👨‍💻
                      </div>
                    </div>
                    <div className="id-online" />
                    <div className="id-photo-glow" />
                  </div>

                  {/* Name */}
                  <div className="id-name">Hafiz Huzaifa</div>

                  {/* Role */}
                  <div className="id-role">Full Stack Developer</div>

                  {/* Divider */}
                  <div className="id-divider" />

                  {/* Social icons */}
                  <div className="id-socials">
                    {/* GitHub */}
                    <a
                      className="id-social"
                      href="https://github.com/huzaifaabbasi630"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      className="id-social"
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                      </svg>
                    </a>
                    {/* X / Twitter */}
                    <a
                      className="id-social"
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="X / Twitter"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Drag hint */}
              <div className="id-drag-hint">✦ drag me ✦</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────
export default function About() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mxR = useRef(0),
    myR = useRef(0);
  const revealRefs = useRef([]);
  const [statsActive, setStatsActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const statsRef = useRef(null);
  const sectionRef = useRef(null);

  const { curRef, curRRef, haloRef, labelRef } = useAdvancedCursor();
  const { heroTextRef, heroBgRef, heroRef, setFloatRef } =
    useParallax(revealRefs);

  // ── inject styles ──
  useEffect(() => {
    const id = "ab-v8";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
  }, []);

  // ── canvas particles ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W,
      H,
      nodes = [],
      t = 0;
    const ORBS = [
      { x: 0.12, y: 0.25, c: "99,102,241", r: 450 },
      { x: 0.85, y: 0.6, c: "139,92,246", r: 360 },
      { x: 0.5, y: 0.08, c: "236,72,153", r: 260 },
    ];
    class N {
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.6 + 0.3;
        const P = [
          [99, 102, 241],
          [139, 92, 246],
          [236, 72, 153],
          [34, 211, 238],
        ];
        this.c = P[~~(Math.random() * 4)];
        this.op = Math.random() * 0.38 + 0.12;
      }
      update() {
        const dx = mxR.current - this.x,
          dy = myR.current - this.y,
          d = Math.hypot(dx, dy);
        if (d < 200) {
          this.vx += (dx / d) * 0.015;
          this.vy += (dy / d) * 0.015;
        }
        const sp = Math.hypot(this.vx, this.vy);
        if (sp > 0.9) {
          this.vx = (this.vx / sp) * 0.9;
          this.vy = (this.vy / sp) * 0.9;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.c},${this.op})`;
        ctx.fill();
      }
    }
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      nodes = Array.from({ length: 90 }, () => new N());
    };
    resize();
    window.addEventListener("resize", resize);
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.007;
      ORBS.forEach((o, i) => {
        const ox = (o.x + Math.sin(t + i * 1.5) * 0.08) * W,
          oy = (o.y + Math.cos(t * 1.3 + i) * 0.07) * H;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        g.addColorStop(0, `rgba(${o.c},.12)`);
        g.addColorStop(1, `rgba(${o.c},0)`);
        ctx.beginPath();
        ctx.arc(ox, oy, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (j <= i) return;
          const dx = n.x - m.x,
            dy = n.y - m.y,
            d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.09 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
        n.update();
        n.draw();
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── track mouse for canvas ──
  useEffect(() => {
    const f = (e) => {
      mxR.current = e.clientX;
      myR.current = e.clientY;
    };
    window.addEventListener("mousemove", f, { passive: true });
    return () => window.removeEventListener("mousemove", f);
  }, []);

  // ── scroll reveal ──
  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.08 },
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    if (statsRef.current) {
      const s = new IntersectionObserver(
        (es) => {
          if (es[0].isIntersecting) setStatsActive(true);
        },
        { threshold: 0.2 },
      );
      s.observe(statsRef.current);
    }
    return () => obs.disconnect();
  }, [loaded]);

  const rr = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const fu = (d = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
  });

  const onLoaderDone = useCallback(() => setLoaded(true), []);

  // ── hero height spacer ──
  useEffect(() => {
    const setH = () => {
      const el = sectionRef.current;
      if (el) setHeroHeight(Math.round(el.getBoundingClientRect().height));
    };
    setH();
    window.addEventListener("resize", setH);
    return () => window.removeEventListener("resize", setH);
  }, [loaded]);

  return (
    <>
      <Header />
      <PageLoader onDone={onLoaderDone} />

      <PageTransition>
        <div className="ab ab-bgrid">
          {/* CURSOR */}
          <div ref={curRef} className="ab-cur" />
          <div ref={curRRef} className="ab-curR" />
          <div ref={haloRef} className="ab-cur-halo" />
          <div ref={labelRef} className="ab-cur-label" />

          <div className="ab-spotlight" />
          <div className="ab-noise" />
          <canvas ref={canvasRef} className="ab-canvas" />

          {/* FLOATING SYMBOLS */}
          {FLOAT_SYMBOLS.map((f, i) => (
            <div
              key={i}
              ref={setFloatRef(i)}
              className="ab-float"
              style={{
                left: f.x,
                top: f.y,
                fontSize: f.sz,
                opacity: f.op,
                animation: `ab-float-sym ${f.dur}s ease-in-out ${i * 1.4}s infinite`,
              }}
            >
              {f.s}
            </div>
          ))}

          {/* ══ HERO — fixed section ══ */}
          <section ref={sectionRef} style={{ position: "relative", zIndex: 3 }}>
            {/* BG orbs */}
            <div
              ref={heroBgRef}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              {[
                { top: "5%", left: "0%", w: 520, c: "99,102,241", op: 0.09 },
                {
                  bottom: "0%",
                  right: "0%",
                  w: 440,
                  c: "139,92,246",
                  op: 0.09,
                },
                { top: "40%", right: "15%", w: 300, c: "236,72,153", op: 0.06 },
              ].map((o, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    borderRadius: "50%",
                    filter: "blur(70px)",
                    width: o.w,
                    height: o.w,
                    background: `radial-gradient(circle,rgba(${o.c},${o.op}) 0%,transparent 70%)`,
                    top: o.top,
                    left: o.left,
                    bottom: o.bottom,
                    right: o.right,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </div>

            {/* heroRef on the GRID — both columns fade together on scroll */}
            <div ref={heroRef} className="ab-hero">
              {/* LEFT */}
              <div ref={heroTextRef} className="ab-hero-left">
                <motion.div className="ab-badge" {...fu(0)}>
                  <span className="ab-bdot" />
                  Available for work
                </motion.div>
                <motion.p className="ab-hi" {...fu(0.1)}>
                  Hi there, I'm 👋
                </motion.p>
                <motion.div {...fu(0.18)}>
                  <h1 className="ab-name">
                    Hafiz
                    <br />
                    <span className="ab-name-grad">Huzaifa</span>
                  </h1>
                </motion.div>
                <motion.div className="ab-subtitle-wrap" {...fu(0.3)}>
                  <span className="ab-sub-pre">I am a</span>
                  <TypingText />
                </motion.div>
                <motion.p className="ab-bio" {...fu(0.42)}>
                  I build fast, beautiful, and scalable web apps from pixel to
                  production. Passionate about clean code, great UX, and
                  shipping things that actually matter.
                </motion.p>
                <motion.div className="ab-cta" {...fu(0.54)}>
                  <MagBtn href="/projects" className="ab-btn-p">
                    <span>View My Work</span>
                    <span className="ab-btn-arrow">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </MagBtn>
                  <MagBtn href="/contact" className="ab-btn-s">
                    <span>Hire Me</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1.22h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 21 16.92z" />
                    </svg>
                  </MagBtn>
                </motion.div>
                <motion.div className="ab-stack" {...fu(0.64)}>
                  {[
                    "React",
                    "Node.js",
                    "MongoDB",
                    "TypeScript",
                    "Express",
                    "PostgreSQL",
                  ].map((t, i) => (
                    <motion.span
                      key={t}
                      className="ab-stack-pill"
                      initial={{ opacity: 0, y: 14, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.72 + i * 0.07,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT — empty placeholder to keep the 2-col grid */}
              <motion.div
                className="ab-hero-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <HangingIDCard />
              </motion.div>
            </div>
          </section>

          {/* ══ STATS ══ */}
          <div className="ab-section">
            <div ref={statsRef}>
              <div className="ab-reveal" ref={rr}>
                <p className="ab-sec-lbl">At a Glance</p>
                <h2 className="ab-sec-h">
                  Numbers That <em>Matter</em>
                </h2>
              </div>
              <div className="ab-stats-grid">
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className="ab-reveal"
                    ref={rr}
                    style={{ transitionDelay: `${i * 0.12}s` }}
                  >
                    <StatCard {...s} active={statsActive} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </PageTransition>
    </>
  );
}
