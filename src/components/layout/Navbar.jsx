import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import navigation from '../../data/navigation';
import personal from '../../data/personal';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleNavClick = (e, item) => {
    if (item.isRoute) return;
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/' + item.href;
      return;
    }
    const target = document.querySelector(item.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl mx-4"
        style={{
          background: isScrolled
            ? 'rgba(255,255,255,0.08)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          border: isScrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">{personal.initials}</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">{personal.name}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10"
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a
              href={personal.resumeUrl}
              download
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Download size={16} /> Resume
            </a>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="md:hidden mt-2 mx-4 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 space-y-1">
              {navigation.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                )
              )}
              <a
                href={personal.resumeUrl}
                download
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-primary"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
