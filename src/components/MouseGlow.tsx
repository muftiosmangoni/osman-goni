import React, { useEffect, useState } from 'react';

export const MouseGlow: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only activate for pointer devices with hover (desktop / laptop mice)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let timeoutId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      // Keep glowing while moving, fade out if idle for long
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        // keep visible or slight fade
      }, 5000);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!visible || !pos) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Sky Blue / Cyan Glowing Aura with gentle breathing pulse ("টিপ টিপ করে জ্বলে") */}
      <div
        className="absolute rounded-full transition-transform duration-75 ease-out animate-cyan-breathe"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '380px',
          height: '380px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, rgba(6, 182, 212, 0.09) 35%, rgba(14, 165, 233, 0.03) 60%, transparent 80%)',
          filter: 'blur(22px)',
        }}
      />
      {/* Central sharper pinpoint torch light */}
      <div
        className="absolute rounded-full transition-transform duration-75 ease-out animate-pulse"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '90px',
          height: '90px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(103, 232, 249, 0.28) 0%, rgba(34, 211, 238, 0.12) 50%, transparent 100%)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  );
};
