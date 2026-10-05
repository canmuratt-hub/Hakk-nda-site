import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';

const roles = [
  'CREATIVE DEVELOPER',
  'FULL STACK DEVELOPER',
  'AI & RAG ENGINEER',
  'SCALABLE SYSTEMS',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] pt-24 sm:pt-28 pb-14 flex items-center justify-center px-4 sm:px-6 lg:px-12 overflow-hidden">
      
      {/* 1. Stage Spotlight behind Portrait (Soft warm glow) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 38%, rgba(255, 230, 195, 0.16) 0%, rgba(190, 150, 100, 0.04) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 2. Rotating Conic Light Halo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[580px] h-[450px] sm:h-[580px] pointer-events-none rotating-glow-aura opacity-35"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Üst Küçük Rozet */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-400 mb-5 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>FULL-STACK DEVELOPER &amp; AI ENGINEER</span>
        </motion.div>

        {/* Ana Başlık */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.1] mb-3"
        >
          <span>MURAT CAN </span>
          <span className="text-gradient-cyan">KÜÇÜKKILIÇ</span>
        </motion.h1>

        {/* Dinamik Dönen Unvan & Motto */}
        <div className="h-9 sm:h-11 flex items-center justify-center overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-base sm:text-xl font-mono font-bold tracking-wider text-cyan-300"
            >
              // {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base italic text-slate-300 font-light max-w-lg mx-auto mb-6 px-4"
        >
          &ldquo;Sessizce kodluyor, geleceği inşa ediyor..&rdquo;
        </motion.p>

        {/* MERKEZ: TEK VE DENGELİ ÖLÇÜLENDİRİLMİŞ PORTRE KARTI (Ekranı Boğmayan, Şık ve Saydamlaştırılmış) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative my-2 sm:my-4 group"
        >
          {/* Kartın Arkasında Sürekli Dönen Conic Lazer Işık Halesi */}
          <div className="rotating-glow-aura opacity-40 group-hover:opacity-70 transition-opacity" />

          {/* Dönen Işık Rayına Sahip Zarif Cam Portre Çerçevesi */}
          <div className="relative w-44 sm:w-56 md:w-64 aspect-[4/5] rounded-[24px] border-beam-card p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-slate-950/80">
              {/* Orijinal Yüzü Açık Stüdyo Fotoğrafı (Siber Koruma: Kopyalama/Sürükleme Engelli) */}
              <img
                src="/muratcan.jpg"
                alt="Murat Can KÜÇÜKKILIÇ"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover object-top filter contrast-[1.08] brightness-95 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out select-none"
                loading="eager"
              />

              {/* Yumuşak Alt Vinyet Degradesi */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Alt Küçük Durum Etiketi */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-left">
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-white truncate">Murat Can</p>
                  <p className="text-[9px] font-mono text-cyan-400">AI &amp; Full-Stack</p>
                </div>
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kısa Vurucu Açıklama */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 max-w-md sm:max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed px-4"
        >
          T3 Vakfı için yüksek doğruluklu RAG yapay zeka sistemlerinden, ölçeklenebilir modern web mimarilerine ve akıcı 3D dijital deneyimlere kadar uçtan uca çözümler geliştiriyorum.
        </motion.p>

        {/* Aksiyon Butonları */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4"
        >
          <a
            href="#projects"
            className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-white text-black hover:bg-slate-200 shadow-lg shadow-white/10 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span>Projelerimi İncele</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>

          <a
            href="#contact"
            className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 transition-all duration-200 flex items-center gap-2"
          >
            <span>İletişime Geç</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </a>
        </motion.div>

        {/* Alt Hızlı Metrikler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-3xl px-4"
        >
          {[
            { value: '%100', label: 'RAG Doğruluğu', sub: 'T3 Vakfı Piri' },
            { value: '4+', label: 'Anahtar Proje', sub: 'Canlı & Hazır' },
            { value: 'Modern', label: 'Tech Stack', sub: 'Python • React • AI' },
            { value: '60 FPS', label: 'WebGL Performans', sub: 'Three.js 3D' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/5 flex flex-col items-center hover:border-cyan-500/20 transition-colors"
            >
              <span className="text-xl sm:text-2xl font-bold font-mono text-gradient-cyan">
                {stat.value}
              </span>
              <span className="text-[11px] font-semibold text-slate-200 mt-0.5">{stat.label}</span>
              <span className="text-[9px] text-slate-500 font-mono">{stat.sub}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
