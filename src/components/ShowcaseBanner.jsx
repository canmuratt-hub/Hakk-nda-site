import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

const SKILLS_TICKER = [
  { text: '3D Tasarım & WebGL Deneyimleri', tag: 'KREATİF' },
  { text: 'Yaratıcı Kod & Dijital Vizyon', tag: 'VİZYONER' },
  { text: 'Analitik & Derin Düşünce', tag: 'MANTIK' },
  { text: 'Sistemsel Mimari & Performans', tag: 'MÜHENDİSLİK' },
  { text: 'Yapay Zeka & RAG Çözümleri', tag: 'AI_LAB' },
  { text: 'Full-Stack Modern Web Sistemleri', tag: 'MİMAR' },
];

export default function ShowcaseBanner() {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  // 2 saniyede bir değişen kelime / yetkinlik döngüsü
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % SKILLS_TICKER.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleNameClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { x, y },
      colors: ['#ffffff', '#00f2fe', '#4facfe', '#9d4edd', '#10b981'],
    });
  };

  const firstName = ['M', 'U', 'R', 'A', 'T'];
  const lastName = ['C', 'A', 'N'];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-14 max-w-6xl mx-auto z-10 overflow-hidden">
      
      {/* 
        HOLOGRAFİK ŞEFFAF SAHNE:
        Uzay arka planı, 3D parçacıklar ve tel kafes galaksisi arkadan kesintisiz görünür.
        Koyu opak kutu kaldırılmıştır.
      */}
      <div 
        onClick={handleNameClick}
        className="relative py-10 sm:py-16 px-3 sm:px-6 rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer select-none group"
      >
        {/* A. 3D Ufuk Izgarası (Düşük Opaklık - Uzayı Kapatmaz) */}
        <div className="absolute inset-0 perspective-grid opacity-15 pointer-events-none" />

        {/* B. Merkez Conic Işık Halesi (Uzay Parçacıklarını Aydınlatır) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[650px] md:w-[750px] h-[200px] sm:h-[350px] rotating-glow-aura opacity-25 pointer-events-none" />

        {/* C. Yatay Neon Lazer Tarayıcı */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none -translate-y-1/2" />
        <motion.div 
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 w-32 sm:w-48 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent -translate-y-1/2 shadow-[0_0_15px_#00f2fe] pointer-events-none"
        />

        {/* D. Siber HUD Köşe Rozetleri */}
        <div className="absolute top-3 left-4 text-[9px] sm:text-[10px] font-mono text-slate-500 tracking-widest hidden xs:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          [ KİMLİK_ÇEKİRDEĞİ // VİZYON ]
        </div>
        <div className="absolute top-3 right-4 text-[9px] sm:text-[10px] font-mono text-slate-500 tracking-widest hidden xs:flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-cyan-400" />
          [ PROJEKTÖR: 3D_UZAY ]
        </div>

        {/* E. HARF HARF KİNEMATİK OLUŞAN "MURAT CAN" */}
        <div className="relative z-10 flex items-center justify-center gap-x-2.5 xs:gap-x-4 sm:gap-x-8 md:gap-x-12 whitespace-nowrap overflow-hidden py-1 sm:py-2">
          
          {/* 1. Kelime: MURAT */}
          <div className="flex items-center justify-center">
            {firstName.map((char, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.span
                  key={`first-${index}`}
                  initial={{
                    opacity: 0,
                    x: isEven ? -40 : 40,
                    y: isEven ? 25 : -25,
                    rotateY: isEven ? -35 : 35,
                    scale: 0.7,
                    filter: 'blur(8px)',
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotateY: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  viewport={{ once: true, amount: 0.05, margin: '150px 0px 50px 0px' }}
                  transition={{
                    type: 'spring',
                    damping: 15,
                    stiffness: 120,
                    delay: index * 0.06,
                  }}
                  whileHover={{
                    y: -14,
                    scale: 1.15,
                    color: '#00f2fe',
                    textShadow: '0 0 35px rgba(0,242,254,0.9), 0 0 60px rgba(0,242,254,0.4)',
                    transition: { duration: 0.15 },
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="inline-block text-[8.5vw] sm:text-[9.5vw] md:text-[10.5vw] lg:text-[11vw] font-black leading-none tracking-tight sm:tracking-tighter bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent transition-colors duration-200"
                  style={{ perspective: 1000 }}
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

          {/* 2. Kelime: CAN */}
          <div className="flex items-center justify-center">
            {lastName.map((char, index) => {
              const globalIndex = firstName.length + index;
              const isEven = globalIndex % 2 === 0;
              return (
                <motion.span
                  key={`last-${index}`}
                  initial={{
                    opacity: 0,
                    x: isEven ? -40 : 40,
                    y: isEven ? 25 : -25,
                    rotateY: isEven ? -35 : 35,
                    scale: 0.7,
                    filter: 'blur(8px)',
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotateY: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  viewport={{ once: true, amount: 0.05, margin: '150px 0px 50px 0px' }}
                  transition={{
                    type: 'spring',
                    damping: 15,
                    stiffness: 120,
                    delay: globalIndex * 0.06,
                  }}
                  whileHover={{
                    y: -14,
                    scale: 1.15,
                    color: '#00f2fe',
                    textShadow: '0 0 35px rgba(0,242,254,0.9), 0 0 60px rgba(0,242,254,0.4)',
                    transition: { duration: 0.15 },
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="inline-block text-[8.5vw] sm:text-[9.5vw] md:text-[10.5vw] lg:text-[11vw] font-black leading-none tracking-tight sm:tracking-tighter bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent transition-colors duration-200"
                  style={{ perspective: 1000 }}
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

        </div>

        {/* F. 2 SANİYEDE BİR DEĞİŞEN DİNAMİK YETKİNLİK ŞOVU */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center justify-center relative z-10">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            
            {/* Küçük Durum İkonu */}
            <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              <Cpu className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="hidden sm:inline">// ODAK:</span>
            </span>

            {/* Animasyonlu Kayan Metin (2 Saniyede Bir Değişir) */}
            <div className="h-6 flex items-center overflow-hidden min-w-[200px] sm:min-w-[280px] justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSkillIndex}
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-white"
                >
                  <span className="text-slate-300">
                    {SKILLS_TICKER[currentSkillIndex].text}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                    {SKILLS_TICKER[currentSkillIndex].tag}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          <p className="text-[10px] font-mono text-slate-500 mt-2 tracking-wider hidden sm:block">
            [ HARFLERE DOKUNUN VEYA TIKLAYIN • ETKİLEŞİMLİ 3D ŞÖLENİ ]
          </p>
        </div>

      </div>

    </section>
  );
}
