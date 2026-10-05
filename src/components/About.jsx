import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 lg:px-14 max-w-6xl mx-auto z-10">
      
      {/* Badge at Top: // 01. SİSTEM PROFİLİ */}
      <div className="flex justify-center md:justify-start mb-12">
        <span className="text-xs font-mono tracking-widest text-slate-400 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 uppercase">
          // 01. SİSTEM PROFİLİ
        </span>
      </div>

      {/* Main Grid: Sol Dönen Işıklı ID Kartı, Sağ Bilgi Alanı */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left: ID Kartı - Çevresinde Sürekli 360° Dönen Lazer Işık Huzmesi */}
        <div className="md:col-span-5 flex justify-center relative">
          
          {/* Kartın Arkasında Sürekli Dönen Conic Işık Halesi */}
          <div className="rotating-glow-aura" />

          {/* Kartın Kendisi: Kenarlarında 360 Derece Dönen Işık Rayı (Border Beam) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[290px] border-beam-card p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
          >
            {/* Fotoğraf */}
            <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 mb-4 border border-white/10">
              <img
                src="/muratcan_pose1.jpg"
                alt="Murat Can KÜÇÜKKILIÇ"
                className="w-full h-full object-cover object-top filter contrast-105"
              />
            </div>

            {/* Alt Durum Satırı */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono tracking-wider text-slate-200 uppercase font-semibold">
                  YENİ FIRSATLARA AÇIK
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">2026</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Tanıtım & 3 Teknik Kutu (Türkçe) */}
        <div className="md:col-span-7 flex flex-col text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Merhaba, Ben <span className="text-white">Murat Can KÜÇÜKKILIÇ</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8 max-w-xl">
            Modern ve ölçeklenebilir dijital çözümler üreten bir <strong className="text-white font-semibold">Full-Stack Developer &amp; AI Engineer</strong> olarak çalışıyorum. T3 Vakfı Piri projesinde geliştirdiğim yüksek doğruluklu RAG sistemlerinden, endüstriyel mikroservis mimarilerine ve akıcı 3D web deneyimlerine kadar uçtan uca sistemler kurguluyorum.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8 italic">
            &ldquo;Sessizce kodluyor, geleceği inşa ediyor..&rdquo;
          </p>

          {/* 3 Teknik Kutu (MİMARİ, TEMEL TEKNOLOJİ, DURUM) */}
          <div className="grid grid-cols-3 gap-3 max-w-lg">
            <div className="p-3.5 rounded-xl border-beam-card">
              <p className="text-xs sm:text-sm font-bold text-white">Full-Stack &amp; AI</p>
              <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">MİMARİ</p>
            </div>
            <div className="p-3.5 rounded-xl border-beam-card">
              <p className="text-xs sm:text-sm font-bold text-white">Python &amp; React</p>
              <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">TEKNOLOJİ</p>
            </div>
            <div className="p-3.5 rounded-xl border-beam-card">
              <p className="text-xs sm:text-sm font-bold text-emerald-400">Müsait</p>
              <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">DURUM</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
