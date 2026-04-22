import { motion } from "framer-motion";
import { matchStroke } from "@/lib/mock-data";

interface Props {
  score: number;
  size?: number;
  stroke?: number;
  glow?: boolean;
  showLabel?: boolean;
}

export function CompatibilityRing({ score, size = 120, stroke = 8, glow = true, showLabel = true }: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = matchStroke(score);
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {glow && (
        <div
          className="absolute inset-2 rounded-full animate-pulse-glow"
          style={{ boxShadow: `0 0 30px ${color}55` }}
        />
      )}
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" className="text-muted" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tracking-tight" style={{ color }}>{score}%</span>
          <span className="text-xs text-muted-foreground font-medium">Match</span>
        </div>
      )}
    </div>
  );
}