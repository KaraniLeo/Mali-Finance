import { svgEncode } from './phase-05-images';

export const phase04Images = {
  incomeStatement: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <text x="200" y="50" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="24">Income Statement</text>
      <!-- Top Line -->
      <text x="100" y="120" fill="#10b981" font-family="sans-serif" font-size="20">Revenue (Sales)</text>
      <text x="400" y="120" fill="#10b981" font-family="sans-serif" font-size="20" text-anchor="end">$1,000,000</text>
      <line x1="80" y1="140" x2="520" y2="140" stroke="#a8a29e" stroke-width="1" />
      <!-- Middle -->
      <text x="100" y="180" fill="#ef4444" font-family="sans-serif" font-size="20">Cost of Goods Sold</text>
      <text x="400" y="180" fill="#ef4444" font-family="sans-serif" font-size="20" text-anchor="end">-$400,000</text>
      <text x="100" y="220" fill="#ef4444" font-family="sans-serif" font-size="20">Operating Expenses</text>
      <text x="400" y="220" fill="#ef4444" font-family="sans-serif" font-size="20" text-anchor="end">-$300,000</text>
      <line x1="80" y1="250" x2="520" y2="250" stroke="#a8a29e" stroke-width="2" />
      <!-- Bottom Line -->
      <text x="100" y="300" fill="#3b82f6" font-family="sans-serif" font-weight="bold" font-size="24">Net Income (Profit)</text>
      <text x="400" y="300" fill="#3b82f6" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="end">$300,000</text>
    </svg>
  `),
  balanceSheet: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <text x="220" y="50" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="24">Balance Sheet</text>
      <!-- Scale Line -->
      <line x1="300" y1="100" x2="300" y2="350" stroke="#a8a29e" stroke-width="4" />
      <!-- Assets -->
      <text x="150" y="120" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">ASSETS</text>
      <text x="150" y="160" fill="#a8a29e" font-family="sans-serif" font-size="16" text-anchor="middle">Cash</text>
      <text x="150" y="190" fill="#a8a29e" font-family="sans-serif" font-size="16" text-anchor="middle">Inventory</text>
      <text x="150" y="220" fill="#a8a29e" font-family="sans-serif" font-size="16" text-anchor="middle">Property</text>
      <text x="150" y="280" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="20" text-anchor="middle">Total: $1M</text>
      <!-- Liabilities & Equity -->
      <text x="450" y="120" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="24" text-anchor="middle">LIABILITIES</text>
      <text x="450" y="160" fill="#a8a29e" font-family="sans-serif" font-size="16" text-anchor="middle">Bank Debt</text>
      <text x="450" y="190" fill="#a8a29e" font-family="sans-serif" font-size="16" text-anchor="middle">Accounts Payable</text>
      <text x="450" y="230" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="20" text-anchor="middle">Debt: $600k</text>
      <line x1="350" y1="260" x2="550" y2="260" stroke="#a8a29e" stroke-width="1" />
      <text x="450" y="300" fill="#3b82f6" font-family="sans-serif" font-weight="bold" font-size="20" text-anchor="middle">Equity: $400k</text>
    </svg>
  `),
  dcfModel: svgEncode(`
    <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="400" fill="#1c1917" />
      <text x="150" y="50" fill="#a8a29e" font-family="sans-serif" font-weight="bold" font-size="24">Discounted Cash Flow (DCF)</text>
      <!-- Timeline -->
      <line x1="50" y1="200" x2="550" y2="200" stroke="#a8a29e" stroke-width="2" />
      <!-- Cash Flows -->
      <rect x="100" y="100" width="30" height="100" fill="#10b981" opacity="0.6" />
      <text x="115" y="230" fill="#a8a29e" font-family="sans-serif" font-size="14" text-anchor="middle">Yr 1</text>
      <rect x="200" y="80" width="30" height="120" fill="#10b981" opacity="0.7" />
      <text x="215" y="230" fill="#a8a29e" font-family="sans-serif" font-size="14" text-anchor="middle">Yr 2</text>
      <rect x="300" y="60" width="30" height="140" fill="#10b981" opacity="0.8" />
      <text x="315" y="230" fill="#a8a29e" font-family="sans-serif" font-size="14" text-anchor="middle">Yr 3</text>
      <!-- Discounting Arrows -->
      <path d="M 115 80 Q 80 50 50 150" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" />
      <path d="M 215 60 Q 150 20 50 150" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" />
      <path d="M 315 40 Q 200 -10 50 150" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" />
      <circle cx="50" cy="150" r="8" fill="#3b82f6" />
      <text x="50" y="260" fill="#3b82f6" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">Present Value</text>
    </svg>
  `)
};
