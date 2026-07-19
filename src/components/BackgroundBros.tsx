import { useEffect, useState } from 'react';

/**
 * Drawn side mascots: left curls a barbell, right bites steak.
 * Any click/tap on the page triggers both actions.
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
      <div className="background-bro background-bro--curl" key={`curl-${actionId}`}>
        <CurlBroSvg />
      </div>
      <div className="background-bro background-bro--steak" key={`steak-${actionId}`}>
        <SteakBroSvg />
      </div>
    </div>
  );
}

function CurlBroSvg() {
  return (
    <svg
      className="bro-svg bro-svg--curl"
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Drawn bodybuilder curling a barbell</title>
      {/* Ground shadow */}
      <ellipse cx="100" cy="300" rx="48" ry="8" className="bro-ink-soft" />

      {/* Legs */}
      <path
        d="M78 188 L70 248 L62 292 M122 188 L130 248 L138 292"
        className="bro-ink"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M72 230 L92 228 M128 230 L108 228"
        className="bro-ink"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Torso */}
      <path
        d="M68 108 C58 128 56 158 70 188 L130 188 C144 158 142 128 132 108 Z"
        className="bro-fill"
      />
      <path
        d="M68 108 C58 128 56 158 70 188 L130 188 C144 158 142 128 132 108 Z"
        className="bro-ink"
        strokeWidth="3"
      />
      {/* Abs / chest lines */}
      <path d="M100 128 V178 M86 148 H114 M86 162 H114" className="bro-ink-soft" strokeWidth="2" />
      <path d="M78 124 Q100 136 122 124" className="bro-ink-soft" strokeWidth="2.5" />

      {/* Neck + head */}
      <path d="M92 96 L92 110 M108 96 L108 110" className="bro-ink" strokeWidth="8" strokeLinecap="round" />
      <circle cx="100" cy="78" r="22" className="bro-fill" />
      <circle cx="100" cy="78" r="22" className="bro-ink" strokeWidth="3" />
      <path d="M90 74 H94 M106 74 H110" className="bro-ink" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M94 88 Q100 92 106 88" className="bro-ink" strokeWidth="2" strokeLinecap="round" />

      {/* Left arm idle support */}
      <path d="M68 120 L42 150 L38 178" className="bro-ink" strokeWidth="11" strokeLinecap="round" />

      {/* Right curling arm + barbell (animated group) */}
      <g className="bro-curl-arm">
        <path d="M132 120 L158 138" className="bro-ink" strokeWidth="12" strokeLinecap="round" />
        <path d="M158 138 L148 168" className="bro-ink bro-curl-forearm" strokeWidth="11" strokeLinecap="round" />
        <g className="bro-barbell">
          <line x1="118" y1="168" x2="178" y2="168" className="bro-ink" strokeWidth="5" strokeLinecap="round" />
          <rect x="112" y="158" width="10" height="20" rx="2" className="bro-accent-fill" />
          <rect x="178" y="158" width="10" height="20" rx="2" className="bro-accent-fill" />
          <rect x="106" y="154" width="8" height="28" rx="2" className="bro-ink-fill" />
          <rect x="186" y="154" width="8" height="28" rx="2" className="bro-ink-fill" />
        </g>
      </g>

      {/* Accent sweat / energy mark */}
      <path d="M148 96 L154 88 L152 98" className="bro-accent" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SteakBroSvg() {
  return (
    <svg
      className="bro-svg bro-svg--steak"
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Drawn bodybuilder eating a steak</title>
      <ellipse cx="100" cy="300" rx="48" ry="8" className="bro-ink-soft" />

      <path
        d="M78 188 L70 248 L62 292 M122 188 L130 248 L138 292"
        className="bro-ink"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M72 230 L92 228 M128 230 L108 228"
        className="bro-ink"
        strokeWidth="14"
        strokeLinecap="round"
      />

      <path
        d="M68 108 C58 128 56 158 70 188 L130 188 C144 158 142 128 132 108 Z"
        className="bro-fill"
      />
      <path
        d="M68 108 C58 128 56 158 70 188 L130 188 C144 158 142 128 132 108 Z"
        className="bro-ink"
        strokeWidth="3"
      />
      <path d="M100 128 V178 M86 148 H114 M86 162 H114" className="bro-ink-soft" strokeWidth="2" />
      <path d="M78 124 Q100 136 122 124" className="bro-ink-soft" strokeWidth="2.5" />

      <path d="M92 96 L92 110 M108 96 L108 110" className="bro-ink" strokeWidth="8" strokeLinecap="round" />
      <circle cx="100" cy="78" r="22" className="bro-fill" />
      <circle cx="100" cy="78" r="22" className="bro-ink" strokeWidth="3" />
      <path d="M90 74 H94 M106 74 H110" className="bro-ink" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M94 88 Q100 94 106 88"
        className="bro-ink bro-mouth"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Left arm on hip */}
      <path d="M68 122 L44 156 L52 188" className="bro-ink" strokeWidth="11" strokeLinecap="round" />

      {/* Right arm holding steak */}
      <g className="bro-steak-arm">
        <path d="M132 120 L162 146" className="bro-ink" strokeWidth="12" strokeLinecap="round" />
        <path d="M162 146 L150 176" className="bro-ink" strokeWidth="11" strokeLinecap="round" />
        <g className="bro-steak">
          <path
            d="M138 168 C146 158 168 160 172 172 C176 184 158 196 146 190 C134 184 130 176 138 168 Z"
            className="bro-steak-fill"
          />
          <path
            d="M138 168 C146 158 168 160 172 172 C176 184 158 196 146 190 C134 184 130 176 138 168 Z"
            className="bro-ink"
            strokeWidth="2.5"
          />
          <path d="M148 172 L160 180 M152 168 L164 176" className="bro-ink-soft" strokeWidth="2" />
          {/* Fork */}
          <path d="M156 196 L156 210 M150 198 L150 208 M162 198 L162 208" className="bro-accent" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
