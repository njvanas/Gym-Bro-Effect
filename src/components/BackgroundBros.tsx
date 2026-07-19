import bicepsSrc from '../assets/bro-double-biceps.png';
import barbellSrc from '../assets/bro-barbell-hold.png';

/**
 * Static side mascots — original bodybuilder illustrations
 * in freepik/vecteezy monochrome vector style.
 * Left: front double biceps. Right: barbell hold.
 * Masked so only the figure shows in the theme ink color.
 */
export function BackgroundBros() {
  return (
    <div className="background-bros" aria-hidden="true">
      <div
        className="background-bro background-bro--left"
        style={{
          WebkitMaskImage: `url(${bicepsSrc})`,
          maskImage: `url(${bicepsSrc})`,
        }}
      />
      <div
        className="background-bro background-bro--right"
        style={{
          WebkitMaskImage: `url(${barbellSrc})`,
          maskImage: `url(${barbellSrc})`,
        }}
      />
    </div>
  );
}
