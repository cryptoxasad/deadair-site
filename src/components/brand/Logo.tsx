import React from 'react';

export type LogoVariant = 'icon' | 'wordmark' | 'monochrome' | 'avatar' | 'favicon';

interface LogoProps {
  variant?: LogoVariant;
  size?: number | string;
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'wordmark',
  size,
  className = '',
  showTagline = true,
}) => {
  // 1. Standalone Icon (Readable at 32px)
  if (variant === 'icon') {
    const dim = size || 32;
    return (
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none ${className}`}
        role="img"
        aria-label="DEAD AIR radio icon"
      >
        <title>DEAD AIR Icon</title>
        {/* Outer subtle glow disk */}
        <circle cx="24" cy="24" r="22" fill="#0d1424" stroke="#1e293b" strokeWidth="1.5" />
        
        {/* Outer signal arc 1 */}
        <path
          d="M10 24A14 14 0 0 1 38 24"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 3"
          opacity="0.85"
        />
        {/* Inner signal arc 2 */}
        <path
          d="M15 24A9 9 0 0 1 33 24"
          stroke="#22d3ee"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Radio Dial Outer Ring */}
        <circle cx="24" cy="28" r="10" stroke="#f59e0b" strokeWidth="2.5" fill="#0a0f1d" />

        {/* Dial tick marks */}
        <line x1="24" y1="19" x2="24" y2="21" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="21" x2="20.5" y2="22.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="29" y1="21" x2="27.5" y2="22.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />

        {/* Dial Center Needle pointing to 00:07 (approx 15 deg past top) */}
        <line x1="24" y1="28" x2="27" y2="20" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="28" r="2" fill="#fbbf24" />

        {/* Apex Electric Spark (4-point star) */}
        <path
          d="M24 4L25.2 8.5L29 9.5L25.5 11.5L25.8 15.5L23.5 12.5L19.5 13.5L22 10.5L20.5 7L23.8 8L24 4Z"
          fill="#fbbf24"
        />
        <circle cx="24.5" cy="9.8" r="1.5" fill="#ffffff" />
      </svg>
    );
  }

  // 2. Monochrome Variant (Crisp stencil, single-color readable)
  if (variant === 'monochrome') {
    const dim = size || 32;
    return (
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none text-current ${className}`}
        role="img"
        aria-label="DEAD AIR monochrome icon"
      >
        <title>DEAD AIR Monochrome</title>
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
        <path d="M10 24A14 14 0 0 1 38 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M15 24A9 9 0 0 1 33 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="28" r="9" stroke="currentColor" strokeWidth="2.5" />
        <line x1="24" y1="28" x2="27" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="28" r="2" fill="currentColor" />
        <path d="M24 5L25.5 9.5L29 10.5L25.8 12.5L26 16L23.5 13L19.5 14L22 11L20.5 7.5L24 8.5V5Z" fill="currentColor" />
      </svg>
    );
  }

  // 3. Social Avatar (Square / circular badge with glowing bezel)
  if (variant === 'avatar') {
    const dim = size || 80;
    return (
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none rounded-2xl shadow-xl shadow-cyan-950/30 ${className}`}
        role="img"
        aria-label="DEAD AIR social avatar badge"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#080c16" />
            <stop offset="1" stopColor="#030509" />
          </linearGradient>
          <radialGradient id="sparkGlow" cx="50" cy="25" r="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Background & Bezel */}
        <rect width="100" height="100" rx="20" fill="url(#bgGrad)" />
        <rect x="2" y="2" width="96" height="96" rx="18" stroke="#1e293b" strokeWidth="2" />
        <circle cx="50" cy="25" r="30" fill="url(#sparkGlow)" />

        {/* Signal Arcs */}
        <path d="M20 52A32 32 0 0 1 80 52" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
        <path d="M30 52A20 20 0 0 1 70 52" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />

        {/* Dial */}
        <circle cx="50" cy="62" r="22" stroke="#f59e0b" strokeWidth="4" fill="#0b1120" />
        {/* Dial ticks */}
        <line x1="50" y1="43" x2="50" y2="47" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="46" x2="43" y2="49" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="46" x2="57" y2="49" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />

        {/* Needle */}
        <line x1="50" y1="62" x2="57" y2="46" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="50" cy="62" r="5" fill="#f59e0b" />

        {/* Spark Star */}
        <path
          d="M50 12L52.5 21L60 23L53.5 27L54 35L49 29L41 31L46 25L43 18L49.5 20L50 12Z"
          fill="#fbbf24"
        />
        <circle cx="51" cy="23.5" r="2.5" fill="#ffffff" />

        {/* Bottom callsign label */}
        <rect x="26" y="86" width="48" height="10" rx="3" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
        <text
          x="50"
          y="93.5"
          fill="#38bdf8"
          fontSize="6.5"
          fontFamily="monospace"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.08em"
        >
          $DEADAIR
        </text>
      </svg>
    );
  }

  // 4. Favicon
  if (variant === 'favicon') {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="DEAD AIR Favicon"
      >
        <circle cx="16" cy="16" r="15" fill="#070a13" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M6 17A11 11 0 0 1 26 17" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="20" r="7" stroke="#f59e0b" strokeWidth="2" fill="#0e1726" />
        <line x1="16" y1="20" x2="19" y2="15" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 3L17 7L20 8L17.5 9.5L18 12.5L15.5 10.5L13 11L14.5 9L13.5 6.5L16 7V3Z" fill="#fbbf24" />
      </svg>
    );
  }

  // 5. Horizontal Wordmark (Default)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative shrink-0">
        <Logo variant="icon" size={size || 40} />
      </div>
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold tracking-tight text-white text-xl sm:text-2xl font-['Cinzel',serif] uppercase">
            DEAD AIR
          </span>
          <span className="inline-block text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 tracking-wider">
            $DEADAIR
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-amber-400/90 uppercase mt-0.5 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            00:07 // SOLANA
          </span>
        )}
      </div>
    </div>
  );
};
