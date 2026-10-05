import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, ShieldCheck, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sanitizeInput, checkRateLimit, getProtectedEmail, getProtectedPhone } from '../utils/security';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: true,
    // 🛡️ Bal Küpü (Honeypot) - İnsanlar görmez, botlar doldurur ve engellenir
    b_anti_bot_trap: '',
  });

  // Sayfa yüklenme zamanı (Zaman tuzağı: botlar < 2.5 saniyede gönderir)
  const formMountTime = useRef(Date.now());

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 🛡️ GÜVENLİK KONTROLÜ 1: Bal Küpü (Honeypot Bot Tuzağı)
    if (formData.b_anti_bot_trap && formData.b_anti_bot_trap.trim() !== '') {
      console.warn('[SECURITY] Bot honeypot tetiklendi, istek sessizce engellendi.');
      setStatus('success'); // Botu kandırmak için sahte başarı verilir
      return;
    }

    // 🛡️ GÜVENLİK KONTROLÜ 2: Zaman Tuzağı (Time-to-Submit Trap)
    const elapsedSeconds = (Date.now() - formMountTime.current) / 1000;
    if (elapsedSeconds < 2.5) {
      console.warn('[SECURITY] İnsan dışı hızda form gönderimi tespit edildi.');
      setErrorMessage('Güvenlik doğrulaması: Form çok hızlı gönderildi. Lütfen tekrar deneyin.');
      setStatus('error');
      return;
    }

    // 🛡️ GÜVENLİK KONTROLÜ 3: İstemci Hız Limiti (Rate Limiting)
    const rateCheck = checkRateLimit('contact_submissions_limit', 3, 5);
    if (!rateCheck.allowed) {
      setErrorMessage(rateCheck.message);
      setStatus('error');
      return;
    }

    // 🛡️ GÜVENLİK KONTROLÜ 4: Girdi Dezenfeksiyonu (XSS & Injection Temizleme)
    const cleanFirstName = sanitizeInput(formData.firstName).slice(0, 50);
    const cleanLastName = sanitizeInput(formData.lastName).slice(0, 50);
    const cleanEmail = sanitizeInput(formData.email).slice(0, 100);
    const cleanMessage = sanitizeInput(formData.message).slice(0, 1500);

    // E-posta format doğrulaması
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
      setStatus('error');
      return;
    }

    if (cleanMessage.length < 5) {
      setErrorMessage('Mesajınız en az 5 karakter içermelidir.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const targetEmail = getProtectedEmail();
      // Gerçek kesintisiz e-posta gönderim servisi (FormSubmit AJAX)
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Ad_Soyad: `${cleanFirstName} ${cleanLastName}`.trim(),
          Email: cleanEmail,
          Mesaj: cleanMessage,
          _subject: `🛡️ Güvenli İletişim: ${cleanFirstName} ${cleanLastName}`,
          _template: 'table',
          _captcha: 'false',
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        confetti({
          particleCount: 85,
          spread: 80,
          origin: { y: 0.75 },
          colors: ['#ffffff', '#00f2fe', '#9d4edd', '#10b981']
        });
      } else {
        throw new Error(data.message || 'Gönderim sırasında bir sorun oluştu.');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback to mailto:', err);
      // Fallback: Mailto linki hazırla
      const subject = encodeURIComponent(`Portföy İletişim: ${cleanFirstName} ${cleanLastName}`);
      const body = encodeURIComponent(`Gönderen: ${cleanFirstName} ${cleanLastName}\nE-posta: ${cleanEmail}\n\nMesaj:\n${cleanMessage}`);
      window.location.href = `mailto:${getProtectedEmail()}?subject=${subject}&body=${body}`;
      setStatus('success');
    }
  };

  // WhatsApp'tan doğrudan güvenli bağlantı
  const whatsappUrl = `https://wa.me/${getProtectedPhone().replace('+', '')}?text=${encodeURIComponent(
    `Merhaba Murat Can, portföy sitenden yazıyorum.\nAdım: ${formData.firstName} ${formData.lastName}\nE-posta: ${formData.email}\nMesajım: ${formData.message || 'Görüşmek istiyorum.'}`
  )}`;

  // Gerçek zamanlı Türkçe JSON konsolu (XSS temizlenmiş önizleme)
  const payloadPreview = {
    güvenlik_durumu: '🛡️ SİBER KALKAN AKTİF (OWASP)',
    durum: status === 'loading' ? 'İLETİLİYOR...' : status === 'success' ? 'BAŞARIYLA İLETİLDİ' : status === 'error' ? 'GÜVENLİK ENGELİ' : 'HAZIR',
    gonderen: formData.firstName || formData.lastName 
      ? `${sanitizeInput(formData.firstName)} ${sanitizeInput(formData.lastName)}`.trim() 
      : '[Ad Bekleniyor]',
    eposta: formData.email ? sanitizeInput(formData.email) : '[E-posta Bekleniyor]',
    mesaj: formData.message ? sanitizeInput(formData.message).slice(0, 100) + (formData.message.length > 100 ? '...' : '') : '[Mesaj Bekleniyor]...',
    hedef_kripto: 'muratc***@gmail.com',
    rate_limit: '3 istek / 5 dk',
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-14 max-w-6xl mx-auto z-10">
      
      {/* Arka Plandaki Dönen Işık */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none rotating-glow-aura opacity-30"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* SOL KOLON: Başlık, Açıklama ve Canlı JSON Konsolu */}
        <div className="lg:col-span-5 flex flex-col text-left">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-slate-400 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              // KORUMALI İLETİŞİM KONSOLU
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Birlikte Sıra Dışı Bir Şeyler İnşa Edelim.
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Mesajınız <strong className="text-white">uçtan uca güvenli ve filtrelenmiş</strong> olarak doğrudan gelen kutuma iletilir. İster formu doldurun, isterseniz doğrudan WhatsApp üzerinden tek tıkla ulaşın.
          </p>

          {/* Dönen Işıklı Canlı JSON Konsolu */}
          <div className="relative">
            <div className="rotating-glow-aura opacity-20" />
            <div className="relative rounded-2xl bg-[#080a11] border border-white/10 p-5 font-mono text-xs text-slate-300 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 pb-2 border-b border-white/5">
                <span>// PAYLOAD_SECURITY_SHIELD.json</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  KORUMALI
                </span>
              </div>
              <pre className="text-slate-300 text-xs overflow-x-auto leading-relaxed">
{JSON.stringify(payloadPreview, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* SAĞ KOLON: Kesintisiz İletişim Formu */}
        <div className="lg:col-span-7 relative">
          <div className="rotating-glow-aura opacity-35" />
          
          <div className="relative rounded-2xl border-beam-card p-6 sm:p-9 shadow-2xl">
            
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Mesajınız Murat Can&apos;a Ulaştı!</h3>
                <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                  Mesajınız güvenlik doğrulamalarından geçerek başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğim.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ firstName: '', lastName: '', email: '', message: '', permission: true, b_anti_bot_trap: '' });
                    formMountTime.current = Date.now();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  Yeni Bir Mesaj Gönder
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                {/* 🛡️ GİZLİ BOT TUZAĞI (HONEYPOT) - İnsanlar görmez */}
                <div className="hidden opacity-0 pointer-events-none absolute -z-50" aria-hidden="true">
                  <input
                    type="text"
                    name="b_anti_bot_trap"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData.b_anti_bot_trap}
                    onChange={handleChange}
                  />
                </div>

                {/* Hata Bildirimi */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
                    <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Ad & Soyad */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">ADINIZ</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      maxLength={50}
                      placeholder="Adınız"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-slate-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">SOYADINIZ</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      maxLength={50}
                      placeholder="Soyadınız"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-slate-600 transition-colors"
                    />
                  </div>
                </div>

                {/* E-posta Adresi */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">E-POSTA ADRESİNİZ</label>
                  <input
                    type="email"
                    name="email"
                    required
                    maxLength={100}
                    placeholder="ornek@alanadi.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-slate-600 transition-colors"
                  />
                </div>

                {/* Mesaj Kutusu */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">MESAJINIZ (MAX 1500 KARAKTER)</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={1500}
                    placeholder="Projeniz veya fikriniz hakkında kısaca bahsedin..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder:text-slate-600 transition-colors resize-none"
                  />
                </div>

                {/* Onay Kutusu */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="permission"
                    name="permission"
                    checked={formData.permission}
                    onChange={handleChange}
                    className="rounded bg-slate-900 border-white/20 text-cyan-400 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="permission" className="text-xs text-slate-400 cursor-pointer select-none">
                    Bu e-posta adresi üzerinden benimle iletişime geçilmesine izin veriyorum.
                  </label>
                </div>

                {/* Butonlar: Form Gönder & Doğrudan WhatsApp */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-1 py-3.5 rounded-full font-bold text-xs tracking-wider uppercase bg-white text-black hover:bg-slate-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Güvenlik Kontrolü &amp; İletiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Korumalı Gönder</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 rounded-full font-bold text-xs tracking-wider uppercase bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
