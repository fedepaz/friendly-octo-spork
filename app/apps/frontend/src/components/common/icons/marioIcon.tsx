//src/components/common/icons/marioIcon.tsx

export function MarioIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Finance Tracker icon"
    >
      {/* Outer frame - brutalist square */}
      <rect x="10" y="10" width="180" height="180" className="fill-primary" />

      {/* Inner cut - industrial inset */}
      <rect
        x="20"
        y="20"
        width="160"
        height="160"
        className="fill-background"
      />

      {/* Hexagonal coin shape - industrial aesthetic */}
      <polygon
        points="100,35 155,67 155,133 100,165 45,133 45,67"
        className="fill-primary"
      />

      {/* Inner hexagon */}
      <polygon
        points="100,50 140,75 140,125 100,150 60,125 60,75"
        className="fill-primary/70"
      />

      {/* Dollar sign - bold industrial */}
      <text
        x="100"
        y="125"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="56"
        fontWeight="900"
        className="fill-background"
      >
        $
      </text>

      {/* Top bar - status indicator style */}
      <rect x="60" y="25" width="80" height="6" className="fill-secondary" />

      {/* Corner accents - brutalist detail */}
      <rect x="10" y="10" width="20" height="4" className="fill-secondary" />
      <rect x="10" y="10" width="4" height="20" className="fill-secondary" />
      <rect x="170" y="10" width="20" height="4" className="fill-secondary" />
      <rect x="186" y="10" width="4" height="20" className="fill-secondary" />
      <rect x="10" y="186" width="20" height="4" className="fill-accent" />
      <rect x="10" y="170" width="4" height="20" className="fill-accent" />
      <rect x="170" y="186" width="20" height="4" className="fill-accent" />
      <rect x="186" y="170" width="4" height="20" className="fill-accent" />
    </svg>
  );
}
