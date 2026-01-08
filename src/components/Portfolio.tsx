import React, { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface IconItem {
  icon: string;
  label: string;
  delay: string;
}

export default function Portfolio(): React.JSX.Element {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const iconItems: IconItem[] = [
    { icon: '⚡', label: 'Performance', delay: '0s' },
    { icon: '🎨', label: 'Design', delay: '0.1s' },
    { icon: '🔧', label: 'Development', delay: '0.2s' },
  ];

  // const contactLinks: string[] = ['GitHub', 'LinkedIn', 'Email'];
  const contactLinks = [
    { name: 'GitHub', url: 'https://github.com/' },
    { name: 'LinkedIn', url: 'https://linkedin.com/' },
    { name: 'Email', url: 'v.batsalis@gmail.com' },  
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden font-sans">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #27272a 1px, transparent 1px),
              linear-gradient(to bottom, #27272a 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridPulse 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Cursor glow effect */}
      <div
        className="pointer-events-none fixed w-96 h-96 rounded-full blur-3xl opacity-30 transition-transform duration-1000"
        style={{
          background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Animated badge */}
        <div className="mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-amber-500/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">
              Under Development.
            </span>
          </div>
        </div>

        {/* Main heading with staggered animation */}
        <div className="text-center mb-6 space-y-4">
          <h1
            className="text-6xl md:text-8xl font-black text-white tracking-tight"
            style={{
              fontFamily: '"Space Mono", monospace',
              animation: 'slideUp 0.8s ease-out forwards',
              opacity: 0,
            }}
          >
            EVANGELOS
          </h1>
          <h2
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"
            style={{
              fontFamily: '"Space Mono", monospace',
              animation: 'slideUp 0.8s ease-out 0.2s forwards, shimmer 3s linear infinite',
              opacity: 0,
              backgroundSize: '200% auto',
            }}
          >
            BATSALIS
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl text-center leading-relaxed"
          style={{
            animation: 'fadeIn 0.8s ease-out 0.4s forwards',
            opacity: 0,
          }}
        >
          Portfolio & Digital Workspace
        </p>

        {/* Progress bar */}
        <div
          className="w-full max-w-md mb-12"
          style={{
            animation: 'fadeIn 0.8s ease-out 0.6s forwards',
            opacity: 0,
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-zinc-500 text-sm font-mono uppercase tracking-wider">
              Building Progress
            </span>
            <span className="text-amber-500 text-sm font-mono font-bold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Construction icons grid */}
        <div
          className="grid grid-cols-3 gap-8 mb-12"
          style={{
            animation: 'fadeIn 0.8s ease-out 0.8s forwards',
            opacity: 0,
          }}
        >
          {iconItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ animationDelay: item.delay }}
            >
              <div className="text-4xl">{item.icon}</div>
              <span className="text-zinc-400 text-sm font-medium tracking-wide">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div
          className="text-center space-y-4"
          style={{
            animation: 'fadeIn 0.8s ease-out 1s forwards',
            opacity: 0,
          }}
        >
          <p className="text-zinc-500 text-sm uppercase tracking-widest mb-4">
            Coming Soon....
          </p>
          <div className="flex gap-6 justify-center">
            {contactLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-amber-500 transition-colors duration-300 text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border-2 border-amber-500/20 rounded-lg rotate-12 animate-float" />
        <div 
          className="absolute bottom-1/4 right-10 w-24 h-24 border-2 border-amber-500/20 rounded-full animate-float" 
          style={{ animationDelay: '1s' }} 
        />
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <p className="text-zinc-600 text-xs font-mono">
            © 2026 Evangelos Batsalis
          </p>
          <p className="text-zinc-600 text-xs font-mono">
            Building something amazing...
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
        }
      `}</style>
    </div>
  );
}