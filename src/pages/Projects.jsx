import { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

// ─── Projects Data ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Website',
    short: 'Second assignment  online store with modern shopping experience',
    desc: 'A complete e-commerce platform built with Frontend . Features include product listings.',
    tech: ['HTML', 'CSS', 'JavaScript', 'bootstrap'],
    type: 'Frontend',
    status: 'In Progress',
    accent: '99,102,241',
    glow: '#6366f1',
    placeholder: '🛒',
    image: '/assets/ecommerce.jpg',
    github: 'https://github.com/huzaifaabbasi630/DoDiX-portfolio-assignment',
    live: 'https://huzaifaabbasi630.github.io/G-B-Fashion-Collection/',
    featured: true,
  },
  {
    id: 2,
    title: 'Portfolio v1',
    short: 'My first personal developer portfolio website. As a frontend developer',
    desc: 'My first portfolio website — built to showcase my skills and projects.  Clean layout with smooth animations, dark theme, responsive design, and a working contact form.',
    tech: ['HTML', 'CSS', 'JAVASCRIPT', 'bootstrap'],
    type: 'Frontend',
    status: 'Completed',
    accent: '139,92,246',
    glow: '#8b5cf6',
    placeholder: '✨',
    image: '/assets/portfolio1.jpg',
    github: 'https://github.com/huzaifaabbasi630/hafiz-huzaifa-portfolio',
    live: 'https://hafiz-huzaifa-portfolio.netlify.app/',
    featured: false,
  },
  {
    id: 3,
    title: 'Online Quran Academy',
    short: ' Third Assignment as a Frontend Developer: Educational platform for Quran learning online',
    desc: 'A professional website for an Online Quran Academy. Includes course listings, teacher profiles, student enrollment system, and scheduling — designed to connect students with qualified teachers globally.',
    tech: ['HTML', 'CSS', 'JAVASCRIPT', 'bootstrap'],
    type: 'Frontend',
    status: 'Completed',
    accent: '34,211,238',
    glow: '#22d3ee',
    placeholder: '📖',
    image: '/assets/quran.jpg',
    github: 'https://github.com/huzaifaabbasi630/online-Quran-Academy',
    live: 'https://quranonlineacdemy.netlify.app/',
    featured: true,
  },
  {
    id: 4,
    title: 'Wood Furniture Website',
    short: ' First Assignment as a Frontend Developer: Elegant furniture store — university assignment project',
    desc: 'A visually rich website for a premium wood furniture brand. Built as a university assignment, featuring product showcases, category filtering, detailed product pages, and an elegant dark-wood aesthetic.',
    tech: ['HTML', 'CSS3', 'JAVASCRIPT', 'bootstrap'],
    type: 'Frontend',
    status: 'Completed',
    accent: '251,191,36',
    glow: '#fbbf24',
    placeholder: '🪵',
    image: '/assets/wood.jpg',
    github: 'https://github.com/huzaifaabbasi630/hackaton-wood-web-design-project',
    live: 'https://huzaifaabbasi630.github.io/hackaton-wood-web-design-project/',
    featured: false,
  },
  {
    id: 5,
    title: 'AI Clinic System',
    short: 'Firat  Assignment as a Full Stack Web & App Developer: Smart clinic connecting doctors, patients & receptionists',
    desc: 'A full-stack AI-powered clinic management system. Doctors can view patient records, receptionists manage appointments, and users can book consultations. Features role-based authentication, real-time updates, and an intelligent scheduling system.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT',],
    type: 'Full Stack',
    status: 'Completed',
    accent: '52,211,153',
    glow: '#34d399',
    placeholder: '🏥',
    image: '/assets/ai.png',
    github: ['https://github.com/huzaifaabbasi630/ai-clinic-backend', 'https://github.com/huzaifaabbasi630/clinic-frontend'],
    live: 'https://clinic-frontend-peach.vercel.app/login',
    featured: true,
  },
  {
    id: 7,
    title: 'Portfolio v2',
    short: 'Upgraded portfolio with advanced animations & effects',
    desc: 'My second and current portfolio — built with a maximalist aesthetic. Features particle canvas backgrounds, , magnetic buttons, glitch effects, typewriter animations, and a fully interactive UI that leaves a lasting impression.',
    tech: ['HTML', 'CSS', 'JAVASCRIPT', 'bootstrap'],
    type: 'Frontend',
    status: 'Completed',
    accent: '236,72,153',
    glow: '#ec4899',
    placeholder: '🚀',
    image: '/assets/portfolio2.png',
    github: 'https://github.com/huzaifaabbasi630',
    live: 'https://huzaifaabbasi630.github.io/DoDiX-portfolio-assignment/index.html',
    featured: false,
  },
  {
    id: 6,
    title: 'Share Hub',
    short: 'Real-time file sharing , chating ,  calling and .etc  application with link generation.',
    desc: 'A full-stack MERN application allowing users to upload files and share them via unique links. Features include real-time transfer progress with Socket.io, email notifications, and a clean, modern interface built with Tailwind CSS.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    type: 'Full Stack',
    status: 'IN progress',
    accent: '34,211,238',
    glow: '#22d3ee',
    placeholder: '🔗',
    image: '/assets/sharehub.png',
    github: ['https://github.com/huzaifaabbasi630/sharehub-backend', 'https://github.com/huzaifaabbasi630/sharehub-frontend'],
    live: 'https://share-hub-live.netlify.app/',
    featured: true,
  },
  {
    id: 8,
    title: 'ATELIER',
    short: 'Premium Ecommerce platform for ladies, gents, and kids built with TypeScript',
    desc: 'A sophisticated full-stack e-commerce project named ATELIER. This platform offers a seamless shopping experience for clothing categories including ladies, gents, and kids. Built with high-end aesthetics, it features robust state management, product filtering, and a modern UI using TypeScript.',
    tech: ['React', 'Node.js', 'Express', 'firebase', 'TypeScript', 'Tailwind CSS'],
    type: 'Full Stack',
    status: 'Completed',
    accent: '236,72,153',
    glow: '#ec4899',
    placeholder: '👗',
    image: '/assets/atelier.png',
    github: ['https://github.com/huzaifaabbasi630/ecommerce-backend-', 'https://github.com/huzaifaabbasi630/Atelier-frontend'],
    live: 'https://ateliieerr.vercel.app',
    featured: true,
  },
  {
    id: 9,
    title: 'Auto Ustaad User',
    short: 'Vehicle owners to nearby mechanics app with real-time tracking',
    desc: 'Auto Ustaad User App connects vehicle owners with nearby mechanics for instant service requests.\nUsers can track mechanics in real-time on an interactive map using Socket.io.\nGoogle OAuth login ensures a smooth and secure authentication experience.\nFrontend runs on Netlify, with backend temporarily exposed via ngrok for demo purposes.\nThis app demonstrates real-time tracking, API integration, and full-stack functionality for end users.',
    tech: ['React JSX', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind', 'CSS', 'Lucide Icons'],
    type: 'Full Stack',
    status: 'Completed',
    accent: '34,211,238',
    glow: '#22d3ee',
    placeholder: '🚗',
    image: '/assets/ustaadUser.png',
    video: '/assets/ustaadUser.mp4',
    github: ['https://github.com/huzaifaabbasi630/auto-ustaad-server', 'https://github.com/huzaifaabbasi630/auto-ustaad-client'],
    live: 'https://auto-ustaad-client.vercel.app',
    featured: true,
    ngrokNote: true,
  },
  {
    id: 10,
    title: 'Auto Ustaad Partner',
    short: 'Mechanics app to receive and manage service requests',
    desc: 'Auto Ustaad Partner App allows mechanics to receive and manage service requests from users.\nReal-time updates show incoming jobs and user locations using Socket.io.\nAuthentication is handled securely with Google OAuth and email verification.\nFrontend is deployed on Netlify, while backend runs via ngrok for demonstration purposes.\nThis app highlights real-time job management, full-stack APIs, and partner-focused dashboards.',
    tech: ['React JSX', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind', 'CSS', 'Lucide Icons'],
    type: 'Full Stack',
    status: 'Completed',
    accent: '251,191,36',
    glow: '#fbbf24',
    placeholder: '🔧',
    image: '/assets/ustaadPartner.png',
    video: '/assets/ustaadPartner.mp4',
    github: ['https://github.com/huzaifaabbasi630/auto-ustaad-server', 'https://github.com/huzaifaabbasi630/auto-ustaad-partner'],
    live: 'https://auto-ustaad-partner.vercel.app',
    featured: true,
    ngrokNote: true,
  },
  {
    id: 11,
    title: 'Weather App (Mobile)',
    short: 'Real-time weather application for iOS and Android',
    desc: 'A robust mobile application built with React Native and Expo. It provides real-time weather updates, recursive forecasts, and location-based data fetching from OpenWeatherMap API. Features a clean, modern UI with smooth transitions and offline support.',
    tech: ['React Native', 'Expo', 'JavaScript', 'TypeScript', 'OpenWeatherMap API'],
    type: 'Mobile',
    status: 'Completed',
    accent: '139,92,246',
    glow: '#8b5cf6',
    placeholder: '⛅',
    image: '/assets/weather.png',
    github: ['https://github.com/huzaifaabbasi630/weather-app', 'https://github.com/huzaifaabbasi630/weather-app'],
    live: 'https://expo.dev/artifacts/eas/tX1N5KD8oJqzyfzvmNsPkX.apk',
    featured: true,
  },
  {
    id: 12,
    title: 'Weather App (Web Version)',
    short: 'Fully responsive web version of the Weather App',
    desc: 'A full-stack web version of the weather application. Built with React and Node.js, it offers a seamless experience across all devices. Features include search by city, current weather details, 7-day forecast, and dynamic backgrounds based on weather conditions.',
    tech: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'OpenWeatherMap API'],
    type: 'Full Stack',
    status: 'Completed',
    accent: '22d3ee',
    glow: '#22d3ee',
    placeholder: '🌦️',
    image: '/assets/weather.png',
    github: ['https://github.com/huzaifaabbasi630/weather-app', 'https://github.com/huzaifaabbasi630/weather-app'],
    live: 'https://weather-app-six-theta-78.vercel.app/',
    featured: false,
  },
  {
    id: 13,
    title: 'Vault Calculator',
    short: 'A secret vault hidden inside a fully working calculator app',
    desc: 'Vault Calculator ek aisa app hai jo bahar se ek normal calculator lagta hai, lekin secret code daalne par ek hidden secure vault khul jata hai.\n\nIske andar hai ek Decoy Mode jo fake vault dikhata hai forced access se bachane ke liye, aur ek Secure Gallery jisme private images aur videos encrypt hokar store hoti hain.\n\nApp mein ek Incognito Browser bhi hai jisme private web browsing bilkul app ke andar hoti hai, aur Anti-Brute Force system wrong attempts par cooldown activate kar deta hai.',
    tech: ['React Native', 'Expo Router', 'Firebase', 'Expo Secure Store'],
    type: 'Mobile',
    status: 'Completed',
    accent: '99,102,241',
    glow: '#6366f1',
    placeholder: '🔐',
    image: '/assets/calculator.png',
    github: 'https://github.com/huzaifaabbasi630/calculator-lock-code',
    live: 'https://calculatorlock.vercel.app/',
    featured: true,
  },
  {
    id: 14,
    title: 'Flappy Bird',
    short: 'A classic game made with React Native',
    desc: 'Flappy Bird ek classic game hai jo React Native aur Expo ke sath banaya gaya hai. Isme smooth graphics, physics-based gameplay aur touch controls hain.',
    tech: ['React Native', 'Expo'],
    type: 'Mobile',
    status: 'Completed',
    accent: '99,102,241',
    glow: '#6366f1',
    placeholder: '🔐',
    image: '/assets/flappy-bird.png',
    github: 'https://github.com/huzaifaabbasi630/falppy-birds-game',
    live: 'https://expo.dev/artifacts/eas/ghwTQ2qQ7S3ghAgj3VGJn2.apk',
    featured: true,
  },
];

const FILTERS = ['All', 'Full Stack', 'Mobile', 'Frontend'];

const FLOAT_SYMBOLS = [
  { s: '</>', x: '3%', y: '8%', sz: 13, op: .06, dur: 14, depth: 0.3 },
  { s: '{ }', x: '92%', y: '6%', sz: 15, op: .05, dur: 17, depth: 0.5 },
  { s: '=>', x: '90%', y: '45%', sz: 13, op: .04, dur: 19, depth: 0.2 },
  { s: '( )', x: '4%', y: '55%', sz: 11, op: .04, dur: 12, depth: 0.4 },
  { s: '===', x: '12%', y: '82%', sz: 11, op: .04, dur: 20, depth: 0.6 },
  { s: '[ ]', x: '82%', y: '78%', sz: 10, op: .04, dur: 15, depth: 0.35 },
];

// Vault Calculator source code
const VAULT_CODE = `import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const SECRET_CODE = '1337';
const COOLDOWN_TIME = 30000; // 30 seconds

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(false);
  const cooldownRef = useRef(null);

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '='],
  ];

  const handlePress = (btn) => {
    if (cooldown) return;

    if (btn === 'C') {
      setDisplay('0');
      setInput('');
      return;
    }

    if (btn === '⌫') {
      const newInput = input.slice(0, -1);
      setInput(newInput);
      setDisplay(newInput || '0');
      return;
    }

    if (btn === '=') {
      if (input === SECRET_CODE) {
        setInput('');
        setDisplay('0');
        router.push('/vault');
        return;
      }

      try {
        const expr = input.replace('×', '*').replace('÷', '/').replace('−', '-');
        const result = Function('"use strict"; return (' + expr + ')')();
        setDisplay(String(result));
        setInput(String(result));

        setAttempts(prev => {
          const next = prev + 1;
          if (next >= 3) {
            triggerCooldown();
            return 0;
          }
          return next;
        });
      } catch {
        setDisplay('Error');
        setInput('');
      }
      return;
    }

    const newInput = input + btn;
    setInput(newInput);
    setDisplay(newInput);
  };

  const triggerCooldown = () => {
    setCooldown(true);
    Vibration.vibrate([100, 200, 100]);
    cooldownRef.current = setTimeout(() => setCooldown(false), COOLDOWN_TIME);
  };

  const getButtonStyle = (btn) => {
    if (['÷', '×', '−', '+', '='].includes(btn)) return styles.operatorBtn;
    if (['C', '±', '%'].includes(btn)) return styles.funcBtn;
    return styles.numBtn;
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        {cooldown && (
          <Text style={styles.cooldownText}>Too many attempts. Wait 30s...</Text>
        )}
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>
      {buttons.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((btn) => (
            <TouchableOpacity
              key={btn}
              style={[styles.btn, getButtonStyle(btn), cooldown && styles.disabledBtn]}
              onPress={() => handlePress(btn)}
              activeOpacity={0.7}
            >
              <Text style={[styles.btnText, ['÷','×','−','+','='].includes(btn) && styles.opText]}>
                {btn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  display: {
    flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end',
    paddingHorizontal: 8, paddingBottom: 16,
  },
  displayText: { color: '#fff', fontSize: 72, fontWeight: '200' },
  cooldownText: { color: '#ff4444', fontSize: 13, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  btn: {
    flex: 1, aspectRatio: 1, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
  },
  numBtn: { backgroundColor: '#333' },
  funcBtn: { backgroundColor: '#a5a5a5' },
  operatorBtn: { backgroundColor: '#ff9f0a' },
  disabledBtn: { opacity: 0.4 },
  btnText: { color: '#fff', fontSize: 28, fontWeight: '400' },
  opText: { color: '#fff' },
});`;

// ─── CSS ──────────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

:root {
  --indigo: #6366f1; --violet: #8b5cf6; --pink: #ec4899;
  --cyan: #22d3ee; --green: #4ade80; --bg: #04050e;
}
.pj, .pj * { box-sizing: border-box; }
.pj {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg); min-height: 100vh;
  overflow-x: hidden; color: #f1f1ff;
}

/* ── BG ── */
.pj-noise {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .022;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}
.pj-canvas { position: fixed; inset: 0; z-index: 0; opacity: .45; pointer-events: none; }
.pj-spotlight {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(650px circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,.07), transparent 70%);
}
.pj-bgrid {
  background-image:
    linear-gradient(rgba(99,102,241,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,.018) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ══════════════════════════════════════
   PAGE LOADER
══════════════════════════════════════ */
.pj-loader {
  position: fixed; inset: 0; z-index: 99999;
  background: var(--bg);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 32px;
}
.pj-loader-logo {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(36px, 7vw, 68px); letter-spacing: -2px;
  background: linear-gradient(130deg, var(--indigo) 0%, #a78bfa 50%, var(--pink) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  background-size: 200% 200%; animation: pj-grad 2s ease infinite;
}
.pj-loader-bar-wrap {
  width: min(300px, 78vw); height: 2px;
  background: rgba(255,255,255,.06); border-radius: 2px; overflow: hidden;
}
.pj-loader-bar {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--indigo), var(--violet), var(--pink));
  transition: width .08s linear;
  box-shadow: 0 0 12px rgba(99,102,241,.8);
}
.pj-loader-pct {
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 11px;
  letter-spacing: .22em; color: rgba(241,241,255,.3); text-transform: uppercase;
}
.pj-loader-scan {
  position: absolute; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(99,102,241,.3), transparent);
  animation: pj-scan-line 1.2s ease-in-out infinite;
}
@keyframes pj-scan-line {
  0%   { top: 0%;   opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* ══════════════════════════════════════
   CURSOR SYSTEM v4
══════════════════════════════════════ */
@media (hover: hover) {
  .pj { cursor: none; }

  .pj-cur {
    position: fixed; pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    width: 8px; height: 8px; border-radius: 50%;
    background: #fff; mix-blend-mode: difference;
    will-change: left, top;
    transition: width .18s cubic-bezier(.22,1,.36,1), height .18s cubic-bezier(.22,1,.36,1),
                border-radius .18s, background .18s, box-shadow .18s, mix-blend-mode 0s;
  }
  .pj-cur.hov {
    width: 10px; height: 10px; mix-blend-mode: normal;
    background: var(--pink);
    box-shadow: 0 0 0 3px rgba(236,72,153,.2), 0 0 18px rgba(236,72,153,.7), 0 0 36px rgba(236,72,153,.3);
  }
  .pj-cur.clicking {
    width: 5px; height: 5px; mix-blend-mode: normal;
    background: var(--cyan);
    box-shadow: 0 0 20px var(--cyan), 0 0 40px rgba(34,211,238,.5);
  }
  .pj-cur.text-hov {
    width: 2px; height: 20px; border-radius: 1px; mix-blend-mode: normal;
    background: #a5b4fc; box-shadow: 0 0 10px rgba(165,180,252,.8);
  }

  .pj-curR {
    position: fixed; pointer-events: none; z-index: 9997;
    transform: translate(-50%,-50%);
    width: 36px; height: 36px; border-radius: 50%;
    border: 1.5px solid rgba(99,102,241,.5);
    will-change: left, top;
    transition: width .38s cubic-bezier(.22,1,.36,1), height .38s cubic-bezier(.22,1,.36,1),
                border-color .25s, border-radius .25s, background .25s;
  }
  .pj-curR.hov     { width: 50px; height: 50px; border-color: rgba(236,72,153,.65); background: rgba(236,72,153,.04); }
  .pj-curR.clicking{ width: 22px; height: 22px; border-color: var(--cyan); background: rgba(34,211,238,.07); }
  .pj-curR.text-hov{ width: 2px; height: 28px; border-radius: 2px; border-color: transparent; background: rgba(165,180,252,.18); }

  .pj-cur-halo {
    position: fixed; pointer-events: none; z-index: 9996;
    transform: translate(-50%,-50%);
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,.1) 0%, transparent 70%);
    opacity: 0; filter: blur(6px); will-change: left, top;
    transition: opacity .4s, width .5s cubic-bezier(.22,1,.36,1), height .5s cubic-bezier(.22,1,.36,1), background .3s;
  }
  .pj-cur-halo.vis      { opacity: 1; }
  .pj-cur-halo.hov      { opacity: 1; width: 110px; height: 110px; background: radial-gradient(circle, rgba(236,72,153,.13) 0%, transparent 70%); }
  .pj-cur-halo.clicking { opacity: 1; width: 55px;  height: 55px;  background: radial-gradient(circle, rgba(34,211,238,.22) 0%, transparent 70%); }

  .pj-cur-label {
    position: fixed; pointer-events: none; z-index: 10000;
    transform: translate(-50%, -50%);
    padding: 4px 12px; border-radius: 100px;
    background: rgba(13,14,31,.9); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,.1);
    font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: .1em; text-transform: uppercase; color: #f1f1ff;
    white-space: nowrap; opacity: 0; transition: opacity .2s;
  }
  .pj-cur-label.vis { opacity: 1; }
}

/* trail dots */
.pj-trail-dot {
  position: fixed; pointer-events: none; z-index: 9995;
  border-radius: 50%; transform: translate(-50%,-50%);
  mix-blend-mode: screen; will-change: left, top;
}
/* burst particles */
.pj-burst {
  position: fixed; pointer-events: none; z-index: 9994; border-radius: 50%;
  animation: pj-burst-out var(--bd,.5s) ease-out forwards;
}
@keyframes pj-burst-out {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
  60%  { opacity: .8; }
  100% { transform: translate(calc(-50% + var(--tx,0px)), calc(-50% + var(--ty,0px))) scale(1); opacity: 0; }
}

/* ── FLOATING SYMBOLS ── */
.pj-float {
  position: fixed; pointer-events: none;
  font-family: 'Syne', monospace; font-weight: 700;
  color: var(--indigo); user-select: none; z-index: 2;
  will-change: transform;
}
@keyframes pj-float-sym {
  0%,100% { transform: translateY(0) rotate(0deg); }
  33%     { transform: translateY(-18px) rotate(3deg); }
  66%     { transform: translateY(9px) rotate(-2deg); }
}

/* ── HERO ── */
.pj-hero {
  position: relative; z-index: 3;
  padding: 130px 40px 60px; text-align: center;
  max-width: 900px; margin: 0 auto;
}
.pj-badge {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 8px 20px; border-radius: 100px;
  border: 1px solid rgba(99,102,241,.25); background: rgba(99,102,241,.07);
  font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase;
  color: #a5b4fc; margin-bottom: 28px;
  position: relative; overflow: hidden;
  animation: pj-badge-glow 3s ease-in-out infinite;
}
@keyframes pj-badge-glow {
  0%,100% { box-shadow: 0 0 20px rgba(99,102,241,.08); }
  50%     { box-shadow: 0 0 32px rgba(99,102,241,.2); }
}
.pj-badge::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(99,102,241,.1) 50%, transparent 60%);
  transform: translateX(-100%); animation: pj-badge-shimmer 3s ease-in-out 1s infinite;
}
@keyframes pj-badge-shimmer { 0%,100% { transform: translateX(-100%); } 50% { transform: translateX(300%); } }
@keyframes pj-bdot { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5)} 50%{box-shadow:0 0 0 8px rgba(99,102,241,0)} }
.pj-bdot { width:7px; height:7px; border-radius:50%; background:var(--indigo); animation:pj-bdot 2s infinite; flex-shrink:0; }

.pj-title {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(38px, 7vw, 72px); line-height: .9; letter-spacing: -2px; margin-bottom: 18px;
}
.pj-t1 { display: block; color: #f1f1ff; }
.pj-t2 {
  display: block;
  background: linear-gradient(130deg, var(--indigo) 0%, var(--violet) 45%, var(--pink) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 36px rgba(99,102,241,.4));
  background-size: 200% 200%; animation: pj-grad 4s ease infinite;
}
@keyframes pj-grad { 0%,100%{background-position:0%50%} 50%{background-position:100%50%} }
.pj-sub {
  font-size: clamp(14px,1.8vw,16px); line-height: 1.75;
  color: rgba(241,241,255,.35); font-style: italic; max-width: 500px; margin: 0 auto 40px;
}
.pj-count-strip {
  display: inline-flex; align-items: center; gap: 20px;
  padding: 12px 28px; border-radius: 100px;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
  font-size: 13px; color: rgba(241,241,255,.4); font-weight: 500;
  transition: border-color .3s, box-shadow .3s;
}
.pj-count-strip:hover { border-color: rgba(99,102,241,.25); box-shadow: 0 0 32px rgba(99,102,241,.1); }
.pj-count-n { font-family:'Syne',sans-serif; font-weight:800; font-size:18px; color:#a5b4fc; }

/* ── FILTERS ── */
.pj-filters {
  display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;
  padding: 0 40px 48px; position: relative; z-index: 3;
}
.pj-filter-btn {
  padding: 9px 24px; border-radius: 100px; font-size: 13px; font-weight: 700;
  letter-spacing: .06em; border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.03); color: rgba(241,241,255,.4);
  cursor: pointer; transition: all .25s cubic-bezier(.22,1,.36,1);
  font-family: 'Plus Jakarta Sans', sans-serif; position: relative; overflow: hidden;
}
.pj-filter-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.06) 50%, transparent 60%);
  transform: translateX(-100%); transition: transform 0s;
}
.pj-filter-btn:hover { border-color: rgba(99,102,241,.4); color: #a5b4fc; background: rgba(99,102,241,.09); }
.pj-filter-btn:hover::after { transform: translateX(300%); transition: transform .5s cubic-bezier(.22,1,.36,1); }
.pj-filter-btn.active {
  background: linear-gradient(135deg, var(--indigo), var(--violet));
  border-color: transparent; color: #fff;
  box-shadow: 0 8px 28px rgba(99,102,241,.35);
}

/* ── GRID ── */
.pj-grid-wrap {
  position: relative; z-index: 3;
  max-width: 1200px; margin: 0 auto; padding: 0 40px 100px;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}

/* ── CARD ── */
.pj-card {
  border-radius: 24px; overflow: hidden;
  background: rgba(255,255,255,.028); border: 1px solid rgba(255,255,255,.07);
  backdrop-filter: blur(16px); cursor: pointer; position: relative;
  transition: all .38s cubic-bezier(.22,1,.36,1);
  display: flex; flex-direction: column;
  transform-style: preserve-3d;
}
.pj-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(var(--ca),.55), transparent);
  opacity: 0; transition: opacity .35s; z-index: 1;
}
.pj-card::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.025) 50%, transparent 60%);
  transform: translateX(-100%); transition: transform 0s; z-index: 0; pointer-events: none;
}
.pj-card:hover {
  border-color: rgba(var(--ca),.32);
  transform: translateY(-12px) rotateX(3deg) rotateY(-1.5deg);
  box-shadow: 0 36px 80px rgba(var(--ca),.16), 0 0 0 1px rgba(var(--ca),.12) inset;
}
.pj-card:hover::before { opacity: 1; }
.pj-card:hover::after { transform: translateX(300%); transition: transform .65s cubic-bezier(.22,1,.36,1); }

/* featured badge */
.pj-featured-badge {
  position: absolute; top: 12px; left: 12px; z-index: 5;
  padding: 4px 12px; border-radius: 100px;
  background: linear-gradient(135deg, rgba(99,102,241,.8), rgba(139,92,246,.8));
  font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
  color: #fff; backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.15);
}

/* type badge */
.pj-type-badge {
  position: absolute; top: 12px; right: 12px; z-index: 5;
  padding: 4px 12px; border-radius: 100px;
  font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  backdrop-filter: blur(8px); border: 1px solid;
}

/* image zone */
.pj-img-zone {
  position: relative; height: 200px; overflow: hidden;
  background: rgba(255,255,255,.02);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.pj-img-zone img { width:100%; height:100%; object-fit:cover; transition:transform .55s cubic-bezier(.22,1,.36,1); }
.pj-card:hover .pj-img-zone img { transform: scale(1.07); }
.pj-img-overlay { position:absolute; inset:0; background:linear-gradient(to bottom,transparent 40%,rgba(4,5,14,.9)); }

.pj-placeholder {
  width:100%; height:100%; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:10px;
  background:linear-gradient(145deg,rgba(var(--ca),.08),rgba(4,5,14,.4));
  transition:all .35s;
}
.pj-card:hover .pj-placeholder { background:linear-gradient(145deg,rgba(var(--ca),.16),rgba(4,5,14,.4)); }
.pj-ph-icon {
  font-size:52px; filter:drop-shadow(0 0 20px rgba(var(--ca),.4));
  transition:transform .35s cubic-bezier(.22,1,.36,1), filter .35s;
}
.pj-card:hover .pj-ph-icon { transform:scale(1.18) translateY(-6px); filter:drop-shadow(0 0 32px rgba(var(--ca),.65)); }
.pj-ph-lbl { font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:rgba(var(--ca),.6); font-weight:700; }

.pj-upload-hint {
  position:absolute; inset:0; background:rgba(4,5,14,.75);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
  opacity:0; transition:opacity .3s; backdrop-filter:blur(4px);
}
.pj-card:hover .pj-upload-hint { opacity:1; }
.pj-upload-hint svg { color:rgba(var(--ca),1); }
.pj-upload-hint span { font-size:12px; font-weight:700; color:rgba(241,241,255,.6); letter-spacing:.08em; }

/* ── NGROK TOOLTIP ── */
.pj-ngrok-tooltip {
  position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
  margin-bottom: 10px; z-index: 20;
  background: rgba(4,5,14,.96); border: 1px solid rgba(251,191,36,.35);
  border-radius: 12px; padding: 12px 16px;
  width: 260px; box-shadow: 0 8px 32px rgba(0,0,0,.6), 0 0 20px rgba(251,191,36,.08);
  backdrop-filter: blur(12px);
  pointer-events: none;
  opacity: 0; transition: opacity .2s, transform .2s;
  transform: translateX(-50%) translateY(6px);
}
.pj-ngrok-wrap:hover .pj-ngrok-tooltip {
  opacity: 1; transform: translateX(-50%) translateY(0);
}
.pj-ngrok-tooltip::after {
  content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
  border: 6px solid transparent; border-top-color: rgba(251,191,36,.35);
}
.pj-ngrok-title {
  font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase; color: #fbbf24; margin-bottom: 6px;
  display: flex; align-items: center; gap: 6px;
}
.pj-ngrok-dot { width: 6px; height: 6px; border-radius: 50%; background: #fbbf24; animation: pj-blink 1.4s ease infinite; }
.pj-ngrok-text { font-size: 12px; line-height: 1.6; color: rgba(241,241,255,.5); }
.pj-ngrok-step { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px; font-size: 11.5px; color: rgba(241,241,255,.4); }
.pj-ngrok-step span:first-child { color: #fbbf24; font-weight: 700; flex-shrink: 0; }

/* watch demo video btn on card */
.pj-btn-demo {
  padding: 10px 14px; border-radius: 10px; font-size: 12px; font-weight: 700;
  border: 1px solid rgba(var(--ca),.3); background: rgba(var(--ca),.08);
  color: rgb(var(--ca)); cursor: pointer; transition: all .25s cubic-bezier(.22,1,.36,1);
  display: flex; align-items: center; justify-content: center; gap: 5px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.pj-btn-demo:hover { background: rgba(var(--ca),.18); border-color: rgba(var(--ca),.5); transform: translateY(-2px); }

/* card body */
.pj-card-body { padding:22px 22px 20px; flex:1; display:flex; flex-direction:column; position:relative; z-index:1; }
.pj-card-title { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#f1f1ff; margin-bottom:8px; line-height:1.2; transition:color .25s; }
.pj-card:hover .pj-card-title { color:#fff; }
.pj-card-short { font-size:13px; line-height:1.65; color:rgba(241,241,255,.35); margin-bottom:16px; flex:1; }
.pj-card-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:18px; }
.pj-tag {
  padding:4px 10px; border-radius:6px; font-size:11px; font-weight:700; letter-spacing:.04em;
  background:rgba(var(--ca),.09); border:1px solid rgba(var(--ca),.2); color:rgb(var(--ca)); opacity:.85;
  transition:all .2s cubic-bezier(.22,1,.36,1);
}
.pj-tag:hover { background:rgba(var(--ca),.18); opacity:1; transform:translateY(-2px); }

/* card footer */
.pj-card-footer { display:flex; gap:8px; padding:0 22px 20px; position:relative; z-index:1; flex-wrap: wrap; }
.pj-btn-view {
  flex:1; padding:10px 16px; border-radius:10px; font-size:12.5px; font-weight:700;
  letter-spacing:.04em; border:none; cursor:pointer;
  background:linear-gradient(135deg,rgb(var(--ca)),rgba(var(--ca),.7));
  color:#fff; transition:all .28s cubic-bezier(.22,1,.36,1);
  font-family:'Plus Jakarta Sans',sans-serif;
  display:flex; align-items:center; justify-content:center; gap:6px;
  position:relative; overflow:hidden;
}
.pj-btn-view::before { content:''; position:absolute; inset:0; background:rgba(255,255,255,.12); opacity:0; transition:opacity .2s; }
.pj-btn-view:hover { box-shadow:0 10px 28px rgba(var(--ca),.42); transform:translateY(-2px); }
.pj-btn-view:hover::before { opacity:1; }
.pj-btn-view .pj-btn-arrow { transition:transform .25s cubic-bezier(.22,1,.36,1); display:inline-flex; }
.pj-btn-view:hover .pj-btn-arrow { transform:translateX(4px); }

.pj-btn-gh {
  padding:10px 14px; border-radius:10px; font-size:12px; font-weight:700;
  border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04);
  color:rgba(241,241,255,.5); cursor:pointer; transition:all .25s cubic-bezier(.22,1,.36,1);
  display:flex; align-items:center; justify-content:center; text-decoration:none;
}
.pj-btn-gh:hover { border-color:rgba(255,255,255,.25); color:#f1f1ff; background:rgba(255,255,255,.09); transform:translateY(-2px); }

/* status dot */
.pj-status { display:inline-flex; align-items:center; gap:5px; font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; margin-bottom:14px; }
.pj-status-dot { width:5px; height:5px; border-radius:50%; }
@keyframes pj-blink { 0%,100%{opacity:1} 50%{opacity:.2} }
.pj-status-dot.blink { animation:pj-blink 1.5s ease infinite; }

/* ── CODE MODAL ── */
.pj-code-modal-bg {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(4,5,14,.95); backdrop-filter: blur(20px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.pj-code-modal {
  width: 100%; max-width: 800px; max-height: 90vh;
  border-radius: 20px; background: #0d0e1f;
  border: 1px solid rgba(99,102,241,.2);
  box-shadow: 0 48px 120px rgba(0,0,0,.8), 0 0 60px rgba(99,102,241,.08);
  display: flex; flex-direction: column; overflow: hidden;
}
.pj-code-modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.02); flex-shrink: 0;
}
.pj-code-modal-title {
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: #a5b4fc;
  display: flex; align-items: center; gap: 8px;
}
.pj-code-modal-dots { display: flex; gap: 6px; }
.pj-code-modal-dot { width: 12px; height: 12px; border-radius: 50%; }
.pj-code-modal-body {
  overflow-y: auto; flex: 1; padding: 20px 24px;
}
.pj-code-modal-body::-webkit-scrollbar { width: 4px; }
.pj-code-modal-body::-webkit-scrollbar-track { background: transparent; }
.pj-code-modal-body::-webkit-scrollbar-thumb { background: rgba(99,102,241,.3); border-radius: 4px; }
.pj-code-pre {
  font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  font-size: 12.5px; line-height: 1.7; color: #c9d1d9;
  white-space: pre; tab-size: 2; margin: 0;
}
.pj-code-close {
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  color: rgba(241,241,255,.5); display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .2s; font-size: 16px;
}
.pj-code-close:hover { background: rgba(236,72,153,.2); border-color: rgba(236,72,153,.4); color: #f9a8d4; }
.pj-code-copy {
  padding: 6px 14px; border-radius: 8px;
  background: rgba(99,102,241,.15); border: 1px solid rgba(99,102,241,.3);
  color: #a5b4fc; font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: .08em; cursor: pointer; transition: all .2s;
}
.pj-code-copy:hover { background: rgba(99,102,241,.28); border-color: rgba(99,102,241,.5); }

/* syntax highlight colors */
.tok-kw  { color: #ff7b72; }
.tok-str { color: #a5d6ff; }
.tok-num { color: #79c0ff; }
.tok-fn  { color: #d2a8ff; }
.tok-cm  { color: #8b949e; font-style: italic; }
.tok-tag { color: #7ee787; }

/* ── MODAL ── */
.pj-modal-bg {
  position:fixed; inset:0; z-index:100;
  background:rgba(4,5,14,.88); backdrop-filter:blur(16px);
  display:flex; align-items:center; justify-content:center; padding:24px;
}
.pj-modal {
  width:100%; max-width:680px; max-height:90vh; overflow-y:auto;
  border-radius:28px; background:#09091a;
  border:1px solid rgba(255,255,255,.09);
  box-shadow:0 48px 120px rgba(0,0,0,.7), 0 0 0 1px rgba(var(--ca),.12);
  position:relative;
}
.pj-modal::-webkit-scrollbar { width:4px; }
.pj-modal::-webkit-scrollbar-track { background:transparent; }
.pj-modal::-webkit-scrollbar-thumb { background:rgba(99,102,241,.3); border-radius:4px; }
.pj-modal::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px; z-index:2; border-radius:28px 28px 0 0;
  background:linear-gradient(90deg,transparent,rgba(var(--ca),.7),transparent);
}
.pj-modal-img {
  height:260px; position:relative; overflow:hidden; border-radius:28px 28px 0 0;
  display:flex; align-items:center; justify-content:center;
}
.pj-modal-img img { width:100%; height:100%; object-fit:cover; }
.pj-modal-img-overlay { position:absolute; inset:0; background:linear-gradient(to bottom,transparent 50%,#09091a); }
.pj-modal-ph {
  width:100%; height:100%; display:flex; align-items:center; justify-content:center;
  font-size:72px; filter:drop-shadow(0 0 40px rgba(var(--ca),.5));
}
.pj-modal-upload {
  position:absolute; top:16px; right:16px; z-index:5;
  padding:8px 16px; border-radius:100px;
  background:rgba(4,5,14,.7); border:1px solid rgba(255,255,255,.15);
  color:rgba(241,241,255,.6); font-size:11px; font-weight:700; letter-spacing:.1em;
  cursor:pointer; backdrop-filter:blur(8px);
  display:flex; align-items:center; gap:6px; transition:all .2s;
}
.pj-modal-upload:hover { border-color:rgba(99,102,241,.5); color:#a5b4fc; background:rgba(99,102,241,.15); }

/* Watch Demo Video button on modal image */
.pj-modal-watch-demo {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 6;
  padding: 9px 20px; border-radius: 100px;
  background: rgba(4,5,14,.8); border: 1px solid rgba(var(--ca),.5);
  color: rgb(var(--ca)); font-size: 12px; font-weight: 700; letter-spacing: .1em;
  cursor: pointer; backdrop-filter: blur(10px);
  display: flex; align-items: center; gap: 7px; transition: all .25s;
  white-space: nowrap;
}
.pj-modal-watch-demo:hover {
  background: rgba(var(--ca),.18); border-color: rgb(var(--ca));
  box-shadow: 0 0 24px rgba(var(--ca),.3);
}
.pj-modal-watch-demo svg { flex-shrink: 0; }

.pj-modal-close {
  position:absolute; top:16px; left:16px; z-index:5;
  width:36px; height:36px; border-radius:50%;
  background:rgba(4,5,14,.7); border:1px solid rgba(255,255,255,.12);
  color:rgba(241,241,255,.5); display:flex; align-items:center; justify-content:center;
  cursor:pointer; backdrop-filter:blur(8px); transition:all .2s; font-size:18px;
}
.pj-modal-close:hover { background:rgba(236,72,153,.2); border-color:rgba(236,72,153,.4); color:#f9a8d4; transform:rotate(90deg); }

.pj-modal-body { padding:28px 32px 32px; }
.pj-modal-meta { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:16px; }
.pj-modal-type { padding:5px 14px; border-radius:100px; font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; border:1px solid; }
.pj-modal-title { font-family:'Syne',sans-serif; font-weight:800; font-size:28px; color:#f1f1ff; margin-bottom:12px; line-height:1.1; }
.pj-modal-desc { font-size:15px; line-height:1.75; color:rgba(241,241,255,.45); margin-bottom:24px; white-space: pre-line; }
.pj-modal-lbl { font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:rgba(241,241,255,.2); font-weight:700; margin-bottom:12px; }
.pj-modal-tags { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px; }
.pj-modal-tag {
  padding:6px 14px; border-radius:8px; font-size:12px; font-weight:700;
  background:rgba(var(--ca),.1); border:1px solid rgba(var(--ca),.25); color:rgb(var(--ca));
  transition:all .2s cubic-bezier(.22,1,.36,1);
}
.pj-modal-tag:hover { background:rgba(var(--ca),.2); transform:translateY(-2px); }
.pj-modal-btns { display:flex; gap:12px; flex-wrap:wrap; }
.pj-modal-btn-live {
  flex:1; padding:13px 20px; border-radius:12px;
  background:linear-gradient(135deg,rgb(var(--ca)),rgba(var(--ca),.7));
  color:#fff; font-family:'Syne',sans-serif; font-weight:700; font-size:13.5px;
  border:none; cursor:pointer; transition:all .28s cubic-bezier(.22,1,.36,1);
  display:flex; align-items:center; justify-content:center; gap:8px; text-decoration:none;
  position:relative; overflow:hidden;
}
.pj-modal-btn-live::before { content:''; position:absolute; inset:0; background:rgba(255,255,255,.1); opacity:0; transition:opacity .2s; }
.pj-modal-btn-live:hover { box-shadow:0 14px 36px rgba(var(--ca),.42); transform:translateY(-2px); }
.pj-modal-btn-live:hover::before { opacity:1; }
.pj-modal-btn-gh {
  padding:13px 20px; border-radius:12px;
  background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
  color:rgba(241,241,255,.6); font-family:'Syne',sans-serif; font-weight:700; font-size:13.5px;
  cursor:pointer; transition:all .25s cubic-bezier(.22,1,.36,1);
  display:flex; align-items:center; justify-content:center; gap:8px; text-decoration:none;
}
.pj-modal-btn-gh:hover { border-color:rgba(255,255,255,.25); color:#f1f1ff; background:rgba(255,255,255,.09); transform:translateY(-2px); }

.pj-modal-div { height:1px; background:linear-gradient(90deg,transparent,rgba(99,102,241,.2),transparent); margin:24px 0; }

.pj-error-toast {
  position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
  background: rgba(239,68,68,0.95); color: white; padding: 12px 24px;
  border-radius: 100px; font-size: 13px; font-weight: 700;
  box-shadow: 0 12px 40px rgba(0,0,0,.6); z-index: 20;
  display: flex; align-items: center; gap: 8px; white-space: nowrap;
  border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px);
}

/* ── SCROLL REVEAL ── */
.pj-reveal {
  opacity:0; transform:translateY(28px); filter:blur(5px);
  transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1), filter .8s;
}
.pj-reveal.vis { opacity:1; transform:translateY(0); filter:blur(0); }

/* ── RESPONSIVE ── */
@media (max-width:1024px) { .pj-grid-wrap { grid-template-columns:repeat(2,1fr); } }
@media (max-width:640px) {
  .pj-grid-wrap { grid-template-columns:1fr; padding:0 20px 80px; }
  .pj-hero { padding:110px 20px 40px; }
  .pj-filters { padding:0 20px 36px; }
  .pj-modal-body { padding:20px 20px 24px; }
  .pj-modal-img { height:200px; }
  .pj-float { display:none; }
}
`;

// ─── Simple syntax highlighter ─────────────────────────────────────────────
function highlightJS(code) {
  const keywords = /\b(import|export|default|from|const|let|var|return|if|else|function|class|new|this|async|await|try|catch|for|of|in|true|false|null|undefined|typeof|instanceof|extends|super)\b/g;
  const strings = /(["'`])(?:(?=(\\?))\2[\s\S])*?\1/g;
  const numbers = /\b(\d+(?:\.\d+)?)\b/g;
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  const fns = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g;

  let out = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  out = out.replace(comments, m => `<span class="tok-cm">${m}</span>`);
  out = out.replace(strings, m => `<span class="tok-str">${m}</span>`);
  out = out.replace(keywords, m => `<span class="tok-kw">${m}</span>`);
  out = out.replace(numbers, m => `<span class="tok-num">${m}</span>`);
  out = out.replace(fns, (m, name) => `<span class="tok-fn">${name}</span>(`);
  return out;
}

// ─── PAGE LOADER ──────────────────────────────────────────────────────────
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
          className="pj-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
        >
          <div className="pj-loader-scan" />
          <motion.div
            className="pj-loader-logo"
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
            <div className="pj-loader-bar-wrap">
              <div className="pj-loader-bar" style={{ width: `${pct}%` }} />
            </div>
            <div className="pj-loader-pct">{pct < 100 ? 'Loading' : 'Ready'} — {pct}%</div>
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

  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return;
    const dots = [];
    for (let i = 0; i < TRAIL_N; i++) {
      const d = document.createElement('div');
      d.className = 'pj-trail-dot';
      const sz = Math.max(2, 7 - i * .75), op = Math.max(.02, .28 - i * .028);
      const hue = 240 + i * 9, sat = 78 - i * 2;
      d.style.cssText = `width:${sz}px;height:${sz}px;opacity:${op};left:-300px;top:-300px;background:hsl(${hue},${sat}%,72%);`;
      document.body.appendChild(d);
      dots.push({ el: d, x: 0, y: 0 });
    }
    trailsRef.current = dots;
    return () => dots.forEach(d => d.el.remove());
  }, []);

  useEffect(() => {
    if (window.matchMedia('(hover:none)').matches) return;
    const LABELS = [
      { sel: '.pj-card', text: 'View Project' },
      { sel: '.pj-filter-btn', text: 'Filter' },
      { sel: '.pj-btn-view', text: 'Details →' },
      { sel: '.pj-btn-gh', text: 'GitHub' },
      { sel: '.pj-modal-btn-live', text: 'Live Demo' },
    ];
    const spawnBurst = (cx, cy) => {
      const pal = ['#6366f1', '#8b5cf6', '#ec4899', '#22d3ee', '#a78bfa', '#f9a8d4', '#67e8f9'];
      for (let i = 0; i < 14; i++) {
        const el = document.createElement('div'); el.className = 'pj-burst';
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
      const isText = !isBtn && !!el?.closest('p,h1,h2,h3,span:not(.pj-bdot):not(.pj-status-dot)');
      const isCard = !isBtn && !!el?.closest('.pj-card');
      const isInter = isBtn || isCard;
      const t = isText ? 'text' : isInter ? 'hov' : 'normal';
      if (t !== lastType) {
        cur.classList.toggle('hov', t === 'hov'); cur.classList.toggle('text-hov', t === 'text');
        curR?.classList.toggle('hov', t === 'hov'); curR?.classList.toggle('text-hov', t === 'text');
        halo?.classList.toggle('hov', t === 'hov');
        lastType = t;
      }
      document.querySelector('.pj-spotlight')?.style.setProperty('--mx', e.clientX + 'px');
      document.querySelector('.pj-spotlight')?.style.setProperty('--my', e.clientY + 'px');
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

// ─── PARALLAX HOOK ────────────────────────────────────────────────────────
function useParallax() {
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const floatRefs = useRef([]);
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      if (heroRef.current) { heroRef.current.style.transform = `translateY(${sy * .2}px)`; heroRef.current.style.opacity = `${1 - sy * .002}`; }
      if (heroBgRef.current) { heroBgRef.current.style.transform = `translateY(${sy * .42}px)`; }
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = FLOAT_SYMBOLS[i]?.depth ?? 0.3;
        el.style.transform = `translateY(${sy * depth * .5}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const setFloatRef = i => el => { floatRefs.current[i] = el; };
  return { heroRef, heroBgRef, setFloatRef };
}

// ─── 3D TILT CARD ─────────────────────────────────────────────────────────
const TiltCard = forwardRef(({ children, style, className, onClick, ...rest }, ref) => {
  const internalRef = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rX = useSpring(mx, { stiffness: 200, damping: 28 });
  const rY = useSpring(my, { stiffness: 200, damping: 28 });

  const onMove = e => {
    if (!internalRef.current) return;
    const r = internalRef.current.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - .5;
    const dy = (e.clientY - r.top) / r.height - .5;
    mx.set(dy * -10);
    my.set(dx * 10);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={className}
      style={{ ...style, rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

// ─── FULLSCREEN VIDEO PLAYER ──────────────────────────────────────────────
function FullscreenVideoPlayer({ src, accentColor, onClose }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    }
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const togglePlay = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
  };

  const onLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const onSeek = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = (parseFloat(e.target.value) / 100) * v.duration;
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(0,0,0,0.97)',
        backdropFilter: 'blur(24px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
          zIndex: 10,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: `rgb(${accentColor})` }}>
            <polygon points="5,3 19,12 5,21" />
          </svg>
          Demo Video
        </div>
        <button
          onClick={onClose}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 18,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(236,72,153,0.25)';
            e.currentTarget.style.borderColor = 'rgba(236,72,153,0.5)';
            e.currentTarget.style.color = '#f9a8d4';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
          }}
        >
          ✕
        </button>
      </div>

      {/* Video container */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 1100,
          borderRadius: 20,
          overflow: 'hidden',
          border: `1px solid rgba(${accentColor}, 0.25)`,
          boxShadow: `0 48px 120px rgba(0,0,0,0.9), 0 0 60px rgba(${accentColor}, 0.12)`,
          background: '#000',
          position: 'relative',
        }}
      >
        {/* Accent top line */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 2, zIndex: 2,
          background: `linear-gradient(90deg, transparent, rgba(${accentColor}, 0.8), transparent)`,
        }} />

        <video
          ref={videoRef}
          src={src}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => setPlaying(false)}
          onClick={togglePlay}
          playsInline
          style={{
            width: '100%',
            display: 'block',
            maxHeight: '72vh',
            objectFit: 'contain',
            cursor: 'pointer',
          }}
        />

        {/* Controls overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            padding: '32px 20px 18px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Progress bar */}
          <input
            type="range"
            value={progress}
            onChange={onSeek}
            min="0"
            max="100"
            step="0.1"
            style={{
              width: '100%',
              height: 4,
              cursor: 'pointer',
              accentColor: `rgb(${accentColor})`,
              borderRadius: 4,
            }}
          />

          {/* Controls row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: `rgba(${accentColor}, 0.2)`,
                border: `1px solid rgba(${accentColor}, 0.4)`,
                color: `rgb(${accentColor})`,
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `rgba(${accentColor}, 0.35)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `rgba(${accentColor}, 0.2)`; }}
            >
              {playing
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              }
            </button>

            {/* Time */}
            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 12,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.06em',
              flexShrink: 0,
            }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div style={{ flex: 1 }} />

            {/* ESC hint */}
            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 10,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              ESC to close
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CODE MODAL COMPONENT ─────────────────────────────────────────────────
function CodeModal({ code, onClose }) {
  const [copied, setCopied] = useState(false);
  const highlighted = highlightJS(code);

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      className="pj-code-modal-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="pj-code-modal"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="pj-code-modal-header">
          <div className="pj-code-modal-dots">
            <div className="pj-code-modal-dot" style={{ background: '#ff5f57' }} />
            <div className="pj-code-modal-dot" style={{ background: '#febc2e' }} />
            <div className="pj-code-modal-dot" style={{ background: '#28c840' }} />
          </div>
          <div className="pj-code-modal-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
            </svg>
            Calculator.jsx — Vault Calculator
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="pj-code-copy" onClick={copyCode}>
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
            <button className="pj-code-close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="pj-code-modal-body">
          <pre className="pj-code-pre" dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [images, setImages] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  // fullscreenVideo: null or { src, accent }
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mxR = useRef(0), myR = useRef(0);
  const observerRef = useRef(null);
  const elementsRef = useRef([]);

  const { curRef, curRRef, haloRef, labelRef } = useAdvancedCursor();
  const { heroRef, heroBgRef, setFloatRef } = useParallax();

  // inject styles
  useEffect(() => {
    const id = 'pj-v2';
    if (!document.getElementById(id)) {
      const el = document.createElement('style'); el.id = id; el.textContent = STYLES;
      document.head.appendChild(el);
    }
  }, []);

  // canvas
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); let W, H, nodes = [], t = 0;
    const ORBS = [{ x: .1, y: .2, c: '99,102,241', r: 420 }, { x: .88, y: .55, c: '139,92,246', r: 340 }, { x: .5, y: .05, c: '236,72,153', r: 240 }];
    class N {
      constructor() { this.x = Math.random() * W; this.y = Math.random() * H; this.vx = (Math.random() - .5) * .38; this.vy = (Math.random() - .5) * .38; this.r = Math.random() * 1.3 + .4; const P = [[99, 102, 241], [139, 92, 246], [236, 72, 153], [34, 211, 238]]; this.c = P[~~(Math.random() * 4)]; this.op = Math.random() * .38 + .1; }
      update() { const dx = mxR.current - this.x, dy = myR.current - this.y, d = Math.hypot(dx, dy); if (d < 160) { this.vx += dx / d * .012; this.vy += dy / d * .012; } const sp = Math.hypot(this.vx, this.vy); if (sp > .9) { this.vx = this.vx / sp * .9; this.vy = this.vy / sp * .9; } this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > W) this.vx *= -1; if (this.y < 0 || this.y > H) this.vy *= -1; }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${this.c},${this.op})`; ctx.fill(); }
    }
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; nodes = Array.from({ length: 80 }, () => new N()); };
    resize(); window.addEventListener('resize', resize);
    const loop = () => { ctx.clearRect(0, 0, W, H); t += .008; ORBS.forEach((o, i) => { const ox = (o.x + Math.sin(t + i) * .07) * W, oy = (o.y + Math.cos(t * 1.2 + i) * .06) * H; const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r); g.addColorStop(0, `rgba(${o.c},.1)`); g.addColorStop(1, `rgba(${o.c},0)`); ctx.beginPath(); ctx.arc(ox, oy, o.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); }); nodes.forEach((n, i) => { nodes.forEach((m, j) => { if (j <= i) return; const dx = n.x - m.x, dy = n.y - m.y, d = Math.hypot(dx, dy); if (d < 115) { ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.strokeStyle = `rgba(99,102,241,${.07 * (1 - d / 115)})`; ctx.lineWidth = .5; ctx.stroke(); } }); n.update(); n.draw(); }); rafRef.current = requestAnimationFrame(loop); };
    loop();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    const f = e => { mxR.current = e.clientX; myR.current = e.clientY; };
    window.addEventListener('mousemove', f, { passive: true });
    return () => window.removeEventListener('mousemove', f);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    observerRef.current = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }), { threshold: .08 });
    elementsRef.current.forEach(el => { if (el) observerRef.current.observe(el); });
    return () => observerRef.current?.disconnect();
  }, [loaded]);

  useEffect(() => {
    if (!modal) { setErrorMsg(null); setFullscreenVideo(null); }
  }, [modal]);

  const rr = useCallback(el => {
    if (el && !elementsRef.current.includes(el)) elementsRef.current.push(el);
    if (el && observerRef.current) observerRef.current.observe(el);
  }, [loaded]);

  const handleImageUpload = useCallback((projectId, e) => {
    e.stopPropagation();
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImages(prev => ({ ...prev, [projectId]: ev.target.result }));
    reader.readAsDataURL(file);
  }, []);

  const triggerUpload = useCallback((projectId, e) => {
    e.stopPropagation();
    document.getElementById(`upload-${projectId}`)?.click();
  }, []);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter);
  const fu = (d = 0) => ({ initial: { opacity: 0, y: 26, filter: 'blur(7px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: .72, delay: d, ease: [.22, 1, .36, 1] } });
  const getTypeStyle = t => {
    if (t === 'Full Stack') return { bg: 'rgba(52,211,153,.1)', bc: 'rgba(52,211,153,.3)', c: '#6ee7b7' };
    if (t === 'Mobile') return { bg: 'rgba(139,92,246,.1)', bc: 'rgba(139,92,246,.3)', c: '#c4b5fd' };
    return { bg: 'rgba(99,102,241,.1)', bc: 'rgba(99,102,241,.3)', c: '#a5b4fc' };
  };

  const onLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Header />

      {/* ═══ PAGE LOADER ═══ */}
      <PageLoader onDone={onLoaderDone} />

      <PageTransition>
        <div className="pj pj-bgrid">
          {/* ═══ CURSOR ═══ */}
          <div ref={curRef} className="pj-cur" />
          <div ref={curRRef} className="pj-curR" />
          <div ref={haloRef} className="pj-cur-halo" />
          <div ref={labelRef} className="pj-cur-label" />

          <div className="pj-spotlight" />
          <div className="pj-noise" />
          <canvas ref={canvasRef} className="pj-canvas" />

          {/* ═══ FLOATING SYMBOLS ═══ */}
          {FLOAT_SYMBOLS.map((f, i) => (
            <div key={i} ref={setFloatRef(i)} className="pj-float" style={{
              left: f.x, top: f.y, fontSize: f.sz, opacity: f.op,
              animation: `pj-float-sym ${f.dur}s ease-in-out ${i * 1.4}s infinite`,
            }}>{f.s}</div>
          ))}

          {/* ── HERO ── */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            <div ref={heroBgRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
              {[
                { top: '0%', left: '-5%', w: 500, c: '99,102,241', op: .07 },
                { bottom: '-10%', right: '-5%', w: 400, c: '139,92,246', op: .07 },
              ].map((o, i) => (
                <div key={i} style={{
                  position: 'absolute', borderRadius: '50%', filter: 'blur(60px)', width: o.w, height: o.w,
                  background: `radial-gradient(circle,rgba(${o.c},${o.op}) 0%,transparent 70%)`,
                  top: o.top, left: o.left, bottom: o.bottom, right: o.right, pointerEvents: 'none'
                }} />
              ))}
            </div>
            <div ref={heroRef} className="pj-hero">
              <motion.div className="pj-badge" {...fu(0)}>
                <span className="pj-bdot" />My Work
              </motion.div>
              <motion.h1 className="pj-title" {...fu(.1)}>
                <span className="pj-t1">THINGS I'VE</span>
                <span className="pj-t2">BUILT & SHIPPED</span>
              </motion.h1>
              <motion.p className="pj-sub" {...fu(.22)}>
                From concept to production — 14 real projects spanning mobile apps, full-stack systems and beautiful frontends.
              </motion.p>
              <motion.div className="pj-count-strip" {...fu(.32)}>
                <span><span className="pj-count-n">14</span> Projects</span>
                <span style={{ color: 'rgba(241,241,255,.12)' }}>|</span>
                <span><span className="pj-count-n">6</span> Full Stack</span>
              </motion.div>
            </div>
          </div>

          {/* ── FILTERS ── */}
          <motion.div className="pj-filters" {...fu(.44)}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`pj-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* ── GRID ── */}
          <div className="pj-grid-wrap">
            {filtered.map((proj, i) => (
              <TiltCard
                key={proj.id}
                ref={rr}
                className="pj-card pj-reveal"
                style={{ '--ca': proj.accent }}
                onClick={() => setModal(proj)}
              >
                {proj.featured && <div className="pj-featured-badge">Featured</div>}
                <div className="pj-type-badge" style={getTypeStyle(proj.type)}>
                  {proj.type}
                </div>
                <div className="pj-status" style={{ padding: '0 22px', paddingTop: '14px' }}>
                  <span className={`pj-status-dot ${proj.status === 'In Progress' || proj.status === 'IN progress' ? 'blink' : ''}`} style={{
                    background: proj.status === 'Completed' ? '#4ade80' : '#fbbf24',
                    boxShadow: proj.status === 'Completed' ? '0 0 8px rgba(74,222,128,.5)' : '0 0 8px rgba(251,191,36,.5)'
                  }} />
                  {proj.status}
                </div>
                <div className="pj-img-zone">
                  {images[proj.id] ? (
                    <>
                      <img src={images[proj.id]} alt={proj.title} />
                      <div className="pj-img-overlay" />
                    </>
                  ) : proj.image ? (
                    <>
                      <img src={proj.image} alt={proj.title} />
                      <div className="pj-img-overlay" />
                    </>
                  ) : (
                    <div className="pj-placeholder">
                      <div className="pj-ph-icon">{proj.placeholder}</div>
                      <div className="pj-ph-lbl">Project Image</div>
                      <div className="pj-upload-hint" onClick={e => triggerUpload(proj.id, e)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17,8 12,3 7,8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>Click to upload</span>
                      </div>
                      <input
                        id={`upload-${proj.id}`}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => handleImageUpload(proj.id, e)}
                      />
                    </div>
                  )}
                </div>
                <div className="pj-card-body">
                  <h3 className="pj-card-title">{proj.title}</h3>
                  <p className="pj-card-short">{proj.short}</p>
                  <div className="pj-card-tags">
                    {proj.tech.map(t => (
                      <span key={t} className="pj-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="pj-card-footer">
                  <button className="pj-btn-view">
                    <span>View Details</span>
                    <span className="pj-btn-arrow">→</span>
                  </button>

                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noreferrer"
                      className="pj-btn-demo"
                      onClick={e => e.stopPropagation()}
                      title="Live Demo"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15,3 21,3 21,9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Demo
                    </a>
                  )}

                  {proj.github && (
                    <a
                      href={Array.isArray(proj.github) ? proj.github[0] : proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="pj-btn-gh"
                      onClick={e => e.stopPropagation()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  )}
                </div>

                {proj.ngrokNote && (
                  <div className="pj-ngrok-wrap" style={{ position: 'absolute', bottom: 64, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      fontSize: '10px', color: 'rgba(251,191,36,.55)', fontWeight: '700',
                      letterSpacing: '.1em', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: '6px',
                      background: 'rgba(251,191,36,.06)', border: '1px solid rgba(251,191,36,.15)',
                      cursor: 'default',
                    }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block', animation: 'pj-blink 1.4s ease infinite' }} />
                      Backend via ngrok
                    </div>
                    <div className="pj-ngrok-tooltip">
                      <div className="pj-ngrok-title">
                        <span className="pj-ngrok-dot" />
                        Backend Access Required
                      </div>
                      <div className="pj-ngrok-step"><span>1.</span><span>Contact the owner to get the active ngrok URL</span></div>
                      <div className="pj-ngrok-step"><span>2.</span><span>Open the live app link</span></div>
                      <div style={{ marginTop: '8px', fontSize: '11px', color: 'rgba(241,241,255,.25)', borderTop: '1px solid rgba(255,255,255,.05)', paddingTop: '8px' }}>
                        ngrok backend is temporary — reach owner to check if it's live
                      </div>
                    </div>
                  </div>
                )}
              </TiltCard>
            ))}
          </div>

          {/* ── MODAL ── */}
          <AnimatePresence>
            {modal && (
              <motion.div
                className="pj-modal-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModal(null)}
              >
                <motion.div
                  className="pj-modal"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                  onClick={e => e.stopPropagation()}
                  style={{ '--ca': modal.accent }}
                >
                  {/* ── Modal image zone ── */}
                  <div className="pj-modal-img">
                    {images[modal.id] ? (
                      <>
                        <img src={images[modal.id]} alt={modal.title} />
                        <div className="pj-modal-img-overlay" />
                      </>
                    ) : modal.image ? (
                      <>
                        <img src={modal.image} alt={modal.title} />
                        <div className="pj-modal-img-overlay" />
                      </>
                    ) : (
                      <div className="pj-modal-ph">{modal.placeholder}</div>
                    )}

                    <button className="pj-modal-close" onClick={() => setModal(null)}>✕</button>

                    {/* Watch Demo Video button — only for projects with video */}
                    {modal.video && (
                      <button
                        className="pj-modal-watch-demo"
                        style={{ '--ca': modal.accent }}
                        onClick={e => {
                          e.stopPropagation();
                          setFullscreenVideo({ src: modal.video, accent: modal.accent });
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                        Watch Demo Video
                      </button>
                    )}

                    <button className="pj-modal-upload" onClick={e => triggerUpload(modal.id, e)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17,8 12,3 7,8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      Upload Image
                    </button>

                    <input
                      id={`upload-${modal.id}`}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={e => handleImageUpload(modal.id, e)}
                    />
                  </div>

                  <div className="pj-modal-body">
                    <div className="pj-modal-meta">
                      <div className="pj-modal-type" style={getTypeStyle(modal.type)}>
                        {modal.type}
                      </div>
                      <div className="pj-status">
                        <span className={`pj-status-dot ${modal.status === 'In Progress' || modal.status === 'IN progress' ? 'blink' : ''}`} style={{
                          background: modal.status === 'Completed' ? '#4ade80' : '#fbbf24',
                          boxShadow: modal.status === 'Completed' ? '0 0 8px rgba(74,222,128,.5)' : '0 0 8px rgba(251,191,36,.5)'
                        }} />
                        {modal.status}
                      </div>
                    </div>
                    <h2 className="pj-modal-title">{modal.title}</h2>
                    <p className="pj-modal-desc">{modal.desc}</p>
                    <div className="pj-modal-lbl">Technologies Used</div>
                    <div className="pj-modal-tags">
                      {modal.tech.map(t => (
                        <span key={t} className="pj-modal-tag">{t}</span>
                      ))}
                    </div>

                    {/* ngrok note in modal */}
                    {modal.ngrokNote && (
                      <div style={{
                        padding: '14px 18px', borderRadius: '12px',
                        background: 'rgba(251,191,36,.06)', border: '1px solid rgba(251,191,36,.2)',
                        marginBottom: '20px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block', animation: 'pj-blink 1.4s ease infinite', flexShrink: 0 }} />
                          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '11px', fontWeight: '700', letterSpacing: '.14em', textTransform: 'uppercase', color: '#fbbf24' }}>
                            Backend runs on ngrok
                          </span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(241,241,255,.4)', lineHeight: '1.7' }}>
                          <div style={{ marginBottom: '4px' }}>1. Contact the owner to get the active ngrok URL</div>
                          <div>2. Open the live app link above</div>
                        </div>
                      </div>
                    )}

                    <div className="pj-modal-btns">
                      {modal.live && (
                        <a href={modal.live} target="_blank" rel="noreferrer" className="pj-modal-btn-live">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15,3 21,3 21,9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          Live Demo
                        </a>
                      )}

                      {Array.isArray(modal.github) ? (
                        <>
                          <a href={modal.github[0]} target="_blank" rel="noreferrer" className="pj-modal-btn-gh">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            Backend
                          </a>
                          <a href={modal.github[1]} target="_blank" rel="noreferrer" className="pj-modal-btn-gh">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            Frontend
                          </a>
                        </>
                      ) : (
                        <a href={modal.github} target="_blank" rel="noreferrer" className="pj-modal-btn-gh">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>

                    <AnimatePresence>
                      {errorMsg && (
                        <motion.div
                          className="pj-error-toast"
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        >
                          {errorMsg}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CODE MODAL ── */}
          <AnimatePresence>
            {showCodeModal && (
              <CodeModal code={VAULT_CODE} onClose={() => setShowCodeModal(false)} />
            )}
          </AnimatePresence>

        </div>
        <Footer />
      </PageTransition>

      {/* ── FULLSCREEN VIDEO PLAYER — renders outside PageTransition so z-index works fully ── */}
      <AnimatePresence>
        {fullscreenVideo && (
          <FullscreenVideoPlayer
            src={fullscreenVideo.src}
            accentColor={fullscreenVideo.accent}
            onClose={() => setFullscreenVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}