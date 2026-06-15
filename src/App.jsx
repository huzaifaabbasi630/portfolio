import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ScreenGuard from './components/ScreenGuard';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

function App() {

  const toggleChat = () => {
    const wrapper = document.querySelector('.chat-window-wrapper');
    const chatWindow = document.querySelector('.chat-window');
    const avatar = document.querySelector('.custom-ai-agent');
    const glowRing = document.querySelector('.avatar-glow-ring');

    if (!wrapper || !chatWindow) {
      console.warn('Chat elements not ready');
      return;
    }

    const isOpen = wrapper.classList.contains('hmh-open');

    if (isOpen) {
      wrapper.classList.remove('hmh-open');
      chatWindow.classList.remove('hmh-visible');
      if (avatar) avatar.style.display = 'flex';
      if (glowRing) glowRing.style.display = 'block';
      setTimeout(() => { chatWindow.style.display = 'none'; }, 400);
    } else {
      chatWindow.style.display = 'flex';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrapper.classList.add('hmh-open');
          chatWindow.classList.add('hmh-visible');
        });
      });
      if (avatar) avatar.style.display = 'none';
      if (glowRing) glowRing.style.display = 'none';
      setTimeout(() => {
        const ta = chatWindow.querySelector('textarea');
        if (ta) ta.focus();
      }, 420);
    }
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Syne:wght@600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const initN8nChat = async () => {
      try {
        // Load n8n chat library via script tag (avoids build-time dynamic import error)
        const loadN8nLibrary = () => {
          return new Promise((resolve) => {
            if (window.n8nChatLib) {
              resolve(window.n8nChatLib);
              return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
            script.type = 'module';
            script.async = true;
            script.onload = () => {
              // Wait for library to be available
              let attempts = 0;
              const checkLib = () => {
                // Try multiple possible export names
                const lib = window.createChatMessage || window.n8n || window.createChat;
                if (lib && attempts < 50) {
                  resolve(lib);
                } else if (attempts < 50) {
                  attempts++;
                  setTimeout(checkLib, 100);
                } else {
                  console.warn('n8n library failed to load');
                  resolve(null);
                }
              };
              checkLib();
            };
            script.onerror = () => {
              console.error('Failed to load n8n chat script');
              resolve(null);
            };
            document.body.appendChild(script);
          });
        };

        const libObj = await loadN8nLibrary();
        if (!libObj) {
          console.error('n8n chat library not available');
          return;
        }

        // Extract createChat function
        const createChat = typeof libObj === 'function' ? libObj : libObj.createChat;
        if (!createChat) {
          console.error('createChat not found in n8n library');
          return;
        }

        window.n8nChat = await createChat({
          webhookUrl:
            'https://huzaifaabbasi.app.n8n.cloud/webhook/98c3a26d-0519-47c4-909d-295e8c065837/chat',
          open: false,
          showWelcomeScreen: false,
          initialMessages: [
            "Hi there! 👋 I am HMH AI, Huzaifa's official assistant. Ask me anything about my projects, skills, or resume!",
          ],
          i18n: {
            en: {
              title: 'HMH AI',
              subtitle: '⚡ Always here to help',
              inputPlaceholder: 'Ask me anything...',
            },
          },
          style: {
            displayLauncher: false,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            primaryColor: '#a855f7',
            secondaryColor: '#4f46e5',
            backgroundColor: 'transparent',
          },
        });

        // ── Inject close button ──
        const ensureClose = () => {
          const wrapper = document.querySelector('.chat-window-wrapper');
          const chatWindow = document.querySelector('.chat-window');
          if (!wrapper || !chatWindow) return false;
          if (wrapper.querySelector('.hmh-chat-close')) return true;

          const btn = document.createElement('button');
          btn.className = 'hmh-chat-close';
          btn.innerHTML = '✕';
          btn.title = 'Close';
          btn.addEventListener('click', () => {
            wrapper.classList.remove('hmh-open');
            chatWindow.classList.remove('hmh-visible');
            setTimeout(() => { chatWindow.style.display = 'none'; }, 400);
            const avatar = document.querySelector('.custom-ai-agent');
            const glowRing = document.querySelector('.avatar-glow-ring');
            if (avatar) avatar.style.display = 'flex';
            if (glowRing) glowRing.style.display = 'block';
          });
          chatWindow.appendChild(btn);
          return true;
        };

        const closeInterval = setInterval(() => {
          if (ensureClose()) clearInterval(closeInterval);
        }, 200);

        // ── Force dark theme on all n8n elements ──
        const forceDarkTheme = () => {
          const chatWindow = document.querySelector('.chat-window');
          if (!chatWindow) return false;

          // inject a style tag targeting all n8n internals
          const styleId = 'hmh-force-dark';
          if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
              .chat-window, .chat-window * {
                color-scheme: dark !important;
              }
              .chat-window [class*="layout"],
              .chat-window [class*="Layout"],
              .chat-window [class*="container"],
              .chat-window [class*="Container"],
              .chat-window [class*="wrapper"],
              .chat-window [class*="Wrapper"],
              .chat-window [class*="body"],
              .chat-window [class*="Body"],
              .chat-window [class*="messages"],
              .chat-window [class*="Messages"],
              .chat-window [class*="footer"],
              .chat-window [class*="Footer"],
              .chat-window [class*="input"],
              .chat-window [class*="Input"] {
                background: transparent !important;
                background-color: transparent !important;
              }
              .chat-window [class*="message"][class*="from-user"] *,
              .chat-window [class*="from-user"] * {
                color: #ffffff !important;
              }
              .chat-window [class*="message"][class*="from-bot"] *,
              .chat-window [class*="from-bot"] * {
                color: #ffffff !important;
              }
              .chat-window p,
              .chat-window span,
              .chat-window div,
              .chat-window li,
              .chat-window a {
                color: inherit !important;
              }
            `;
            document.head.appendChild(style);
          }
          return true;
        };

        const darkInterval = setInterval(() => {
          if (forceDarkTheme()) clearInterval(darkInterval);
        }, 300);

        // ── Periodic tooltip pulse ──
        const setupTooltip = () => {
          const tooltip = document.querySelector('.avatar-tooltip');
          if (!tooltip) return false;

          let timer = null;
          const pulse = () => {
            const avatar = document.querySelector('.custom-ai-agent');
            if (avatar && avatar.style.display === 'none') return;
            tooltip.classList.add('periodic-show');
            clearTimeout(timer);
            timer = setTimeout(() => tooltip.classList.remove('periodic-show'), 2800);
          };

          setTimeout(pulse, 2500);
          const interval = setInterval(pulse, 8000);
          window._hmh_tooltip_interval = interval;
          return true;
        };

        const tooltipInterval = setInterval(() => {
          if (setupTooltip()) clearInterval(tooltipInterval);
        }, 400);

      } catch (error) {
        console.error('Failed to load n8n chat:', error);
      }
    };

    initN8nChat();

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(fontLink)) document.head.removeChild(fontLink);
      const forceStyle = document.getElementById('hmh-force-dark');
      if (forceStyle) forceStyle.remove();
      if (window._hmh_tooltip_interval) {
        clearInterval(window._hmh_tooltip_interval);
        window._hmh_tooltip_interval = null;
      }
    };
  }, []);

  return (
    <Router>
      <ScreenGuard>
        <div className="bg-dark text-white min-h-screen selection:bg-accent/30 selection:text-white antialiased">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>

          {/* Glow ring behind avatar - CSS inside index.css */}

          {/* AI Avatar Button */}
          <motion.button
            onClick={toggleChat}
            className="custom-ai-agent"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06 }}
            aria-label="Open AI assistant"
          >
            <img src="/assets/avator.png" alt="HMH AI" />
            <span className="avatar-tooltip">AI — Ask me anything</span>
            <span className="avatar-shadow" aria-hidden="true" />
          </motion.button>

        </div>
      </ScreenGuard>
    </Router>
  );
}

export default App;