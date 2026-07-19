import type { CSSProperties } from 'react';

const ICONS = [
  { icon: '🏋️', top: '5%', left: '4%', rotate: '-18deg', size: '1.6rem' },
  { icon: '🥗', top: '8%', left: '38%', rotate: '10deg', size: '1.5rem' },
  { icon: '💪', top: '6%', left: '72%', rotate: '16deg', size: '1.8rem' },
  { icon: '🍎', top: '12%', left: '88%', rotate: '-12deg', size: '1.4rem' },
  { icon: '🥩', top: '18%', left: '16%', rotate: '8deg', size: '1.5rem' },
  { icon: '🏋️', top: '22%', left: '54%', rotate: '-20deg', size: '2rem' },
  { icon: '🥑', top: '26%', left: '80%', rotate: '14deg', size: '1.45rem' },
  { icon: '🍗', top: '32%', left: '6%', rotate: '-8deg', size: '1.55rem' },
  { icon: '💪', top: '36%', left: '34%', rotate: '22deg', size: '1.7rem' },
  { icon: '🥦', top: '40%', left: '62%', rotate: '-14deg', size: '1.5rem' },
  { icon: '🥛', top: '44%', left: '90%', rotate: '6deg', size: '1.4rem' },
  { icon: '🏋️‍♂️', top: '50%', left: '20%', rotate: '-16deg', size: '1.9rem' },
  { icon: '🍌', top: '54%', left: '48%', rotate: '12deg', size: '1.45rem' },
  { icon: '🥗', top: '58%', left: '76%', rotate: '-10deg', size: '1.6rem' },
  { icon: '🍖', top: '64%', left: '8%', rotate: '18deg', size: '1.5rem' },
  { icon: '💪', top: '68%', left: '40%', rotate: '-6deg', size: '1.75rem' },
  { icon: '🍎', top: '72%', left: '68%', rotate: '20deg', size: '1.4rem' },
  { icon: '🏋️', top: '76%', left: '92%', rotate: '-22deg', size: '1.85rem' },
  { icon: '🥚', top: '82%', left: '14%', rotate: '9deg', size: '1.35rem' },
  { icon: '🥑', top: '86%', left: '42%', rotate: '-15deg', size: '1.5rem' },
  { icon: '🥩', top: '88%', left: '70%', rotate: '11deg', size: '1.55rem' },
  { icon: '🥗', top: '92%', left: '28%', rotate: '-19deg', size: '1.45rem' },
  { icon: '💪', top: '94%', left: '56%', rotate: '7deg', size: '1.65rem' },
  { icon: '🥦', top: '48%', left: '2%', rotate: '24deg', size: '1.4rem' },
] as const;

/** Decorative dumbbell / food icons behind all sections. */
export function IconBackdrop() {
  return (
    <div className="icon-backdrop" aria-hidden="true">
      {ICONS.map(({ icon, top, left, rotate, size }, index) => (
        <span
          className="icon-backdrop__glyph"
          key={`${icon}-${index}`}
          style={
            {
              top,
              left,
              fontSize: size,
              '--rot': rotate,
              '--i': index,
            } as CSSProperties
          }
        >
          {icon}
        </span>
      ))}
    </div>
  );
}
