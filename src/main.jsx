import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initConsoleSecurityGuard } from './utils/security';

// 🛡️ Tarayıcı Geliştirici Konsolu Güvenlik Mührünü Başlat
initConsoleSecurityGuard();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
