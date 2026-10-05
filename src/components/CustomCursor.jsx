import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [follower, setFollower] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const clickable = target.closest('a, button, [role="button"], input, textarea, .hover-target');
      setIsHovered(!!clickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrame;
    const updateFollower = () => {
      setFollower((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      animationFrame = requestAnimationFrame(updateFollower);
    };
    animationFrame = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Small center dot */}
      <div
        className="fixed w-2 h-2 bg-[#00f2fe] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_10px_#00f2fe]"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Outer smooth halo */}
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-300 ease-out ${
          isHovered
            ? 'w-14 h-14 border-[#00f2fe]/80 bg-[#00f2fe]/10 backdrop-blur-[1px] scale-110 shadow-[0_0_25px_rgba(0,242,254,0.3)]'
            : 'w-8 h-8 border-white/30 bg-transparent'
        }`}
        style={{ left: `${follower.x}px`, top: `${follower.y}px` }}
      />
    </div>
  );
}
