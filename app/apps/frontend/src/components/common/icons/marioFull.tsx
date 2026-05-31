//src/components/common/icons/marioFull.tsx

export function MarioFull({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Finance Tracker full logo"
    >
      {/* Top data bars - industrial HUD style */}
      <rect x="20" y="8" width="40" height="8" className="fill-secondary" />
      <rect x="65" y="8" width="25" height="8" className="fill-secondary/60" />
      <rect x="95" y="8" width="15" height="8" className="fill-secondary/40" />

      <rect x="190" y="8" width="15" height="8" className="fill-accent/40" />
      <rect x="210" y="8" width="25" height="8" className="fill-accent/60" />
      <rect x="240" y="8" width="40" height="8" className="fill-accent" />

      {/* Center divider */}
      <rect x="145" y="4" width="10" height="16" className="fill-primary" />

      {/* Main icon frame */}
      <rect x="75" y="30" width="150" height="110" className="fill-primary" />
      <rect x="85" y="40" width="130" height="90" className="fill-background" />

      {/* Large hexagonal coin */}
      <polygon
        points="150,48 200,75 200,115 150,142 100,115 100,75"
        className="fill-primary"
      />
      <polygon
        points="150,58 185,78 185,108 150,128 115,108 115,78"
        className="fill-primary/70"
      />

      {/* Dollar sign */}
      <text
        x="150"
        y="110"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="44"
        fontWeight="900"
        className="fill-background"
      >
        $
      </text>

      {/* Corner brackets - brutalist frame */}
      <path
        d="M75,30 L75,50 M75,30 L95,30"
        stroke="currentColor"
        strokeWidth="4"
        className="stroke-secondary"
      />
      <path
        d="M225,30 L225,50 M225,30 L205,30"
        stroke="currentColor"
        strokeWidth="4"
        className="stroke-secondary"
      />
      <path
        d="M75,140 L75,120 M75,140 L95,140"
        stroke="currentColor"
        strokeWidth="4"
        className="stroke-accent"
      />
      <path
        d="M225,140 L225,120 M225,140 L205,140"
        stroke="currentColor"
        strokeWidth="4"
        className="stroke-accent"
      />

      {/* App name - bold industrial */}
      <text
        x="150"
        y="164"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="22"
        fontWeight="900"
        letterSpacing="4"
        className="fill-primary"
      >
        FINANCE
      </text>

      {/* Bottom accent line */}
      <rect x="60" y="172" width="180" height="3" className="fill-muted" />

      {/* Side data indicators */}
      <rect x="20" y="50" width="8" height="30" className="fill-secondary" />
      <rect x="20" y="85" width="8" height="20" className="fill-secondary/50" />
      <rect
        x="20"
        y="110"
        width="8"
        height="10"
        className="fill-secondary/30"
      />

      <rect x="272" y="50" width="8" height="10" className="fill-accent/30" />
      <rect x="272" y="65" width="8" height="20" className="fill-accent/50" />
      <rect x="272" y="90" width="8" height="30" className="fill-accent" />
    </svg>
  );
}
