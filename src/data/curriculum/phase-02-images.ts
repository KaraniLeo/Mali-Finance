import { svgEncode } from './phase-05-images';

export const phase02Images = {
  inflationChart: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <text x="300" y="40" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">Purchasing Power Over Time (Inflation)</text>
      <!-- Axes -->
      <line x1="50" y1="350" x2="550" y2="350" stroke="#a8a29e" stroke-width="2" />
      <line x1="50" y1="50" x2="50" y2="350" stroke="#a8a29e" stroke-width="2" />
      <!-- Line -->
      <path d="M 50 100 Q 200 150 550 330" fill="none" stroke="#ef4444" stroke-width="6" />
      <!-- Labels -->
      <text x="60" y="90" fill="#a8a29e" font-family="sans-serif" font-size="16">$100 in 1980</text>
      <text x="450" y="320" fill="#a8a29e" font-family="sans-serif" font-size="16">Value Today</text>
    </svg>
  `),
  centralBank: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <rect x="250" y="100" width="100" height="150" fill="#eab308" rx="8" />
      <polygon points="200,100 300,30 400,100" fill="#eab308" />
      <text x="300" y="80" fill="#1c1917" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">CB</text>
      <text x="300" y="300" fill="#eab308" font-family="sans-serif" font-weight="bold" font-size="20" text-anchor="middle">The Central Bank</text>
      <line x1="300" y1="320" x2="300" y2="380" stroke="#10b981" stroke-width="4" />
      <text x="320" y="360" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="16">Liquidity Injection (QE)</text>
    </svg>
  `),
  interestRates: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <text x="300" y="50" fill="#3b82f6" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">The Interest Rate See-Saw</text>
      <!-- See saw base -->
      <polygon points="300,250 280,350 320,350" fill="#a8a29e" />
      <!-- Plank -->
      <line x1="100" y1="150" x2="500" y2="300" stroke="#a8a29e" stroke-width="10" stroke-linecap="round" />
      <!-- Rates Side -->
      <circle cx="150" cy="110" r="40" fill="#ef4444" />
      <text x="150" y="115" fill="#fff" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">Rates Up</text>
      <!-- Economy Side -->
      <rect x="420" y="230" width="80" height="60" fill="#10b981" />
      <text x="460" y="265" fill="#fff" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">Markets Down</text>
    </svg>
  `)
};
