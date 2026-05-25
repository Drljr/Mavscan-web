import type { ReactNode } from "react";

type ViewfinderFrameProps = {
  children: ReactNode;
  className?: string;
  showCorners?: boolean;
};

type CornerPosition = "tl" | "tr" | "bl" | "br";

const cornerSize = 60;
const strokeWidth = 6;
const strokeColor = "#22C55E";
const innerCornerRadius = 20;

function CornerBracket({ position }: { position: CornerPosition }) {
  const s = strokeWidth / 2;
  const r = innerCornerRadius;
  const end = cornerSize - s;
  const bendStart = s + r;
  const bendEnd = end - r;
  const brRadius = 22;
  const brBendEnd = end - brRadius;

  const paths: Record<CornerPosition, string> = {
    // Bend at top-left of SVG (meets image top-left)
    tl: `M ${s} ${end} L ${s} ${bendStart} A ${r} ${r} 0 0 1 ${bendStart} ${s} L ${end} ${s}`,
    // Bend at top-right of SVG (meets image top-right)
    tr: `M ${s} ${s} L ${bendEnd} ${s} A ${r} ${r} 0 0 1 ${end} ${bendStart} L ${end} ${end}`,
    // Bend at bottom-left of SVG (meets image bottom-left)
    bl: `M ${s} ${s} L ${s} ${bendEnd} A ${r} ${r} 0 0 0 ${bendStart} ${end} L ${end} ${end}`,
    // Bottom-right: original path (r=22, bend from end − r)
    br: `M ${end} ${s} L ${end} ${brBendEnd} A ${brRadius} ${brRadius} 0 0 1 ${brBendEnd} ${end} L ${s} ${end}`,
  };

  const positionClass: Record<CornerPosition, string> = {
    tl: "-left-6 -top-6",
    tr: "-right-6 -top-6",
    bl: "-left-6 -bottom-6",
    br: "-right-6 -bottom-6",
  };

  return (
    <svg
      width={cornerSize}
      height={cornerSize}
      viewBox={`0 0 ${cornerSize} ${cornerSize}`}
      fill="none"
      aria-hidden
      className={`pointer-events-none absolute ${positionClass[position]}`}
    >
      <path
        d={paths[position]}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ViewfinderFrame({
  children,
  className = "",
  showCorners = true,
}: ViewfinderFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {showCorners && (
        <>
          <CornerBracket position="tl" />
          <CornerBracket position="tr" />
          <CornerBracket position="bl" />
          <CornerBracket position="br" />
        </>
      )}
    </div>
  );
}
