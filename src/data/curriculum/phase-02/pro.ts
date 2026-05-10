import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p2-pro',
  title: 'Global Liquidity & The Fiat Standard',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Fiat System', content: 'Fiat money is currency that lacks intrinsic value and is not backed by a physical commodity like gold.\n\nIts only value comes from the government declaring it legal tender, and the trust of the people using it.'
    },
    { id: 'p2', type: 'insight', title: 'The Gold Standard', content: 'Before 1971, the US Dollar was backed by gold. You could literally trade $35 for an ounce of physical gold. This restricted the government from printing infinite money, because they were limited by the gold in their vaults.'
    },
    { id: 'p3', type: 'concept', title: 'The Nixon Shock (1971)', content: 'In 1971, President Nixon permanently took the US off the gold standard. From that exact moment, the government gained the power to print infinite amounts of currency out of thin air.'
    },
    { id: 'p4', type: 'example', title: 'The Consequence', content: 'Since 1971, global debt has skyrocketed, wealth inequality has exploded, and the purchasing power of the dollar has plummeted. Asset prices (stocks, real estate) have inflated massively because they are priced in a currency that is constantly expanding.'
    },
    { id: 'p5', type: 'exercise', title: 'Fiat Logic', content: 'What gives Fiat money its value?', options: ['Gold in the Federal Reserve.', 'Mathematical scarcity.', 'Government decree and collective human trust.'], correctAnswer: 'Government decree and collective human trust.'
    },
    { id: 'p6', type: 'concept', title: 'Fractional Reserve Banking', content: 'When you deposit $1,000 in a bank, the bank does not keep $1,000 in a vault. They are legally allowed to lend out 90% of it ($900) to someone else.\n\nThat $900 gets deposited in another bank, which lends out 90% of it ($810).'
    },
    { id: 'p7', type: 'insight', title: 'The Money Multiplier', content: 'Through Fractional Reserve Banking, your initial $1,000 deposit can mathematically be turned into $10,000 of "new" money circulating in the economy. This is how the banking system creates credit.'
    },
    { id: 'p8', type: 'warning', title: 'The Bank Run', content: 'Because the bank only keeps 10% of the cash on hand, if everyone panics and tries to withdraw their money on the same day (A Bank Run), the bank collapses instantly because the money isn\'t actually there.'
    },
    { id: 'p9', type: 'concept', title: 'The Debt Supercycle', content: 'Ray Dalio popularized the concept of the Long-Term Debt Cycle. Every 75-100 years, debt builds up so massively in the system that interest rates hit 0%, and the only way out is for the Central Bank to devalue the currency to pay off the debt.'
    },
    { id: 'p10', type: 'insight', title: 'Deleverage Options', content: 'When a country is drowning in debt, they have 4 options: Austerity (cut spending), Default (refuse to pay), Wealth Transfer (tax the rich), or Print Money (devalue the currency to pay the debt with cheaper dollars).'
    },
    { id: 'p11', type: 'exercise', title: 'The Easy Way Out', content: 'Historically, which option do politicians almost ALWAYS choose to escape a massive debt crisis?', options: ['Austerity (cutting spending and angering voters).', 'Defaulting (destroying the country\'s credit).', 'Printing Money (inflating the debt away secretly).'], correctAnswer: 'Printing Money (inflating the debt away secretly).'
    },
    { id: 'p12', type: 'concept', title: 'Financial Repression', content: 'This occurs when the government artificially caps interest rates below the rate of inflation.\n\nIf inflation is 5%, but the bank only pays you 1%, the government is essentially stealing 4% of your wealth every year to pay off its own debt.'
    },
    { id: 'p13', type: 'concept', title: 'The Eurodollar Market', content: 'The Eurodollar market is the most important market you\'ve never heard of. It refers to US Dollars held in banks OUTSIDE of the United States (not subject to US banking regulations).'
    },
    { id: 'p14', type: 'insight', title: 'The Shadow Banking System', content: 'The Eurodollar market is massive, opaque, and unregulated. It is the true engine of global dollar liquidity. When Eurodollar liquidity dries up, the entire global financial system seizes up.'
    },
    { id: 'p15', type: 'concept', title: 'Repo & Reverse Repo', content: 'The Repurchase Agreement (Repo) market is the plumbing of Wall Street. Banks trade trillions of dollars overnight, using Treasury Bonds as collateral, just to ensure they have enough cash to open the next day.'
    },
    { id: 'p16', type: 'warning', title: 'When Plumbing Breaks', content: 'In 2008 and 2019, the Repo market froze because banks stopped trusting each other\'s collateral. When the plumbing freezes, the Central Bank is forced to step in with trillions in emergency liquidity.'
    },
    { id: 'p17', type: 'exercise', title: 'The Plumbing', content: 'What is the Repo market used for?', options: ['Buying used cars.', 'Overnight, ultra-short-term borrowing between massive banks using Treasury bonds as collateral.', 'Retail stock trading.'], correctAnswer: 'Overnight, ultra-short-term borrowing between massive banks using Treasury bonds as collateral.'
    },
    { id: 'p18', type: 'concept', title: 'Modern Monetary Theory (MMT)', content: 'An economic theory gaining massive popularity. It states that a country that prints its own currency (like the US) can never go bankrupt, because it can always print more money to pay its debts.'
    },
    { id: 'p19', type: 'insight', title: 'The MMT Catch', content: 'MMT theorists argue that the only limit to money printing is Inflation. If inflation gets too high, they argue the government should just raise taxes to destroy the excess money.'
    },
    { id: 'p20', type: 'warning', title: 'The Reality of MMT', content: 'Politicians love MMT because it gives them an excuse to print infinite money. However, they almost never have the political courage to raise taxes to stop the resulting inflation.'
    },
    { id: 'p21', type: 'concept', title: 'Hyperinflation', content: 'When a government prints so much money, so quickly, that the citizens completely lose faith in the currency. The currency collapses to zero.'
    },
    { id: 'p22', type: 'example', title: 'Weimar Republic & Zimbabwe', content: 'In Zimbabwe, inflation hit 79,600,000,000% per month in 2008. They had to print a 100 Trillion Dollar bill just to buy a loaf of bread.'
    },
    { id: 'p23', type: 'exercise', title: 'Hyperinflation Cause', content: 'What is the root cause of hyperinflation?', options: ['A sudden increase in gold mining.', 'A complete psychological loss of faith in the currency due to reckless, exponential government money printing.', 'A slight drop in the stock market.'], correctAnswer: 'A complete psychological loss of faith in the currency due to reckless, exponential government money printing.'
    },
    { id: 'p24', type: 'concept', title: 'The Cantillon Effect', content: 'When new money is printed, it does not distribute evenly. The people closest to the money printer (banks, hedge funds, politicians) get the money first, before prices rise.'
    },
    { id: 'p25', type: 'insight', title: 'The Inequality Engine', content: 'By the time the newly printed money reaches the middle class (via wages), inflation has already driven up the cost of housing and food. The Cantillon Effect is the mathematical root of modern wealth inequality.'
    },
    { id: 'p26', type: 'concept', title: 'Hard Money vs Easy Money', content: 'Easy money is fiat currency (easy to print). Hard money is an asset whose supply cannot be easily inflated (Gold, Bitcoin, prime Real Estate).'
    },
    { id: 'p27', type: 'insight', title: 'The Store of Value', content: 'Wealthy people do not hold cash. They hold Hard Assets. They use debt (borrowing depreciating fiat) to buy assets (appreciating hard money), legally dodging taxes and compounding wealth.'
    },
    { id: 'p28', type: 'exercise', title: 'The Wealth Strategy', content: 'According to the Cantillon Effect, who benefits the most from money printing?', options: ['The working class.', 'People on fixed pensions.', 'Those closest to the money creation (Banks, large corporations, and asset holders).'], correctAnswer: 'Those closest to the money creation (Banks, large corporations, and asset holders).'
    },
    { id: 'p29', type: 'concept', title: 'The Macro Endgame', content: 'As a Pro, your job is not to fix the system. Your job is to understand the mathematical reality of Fiat currency, and position your portfolio into assets that absorb the relentless printing of money.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of the Fiat Standard and the Cantillon Effect in a live dynamic scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "The year is 2020. A global crisis hits. The Central Bank announces they will print $4 Trillion and inject it into the banking system (Quantitative Easing). You have $100,000 in your bank account.",
        startingBalance: 100000,
        choices: [
          { text: "Keep the $100,000 in cash because the crisis is scary.", result: -20000, feedback: "You lost 20% of your purchasing power over the next two years. The $4 Trillion printed caused massive inflation. Your $100k now only buys what $80k used to buy." },
          { text: "Immediately deploy the cash into scarce assets (Real Estate, S&P 500, Bitcoin).", result: 50000, feedback: "Perfect execution. You understood the Cantillon Effect. The printed trillions flooded into the banks, who lent it to hedge funds, who bought assets. By front-running this liquidity, your portfolio skyrocketed 50%." },
          { text: "Buy Long-Term Government Bonds.", result: -15000, feedback: "The massive money printing eventually caused high inflation, forcing the Central Bank to raise interest rates two years later. The value of your low-interest bonds was crushed." }
        ]
      }
    }
  ]
};
