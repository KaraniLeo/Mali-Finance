import { svgEncode } from './phase-05-images';

export const phase01Images = {
  orderBook: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <text x="300" y="40" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">The Order Book</text>
      
      <!-- Sellers (Asks) -->
      <rect x="50" y="80" width="200" height="30" fill="#ef4444" opacity="0.8" />
      <text x="60" y="100" fill="#fff" font-family="monospace" font-size="16">Sell 100 @ $10.05</text>
      
      <rect x="50" y="120" width="150" height="30" fill="#ef4444" opacity="0.6" />
      <text x="60" y="140" fill="#fff" font-family="monospace" font-size="16">Sell 50  @ $10.04</text>
      
      <rect x="50" y="160" width="300" height="30" fill="#ef4444" opacity="0.9" />
      <text x="60" y="180" fill="#fff" font-family="monospace" font-size="16">Sell 500 @ $10.03 (Best Ask)</text>
      
      <!-- Spread -->
      <line x1="50" y1="205" x2="550" y2="205" stroke="#a8a29e" stroke-width="2" stroke-dasharray="4" />
      <text x="300" y="200" fill="#eab308" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">Spread: $0.02</text>
      
      <!-- Buyers (Bids) -->
      <rect x="50" y="220" width="250" height="30" fill="#10b981" opacity="0.9" />
      <text x="60" y="240" fill="#fff" font-family="monospace" font-size="16">Buy  200 @ $10.01 (Best Bid)</text>
      
      <rect x="50" y="260" width="100" height="30" fill="#10b981" opacity="0.6" />
      <text x="60" y="280" fill="#fff" font-family="monospace" font-size="16">Buy  25  @ $10.00</text>
      
      <rect x="50" y="300" width="400" height="30" fill="#10b981" opacity="0.8" />
      <text x="60" y="320" fill="#fff" font-family="monospace" font-size="16">Buy  1000 @ $9.95</text>
    </svg>
  `),
  auction: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <circle cx="300" cy="200" r="100" fill="#3b82f6" opacity="0.2" />
      <text x="300" y="190" fill="#3b82f6" font-family="sans-serif" font-weight="bold" font-size="20" text-anchor="middle">The Matching Engine</text>
      <text x="300" y="220" fill="#a8a29e" font-family="sans-serif" font-size="14" text-anchor="middle">(The Exchange)</text>
      
      <!-- Buyer -->
      <path d="M 100 200 L 200 200" stroke="#10b981" stroke-width="4" stroke-linecap="round" />
      <polygon points="200,190 220,200 200,210" fill="#10b981" />
      <text x="100" y="180" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="16">Market Buy Order</text>
      
      <!-- Seller -->
      <path d="M 500 200 L 400 200" stroke="#ef4444" stroke-width="4" stroke-linecap="round" />
      <polygon points="400,190 380,200 400,210" fill="#ef4444" />
      <text x="450" y="180" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">Limit Sell Order</text>
    </svg>
  `)
};
