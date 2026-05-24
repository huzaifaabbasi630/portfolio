import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScreenGuard from './components/ScreenGuard';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ScreenGuard>
        {/* ⚡ Global Wrapper: Yeh poori website ko Deep Dark theme aur smooth scrolling dega */}
        <div className="bg-dark text-white min-h-screen selection:bg-accent/30 selection:text-white antialiased">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </div>
      </ScreenGuard>
    </Router>
  );
}

export default App;