import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p1-beginner',
  title: 'The Order Book & Basic Mechanics',
  level: 'beginner',
  cards: [
    {
      id: 'b1', type: 'concept', title: 'What is a Market?', content: 'A market is simply a place where buyers and sellers meet to exchange goods.\n\nThe {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} is no different than a farmer\'s market, except instead of trading cash for tomatoes, you are trading cash for fractional ownership of a company (stocks).', imageKey: 'market'
    },
    {
      id: 'b2', type: 'insight', title: 'The Illusion of "The Price"', content: 'When you look at a stock app and it says "Apple is $150", that is an illusion.\n\n$150 is simply the exact price at which the very last trade happened. It does not mean you can buy or sell your shares for exactly $150 right now.', imageKey: 'price'
    },
    {
      id: 'b3', type: 'concept', title: 'The Order Book', content: 'The true heart of the market is the Order Book. It is a massive digital ledger that records every single person who wants to buy (Bids) and every single person who wants to sell (Asks).', imageKey: 'orderbook'
    },
    {
      id: 'b4', type: 'example', title: 'Bids (Buyers)', content: 'The "Bids" side of the order book shows how much buyers are willing to pay.\n\nNaturally, buyers want the lowest price possible. The highest Bid is called the "Best Bid".'
    },
    {
      id: 'b5', type: 'example', title: 'Asks (Sellers)', content: 'The "Asks" side of the order book shows how much sellers are demanding.\n\nNaturally, sellers want the highest price possible. The lowest Ask is called the "Best Ask".'
    },
    {
      id: 'b6', type: 'exercise', title: 'Order Book Logic', content: 'If you want to sell your shares immediately, who do you sell them to?', options: ['The person with the lowest Ask.', 'The person with the highest Bid.', 'The exchange itself.'], correctAnswer: 'The person with the highest Bid.'
    },
    {
      id: 'b7', type: 'concept', title: 'The Bid-Ask Spread', content: 'Because buyers want a low price and sellers want a high price, there is always a gap between the Best Bid and the Best Ask. This gap is called the Spread.', imageKey: 'spread'
    },
    {
      id: 'b8', type: 'insight', title: 'The Market Maker\'s Cut', content: 'Market Makers are massive banks that constantly provide both Bids and Asks to keep the market moving.\n\nThey profit by pocketing the Spread. They buy from you at the Bid and instantly sell to someone else at the Ask.', imageKey: 'maker'
    },
    {
      id: 'b9', type: 'concept', title: 'Liquidity', content: 'Liquidity refers to how easily you can buy or sell an asset without violently moving the price.\n\nApple stock is highly liquid. Millions of shares trade every second. A rare Pokemon card is illiquid. It might take months to find a buyer.', imageKey: 'liquidity'
    },
    {
      id: 'b10', type: 'example', title: 'Illiquidity Danger', content: 'If you own $100,000 worth of a highly illiquid "penny stock", and you try to sell it all at once, you will exhaust all the buyers in the order book. The price will crash before your order is fully filled.'
    },
    {
      id: 'b11', type: 'exercise', title: 'Liquidity Check', content: 'Why is high liquidity important for a trader?', options: ['It guarantees the stock will go up.', 'It allows you to enter and exit massive positions instantly without drastically altering the price.', 'It eliminates taxes.'], correctAnswer: 'It allows you to enter and exit massive positions instantly without drastically altering the price.'
    },
    {
      id: 'b12', type: 'concept', title: 'Market Orders', content: 'A Market Order tells your broker: "Buy this stock right now, at whatever the Best Ask price is."\n\nIt guarantees your order will be executed instantly, but it DOES NOT guarantee the price.', imageKey: 'marketorder'
    },
    {
      id: 'b13', type: 'warning', title: 'The Slippage Trap', content: 'If you use a Market Order on an illiquid stock, you might suffer "Slippage".\n\nIf the last price was $10, but the only seller left in the order book is asking $15, your market order will instantly buy it at $15. You just lost 50% instantly.', imageKey: 'slippage'
    },
    {
      id: 'b14', type: 'concept', title: 'Limit Orders', content: 'A Limit Order tells your broker: "Only buy this stock if the price drops to $10.00 or lower."\n\nIt guarantees the price, but it DOES NOT guarantee execution. If the stock never drops to $10, you never buy it.', imageKey: 'limitorder'
    },
    {
      id: 'b15', type: 'exercise', title: 'Order Types', content: 'If you want absolute control over the exact price you pay, what order should you use?', options: ['Market Order', 'Limit Order', 'Stop Loss'], correctAnswer: 'Limit Order'
    },
    {
      id: 'b16', type: 'concept', title: 'Volume', content: 'Volume is the total number of shares that have been traded over a specific period of time.\n\nHigh volume means there is massive interest and liquidity in the stock.'
    },
    {
      id: 'b17', type: 'insight', title: 'Volume confirms Price', content: 'If a stock breaks out to a new all-time high on extremely low volume, it is likely a fake-out. If it breaks out on record-breaking volume, it is a legitimate institutional move.'
    },
    {
      id: 'b18', type: 'concept', title: 'The Matching Engine', content: 'Exchanges (like the New York Stock Exchange) are essentially just massive computers running a "Matching Engine".',
    },
    {
      id: 'b19', type: 'example', title: 'How it Matches', content: 'When a Market Buy order arrives, the engine instantly scans the Order Book, finds the lowest Limit Sell order, executes the trade, and broadcasts the new "Last Price" to the world.'
    },
    {
      id: 'b20', type: 'concept', title: 'Bulls and Bears', content: 'You will hear these terms constantly.\n\nBulls believe the market will go UP. They "go long" (buy). They are called bulls because a bull attacks by thrusting its horns UPWARD.', imageKey: 'bullsbears'
    },
    {
      id: 'b21', type: 'concept', title: 'The Bears', content: 'Bears believe the market will go DOWN. They "short sell". They are called bears because a bear attacks by swiping its paws DOWNWARD.'
    },
    {
      id: 'b22', type: 'exercise', title: 'Market Animal', content: 'If you think a stock is going to crash, what are you?', options: ['A Bull', 'A Bear', 'A Market Maker'], correctAnswer: 'A Bear'
    },
    {
      id: 'b23', type: 'concept', title: 'Going Long', content: 'The standard way to make money. You buy a stock at $10. You wait for it to go to $20. You sell it. You made a $10 profit.'
    },
    {
      id: 'b24', type: 'concept', title: 'Short Selling (Basics)', content: 'You can make money when a stock crashes.\n\nYou borrow a stock from your broker and sell it immediately at $20. The stock crashes to $10. You buy it back at $10, return the borrowed stock to the broker, and keep the $10 difference.'
    },
    {
      id: 'b25', type: 'warning', title: 'Infinite Risk', content: 'When you go Long, the maximum you can lose is 100% (if the stock goes to $0).\n\nWhen you Short Sell, the stock can theoretically go to infinity. Your potential losses are INFINITE. Never short sell as a beginner.', imageKey: 'riskManagement'
    },
    {
      id: 'b26', type: 'exercise', title: 'Short Risk', content: 'What is the maximum potential loss when Short Selling a stock without a stop loss?', imageKey: 'riskManagement', options: ['100% of your investment.', 'Infinite.', 'There is no risk.'], correctAnswer: 'Infinite.'
    },
    {
      id: 'b27', type: 'concept', title: 'Volatility', content: 'Volatility measures how violently a stock\'s price swings up and down.\n\nA stock that moves 0.5% a day has low volatility. A cryptocurrency that moves 20% a day has massive volatility.'
    },
    {
      id: 'b28', type: 'insight', title: 'Volatility is Opportunity', content: 'New traders fear volatility. Professional traders require it. If an asset doesn\'t move, you cannot make money trading it.'
    },
    {
      id: 'b29', type: 'concept', title: 'The Market Cycle', content: 'Markets do not go up in straight lines. They move in cycles of Expansion (bull market), Peak, Contraction (bear market), and Trough.'
    },
    {
      id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Let\'s test your understanding of Market Orders, Slippage, and the Order Book in a live dynamic scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You have $10,000. You see a highly illiquid meme coin skyrocketing. The last traded price is $1.00, but looking at the Order Book, the Best Ask is $1.00 with only 100 shares available. The next Ask is way up at $1.50.",
        startingBalance: 10000,
        choices: [
          { text: "Smash the 'Market Buy' button with all $10,000 so you don't miss out.", result: -3000, feedback: "You suffered massive slippage! You bought the first 100 shares at $1.00, but the remaining $9,900 was filled at terrible prices up to $1.50. The price instantly reverted to $1.00. You lost $3,000." },
          { text: "Place a 'Limit Buy' order for 10,000 shares at exactly $1.00.", result: 0, feedback: "Smart move. You didn't suffer any slippage. However, because there weren't enough sellers at $1.00, your order only partially filled, keeping your capital safe." },
          { text: "Short sell the meme coin because it's illiquid.", result: -10000, feedback: "You shorted an illiquid, highly volatile meme coin. A massive buyer stepped in, spiked the price 500%, and you were margin called and liquidated." }
        ]
      }
    }
  ]
};
