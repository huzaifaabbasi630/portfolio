import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const CATEGORIES = [
  { id:'frontend', label:'Frontend', icon:'◈', accent:'90,58,43', glow:'#5A3A2B', skills:[
    { name:'React', icon:'⚛', level:92, desc:'Hooks, context, custom hooks, performance optimization', projects:['ShareHub','DevBoard','Weather App','Portfolio'] },
    { name:'JavaScript', icon:'⬡', level:90, desc:'ES6+, async/await, closures, DOM manipulation', projects:['ShareHub','DevBoard','Weather App'] },
    { name:'TypeScript', icon:'TS', level:85, desc:'Type safety, interfaces, generic types, robust coding', projects:['DevBoard','SnapURL'] },
    { name:'HTML / CSS', icon:'◫', level:95, desc:'Semantic HTML, Flexbox, Grid, animations', projects:['Portfolio','E-Commerce Website','Weather App'] },
    { name:'Tailwind CSS', icon:'◉', level:88, desc:'Utility-first, responsive design, custom config', projects:['DevBoard','SnapURL','ShareHub'] },
  ]},
  { id:'backend', label:'Backend', icon:'⬡', accent:'122,82,64', glow:'#7A5240', skills:[
    { name:'Node.js', icon:'🟢', level:85, desc:'Event loop, streams, file system, HTTP server', projects:['ShareHub','DevBoard','SnapURL','Weather App'] },
    { name:'Express', icon:'⚡', level:83, desc:'REST APIs, middleware, routing, error handling', projects:['ShareHub','DevBoard','SnapURL','Weather App'] },
    { name:'MongoDB', icon:'🍃', level:80, desc:'CRUD, aggregation, indexing, Mongoose ODM', projects:['ShareHub','AI Resume Analyzer','Auto Ustad'] },
    { name:'REST APIs', icon:'◈', level:87, desc:'Design patterns, authentication, versioning', projects:['DevBoard','SnapURL','Weather App','AI Resume Analyzer'] },
    { name:'JWT / Auth', icon:'🔐', level:78, desc:'Token-based auth, refresh tokens, role-based access', projects:['AI Resume Analyzer','ShareHub'] },
  ]},
  { id:'mobile', label:'Mobile Developer', icon:'📱', accent:'139,111,71', glow:'#8B6F47', skills:[
    { name:'React Native (CLI / Expo)', icon:'⚛', level:88, desc:'Cross-platform mobile apps for iOS and Android', projects:['Quran Academy','Weather App Mobile','Vault Calculator'] },
    { name:'JavaScript (ES6+)', icon:'⬡', level:90, desc:'Modern JavaScript features and best practices', projects:['Quran Academy','ShareHub','Weather App Mobile'] },
    { name:'TypeScript', icon:'TS', level:85, desc:'Type-safe development for enterprise apps', projects:['Quran Academy','Mobile Apps'] },
  ]},
  { id:'tools', label:'Tools & Other', icon:'⌘', accent:'166,140,110', glow:'#A68C6E', skills:[
    { name:'Git / GitHub', icon:'⎇', level:88, desc:'Branching, PRs, rebasing, collaboration workflows', projects:['All major projects'] },
    { name:'Vite', icon:'⚡', level:90, desc:'Fast builds, HMR, plugin ecosystem, optimization', projects:['Portfolio','DevBoard','Weather App'] },
    { name:'Vercel', icon:'▲', level:82, desc:'Deployment, CI/CD, edge functions, analytics', projects:['DevBoard','SnapURL','Weather App'] },
    { name:'Socket.io', icon:'⟳', level:70, desc:'Real-time bidirectional communication, rooms', projects:['ShareHub','Auto Ustad'] },
    { name:'Postman', icon:'◉', level:85, desc:'API testing, collections, environment variables', projects:['DevBoard','SnapURL','AI Resume Analyzer'] },
    { name:'Bootstrap', icon:'🅱', level:90, desc:'Responsive grid, prebuilt components, utilities', projects:['E-Commerce Website','Assignments'] },
  ]},
];

const TECH_ICONS = [
  ['⚛','React','90,58,43'],['🟢','Node.js','122,82,64'],['🍃','MongoDB','90,58,43'],['⬡','JavaScript','139,111,71'],
  ['TS','TypeScript','122,82,64'],['◉','Tailwind','90,58,43'],['⟳','Socket.io','139,111,71'],['▲','Vercel','90,58,43'],
  ['⎇','Git','122,82,64'],['◫','HTML/CSS','139,111,71'],['📱','React Native','90,58,43'],['⚡','Express','122,82,64'],
];

const WORKFLOW = [
  { n:'01', title:'Idea & UX', icon:'✦', text:'Understand the problem, shape the experience and define the core user flow.', skills:['HTML / CSS','React','Bootstrap'] },
  { n:'02', title:'Build the UI', icon:'◈', text:'Turn the idea into responsive interfaces with reusable components and motion.', skills:['React','JavaScript','Tailwind CSS'] },
  { n:'03', title:'Connect the Backend', icon:'⌘', text:'Create APIs, authentication, business logic and reliable data flows.', skills:['Node.js','Express','REST APIs','JWT / Auth'] },
  { n:'04', title:'Data & Realtime', icon:'◉', text:'Persist data and add realtime communication when the product needs it.', skills:['MongoDB','Socket.io'] },
  { n:'05', title:'Test & Ship', icon:'↗', text:'Test endpoints, manage code with Git and deploy the finished product.', skills:['Postman','Git / GitHub','Vercel','Vite'] },
];

const LEARNING = [
  { name:'WebRTC', level:68, icon:'◌', text:'Peer-to-peer audio/video and realtime connectivity' },
  { name:'Firebase', level:72, icon:'✦', text:'Auth, notifications and cloud-backed application flows' },
  { name:'System Design', level:45, icon:'⌘', text:'Scalable architecture, caching and production patterns' },
  { name:'Advanced TypeScript', level:60, icon:'TS', text:'Deeper generics, architecture and type-safe patterns' },
];

const BADGES = [
  { icon:'⚛', title:'React Builder', text:'Builds component-driven interfaces with React.' },
  { icon:'⚡', title:'API Builder', text:'Creates and connects practical REST APIs.' },
  { icon:'📱', title:'Mobile Maker', text:'Works across React Native and Expo.' },
  { icon:'⟳', title:'Realtime', text:'Explores realtime apps with Socket.io and WebRTC.' },
  { icon:'🗄', title:'Data Driven', text:'Works with MongoDB and structured data flows.' },
  { icon:'🚀', title:'Ship It', text:'Uses GitHub and modern deployment workflows.' },
];

const FLOAT_SYMBOLS = [
  {s:'</>',x:'4%',y:'13%',sz:14,dur:14},{s:'{ }',x:'91%',y:'10%',sz:15,dur:17},{s:'=>',x:'88%',y:'46%',sz:13,dur:19},
  {s:'===',x:'5%',y:'57%',sz:11,dur:20},{s:'[ ]',x:'80%',y:'78%',sz:11,dur:15},{s:'//',x:'14%',y:'82%',sz:12,dur:13}
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
:root{--sk-bg:#FBF2E6;--sk-ink:#5A3A2B;--sk-muted:rgba(90,58,43,.58);--sk-line:rgba(90,58,43,.13);--sk-card:rgba(255,255,255,.58)}
.sk,.sk *{box-sizing:border-box}.sk{min-height:100vh;background:var(--sk-bg);color:var(--sk-ink);font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;position:relative}.sk button{font:inherit}.sk button,.sk a{cursor:pointer}
.sk-grid-bg{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(90,58,43,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(90,58,43,.025) 1px,transparent 1px);background-size:56px 56px}.sk-grid-bg:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(255,255,255,.7),transparent 48%)}
.sk-noise{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.025;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.75' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.sk-canvas{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:.42}.sk-spot{position:fixed;inset:0;pointer-events:none;z-index:2;background:radial-gradient(620px circle at var(--mx,50%) var(--my,50%),rgba(90,58,43,.055),transparent 70%)}
.sk-content{position:relative;z-index:3}.sk-float{position:absolute;z-index:1;color:rgba(90,58,43,.07);font-family:monospace;pointer-events:none;animation:sk-float 14s ease-in-out infinite}@keyframes sk-float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-22px) rotate(3deg)}}
.sk-loader{position:fixed;inset:0;background:var(--sk-bg);z-index:99999;display:grid;place-items:center}.sk-loader-inner{text-align:center}.sk-loader-logo{font:800 clamp(42px,8vw,72px) 'Syne';letter-spacing:-.06em}.sk-loader-bar{height:2px;width:min(300px,70vw);background:rgba(90,58,43,.1);margin:22px auto 10px;overflow:hidden}.sk-loader-fill{height:100%;background:linear-gradient(90deg,#5A3A2B,#8B6F47,#7A5240);transition:width .08s}.sk-loader-text{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(90,58,43,.45)}
.sk-hero{min-height:620px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:110px 24px 70px;position:relative}.sk-orb{position:absolute;border-radius:50%;filter:blur(65px);pointer-events:none}.sk-orb.a{width:440px;height:440px;left:-180px;top:90px;background:radial-gradient(circle,rgba(90,58,43,.09),transparent 70%)}.sk-orb.b{width:400px;height:400px;right:-180px;bottom:10px;background:radial-gradient(circle,rgba(139,111,71,.09),transparent 70%)}
.sk-badge{position:relative;display:inline-flex;align-items:center;gap:9px;padding:9px 18px;border:1px solid rgba(90,58,43,.2);border-radius:999px;background:rgba(255,255,255,.42);backdrop-filter:blur(12px);font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;margin-bottom:24px;box-shadow:0 10px 35px rgba(90,58,43,.04)}.sk-dot{width:7px;height:7px;border-radius:50%;background:#5A3A2B;box-shadow:0 0 0 0 rgba(90,58,43,.3);animation:sk-pulse 2s infinite}@keyframes sk-pulse{50%{box-shadow:0 0 0 8px rgba(90,58,43,0)}}
.sk-title{font:800 clamp(44px,8vw,86px)/.9 'Syne';letter-spacing:-.065em;margin:0;color:var(--sk-ink)}.sk-title span{display:block}.sk-title .accent{background:linear-gradient(90deg,#5A3A2B,#8B6F47,#7A5240,#5A3A2B);background-size:300%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sk-shine 8s linear infinite}@keyframes sk-shine{to{background-position:300%}}
.sk-sub{max-width:620px;margin:25px auto 30px;color:var(--sk-muted);line-height:1.8;font-size:14px}.sk-counts{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.sk-count{padding:11px 18px;border:1px solid var(--sk-line);background:rgba(255,255,255,.5);border-radius:999px;font-size:12px;color:var(--sk-muted);backdrop-filter:blur(12px)}.sk-count strong{font:800 18px 'Syne';color:var(--sk-ink);margin-right:5px}
.sk-section{max-width:1160px;margin:auto;padding:0 28px 100px}.sk-section-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin:0 0 28px}.sk-eyebrow{font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:rgba(90,58,43,.42)}.sk-h2{font:800 clamp(28px,4vw,44px)/1 'Syne';letter-spacing:-.04em;margin:7px 0 0}.sk-lead{max-width:440px;font-size:12px;line-height:1.7;color:var(--sk-muted);text-align:right}
.sk-tech-wall{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:0 auto 90px}.sk-tech{min-width:92px;padding:14px 13px;border:1px solid var(--sk-line);background:rgba(255,255,255,.48);border-radius:17px;text-align:center;backdrop-filter:blur(12px);transition:.35s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden}.sk-tech:before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent 35%,rgba(255,255,255,.55),transparent 65%);transform:translateX(-120%)}.sk-tech:hover{transform:translateY(-8px) scale(1.05);border-color:rgba(var(--tc),.38);box-shadow:0 18px 42px rgba(var(--tc),.14)}.sk-tech:hover:before{transform:translateX(120%);transition:.65s}.sk-tech-icon{font-size:25px;font-weight:800;display:block;margin-bottom:6px}.sk-tech-label{font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:rgba(90,58,43,.5)}
.sk-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:26px}.sk-tab{border:1px solid var(--sk-line);background:rgba(255,255,255,.48);color:var(--sk-muted);padding:11px 16px;border-radius:999px;font-size:11px;font-weight:800;transition:.3s}.sk-tab:hover{transform:translateY(-2px);color:var(--sk-ink);border-color:rgba(90,58,43,.3)}.sk-tab.active{background:#5A3A2B;color:#fff;border-color:#5A3A2B;box-shadow:0 10px 25px rgba(90,58,43,.18)}.sk-tab b{margin-left:6px;opacity:.65}
.sk-category{padding:26px;border:1px solid var(--sk-line);border-radius:28px;background:rgba(255,255,255,.35);backdrop-filter:blur(18px);box-shadow:0 20px 70px rgba(90,58,43,.04);overflow:hidden}.sk-cat-top{display:flex;align-items:center;gap:14px;margin-bottom:24px}.sk-cat-icon{width:52px;height:52px;display:grid;place-items:center;border-radius:16px;background:rgba(var(--ca),.1);border:1px solid rgba(var(--ca),.25);font-size:22px;color:rgb(var(--ca));box-shadow:0 10px 30px rgba(var(--ca),.12)}.sk-cat-name{font:800 24px 'Syne'}.sk-cat-small{font-size:11px;color:var(--sk-muted);margin-top:3px}.sk-avg{margin-left:auto;padding:6px 12px;border-radius:999px;background:rgba(var(--ca),.08);color:rgb(var(--ca));font-size:10px;font-weight:800;letter-spacing:.08em}
.sk-skills-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}.sk-card{position:relative;padding:22px;border:1px solid var(--sk-line);border-radius:21px;background:rgba(255,255,255,.58);overflow:hidden;transform-style:preserve-3d;transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .35s;cursor:pointer}.sk-card:hover{transform:translateY(-7px) rotateX(2deg) rotateY(-1deg);box-shadow:0 25px 55px rgba(90,58,43,.09);border-color:rgba(var(--ca),.3)}.sk-card:after{content:'';position:absolute;width:210px;height:210px;border-radius:50%;left:var(--sx,50%);top:var(--sy,50%);transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(var(--ca),.12),transparent 67%);pointer-events:none;opacity:0;transition:opacity .25s}.sk-card:hover:after{opacity:1}.sk-card-top{display:flex;gap:13px;align-items:center;position:relative;z-index:1}.sk-icon{width:45px;height:45px;display:grid;place-items:center;border-radius:14px;background:rgba(var(--ca),.1);border:1px solid rgba(var(--ca),.18);font-size:19px;font-weight:800;flex:none;transition:.35s}.sk-card:hover .sk-icon{transform:rotate(-7deg) scale(1.1);box-shadow:0 0 25px rgba(var(--ca),.2)}.sk-card-name{font:800 16px 'Syne'}.sk-card-desc{font-size:10.5px;line-height:1.5;color:var(--sk-muted);margin-top:3px}.sk-pct{margin-left:auto;font:800 21px 'Syne';color:rgb(var(--ca))}.sk-bar{height:7px;border-radius:999px;background:rgba(90,58,43,.08);margin:20px 0 9px;overflow:hidden}.sk-fill{height:100%;border-radius:inherit;transform-origin:left;transform:scaleX(0);background:linear-gradient(90deg,rgba(var(--ca),.42),rgb(var(--ca)));transition:transform 1.1s cubic-bezier(.22,1,.36,1)}.sk-card.in .sk-fill{transform:scaleX(1)}.sk-meta{display:flex;justify-content:space-between;font-size:9px;color:rgba(90,58,43,.4);text-transform:uppercase;letter-spacing:.12em;font-weight:700}.sk-card-action{margin-top:14px;font-size:9px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:rgb(var(--ca));opacity:0;transform:translateY(5px);transition:.3s}.sk-card:hover .sk-card-action{opacity:1;transform:none}
.sk-creative{margin-top:80px}.sk-panel{border:1px solid var(--sk-line);border-radius:28px;background:rgba(255,255,255,.43);backdrop-filter:blur(18px);overflow:hidden;box-shadow:0 20px 70px rgba(90,58,43,.04)}.sk-panel-head{padding:28px 30px 20px}.sk-panel-title{font:800 26px 'Syne'}.sk-panel-desc{font-size:11px;color:var(--sk-muted);line-height:1.7;margin-top:6px}
.sk-flow{padding:10px 30px 34px;display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.sk-flow-step{position:relative;padding:20px 15px;border:1px solid var(--sk-line);border-radius:19px;background:rgba(255,255,255,.48);min-height:205px;transition:.35s}.sk-flow-step:hover{transform:translateY(-8px);border-color:rgba(90,58,43,.25);box-shadow:0 20px 40px rgba(90,58,43,.07)}.sk-flow-num{font:800 10px 'Syne';color:rgba(90,58,43,.32)}.sk-flow-icon{font-size:26px;margin:25px 0 12px}.sk-flow-title{font:800 14px 'Syne'}.sk-flow-text{font-size:10px;line-height:1.55;color:var(--sk-muted);margin:6px 0 12px}.sk-flow-skills{display:flex;flex-wrap:wrap;gap:4px}.sk-mini{padding:4px 6px;border-radius:7px;background:rgba(90,58,43,.06);font-size:7px;font-weight:800;color:rgba(90,58,43,.52)}
.sk-proof{display:grid;grid-template-columns:1.1fr .9fr;gap:18px;margin-top:18px}.sk-radar-wrap,.sk-proof-list{padding:28px;border:1px solid var(--sk-line);border-radius:26px;background:rgba(255,255,255,.48);backdrop-filter:blur(16px)}.sk-proof-title{font:800 21px 'Syne';margin-bottom:5px}.sk-proof-sub{font-size:10px;color:var(--sk-muted);margin-bottom:18px}.sk-radar{width:min(100%,360px);display:block;margin:0 auto}.sk-radar text{font:800 9px 'Plus Jakarta Sans';fill:rgba(90,58,43,.55)}.sk-proof-item{padding:15px 0;border-bottom:1px solid rgba(90,58,43,.08);display:flex;gap:12px;align-items:center}.sk-proof-item:last-child{border-bottom:0}.sk-proof-dot{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:rgba(90,58,43,.07);font-weight:800}.sk-proof-name{font:800 12px 'Syne'}.sk-proof-desc{font-size:9px;color:var(--sk-muted);margin-top:2px}.sk-proof-pct{margin-left:auto;font:800 15px 'Syne'}
.sk-badges{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 30px 30px}.sk-badge-card{padding:19px;border:1px solid var(--sk-line);border-radius:19px;background:rgba(255,255,255,.46);transition:.3s}.sk-badge-card:hover{transform:translateY(-6px) rotate(-1deg);box-shadow:0 18px 40px rgba(90,58,43,.07)}.sk-badge-icon{font-size:25px}.sk-badge-title{font:800 13px 'Syne';margin-top:10px}.sk-badge-text{font-size:9px;line-height:1.55;color:var(--sk-muted);margin-top:4px}
.sk-learning{margin-top:18px;padding:28px;border:1px solid var(--sk-line);border-radius:26px;background:rgba(255,255,255,.48)}.sk-learning-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:18px}.sk-learn-card{padding:17px;border-radius:18px;background:rgba(255,255,255,.52);border:1px solid rgba(90,58,43,.1)}.sk-learn-top{display:flex;align-items:center;gap:8px}.sk-learn-icon{font-weight:800}.sk-learn-name{font:800 12px 'Syne'}.sk-learn-pct{margin-left:auto;font-size:10px;font-weight:800}.sk-learn-text{font-size:9px;color:var(--sk-muted);line-height:1.5;margin:8px 0}.sk-learn-bar{height:5px;background:rgba(90,58,43,.08);border-radius:99px;overflow:hidden}.sk-learn-fill{height:100%;background:#8B6F47;border-radius:99px}
.sk-universe{margin-top:80px}.sk-universe-box{position:relative;min-height:470px;border:1px solid var(--sk-line);border-radius:30px;background:radial-gradient(circle at center,rgba(255,255,255,.72),rgba(255,255,255,.35));overflow:hidden}.sk-universe-title{position:absolute;left:28px;top:24px;z-index:2}.sk-universe-title h3{font:800 24px 'Syne';margin:4px 0}.sk-universe-title p{font-size:10px;color:var(--sk-muted);max-width:280px;line-height:1.5}.sk-universe-svg{width:100%;height:470px}.sk-node{cursor:pointer;transition:.25s}.sk-node circle{fill:rgba(255,255,255,.85);stroke:rgba(90,58,43,.18);stroke-width:1.5;transition:.3s}.sk-node.active circle,.sk-node:hover circle{fill:#5A3A2B;stroke:#5A3A2B;filter:drop-shadow(0 0 13px rgba(90,58,43,.28))}.sk-node text{font:800 9px 'Plus Jakarta Sans';fill:#5A3A2B;pointer-events:none}.sk-node.active text,.sk-node:hover text{fill:#fff}.sk-edge{stroke:rgba(90,58,43,.12);stroke-width:1;transition:.3s}.sk-edge.hot{stroke:rgba(90,58,43,.55);stroke-width:1.8}.sk-universe-hint{position:absolute;right:26px;bottom:22px;font-size:9px;color:rgba(90,58,43,.38);letter-spacing:.1em;text-transform:uppercase}
.sk-modal-back{position:fixed;inset:0;background:rgba(55,32,23,.32);backdrop-filter:blur(12px);z-index:9990;display:grid;place-items:center;padding:20px}.sk-modal{width:min(600px,100%);max-height:min(700px,90vh);overflow:auto;background:#FBF2E6;border:1px solid rgba(255,255,255,.7);border-radius:28px;box-shadow:0 35px 100px rgba(55,32,23,.25);padding:28px}.sk-modal-top{display:flex;align-items:center;gap:13px}.sk-close{margin-left:auto;border:1px solid var(--sk-line);background:rgba(255,255,255,.6);width:36px;height:36px;border-radius:50%;color:var(--sk-ink)}.sk-modal h3{font:800 28px 'Syne';margin:22px 0 6px}.sk-modal p{font-size:12px;line-height:1.7;color:var(--sk-muted)}.sk-related{display:flex;flex-wrap:wrap;gap:7px;margin-top:18px}.sk-related span{padding:8px 10px;border-radius:10px;background:rgba(90,58,43,.06);font-size:9px;font-weight:800}.sk-modal-bar{height:9px;border-radius:99px;background:rgba(90,58,43,.08);margin:20px 0 7px;overflow:hidden}.sk-modal-fill{height:100%;border-radius:inherit;background:linear-gradient(90deg,#5A3A2B,#8B6F47)}
@media(max-width:900px){.sk-flow{grid-template-columns:repeat(2,1fr)}.sk-learning-grid{grid-template-columns:repeat(2,1fr)}.sk-proof{grid-template-columns:1fr}.sk-badges{grid-template-columns:repeat(2,1fr)}}
@media(max-width:700px){.sk-hero{min-height:560px;padding-top:100px}.sk-section{padding:0 17px 70px}.sk-section-head{display:block}.sk-lead{text-align:left;margin-top:10px}.sk-skills-grid{grid-template-columns:1fr}.sk-category{padding:18px}.sk-flow{grid-template-columns:1fr}.sk-learning-grid{grid-template-columns:1fr}.sk-badges{grid-template-columns:1fr;padding:0 18px 20px}.sk-panel-head{padding:22px 18px}.sk-universe-box{min-height:430px}.sk-universe-svg{height:430px}.sk-universe-title{left:18px;top:18px}.sk-universe-title h3{font-size:20px}.sk-universe-title p{max-width:210px}.sk-tech{min-width:76px;padding:11px 9px}.sk-tech-label{font-size:8px}.sk-tech-icon{font-size:20px}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}.sk-canvas{display:none}}
`;

function getLevelLabel(n){if(n>=90)return'Expert';if(n>=80)return'Advanced';if(n>=70)return'Proficient';return'Learning'}
function CountUp({target,active}){const[v,setV]=useState(0);useEffect(()=>{if(!active)return;let st=null;let raf;const step=t=>{if(!st)st=t;const p=Math.min((t-st)/1100,1);setV(Math.round((1-Math.pow(1-p,3))*target));if(p<1)raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step);return()=>cancelAnimationFrame(raf)},[target,active]);return <strong>{v}</strong>}
function Loader({onDone}){const[p,setP]=useState(0);useEffect(()=>{let v=0;const id=setInterval(()=>{v+=2;setP(v);if(v>=100){clearInterval(id);setTimeout(onDone,420)}},18);return()=>clearInterval(id)},[onDone]);return <AnimatePresence>{p<100&&<motion.div className="sk-loader" initial={{opacity:1}} exit={{opacity:0}}><div className="sk-loader-inner"><div className="sk-loader-logo">HMH</div><div className="sk-loader-bar"><div className="sk-loader-fill" style={{width:`${p}%`}}/></div><div className="sk-loader-text">Building skill system — {p}%</div></div></motion.div>}</AnimatePresence>}
function SkillCard({skill,accent,isTop,onOpen}){const ref=useRef(null);const[vis,setVis]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>e.isIntersecting&&setVis(true),{threshold:.15});if(ref.current)o.observe(ref.current);return()=>o.disconnect()},[]);const move=e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--sx',`${e.clientX-r.left}px`);e.currentTarget.style.setProperty('--sy',`${e.clientY-r.top}px`)};return <motion.div ref={ref} className={`sk-card ${vis?'in':''}`} style={{'--ca':accent}} onMouseMove={move} onClick={()=>onOpen(skill)} whileTap={{scale:.985}}>{isTop&&<div style={{position:'absolute',right:14,top:14,fontSize:8,fontWeight:800,letterSpacing:'.1em',textTransform:'uppercase',padding:'5px 8px',borderRadius:99,background:'#5A3A2B',color:'#fff',zIndex:2}}>★ Top Skill</div>}<div className="sk-card-top"><div className="sk-icon">{skill.icon}</div><div><div className="sk-card-name">{skill.name}</div><div className="sk-card-desc">{skill.desc}</div></div><div className="sk-pct">{skill.level}%</div></div><div className="sk-bar"><div className="sk-fill" style={{width:`${skill.level}%`}}/></div><div className="sk-meta"><span>{getLevelLabel(skill.level)}</span><span>{skill.projects.length} project{skill.projects.length>1?'s':''}</span></div><div className="sk-card-action">Explore skill →</div></motion.div>}
function Radar({data}){const cx=180,cy=180,r=125;const pts=(scale)=>data.map((d,i)=>{const a=-Math.PI/2+i*2*Math.PI/data.length;return [cx+Math.cos(a)*r*scale,cy+Math.sin(a)*r*scale]});const poly=p=>p.map(x=>x.join(',')).join(' ');return <svg className="sk-radar" viewBox="0 0 360 360"><g>{[.25,.5,.75,1].map((s,i)=><polygon key={i} points={poly(pts(s))} fill="none" stroke="rgba(90,58,43,.09)" strokeWidth="1"/>)}{data.map((d,i)=>{const a=-Math.PI/2+i*2*Math.PI/data.length;return <line key={d.label} x1={cx} y1={cy} x2={cx+Math.cos(a)*r} y2={cy+Math.sin(a)*r} stroke="rgba(90,58,43,.08)"/>})}<polygon points={poly(data.map((d,i)=>{const a=-Math.PI/2+i*2*Math.PI/data.length;return [cx+Math.cos(a)*r*d.value,cy+Math.sin(a)*r*d.value]}))} fill="rgba(90,58,43,.13)" stroke="#5A3A2B" strokeWidth="2"/></g>{data.map((d,i)=>{const a=-Math.PI/2+i*2*Math.PI/data.length;return <text key={d.label} x={cx+Math.cos(a)*(r+22)} y={cy+Math.sin(a)*(r+22)} textAnchor="middle" dominantBaseline="middle">{d.label}</text>})}</svg>}
function Universe({skills,onOpen}){const nodes=[...skills.slice(0,10),{name:'APIs',icon:'◈',level:87,projects:['Core']},{name:'Deploy',icon:'↗',level:82,projects:['Core']}];const pos=[[50,50],[25,28],[76,28],[18,58],[38,78],[62,77],[83,57],[38,45],[62,45],[50,25],[50,76],[50,56]];const edges=[[0,1],[0,2],[0,7],[0,8],[0,9],[0,10],[0,11],[1,3],[1,7],[2,6],[2,8],[3,4],[4,10],[5,10],[5,6],[6,2],[7,8],[8,11],[9,2],[10,11]];const[active,setActive]=useState(null);return <div className="sk-universe-box"><div className="sk-universe-title"><div className="sk-eyebrow">Interactive map</div><h3>Skill Universe</h3><p>Hover or click a node to see how the technologies connect.</p></div><svg className="sk-universe-svg" viewBox="0 0 100 100" preserveAspectRatio="none">{edges.map(([a,b],i)=><line key={i} className={`sk-edge ${active!==null&&(a===active||b===active)?'hot':''}`} x1={pos[a][0]} y1={pos[a][1]} x2={pos[b][0]} y2={pos[b][1]}/>) }{nodes.map((n,i)=><g key={`${n.name}-${i}`} className={`sk-node ${active===i?'active':''}`} onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)} onClick={()=>onOpen(n)}><circle cx={pos[i][0]} cy={pos[i][1]} r={i===0?6.5:4.5}/><text x={pos[i][0]} y={pos[i][1]+.7} textAnchor="middle" dominantBaseline="middle" fontSize={i===0?2.1:1.65}>{i===0?'CORE':n.name.length>14?n.name.split(' ')[0]:n.name}</text></g>)}</svg><div className="sk-universe-hint">01 — click a node</div></div>}
function SkillModal({skill,onClose}){useEffect(()=>{const f=e=>e.key==='Escape'&&onClose();window.addEventListener('keydown',f);return()=>window.removeEventListener('keydown',f)},[onClose]);return <motion.div className="sk-modal-back" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>e.target===e.currentTarget&&onClose()}><motion.div className="sk-modal" initial={{y:35,scale:.96,opacity:0}} animate={{y:0,scale:1,opacity:1}} exit={{y:20,scale:.98,opacity:0}}><div className="sk-modal-top"><div className="sk-icon" style={{'--ca':'90,58,43'}}>{skill.icon}</div><div><div className="sk-eyebrow">Skill detail</div><div style={{fontWeight:800,fontFamily:'Syne',fontSize:15}}>{getLevelLabel(skill.level)}</div></div><button className="sk-close" onClick={onClose}>×</button></div><h3>{skill.name}</h3><p>{skill.desc}. This skill is part of the development toolkit used across practical portfolio work.</p><div className="sk-modal-bar"><div className="sk-modal-fill" style={{width:`${skill.level}%`}}/></div><div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'rgba(90,58,43,.45)',fontWeight:800}}><span>PROFICIENCY</span><span>{skill.level}%</span></div><div style={{marginTop:25,font:'800 14px Syne'}}>Where it connects</div><div className="sk-related">{skill.projects.map(p=><span key={p}>{p}</span>)}</div></motion.div></motion.div>}

export default function Skills() {
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState('frontend');
  const [selected, setSelected] = useState(null);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  
  const active = CATEGORIES.find(c => c.id === tab) || CATEGORIES[0];
  const allSkills = useMemo(() => CATEGORIES.flatMap(c => c.skills), []);
  const totalSkills = allSkills.length;
  const top = active.skills.reduce((a, b) => (b.level > a.level ? b : a), active.skills[0]);
  const avg = Math.round(active.skills.reduce((a, s) => a + s.level, 0) / active.skills.length);
  
  const radar = CATEGORIES.map(c => ({
    label: c.label === 'Mobile Developer' ? 'Mobile' : c.label === 'Tools & Other' ? 'Tools' : c.label,
    value: c.skills.reduce((a, s) => a + s.level, 0) / c.skills.length / 100
  }));

  const fu = (d = 0) => ({
    initial: { opacity: 0, y: 25, filter: 'blur(7px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0)' },
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] }
  });

  const onDone = useCallback(() => setLoaded(true), []);

  // Fixed useEffect 1 (Style Injection)
  useEffect(() => {
    const id = 'skills-v3';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = STYLES;
      document.head.appendChild(s);
    }
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  // Fixed useEffect 2 (Canvas Background)
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let w = 0, h = 0, raf;
    const dots = [];

    const resize = () => {
      w = c.width = innerWidth;
      h = c.height = innerHeight;
      dots.length = 0;
      for (let i = 0; i < 55; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.5 + 0.3
        });
      }
    };

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = mouse.current.x - d.x;
        const dy = mouse.current.y - d.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 170) {
          d.vx += (dx / dist) * 0.003;
          d.vy += (dy / dist) * 0.003;
        }
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(90,58,43,.16)';
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    draw();

    const move = e => {
      mouse.current = { x: e.clientX, y: e.clientY };
      document.querySelector('.sk-spot')?.style.setProperty('--mx', e.clientX + 'px');
      document.querySelector('.sk-spot')?.style.setProperty('--my', e.clientY + 'px');
    };

    addEventListener('mousemove', move, { passive: true });
    addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', move);
      removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <Header />
      <Loader onDone={onDone} />
      <PageTransition>
        <main className="sk">
          <div className="sk-grid-bg" />
          <div className="sk-noise" />
          <div className="sk-spot" />
          <canvas className="sk-canvas" ref={canvasRef} />
          
          {FLOAT_SYMBOLS.map((f, i) => (
            <span key={i} className="sk-float" style={{ left: f.x, top: f.y, fontSize: f.sz, animationDuration: `${f.dur}s` }}>
              {f.s}
            </span>
          ))}

          <div className="sk-content">
            <motion.section className="sk-hero" {...fu(0)}>
              <div className="sk-orb a" />
              <div className="sk-orb b" />
              <div className="sk-badge"><span className="sk-dot" />Technical Arsenal</div>
              <h1 className="sk-title"><span>TOOLS OF MY</span><span className="accent">CRAFT</span></h1>
              <p className="sk-sub">A visual map of the technologies I use to turn ideas into responsive interfaces, connected applications and production-ready experiences.</p>
              <div className="sk-counts">
                <div className="sk-count"><CountUp target={totalSkills} active={loaded} /> Skills</div>
                <div className="sk-count"><CountUp target={CATEGORIES.length} active={loaded} /> Categories</div>
                <div className="sk-count"><CountUp target={BADGES.length} active={loaded} /> Badges</div>
              </div>
            </motion.section>

            <section className="sk-section">
              <motion.div className="sk-section-head" {...fu(0.15)}>
                <div>
                  <div className="sk-eyebrow">01 — Technology wall</div>
                  <h2 className="sk-h2">My Arsenal</h2>
                </div>
                <p className="sk-lead">The core tools that move from idea → interface → API → data → deployment.</p>
              </motion.div>

              <div className="sk-tech-wall">
                {TECH_ICONS.map(([icon, label, c], i) => (
                  <motion.div key={label} className="sk-tech" style={{ '--tc': c }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.035 }}>
                    <span className="sk-tech-icon">{icon}</span>
                    <span className="sk-tech-label">{label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="sk-tabs">
                {CATEGORIES.map(c => (
                  <button key={c.id} className={`sk-tab ${tab === c.id ? 'active' : ''}`} onClick={() => setTab(c.id)}>
                    {c.icon} {c.label}<b>{c.skills.length}</b>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0)' }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }} className="sk-category" style={{ '--ca': active.accent }}>
                  <div className="sk-cat-top">
                    <div className="sk-cat-icon">{active.icon}</div>
                    <div>
                      <div className="sk-cat-name">{active.label}</div>
                      <div className="sk-cat-small">{active.skills.length} technologies · Top skill: {top.name}</div>
                    </div>
                    <div className="sk-avg">AVG {avg}%</div>
                  </div>
                  <div className="sk-skills-grid">
                    {active.skills.map((s, i) => (
                      <SkillCard key={s.name} skill={s} accent={active.accent} isTop={s === top} onOpen={setSelected} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              

              <div className="sk-creative">
                <div className="sk-eyebrow"> — Workflow</div>
                <h2 className="sk-h2" style={{ marginBottom: 18 }}>How I Build</h2>
                <div className="sk-panel">
                  <div className="sk-panel-head">
                    <div className="sk-panel-title">From idea to shipped product</div>
                    <div className="sk-panel-desc">My stack is not a list — it is a workflow. Each layer solves a different part of the product.</div>
                  </div>
                  <div className="sk-flow">
                    {WORKFLOW.map((w, i) => (
                      <motion.div key={w.n} className="sk-flow-step" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                        <div className="sk-flow-num">{w.n}</div>
                        <div className="sk-flow-icon">{w.icon}</div>
                        <div className="sk-flow-title">{w.title}</div>
                        <div className="sk-flow-text">{w.text}</div>
                        <div className="sk-flow-skills">
                          {w.skills.map(s => <span className="sk-mini" key={s}>{s}</span>)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sk-creative">
                <div className="sk-eyebrow"> — Proof & balance</div>
                <h2 className="sk-h2" style={{ marginBottom: 18 }}>My Ability Map</h2>
                <div className="sk-proof">
                  <div className="sk-radar-wrap">
                    <div className="sk-proof-title">Full-stack profile</div>
                    <div className="sk-proof-sub">Average proficiency across the four main areas.</div>
                    <Radar data={radar} />
                  </div>
                  <div className="sk-proof-list">
                    <div className="sk-proof-title">Category strength</div>
                    <div className="sk-proof-sub">Tap a category above to explore its individual skills.</div>
                    {CATEGORIES.map(c => {
                      const a = Math.round(c.skills.reduce((x, s) => x + s.level, 0) / c.skills.length);
                      return (
                        <div className="sk-proof-item" key={c.id}>
                          <div className="sk-proof-dot">{c.icon}</div>
                          <div>
                            <div className="sk-proof-name">{c.label}</div>
                            <div className="sk-proof-desc">{c.skills.length} skills in the toolkit</div>
                          </div>
                          <div className="sk-proof-pct">{a}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="sk-creative">
                <div className="sk-eyebrow"> — Achievements</div>
                <h2 className="sk-h2" style={{ marginBottom: 18 }}>Skill Badges</h2>
                <div className="sk-panel">
                  <div className="sk-badges">
                    {BADGES.map((b, i) => (
                      <motion.div key={b.title} className="sk-badge-card" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                        <div className="sk-badge-icon">{b.icon}</div>
                        <div className="sk-badge-title">{b.title}</div>
                        <div className="sk-badge-text">{b.text}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sk-learning">
                <div className="sk-eyebrow"> — Always learning</div>
                <div className="sk-proof-title" style={{ marginTop: 6 }}>Currently Exploring</div>
                <div className="sk-proof-sub">The toolkit keeps evolving. These are the areas I am actively pushing further.</div>
                <div className="sk-learning-grid">
                  {LEARNING.map(x => (
                    <div className="sk-learn-card" key={x.name}>
                      <div className="sk-learn-top">
                        <span className="sk-learn-icon">{x.icon}</span>
                        <span className="sk-learn-name">{x.name}</span>
                        <span className="sk-learn-pct">{x.level}%</span>
                      </div>
                      <div className="sk-learn-text">{x.text}</div>
                      <div className="sk-learn-bar">
                        <div className="sk-learn-fill" style={{ width: `${x.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </PageTransition>
      <Footer />
      {selected && (
        <AnimatePresence>
          <SkillModal skill={selected} onClose={() => setSelected(null)} />
        </AnimatePresence>
      )}
    </>
  );
}