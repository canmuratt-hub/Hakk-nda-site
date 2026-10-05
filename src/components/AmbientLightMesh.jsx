import React, { useEffect, useState } from 'react';

export default function AmbientLightMesh() {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();

    // Sadece masaüstünde fare takipçisini çalıştır
    if (!window.matchMedia('(pointer: coarse)').matches) {
      const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Mobilde GPU tıkanmasını önlemek için hafifletilmiş statik atmosfer
  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 242, 254, 0.08) 0%, transparent 70%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Primary Organic Moving White Volumetric Light */}
      <div 
        className="absolute top-1/4 left-1/2 w-[750px] h-[750px] rounded-full animate-light-sweep"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.07) 0%, rgba(240, 240, 250, 0.02) 40%, transparent 70%)',
          filter: 'blur(70px)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* 2. Secondary Floating Ambient Light on Bottom-Right */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(200, 210, 230, 0.02) 50%, transparent 75%)',
          filter: 'blur(80px)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* 3. Interactive Mouse-Follower Stage Light (Masaüstü) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x - 250}px, ${mousePos.y - 250}px, 0)`,
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.04) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  );
}
