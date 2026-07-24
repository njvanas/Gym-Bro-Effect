/** Two-letter initials for a curator/creator name, e.g. "Dorian Yates" -> "DY". */
export function curatorInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Distinct avatar gradient per methodology (keyed by style id).
 * Every top-50 style must have an entry — do not rely on the brown fallback.
 */
const gradients: Record<string, string> = {
  // Original 12 (kept)
  'blood-and-guts': 'linear-gradient(135deg, #ef5350, #8b1a1a)',
  'heavy-duty': 'linear-gradient(135deg, #7a70ff, #3a2fb0)',
  'coleman-powerbuilding': 'linear-gradient(135deg, #f5a524, #b45309)',
  htlt: 'linear-gradient(135deg, #2dd4bf, #0e8a8a)',
  'heath-fst7': 'linear-gradient(135deg, #e879f9, #86198f)',
  'arnold-golden-era': 'linear-gradient(135deg, #fcd34d, #b45309)',
  'haney-stimulate': 'linear-gradient(135deg, #34d399, #047857)',
  'zane-aesthetics': 'linear-gradient(135deg, #93c5fd, #1d4ed8)',
  'cutler-volume': 'linear-gradient(135deg, #fb7185, #be123c)',
  'bannout-lion': 'linear-gradient(135deg, #fbbf24, #92400e)',
  'jackson-blade': 'linear-gradient(135deg, #cbd5e1, #475569)',
  'gaspari-annihilation': 'linear-gradient(135deg, #f87171, #991b1b)',

  // Expanded roster — unique hues, dark-first readable
  'bev-francis': 'linear-gradient(135deg, #f472b6, #9d174d)',
  'big-ramy': 'linear-gradient(135deg, #38bdf8, #0369a1)',
  'bill-pearl': 'linear-gradient(135deg, #a3e635, #3f6212)',
  'branch-warren': 'linear-gradient(135deg, #f97316, #9a3412)',
  'brandon-curry': 'linear-gradient(135deg, #c084fc, #6b21a8)',
  'casey-viator': 'linear-gradient(135deg, #67e8f9, #0e7490)',
  'chris-bumstead': 'linear-gradient(135deg, #4ade80, #166534)',
  'cory-everson': 'linear-gradient(135deg, #fda4af, #be123c)',
  'dennis-wolf': 'linear-gradient(135deg, #818cf8, #3730a3)',
  'flex-wheeler': 'linear-gradient(135deg, #e2e8f0, #64748b)',
  'franco-columbu': 'linear-gradient(135deg, #f59e0b, #92400e)',
  'hadi-choopan': 'linear-gradient(135deg, #22d3ee, #155e75)',
  'iris-kyle': 'linear-gradient(135deg, #f0abfc, #a21caf)',
  'kai-greene': 'linear-gradient(135deg, #84cc16, #3f6212)',
  'kevin-levrone': 'linear-gradient(135deg, #60a5fa, #1e40af)',
  'kim-chizevsky': 'linear-gradient(135deg, #fb7185, #9f1239)',
  'larry-scott': 'linear-gradient(135deg, #fde047, #a16207)',
  'lee-labrada': 'linear-gradient(135deg, #5eead4, #0f766e)',
  'lee-priest': 'linear-gradient(135deg, #f87171, #7f1d1d)',
  'lenda-murray': 'linear-gradient(135deg, #e879f9, #6b21a8)',
  'lou-ferrigno': 'linear-gradient(135deg, #86efac, #14532d)',
  'markus-ruhl': 'linear-gradient(135deg, #a78bfa, #4c1d95)',
  'nasser-el-sonbaty': 'linear-gradient(135deg, #fdba74, #c2410c)',
  'nick-walker': 'linear-gradient(135deg, #2dd4bf, #115e59)',
  'paul-dillett': 'linear-gradient(135deg, #94a3b8, #334155)',
  'rachel-mclish': 'linear-gradient(135deg, #f9a8d4, #db2777)',
  'reg-park': 'linear-gradient(135deg, #d4d4d8, #52525b)',
  'rich-piana': 'linear-gradient(135deg, #ef4444, #7f1d1d)',
  'robby-robinson': 'linear-gradient(135deg, #fbbf24, #b45309)',
  'serge-nubret': 'linear-gradient(135deg, #38bdf8, #1d4ed8)',
  'sergio-oliva': 'linear-gradient(135deg, #a3e635, #854d0e)',
  'shawn-ray': 'linear-gradient(135deg, #c4b5fd, #5b21b6)',
  'shawn-rhoden': 'linear-gradient(135deg, #f472b6, #831843)',
  'steve-reeves': 'linear-gradient(135deg, #7dd3fc, #075985)',
  'tom-platz': 'linear-gradient(135deg, #fb923c, #9a3412)',
  'victor-martinez': 'linear-gradient(135deg, #4ade80, #065f46)',
  'vince-gironda': 'linear-gradient(135deg, #e0e7ff, #4338ca)',
  'vince-taylor': 'linear-gradient(135deg, #fca5a5, #b91c1c)',
};

const FALLBACK_GRADIENT = 'linear-gradient(135deg, #c45c26, #7a3418)';

/** A distinct avatar gradient per curator (keyed by style id). */
export function curatorGradient(styleId: string): string {
  return gradients[styleId] ?? FALLBACK_GRADIENT;
}

/** Style ids that have an explicit (non-fallback) avatar gradient. */
export function curatorGradientIds(): string[] {
  return Object.keys(gradients);
}
