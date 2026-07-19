import { useEffect, useState } from 'react';

/**
 * Side mascots in pen-and-ink engraving style (inspired by classic gym woodcuts).
 * Any click/tap on the page triggers a flex pulse on both figures.
 */
export function BackgroundBros() {
  const [actionId, setActionId] = useState(0);

  useEffect(() => {
    function triggerAction() {
      setActionId((id) => id + 1);
    }

    document.addEventListener('pointerdown', triggerAction, true);
    return () => document.removeEventListener('pointerdown', triggerAction, true);
  }, []);

  return (
    <div className="background-bros" aria-hidden="true">
      <div className="background-bro background-bro--left" key={`left-${actionId}`}>
        <DoubleBicepsEngraving />
      </div>
      <div className="background-bro background-bro--right" key={`right-${actionId}`}>
        <BarbellEngraving />
      </div>
    </div>
  );
}

/** Shared hatch pattern for engraving shading. */
function EngravingDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`${id}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <line x1="0" y1="0" x2="0" y2="6" className="bro-hatch-line" />
      </pattern>
      <pattern id={`${id}-hatch-cross`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
        <line x1="0" y1="0" x2="0" y2="8" className="bro-hatch-line bro-hatch-line--dense" />
      </pattern>
    </defs>
  );
}

/** Left: front double-biceps engraving. */
function DoubleBicepsEngraving() {
  return (
    <svg
      className="bro-svg bro-svg--flex"
      viewBox="0 0 200 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Engraved bodybuilder in front double biceps pose</title>
      <EngravingDefs id="biceps" />

      <ellipse cx="100" cy="322" rx="42" ry="7" className="bro-ground" />

      {/* Legs */}
      <path
        d="M72 200 C66 230 62 268 58 308 M128 200 C134 230 138 268 142 308"
        className="bro-ink"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M68 248 C78 246 88 248 94 252 M132 248 C122 246 112 248 106 252"
        className="bro-ink"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path d="M58 308 H78 M122 308 H142" className="bro-ink" strokeWidth="8" strokeLinecap="round" />

      {/* Trunks */}
      <path
        d="M70 188 C78 204 122 204 130 188 L126 200 C118 210 82 210 74 200 Z"
        className="bro-ink-fill"
      />
      <path
        d="M70 188 C78 204 122 204 130 188 L126 200 C118 210 82 210 74 200 Z"
        fill="url(#biceps-hatch)"
        opacity="0.45"
      />

      {/* Torso */}
      <path
        d="M62 108 C52 132 54 168 70 190 L130 190 C146 168 148 132 138 108
           C128 96 118 92 100 92 C82 92 72 96 62 108 Z"
        className="bro-ink-fill"
      />
      <path
        d="M62 108 C52 132 54 168 70 190 L130 190 C146 168 148 132 138 108
           C128 96 118 92 100 92 C82 92 72 96 62 108 Z"
        fill="url(#biceps-hatch-cross)"
        opacity="0.35"
      />
      {/* Abs / pecs cut lines */}
      <path
        d="M100 118 V178 M86 136 H114 M86 152 H114 M86 168 H114
           M78 112 Q100 124 122 112 M72 128 Q84 138 100 132 Q116 138 128 128"
        className="bro-cut"
        strokeWidth="1.6"
      />

      {/* Neck + head */}
      <path d="M90 88 L90 100 M110 88 L110 100" className="bro-ink" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="100" cy="68" rx="24" ry="26" className="bro-ink-fill" />
      <ellipse cx="100" cy="68" rx="24" ry="26" fill="url(#biceps-hatch)" opacity="0.3" />
      <path d="M88 62 H94 M106 62 H112" className="bro-cut" strokeWidth="2" strokeLinecap="round" />
      <path d="M92 80 Q100 86 108 80" className="bro-cut" strokeWidth="1.8" strokeLinecap="round" />
      {/* Jaw / cheek hatch */}
      <path d="M78 72 L86 78 M118 72 L110 78" className="bro-cut" strokeWidth="1.4" />

      {/* Raised arms — double biceps */}
      <g className="bro-flex-arms">
        {/* Left arm */}
        <path
          d="M62 112 C40 100 28 78 34 58 C38 48 52 46 62 56 C70 64 72 78 68 90"
          className="bro-ink"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="42" cy="72" rx="14" ry="18" className="bro-ink-fill" transform="rotate(-25 42 72)" />
        <ellipse cx="42" cy="72" rx="14" ry="18" fill="url(#biceps-hatch)" opacity="0.4" transform="rotate(-25 42 72)" />
        <path d="M34 58 C28 48 30 38 38 34" className="bro-ink" strokeWidth="10" strokeLinecap="round" />

        {/* Right arm */}
        <path
          d="M138 112 C160 100 172 78 166 58 C162 48 148 46 138 56 C130 64 128 78 132 90"
          className="bro-ink"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="158" cy="72" rx="14" ry="18" className="bro-ink-fill" transform="rotate(25 158 72)" />
        <ellipse cx="158" cy="72" rx="14" ry="18" fill="url(#biceps-hatch)" opacity="0.4" transform="rotate(25 158 72)" />
        <path d="M166 58 C172 48 170 38 162 34" className="bro-ink" strokeWidth="10" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Right: barbell hold engraving. */
function BarbellEngraving() {
  return (
    <svg
      className="bro-svg bro-svg--lift"
      viewBox="0 0 200 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Engraved bodybuilder holding a barbell</title>
      <EngravingDefs id="barbell" />

      <ellipse cx="100" cy="322" rx="42" ry="7" className="bro-ground" />

      {/* Legs */}
      <path
        d="M74 200 C68 232 64 270 60 308 M126 200 C132 232 136 270 140 308"
        className="bro-ink"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M70 250 C80 248 90 250 96 254 M130 250 C120 248 110 250 104 254"
        className="bro-ink"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path d="M60 308 H80 M120 308 H140" className="bro-ink" strokeWidth="8" strokeLinecap="round" />

      {/* Trunks */}
      <path
        d="M72 186 C80 202 120 202 128 186 L124 198 C116 208 84 208 76 198 Z"
        className="bro-ink-fill"
      />
      <path
        d="M72 186 C80 202 120 202 128 186 L124 198 C116 208 84 208 76 198 Z"
        fill="url(#barbell-hatch)"
        opacity="0.45"
      />

      {/* Torso */}
      <path
        d="M64 106 C54 130 56 166 72 188 L128 188 C144 166 146 130 136 106
           C126 94 116 90 100 90 C84 90 74 94 64 106 Z"
        className="bro-ink-fill"
      />
      <path
        d="M64 106 C54 130 56 166 72 188 L128 188 C144 166 146 130 136 106
           C126 94 116 90 100 90 C84 90 74 94 64 106 Z"
        fill="url(#barbell-hatch-cross)"
        opacity="0.35"
      />
      <path
        d="M100 116 V176 M86 134 H114 M86 150 H114 M86 166 H114
           M78 110 Q100 122 122 110"
        className="bro-cut"
        strokeWidth="1.6"
      />

      {/* Neck + head */}
      <path d="M90 86 L90 98 M110 86 L110 98" className="bro-ink" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="100" cy="66" rx="24" ry="26" className="bro-ink-fill" />
      <ellipse cx="100" cy="66" rx="24" ry="26" fill="url(#barbell-hatch)" opacity="0.3" />
      <path d="M88 60 H94 M106 60 H112" className="bro-cut" strokeWidth="2" strokeLinecap="round" />
      <path d="M92 78 Q100 84 108 78" className="bro-cut" strokeWidth="1.8" strokeLinecap="round" />

      {/* Arms hanging to bar */}
      <g className="bro-lift-arms">
        <path
          d="M64 118 C48 140 40 168 48 196"
          className="bro-ink"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M136 118 C152 140 160 168 152 196"
          className="bro-ink"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Forearm bulk */}
        <path d="M48 168 C42 180 44 190 50 198" className="bro-ink" strokeWidth="10" strokeLinecap="round" />
        <path d="M152 168 C158 180 156 190 150 198" className="bro-ink" strokeWidth="10" strokeLinecap="round" />

        {/* Barbell */}
        <g className="bro-barbell-lift">
          <line x1="28" y1="200" x2="172" y2="200" className="bro-ink" strokeWidth="5" strokeLinecap="round" />
          {/* Left plates */}
          <circle cx="22" cy="200" r="18" className="bro-ink-fill" />
          <circle cx="22" cy="200" r="18" fill="url(#barbell-hatch)" opacity="0.4" />
          <circle cx="22" cy="200" r="11" className="bro-cut-fill" />
          <circle cx="34" cy="200" r="12" className="bro-ink-fill" />
          {/* Right plates */}
          <circle cx="178" cy="200" r="18" className="bro-ink-fill" />
          <circle cx="178" cy="200" r="18" fill="url(#barbell-hatch)" opacity="0.4" />
          <circle cx="178" cy="200" r="11" className="bro-cut-fill" />
          <circle cx="166" cy="200" r="12" className="bro-ink-fill" />
          {/* Hands on bar */}
          <ellipse cx="72" cy="200" rx="10" ry="7" className="bro-ink-fill" />
          <ellipse cx="128" cy="200" rx="10" ry="7" className="bro-ink-fill" />
        </g>
      </g>
    </svg>
  );
}
