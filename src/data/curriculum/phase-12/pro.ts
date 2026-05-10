import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p12-pro',
  title: 'Order Flow & Algorithmic Footprints',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Illusion of Candles', content: 'A candlestick chart aggregates data. It tells you the Open, High, Low, and Close. But it hides the internal battle. Two identical green candles could have completely different internal Order Flow.'
    },
    { id: 'p2', type: 'insight', title: 'Delta (Order Flow)', content: 'In Order Flow, "Delta" is the net difference between Market Buys and Market Sells within a single candle. If a candle is Green, but the Delta is violently Negative, it means aggressive sellers were dumping, but passive limit buyers absorbed it all.'
    },
    { id: 'p3', type: 'example', title: 'Absorption', content: 'A stock hits Resistance. You see a massive green candle forming. Amateurs buy the breakout. But Order Flow shows -50,000 Delta inside that green candle. An institution is sitting at Resistance with a massive hidden Limit Sell order, absorbing all the retail buying.'
    },
    { id: 'p4', type: 'exercise', title: 'Order Flow Delta', content: 'If a candle closes Green, but the internal Order Flow Delta is massively Negative, what is likely happening?', options: ['The indicator is broken.', 'Aggressive sellers are dumping, but a massive institutional Limit Buyer is absorbing all the sell pressure, preventing the price from dropping.', 'Retail is taking control.'], correctAnswer: 'Aggressive sellers are dumping, but a massive institutional Limit Buyer is absorbing all the sell pressure, preventing the price from dropping.'
    },
    { id: 'p5', type: 'concept', title: 'Footprint Charts', content: 'A Footprint chart x-rays the candlestick. It shows you the exact volume traded at every single tick (penny) inside the candle, split between Bid and Ask.'
    },
    { id: 'p6', type: 'insight', title: 'Imbalances', content: 'If 5,000 shares are bought at the Ask, and only 10 shares are sold at the Bid at the same price level, it is a 500x Imbalance. It proves aggressive institutional buying just blew through that price level.'
    },
    { id: 'p7', type: 'concept', title: 'Cumulative Volume Delta (CVD)', content: 'CVD tracks the running total of Order Flow Delta over time. If Price is going UP, but CVD is going DOWN (Divergence), the rally is completely fake. It is being driven by low liquidity, while the whales are actively selling.'
    },
    { id: 'p8', type: 'exercise', title: 'CVD Divergence', content: 'What does it mean if Price is making Higher Highs, but Cumulative Volume Delta (CVD) is making Lower Lows?', options: ['A massive bullish breakout is confirmed.', 'The rally is fake. Aggressive sellers are quietly unloading into the thin upward momentum. A reversal is imminent.', 'The market is closed.'], correctAnswer: 'The rally is fake. Aggressive sellers are quietly unloading into the thin upward momentum. A reversal is imminent.'
    },
    { id: 'p9', type: 'concept', title: 'VWAP (Volume Weighted Average Price)', content: 'The single most important indicator for institutions. It is the average price a stock traded at, weighted by volume. If a hedge fund buys 10 Million shares, their boss judges their performance based on whether they bought above or below the VWAP.'
    },
    { id: 'p10', type: 'insight', title: 'VWAP as the Ultimate Magnet', content: 'Because algorithmic execution engines are programmed to buy as close to the VWAP as possible, the VWAP acts as an incredibly powerful intraday magnet and Support/Resistance level.'
    },
    { id: 'p11', type: 'concept', title: 'Anchored VWAP', content: 'Instead of starting the VWAP at the beginning of the day, you "Anchor" it to a major event (e.g., an earnings report, or the exact bottom of a crash). It tracks the average cost basis of everyone who bought since that specific event.'
    },
    { id: 'p12', type: 'exercise', title: 'VWAP Dynamics', content: 'Why do institutional algorithms care so much about the VWAP?', options: ['It predicts the future perfectly.', 'It is the standard benchmark used to judge if an institutional trader got a "good price" on a massive order.', 'It is the only legal indicator.'], correctAnswer: 'It is the standard benchmark used to judge if an institutional trader got a "good price" on a massive order.'
    },
    { id: 'p13', type: 'concept', title: 'Auction Market Theory (AMT)', content: 'The market is just a two-way auction. Its only purpose is to facilitate trade. It moves up until buyers refuse to pay higher (finding the ceiling), and moves down until sellers refuse to sell lower (finding the floor).'
    },
    { id: 'p14', type: 'insight', title: 'Value Area', content: 'In AMT, 70% of the volume trades in the "Value Area" (a fair price). If price breaks out of the Value Area, it is seeking a new fair price. If it fails to find acceptance there, it will violently reject back into the old Value Area.'
    },
    { id: 'p15', type: 'concept', title: 'Liquidity Voids', content: 'If the market crashes instantly on massive news, it leaves a "Void" in the order book. There was no time for trading to occur. The market hates voids and will almost always gravitate back to that level to fill the empty space.'
    },
    { id: 'p16', type: 'example', title: 'Fair Value Gaps (FVG)', content: 'A massive 3-candle sequence where the wicks of candle 1 and candle 3 do not overlap. The empty space in candle 2 is an FVG. It acts as an algorithmic magnet.'
    },
    { id: 'p17', type: 'exercise', title: 'Algorithmic Magnets', content: 'What is a Fair Value Gap (FVG)?', options: ['A gap between Friday close and Monday open.', 'An imbalance in price action leaving a "void" of liquidity that algorithms will often seek to fill.', 'A tax loophole.'], correctAnswer: 'An imbalance in price action leaving a "void" of liquidity that algorithms will often seek to fill.'
    },
    { id: 'p18', type: 'concept', title: 'Time as a Filter', content: 'Price doesn\'t just need to break resistance; it needs to spend TIME there. If price breaks $100 and stays there for 3 days, $100 is "Accepted". If it breaks $100 and drops back to $90 in 3 seconds, it was a "Rejection".'
    },
    { id: 'p19', type: 'insight', title: 'The 3-Day Rule', content: 'Pros rarely buy the initial breakout. They wait for a 3-day close above the level to ensure it is Accepted by the market, avoiding the Fake-Out trap.'
    },
    { id: 'p20', type: 'concept', title: 'Bookmap (Heatmaps)', content: 'Software that visualizes the Limit Order Book as a heatmap. You can literally see a bright red line at $100 if there are 1 Million shares resting there waiting to sell.'
    },
    { id: 'p21', type: 'warning', title: 'Spoofing the Heatmap', content: 'Because retail traders now use Bookmap, institutions will place a massive 1 Million share Buy order at $90 to make retail think $90 is safe Support. As soon as price hits $91, the institution cancels the order (Spoofing), and the price crashes through the empty floor.'
    },
    { id: 'p22', type: 'exercise', title: 'Level 2 Manipulation', content: 'How do institutions "Spoof" the order book?', options: ['By hacking the exchange.', 'By placing massive, highly visible limit orders to create fake support/resistance, and canceling them right before they execute.', 'By using dark pools.'], correctAnswer: 'By placing massive, highly visible limit orders to create fake support/resistance, and canceling them right before they execute.'
    },
    { id: 'p23', type: 'concept', title: 'The Asian, London, and NY Sessions', content: 'Crypto trades 24/7, but the volume is tied to global timezones. The Asian session usually consolidates. London creates the false breakout. New York creates the true trend for the day.'
    },
    { id: 'p24', type: 'insight', title: 'The Kill Zones', content: 'Algorithmic volatility spikes precisely during the overlap of the London and New York sessions (8:00 AM - 11:00 AM EST). Pros only trade during these high-volume "Kill Zones".'
    },
    { id: 'p25', type: 'concept', title: 'Gamma Squeezes', content: 'When retail buys massive amounts of Call options, Market Makers MUST buy the underlying stock to hedge their risk. The stock goes up, making the Calls more valuable, forcing the MM to buy EVEN MORE stock. (e.g., Tesla 2020).'
    },
    { id: 'p26', type: 'warning', title: 'The Gamma Unwind', content: 'When the options expire, the Market Maker no longer needs the hedge. They dump millions of shares instantly, causing a violent, unpredictable crash that technical analysis cannot explain.'
    },
    { id: 'p27', type: 'concept', title: 'Systematic Exits', content: 'A pro trader never says "I think it will go higher." They say, "I will trail my stop loss at the 21 EMA. I will exit when the CVD shows divergence, or when we hit the weekly +1.5 Standard Deviation VWAP band." No emotion. Just execution.'
    },
    { id: 'p28', type: 'insight', title: 'The Edge', content: 'Your edge is not predicting the future. Your edge is identifying when the institutions are trapped, and positioning yourself to profit from their forced liquidation.'
    },
    { id: 'p29', type: 'concept', title: 'Summary', content: 'Candles are the surface. Order flow is the matrix. Stop looking at the lagging indicators, and start watching the liquidity.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Order Flow and VWAP in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You are day trading. The stock drops violently and hits the Daily VWAP at $50. A massive green candle prints on your chart. It looks like a perfect bounce. But your Order Flow software shows the Delta inside that green candle is -500,000.",
        startingBalance: 100000,
        choices: [
          { text: "Buy immediately. The price is green and it bounced off VWAP!", result: -25000, feedback: "You traded the illusion! The negative Delta proved that massive institutional sellers were aggressively unloading into the VWAP. The 'bounce' was just passive limit orders getting chewed through. Ten seconds later, the floor gave out and it crashed to $40." },
          { text: "Short the stock. The Order Flow proves aggressive selling is overwhelming the buyers.", result: 30000, feedback: "Pro execution. You ignored the misleading green candle and read the internal Order Flow. You saw the aggressive sellers and front-ran the break of the VWAP. The stock plummeted." },
          { text: "Buy Call Options because the RSI is oversold.", result: -15000, feedback: "You used a lagging retail indicator instead of real-time institutional Order Flow. The RSI stayed oversold for the next three days as the stock bled to death." }
        ]
      }
    }
  ]
};
