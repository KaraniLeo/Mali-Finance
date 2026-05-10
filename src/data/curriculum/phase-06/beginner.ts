import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p6-beginner',
  title: 'Introduction to Derivatives',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'What is a Derivative?', content: 'A derivative is a financial contract whose value is derived from an underlying asset.\n\nIt is essentially a side-bet on what the price of something else will do. You do not own the actual asset; you just own the contract.'
    },
    { id: 'b2', type: 'example', title: 'The Sports Bet Analogy', content: 'If you bet $100 that your favorite football team will win, your betting slip is a derivative. It has no intrinsic value. Its value is entirely derived from the outcome of the football game.'
    },
    { id: 'b3', type: 'insight', title: 'The Purpose of Derivatives', content: 'Derivatives were originally invented for farmers to lock in the price of their crops before harvest, protecting them from price crashes (Hedging). Today, they are mostly used by Wall Street for massive speculation.'
    },
    { id: 'b4', type: 'concept', title: 'Futures Contracts', content: 'A Futures contract is an agreement to buy or sell an asset at a specific price, on a specific date in the future.\n\nIf you buy a Future, you are legally obligated to buy the asset when the contract expires.'
    },
    { id: 'b5', type: 'example', title: 'The Coffee Shop', content: 'You own a coffee shop. You are worried the price of coffee beans will skyrocket next year. You buy a Futures contract locking in today\'s price for 1,000 lbs of coffee. If the price skyrockets, you are safe.'
    },
    { id: 'b6', type: 'exercise', title: 'Futures Logic', content: 'Why would a farmer sell a Futures contract for his wheat before it even grows?', options: ['To gamble.', 'To lock in a guaranteed sale price and eliminate the risk of the price crashing.', 'Because the government forces him to.'], correctAnswer: 'To lock in a guaranteed sale price and eliminate the risk of the price crashing.'
    },
    { id: 'b7', type: 'concept', title: 'Options Contracts', content: 'Options are similar to Futures, but with one massive difference: You have the RIGHT to buy/sell the asset, but not the OBLIGATION. You can walk away.'
    },
    { id: 'b8', type: 'example', title: 'The Real Estate Deposit', content: 'You see a house for $100k, but you aren\'t sure you want it. You pay the seller a $1,000 non-refundable deposit to lock the price for 30 days.\n\nIf the house value drops, you walk away and only lose $1,000. If the value goes to $200k, you still get to buy it for $100k. The $1,000 deposit was an Option.'
    },
    { id: 'b9', type: 'exercise', title: 'Options vs Futures', content: 'What is the primary difference between an Option and a Future?', options: ['Options are only for stocks.', 'A Future is an obligation. An Option is a choice.', 'Futures are cheaper.'], correctAnswer: 'A Future is an obligation. An Option is a choice.'
    },
    { id: 'b10', type: 'concept', title: 'Call Options (Betting Up)', content: 'A Call Option gives you the right to BUY a stock at a specific price (Strike Price) before a specific date (Expiration Date).\n\nYou buy Calls when you think the stock will go UP.'
    },
    { id: 'b11', type: 'example', title: 'Call Option Math', content: 'Tesla is at $100. You buy a Call Option with a Strike Price of $100 for $5. \n\nIf Tesla goes to $150, you have the right to buy it for $100! Your $5 option is now worth $50 (a 1,000% gain).'
    },
    { id: 'b12', type: 'warning', title: 'The Expiration Trap', content: 'If Tesla stays at $100 until the expiration date, your right to buy it for $100 is worthless (since you could just buy it on the open market for $100). The option expires completely worthless, and you lose your $5 investment (100% loss).'
    },
    { id: 'b13', type: 'exercise', title: 'Call Mechanics', content: 'If you buy a Call Option with a $50 strike price, and the stock drops to $20 at expiration, what happens?', options: ['The option expires worthless and you lose 100% of the premium you paid.', 'You are forced to buy the stock at $50.', 'You owe the broker money.'], correctAnswer: 'The option expires worthless and you lose 100% of the premium you paid.'
    },
    { id: 'b14', type: 'concept', title: 'Put Options (Betting Down)', content: 'A Put Option gives you the right to SELL a stock at a specific price.\n\nYou buy Puts when you think the stock will crash.'
    },
    { id: 'b15', type: 'example', title: 'Put Option Math', content: 'Tesla is at $100. You buy a Put Option with a Strike of $100 for $5. \n\nTesla crashes to $50! Because you have the right to sell it at $100, your option is massively valuable. You made a fortune while the market crashed.'
    },
    { id: 'b16', type: 'insight', title: 'The Premium', content: 'The price you pay for an Option is called the Premium. It acts just like an insurance premium. You pay a small fee upfront, and if the disaster (or massive gain) happens, it pays out big.'
    },
    { id: 'b17', type: 'exercise', title: 'Crash Protection', content: 'If you own 100 shares of Apple and are terrified it might crash, what should you buy to protect yourself?', options: ['A Call Option', 'A Put Option', 'A Futures Contract'], correctAnswer: 'A Put Option'
    },
    { id: 'b18', type: 'concept', title: 'The Multiplier Effect (100x)', content: 'In the stock market, 1 standard Options contract always controls exactly 100 shares of the underlying stock.\n\nThis is why they are so powerful and so dangerous. You are controlling 100 shares for a fraction of the cost.'
    },
    { id: 'b19', type: 'example', title: 'Leverage without Margin', content: 'Buying 100 shares of a $100 stock costs $10,000.\n\nBuying 1 Call Option (controlling 100 shares) might only cost $200. You get the price action of 100 shares, but your maximum risk is capped at the $200 premium.'
    },
    { id: 'b20', type: 'warning', title: 'The Wasting Asset', content: 'Stocks can be held forever. Options are "wasting assets." Every single day that passes, the option loses a tiny bit of value as it gets closer to expiration. This is called Time Decay.'
    },
    { id: 'b21', type: 'exercise', title: 'The 100x Rule', content: 'If you buy 3 Option contracts, how many shares of the underlying stock do you control?', options: ['3 shares', '30 shares', '300 shares'], correctAnswer: '300 shares'
    },
    { id: 'b22', type: 'concept', title: 'In-The-Money (ITM)', content: 'An option is ITM if it currently has intrinsic value.\n\nIf you have a Call option allowing you to buy at $50, and the stock is currently at $60, you are $10 In-The-Money.'
    },
    { id: 'b23', type: 'concept', title: 'Out-Of-The-Money (OTM)', content: 'An option is OTM if it currently has NO intrinsic value.\n\nIf you have a Call option to buy at $50, and the stock is at $40, it is Out-Of-The-Money. It is only worth the "hope" that it will go up before expiration.'
    },
    { id: 'b24', type: 'warning', title: 'The Lottery Ticket', content: 'Beginners love buying extremely cheap, far Out-Of-The-Money options because they only cost $10. They treat them like lottery tickets. 99% of the time, they expire worthless.'
    },
    { id: 'b25', type: 'exercise', title: 'Moneyness', content: 'If you hold a Put Option (right to sell) at $100, and the stock is at $120, is your option ITM or OTM?', options: ['In-The-Money', 'Out-Of-The-Money'], correctAnswer: 'Out-Of-The-Money'
    },
    { id: 'b26', type: 'concept', title: 'Option Writers (Sellers)', content: 'For every person buying an option, someone else is selling it to them.\n\nThe Seller collects the Premium upfront. But if the buyer wins the bet, the seller has to pay them. The Seller acts like an insurance company.'
    },
    { id: 'b27', type: 'insight', title: 'The Casino Advantage', content: 'Selling options is extremely dangerous for beginners, but it is how professionals make consistent money. Because most options expire worthless, the Seller simply pockets the premium 80% of the time.'
    },
    { id: 'b28', type: 'warning', title: 'Naked Selling', content: 'If you sell a Call Option without actually owning the 100 shares of stock, it is called "Naked Selling". Your potential risk is INFINITE. Never do this.'
    },
    { id: 'b29', type: 'concept', title: 'Summary', content: 'Derivatives are weapons of mass financial destruction if used incorrectly. They offer massive leverage and risk hedging, but they introduce Time Expiration into the equation.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Calls, Puts, and Expiration in a live dynamic scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You have $1,000. You are extremely confident a company will report terrible earnings next Friday. The stock is currently at $100. You want to bet it will crash.",
        startingBalance: 1000,
        choices: [
          { text: "Buy $1,000 worth of Call Options expiring in 1 month.", result: -1000, feedback: "You bought Calls, which is a bet the stock will go UP. The stock crashed after terrible earnings. Your Calls instantly went to $0." },
          { text: "Buy $1,000 worth of Put Options expiring in 1 month.", result: 4000, feedback: "Brilliant! You bought the right to sell at a high price. The stock crashed to $80. Your puts skyrocketed 400% in value. Because you used options, you turned a 20% stock drop into a $4,000 profit without risking infinite money via short selling." },
          { text: "Buy $1,000 worth of Put Options expiring TOMORROW (0DTE).", result: -1000, feedback: "The earnings report got delayed by two days! Because your option expired tomorrow, you ran out of time. The option expired completely worthless, even though your crash prediction was eventually right. Time Decay (Theta) killed you." }
        ]
      }
    }
  ]
};
