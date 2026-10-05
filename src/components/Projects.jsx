import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    num: '01',
    category: 'YAPAY ZEKA & RAG MİMARİSİ',
    title: 'Piri Destek Asistanı',
    desc: 'T3 Vakfı için insanların aradığı yanıtları hiç bekletmeden, %100 doğrulanabilirlikle sunan RAG tabanlı kurumsal yapay zeka asistanı. Google Embedding ve vektör arama entegrasyonu.',
    tech: ['Python', 'FastAPI', 'Google Embedding', 'Vector RAG', 'SQLite'],
    codeUrl: 'https://github.com/canmuratt-hub/Piri',
    demoUrl: 'https://github.com/canmuratt-hub/Piri',
  },
  {
    num: '02',
    category: 'KURUMSAL SAAS PLATFORMU',
    title: 'Yeni Nesil QR Menü Sistemi',
    desc: 'Restoranlarda kağıt menüye ihtiyaç kalmadan insanların tek tıkla okuttukları, anlık yönetim sağlayan tam donanımlı web uygulaması. Konteynerize mikroservis mimarisi.',
    tech: ['React 18', 'TypeScript', 'Node.js 20', 'Express 4', 'Docker', 'MySQL 8.0'],
    codeUrl: 'https://github.com/canmuratt-hub/Qr_sistemi',
    demoUrl: 'https://github.com/canmuratt-hub/Qr_sistemi',
  },
  {
    num: '03',
    category: 'KREATİF 3D WEBGL',
    title: '3D İnteraktif Web Deneyimi',
    desc: 'İşletmelerin dijital görünürlüğünü artırarak 3 boyutlu tasarımlara ve interaktif sahnelere sahip işletme temsilini geleceğin dijital ortamına taşıyan 60 FPS WebGL platformu.',
    tech: ['Three.js', 'WebGL', 'React Three Fiber', 'Blender', 'Tailwind CSS'],
    codeUrl: 'https://github.com/canmuratt-hub',
    demoUrl: '#home',
  },
  {
    num: '04',
    category: 'FINTECH & OTONOM YAPAY ZEKA',
    title: 'Finansal Otopilot (Niko AI)',
    desc: 'Kişisel finans yönetimini sıkıcı Excel tablolarından kurtaran akıllı asistan. Niko yapay zeka motoru ile finansal verileri analiz eden ve otonom içgörüler sunan web mimarisi.',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'OpenAI'],
    codeUrl: 'https://github.com/canmuratt-hub',
    demoUrl: 'https://github.com/canmuratt-hub',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 lg:px-14 max-w-6xl mx-auto z-10">
      
      {/* Badge at Top: // 03. ÖNE ÇIKAN PROJELER */}
      <div className="flex justify-center md:justify-start mb-6">
        <span className="text-xs font-mono tracking-widest text-slate-400 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 uppercase">
          // 03. ÖNE ÇIKAN PROJELER
        </span>
      </div>

      {/* Headline with Mirrored Reflection (Video 00:12) */}
      <div className="mb-14 text-left">
        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-reflection"
          data-text="Öne Çıkan Mühendislik Projeleri"
        >
          Öne Çıkan Mühendislik Projeleri
        </h2>
        <p className="text-slate-500 font-mono text-xs mt-3 uppercase tracking-wider">
          // ÜRETİM_STANDARTLARINDA_SİSTEMLER
        </p>
      </div>

      {/* 2x2 Grid: Her Kartın Arkasında ve Kenarında Sürekli Dönen Işık Huzmesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {projects.map((p) => (
          <div key={p.num} className="relative group">
            
            {/* Kartın Arkasında Sürekli Dönen Conic Işık Halesi */}
            <div className="rotating-glow-aura opacity-30 group-hover:opacity-60 transition-opacity" />

            {/* Kartın Kendisi: Kenarlarında 360 Derece Dönen Işık Rayı (Border Beam) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative p-7 sm:p-8 border-beam-card flex flex-col justify-between h-full shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <div>
                {/* Card Meta: // PROJE 0X  [ KATEGORİ ] */}
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 mb-4 pb-3 border-b border-white/5">
                  <span className="text-slate-200 font-semibold">// PROJE {p.num}</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    [ {p.category} ]
                  </span>
                </div>

                {/* Başlık */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {p.title}
                </h3>

                {/* Açıklama */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {p.desc}
                </p>
              </div>

              {/* Alt Teknoloji Rozetleri & Butonlar (Türkçe) */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Aksiyon Butonları: KODU İNCELE -> & CANLI DEMO -> */}
                <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                  <a
                    href={p.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <span>KODU İNCELE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-slate-700">|</span>

                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>CANLI DEMO</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
