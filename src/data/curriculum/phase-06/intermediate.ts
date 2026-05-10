import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p6-intermediate',
  title: 'Option Pricing & Implied Volatility',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Two Parts of Premium', content: 'An option\'s price (Premium) is made of two exact components:\n\n1. Intrinsic Value (How much it is currently In-The-Money)\n2. Extrinsic Value (Time Value + Volatility Value)'
    },
    { id: 'i2', type: 'example', title: 'Calculating Premium', content: 'You have a $50 Call Option. The stock is at $55. The Intrinsic Value is exactly $5.\n\nBut the option costs $7. Why? Because you are paying $2 of Extrinsic Value for the "hope" that it goes even higher before expiration.'
    },
    { id: 'i3', type: 'insight', title: 'Extrinsic Bleed', content: 'Intrinsic Value never decays. But Extrinsic Value bleeds to $0 by expiration day. If you buy an Out-Of-The-Money option, you are buying 100% Extrinsic Value.'
    },
    { id: 'i4', type: 'exercise', title: 'Premium Breakdown', content: 'A stock is at $110. A $100 Call Option costs $15. What is the Intrinsic and Extrinsic value?', options: ['$15 Intrinsic, $0 Extrinsic', '$10 Intrinsic, $5 Extrinsic', '$0 Intrinsic, $15 Extrinsic'], correctAnswer: '$10 Intrinsic, $5 Extrinsic'
    },
    { id: 'i5', type: 'concept', title: 'Implied Volatility (IV)', content: 'Implied Volatility is the market\'s expectation of how crazy the stock will move in the future. It is the single most important factor in pricing an option.'
    },
    { id: 'i6', type: 'insight', title: 'The Price of Fear', content: 'When investors are terrified (like before an earnings call or a CPI data release), they panic-buy options as insurance. This massive demand causes Implied Volatility to skyrocket, making all options extremely expensive.'
    },
    { id: 'i7', type: 'example', title: 'IV Expansion', content: 'You buy a Call option for $100. The stock doesn\'t move at all for a week. But a rumor starts that the company might go bankrupt. IV expands massively. Your option is now worth $200, even though the stock never moved!'
    },
    { id: 'i8', type: 'warning', title: 'IV Crush', content: 'The day after earnings, the "unknown" becomes "known". Fear vanishes. IV instantly crashes. The Extrinsic value of the option is wiped out. This is IV Crush.'
    },
    { id: 'i9', type: 'exercise', title: 'The Earnings Trap', content: 'Why do amateur traders usually lose money buying options right before an earnings report, even if they guess the stock direction correctly?', options: ['Because the broker charges higher fees.', 'Because IV Crush wipes out the premium faster than the directional gain can compensate.', 'Because earnings reports are fake.'], correctAnswer: 'Because IV Crush wipes out the premium faster than the directional gain can compensate.'
    },
    { id: 'i10', type: 'concept', title: 'Historical Volatility (HV)', content: 'HV is looking backwards. It measures how much the stock ACTUALLY moved over the past 30 days. IV is looking forwards (what the market EXPECTS it to do).'
    },
    { id: 'i11', type: 'insight', title: 'The Arbitrage', content: 'If Implied Volatility is way higher than Historical Volatility, options are statistically overpriced. Pro traders will SELL options. If IV is way lower than HV, options are cheap. Pro traders will BUY options.'
    },
    { id: 'i12', type: 'concept', title: 'Black-Scholes Model', content: 'The Nobel-prize winning mathematical formula used to price options. It takes 5 inputs: Stock Price, Strike Price, Time to Expiration, Risk-Free Interest Rate, and Implied Volatility.'
    },
    { id: 'i13', type: 'insight', title: 'The Flaw in the Math', content: 'Black-Scholes assumes stock returns follow a perfectly normal "bell curve" distribution. It completely fails to account for Black Swan events (fat tails), which happen way more often in reality than the math predicts.'
    },
    { id: 'i14', type: 'concept', title: 'The Volatility Smile', content: 'Because the math under-prices Black Swan crashes, Market Makers artificially jack up the price of deep Out-Of-The-Money Put options. If you chart the IV across all strike prices, it looks like a "Smile" or a "Smirk".'
    },
    { id: 'i15', type: 'exercise', title: 'Black-Scholes Flaw', content: 'What is the primary weakness of the Black-Scholes pricing model?', options: ['It does not account for dividends.', 'It assumes market crashes (Black Swans) are almost impossible, wildly underpricing extreme tail risk.', 'It requires a supercomputer.'], correctAnswer: 'It assumes market crashes (Black Swans) are almost impossible, wildly underpricing extreme tail risk.'
    },
    { id: 'i16', type: 'concept', title: 'Options Spreads', content: 'Buying a single Call or Put is a "Naked" long position. It is risky because of Time Decay and IV Crush. Professionals combine multiple options into "Spreads" to neutralize these risks.'
    },
    { id: 'i17', type: 'example', title: 'The Bull Call Spread', content: 'Instead of just buying a $100 Call, you BUY the $100 Call and simultaneously SELL the $110 Call.\n\nBy selling the $110 Call, you collect premium that pays for the $100 Call. This makes the trade much cheaper.'
    },
    { id: 'i18', type: 'insight', title: 'Capping the Reward', content: 'The tradeoff of a Spread is that your maximum profit is capped. In a $100/$110 Bull Call spread, if the stock goes to $200, you only make profit up to $110. But because it was so cheap to enter, your Risk-to-Reward is excellent.'
    },
    { id: 'i19', type: 'exercise', title: 'Spread Logic', content: 'Why would you use a Bull Call Spread instead of just buying a standard Call option?', options: ['To guarantee a 100% win rate.', 'To lower the upfront cost of the trade and reduce the negative impact of Theta (time decay).', 'To get unlimited profit potential.'], correctAnswer: 'To lower the upfront cost of the trade and reduce the negative impact of Theta (time decay).'
    },
    { id: 'i20', type: 'concept', title: 'Selling Options (Credit Spreads)', content: 'When you buy an option, you pay a "Debit" from your account. When you sell an option, you receive a "Credit" into your account instantly.'
    },
    { id: 'i21', type: 'example', title: 'The Bull Put Spread', content: 'You think a stock will stay above $50. You SELL a $50 Put, and BUY a $45 Put as protection.\n\nYou collect $200 in Credit. If the stock stays above $50, both options expire worthless, and you keep the $200 free and clear.'
    },
    { id: 'i22', type: 'insight', title: 'Winning by Doing Nothing', content: 'With a Credit Spread, the stock can go up, the stock can go sideways, or the stock can even drop slightly, and you STILL win the trade. You have multiple ways to win.'
    },
    { id: 'i23', type: 'warning', title: 'Picking up Pennies in Front of a Steamroller', content: 'Selling Out-Of-The-Money options has a 90% win rate. It feels like free money. But the 10% of the time you lose, the loss is so massive it wipes out months of gains. Risk management is vital.'
    },
    { id: 'i24', type: 'exercise', title: 'Credit Spread Math', content: 'In a Credit Spread, how do you achieve maximum profit?', options: ['The stock must skyrocket 500%.', 'Both options expire worthless, allowing you to keep the premium you collected upfront.', 'You must exercise the option early.'], correctAnswer: 'Both options expire worthless, allowing you to keep the premium you collected upfront.'
    },
    { id: 'i25', type: 'concept', title: 'Open Interest (OI)', content: 'Volume tells you how many contracts traded today. Open Interest tells you how many contracts currently exist that have NOT been closed out yet.'
    },
    { id: 'i26', type: 'insight', title: 'The Magnet Effect', content: 'If there is massive Open Interest at the $100 Strike Price, that level acts as a giant magnet. Market Makers will manipulate the stock price toward $100 as expiration approaches to ensure the maximum number of options expire worthless (Max Pain).'
    },
    { id: 'i27', type: 'concept', title: 'Max Pain Theory', content: 'Max Pain is the exact stock price at which option buyers lose the most money, and option sellers (Market Makers) make the most money. The market mysteriously tends to pin exactly at the Max Pain price on Friday afternoons.'
    },
    { id: 'i28', type: 'warning', title: 'The Greeks Review', content: 'To trade options, you MUST understand how Delta, Gamma, Theta, and Vega interact. An option is a 4-dimensional chess piece, not a linear stock.'
    },
    { id: 'i29', type: 'insight', title: 'The Professional Edge', content: 'Amateurs buy 0DTE (Zero Days to Expiration) out-of-the-money calls hoping for a lottery ticket. Professionals sell those exact calls to the amateurs, collecting the premium.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Implied Volatility and Option Pricing in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "An AI company is announcing a massive new product tomorrow. Implied Volatility (IV) is at 200% (highest ever). You think the product will be good, and the stock will go up 5%.",
        startingBalance: 15000,
        choices: [
          { text: "Buy an Out-Of-The-Money Call Option for $2,000.", result: -1500, feedback: "The product was good! The stock went up 5%. But because IV was at 200%, you suffered massive IV Crush. The option lost $1,500 of Extrinsic value, completely wiping out your directional gain." },
          { text: "Execute a Bull Call Spread (Buy a Call, Sell a higher Call).", result: 500, feedback: "Smart move. Because you sold a Call against the one you bought, the IV Crush hurt the one you bought, but helped the one you sold. They canceled each other out. You safely captured the 5% directional move without taking IV risk." },
          { text: "Sell Naked Call Options to collect the massive 200% IV premium.", result: -15000, feedback: "The product was a breakthrough. The stock went up 40%. Because you sold Naked Calls, your losses were technically infinite. You were margin called and liquidated." }
        ]
      }
    }
  ]
};
