import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p3-intermediate',
  title: 'Portfolio Correlation & Hedging',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Illusion of Diversification', content: 'Holding 10 different Tech stocks is NOT diversification. If the Nasdaq crashes, all 10 of those stocks will crash together.'
    },
    { id: 'i2', type: 'insight', title: 'Correlation Coefficient', content: 'Correlation is a math metric from -1 to 1.\n\nIf two assets have a correlation of 1, they move in the exact same direction. If they have a correlation of -1, they move in exact opposite directions.'
    },
    { id: 'i3', type: 'example', title: 'Perfect Positive Correlation', content: 'Bitcoin and Ethereum usually have a correlation near 0.9. If Bitcoin crashes 10%, Ethereum will almost certainly crash 10-15% on the exact same day.'
    },
    { id: 'i4', type: 'concept', title: 'The Holy Grail of Investing', content: 'Ray Dalio says the Holy Grail of investing is finding 15 uncorrelated return streams. If you find assets that go up over time, but do NOT crash at the same time, your risk drops to almost zero while your returns remain high.'
    },
    { id: 'i5', type: 'exercise', title: 'Correlation Check', content: 'Which two assets likely have a Negative Correlation (-1)?', options: ['Apple and Microsoft.', 'An {{INTERNATIONAL:S&P 500 index|KENYA:NSE 20 Share Index}} Index Fund and a Gold ETF.', 'ExxonMobil and Chevron.'], correctAnswer: 'An {{INTERNATIONAL:S&P 500 index|KENYA:NSE 20 Share Index}} Index Fund and a Gold ETF.'
    },
    { id: 'i6', type: 'concept', title: 'What is Hedging?', content: 'Hedging is buying insurance for your portfolio. You intentionally take a small position that you EXPECT to lose money on, but if a black swan disaster happens, that position pays out massively.'
    },
    { id: 'i7', type: 'example', title: 'The Put Option Hedge', content: 'You own $100,000 of Apple stock. You are worried earnings will be terrible next week. You buy a $1,000 Put Option (a bet that the stock will crash). If Apple moons, you lose the $1,000. If Apple crashes 30%, the Put Option prints $30,000, saving your portfolio.'
    },
    { id: 'i8', type: 'warning', title: 'Over-Hedging', content: 'Insurance costs money. If you hedge every single position, the cost of the premiums will slowly bleed your portfolio dry. Only hedge against catastrophic risk.'
    },
    { id: 'i9', type: 'concept', title: 'Drawdown', content: 'A Drawdown is the peak-to-trough decline of your portfolio. If your account hits $100k, then drops to $80k, you are in a 20% drawdown.'
    },
    { id: 'i10', type: 'insight', title: 'Managing the Drawdown', content: 'Professional funds are judged strictly on their Maximum Drawdown. A fund that returns 20% a year but suffers 50% drawdowns is considered trash compared to a fund that returns 15% with only 5% drawdowns.'
    },
    { id: 'i11', type: 'exercise', title: 'Drawdown Math', content: 'Why do professionals obsess over Maximum Drawdown rather than pure returns?', options: ['Because large drawdowns require exponentially larger returns just to break even, risking total ruin.', 'Because they hate making money.', 'Because drawdowns lower taxes.'], correctAnswer: 'Because large drawdowns require exponentially larger returns just to break even, risking total ruin.'
    },
    { id: 'i12', type: 'concept', title: 'The VIX (Volatility Index)', content: 'The VIX is the "Fear Gauge" of the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}}. It measures the amount of Put Options (crash insurance) institutions are buying on the {{INTERNATIONAL:S&P 500 index|KENYA:NSE 20 Share Index}}.'
    },
    { id: 'i13', type: 'insight', title: 'Reading the VIX', content: 'When the VIX is below 15, the market is calm and complacent. When the VIX spikes above 30, there is absolute panic and blood in the streets.'
    },
    { id: 'i14', type: 'concept', title: 'Kelly Criterion', content: 'A mathematical formula used by pro gamblers and hedge funds to determine exactly how much of their bankroll to risk on a bet, based on the Win Rate and the Risk/Reward ratio.'
    },
    { id: 'i15', type: 'warning', title: 'The Kelly Warning', content: 'The Kelly formula maximizes long-term compounding, but it is extremely volatile. Most traders use "Half-Kelly" to smooth out the brutal drawdowns.'
    },
    { id: 'i16', type: 'exercise', title: 'VIX Logic', content: 'If the VIX suddenly rockets from 15 to 40, what is happening?', options: ['The market is going straight up.', 'Institutions are panicking and violently buying crash insurance.', '{{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} were cut.'], correctAnswer: 'Institutions are panicking and violently buying crash insurance.'
    },
    { id: 'i17', type: 'concept', title: 'Expected Value (EV)', content: 'Expected Value is the mathematical average of all possible outcomes. EV = (Win Rate × Average Win) - (Loss Rate × Average Loss).'
    },
    { id: 'i18', type: 'example', title: 'Positive EV (+EV)', content: 'If a trade setup wins 40% of the time making $300, and loses 60% of the time losing $100. EV = (0.4 × 300) - (0.6 × 100) = $120 - $60 = +$60. This is a highly profitable system.'
    },
    { id: 'i19', type: 'insight', title: 'Trading is just Probability', content: 'Once you find a system with Positive EV, trading stops being emotional. It just becomes a numbers game. You execute the system 1,000 times, knowing the math guarantees a profit over a large sample size.'
    },
    { id: 'i20', type: 'concept', title: 'Sequence of Returns Risk', content: 'A 50% loss followed by a 50% gain does NOT equal zero. 100 * 0.5 = 50. 50 * 1.5 = 75. You are still down 25%.'
    },
    { id: 'i21', type: 'warning', title: 'The Retirement Trap', content: 'If you retire and the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} crashes 40% in your first year, and you are forced to sell stocks to buy groceries at the absolute bottom, you will run out of money before you die. This is Sequence Risk.'
    },
    { id: 'i22', type: 'exercise', title: 'EV Calculation', content: 'If you flip a coin (50% win rate). Heads you win $200. Tails you lose $100. What is the Expected Value (EV)?', options: ['+$50', '+$100', '+$200'], correctAnswer: '+$50'
    },
    { id: 'i23', type: 'concept', title: 'Beta', content: 'Beta measures how volatile a stock is compared to the overall market. The market ({{INTERNATIONAL:S&P 500 index|KENYA:NSE 20 Share Index}}) has a Beta of 1.0.'
    },
    { id: 'i24', type: 'example', title: 'High vs Low Beta', content: 'Tesla might have a Beta of 2.0 (if the market goes up 1%, Tesla goes up 2%). A utility stock might have a Beta of 0.5 (very stable, slow moving).'
    },
    { id: 'i25', type: 'concept', title: 'Value at Risk (VaR)', content: 'A statistic used by Wall Street banks to quantify the level of financial risk within a firm over a specific time frame. E.g., "There is a 5% chance we lose $50 Million tomorrow."'
    },
    { id: 'i26', type: 'warning', title: 'Black Swan Events', content: 'VaR relies on normal bell-curve statistics. A Black Swan is an unpredictable, catastrophic event (like a global pandemic) that breaks all statistical models. You cannot model a Black Swan, you can only survive it by being under-leveraged.'
    },
    { id: 'i27', type: 'exercise', title: 'Beta Logic', content: 'If you think the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} is about to crash, but you must stay invested, what type of stocks should you rotate into?', options: ['High Beta stocks (like tech startups).', 'Low Beta stocks (like utilities and consumer staples).', 'Crypto.'], correctAnswer: 'Low Beta stocks (like utilities and consumer staples).'
    },
    { id: 'i28', type: 'concept', title: 'Stress Testing', content: 'Professionals run their portfolios through historical stress tests: "What would happen to my portfolio if the 2008 Financial Crisis happened again today?" If the answer is bankruptcy, the portfolio is too risky.'
    },
    { id: 'i29', type: 'insight', title: 'Risk is what you don\'t see', content: 'The biggest risk is never the thing everyone is talking about on the news. The biggest risk is the hidden leverage in the system that no one sees until it snaps.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Correlation and Hedging in a live dynamic scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You manage a $1 Million portfolio heavily weighted in Tech stocks. The VIX is spiking to 35. You suspect a market crash is imminent due to inflation data, but you don't want to sell your stocks and trigger massive capital gains taxes.",
        startingBalance: 1000000,
        choices: [
          { text: "Do nothing and Diamond Hand it.", result: -300000, feedback: "The market crashed 30%. Because you had zero hedges and high correlation, your portfolio bled $300,000. You survived, but you suffered a brutal drawdown." },
          { text: "Buy $20,000 worth of {{INTERNATIONAL:S&P 500 index|KENYA:NSE 20 Share Index}} Put Options as a hedge.", result: 150000, feedback: "Masterful execution! The market crashed 30%. Your tech stocks lost $300k, but your Put Options skyrocketed in value by $450k due to the VIX spike. You actually netted a $150k profit during a market crash." },
          { text: "Buy $500,000 worth of Bitcoin to diversify.", result: -450000, feedback: "Terrible move. Bitcoin has a high positive correlation to the Tech sector. When tech crashed 30%, Bitcoin crashed 50%. You just amplified your losses." }
        ]
      }
    }
  ]
};
