import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p13-pro',
  title: 'Global Liquidity & Macro Frameworks',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Eurodollar Market', content: 'The biggest financial market in the world that no one talks about. A Eurodollar is simply a U.S. Dollar held in a bank OUTSIDE the United States. It is an unregulated, offshore shadow-banking system.'
    },
    { id: 'p2', type: 'insight', title: 'The True Money Supply', content: 'Because Eurodollars are unregulated, foreign banks create trillions of them via lending without the Fed\'s permission. The Fed doesn\'t actually control the global money supply; the offshore Eurodollar market does.'
    },
    { id: 'p3', type: 'example', title: 'The Dollar Shortage', content: 'If there is a panic in Europe, foreign banks stop lending Eurodollars to each other. Suddenly, there is a massive global shortage of Dollars. The price of the U.S. Dollar violently spikes, crashing global asset prices.'
    },
    { id: 'p4', type: 'exercise', title: 'Shadow Banking', content: 'What is a "Eurodollar"?', options: ['A new currency created by combining the Euro and the Dollar.', 'A U.S. Dollar held in a bank outside the United States, operating in an unregulated offshore shadow-banking system.', 'A fake dollar.'], correctAnswer: 'A U.S. Dollar held in a bank outside the United States, operating in an unregulated offshore shadow-banking system.'
    },
    { id: 'p5', type: 'concept', title: 'The DXY (U.S. Dollar Index)', content: 'The DXY measures the strength of the U.S. Dollar against a basket of foreign currencies (like the Euro and Yen).'
    },
    { id: 'p6', type: 'insight', title: 'The Wrecking Ball', content: 'The DXY is the ultimate macro indicator. Because almost all assets (Stocks, Gold, Bitcoin) are priced in Dollars, when the DXY goes UP (Strong Dollar), asset prices usually go DOWN. The Dollar is a wrecking ball to global liquidity.'
    },
    { id: 'p7', type: 'exercise', title: 'Dollar Dominance', content: 'If the DXY (U.S. Dollar Index) is rapidly skyrocketing, what is the most likely reaction in the stock market and crypto market?', options: ['They will also skyrocket.', 'They will likely crash, because a stronger dollar acts as a wrecking ball to global liquidity and asset prices.', 'Nothing.'], correctAnswer: 'They will likely crash, because a stronger dollar acts as a wrecking ball to global liquidity and asset prices.'
    },
    { id: 'p8', type: 'concept', title: 'The Repurchase (Repo) Market', content: 'The plumbing of the financial system. Banks lend each other trillions of dollars overnight, using Treasury bonds as collateral, just to meet their daily cash requirements.'
    },
    { id: 'p9', type: 'warning', title: 'The Plumbing Freezes', content: 'In September 2019, banks suddenly stopped trusting each other and refused to lend in the Repo market. The interest rate spiked from 2% to 10% instantly. The Fed had to print billions overnight to prevent the entire global banking system from collapsing.'
    },
    { id: 'p10', type: 'concept', title: 'Yield Curve Control (YCC)', content: 'When QE isn\'t enough, a Central Bank (like Japan) will enforce YCC. They legally mandate that the 10-year bond yield cannot go above 0.25%. To enforce this, they must print infinite amounts of money to buy every single bond that anyone tries to sell.'
    },
    { id: 'p11', type: 'insight', title: 'Sacrificing the Currency', content: 'By printing infinite money to save the Bond market, Japan destroyed the value of their currency (the Yen). In macro, you can save the Bonds, or you can save the Currency. You cannot save both.'
    },
    { id: 'p12', type: 'exercise', title: 'Endgame Economics', content: 'If a Central Bank implements "Yield Curve Control" by printing infinite money to buy bonds, what is the inevitable consequence?', options: ['The economy becomes perfect.', 'The purchasing power of the national currency collapses on the global market.', 'Taxes go to zero.'], correctAnswer: 'The purchasing power of the national currency collapses on the global market.'
    },
    { id: 'p13', type: 'concept', title: 'The Triffin Dilemma', content: 'The core paradox of the global reserve currency. To provide the world with enough Dollars for global trade, the U.S. MUST run massive, permanent trade deficits. But running permanent trade deficits eventually bankrupts the U.S. and destroys confidence in the Dollar.'
    },
    { id: 'p14', type: 'concept', title: 'Bridgewater\'s "All Weather" Framework', content: 'Ray Dalio\'s massive hedge fund trades based on two metrics: Is Growth rising or falling? Is Inflation rising or falling? This creates a 4-quadrant grid. You rotate assets based on which quadrant the economy is shifting into.'
    },
    { id: 'p15', type: 'insight', title: 'The Quadrants', content: 'Growth Up/Inflation Down (Buy Tech Stocks). Growth Down/Inflation Down (Buy Bonds). Growth Down/Inflation Up (Buy Gold/Commodities). You never guess; you just track the data and rotate.'
    },
    { id: 'p16', type: 'exercise', title: 'Macro Rotation', content: 'According to the All-Weather macro framework, what asset class performs best when Economic Growth is falling rapidly, but Inflation is skyrocketing (Stagflation)?', options: ['Tech Stocks', 'Gold and Hard Commodities', 'Corporate Bonds'], correctAnswer: 'Gold and Hard Commodities'
    },
    { id: 'p17', type: 'concept', title: 'Real Rates', content: 'Real Interest Rate = Nominal Interest Rate - Inflation. If the bank pays you 5%, but inflation is 8%, the Real Rate is -3%.'
    },
    { id: 'p18', type: 'insight', title: 'The Gold Correlation', content: 'Gold does not track inflation perfectly. Gold tracks REAL RATES. When Real Rates are deeply negative (meaning holding cash guarantees you lose purchasing power), Gold skyrockets as investors flee cash.'
    },
    { id: 'p19', type: 'concept', title: 'The BIS (Bank for International Settlements)', content: 'The Central Bank of Central Banks. Based in Switzerland, it settles accounts between nations and dictates global banking regulations (Basel III), which determines how much gold vs paper assets banks are legally required to hold.'
    },
    { id: 'p20', type: 'warning', title: 'Regulatory Arbitrage', content: 'If the BIS changes the rules to classify Gold as a "Tier 1" risk-free asset, global banks will quietly sell their Treasury bonds and aggressively accumulate Gold, driving a massive multi-year supercycle.'
    },
    { id: 'p21', type: 'concept', title: 'Demographics is Destiny', content: 'Macro isn\'t just money; it\'s people. If a country\'s population is aging and shrinking (like Japan or Italy), economic growth is mathematically impossible, regardless of what the central bank does.'
    },
    { id: 'p22', type: 'insight', title: 'The Dependency Ratio', content: 'If there are 5 retirees taking pensions for every 1 young person working and paying taxes, the system collapses. The only mathematical escape is massive money printing to fund the unfunded liabilities.'
    },
    { id: 'p23', type: 'exercise', title: 'Demographic Economics', content: 'Why does an aging, shrinking population guarantee massive future money printing?', options: ['Because older people like cash.', 'Because the government must print money to pay the massive unfunded pension/healthcare liabilities since there are not enough young workers to tax.', 'Because the banks mandate it.'], correctAnswer: 'Because the government must print money to pay the massive unfunded pension/healthcare liabilities since there are not enough young workers to tax.'
    },
    { id: 'p24', type: 'concept', title: 'The End of the Long-Term Debt Cycle', content: 'We are currently approaching the end of the 80-year cycle. Debt-to-GDP ratios globally are at World War 2 levels. The math cannot be sustained.'
    },
    { id: 'p25', type: 'insight', title: 'The Fourth Turning', content: 'Historically, this leads to a massive paradigm shift. Wealth is violently redistributed through inflation, taxation, or geopolitical conflict. The old financial system is restructured, and a new one is born.'
    },
    { id: 'p26', type: 'concept', title: 'Bitcoin as a Macro Asset', content: 'Bitcoin was not designed to be a tech stock. It was designed to be an apolitical, mathematically scarce escape hatch from the inevitable collapse of the sovereign debt cycle.'
    },
    { id: 'p27', type: 'insight', title: 'The Apex Predator', content: 'In a world where every central bank is forced to print infinite money to fund their debt, an asset with a hard-capped supply of 21 million becomes the apex predator of the financial ecosystem.'
    },
    { id: 'p28', type: 'warning', title: 'The Timeline', content: 'The macro endgame takes decades to play out. "The market can stay irrational longer than you can stay solvent." Do not leverage your entire portfolio on an apocalypse thesis.'
    },
    { id: 'p29', type: 'concept', title: 'Summary', content: 'You are a passenger on a massive ship steered by central banks, demographics, and debt cycles. You cannot steer the ship, but if you read the currents, you can get to the lifeboats before it hits the iceberg.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of the Dollar Wrecking Ball in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "The Federal Reserve unexpectedly hikes rates by 0.75%. The DXY (U.S. Dollar Index) rockets upward, breaking a 20-year resistance line. A massive liquidity crisis begins in the offshore Eurodollar market.",
        startingBalance: 1000000,
        choices: [
          { text: "Buy Bitcoin and Gold immediately to protect against the Fed.", result: -300000, feedback: "You failed to understand the DXY correlation. A skyrocketing Dollar crushes everything priced in Dollars. Gold, Bitcoin, and Stocks all violently crashed as the global market scrambled for U.S. Dollars to pay off offshore debts." },
          { text: "Short the S&P 500 and hold massive U.S. Dollar cash positions.", result: 500000, feedback: "Pro execution. You understood that a breaking DXY acts as a wrecking ball to all risk assets. You rode the Dollar strength to massive profits while the rest of the world burned." },
          { text: "Buy emerging market foreign stocks because they are 'cheap'.", result: -600000, feedback: "A fatal error. A strong U.S. Dollar bankrupts emerging markets (like Argentina or Turkey) because their national debt is denominated in U.S. Dollars. Their debt just became exponentially more expensive. Their economies collapsed." }
        ]
      }
    }
  ]
};
