import bicepsSrc from '../assets/bro-double-biceps.png';
import barbellSrc from '../assets/bro-barbell-hold.png';

/**
 * Static side mascots — original bodybuilder illustrations
 * in freepik/vecteezy monochrome vector style.
 * Left: front double biceps. Right: barbell hold.
 */
export function BackgroundBros() {
  return (
    <div className="background-bros" aria-hidden="true">
      <div className="background-bro background-bro--left">
        <img className="bro-img" src={bicepsSrc} alt="" draggable={false} />
      </div>
      <div className="background-bro background-bro--right">
        <img className="bro-img" src={barbellSrc} alt="" draggable={false} />
      </div>
    </div>
  );
}
