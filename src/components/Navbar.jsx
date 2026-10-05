import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Hakkımda', href: '#about' },
    { name: 'Yetenekler', href: '#skills' },
    { name: 'Projeler', href: '#projects' },
    { name: 'İletişim', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 py-3 md:py-5 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0c14]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80'
            : 'bg-[#0c0e18]/60 backdrop-blur-md border border-white/10 shadow-lg shadow-black/40'
        }`}
      >
        {/* Brand & Identity Area (Zenginleştirilmiş Başlık) */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs sm:text-sm tracking-wider text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            MCK
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-xs sm:text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Murat Can KÜÇÜKKILIÇ
            </span>
            <span className="text-[10px] font-mono text-cyan-400/90 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Full-Stack &amp; AI Engineer
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Area: Status Badge & CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status pill (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Müsait</span>
          </div>

          {/* Say Hi / İletişime Geç Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-white text-black hover:bg-slate-200 transition-all duration-200 shadow-md hover:scale-105"
          >
            <span>İletişime Geç</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-16 left-4 right-4 bg-[#0a0c14]/95 backdrop-blur-2xl rounded-2xl p-6 flex flex-col gap-4 shadow-2xl lg:hidden border border-white/10"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors py-2 border-b border-white/5 text-left"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full py-3 rounded-full bg-white text-black text-center font-bold text-xs shadow-lg"
            >
              İletişime Geç
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
