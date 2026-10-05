import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Sparkles, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNameClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#ffffff', '#00f2fe', '#4facfe', '#9d4edd'],
    });
  };

  const firstName = ['M', 'U', 'R', 'A', 'T'];
  const lastName = ['C', 'A', 'N'];

  return (
    <footer className="relative border-t border-white/10 pt-24 pb-14 px-4 sm:px-6 lg:px-14 z-10 bg-[#06070a] overflow-hidden">
      
      {/* 1. Volumetric Arka Plan Işıkları ve Atmosferik Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-full h-[500px] bg-gradient-to-r from-cyan-600/15 via-blue-600/15 to-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-6xl mx-auto flex flex-col relative z-10">
        
        {/* 3 Sütunlu Sistem Mimarisi Künyesi (Türkçe) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left mb-16 pb-12 border-b border-white/5">
          
          {/* Kolon 1: Sistem Mimarisi */}
          <div>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
              // SİSTEM MİMARİSİ
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-200">
              Full-Stack Web Mühendisliği
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Yapay Zeka &amp; RAG Sistemleri
            </p>
          </div>

          {/* Kolon 2: Durum */}
          <div>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
              // DURUM
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs sm:text-sm font-semibold text-emerald-400">
                Yeni Fırsatlara Açık
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Aktif / 2026
            </p>
          </div>

          {/* Kolon 3: Bölge & Çalışma Şekli */}
          <div>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
              // BÖLGE &amp; ÇALIŞMA
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-200">
              Türkiye / Global
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Remote &amp; Hibrit
            </p>
          </div>

        </div>

        {/* Sık ve Zarif Kapanış İmzası (Showcase Banner İletişim Üstüne Alındığı İçin) */}
        <div className="my-8 py-8 text-center flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-mono font-black text-xs text-black shadow-[0_0_15px_rgba(0,242,254,0.4)]">
              MCK
            </span>
            <div className="text-left">
              <p className="text-xs font-bold text-white tracking-wide">
                Murat Can KÜÇÜKKILIÇ
              </p>
              <p className="text-[10px] font-mono text-cyan-400">
                // CREATIVE FULL-STACK &amp; AI ARCHITECT
              </p>
            </div>
          </div>
        </div>

        {/* Alt İletişim & Sosyal Ağlar Çubuğu */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/10">
          
          {/* E-posta Butonu */}
          <a
            href="mailto:muratcankucukkilic@gmail.com"
            className="text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-colors"
          >
            muratcankucukkilic@gmail.com
          </a>

          {/* Sosyal Medya Bağlantıları */}
          <div className="flex items-center gap-5 text-xs font-mono text-slate-400">
            <a
              href="https://github.com/canmuratt-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="https://www.linkedin.com/in/murat-can-küçükkılıç-718694387?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="https://wa.me/905345719642"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Yukarı Dön Butonu */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors group"
          >
            <span>Yukarı Dön</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>

        </div>

        {/* Telif & Künye */}
        <div className="text-center pt-8 text-[11px] font-mono text-slate-600">
          © 2026 Murat Can KÜÇÜKKILIÇ. Tüm Hakları Saklıdır. Full-Stack &amp; AI Engineering.
        </div>

      </div>
    </footer>
  );
}
