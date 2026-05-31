//src/components/common/icons/marioSidebar.tsx

export function MarioSidebar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Finance Tracker sidebar logo"
    >
      {/* Background bar - brutalist rectangle */}
      <rect width="300" height="80" className="fill-primary" />

      {/* Left accent strip */}
      <rect x="0" y="0" width="6" height="80" className="fill-secondary" />

      {/* Icon container */}
      <rect x="16" y="12" width="56" height="56" className="fill-background" />

      {/* Hexagonal coin in container */}
      <polygon
        points="44,18 66,30 66,50 44,62 22,50 22,30"
        className="fill-primary"
      />
      <polygon
        points="44,24 58,33 58,47 44,56 30,47 30,33"
        className="fill-primary/70"
      />

      {/* Dollar sign */}
      <text
        x="44"
        y="48"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="22"
        fontWeight="900"
        className="fill-background"
      >
        $
      </text>

      {/* FINANCE text - industrial monospace */}
      <text
        x="88"
        y="50"
        fontFamily="monospace"
        fontSize="26"
        fontWeight="900"
        letterSpacing="3"
        className="fill-background"
      >
        FINANCE
      </text>

      {/* Top scan line */}
      <rect
        x="88"
        y="20"
        width="120"
        height="2"
        className="fill-background/30"
      />

      {/* Bottom scan line */}
      <rect
        x="88"
        y="58"
        width="160"
        height="2"
        className="fill-background/30"
      />

      {/* Right side status bars */}
      <rect x="270" y="16" width="20" height="6" className="fill-secondary" />
      <rect
        x="270"
        y="28"
        width="14"
        height="6"
        className="fill-secondary/60"
      />
      <rect x="270" y="46" width="20" height="6" className="fill-accent" />
      <rect x="270" y="58" width="10" height="6" className="fill-accent/60" />
    </svg>
  );
}
