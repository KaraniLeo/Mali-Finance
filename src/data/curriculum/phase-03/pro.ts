import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p3-pro',
  title: 'Advanced Risk Mechanics & The Greeks',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Greeks', content: 'In professional options trading, risk is quantified using "The Greeks": Delta, Gamma, Theta, and Vega. They measure exactly how the price of an option will change based on different market forces.'
    },
    { id: 'p2', type: 'insight', title: 'Delta (Directional Risk)', content: 'Delta measures how much an option\'s price will change for a $1 move in the underlying stock. A Delta of 0.50 means the option gains $0.50 for every $1 the stock goes up.'
    },
    { id: 'p3', type: 'concept', title: 'Delta as Probability', content: 'Delta is also used as a rough proxy for probability. A 0.20 Delta Put option roughly means the market believes there is a 20% chance the option finishes in the money.'
    },
    { id: 'p4', type: 'example', title: 'Delta Neutral', content: 'Market Makers do not want to gamble on whether a stock goes up or down. They want to be Delta Neutral (Delta = 0). If they sell you a Call option (+Delta), they immediately short the underlying stock (-Delta) to balance their risk to zero.'
    },
    { id: 'p5', type: 'exercise', title: 'Delta Defense', content: 'If your portfolio has a massive positive Delta, what are you betting on?', options: ['The market going down.', 'The market going up.', 'The market staying flat.'], correctAnswer: 'The market going up.'
    },
    { id: 'p6', type: 'concept', title: 'Gamma (Acceleration)', content: 'Gamma measures the rate of change of Delta. If Delta is speed, Gamma is acceleration. Gamma is highest when an option is exactly at the current stock price (At-The-Money).'
    },
    { id: 'p7', type: 'warning', title: 'Gamma Risk', content: 'As an option gets closer to its expiration date, Gamma explodes. A tiny move in the stock can cause a massive, violent swing in the option\'s price. Never hold short-dated options unless you want extreme risk.'
    },
    { id: 'p8', type: 'concept', title: 'Theta (Time Decay)', content: 'Options are wasting assets. They have an expiration date. Theta measures exactly how much money the option loses every single day just from time passing.'
    },
    { id: 'p9', type: 'insight', title: 'The Theta Seller', content: 'Retail traders love buying options (paying Theta). Institutions love selling options (collecting Theta). If the market just goes sideways, the option buyer bleeds to death, and the seller profits every single day.'
    },
    { id: 'p10', type: 'exercise', title: 'Theta Burn', content: 'Who benefits from Theta (time decay) the most?', options: ['The person who bought the option.', 'The person who sold the option.', 'The broker.'], correctAnswer: 'The person who sold the option.'
    },
    { id: 'p11', type: 'concept', title: 'Vega (Volatility Risk)', content: 'Vega measures how much the option\'s price will change when Implied Volatility (IV) changes by 1%.'
    },
    { id: 'p12', type: 'example', title: 'The Volatility Crush', content: 'You buy a Call option right before an earnings report. The stock goes UP! But you still lose money. Why? Because the Implied Volatility was so high before earnings, and after the news, IV crashed (Vega crushed the option price harder than the stock went up).'
    },
    { id: 'p13', type: 'warning', title: 'IV Rank', content: 'Never buy options when IV Rank is at 100% (highest historical volatility). They are mathematically overpriced. Buy options when IV is low, sell them when IV is high.'
    },
    { id: 'p14', type: 'exercise', title: 'Vega Logic', content: 'If you buy an option right before a highly anticipated news event, what Greek risk are you most exposed to?', options: ['Delta Risk', 'Vega Risk (Volatility Crush)', 'Theta Risk'], correctAnswer: 'Vega Risk (Volatility Crush)'
    },
    { id: 'p15', type: 'concept', title: 'Position Sizing via Volatility', content: 'Professionals do not risk the same amount of capital on a biotech stock as they do on a utility stock. They size their positions inversely to the asset\'s volatility (ATR).'
    },
    { id: 'p16', type: 'example', title: 'Average True Range (ATR)', content: 'If Stock A moves $5 a day, and Stock B moves $1 a day, you must buy 5x fewer shares of Stock A to keep your portfolio risk identical.'
    },
    { id: 'p17', type: 'concept', title: 'Tail Risk', content: 'Tail Risk refers to the extreme edges of the bell curve (the tails). These are events that statistically should only happen once every 10,000 years, but in finance, they happen every decade.'
    },
    { id: 'p18', type: 'insight', title: 'The Taleb Distribution', content: 'Nassim Taleb (author of The Black Swan) built a hedge fund designed entirely to bleed a tiny bit of money every day for 5 years, and then make 10,000% in a single day when a Tail Risk event destroys the market.'
    },
    { id: 'p19', type: 'concept', title: 'Counterparty Risk', content: 'It doesn\'t matter if your trade is up 500% if the exchange you are trading on goes bankrupt. (e.g., FTX in 2022).'
    },
    { id: 'p20', type: 'warning', title: 'Not Your Keys', content: 'If you leave millions of dollars of crypto on a centralized exchange, or uninsured cash in a regional bank, you are taking on massive Counterparty Risk for absolutely zero yield.'
    },
    { id: 'p21', type: 'exercise', title: 'Hidden Risks', content: 'What is Counterparty Risk?', options: ['The risk that a stock goes down.', 'The risk that the institution holding your assets defaults or goes bankrupt.', 'The risk of inflation.'], correctAnswer: 'The risk that the institution holding your assets defaults or goes bankrupt.'
    },
    { id: 'p22', type: 'concept', title: 'Sharpe Ratio', content: 'The Sharpe Ratio measures the performance of an investment compared to a risk-free asset, after adjusting for its risk. It is the ultimate measure of "Risk-Adjusted Returns".'
    },
    { id: 'p23', type: 'insight', title: 'High Sharpe', content: 'A high Sharpe ratio (above 1.0) means your returns are excellent relative to the amount of volatility and risk you are taking. A negative Sharpe means you would have been better off in a {{INTERNATIONAL:savings account|KENYA:savings account or SACCO deposit}}.'
    },
    { id: 'p24', type: 'concept', title: 'Sortino Ratio', content: 'Similar to Sharpe, but the Sortino ratio ONLY penalizes downside volatility. If a stock violently rockets up, Sharpe penalizes it (because it\'s volatile). Sortino recognizes that upside volatility is a good thing.'
    },
    { id: 'p25', type: 'exercise', title: 'Ratio Math', content: 'Why do many pros prefer the Sortino ratio over the Sharpe ratio?', options: ['Because it is easier to calculate.', 'Because it does not penalize massive upside gains, only downside risk.', 'Because it includes taxes.'], correctAnswer: 'Because it does not penalize massive upside gains, only downside risk.'
    },
    { id: 'p26', type: 'concept', title: 'Margin of Safety (Intrinsic)', content: 'In fundamental investing, risk management is simply the price you pay. If a company\'s intrinsic value is $100, and you buy it for $50, you have a massive 50% Margin of Safety.'
    },
    { id: 'p27', type: 'insight', title: 'Risk is not Volatility', content: 'Wall Street academics define risk as price volatility. True investors define risk as the permanent loss of capital. A stock dropping 20% is not risky if the underlying business is generating billions in free cash flow.'
    },
    { id: 'p28', type: 'concept', title: 'The Ultimate Risk', content: 'The ultimate risk in finance is arrogance. The market is a ruthless machine designed to humble anyone who thinks they are invincible. The moment you break your risk rules because you are "sure" it will go up, you lose.'
    },
    { id: 'p29', type: 'insight', title: 'Stay in the Game', content: 'Trading is not a sprint. It is an ultramarathon. If you can simply survive your first two years without blowing up your account, you will outlast 90% of retail traders.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your mastery of Advanced Risk Mechanics in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You are shorting a massive tech company ahead of their earnings call. You buy Put Options that expire in 2 days. The Implied Volatility (IV) is at an all-time high of 150%.",
        startingBalance: 25000,
        choices: [
          { text: "Hold the Puts through the earnings call to maximize profit.", result: -15000, feedback: "The company missed earnings! The stock dropped 5%. You should have made money, right? WRONG. Because the IV was at 150%, the moment earnings passed, IV crushed down to 40%. Vega destroyed your option premium. You lost $15,000 despite being right about the direction." },
          { text: "Sell the Put Options right BEFORE the earnings call.", result: 5000, feedback: "Pro move. You played the 'Run-up'. You bought the Puts when IV was rising, and sold them to a greedy amateur right before the binary event, locking in a Vega profit without taking any actual directional risk." },
          { text: "Double down and buy even more Puts on margin.", result: -25000, feedback: "You held through earnings. Not only did IV crush destroy your premium, but the company unexpectedly announced a massive stock buyback. The stock squeezed up 15%. Your short-dated Puts expired worthless. Account blown." }
        ]
      }
    }
  ]
};
