/**
 * Static side mascots — original bold bodybuilder silhouettes
 * in the classic freepik/vecteezy monochrome vector look.
 * Left: front double biceps. Right: barbell hold.
 */
export function BackgroundBros() {
  return (
    <div className="background-bros" aria-hidden="true">
      <div className="background-bro background-bro--left">
        <DoubleBicepsSvg />
      </div>
      <div className="background-bro background-bro--right">
        <BarbellHoldSvg />
      </div>
    </div>
  );
}

/** Left — classic front double-biceps pose. */
function DoubleBicepsSvg() {
  return (
    <svg
      className="bro-svg"
      viewBox="0 0 240 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Bodybuilder front double biceps</title>

      {/* Head */}
      <ellipse cx="120" cy="48" rx="26" ry="28" className="bro-fill" />
      {/* Jaw / brow cuts */}
      <path d="M104 42h10M126 42h10" className="bro-line" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M108 60q12 10 24 0" className="bro-line" strokeWidth="2.2" strokeLinecap="round" />
      {/* Neck */}
      <rect x="106" y="70" width="28" height="22" rx="4" className="bro-fill" />

      {/* Left flexed arm (shoulder → bicep → forearm → fist) */}
      <ellipse cx="58" cy="108" rx="28" ry="22" className="bro-fill" transform="rotate(-18 58 108)" />
      <ellipse cx="38" cy="78" rx="20" ry="28" className="bro-fill" transform="rotate(-35 38 78)" />
      <ellipse cx="48" cy="48" rx="14" ry="18" className="bro-fill" transform="rotate(-10 48 48)" />
      <circle cx="52" cy="30" r="12" className="bro-fill" />

      {/* Right flexed arm */}
      <ellipse cx="182" cy="108" rx="28" ry="22" className="bro-fill" transform="rotate(18 182 108)" />
      <ellipse cx="202" cy="78" rx="20" ry="28" className="bro-fill" transform="rotate(35 202 78)" />
      <ellipse cx="192" cy="48" rx="14" ry="18" className="bro-fill" transform="rotate(10 192 48)" />
      <circle cx="188" cy="30" r="12" className="bro-fill" />

      {/* Torso */}
      <path
        d="M78 92
           C62 118 60 160 72 200
           L88 228
           L152 228
           L168 200
           C180 160 178 118 162 92
           C148 78 132 72 120 72
           C108 72 92 78 78 92Z"
        className="bro-fill"
      />
      {/* Muscle lines */}
      <path
        d="M92 108q28 16 56 0
           M120 122v86
           M102 148h36M102 172h36M102 196h36
           M86 132q16 12 34 8q18 4 34-8"
        className="bro-line"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Trunks */}
      <path
        d="M88 220
           C100 248 140 248 152 220
           L148 242
           C138 258 102 258 92 242Z"
        className="bro-fill"
      />

      {/* Legs */}
      <path
        d="M96 240
           C90 280 84 320 78 352
           L108 352
           C110 310 112 274 114 240Z"
        className="bro-fill"
      />
      <path
        d="M144 240
           C150 280 156 320 162 352
           L132 352
           C130 310 128 274 126 240Z"
        className="bro-fill"
      />
      <path d="M98 290h20M142 290h-20" className="bro-line" strokeWidth="2" />
      {/* Feet */}
      <ellipse cx="86" cy="360" rx="22" ry="9" className="bro-fill" />
      <ellipse cx="154" cy="360" rx="22" ry="9" className="bro-fill" />
    </svg>
  );
}

/** Right — standing barbell hold. */
function BarbellHoldSvg() {
  return (
    <svg
      className="bro-svg"
      viewBox="0 0 260 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Bodybuilder holding a barbell</title>

      {/* Head */}
      <ellipse cx="130" cy="46" rx="26" ry="28" className="bro-fill" />
      <path d="M114 40h10M136 40h10" className="bro-line" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M118 58q12 10 24 0" className="bro-line" strokeWidth="2.2" strokeLinecap="round" />
      {/* Neck + traps */}
      <rect x="116" y="68" width="28" height="20" rx="4" className="bro-fill" />
      <path
        d="M88 100
           C100 82 114 74 130 74
           C146 74 160 82 172 100
           L160 108
           C150 96 140 90 130 90
           C120 90 110 96 100 108Z"
        className="bro-fill"
      />

      {/* Torso */}
      <path
        d="M88 100
           C74 126 72 168 84 208
           L98 236
           L162 236
           L176 208
           C188 168 186 126 172 100
           C160 86 146 80 130 80
           C114 80 100 86 88 100Z"
        className="bro-fill"
      />
      <path
        d="M102 114q28 14 56 0
           M130 126v88
           M112 152h36M112 176h36M112 200h36"
        className="bro-line"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Trunks */}
      <path
        d="M98 228
           C110 254 150 254 162 228
           L158 248
           C148 262 112 262 102 248Z"
        className="bro-fill"
      />

      {/* Legs */}
      <path
        d="M106 246
           C100 286 94 326 88 356
           L118 356
           C120 316 122 280 124 246Z"
        className="bro-fill"
      />
      <path
        d="M154 246
           C160 286 166 326 172 356
           L142 356
           C140 316 138 280 136 246Z"
        className="bro-fill"
      />
      <path d="M108 296h20M152 296h-20" className="bro-line" strokeWidth="2" />
      <ellipse cx="96" cy="364" rx="22" ry="9" className="bro-fill" />
      <ellipse cx="164" cy="364" rx="22" ry="9" className="bro-fill" />

      {/* Arms hanging */}
      <path
        d="M88 108
           C70 140 60 178 64 214
           L86 214
           C84 180 90 146 104 120Z"
        className="bro-fill"
      />
      <path
        d="M172 108
           C190 140 200 178 196 214
           L174 214
           C176 180 170 146 156 120Z"
        className="bro-fill"
      />
      {/* Hands */}
      <ellipse cx="78" cy="220" rx="14" ry="10" className="bro-fill" />
      <ellipse cx="182" cy="220" rx="14" ry="10" className="bro-fill" />

      {/* Barbell bar */}
      <rect x="16" y="216" width="228" height="8" rx="3" className="bro-fill" />
      {/* Left plates */}
      <circle cx="30" cy="220" r="26" className="bro-fill" />
      <circle cx="30" cy="220" r="14" className="bro-hole" />
      <circle cx="52" cy="220" r="16" className="bro-fill" />
      {/* Right plates */}
      <circle cx="230" cy="220" r="26" className="bro-fill" />
      <circle cx="230" cy="220" r="14" className="bro-hole" />
      <circle cx="208" cy="220" r="16" className="bro-fill" />
    </svg>
  );
}
