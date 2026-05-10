import { Lesson } from '../../../types/curriculum';

export const advancedLessons: Lesson[] = [
  {
    id: 'p5-l11',
    title: 'Lesson 11: Order Blocks & Supply/Demand Zones',
    level: 'advanced',
    explanation: `Retail traders draw lines; institutional traders draw zones. Institutions cannot enter their massive positions all at once without causing massive slippage (moving the price against themselves). Instead, they leave "footprints" called Order Blocks.

An Order Block (OB) is the last candle before a massive, rapid displacement in price that breaks market structure. A bullish OB is the last bearish candle before a huge rally. A bearish OB is the last bullish candle before a massive crash. 

These blocks represent areas where institutions deliberately injected capital to manipulate the market before the real move. When price eventually returns to an Order Block, there are usually massive, un-triggered limit orders still resting there, causing price to violently bounce. True Supply and Demand zones are based entirely on these institutional footprints, not random retail trendlines.`,
    subtopics: [
      'The Mechanics of Institutional Slippage',
      'Identifying Valid Order Blocks',
      'Supply & Demand vs Support & Resistance',
      'Refining Zones on Lower Timeframes'
    ],
    examples: [
      {
        id: 'ex-p5-11-1',
        title: 'The Bullish Order Block Bounce',
        scenario: 'A stock ranges for a week. Suddenly, a small red candle prints, followed immediately by three massive green candles that break a major resistance level.',
        breakdown: 'That small red candle is the Bullish Order Block. Weeks later, the stock retraces. The moment it taps the top of that red candle\'s range, it skyrockets 20%. Institutions defended their original entry point.'
      },
      {
        id: 'ex-p5-11-2',
        title: 'The Bearish Mitigation',
        scenario: 'Bitcoin crashes $10,000 in a day. The last green candle before the crash was at $50,000.',
        breakdown: 'Two months later, Bitcoin rallies back to $50,000. It taps the body of that old green candle (Bearish OB) and immediately rejects, dropping $5,000 in hours. This is called "mitigation"—institutions exiting underwater longs they used to initiate the original short.'
      }
    ],
    exercises: [
      {
        id: 'exer-p5-11-1',
        question: 'What defines a Bullish Order Block?',
        type: 'multiple-choice',
        options: ['Any green candle', 'The highest green candle in a trend', 'The last bearish (red) candle before a massive upward displacement that breaks structure'],
        correctAnswer: 'The last bearish (red) candle before a massive upward displacement that breaks structure'
      },
      {
        id: 'exer-p5-11-2',
        question: 'Why do Order Blocks cause violent reactions when price returns to them?',
        type: 'multiple-choice',
        options: ['Because retail traders draw them', 'Because there are often massive institutional limit orders still resting in that zone', 'Because the exchange halts trading at those levels'],
        correctAnswer: 'Because there are often massive institutional limit orders still resting in that zone'
      }
    ]
  },
  {
    id: 'p5-l12',
    title: 'Lesson 12: ChoCh vs Break of Structure (BOS)',
    level: 'advanced',
    explanation: `Understanding the difference between a Change of Character (ChoCh) and a Break of Structure (BOS) is the key to mastering market flow.

A **Break of Structure (BOS)** is trend continuation. If an asset is in an uptrend making Higher Highs and Higher Lows, every time it breaks a previous Higher High to make a new one, that is a BOS. It confirms the trend is perfectly healthy.

A **Change of Character (ChoCh)** is the very first sign of a macro reversal. If an asset is making Higher Highs and Higher Lows, but suddenly fails to make a new high, and then breaks down below its previous Higher Low, that is a ChoCh. The "character" of the market has violently shifted from bullish to bearish. A smart money trader waits for a ChoCh on a lower timeframe to confirm an entry at a higher timeframe Order Block.`,
    subtopics: [
      'BOS: Validating Trend Continuation',
      'ChoCh: The First Warning of Reversal',
      'Internal vs External Structure',
      'Using ChoCh as a High-Probability Entry Trigger'
    ],
    examples: [
      {
        id: 'ex-p5-12-1',
        title: 'The Healthy BOS',
        scenario: 'A stock rallies to $100, pulls back to $90, and then blasts through $100 to reach $115.',
        breakdown: 'Breaking the $100 level is a Bullish BOS. It proves buyers are still in absolute control and have the capital to consume any selling pressure at the old highs.'
      },
      {
        id: 'ex-p5-12-2',
        title: 'The Deadly ChoCh',
        scenario: 'A crypto token hits $50, pulls back to $45, tries to rally but only reaches $48 (Lower High), and then crashes violently to $40.',
        breakdown: 'Breaking below the $45 structural low is a bearish ChoCh. It proves that demand has been completely exhausted and supply has taken over. Long positions must be exited immediately.'
      }
    ],
    exercises: [
      {
        id: 'exer-p5-12-1',
        question: 'What does a Break of Structure (BOS) signify?',
        type: 'multiple-choice',
        options: ['Market reversal', 'Trend continuation', 'A sudden drop in volume'],
        correctAnswer: 'Trend continuation'
      },
      {
        id: 'exer-p5-12-2',
        question: 'A Change of Character (ChoCh) occurs when:',
        type: 'multiple-choice',
        options: ['Price breaks a previous structural low in an uptrend, signaling a potential reversal', 'Price breaks a previous high in an uptrend', 'Price moves completely sideways'],
        correctAnswer: 'Price breaks a previous structural low in an uptrend, signaling a potential reversal'
      }
    ]
  },
  {
    id: 'p5-l13',
    title: 'Lesson 13: Fibonacci Retracements & Extensions',
    level: 'advanced',
    explanation: `The Fibonacci sequence is a mathematical phenomenon found throughout nature, architecture, and yes, financial markets. Because millions of traders and algorithmic bots use Fibonacci ratios, they become a self-fulfilling prophecy.

A **Fibonacci Retracement** measures how far a pullback will go before the original trend resumes. The most critical levels are the 0.5 (50%), the 0.618, and the 0.65. The zone between 0.618 and 0.65 is known as the "Golden Pocket." Algorithms are programmed to aggressively buy pullbacks into the Golden Pocket during a macro uptrend.

A **Fibonacci Extension** is used to predict where price will go after it breaks out into all-time highs (where there is no historical resistance). The 1.618 extension is the standard target where professionals will systematically take profits.`,
    subtopics: [
      'The Mathematics of Market Psychology',
      'Drawing the Fib Pull (Swing Low to Swing High)',
      'The Golden Pocket (0.618 - 0.65)',
      'Taking Profits with the 1.618 Extension'
    ],
    examples: [
      {
        id: 'ex-p5-13-1',
        title: 'The Golden Pocket Bounce',
        scenario: 'Ethereum rallies from $2,000 to $3,000. It then begins a terrifying 2-week pullback. Retail panics.',
        breakdown: 'A professional draws a Fib from $2k to $3k. The 0.618 level sits exactly at $2,382. Price hits $2,380, instantly rejects, and rallies to new highs. The professional bought the Golden Pocket.'
      },
      {
        id: 'ex-p5-13-2',
        title: 'The Extension Target',
        scenario: 'A stock breaks its all-time high of $100. Retail traders have no idea where to sell, so they hold forever.',
        breakdown: 'A pro uses a Fib Extension on the previous swing. The 1.618 level is at $142. The stock hits $142.50 and immediately crashes 30%. The pro locked in massive profits right at the mathematical algorithmic target.'
      }
    ],
    exercises: [
      {
        id: 'exer-p5-13-1',
        question: 'What is the "Golden Pocket" in Fibonacci trading?',
        type: 'multiple-choice',
        options: ['The 0.236 level', 'The zone between the 0.618 and 0.65 retracement levels', 'The 1.0 level'],
        correctAnswer: 'The zone between the 0.618 and 0.65 retracement levels'
      },
      {
        id: 'exer-p5-13-2',
        question: 'What is the primary use of a Fibonacci Extension tool?',
        type: 'multiple-choice',
        options: ['To predict targets for profit-taking when price is in price discovery (no historical resistance)', 'To measure trading volume', 'To calculate broker fees'],
        correctAnswer: 'To predict targets for profit-taking when price is in price discovery (no historical resistance)'
      }
    ]
  },
  {
    id: 'p5-l14',
    title: 'Lesson 14: Liquidity Sweeps / Stop Hunts',
    level: 'advanced',
    explanation: `Institutions are like whales; they need an ocean of water (liquidity) to swim without beaching themselves. In trading, "Liquidity" equals the Stop Loss orders of retail traders. 

If an institution wants to buy 1 million shares, they cannot just hit "Buy" or the price will skyrocket. They need 1 million shares of SELL orders to match against. Where are the most sell orders? Right below obvious retail Support lines (where retail puts their stop losses).

A **Liquidity Sweep** (or Stop Hunt) is when institutions intentionally push the price just below a major support line to trigger a cascade of retail stop losses (which are sell orders). The institutions absorb all those sell orders with their massive buy orders, and the price instantly reverses into a massive rally. This is why you often get "stopped out" just before the trade goes perfectly in your direction. The market didn't know you were there; it just knew there was a pool of liquidity it needed to consume.`,
    subtopics: [
      'The Nature of Institutional Liquidity',
      'Where Does Retail Hide Their Stops?',
      'The Mechanics of a Stop Hunt',
      'Trading the Sweep (The Turtle Soup pattern)'
    ],
    examples: [
      {
        id: 'ex-p5-14-1',
        title: 'The Retail Trap',
        scenario: 'A very obvious support line sits at $50. Millions of retail traders buy at $51 and put their stop losses at $49.50.',
        breakdown: 'Price crashes to $49.20. All retail traders are stopped out for a loss. Within minutes, a massive green candle erupts, taking the price to $60. The institutions just stole retail\'s shares at a discount.'
      },
      {
        id: 'ex-p5-14-2',
        title: 'The Equal Highs Sweep',
        scenario: 'A stock hits $100 exactly twice over a month (Equal Highs), creating obvious resistance. Retail traders heavily short the stock, putting stop losses at $101.',
        breakdown: 'Price randomly spikes to $101.50, sweeping all the short-seller stop losses (which are buy orders), providing the exact liquidity institutions need to enter massive short positions. Price then crashes to $70.'
      }
    ],
    exercises: [
      {
        id: 'exer-p5-14-1',
        question: 'In institutional trading, what does "Liquidity" usually refer to?',
        type: 'multiple-choice',
        options: ['Cash in a bank account', 'The pools of retail stop-loss orders resting above/below obvious levels', 'The amount of volume on a 1-minute chart'],
        correctAnswer: 'The pools of retail stop-loss orders resting above/below obvious levels'
      },
      {
        id: 'exer-p5-14-2',
        question: 'Why do institutions intentionally trigger retail stop losses (Stop Hunts)?',
        type: 'multiple-choice',
        options: ['Just to be mean', 'To generate the massive opposing orders they need to fill their huge positions without causing slippage', 'To increase exchange fees'],
        correctAnswer: 'To generate the massive opposing orders they need to fill their huge positions without causing slippage'
      }
    ]
  },
  {
    id: 'p5-l15',
    title: 'Lesson 15: Wyckoff Accumulation & Distribution',
    level: 'advanced',
    explanation: `Richard Wyckoff was a pioneer in technical analysis who realized the market operates in specific phases driven by the "Composite Man" (institutional money). 

**Accumulation** is a sideways range at the bottom of a bear market. Institutions are quietly buying massive amounts of assets from panicked retail traders. They keep the price pinned in a range so their buying doesn't trigger a rally prematurely. This phase often ends with a "Spring"—a final, brutal fake-out drop below support to sweep the last bit of retail liquidity before the real bull run begins.

**Distribution** is the exact opposite. It occurs at the top of a massive bull run. Institutions are quietly unloading their bags onto euphoric retail traders. They keep the price propped up with good news while they sell. This often ends with an "Upthrust" (UTAD)—a final fake breakout to all-time highs to trap the last remaining buyers before a devastating bear market begins.`,
    subtopics: [
      'The Composite Man Concept',
      'The Phases of Accumulation (A to E)',
      'The "Spring" (The Ultimate Trap)',
      'Distribution and the Upthrust (UTAD)'
    ],
    examples: [
      {
        id: 'ex-p5-15-1',
        title: 'The Wyckoff Spring',
        scenario: 'After a year-long crypto bear market, price ranges between $20k and $25k for 6 months. Suddenly, bad news hits and price crashes to $18k. Retail declares crypto dead.',
        breakdown: 'Within 48 hours, price skyrockets back inside the range, breaks $25k, and initiates a new macro bull market. The $18k drop was the Wyckoff "Spring"—a deliberate trap by the Composite Man to steal final liquidity.'
      },
      {
        id: 'ex-p5-15-2',
        title: 'The Distribution Upthrust',
        scenario: 'A tech stock has rallied 500%. It ranges at the top for months. Suddenly, incredible news hits, and the stock breaks out to a new all-time high. Retail pours their life savings in.',
        breakdown: 'The breakout immediately fails, leaving a massive red shooting star candle. This was the Upthrust (UTAD). Institutions used the news hype to dump their final holdings. A 2-year bear market follows.'
      }
    ],
    exercises: [
      {
        id: 'exer-p5-15-1',
        question: 'What is the purpose of the Wyckoff "Accumulation" phase?',
        type: 'multiple-choice',
        options: ['For retail traders to take profits', 'For institutions to quietly build massive long positions without driving the price up', 'To calculate taxes'],
        correctAnswer: 'For institutions to quietly build massive long positions without driving the price up'
      },
      {
        id: 'exer-p5-15-2',
        question: 'In Wyckoff Theory, what is a "Spring"?',
        type: 'multiple-choice',
        options: ['A season of the year', 'A final, brutal fake-out drop below support to sweep liquidity before a massive bull run', 'A sudden increase in dividends'],
        correctAnswer: 'A final, brutal fake-out drop below support to sweep liquidity before a massive bull run'
      }
    ]
  }
];
