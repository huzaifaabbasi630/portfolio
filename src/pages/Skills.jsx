import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '◈',
    accent: '99,102,241',
    glow: '#6366f1',
    skills: [
      { name: 'React',         icon: '⚛',  level: 92, desc: 'Hooks, context, custom hooks, performance optimization' },
      { name: 'JavaScript',    icon: '⬡',  level: 90, desc: 'ES6+, async/await, closures, DOM manipulation' },
      { name: 'TypeScript',    icon: 'TS', level: 85, desc: 'Type safety, interfaces, generic types, robust coding' },
      { name: 'HTML / CSS',    icon: '◫',  level: 95, desc: 'Semantic HTML, Flexbox, Grid, animations' },
      { name: 'Tailwind CSS',  icon: '◉',  level: 88, desc: 'Utility-first, responsive design, custom config' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⬡',
    accent: '34,211,238',
    glow: '#22d3ee',
    skills: [
      { name: 'Node.js',    icon: '🟢', level: 85, desc: 'Event loop, streams, file system, HTTP server' },
      { name: 'Express',    icon: '⚡', level: 83, desc: 'REST APIs, middleware, routing, error handling' },
      { name: 'MongoDB',    icon: '🍃', level: 80, desc: 'CRUD, aggregation, indexing, Mongoose ODM' },
      { name: 'REST APIs',  icon: '◈',  level: 87, desc: 'Design patterns, authentication, versioning' },
      { name: 'JWT / Auth', icon: '🔐', level: 78, desc: 'Token-based auth, refresh tokens, role-based access' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile Developer',
    icon: '📱',
    accent: '139,92,246',
    glow: '#8b5cf6',
    skills: [
      { name: 'React Native (CLI / Expo)', icon: '⚛',  level: 88, desc: 'Cross-platform mobile apps for iOS and Android' },
      { name: 'JavaScript (ES6+)',         icon: '⬡',  level: 90, desc: 'Modern JavaScript features and best practices' },
      { name: 'TypeScript',                icon: 'TS', level: 85, desc: 'Type-safe development for enterprise apps' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Other',
    icon: '⌘',
    accent: '236,72,153',
    glow: '#ec4899',
    skills: [
      { name: 'Git / GitHub', icon: '⎇',  level: 88, desc: 'Branching, PRs, rebasing, collaboration workflows' },
      { name: 'Vite',         icon: '⚡', level: 90, desc: 'Fast builds, HMR, plugin ecosystem, optimization' },
      { name: 'Vercel',       icon: '▲',  level: 82, desc: 'Deployment, CI/CD, edge functions, analytics' },
      { name: 'Socket.io',    icon: '⟳',  level: 70, desc: 'Real-time bidirectional communication, rooms' },
      { name: 'Postman',      icon: '◉',  level: 85, desc: 'API testing, collections, environment variables' },
      { name: 'Bootstrap',    icon: '🅱',  level: 90, desc: 'Responsive grid, prebuilt components, utilities' },
    ],
  },
];

const TECH_ICONS = [
  { icon: '⚛',  label: 'React',      c: '99,102,241'  },
  { icon: '🟢', label: 'Node.js',    c: '52,211,153'  },
  { icon: '🍃', label: 'MongoDB',    c: '34,211,238'  },
  { icon: '⬡',  label: 'JS',         c: '251,191,36'  },
  { icon: '◉',  label: 'Tailwind',   c: '139,92,246'  },
  { icon: '▲',  label: 'Vercel',     c: '241,241,255' },
  { icon: '⌘',  label: 'Git',        c: '236,72,153'  },
];

const FLOAT_SYMBOLS = [
  { s: '</>',  x: '3%',  y: '10%', sz: 13, op: .06, dur: 14, depth: 0.3 },
  { s: '{ }',  x: '92%', y: '7%',  sz: 15, op: .05, dur: 17, depth: 0.5 },
  { s: '=>',   x: '90%', y: '44%', sz: 13, op: .04, dur: 19, depth: 0.2 },
  { s: '===',  x: '4%',  y: '58%', sz: 11, op: .04, dur: 20, depth: 0.4 },
  { s: '[ ]',  x: '80%', y: '78%', sz: 11, op: .04, dur: 15, depth: 0.35 },
  { s: '//',   x: '14%', y: '82%', sz: 12, op: .04, dur: 13, depth: 0.25 },
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

:root {
  --indigo: #6366f1; --violet: #8b5cf6; --pink: #ec4899;
  --cyan: #22d3ee; --green: #4ade80; --bg: #04050e;
}
.sk, .sk * { box-sizing: border-box; }
.sk {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg); min-height: 100vh;
  overflow-x: hidden; color: #f1f1ff;
}

/* ── BG ── */
.sk-noise {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .022;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}
.sk-canvas { position: fixed; inset: 0; z-index: 0; opacity: .45; pointer-events: none; }
.sk-spotlight {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(650px circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,.07), transparent 70%);
}
.sk-bgrid {
  background-image:
    linear-gradient(rgba(99,102,241,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,.018) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ══════════════════════════════════════
   PAGE LOADER
══════════════════════════════════════ */
.sk-loader {
  position: fixed; inset: 0; z-index: 99999;
  background: var(--bg);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 32px;
}
.sk-loader-logo {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(36px, 7vw, 68px); letter-spacing: -2px;
  background: linear-gradient(130deg, var(--indigo) 0%, #a78bfa 50%, var(--pink) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  background-size: 200% 200%; animation: sk-grad 2s ease infinite;
}
.sk-loader-bar-wrap {
  width: min(300px, 78vw); height: 2px;
  background: rgba(255,255,255,.06); border-radius: 2px; overflow: hidden;
}
.sk-loader-bar {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--indigo), var(--violet), var(--pink));
  transition: width .08s linear;
  box-shadow: 0 0 12px rgba(99,102,241,.8);
}
.sk-loader-pct {
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 11px;
  letter-spacing: .22em; color: rgba(241,241,255,.3); text-transform: uppercase;
}
.sk-loader-scan {
  position: absolute; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(99,102,241,.3), transparent);
  animation: sk-scan-line 1.2s ease-in-out infinite;
}
@keyframes sk-scan-line {
  0%   { top: 0%;   opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* ══════════════════════════════════════
   CURSOR SYSTEM v4
══════════════════════════════════════ */
@media (hover: hover) {
  .sk { cursor: none; }

  .sk-cur {
    position: fixed; pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    width: 8px; height: 8px; border-radius: 50%;
    background: #fff; mix-blend-mode: difference;
    will-change: left, top;
    transition: width .18s cubic-bezier(.22,1,.36,1), height .18s cubic-bezier(.22,1,.36,1),
                border-radius .18s, background .18s, box-shadow .18s, mix-blend-mode 0s;
  }
  .sk-cur.hov {
    width: 10px; height: 10px; mix-blend-mode: normal;
    background: var(--pink);
    box-shadow: 0 0 0 3px rgba(236,72,153,.2), 0 0 18px rgba(236,72,153,.7), 0 0 36px rgba(236,72,153,.3);
  }
  .sk-cur.clicking {
    width: 5px; height: 5px; mix-blend-mode: normal;
    background: var(--cyan);
    box-shadow: 0 0 20px var(--cyan), 0 0 40px rgba(34,211,238,.5);
  }
  .sk-cur.text-hov {
    width: 2px; height: 20px; border-radius: 1px; mix-blend-mode: normal;
    background: #a5b4fc; box-shadow: 0 0 10px rgba(165,180,252,.8);
  }

  .sk-curR {
    position: fixed; pointer-events: none; z-index: 9997;
    transform: translate(-50%,-50%);
    width: 36px; height: 36px; border-radius: 50%;
    border: 1.5px solid rgba(99,102,241,.5);
    will-change: left, top;
    transition: width .38s cubic-bezier(.22,1,.36,1), height .38s cubic-bezier(.22,1,.36,1),
                border-color .25s, border-radius .25s, background .25s;
  }
  .sk-curR.hov      { width: 50px; height: 50px; border-color: rgba(236,72,153,.65); background: rgba(236,72,153,.04); }
  .sk-curR.clicking { width: 22px; height: 22px; border-color: var(--cyan); background: rgba(34,211,238,.07); }
  .sk-curR.text-hov { width: 2px; height: 28px; border-radius: 2px; border-color: transparent; background: rgba(165,180,252,.18); }

  .sk-cur-halo {
    position: fixed; pointer-events: none; z-index: 9996;
    transform: translate(-50%,-50%);
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,.1) 0%, transparent 70%);
    opacity: 0; filter: blur(6px); will-change: left, top;
    transition: opacity .4s, width .5s cubic-bezier(.22,1,.36,1), height .5s cubic-bezier(.22,1,.36,1), background .3s;
  }
  .sk-cur-halo.vis      { opacity: 1; }
  .sk-cur-halo.hov      { opacity: 1; width: 110px; height: 110px; background: radial-gradient(circle, rgba(236,72,153,.13) 0%, transparent 70%); }
  .sk-cur-halo.clicking { opacity: 1; width: 55px;  height: 55px;  background: radial-gradient(circle, rgba(34,211,238,.22) 0%, transparent 70%); }

  .sk-cur-label {
    position: fixed; pointer-events: none; z-index: 10000;
    transform: translate(-50%, -50%);
    padding: 4px 12px; border-radius: 100px;
    background: rgba(13,14,31,.9); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,.1);
    font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase; color: #f1f1ff;
    white-space: nowrap; opacity: 0; transition: opacity .2s;
  }
  .sk-cur-label.vis { opacity: 1; }
}

/* trail + burst */
.sk-trail-dot {
  position: fixed; pointer-events: none; z-index: 9995;
  border-radius: 50%; transform: translate(-50%,-50%);
  mix-blend-mode: screen; will-change: left, top;
}
.sk-burst {
  position: fixed; pointer-events: none; z-index: 9994; border-radius: 50%;
  animation: sk-burst-out var(--bd,.5s) ease-out forwards;
}
@keyframes sk-burst-out {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
  60%  { opacity: .8; }
  100% { transform: translate(calc(-50% + var(--tx,0px)), calc(-50% + var(--ty,0px))) scale(1); opacity: 0; }
}

/* ── FLOAT SYMBOLS ── */
.sk-float {
  position: fixed; pointer-events: none;
  font-family: 'Syne', monospace; font-weight: 700;
  color: var(--indigo); user-select: none; z-index: 2;
  will-change: transform;
}
@keyframes sk-float-sym {
  0%,100% { transform: translateY(0) rotate(0deg); }
  33%     { transform: translateY(-18px) rotate(3deg); }
  66%     { transform: translateY(9px) rotate(-2deg); }
}

/* ════ HERO ════ */
.sk-hero {
  position: relative; z-index: 3;
  padding: 130px 40px 50px; text-align: center;
  max-width: 900px; margin: 0 auto;
}
.sk-badge {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 8px 20px; border-radius: 100px;
  border: 1px solid rgba(99,102,241,.25); background: rgba(99,102,241,.07);
  font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase;
  color: #a5b4fc; margin-bottom: 28px;
  position: relative; overflow: hidden;
  animation: sk-badge-glow 3s ease-in-out infinite;
}
@keyframes sk-badge-glow {
  0%,100% { box-shadow: 0 0 20px rgba(99,102,241,.08); }
  50%     { box-shadow: 0 0 32px rgba(99,102,241,.2); }
}
.sk-badge::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(99,102,241,.1) 50%, transparent 60%);
  transform: translateX(-100%); animation: sk-badge-shimmer 3s ease-in-out 1s infinite;
}
@keyframes sk-badge-shimmer { 0%,100% { transform: translateX(-100%); } 50% { transform: translateX(300%); } }
@keyframes sk-bdot { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)} 50%{box-shadow:0 0 0 8px rgba(99,102,241,0)} }
.sk-bdot { width:7px; height:7px; border-radius:50%; background:var(--indigo); animation:sk-bdot 2s infinite; flex-shrink:0; }

.sk-title {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(38px, 7vw, 72px); line-height: .9; letter-spacing: -2px; margin-bottom: 18px;
}
.sk-t1 { display: block; color: #f1f1ff; }
.sk-t2 {
  display: block;
  background: linear-gradient(130deg, var(--indigo) 0%, var(--violet) 45%, var(--pink) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 36px rgba(99,102,241,.4));
  background-size: 200% 200%; animation: sk-grad 4s ease infinite;
}
@keyframes sk-grad { 0%,100%{background-position:0%50%} 50%{background-position:100%50%} }

.sk-sub {
  font-size: clamp(14px,1.8vw,16px); line-height:1.75;
  color: rgba(241,241,255,.35); font-style:italic; max-width:480px; margin:0 auto 44px;
}

/* ── TECH ICON STRIP ── */
.sk-icon-strip {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;
  padding: 0 40px 56px; position: relative; z-index: 3;
}
.sk-icon-chip {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 16px 20px; border-radius: 18px; min-width: 72px;
  background: rgba(255,255,255,.025); border: 1px solid rgba(255,255,255,.07);
  backdrop-filter: blur(12px); cursor: default;
  transition: all .32s cubic-bezier(.22,1,.36,1);
  position: relative; overflow: hidden;
}
/* shimmer on chip */
.sk-icon-chip::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.05) 50%, transparent 60%);
  transform: translateX(-100%); transition: transform 0s;
}
.sk-icon-chip:hover {
  transform: translateY(-9px) scale(1.07);
  border-color: rgba(var(--ic),.42); background: rgba(var(--ic),.08);
  box-shadow: 0 18px 48px rgba(var(--ic),.2);
}
.sk-icon-chip:hover::after { transform: translateX(300%); transition: transform .5s cubic-bezier(.22,1,.36,1); }
.sk-icon-chip:hover .sk-chip-icon {
  animation: sk-bounce .52s cubic-bezier(.22,1,.36,1);
  filter: drop-shadow(0 0 14px rgba(var(--ic),.55));
}
@keyframes sk-bounce { 0%,100%{transform:translateY(0) scale(1)} 40%{transform:translateY(-10px) scale(1.18)} 70%{transform:translateY(-3px) scale(1.06)} }
.sk-chip-icon { font-size: 26px; transition: filter .3s; }
.sk-chip-lbl { font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: rgba(241,241,255,.35); transition: color .25s; }
.sk-icon-chip:hover .sk-chip-lbl { color: rgba(var(--ic),.8); }

/* ── CATEGORY TABS ── */
.sk-tabs {
  display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;
  padding: 0 40px 44px; position: relative; z-index: 3;
}
.sk-tab {
  padding: 10px 26px; border-radius: 100px; font-size: 13px; font-weight: 700;
  letter-spacing: .06em; border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.03); color: rgba(241,241,255,.4);
  cursor: pointer; transition: all .28s cubic-bezier(.22,1,.36,1);
  font-family: 'Plus Jakarta Sans', sans-serif;
  display: flex; align-items: center; gap: 8px;
  position: relative; overflow: hidden;
}
.sk-tab::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.06) 50%, transparent 60%);
  transform: translateX(-100%); transition: transform 0s;
}
.sk-tab:hover { border-color: rgba(99,102,241,.4); color: #a5b4fc; background: rgba(99,102,241,.09); }
.sk-tab:hover::after { transform: translateX(300%); transition: transform .5s cubic-bezier(.22,1,.36,1); }
.sk-tab.active {
  background: linear-gradient(135deg, var(--indigo), var(--violet));
  border-color: transparent; color: #fff;
  box-shadow: 0 8px 28px rgba(99,102,241,.35);
}
.sk-tab.active.cyan { background: linear-gradient(135deg,#0891b2,#06b6d4); box-shadow:0 8px 28px rgba(34,211,238,.3); }
.sk-tab.active.pink { background: linear-gradient(135deg,#be185d,#ec4899); box-shadow:0 8px 28px rgba(236,72,153,.3); }

/* ════ SKILLS SECTION ════ */
.sk-section {
  position: relative; z-index: 3;
  max-width: 1100px; margin: 0 auto; padding: 0 40px 100px;
}

/* ── category header ── */
.sk-cat-header {
  display: flex; align-items: center; gap: 16px; margin-bottom: 36px;
}
.sk-cat-icon {
  width: 52px; height: 52px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-family: 'Syne', monospace;
  border: 1px solid rgba(var(--ca),.3); background: rgba(var(--ca),.1);
  color: rgb(var(--ca)); box-shadow: 0 0 24px rgba(var(--ca),.15);
  transition: all .3s cubic-bezier(.22,1,.36,1);
}
.sk-cat-icon:hover { transform: scale(1.12) rotate(-6deg); box-shadow: 0 0 36px rgba(var(--ca),.3); }
.sk-cat-title { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(22px,3vw,30px); letter-spacing:-1px; color:#f1f1ff; }
.sk-cat-subtitle { font-size:13px; color:rgba(241,241,255,.28); margin-top:2px; font-weight:500; }
.sk-cat-count {
  margin-left: auto; padding:5px 14px; border-radius:100px;
  font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
  background:rgba(var(--ca),.1); border:1px solid rgba(var(--ca),.25); color:rgb(var(--ca));
}

/* ── skills grid ── */
.sk-grid-skills { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }

/* ── skill card ── */
.sk-skill-card {
  padding: 22px 24px; border-radius: 18px;
  background: rgba(255,255,255,.025); border: 1px solid rgba(255,255,255,.07);
  backdrop-filter: blur(16px); position: relative; overflow: hidden;
  transition: all .35s cubic-bezier(.22,1,.36,1); cursor: default;
  transform-style: preserve-3d;
}
/* top accent line */
.sk-skill-card::before {
  content: ''; position: absolute; top:0; left:0; right:0; height:1px;
  background: linear-gradient(90deg, transparent, rgba(var(--ca),.55), transparent);
  opacity: 0; transition: opacity .35s;
}
/* shimmer sweep */
.sk-skill-card::after {
  content: ''; position: absolute; inset:0; pointer-events: none;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.025) 50%, transparent 60%);
  transform: translateX(-100%); transition: transform 0s;
}
.sk-skill-card:hover {
  border-color: rgba(var(--ca),.3);
  transform: translateY(-8px) rotateX(3deg) rotateY(-1deg);
  box-shadow: 0 24px 60px rgba(var(--ca),.14), 0 0 0 1px rgba(var(--ca),.1) inset;
}
.sk-skill-card:hover::before { opacity: 1; }
.sk-skill-card:hover::after { transform: translateX(300%); transition: transform .65s cubic-bezier(.22,1,.36,1); }

/* skill top row */
.sk-skill-top { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
.sk-skill-icon {
  width:40px; height:40px; border-radius:12px; flex-shrink:0;
  display:flex; align-items:center; justify-content:center; font-size:18px;
  background:rgba(var(--ca),.1); border:1px solid rgba(var(--ca),.2);
  transition: all .3s cubic-bezier(.22,1,.36,1);
}
.sk-skill-card:hover .sk-skill-icon {
  background: rgba(var(--ca),.2); transform: scale(1.12) rotate(-6deg);
  box-shadow: 0 0 16px rgba(var(--ca),.3);
}
.sk-skill-name { font-family:'Syne',sans-serif; font-weight:800; font-size:16px; color:#f1f1ff; transition: color .2s; }
.sk-skill-card:hover .sk-skill-name { color:#fff; }
.sk-skill-desc { font-size:12px; color:rgba(241,241,255,.28); line-height:1.5; margin-top:2px; }
.sk-skill-pct {
  margin-left:auto; font-family:'Syne',sans-serif; font-weight:800; font-size:20px;
  color:rgb(var(--ca)); filter:drop-shadow(0 0 8px rgba(var(--ca),.45));
  transition: filter .3s, transform .3s;
}
.sk-skill-card:hover .sk-skill-pct { filter:drop-shadow(0 0 16px rgba(var(--ca),.7)); transform: scale(1.08); }

/* bar */
.sk-bar-track {
  height: 7px; border-radius: 100px;
  background: rgba(255,255,255,.06); overflow: visible; position: relative;
}
.sk-bar-fill {
  height: 100%; border-radius: 100px; position: relative;
  transform-origin: left; transform: scaleX(0);
  transition: transform 1.4s cubic-bezier(.22,1,.36,1);
}
.sk-skill-card.vis .sk-bar-fill { transform: scaleX(1); }
.sk-bar-fill::after {
  content: ''; position: absolute; top:0; right:0; bottom:0; width:30px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.45));
  border-radius: 100px;
}
.sk-bar-dot {
  position: absolute; top:50%; right:0; transform: translate(50%,-50%);
  width:12px; height:12px; border-radius:50%;
  opacity:0; transition: opacity .3s .8s;
}
.sk-skill-card.vis .sk-bar-dot { opacity:1; animation: sk-dot-pulse 2s ease infinite; }
@keyframes sk-dot-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(var(--ca),.5)} 50%{box-shadow:0 0 0 6px rgba(var(--ca),0)} }
.sk-bar-labels { display:flex; justify-content:space-between; margin-top:8px; }
.sk-bar-lbl { font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:rgba(241,241,255,.18); font-weight:600; }
.sk-bar-lvl { font-size:10px; font-weight:700; color:rgba(var(--ca),.7); letter-spacing:.08em; }

/* ── SUMMARY ── */
.sk-summary {
  margin-top: 64px; padding: 36px; border-radius: 24px;
  background: rgba(255,255,255,.025); border: 1px solid rgba(255,255,255,.07);
  backdrop-filter: blur(16px); position: relative; overflow: hidden;
  transition: border-color .3s, box-shadow .3s;
}
.sk-summary::before {
  content: ''; position: absolute; top:-60px; right:-60px; width:240px; height:240px;
  border-radius:50%; background:radial-gradient(circle,rgba(99,102,241,.12),transparent 70%);
  pointer-events: none;
}
.sk-summary::after {
  content: ''; position: absolute; inset:0; pointer-events: none;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.02) 50%, transparent 60%);
  transform: translateX(-100%); transition: transform 0s;
}
.sk-summary:hover { border-color: rgba(99,102,241,.2); box-shadow: 0 16px 56px rgba(99,102,241,.08); }
.sk-summary:hover::after { transform: translateX(300%); transition: transform .8s cubic-bezier(.22,1,.36,1); }
.sk-summary-title { font-family:'Syne',sans-serif; font-weight:800; font-size:20px; color:#f1f1ff; margin-bottom:6px; }
.sk-summary-sub { font-size:13px; color:rgba(241,241,255,.28); margin-bottom:32px; }
.sk-summary-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.sk-sum-item { text-align:center; }
.sk-sum-ring {
  width:80px; height:80px; border-radius:50%; margin:0 auto 10px;
  display:flex; align-items:center; justify-content:center;
  font-family:'Syne',sans-serif; font-weight:800; font-size:18px; position:relative;
}
.sk-sum-lbl { font-size:12px; font-weight:600; color:rgba(241,241,255,.4); letter-spacing:.05em; }

/* ── SCROLL REVEAL ── */
.sk-reveal {
  opacity:0; transform:translateY(28px); filter:blur(5px);
  transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1), filter .8s;
}
.sk-reveal.vis { opacity:1; transform:translateY(0); filter:blur(0); }

/* ── RESPONSIVE ── */
@media (max-width:768px) {
  .sk-grid-skills { grid-template-columns:1fr; }
  .sk-summary-grid { grid-template-columns:repeat(2,1fr); }
  .sk-hero, .sk-section { padding-left:20px; padding-right:20px; }
  .sk-icon-strip, .sk-tabs { padding-left:20px; padding-right:20px; }
  .sk-float { display:none; }
}
@media (max-width:480px) {
  .sk-summary-grid { grid-template-columns:repeat(2,1fr); }
}
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getLevelLabel(pct) {
  if (pct >= 90) return 'Expert';
  if (pct >= 80) return 'Advanced';
  if (pct >= 70) return 'Proficient';
  return 'Learning';
}

// ─── SVG Ring ────────────────────────────────────────────────────────────────
function Ring({ pct, color, label, active }) {
  const r = 32, cx = 40;
  const circ = 2 * Math.PI * r;
  const [drawn, setDrawn] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const dur = 1400;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setDrawn((1 - Math.pow(1-p, 3)) * pct);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [pct, active]);
  const offset = circ - (drawn / 100) * circ;
  return (
    <div className="sk-sum-item">
      <div className="sk-sum-ring">
        <svg width="80" height="80" viewBox="0 0 80 80" style={{position:'absolute',inset:0}}>
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="6" />
          <circle cx={cx} cy={cx} r={r} fill="none" stroke={`rgb(${color})`} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            transform="rotate(-90 40 40)"
            style={{filter:`drop-shadow(0 0 6px rgba(${color},.5))`,transition:'stroke-dashoffset .05s'}} />
        </svg>
        <span style={{color:`rgb(${color})`,fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:15,position:'relative',zIndex:1}}>
          {Math.round(drawn)}%
        </span>
      </div>
      <div className="sk-sum-lbl">{label}</div>
    </div>
  );
}

// ─── PAGE LOADER ─────────────────────────────────────────────────────────────
function PageLoader({ onDone }) {
  const [pct, setPct]   = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let v = 0;
    const steps = [
      { target: 30,  speed: 18 },
      { target: 70,  speed: 28 },
      { target: 90,  speed: 45 },
      { target: 100, speed: 22 },
    ];
    let s = 0;
    const tick = () => {
      if (s >= steps.length) { setDone(true); setTimeout(onDone, 600); return; }
      const { target, speed } = steps[s];
      if (v < target) { v = Math.min(v+1, target); setPct(v); setTimeout(tick, speed); }
      else { s++; setTimeout(tick, 80); }
    };
    tick();
  }, [onDone]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="sk-loader"
          initial={{ opacity:1 }}
          exit={{ opacity:0, scale:1.04 }}
          transition={{ duration:.6, ease:[.22,1,.36,1] }}
        >
          <div className="sk-loader-scan" />
          <motion.div className="sk-loader-logo"
            initial={{ opacity:0, y:20, filter:'blur(10px)' }}
            animate={{ opacity:1, y:0,  filter:'blur(0px)'  }}
            transition={{ duration:.7, ease:[.22,1,.36,1] }}
          >HMH</motion.div>
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', width:'100%' }}
          >
            <div className="sk-loader-bar-wrap">
              <div className="sk-loader-bar" style={{ width:`${pct}%` }} />
            </div>
            <div className="sk-loader-pct">{pct < 100 ? 'Loading' : 'Ready'} — {pct}%</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── ADVANCED CURSOR ─────────────────────────────────────────────────────────
function useAdvancedCursor() {
  const curRef   = useRef(null);
  const curRRef  = useRef(null);
  const haloRef  = useRef(null);
  const labelRef = useRef(null);
  const trailsRef= useRef([]);
  const TRAIL_N  = 8;
  const mx=useRef(0),my=useRef(0),rx=useRef(0),ry=useRef(0),hx=useRef(0),hy=useRef(0);

  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return;
    const dots = [];
    for (let i=0; i<TRAIL_N; i++) {
      const d = document.createElement('div');
      d.className = 'sk-trail-dot';
      const sz = Math.max(2, 7-i*.75), op = Math.max(.02, .28-i*.028);
      const hue = 240+i*9, sat = 78-i*2;
      d.style.cssText = `width:${sz}px;height:${sz}px;opacity:${op};left:-300px;top:-300px;background:hsl(${hue},${sat}%,72%);`;
      document.body.appendChild(d);
      dots.push({ el:d, x:0, y:0 });
    }
    trailsRef.current = dots;
    return () => dots.forEach(d => d.el.remove());
  }, []);

  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return;
    const LABELS = [
      { sel: '.sk-skill-card', text: 'Skill Info'      },
      { sel: '.sk-tab',        text: 'Filter'          },
      { sel: '.sk-icon-chip',  text: 'Tech'            },
      { sel: '.sk-sum-item',   text: 'Proficiency'     },
    ];
    const spawnBurst = (cx, cy) => {
      const pal = ['#6366f1','#8b5cf6','#ec4899','#22d3ee','#a78bfa','#f9a8d4','#67e8f9'];
      for (let i=0; i<14; i++) {
        const el = document.createElement('div'); el.className = 'sk-burst';
        const angle = (i/14)*Math.PI*2+(Math.random()-.5)*.4;
        const dist = 22+Math.random()*32, tx = Math.cos(angle)*dist, ty = Math.sin(angle)*dist;
        const sz = 2.5+Math.random()*4, dur = .35+Math.random()*.25, col = pal[i%pal.length];
        el.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;background:${col};box-shadow:0 0 ${sz*2.5}px ${col};--tx:${tx}px;--ty:${ty}px;--bd:${dur}s;`;
        document.body.appendChild(el); setTimeout(() => el.remove(), (dur+.1)*1000);
      }
    };
    let lastType = '';
    const onMove = e => {
      mx.current = e.clientX; my.current = e.clientY;
      const cur=curRef.current, curR=curRRef.current, halo=haloRef.current, lbl=labelRef.current;
      if (!cur) return;
      cur.style.left = e.clientX+'px'; cur.style.top = e.clientY+'px';
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isBtn  = !!el?.closest('a,button');
      const isText = !isBtn && !!el?.closest('p,h1,h2,h3,span:not(.sk-bdot):not(.sk-status-dot)');
      const isCard = !isBtn && !!el?.closest('.sk-skill-card,.sk-icon-chip,.sk-sum-item');
      const isInter = isBtn || isCard;
      const t = isText?'text':isInter?'hov':'normal';
      if (t !== lastType) {
        cur.classList.toggle('hov', t==='hov'); cur.classList.toggle('text-hov', t==='text');
        curR?.classList.toggle('hov', t==='hov'); curR?.classList.toggle('text-hov', t==='text');
        halo?.classList.toggle('hov', t==='hov');
        lastType = t;
      }
      document.querySelector('.sk-spotlight')?.style.setProperty('--mx', e.clientX+'px');
      document.querySelector('.sk-spotlight')?.style.setProperty('--my', e.clientY+'px');
      if (lbl) {
        let found = '';
        for (const {sel, text} of LABELS) { if (el?.closest(sel)) { found=text; break; } }
        if (found && isInter) { lbl.textContent=found; lbl.style.left=e.clientX+'px'; lbl.style.top=(e.clientY-46)+'px'; lbl.classList.add('vis'); }
        else lbl.classList.remove('vis');
      }
    };
    const onClick = e => {
      const cur=curRef.current, curR=curRRef.current, halo=haloRef.current;
      cur?.classList.add('clicking'); curR?.classList.add('clicking'); halo?.classList.add('clicking');
      spawnBurst(e.clientX, e.clientY);
      setTimeout(() => { cur?.classList.remove('clicking'); curR?.classList.remove('clicking'); halo?.classList.remove('clicking'); }, 300);
    };
    window.addEventListener('mousemove', onMove, { passive:true });
    window.addEventListener('click', onClick);
    const trail = trailsRef.current;
    let af;
    const tick = () => {
      rx.current += (mx.current-rx.current)*.1; ry.current += (my.current-ry.current)*.1;
      if (curRRef.current) { curRRef.current.style.left=rx.current+'px'; curRRef.current.style.top=ry.current+'px'; }
      hx.current += (mx.current-hx.current)*.065; hy.current += (my.current-hy.current)*.065;
      if (haloRef.current) { haloRef.current.style.left=hx.current+'px'; haloRef.current.style.top=hy.current+'px'; haloRef.current.classList.add('vis'); }
      trail.forEach((dot,i) => {
        const lag = 1+i*1.6; dot.x+=(mx.current-dot.x)/lag; dot.y+=(my.current-dot.y)/lag;
        dot.el.style.left=dot.x+'px'; dot.el.style.top=dot.y+'px';
      });
      af = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener('mousemove',onMove); window.removeEventListener('click',onClick); cancelAnimationFrame(af); };
  }, []);

  return { curRef, curRRef, haloRef, labelRef };
}

// ─── PARALLAX HOOK ────────────────────────────────────────────────────────────
function useParallax() {
  const heroRef   = useRef(null);
  const heroBgRef = useRef(null);
  const floatRefs = useRef([]);
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      if (heroRef.current)   { heroRef.current.style.transform   = `translateY(${sy*.2}px)`; heroRef.current.style.opacity = `${1-sy*.002}`; }
      if (heroBgRef.current) { heroBgRef.current.style.transform = `translateY(${sy*.42}px)`; }
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = FLOAT_SYMBOLS[i]?.depth ?? 0.3;
        el.style.transform = `translateY(${sy*depth*.5}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const setFloatRef = i => el => { floatRefs.current[i] = el; };
  return { heroRef, heroBgRef, setFloatRef };
}

// ─── SKILL CARD with intersection reveal ─────────────────────────────────────
function SkillCard({ skill, accent, index, loaded }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!loaded || !ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [loaded]);

  return (
    <div
      ref={ref}
      className={`sk-skill-card sk-reveal${vis ? ' vis' : ''}`}
      style={{ '--ca': accent, transitionDelay:`${index*.09}s` }}
    >
      <div className="sk-skill-top">
        <div className="sk-skill-icon">{skill.icon}</div>
        <div>
          <div className="sk-skill-name">{skill.name}</div>
          <div className="sk-skill-desc">{skill.desc}</div>
        </div>
        <div className="sk-skill-pct">{skill.level}%</div>
      </div>
      <div className="sk-bar-track">
        <div className="sk-bar-fill" style={{
          width:`${skill.level}%`,
          background:`linear-gradient(90deg,rgba(${accent},.5),rgb(${accent}))`,
          transitionDelay:`${index*.09+.18}s`,
        }}>
          <div className="sk-bar-dot" style={{ background:`rgb(${accent})`, boxShadow:`0 0 8px rgba(${accent},.8)` }} />
        </div>
      </div>
      <div className="sk-bar-labels">
        <span className="sk-bar-lbl">Proficiency</span>
        <span className="sk-bar-lvl">{getLevelLabel(skill.level)}</span>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [loaded, setLoaded]       = useState(false);
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const mxR       = useRef(0), myR = useRef(0);

  const activeCat = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];
  const { curRef, curRRef, haloRef, labelRef } = useAdvancedCursor();
  const { heroRef, heroBgRef, setFloatRef }    = useParallax();

  // inject styles
  useEffect(() => {
    const id = 'sk-v2';
    if (!document.getElementById(id)) {
      const el = document.createElement('style'); el.id=id; el.textContent=STYLES;
      document.head.appendChild(el);
    }
  }, []);

  // canvas
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], t = 0;
    const ORBS=[{x:.1,y:.2,c:'99,102,241',r:400},{x:.88,y:.6,c:'139,92,246',r:320},{x:.5,y:.05,c:'236,72,153',r:220}];
    class N {
      constructor(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.38;this.vy=(Math.random()-.5)*.38;this.r=Math.random()*1.3+.4;const P=[[99,102,241],[139,92,246],[236,72,153],[34,211,238]];this.c=P[~~(Math.random()*4)];this.op=Math.random()*.36+.1;}
      update(){const dx=mxR.current-this.x,dy=myR.current-this.y,d=Math.hypot(dx,dy);if(d<150){this.vx+=dx/d*.011;this.vy+=dy/d*.011;}const sp=Math.hypot(this.vx,this.vy);if(sp>.88){this.vx=this.vx/sp*.88;this.vy=this.vy/sp*.88;}this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>W)this.vx*=-1;if(this.y<0||this.y>H)this.vy*=-1;}
      draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(${this.c},${this.op})`;ctx.fill();}
    }
    const resize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;nodes=Array.from({length:75},()=>new N());};
    resize(); window.addEventListener('resize',resize);
    const loop=()=>{ctx.clearRect(0,0,W,H);t+=.008;ORBS.forEach((o,i)=>{const ox=(o.x+Math.sin(t+i)*.07)*W,oy=(o.y+Math.cos(t*1.2+i)*.06)*H;const g=ctx.createRadialGradient(ox,oy,0,ox,oy,o.r);g.addColorStop(0,`rgba(${o.c},.1)`);g.addColorStop(1,`rgba(${o.c},0)`);ctx.beginPath();ctx.arc(ox,oy,o.r,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();});nodes.forEach((n,i)=>{nodes.forEach((m,j)=>{if(j<=i)return;const dx=n.x-m.x,dy=n.y-m.y,d=Math.hypot(dx,dy);if(d<112){ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.strokeStyle=`rgba(99,102,241,${.065*(1-d/112)})`;ctx.lineWidth=.5;ctx.stroke();}});n.update();n.draw();});rafRef.current=requestAnimationFrame(loop);};
    loop();
    return()=>{window.removeEventListener('resize',resize);cancelAnimationFrame(rafRef.current);};
  },[]);

  // mouse for canvas
  useEffect(()=>{
    const f=e=>{mxR.current=e.clientX;myR.current=e.clientY;};
    window.addEventListener('mousemove',f,{passive:true});
    return()=>window.removeEventListener('mousemove',f);
  },[]);

  const fu = (d=0) => ({
    initial:{opacity:0,y:26,filter:'blur(7px)'},
    animate:{opacity:1,y:0, filter:'blur(0px)'},
    transition:{duration:.72,delay:d,ease:[.22,1,.36,1]},
  });

  const tabClass = cat => {
    let cls = 'sk-tab';
    if (activeTab===cat.id) {
      cls += ' active';
      if (cat.id==='backend') cls += ' cyan';
      if (cat.id==='tools')   cls += ' pink';
    }
    return cls;
  };

  const summaryData = CATEGORIES.map(cat => ({
    label: cat.label,
    color: cat.accent,
    avg: Math.round(cat.skills.reduce((a,s)=>a+s.level,0)/cat.skills.length),
  }));
  summaryData.push({
    label: 'Overall',
    color: '251,191,36',
    avg: Math.round(CATEGORIES.flatMap(c=>c.skills).reduce((a,s)=>a+s.level,0)/CATEGORIES.flatMap(c=>c.skills).length),
  });

  const onLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Header />

      {/* ═══ PAGE LOADER ═══ */}
      <PageLoader onDone={onLoaderDone} />

      <PageTransition>
        <div className="sk sk-bgrid">
          {/* ═══ CURSOR ═══ */}
          <div ref={curRef}   className="sk-cur"       />
          <div ref={curRRef}  className="sk-curR"      />
          <div ref={haloRef}  className="sk-cur-halo"  />
          <div ref={labelRef} className="sk-cur-label" />

          <div className="sk-spotlight" />
          <div className="sk-noise" />
          <canvas ref={canvasRef} className="sk-canvas" />

          {/* ═══ FLOATING SYMBOLS with parallax ═══ */}
          {FLOAT_SYMBOLS.map((f,i)=>(
            <div key={i} ref={setFloatRef(i)} className="sk-float" style={{
              left:f.x, top:f.y, fontSize:f.sz, opacity:f.op,
              animation:`sk-float-sym ${f.dur}s ease-in-out ${i*1.3}s infinite`,
            }}>{f.s}</div>
          ))}

          {/* ══ HERO ══ */}
          <div style={{ position:'relative', zIndex:3 }}>
            {/* parallax bg orbs */}
            <div ref={heroBgRef} style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }}>
              {[
                {top:'0%',    left:'-5%',  w:480, c:'99,102,241', op:.07},
                {bottom:'-5%',right:'-5%', w:380, c:'236,72,153', op:.06},
              ].map((o,i)=>(
                <div key={i} style={{position:'absolute',borderRadius:'50%',filter:'blur(60px)',width:o.w,height:o.w,
                  background:`radial-gradient(circle,rgba(${o.c},${o.op}) 0%,transparent 70%)`,
                  top:o.top,left:o.left,bottom:o.bottom,right:o.right,pointerEvents:'none'}} />
              ))}
            </div>

            {/* parallax hero text */}
            <div ref={heroRef} className="sk-hero">
              <motion.div className="sk-badge" {...fu(0)}>
                <span className="sk-bdot" />Technical Arsenal
              </motion.div>
              <motion.h1 className="sk-title" {...fu(.1)}>
                <span className="sk-t1">TOOLS OF MY</span>
                <span className="sk-t2">CRAFT</span>
              </motion.h1>
              <motion.p className="sk-sub" {...fu(.22)}>
                The technologies I use daily to turn ideas into production-grade software.
              </motion.p>
            </div>
          </div>

          {/* ── TECH ICON STRIP ── */}
          <motion.div className="sk-icon-strip" {...fu(.32)}>
            {TECH_ICONS.map((t,i)=>(
              <motion.div key={t.label} className="sk-icon-chip" style={{'--ic':t.c}}
                initial={{opacity:0,y:22,filter:'blur(6px)'}}
                animate={{opacity:1,y:0, filter:'blur(0px)'}}
                transition={{delay:.34+i*.055, ease:[.22,1,.36,1], duration:.6}}
              >
                <span className="sk-chip-icon">{t.icon}</span>
                <span className="sk-chip-lbl">{t.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CATEGORY TABS ── */}
          <motion.div className="sk-tabs" {...fu(.5)}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} className={tabClass(cat)} onClick={() => setActiveTab(cat.id)}>
                <span>{cat.icon}</span>
                {cat.label}
                <span style={{
                  fontSize:10, fontWeight:800, letterSpacing:'.1em',
                  padding:'2px 8px', borderRadius:'100px',
                  background: activeTab===cat.id ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.06)',
                  color: activeTab===cat.id ? '#fff' : 'rgba(241,241,255,.3)',
                }}>{cat.skills.length}</span>
              </button>
            ))}
          </motion.div>

          {/* ── SKILLS CONTENT ── */}
          <div className="sk-section">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity:0, y:22, filter:'blur(8px)' }}
                animate={{ opacity:1, y:0,  filter:'blur(0px)' }}
                exit={{ opacity:0, y:-12, filter:'blur(4px)' }}
                transition={{ duration:.38, ease:[.22,1,.36,1] }}
              >
                {/* category header */}
                <div className="sk-cat-header" style={{'--ca': activeCat.accent}}>
                  <div className="sk-cat-icon">{activeCat.icon}</div>
                  <div>
                    <div className="sk-cat-title">{activeCat.label}</div>
                    <div className="sk-cat-subtitle">{activeCat.skills.length} skills in this category</div>
                  </div>
                  <div className="sk-cat-count">
                    Avg {Math.round(activeCat.skills.reduce((a,s)=>a+s.level,0)/activeCat.skills.length)}%
                  </div>
                </div>

                {/* skills grid */}
                <div className="sk-grid-skills">
                  {activeCat.skills.map((skill, i) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      accent={activeCat.accent}
                      index={i}
                      loaded={loaded}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── SUMMARY RINGS ── */}
            <motion.div
              className="sk-summary sk-reveal"
              style={{ marginTop:64 }}
              initial={{ opacity:0, y:32, filter:'blur(6px)' }}
              whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
              viewport={{ once:true, margin:'-60px' }}
              transition={{ duration:.8, ease:[.22,1,.36,1] }}
            >
              <div className="sk-summary-title">Overall Proficiency</div>
              <div className="sk-summary-sub">Averaged across all {CATEGORIES.flatMap(c=>c.skills).length} skills</div>
              <div className="sk-summary-grid">
                {summaryData.map((s,i) => (
                  <Ring key={s.label} pct={s.avg} color={s.color} label={s.label} active={loaded} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </PageTransition>
    </>
  );
}
