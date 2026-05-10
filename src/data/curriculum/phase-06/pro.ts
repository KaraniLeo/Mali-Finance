import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p6-pro',
  title: 'Advanced Derivatives & Structuring',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Iron Condor', content: 'An Iron Condor is an advanced, 4-leg options strategy designed to profit when a stock DOES NOT move.\n\nYou sell a far Out-Of-The-Money Call Spread, and sell a far Out-Of-The-Money Put Spread.'
    },
    { id: 'p2', type: 'insight', title: 'The Neutral Zone', content: 'You create a massive "Neutral Zone". As long as the stock stays inside this zone until expiration, all 4 options expire worthless, and you keep all the premium.'
    },
    { id: 'p3', type: 'example', title: 'Iron Condor Math', content: 'Stock is at $100. You sell a $120 Call and a $80 Put (and buy further out wings for protection).\n\nIf the stock stays anywhere between $80 and $120 for the next 30 days, you make maximum profit.'
    },
    { id: 'p4', type: 'exercise', title: 'Condor Logic', content: 'What market condition is best for an Iron Condor?', options: ['A massive bull market.', 'A massive bear market crash.', 'A boring, sideways, low-volatility market.'], correctAnswer: 'A boring, sideways, low-volatility market.'
    },
    { id: 'p5', type: 'warning', title: 'The Tail Risk of Condors', content: 'While Iron Condors have an 80% win rate, the Risk-to-Reward is inverted. You might risk $500 to make $100. One massive Black Swan move will wipe out 5 winning trades.'
    },
    { id: 'p6', type: 'concept', title: 'The Covered Call', content: 'The bread and butter of professional portfolio management. You own 100 shares of a stock. You SELL a Call option against those exact shares.'
    },
    { id: 'p7', type: 'insight', title: 'Generating Yield', content: 'If the stock stays flat, the Call option you sold expires worthless. You keep your shares, and you keep the premium. You essentially just created your own dividend out of thin air.'
    },
    { id: 'p8', type: 'example', title: 'The Covered Call Tradeoff', content: 'You own 100 shares of Apple at $150. You sell a $160 Call for $200. \n\nIf Apple stays under $160, you keep the $200. If Apple goes to $200, you are forced to sell your shares at $160. You still made profit, but you capped your upside.'
    },
    { id: 'p9', type: 'exercise', title: 'Covered Call Mechanics', content: 'What is the primary risk of selling a Covered Call?', options: ['You could lose infinite money.', 'You cap your upside potential if the stock skyrockets.', 'The broker will seize your shares.'], correctAnswer: 'You cap your upside potential if the stock skyrockets.'
    },
    { id: 'p10', type: 'concept', title: 'The Cash Secured Put (The Wheel)', content: 'Instead of buying a stock at market price, you SELL a Put option at a lower price.\n\nIf the stock stays high, you keep the premium. If it drops, you are forced to buy the stock at a discount (which you wanted to do anyway).'
    },
    { id: 'p11', type: 'insight', title: 'The Wheel Strategy', content: 'Step 1: Sell Cash Secured Puts until you get assigned the stock.\nStep 2: Sell Covered Calls on that stock until it gets called away.\nStep 3: Repeat. You generate massive passive income without ever predicting direction.'
    },
    { id: 'p12', type: 'concept', title: '0DTE Options', content: 'Zero Days To Expiration. These are options that expire on the exact same day you trade them. They have exploded in popularity since 2022.'
    },
    { id: 'p13', type: 'warning', title: 'The Gamma Trap', content: '0DTE options are pure Gamma and Theta. They lose value by the minute. If the stock drops 1%, your option will drop 90% in 15 minutes. It is basically the equivalent of spinning a roulette wheel.'
    },
    { id: 'p14', type: 'exercise', title: '0DTE Risk', content: 'Why are 0DTE options incredibly dangerous for buyers?', options: ['Because they are expensive.', 'Because extreme Time Decay (Theta) forces the option to $0 by the end of the day if the stock doesn\'t move perfectly.', 'Because they are illegal.'], correctAnswer: 'Because extreme Time Decay (Theta) forces the option to $0 by the end of the day if the stock doesn\'t move perfectly.'
    },
    { id: 'p15', type: 'concept', title: 'Swaps', content: 'A Swap is a massive derivative contract usually traded only between banks. They agree to "swap" cash flows. (e.g., swapping a fixed interest rate for a variable interest rate).'
    },
    { id: 'p16', type: 'insight', title: 'Credit Default Swaps (CDS)', content: 'A CDS is insurance against a bond defaulting. In 2008, Michael Burry (The Big Short) bought massive CDS contracts against the housing market. When the mortgages defaulted, the CDS contracts paid out billions.'
    },
    { id: 'p17', type: 'concept', title: 'Futures Contango', content: 'In the Futures market, the future price of an asset is usually higher than the spot (current) price. This is Contango. It happens because storing physical assets (like oil) costs money over time.'
    },
    { id: 'p18', type: 'concept', title: 'Futures Backwardation', content: 'When the future price is LOWER than the current price. This happens during extreme shortages. People are desperate for Oil TODAY, so they will pay a massive premium over next month\'s price.'
    },
    { id: 'p19', type: 'exercise', title: 'Futures Market', content: 'If the future price of wheat is higher than the current price, what state is the market in?', options: ['Contango', 'Backwardation', 'Bear Market'], correctAnswer: 'Contango'
    },
    { id: 'p20', type: 'concept', title: 'Rolling Contracts', content: 'Because Futures and Options expire, you cannot hold them forever. If you want to hold a long-term position, you must "Roll" it (Sell the expiring contract, and instantly buy next month\'s contract).'
    },
    { id: 'p21', type: 'warning', title: 'The Cost of Rolling', content: 'If the market is in Contango, every time you roll your contract, you are selling low and buying high. You will slowly bleed your account to $0 even if the asset price stays flat.'
    },
    { id: 'p22', type: 'concept', title: 'Synthetic Positions', content: 'Using options, you can perfectly recreate a stock position without buying the stock. \n\nBuy an At-The-Money Call + Sell an At-The-Money Put = Synthetic Long Stock.'
    },
    { id: 'p23', type: 'insight', title: 'Why use Synthetics?', content: 'Synthetics give you the exact 1:1 price action of 100 shares of stock, but require drastically less capital (margin). Capital efficiency is the secret to hedge fund returns.'
    },
    { id: 'p24', type: 'exercise', title: 'Synthetic Construction', content: 'How do you create a Synthetic Long Stock position?', options: ['Buy 100 shares.', 'Buy a Call and Buy a Put.', 'Buy a Call and Sell a Put at the exact same strike price.'], correctAnswer: 'Buy a Call and Sell a Put at the exact same strike price.'
    },
    { id: 'p25', type: 'concept', title: 'Volatility Skew', content: 'Options at different strike prices do not have the same Implied Volatility. Puts almost always have higher IV than Calls, because the market is always more afraid of a fast crash than a fast rally.'
    },
    { id: 'p26', type: 'insight', title: 'The Put Skew Advantage', content: 'Because Put options are structurally overpriced by fear, selling Cash Secured Puts has a mathematical edge over buying them.'
    },
    { id: 'p27', type: 'concept', title: 'LEAPS', content: 'Long-Term Equity Anticipation Securities. These are Options that expire 1 to 3 years in the future.'
    },
    { id: 'p28', type: 'insight', title: 'The LEAPS Strategy', content: 'Buying a deep In-The-Money Call LEAPS gives you 2 years of time. Theta decay is almost zero. It acts exactly like owning the stock, but requires 50% less capital. This is how pros use safe leverage.'
    },
    { id: 'p29', type: 'warning', title: 'Leverage is a Tool, Not a Strategy', content: 'Derivatives are just tools to shape your risk curve. Amateurs use them to amplify risk. Professionals use them to surgically remove risk.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Advanced Options Strategies in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You own 1,000 shares of Microsoft at $300 ($300k value). You want to generate passive income from these shares, and you are willing to sell them if the stock hits $350.",
        startingBalance: 300000,
        choices: [
          { text: "Sell 10 Covered Calls with a $350 Strike Price expiring in 45 days.", result: 15000, feedback: "Perfect execution. You collected $15,000 in premium instantly. If MSFT stays under $350, you keep the $15k free and clear. If it goes over $350, you sell your shares for a massive profit anyway. You created a 5% dividend out of thin air." },
          { text: "Buy Put Options to protect the shares.", result: -8000, feedback: "You bought Puts. The stock stayed completely flat for 45 days. The Puts expired worthless due to Time Decay. You lost $8,000 in insurance premiums." },
          { text: "Sell 10 Iron Condors on Microsoft.", result: -25000, feedback: "Microsoft unexpectedly announced a breakthrough AI product and the stock gapped up 30%. Because Iron Condors require the stock to stay flat, the massive upside move blew past your Call spread, causing maximum loss." }
        ]
      }
    }
  ]
};
