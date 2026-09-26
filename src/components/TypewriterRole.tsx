import React, { useState, useEffect } from 'react';

interface TypewriterRoleProps {
  prefix?: string;
  strings?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  pauseBeforeNext?: number;
  className?: string;
}

export const TypewriterRole: React.FC<TypewriterRoleProps> = ({
  prefix = 'I am ',
  strings = [
    'a Video Editor & Visualizer 🎬',
    'a Motion & UI Animator ✨',
    'a Graphic Designer 🎨',
    'an AI Video Creator 🤖',
    'a Digital Marketer 🚀',
  ],
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 1800,
  pauseBeforeNext = 450,
  className = '',
}) => {
  const [stringIndex, setStringIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!strings || strings.length === 0) return;

    const currentWord = strings[stringIndex % strings.length];
    const characters = Array.from(currentWord);

    // If currently typing forward
    if (!isDeleting) {
      if (subIndex < characters.length) {
        const timeout = setTimeout(() => {
          setSubIndex((prev) => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Word is fully typed, pause before backspacing
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      // Currently deleting back letter-by-letter
      if (subIndex > 0) {
        const timeout = setTimeout(() => {
          setSubIndex((prev) => prev - 1);
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Word is fully cleared, brief pause before typing next word
        const timeout = setTimeout(() => {
          setIsDeleting(false);
          setStringIndex((prev) => (prev + 1) % strings.length);
        }, pauseBeforeNext);
        return () => clearTimeout(timeout);
      }
    }
  }, [subIndex, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, pauseDuration, pauseBeforeNext]);

  const currentWord = strings[stringIndex % strings.length];
  const displayedText = Array.from(currentWord).slice(0, subIndex).join('');

  return (
    <div
      id="typewriter-hero-role"
      className={`flex items-center flex-wrap gap-1.5 min-h-[36px] sm:min-h-[46px] select-none ${className}`}
    >
      <span className="text-sm sm:text-2xl font-bold text-slate-300">
        {prefix}
      </span>
      <span className="text-sm sm:text-2xl font-extrabold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
        {displayedText}
      </span>
      {/* Active Blinking Cursor with Cyan Neon Glow */}
      <span
        aria-hidden="true"
        className="inline-block w-[2.5px] sm:w-[3px] h-5 sm:h-7 bg-cyan-400 rounded-sm ml-0.5 animate-cursor-blink shadow-[0_0_10px_#22d3ee]"
      />
    </div>
  );
};
