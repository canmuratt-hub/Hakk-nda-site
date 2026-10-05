/**
 * ==============================================================================
 * 🛡️ SİBER GÜVENLİK VE KORUMA MODÜLÜ (SECURITY ENGINE)
 * Murat Can KÜÇÜKKILIÇ - Portföy Koruma Sistemi
 * ==============================================================================
 */

/**
 * 1. XSS ve Script Injection Temizleme (Sanitization)
 * Kötü amaçlı HTML, script ve protokolleri temizler.
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    // Script ve HTML taglerini yok et
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    // Tehlikeli inline protokolleri temizle
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, '')
    // Null byte ve tehlikeli karakterleri temizle
    .replace(/\0/g, '')
    .trim();
}

/**
 * 2. İstemci Tabanlı İstek Hız Sınırlayıcı (Rate Limiting)
 * Aynı cihazdan peş peşe yapılan spam ve mail-bombing saldırılarını engeller.
 * Varsayılan: 5 dakika içinde en fazla 2 mesaj.
 */
export function checkRateLimit(actionKey = 'contact_form_submissions', maxAllowed = 2, cooldownMinutes = 5) {
  try {
    const now = Date.now();
    const cooldownMs = cooldownMinutes * 60 * 1000;
    const history = JSON.parse(localStorage.getItem(actionKey) || '[]');
    
    // Süresi dolan eski istekleri filtrele
    const validHistory = history.filter((timestamp) => now - timestamp < cooldownMs);

    if (validHistory.length >= maxAllowed) {
      const oldestValid = validHistory[0];
      const remainingSeconds = Math.ceil((cooldownMs - (now - oldestValid)) / 1000);
      return {
        allowed: false,
        remainingSeconds,
        message: `Çok fazla deneme yapıldı. Lütfen ${remainingSeconds} saniye sonra tekrar deneyin.`
      };
    }

    // Yeni isteği kaydet
    validHistory.push(now);
    localStorage.setItem(actionKey, JSON.stringify(validHistory));
    
    return { allowed: true };
  } catch (e) {
    // localStorage kapalıysa izin ver
    return { allowed: true };
  }
}

/**
 * 3. Bot E-posta / Telefon Kazıyıcılarına Karşı Koruma (Obfuscation)
 * Ham e-posta ve telefon numaralarını düz HTML'e gömmek yerine dinamik üretir.
 */
export function getProtectedEmail() {
  const parts = ['muratcan', 'kucukkilic', '@', 'gmail', '.', 'com'];
  return parts.join('');
}

export function getProtectedPhone() {
  const parts = ['+', '90', '534', '571', '96', '42'];
  return parts.join('');
}

/**
 * 4. F12 & Geliştirici Konsolu Siber Güvenlik Mührü
 * Tarayıcı konsolunu açan ziyaretçiye kurumsal siber güvenlik uyarısı verir.
 */
export function initConsoleSecurityGuard() {
  if (typeof window === 'undefined') return;

  const titleStyle = [
    'color: #00f2fe',
    'font-size: 16px',
    'font-weight: 900',
    'background: #070913',
    'padding: 8px 14px',
    'border: 1px solid #00f2fe',
    'border-radius: 6px',
    'text-shadow: 0 0 10px rgba(0, 242, 254, 0.7)'
  ].join(';');

  const warningStyle = [
    'color: #f43f5e',
    'font-size: 12px',
    'font-weight: 700',
    'background: #18090f',
    'padding: 6px 12px',
    'margin-top: 6px',
    'border-left: 3px solid #f43f5e'
  ].join(';');

  const infoStyle = [
    'color: #94a3b8',
    'font-size: 11px',
    'font-family: monospace',
    'line-height: 1.6'
  ].join(';');

  console.log('%c🛡️ SİBER GÜVENLİK PROTOKOLÜ // SİSTEM KORUMASI AKTİF', titleStyle);
  console.log('%c⚠️ UYARI: Bu web uygulaması Murat Can KÜÇÜKKILIÇ\'a aittir.', warningStyle);
  console.log(
    '%cBu arayüzün kaynak kodlarının izinsiz kopyalanması, kazınması, tersine mühendislikle klonlanması veya zararlı veri enjeksiyonu tescilli telif hakları ve siber suçlar mevzuatı kapsamında izlenmektedir.\n\nİletişim: muratcankucukkilic@gmail.com',
    infoStyle
  );
}
