import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p1-intermediate',
  title: 'Auction Theory & Execution',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'Auction Theory', content: 'The {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} is a continuous double auction.\n\nIn a normal auction, one seller takes bids from many buyers. In the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}}, thousands of sellers are simultaneously taking bids from thousands of buyers. The matching engine organizes this chaos.'
    },
    { id: 'i2', type: 'insight', title: 'The Search for Liquidity', content: 'Price moves for one reason: to find liquidity.\n\nIf there are no sellers at $100, the price MUST move up to $101 to find someone willing to sell. Price is simply an advertising mechanism searching for counterparties.'
    },
    { id: 'i3', type: 'concept', title: 'Level 2 Market Data', content: 'When you look at a basic chart, you are seeing Level 1 data (the Last Price).\n\nLevel 2 data shows you the actual Order Book. You can see the exact resting Limit orders of the buyers and sellers.'
    },
    { id: 'i4', type: 'example', title: 'Reading Level 2', content: 'If you look at Level 2 and see 100,000 shares sitting at the Ask for $50.00, and only 1,000 shares sitting at the Bid, you know there is a massive "Wall" of resistance at $50.00.'
    },
    { id: 'i5', type: 'exercise', title: 'The Sell Wall', content: 'What does a massive block of sell orders on Level 2 create?', options: ['A Support Zone', 'A Resistance Zone (Sell Wall)', 'A Gap Down'], correctAnswer: 'A Resistance Zone (Sell Wall)'
    },
    { id: 'i6', type: 'warning', title: 'Spoofing (The Fake Wall)', content: 'Be careful with Level 2. High-frequency trading algorithms often place massive "Sell Walls" with no intention of actually selling.\n\nThey do this to scare retail traders into selling, pushing the price down. Right before the price hits their wall, they cancel the order. This is called Spoofing and it is illegal, but happens constantly.'
    },
    { id: 'i7', type: 'concept', title: 'Stop Market Orders', content: 'A Stop order is an invisible trigger. It sits on the broker\'s server, not the exchange.\n\nIf you set a Stop Loss at $90, the moment the stock hits $90, your broker fires a Market Sell order to liquidate your position.'
    },
    { id: 'i8', type: 'insight', title: 'The Stop Loss Waterfall', content: 'Because Stop Losses trigger Market Sell orders, a massive cluster of Stop Losses can cause a flash crash. As the price drops, it triggers one stop loss, which pushes the price down further, triggering the next one.'
    },
    { id: 'i9', type: 'concept', title: 'Stop Limit Orders', content: 'To avoid the Slippage of a Stop Market order, you can use a Stop Limit.\n\nTrigger: "If price hits $90, create a Limit Sell order at exactly $89.50."'
    },
    { id: 'i10', type: 'warning', title: 'The Danger of Stop Limits', content: 'If the price crashes violently right through your trigger, your Limit order might never get filled. You will be stuck holding the crashing stock all the way to the bottom.'
    },
    { id: 'i11', type: 'exercise', title: 'Order Defense', content: 'Which order guarantees execution during a crash, but does not guarantee the price?', options: ['Stop Limit Order', 'Stop Market Order', 'Limit Buy Order'], correctAnswer: 'Stop Market Order'
    },
    { id: 'i12', type: 'concept', title: 'Time in Force (TIF)', content: 'When you place a Limit order, you must tell the broker how long to keep it alive.\n\n"Day" means cancel it when the market closes today. "GTC" (Good Till Canceled) means keep it alive for months until it fills.'
    },
    { id: 'i13', type: 'concept', title: 'Fill or Kill (FOK)', content: 'An aggressive order type used by institutions. "Either fill my entire order of 100,000 shares right this exact second, or cancel the whole thing."'
    },
    { id: 'i14', type: 'concept', title: 'Dark Pools', content: 'Not all trades happen on public exchanges.\n\nDark Pools are private exchanges created by massive banks. Institutions trade millions of shares here secretly so they don\'t spook the public markets.'
    },
    { id: 'i15', type: 'insight', title: 'Why Dark Pools Exist', content: 'If Warren Buffett wants to sell 10 million shares of Coca-Cola on the public exchange, everyone would see the massive Sell Wall on Level 2 and panic sell. Dark Pools prevent this panic.'
    },
    { id: 'i16', type: 'exercise', title: 'Dark Pool Logic', content: 'Why do institutions use Dark Pools?', options: ['To avoid paying taxes.', 'To execute massive block trades without moving the public order book and causing panic.', 'Because the fees are zero.'], correctAnswer: 'To execute massive block trades without moving the public order book and causing panic.'
    },
    { id: 'i17', type: 'concept', title: 'High-Frequency Trading (HFT)', content: 'The majority of volume in modern markets is not humans clicking buttons. It is algorithms executing millions of trades per second.\n\nHFT firms spend billions to locate their servers physically closer to the exchange to gain microsecond speed advantages.'
    },
    { id: 'i18', type: 'insight', title: 'Front-Running', content: 'HFT algorithms can see your Market Buy order coming. Because they are faster, they buy the stock before you, and instantly sell it back to you a fraction of a penny higher.'
    },
    { id: 'i19', type: 'concept', title: 'Arbitrage', content: 'If Bitcoin is trading at $60,000 on Coinbase and $60,100 on Binance, an algorithm will instantly buy it on Coinbase and sell it on Binance, pocketing a risk-free $100. This is Arbitrage.'
    },
    { id: 'i20', type: 'concept', title: 'The Settlement Period', content: 'When you buy a stock on Monday, you don\'t actually own it instantly. The legal transfer of ownership (Settlement) historically takes T+2 (Trade Date + 2 Days).'
    },
    { id: 'i21', type: 'warning', title: 'Good Faith Violations', content: 'If you buy a stock with unsettled cash, and sell it before the cash settles, your broker will flag your account for a Good Faith Violation (GFV). 3 GFVs and your account is locked.'
    },
    { id: 'i22', type: 'exercise', title: 'Settlement Rules', content: 'What is a Good Faith Violation?', options: ['Lying on your broker application.', 'Trading with borrowed margin.', 'Buying and selling a stock using cash that hasn\'t fully settled yet.'], correctAnswer: 'Buying and selling a stock using cash that hasn\'t fully settled yet.'
    },
    { id: 'i23', type: 'concept', title: 'Margin Trading', content: 'Margin is simply borrowing money from your broker to buy more stock than you can afford.\n\nIf you have $5,000, your broker might give you 2x Margin, allowing you to buy $10,000 worth of stock.'
    },
    { id: 'i24', type: 'example', title: 'Leverage is a Double-Edged Sword', content: 'If you buy $10,000 of stock with $5k cash and $5k margin, and the stock goes up 10%, you make $1,000. That\'s a 20% return on your actual cash! But if it drops 10%, you lose $1,000 (20% loss).'
    },
    { id: 'i25', type: 'warning', title: 'The Margin Call', content: 'If the stock crashes 50%, your $10,000 position is now worth $5,000. The broker immediately takes their $5,000 back, and you are left with $0. You have been Margin Called and Liquidated.'
    },
    { id: 'i26', type: 'exercise', title: 'Leverage Math', content: 'If you use 2x margin and the stock drops 50%, what happens to your original cash investment?', options: ['It drops 50%.', 'It drops 25%.', 'It goes to exactly $0 (100% loss).'], correctAnswer: 'It goes to exactly $0 (100% loss).'
    },
    { id: 'i27', type: 'concept', title: 'Short Squeezes', content: 'When too many people Short Sell a stock, and the price suddenly rockets up, those short sellers start losing massive amounts of money.'
    },
    { id: 'i28', type: 'insight', title: 'The Squeeze Mechanism', content: 'To exit a short position, you MUST buy the stock back. So as short sellers panic and close their trades, they are forced to Market Buy. This creates a massive tidal wave of buying pressure, rocketing the stock even higher.'
    },
    { id: 'i29', type: 'example', title: 'GameStop (2021)', content: 'Hedge funds shorted over 100% of GameStop\'s available shares. When retail traders started buying, the hedge funds were forced to buy back their shorts at any price, causing the stock to explode from $4 to $400 in weeks.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Let\'s test your understanding of Margin Calls and Short Squeezes in a live dynamic scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "A struggling movie theater company is heavily shorted by Wall Street. You have $5,000 cash. Your broker offers you 4x Margin (You can control $20,000). The stock is currently highly volatile due to a reddit community trying to trigger a short squeeze.",
        startingBalance: 5000,
        choices: [
          { text: "Go all-in with 4x Margin ($20,000 position) to maximize profits on the squeeze.", result: -5000, feedback: "You bought $20,000 worth. The stock dropped 25% due to a temporary hedge fund short attack. Because you used 4x margin, a 25% drop wiped out 100% of your $5k cash. You got Margin Called. The stock later rocketed to $100, but you were already liquidated." },
          { text: "Buy $5,000 of shares using ONLY your own cash (No Margin).", result: 25000, feedback: "Excellent risk management. The stock dropped 25%, but since you used no margin, you held the position without fear. The short squeeze triggered two days later, sending the stock up 500%. You made massive profits." },
          { text: "Join the hedge funds and short sell the stock.", result: -20000, feedback: "You shorted into a Short Squeeze. Retail traders triggered massive FOMO buying, forcing you to cover your short position at an exorbitant loss." }
        ]
      }
    }
  ]
};
