export const svgEncode = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export const phase05Images = {
  candlestick: svgEncode(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#1c1917" />
      <line x1="200" y1="50" x2="200" y2="350" stroke="#10b981" stroke-width="8" stroke-linecap="round" />
      <rect x="150" y="100" width="100" height="200" fill="#10b981" rx="8" />
      <text x="230" y="55" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="16">High (Wick)</text>
      <line x1="200" y1="50" x2="225" y2="50" stroke="#a8a29e" stroke-width="2" />
      <text x="260" y="105" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="16">Close (Body)</text>
      <line x1="250" y1="100" x2="255" y2="100" stroke="#a8a29e" stroke-width="2" />
      <text x="260" y="305" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="16">Open (Body)</text>
      <line x1="250" y1="300" x2="255" y2="300" stroke="#a8a29e" stroke-width="2" />
      <text x="230" y="355" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="16">Low (Wick)</text>
      <line x1="200" y1="350" x2="225" y2="350" stroke="#a8a29e" stroke-width="2" />
    </svg>
  `),
  doji: svgEncode(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#1c1917" />
      <line x1="200" y1="100" x2="200" y2="300" stroke="#a8a29e" stroke-width="8" stroke-linecap="round" />
      <rect x="150" y="195" width="100" height="10" fill="#a8a29e" rx="4" />
      <text x="270" y="205" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="16">Open = Close</text>
      <text x="100" y="50" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="20">The Doji: Indecision</text>
    </svg>
  `),
  hammer: svgEncode(`
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#1c1917" />
      <line x1="200" y1="100" x2="200" y2="350" stroke="#10b981" stroke-width="8" stroke-linecap="round" />
      <rect x="150" y="100" width="100" height="60" fill="#10b981" rx="8" />
      <text x="250" y="250" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="16">Massive Buying Pressure</text>
      <text x="250" y="270" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="14">(Long Lower Wick)</text>
    </svg>
  `),
  supportResistance: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <rect x="50" y="100" width="500" height="30" fill="#ef4444" opacity="0.3" />
      <text x="60" y="90" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="16">Resistance Zone (Supply / Sellers)</text>
      <rect x="50" y="300" width="500" height="30" fill="#10b981" opacity="0.3" />
      <text x="60" y="350" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="16">Support Zone (Demand / Buyers)</text>
      <path d="M 100 200 L 150 115 L 250 315 L 350 115 L 450 315 L 500 200" fill="none" stroke="#60a5fa" stroke-width="6" stroke-linejoin="round" />
      <circle cx="150" cy="115" r="10" fill="#ef4444" />
      <circle cx="250" cy="315" r="10" fill="#10b981" />
      <circle cx="350" cy="115" r="10" fill="#ef4444" />
      <circle cx="450" cy="315" r="10" fill="#10b981" />
    </svg>
  `),
  liquiditySweep: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <rect x="50" y="150" width="500" height="20" fill="#ef4444" opacity="0.5" />
      <text x="60" y="140" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="16">Resistance</text>
      <text x="260" y="120" fill="#eab308" font-family="sans-serif" font-weight="bold" font-size="14">Retail Stop Losses (Liquidity)</text>
      <path d="M 100 300 L 200 160 L 250 160 L 300 80 L 350 250 L 450 350" fill="none" stroke="#60a5fa" stroke-width="6" stroke-linejoin="round" />
      <circle cx="300" cy="80" r="12" fill="#eab308" />
      <text x="320" y="70" fill="#eab308" font-family="sans-serif" font-weight="bold" font-size="16">Sweep / Fakeout!</text>
    </svg>
  `)
};
