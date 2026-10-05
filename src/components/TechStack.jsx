import React from 'react';

const row1 = [
  'React 18', 'TypeScript', 'Next.js', 'Python', 'FastAPI', 'Three.js', 
  'WebGL', 'Tailwind CSS', 'Node.js', 'Express.js', 'Docker', 'MySQL', 'SQLite'
];

const row2 = [
  'Google Embedding', 'Vector RAG', 'OpenAI', 'Zustand', 'Sharp', 'QRCode', 
  'REST APIs', 'JWT Security', 'Git & GitHub', 'Blender', 'Linux', 'Microservices'
];

export default function TechStack() {
  return (
    <section id="skills" className="relative py-32 z-10 overflow-hidden">
      
      {/* 1. 3D Spatial Perspective Horizon Grid in Background (Video 00:10) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 perspective-grid -top-24"
        aria-hidden="true"
      />

      {/* 2. Dönen Işık Dairesi */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none rotating-glow-aura opacity-30"
      />

      {/* Section Header (Türkçe) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center mb-14">
        <div className="flex justify-center mb-4">
          <span className="text-xs font-mono tracking-widest text-slate-400 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 uppercase">
            // TEKNOLOJİ HAVUZU
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
          Kullandığım Teknolojiler
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Modern web geliştirme, yapay zeka mimarileri ve bulut altyapısı genelinde uçtan uca mühendislik çözümleri.
        </p>
      </div>

      {/* Infinite Horizontal Running Marquee Badges */}
      <div className="relative z-10 space-y-4 w-full overflow-hidden">
        {/* Sol ve Sağ Kenar Yumuşatma Gölgeleri (GPU dostu, mask-image yerine) */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#07080c] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#07080c] to-transparent z-20" />

        {/* Row 1: moves left */}
        <div className="flex w-max gap-3.5 animate-marquee" style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}>
          {[...row1, ...row1, ...row1].map((skill, idx) => (
            <div
              key={idx}
              className="px-5 py-2.5 rounded-full bg-[#0d0f18]/90 border border-white/10 text-xs font-medium text-slate-200 hover:border-white/40 hover:text-white transition-all duration-200 cursor-default whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Row 2: moves right */}
        <div className="flex w-max gap-3.5 animate-marquee-reverse" style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}>
          {[...row2, ...row2, ...row2].map((skill, idx) => (
            <div
              key={idx}
              className="px-5 py-2.5 rounded-full bg-[#0d0f18]/90 border border-white/10 text-xs font-medium text-slate-200 hover:border-white/40 hover:text-white transition-all duration-200 cursor-default whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Subtitle Label from Video: // 03. MÜHENDİSLİK YOL HARİTASI */}
      <div className="relative z-10 text-center mt-12">
        <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
          // 03. MÜHENDİSLİK YOL HARİTASI
        </span>
      </div>

      {/* CSS for Infinite Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marquee-reverse {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 34s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
