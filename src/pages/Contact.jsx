import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const API_BASE = import.meta.env.VITE_API_URL || '';

const FLOAT_SYMBOLS = [
  { s: '</>', x: '3%', y: '10%', sz: 14, op: .06, dur: 14 },
  { s: '{ }', x: '91%', y: '8%', sz: 16, op: .05, dur: 17 },
  { s: '=>', x: '88%', y: '44%', sz: 13, op: .04, dur: 19 },
  { s: '( )', x: '4%', y: '58%', sz: 11, op: .04, dur: 12 },
  { s: '===', x: '12%', y: '82%', sz: 12, op: .04, dur: 20 },
  { s: '[ ]', x: '82%', y: '80%', sz: 11, op: .04, dur: 15 },
];

const INFO_CARDS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'huzaifaabbasi09123@gmail.com',
    accent: '4,50,33',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1.22h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 21 16.92z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+92 3213794233',
    accent: '4,50,33',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Pakistan 🇵🇰',
    accent: '4,50,33',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Response Time',
    value: 'Within 24 hours',
    accent: '4,50,33',
  },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

.ct, .ct * { box-sizing: border-box; }
.ct {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #b2dfc3; min-height: 100vh;
  overflow-x: hidden; color: #043221;
}
.ct-noise {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .022;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}
.ct-canvas { position: fixed; inset: 0; z-index: 0; opacity: .45; pointer-events: none; }
.ct-spotlight {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(650px circle at var(--mx,50%) var(--my,50%), rgba(4,50,33,.05), transparent 70%);
}
.ct-grid {
  background-image:
    linear-gradient(rgba(4,50,33,.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(4,50,33,.015) 1px, transparent 1px);
  background-size: 60px 60px;
}
@media (hover: hover) {
  .ct { cursor: none; }

  .ct-cur {
    position: fixed; pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    width: 8px; height: 8px; border-radius: 50%;
    background: #fff; mix-blend-mode: difference;
    will-change: left, top;
    transition: width .18s cubic-bezier(.22,1,.36,1), height .18s cubic-bezier(.22,1,.36,1),
                border-radius .18s, background .18s, box-shadow .18s, mix-blend-mode 0s;
  }
  .ct-cur.hov {
    width: 10px; height: 10px; mix-blend-mode: normal;
    background: #054a32;
    box-shadow: 0 0 0 3px rgba(4,50,33,.2), 0 0 18px rgba(4,50,33,.5), 0 0 36px rgba(4,50,33,.2);
  }
  .ct-cur.clicking {
    width: 5px; height: 5px; mix-blend-mode: normal;
    background: #043221;
    box-shadow: 0 0 20px #043221, 0 0 40px rgba(4,50,33,.4);
  }
  .ct-cur.text-hov {
    width: 2px; height: 20px; border-radius: 1px; mix-blend-mode: normal;
    background: #054a32; box-shadow: 0 0 10px rgba(4,50,33,.5);
  }

  .ct-curR {
    position: fixed; pointer-events: none; z-index: 9997;
    transform: translate(-50%,-50%);
    width: 36px; height: 36px; border-radius: 50%;
    border: 1.5px solid rgba(4,50,33,.4);
    will-change: left, top;
    transition: width .38s cubic-bezier(.22,1,.36,1), height .38s cubic-bezier(.22,1,.36,1),
                border-color .25s, border-radius .25s, background .25s;
  }
  .ct-curR.hov     { width: 50px; height: 50px; border-color: rgba(4,50,33,.55); background: rgba(4,50,33,.05); }
  .ct-curR.clicking{ width: 22px; height: 22px; border-color: #043221; background: rgba(4,50,33,.07); }
  .ct-curR.text-hov{ width: 2px; height: 28px; border-radius: 2px; border-color: transparent; background: rgba(4,50,33,.15); }

  .ct-cur-halo {
    position: fixed; pointer-events: none; z-index: 9996;
    transform: translate(-50%,-50%);
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle, rgba(4,50,33,.08) 0%, transparent 70%);
    opacity: 0; filter: blur(6px); will-change: left, top;
    transition: opacity .4s, width .5s cubic-bezier(.22,1,.36,1), height .5s cubic-bezier(.22,1,.36,1), background .3s;
  }
  .ct-cur-halo.vis      { opacity: 1; }
  .ct-cur-halo.hov      { opacity: 1; width: 110px; height: 110px; background: radial-gradient(circle, rgba(4,50,33,.1) 0%, transparent 70%); }
  .ct-cur-halo.clicking { opacity: 1; width: 55px;  height: 55px;  background: radial-gradient(circle, rgba(4,50,33,.18) 0%, transparent 70%); }

  .ct-cur-label {
    position: fixed; pointer-events: none; z-index: 10000;
    transform: translate(-50%, -50%);
    padding: 4px 12px; border-radius: 100px;
    background: rgba(13,14,31,.9); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,.1);
    font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase; color: #f1f1ff;
    white-space: nowrap; opacity: 0; transition: opacity .2s;
  }
  .ct-cur-label.vis { opacity: 1; }
}

/* trail dots */
.ct-trail-dot {
  position: fixed; pointer-events: none; z-index: 9995;
  border-radius: 50%; transform: translate(-50%,-50%);
  mix-blend-mode: screen; will-change: left, top;
}
/* burst particles */
.ct-burst {
  position: fixed; pointer-events: none; z-index: 9994; border-radius: 50%;
  animation: ct-burst-out var(--bd,.5s) ease-out forwards;
}
@keyframes ct-burst-out {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
  60%  { opacity: .8; }
  100% { transform: translate(calc(-50% + var(--tx,0px)), calc(-50% + var(--ty,0px))) scale(1); opacity: 0; }
}

.ct-float {
  position: fixed; pointer-events: none;
  font-family: 'Syne', monospace; font-weight: 700;
  color: rgba(4,50,33,.3); user-select: none; z-index: 2;
}
@keyframes ct-float { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-18px) rotate(3deg)} 66%{transform:translateY(9px) rotate(-2deg)} }

/* ── HERO ── */
.ct-hero {
  position: relative; z-index: 3;
  padding: 128px 40px 52px; text-align: center;
  max-width: 760px; margin: 0 auto;
}
.ct-badge {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 8px 20px; border-radius: 100px;
  border: 1px solid rgba(4,50,33,.25); background: rgba(4,50,33,.08);
  font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase;
  color: #043221; margin-bottom: 28px;
}
@keyframes ct-bdot { 0%,100%{box-shadow:0 0 0 0 rgba(4,50,33,.4)} 50%{box-shadow:0 0 0 8px rgba(4,50,33,0)} }
.ct-bdot { width:7px; height:7px; border-radius:50%; background:#043221; animation:ct-bdot 2s infinite; }
.ct-title {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(36px, 6.5vw, 68px); line-height: .9; letter-spacing: -2px; margin-bottom: 18px;
}
.ct-t1 { display: block; color: #043221; }
.ct-t2 {
  display: block;
  background: linear-gradient(130deg, #043221 0%, #054a32 45%, #076040 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 36px rgba(4,50,33,.25));
  background-size: 200% 200%; animation: ct-grad 4s ease infinite;
}
@keyframes ct-grad { 0%,100%{background-position:0%50%} 50%{background-position:100%50%} }
.ct-sub { font-size: clamp(14px,1.8vw,16px); line-height:1.75; color:rgba(4,50,33,.5); font-style:italic; max-width:480px; margin:0 auto; }

/* ── INFO CARDS ── */
.ct-info-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  max-width: 900px; margin: 0 auto; padding: 0 40px 52px;
  position: relative; z-index: 3;
}
.ct-info-card {
  padding: 20px 18px; border-radius: 18px;
  background: rgba(4,50,33,.06); border: 1px solid rgba(4,50,33,.12);
  backdrop-filter: blur(14px); text-align: center;
  transition: all .3s; position: relative; overflow: hidden;
  cursor: pointer;
}
.ct-info-card::before {
  content: ''; position: absolute; top:0; left:0; right:0; height:1px;
  background: linear-gradient(90deg, transparent, rgba(var(--ca),.5), transparent);
  opacity: 0; transition: opacity .3s;
}
.ct-info-card:hover { border-color: rgba(var(--ca),.28); transform: translateY(-6px); box-shadow: 0 16px 48px rgba(var(--ca),.1); }
.ct-info-card:hover::before { opacity: 1; }
.ct-info-icon {
  width: 44px; height: 44px; border-radius: 12px; margin: 0 auto 12px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(var(--ca),.1); border: 1px solid rgba(var(--ca),.2);
  color: rgb(var(--ca)); transition: all .3s;
}
.ct-info-card:hover .ct-info-icon { transform: scale(1.1); background: rgba(var(--ca),.18); }
.ct-info-label { font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: rgba(4,50,33,.4); margin-bottom: 5px; }
.ct-info-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; color: rgba(4,50,33,.8); }

/* ── MAIN LAYOUT ── */
.ct-main {
  display: grid; grid-template-columns: 1fr 1.3fr; gap: 32px;
  max-width: 980px; margin: 0 auto; padding: 0 40px 100px;
  position: relative; z-index: 3;
}

/* ── LEFT PANEL ── */
.ct-left {}
.ct-panel-title {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: #043221;
  margin-bottom: 6px;
}
.ct-panel-sub { font-size: 13px; color: rgba(4,50,33,.45); line-height: 1.6; margin-bottom: 28px; }

/* status */
.ct-status-card {
  padding: 20px; border-radius: 18px; margin-bottom: 20px;
  background: rgba(4,50,33,.06); border: 1px solid rgba(4,50,33,.15);
  display: flex; align-items: center; gap: 14px;
}
.ct-status-dot-wrap { position: relative; flex-shrink: 0; }
.ct-status-dot { width: 10px; height: 10px; border-radius: 50%; background: #043221; }
@keyframes ct-ping { 0%{box-shadow:0 0 0 0 rgba(4,50,33,.4)} 100%{box-shadow:0 0 0 14px rgba(4,50,33,0)} }
.ct-status-dot { animation: ct-ping 2s ease infinite; }
.ct-status-text .ct-st1 { font-family:'Syne',sans-serif; font-weight:700; font-size:14px; color:#043221; }
.ct-status-text .ct-st2 { font-size:12px; color:rgba(4,50,33,.45); margin-top:2px; }

/* quick links */
.ct-quick-title { font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:rgba(4,50,33,.35); font-weight:700; margin-bottom:12px; }
.ct-quick-links { display:flex; flex-direction:column; gap:8px; }
.ct-quick-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-radius: 12px; text-decoration: none;
  background: rgba(4,50,33,.04); border: 1px solid rgba(4,50,33,.1);
  color: rgba(4,50,33,.6); font-size: 13px; font-weight: 600;
  transition: all .25s;
}
.ct-quick-link:hover { background: rgba(4,50,33,.1); border-color: rgba(4,50,33,.25); color: #043221; transform: translateX(4px); }
.ct-quick-link-arrow { opacity: 0; transform: translateX(-4px); transition: all .22s; }
.ct-quick-link:hover .ct-quick-link-arrow { opacity: 1; transform: translateX(0); }

/* ── RIGHT — FORM ── */
.ct-form-card {
  padding: 36px 32px; border-radius: 24px;
  background: rgba(255,255,255,.4); border: 1px solid rgba(4,50,33,.15);
  backdrop-filter: blur(20px); position: relative; overflow: hidden;
}
.ct-form-card::before {
  content: ''; position: absolute; top:0; left:0; right:0; height:1px;
  background: linear-gradient(90deg, transparent, rgba(4,50,33,.3), rgba(4,50,33,.15), transparent);
}
/* form fields */
.ct-field { margin-bottom: 20px; }
.ct-label {
  display: block; font-size: 11.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: rgba(4,50,33,.5); margin-bottom: 8px;
}
.ct-input-wrap { position: relative; }
.ct-input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: rgba(4,50,33,.3); pointer-events: none; transition: color .2s;
}
.ct-ta-icon { top: 16px; transform: none; }
.ct-input {
  width: 100%; padding: 13px 14px 13px 42px; border-radius: 12px;
  background: rgba(255,255,255,.5); border: 1px solid rgba(4,50,33,.15);
  color: #043221; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 500;
  outline: none; transition: all .25s; resize: none;
}
.ct-input::placeholder { color: rgba(4,50,33,.3); }
.ct-input:focus { border-color: rgba(4,50,33,.4); background: rgba(255,255,255,.65); box-shadow: 0 0 0 3px rgba(4,50,33,.08); }
.ct-input:focus + .ct-focus-line { transform: scaleX(1); }
.ct-input:focus ~ .ct-input-wrap .ct-input-icon,
.ct-input-wrap:has(.ct-input:focus) .ct-input-icon { color: rgba(4,50,33,.7); }
/* char counter */
.ct-char { text-align: right; font-size: 11px; color: rgba(4,50,33,.3); margin-top: 5px; font-weight: 500; }

/* error / success */
.ct-error {
  display: flex; align-items: center; gap: 9px;
  padding: 12px 16px; border-radius: 12px; margin-bottom: 18px;
  background: rgba(239,68,68,.08); border: 1px solid rgba(239,68,68,.22);
  color: #dc2626; font-size: 13px; font-weight: 600;
}
.ct-success {
  padding: 28px 20px; border-radius: 16px; text-align: center;
  background: rgba(4,50,33,.06); border: 1px solid rgba(4,50,33,.18);
}
.ct-success-icon { font-size: 48px; margin-bottom: 14px; }
.ct-success-t { font-family:'Syne',sans-serif; font-weight:800; font-size:20px; color:#043221; margin-bottom:6px; }
.ct-success-s { font-size:13px; color:rgba(4,50,33,.5); }

/* submit btn */
.ct-submit {
  width: 100%; padding: 14px 24px; border-radius: 14px; border: none; cursor: pointer;
  background: linear-gradient(135deg, #043221, #054a32);
  color: #b2dfc3; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14.5px;
  letter-spacing: .04em; position: relative; overflow: hidden;
  transition: box-shadow .25s; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.ct-submit::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg, rgba(4,50,33,.15), rgba(5,74,50,.1)); opacity:0; transition:opacity .25s; }
.ct-submit:hover:not(:disabled) { box-shadow: 0 16px 48px rgba(4,50,33,.3); }
.ct-submit:hover:not(:disabled)::before { opacity:1; }
.ct-submit:disabled { opacity: .5; cursor: not-allowed; }
.ct-submit > * { position: relative; z-index: 1; }
@keyframes ct-spin { to { transform: rotate(360deg); } }
.ct-spinner { width:18px; height:18px; border:2px solid rgba(178,223,195,.3); border-top-color:#b2dfc3; border-radius:50%; animation:ct-spin 1s linear infinite; }

/* reveal */
.ct-reveal { opacity:0; transform:translateY(24px); transition:opacity .7s ease, transform .7s ease; }
.ct-reveal.vis { opacity:1; transform:translateY(0); }

/* map modal */
.ct-map-overlay {
  position: fixed; inset: 0; z-index: 40;
  background: rgba(15,23,42,.75);
  display: flex; align-items: center; justify-content: center;
}
.ct-map-modal {
  width: min(90vw, 700px);
  height: min(70vh, 480px);
  background: #020617;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(148,163,184,.5);
  box-shadow: 0 28px 80px rgba(15,23,42,.9);
  position: relative;
}
.ct-map-close {
  position: absolute; top: 10px; right: 14px;
  background: rgba(15,23,42,.85); border: none; cursor: pointer;
  color: #e5e7eb; padding: 6px 10px; border-radius: 999px;
  font-size: 12px; font-weight: 600;
}
.ct-map-frame {
  width: 100%; height: 100%; border: 0;
}

/* toast */
.ct-toast {
  position: fixed; bottom: 24px; right: 24px; z-index: 50;
  padding: 12px 18px; border-radius: 12px;
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 600;
  color: #f9fafb;
  background: rgba(15,23,42,.96);
  border: 1px solid rgba(148,163,184,.8);
  box-shadow: 0 18px 60px rgba(15,23,42,.85);
}
.ct-toast.error {
  background: rgba(127,29,29,.96);
  border-color: rgba(248,113,113,.9);
}
.ct-toast.success {
  background: rgba(6,95,70,.96);
  border-color: rgba(52,211,153,.9);
}
.ct-toast.top-right {
  bottom: auto;
  top: 100px;
}

/* responsive */
@media (max-width: 860px) {
  .ct-main { grid-template-columns: 1fr; }
  .ct-info-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 540px) {
  .ct-hero { padding: 110px 20px 40px; }
  .ct-info-grid { grid-template-columns: repeat(2,1fr); padding: 0 20px 40px; }
  .ct-main { padding: 0 20px 80px; }
  .ct-form-card { padding: 24px 20px; }
  .ct-float { display: none; }
  .ct-toast { left: 16px; right: 16px; bottom: 16px; }
}

/* ════ PAGE LOADER ════ */
.ct-loader {
  position: fixed; inset: 0; z-index: 99999;
  background: #b2dfc3;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 32px;
}
.ct-loader-logo {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(36px, 7vw, 68px); letter-spacing: -2px;
  background: linear-gradient(130deg, #043221 0%, #054a32 45%, #076040 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  background-size: 200% 200%; animation: ct-grad 2s ease infinite;
}
.ct-loader-bar-wrap {
  width: min(300px, 78vw); height: 2px;
  background: rgba(4,50,33,.1); border-radius: 2px; overflow: hidden;
}
.ct-loader-bar {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, #043221, #054a32, #076040);
  transition: width .08s linear;
  box-shadow: 0 0 12px rgba(4,50,33,.5);
}
.ct-loader-pct {
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 11px;
  letter-spacing: .22em; color: rgba(4,50,33,.5); text-transform: uppercase;
}
.ct-loader-scan {
  position: absolute; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(4,50,33,.2), transparent);
  animation: ct-scan-line 1.2s ease-in-out infinite;
}
@keyframes ct-scan-line {
  0%   { top: 0%;   opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
`;

function PageLoader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let v = 0;
    const steps = [
      { target: 30, speed: 18 },
      { target: 70, speed: 28 },
      { target: 90, speed: 45 },
      { target: 100, speed: 22 },
    ];
    let s = 0;
    const tick = () => {
      if (s >= steps.length) { setDone(true); setTimeout(onDone, 600); return; }
      const { target, speed } = steps[s];
      if (v < target) { v = Math.min(v + 1, target); setPct(v); setTimeout(tick, speed); }
      else { s++; setTimeout(tick, 80); }
    };
    tick();
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="ct-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
        >
          <div className="ct-loader-scan" />
          <motion.div
            className="ct-loader-logo"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
          >
            HMH
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}
          >
            <div className="ct-loader-bar-wrap">
              <div className="ct-loader-bar" style={{ width: `${pct}%` }} />
            </div>
            <div className="ct-loader-pct">{pct < 100 ? 'Loading' : 'Ready'} — {pct}%</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── ADVANCED CURSOR ──────────────────────────────────────────────────────
function useAdvancedCursor() {
  const curRef = useRef(null);
  const curRRef = useRef(null);
  const haloRef = useRef(null);
  const labelRef = useRef(null);
  const trailsRef = useRef([]);
  const TRAIL_N = 8;
  const mx = useRef(0), my = useRef(0), rx = useRef(0), ry = useRef(0), hx = useRef(0), hy = useRef(0);

  // init trail dots
  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return;
    const dots = [];
    for (let i = 0; i < TRAIL_N; i++) {
      const d = document.createElement('div');
      d.className = 'ct-trail-dot';
      const sz = Math.max(2, 7 - i * .75), op = Math.max(.02, .2 - i * .02);
      const hue = 150 + i * 5, sat = 60 - i * 2;
      d.style.cssText = `width:${sz}px;height:${sz}px;opacity:${op};left:-300px;top:-300px;background:hsl(${hue},${sat}%,30%);`;
      document.body.appendChild(d);
      dots.push({ el: d, x: 0, y: 0 });
    }
    trailsRef.current = dots;
    return () => dots.forEach(d => d.el.remove());
  }, []);

  // main logic
  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return;
    const LABELS = [
      { sel: '.ct-info-card', text: 'Connect' },
      { sel: '.ct-quick-link', text: 'Visit' },
      { sel: '.ct-submit', text: 'Send' },
      { sel: 'input, textarea', text: 'Type' },
    ];
    const spawnBurst = (cx, cy) => {
      const pal = ['#043221', '#054a32', '#076040', '#0a8055'];
      for (let i = 0; i < 14; i++) {
        const el = document.createElement('div'); el.className = 'ct-burst';
        const angle = (i / 14) * Math.PI * 2 + (Math.random() - .5) * .4;
        const dist = 22 + Math.random() * 32, tx = Math.cos(angle) * dist, ty = Math.sin(angle) * dist;
        const sz = 2.5 + Math.random() * 4, dur = .35 + Math.random() * .25, col = pal[i % pal.length];
        el.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;background:${col};box-shadow:0 0 ${sz * 2.5}px ${col};--tx:${tx}px;--ty:${ty}px;--bd:${dur}s;`;
        document.body.appendChild(el); setTimeout(() => el.remove(), (dur + .1) * 1000);
      }
    };
    let lastType = '';
    const onMove = e => {
      mx.current = e.clientX; my.current = e.clientY;
      const cur = curRef.current, curR = curRRef.current, halo = haloRef.current, lbl = labelRef.current;
      if (!cur) return;
      cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isBtn = !!el?.closest('a,button');
      const isText = !isBtn && !!el?.closest('p,h1,h2,h3,span:not(.ct-bdot):not(.ct-status-dot)');
      const isCard = !isBtn && !!el?.closest('.ct-info-card,.ct-form-card');
      const isInter = isBtn || isCard || !!el?.closest('input,textarea');
      const t = isText ? 'text' : isInter ? 'hov' : 'normal';
      if (t !== lastType) {
        cur.classList.toggle('hov', t === 'hov'); cur.classList.toggle('text-hov', t === 'text');
        curR?.classList.toggle('hov', t === 'hov'); curR?.classList.toggle('text-hov', t === 'text');
        halo?.classList.toggle('hov', t === 'hov');
        lastType = t;
      }
      document.querySelector('.ct-spotlight')?.style.setProperty('--mx', e.clientX + 'px');
      document.querySelector('.ct-spotlight')?.style.setProperty('--my', e.clientY + 'px');
      if (lbl) {
        let found = '';
        for (const { sel, text } of LABELS) { if (el?.closest(sel)) { found = text; break; } }
        if (found && isInter) { lbl.textContent = found; lbl.style.left = e.clientX + 'px'; lbl.style.top = (e.clientY - 46) + 'px'; lbl.classList.add('vis'); }
        else lbl.classList.remove('vis');
      }
    };
    const onClick = e => {
      const cur = curRef.current, curR = curRRef.current, halo = haloRef.current;
      cur?.classList.add('clicking'); curR?.classList.add('clicking'); halo?.classList.add('clicking');
      spawnBurst(e.clientX, e.clientY);
      setTimeout(() => { cur?.classList.remove('clicking'); curR?.classList.remove('clicking'); halo?.classList.remove('clicking'); }, 300);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    const trail = trailsRef.current;
    let af;
    const tick = () => {
      rx.current += (mx.current - rx.current) * .1; ry.current += (my.current - ry.current) * .1;
      if (curRRef.current) { curRRef.current.style.left = rx.current + 'px'; curRRef.current.style.top = ry.current + 'px'; }
      hx.current += (mx.current - hx.current) * .065; hy.current += (my.current - hy.current) * .065;
      if (haloRef.current) { haloRef.current.style.left = hx.current + 'px'; haloRef.current.style.top = hy.current + 'px'; haloRef.current.classList.add('vis'); }
      trail.forEach((dot, i) => {
        const lag = 1 + i * 1.6; dot.x += (mx.current - dot.x) / lag; dot.y += (my.current - dot.y) / lag;
        dot.el.style.left = dot.x + 'px'; dot.el.style.top = dot.y + 'px';
      });
      af = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('click', onClick); cancelAnimationFrame(af); };
  }, []);

  return { curRef, curRRef, haloRef, labelRef };
}

function CountdownToast({ start, onClose }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const end = start + 24 * 60 * 60 * 1000; // 24 hours from start
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('00h 00m 00s');
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [start]);

  return (
    <div className="ct-toast success top-right" style={{ alignItems: 'flex-start' }}>
      <span style={{ marginTop: '2px' }}>✅</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span>Message Sent!</span>
        <span style={{ fontSize: '11px', opacity: 0.8, fontVariantNumeric: 'tabular-nums' }}>
          Response ETA: {timeLeft}
        </span>
      </div>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'inherit', opacity: 0.5, cursor: 'pointer', marginLeft: '8px', fontSize: '16px', padding: 0 }}>×</button>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const [responseStart, setResponseStart] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const [toast, setToast] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const spotRef = useRef(null);
  const mxR = useRef(0), myR = useRef(0);
  const revealRefs = useRef([]);

  const { curRef, curRRef, haloRef, labelRef } = useAdvancedCursor();

  // inject CSS
  useEffect(() => {
    const id = 'ct-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style'); el.id = id; el.textContent = STYLES;
      document.head.appendChild(el);
    }
  }, []);

  // track mouse for canvas
  useEffect(() => {
    const f = e => { mxR.current = e.clientX; myR.current = e.clientY; };
    window.addEventListener('mousemove', f, { passive: true });
    return () => window.removeEventListener('mousemove', f);
  }, []);

  // canvas
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); let W, H, nodes = [], t = 0;
    const ORBS = [{ x: .1, y: .2, c: '4,50,33', r: 400 }, { x: .88, y: .55, c: '5,74,50', r: 320 }, { x: .5, y: .05, c: '7,96,64', r: 220 }];
    class N {
      constructor() { this.x = Math.random() * W; this.y = Math.random() * H; this.vx = (Math.random() - .5) * .38; this.vy = (Math.random() - .5) * .38; this.r = Math.random() * 1.3 + .4; const P = [[4, 50, 33], [5, 74, 50], [7, 96, 64], [10, 130, 85]]; this.c = P[~~(Math.random() * 4)]; this.op = Math.random() * .3 + .08; }
      update() { const dx = mxR.current - this.x, dy = myR.current - this.y, d = Math.hypot(dx, dy); if (d < 150) { this.vx += dx / d * .011; this.vy += dy / d * .011; } const sp = Math.hypot(this.vx, this.vy); if (sp > .88) { this.vx = this.vx / sp * .88; this.vy = this.vy / sp * .88; } this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > W) this.vx *= -1; if (this.y < 0 || this.y > H) this.vy *= -1; }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.op})`; ctx.fill(); }
    }
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; nodes = Array.from({ length: 72 }, () => new N()); };
    resize(); window.addEventListener('resize', resize);
    const loop = () => { ctx.clearRect(0, 0, W, H); t += .008; ORBS.forEach((o, i) => { const ox = (o.x + Math.sin(t + i) * .07) * W, oy = (o.y + Math.cos(t * 1.2 + i) * .06) * H; const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r); g.addColorStop(0, `rgba(${o.c},.08)`); g.addColorStop(1, `rgba(${o.c},0)`); ctx.beginPath(); ctx.arc(ox, oy, o.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); }); nodes.forEach((n, i) => { nodes.forEach((m, j) => { if (j <= i) return; const dx = n.x - m.x, dy = n.y - m.y, d = Math.hypot(dx, dy); if (d < 112) { ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.strokeStyle = `rgba(4,50,33,${.05 * (1 - d / 112)})`; ctx.lineWidth = .5; ctx.stroke(); } }); n.update(); n.draw(); }); rafRef.current = requestAnimationFrame(loop); };
    loop();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafRef.current); };
  }, []);

  // scroll reveal
  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }), { threshold: .1 });
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);
  const rr = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  // auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  const handleChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    setError('Please fill in all fields.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    setError('Please enter a valid email address.');
    return;
  }

  setLoading(true);
  setError('');
  setSuccess(false);

  try {
    const response = await fetch("https://formspree.io/f/xjkaekdn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim()
      })
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const now = Date.now();

    setSuccess(true);
    setForm({ name: '', email: '', message: '' });
    setHasSentMessage(true);
    setResponseStart(now);
    setShowTimer(true);

  } catch (err) {
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleInfoCardClick = (card) => {
    if (card.label === 'Email') {
      const email = 'huzaifaabbasi09123@gmail.com';
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (card.label === 'WhatsApp') {
      const raw = '+92 321 3794233';
      const phone = raw.replace(/[^0-9]/g, '');
      if (phone) {
        const url = `https://wa.me/${phone}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    if (card.label === 'Location') {
      setShowMap(true);
      return;
    }

    if (card.label === 'Response Time') {
      if (!hasSentMessage) {
        setToast({ type: 'error', message: 'Please send a message from the form first.' });
        return;
      }
      const start = responseStart || Date.now();
      if (!responseStart) {
        setResponseStart(start);
      }
      const diffMs = Date.now() - start;
      const diffHours = diffMs / (1000 * 60 * 60);
      const remaining = Math.max(0, 24 - diffHours);
      const h = Math.floor(remaining);
      const m = Math.floor((remaining - h) * 60);
      const msg = remaining > 0
        ? `24-hour response window active. Approximately ${h}h ${m}m remaining.` 
        : '24-hour response window has passed. I still do my best to reply quickly.';
      setToast({ type: 'success', message: msg });
      return;
    }
  };

  const fu = (d = 0) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: .65, delay: d, ease: [.22, 1, .36, 1] } });

  const onLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Header />

      {/* ═══ PAGE LOADER ═══ */}
      <PageLoader onDone={onLoaderDone} />

      <PageTransition>
        <div className="ct ct-grid">
          <div ref={curRef} className="ct-cur" />
          <div ref={curRRef} className="ct-curR" />
          <div ref={haloRef} className="ct-cur-halo" />
          <div ref={labelRef} className="ct-cur-label" />
          <div ref={spotRef} className="ct-spotlight" />
          <div className="ct-noise" />
          <canvas ref={canvasRef} className="ct-canvas" />

          {FLOAT_SYMBOLS.map((f, i) => (
            <div key={i} className="ct-float" style={{ left: f.x, top: f.y, fontSize: f.sz, opacity: f.op, animation: `ct-float ${f.dur}s ease-in-out ${i * 1.4}s infinite` }}>{f.s}</div>
          ))}

          {/* ── HERO ── */}
          <div className="ct-hero">
            {[
              { top: '0%', left: '-5%', w: 480, c: '99,102,241', op: .07 },
              { bottom: '-5%', right: '-5%', w: 360, c: '236,72,153', op: .06 },
            ].map((o, i) => (
              <div key={i} style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(60px)', width: o.w, height: o.w, background: `radial-gradient(circle,rgba(${o.c},${o.op}) 0%,transparent 70%)`, top: o.top, left: o.left, bottom: o.bottom, right: o.right, pointerEvents: 'none' }} />
            ))}
            <motion.div className="ct-badge" {...fu(0)}>
              <span className="ct-bdot" />Let's Connect
            </motion.div>
            <motion.h1 className="ct-title" {...fu(.1)}>
              <span className="ct-t1">GET IN</span>
              <span className="ct-t2">TOUCH</span>
            </motion.h1>
            <motion.p className="ct-sub" {...fu(.22)}>
              Got a project in mind, a question, or just want to say hi? I'd love to hear from you.
            </motion.p>
          </div>

          {/* ── INFO CARDS ── */}
          <motion.div className="ct-info-grid" {...fu(.32)}>
            {INFO_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                className="ct-info-card"
                style={{ '--ca': card.accent }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .32 + i * .07, ease: [.22, 1, .36, 1] }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleInfoCardClick(card)}
              >
                <div className="ct-info-icon">{card.icon}</div>
                <div className="ct-info-label">{card.label}</div>
                <div className="ct-info-val">{card.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── MAIN ── */}
          <div className="ct-main">

            {/* LEFT */}
            <motion.div className="ct-left" {...fu(.44)}>
              <div className="ct-panel-title">Let's work together</div>
              <p className="ct-panel-sub">
                I'm available for freelance projects, full-time roles, and collaborations.
                Whether it's a quick question or a full project — reach out!
              </p>

              {/* status */}
              <div className="ct-status-card">
                <div className="ct-status-dot-wrap">
                  <div className="ct-status-dot" />
                </div>
                <div className="ct-status-text">
                  <div className="ct-st1">Currently Available</div>
                  <div className="ct-st2">Open to new opportunities</div>
                </div>
              </div>

              {/* quick links */}
              <p className="ct-quick-title">Or reach me directly</p>
              <div className="ct-quick-links">
                {[
                  { label: '📧 Send an Email', href: 'mailto:huzaifaabbasi09123@gmail.com' },
                  { label: '💼 LinkedIn Profile', href: 'https://www.linkedin.com/in/hafiz-muhammad-huzaifa/' },
                  { label: '⌨️ GitHub Profile', href: 'https://github.com/huzaifaabbasi630' },
                  { label: '📄 Download Resume', href: '/assets/resume.pdf' },
                ].map(({ label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="ct-quick-link"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  >
                    <span>{label}</span>
                    <span className="ct-quick-link-arrow">→</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — FORM */}
            <motion.div {...fu(.5)}>
              <div className="ct-form-card">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      className="ct-success"
                      initial={{ opacity: 0, scale: .9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                    >
                      <div className="ct-success-icon">🎉</div>
                      <div className="ct-success-t">Message Sent!</div>
                      <div className="ct-success-s">I'll get back to you within 24 hours.</div>
                      <motion.button
                        style={{ marginTop: 20, padding: '10px 24px', borderRadius: 10, background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.25)', color: '#8b5cf6', fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                        onClick={() => setSuccess(false)}
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                      >
                        Send Another ↩
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} noValidate>
                      {/* error */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            className="ct-error"
                            initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            {error}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Name */}
                      <div className="ct-field">
                        <label htmlFor="name" className="ct-label">Your Name</label>
                        <div className="ct-input-wrap">
                          <div className="ct-input-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                          </div>
                          <input id="name" name="name" type="text" className="ct-input" placeholder="abc" value={form.name} onChange={handleChange} disabled={loading} />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="ct-field">
                        <label htmlFor="email" className="ct-label">Email Address</label>
                        <div className="ct-input-wrap">
                          <div className="ct-input-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                          </div>
                          <input id="email" name="email" type="email" className="ct-input" placeholder="you@example.com" value={form.email} onChange={handleChange} disabled={loading} />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="ct-field">
                        <label htmlFor="message" className="ct-label">Message</label>
                        <div className="ct-input-wrap">
                          <div className="ct-input-icon ct-ta-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                          </div>
                          <textarea id="message" name="message" className="ct-input" placeholder="Tell me about your project or idea..." rows={5} value={form.message} onChange={handleChange} disabled={loading} />
                        </div>
                        <div className="ct-char">{form.message.length} / 1000</div>
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        className="ct-submit"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!loading ? { scale: .98 } : {}}
                        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                      >
                        {loading ? (
                          <><div className="ct-spinner" /><span>Sending...</span></>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {showMap && (
            <div className="ct-map-overlay" onClick={() => setShowMap(false)}>
              <div className="ct-map-modal" onClick={e => e.stopPropagation()}>
                <button className="ct-map-close" onClick={() => setShowMap(false)}>Close ✕</button>
                <iframe
                  className="ct-map-frame"
                  src="https://www.google.com/maps?q=Karachi,+Pakistan&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Karachi, Pakistan map"
                />
              </div>
            </div>
          )}

          {showTimer && responseStart && (
            <CountdownToast start={responseStart} onClose={() => setShowTimer(false)} />
          )}

          {toast && (
            <div className={`ct-toast ${toast.type}`}>
              <span>{toast.type === 'error' ? '⚠️' : '✅'}</span>
              <span>{toast.message}</span>
            </div>
          )}
        </div>
        <Footer />
      </PageTransition>
    </>
  );
}
