import { Phase } from '../../types/curriculum';

export const phase02: Phase = {
  id: 'phase-02',
  title: 'Phase 2: Macroeconomics & The Global Machine',
  description: 'Learn how central banks, interest rates, and inflation drive the massive currents that dictate the flow of all capital.',
  lessons: [
    {
      id: 'p2-l1',
      title: 'The Federal Reserve & Interest Rates',
      level: 'beginner',
      explanation: 'The Central Bank (like the Federal Reserve in the US) controls the cost of money. Interest rates act as gravity on asset prices. When interest rates are low, money is cheap to borrow, companies expand aggressively, and investors flood into the stock market looking for returns. When interest rates rise, borrowing becomes expensive, economic growth slows, and investors move their money into safe bonds.',
      insights: [
        'Interest rates and asset prices are like a seesaw. If rates go up, asset valuations generally go down.',
        'The Fed has a dual mandate: maximum employment and stable prices (controlling inflation).'
      ],
      pitfalls: [
        'Ignoring macroeconomic data. You can pick the best stock in the world, but if the macro environment is tightening violently, your stock will likely drop with the market.'
      ],
      subtopics: [
        {
          id: 'p2-l1-sub1',
          title: 'The Yield Curve',
          level: 'advanced',
          explanation: 'The yield curve plots interest rates of bonds with different maturity dates. A normal curve slopes upward. An "inverted" yield curve (where short-term rates are higher than long-term rates) is historically one of the most reliable predictors of an impending recession.',
          subtopics: [],
          examples: ['The 2-year Treasury yield rises above the 10-year Treasury yield, causing massive institutional shifts to cash.'],
          exercises: [],
          insights: ['Inversion happens when bond investors believe the central bank will be forced to cut rates in the future to rescue a failing economy.'],
          pitfalls: []
        }
      ],
      examples: [
        {
          id: 'ex-2-1',
          title: 'The 2022 Rate Shock',
          scenario: 'Inflation hit 9%. To stop it, the Fed raised interest rates at the fastest pace in history.',
          breakdown: 'Tech stocks, which rely on cheap borrowing for future growth, saw their valuations crushed. Bonds plummeted as well, creating one of the worst years for a 60/40 portfolio on record.'
        }
      ],
      exercises: [
        'Look up the current Federal Funds Rate.'
      ],
      tool: 'risk'
    },
    {
      id: 'p2-l2',
      title: 'Inflation vs. Deflation',
      level: 'intermediate',
      explanation: 'Inflation is the rate at which the general level of prices for goods and services is rising, eroding purchasing power. If inflation is 5%, a $100 bill today will only buy $95 worth of goods next year. Deflation is the opposite: prices fall, causing consumers to delay spending, which can spiral into an economic depression.',
      insights: [
        'Governments structurally prefer slight inflation (usually a 2% target) because it makes their massive national debts easier to pay off with "cheaper" future money.',
        'Hard assets (real estate, gold, scarce commodities) generally protect against inflation.'
      ],
      pitfalls: [
        'Keeping all your wealth in cash "to be safe". Cash is guaranteed to lose purchasing power over time due to inflation.'
      ],
      subtopics: [
        'CPI (Consumer Price Index)',
        'Fiat Currency Mechanics'
      ],
      examples: [],
      exercises: [
        'Calculate how long it takes for your purchasing power to halve at an inflation rate of 7% (Rule of 72).'
      ],
      tool: 'savings'
    }
  ]
};
