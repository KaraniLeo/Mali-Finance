import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p12-intermediate',
  title: 'Price Action & Support/Resistance',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'Naked Price Action', content: 'Price Action trading means stripping all indicators off your chart. You trade purely based on the raw price movements, candlestick patterns, and volume. It is the most direct way to read the market.'
    },
    { id: 'i2', type: 'insight', title: 'Market Memory', content: 'Why does Support and Resistance work? Because humans have memories, and humans are emotional. If a stock crashed from $100 last year, investors remember the pain of $100. When it gets back to $100, they aggressively sell to "break even", creating a massive resistance wall.'
    },
    { id: 'i3', type: 'concept', title: 'Support & Resistance Flips', content: 'One of the most powerful laws of trading: Broken Resistance becomes new Support. Broken Support becomes new Resistance.'
    },
    { id: 'i4', type: 'example', title: 'The Resistance Flip', content: 'A stock tries to break $50 three times and fails (Resistance). It finally breaks through to $55. When it pulls back, it will almost perfectly bounce off $50 (which is now Support) before rocketing higher.'
    },
    { id: 'i5', type: 'exercise', title: 'S/R Mechanics', content: 'What happens to a massive Resistance ceiling once the price finally breaks above it?', options: ['It disappears.', 'It flips into a Support floor, acting as a bounce zone on the first pullback.', 'It causes the stock to delist.'], correctAnswer: 'It flips into a Support floor, acting as a bounce zone on the first pullback.'
    },
    { id: 'i6', type: 'concept', title: 'Trendlines', content: 'A diagonal line drawn connecting the higher-lows of an uptrend, or the lower-highs of a downtrend. It acts as a diagonal Support/Resistance level.'
    },
    { id: 'i7', type: 'warning', title: 'Subjective Lines', content: 'Horizontal Support is objective (everyone sees $100). Diagonal Trendlines are subjective. If you ask 5 traders to draw a trendline, you get 5 different lines. Do not trust them blindly.'
    },
    { id: 'i8', type: 'concept', title: 'Chart Patterns: Head & Shoulders', content: 'A massive reversal pattern. It consists of three peaks: a left shoulder, a higher head, and a lower right shoulder. It signals that the bulls tried to make a new high, failed, and the bears are taking over.'
    },
    { id: 'i9', type: 'insight', title: 'The Neckline Break', content: 'You do not short a Head and Shoulders pattern until the price breaks the "Neckline" (the support level connecting the bottoms of the pattern) on high volume.'
    },
    { id: 'i10', type: 'concept', title: 'Chart Patterns: Bull Flag', content: 'A continuation pattern. The stock skyrockets (the flagpole), then consolidates in a slight downward channel (the flag) on low volume. When it breaks out of the flag, it usually shoots up the exact length of the flagpole.'
    },
    { id: 'i11', type: 'exercise', title: 'Chart Patterns', content: 'What does a "Bull Flag" pattern signify?', options: ['The end of a bull market.', 'A temporary pause/consolidation in a massive uptrend before the stock continues higher.', 'A signal to short the stock.'], correctAnswer: 'A temporary pause/consolidation in a massive uptrend before the stock continues higher.'
    },
    { id: 'i12', type: 'concept', title: 'Fibonacci Retracements', content: 'The Fibonacci sequence is a mathematical ratio found everywhere in nature (galaxies, hurricanes, human faces). In trading, when a stock makes a massive move, it often pulls back to specific Fibonacci ratios (38.2%, 50%, 61.8%) before continuing.'
    },
    { id: 'i13', type: 'insight', title: 'The Golden Pocket', content: 'The area between the 61.8% and 65% retracement levels is called the Golden Pocket. It is statistically the highest probability bounce zone in all of financial charting.'
    },
    { id: 'i14', type: 'exercise', title: 'Fibonacci Mechanics', content: 'Why do Fibonacci retracements work in the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}}?', options: ['Because the SEC enforces them.', 'Because humans (and the algorithms they program) subconsciously recognize these mathematical ratios, turning them into self-fulfilling prophecies.', 'Because they predict the future.'], correctAnswer: 'Because humans (and the algorithms they program) subconsciously recognize these mathematical ratios, turning them into self-fulfilling prophecies.'
    },
    { id: 'i15', type: 'concept', title: 'Gaps', content: 'When a stock closes at $100 on Friday, and opens at $110 on Monday, there is an empty space on the chart between $100 and $110. This is a Gap.'
    },
    { id: 'i16', type: 'insight', title: 'Gaps Fill', content: 'There is a legendary Wall Street saying: "Gaps always fill." Statistically, 80% of gaps are eventually filled. The price will eventually drop back down to $100 to touch the empty space before continuing its trend.'
    },
    { id: 'i17', type: 'concept', title: 'Breakaway Gaps', content: 'The exception to the rule. A Breakaway Gap happens on massive volume and breaks a multi-year resistance line. It signals a fundamental shift in the company. Breakaway gaps almost NEVER fill. If you wait for it to fill, you miss the entire run.'
    },
    { id: 'i18', type: 'warning', title: 'Pattern Failure', content: 'Patterns fail. A perfect Bull Flag can break down. The failure of a pattern is often a stronger signal than the pattern itself. If a perfect Bull Flag breaks DOWN, it is a massive short signal.'
    },
    { id: 'i19', type: 'concept', title: 'Volume Profile', content: 'Standard volume shows how much traded on a specific DAY. Volume Profile shows how much traded at a specific PRICE. It puts volume bars on the Y-axis.'
    },
    { id: 'i20', type: 'insight', title: 'Point of Control (POC)', content: 'The price level with the longest Volume Profile bar is the POC. It is the price where the most money changed hands. It acts as a massive magnetic Support/Resistance zone.'
    },
    { id: 'i21', type: 'exercise', title: 'Volume Tools', content: 'What is the difference between standard Volume and Volume Profile?', options: ['Volume Profile is only for crypto.', 'Standard Volume tracks time (X-axis). Volume Profile tracks price (Y-axis), showing exactly where the most money is trapped.', 'There is no difference.'], correctAnswer: 'Standard Volume tracks time (X-axis). Volume Profile tracks price (Y-axis), showing exactly where the most money is trapped.'
    },
    { id: 'i22', type: 'concept', title: 'Divergence', content: 'The most powerful leading indicator. It happens when the Price is doing one thing, but an Oscillator (like RSI or MACD) is doing the opposite.'
    },
    { id: 'i23', type: 'example', title: 'Bearish Divergence', content: 'The stock hits $100 (RSI 80). It pulls back, then rallies to a new high of $110. But the RSI only hits 60. Price made a Higher High, but Momentum made a Lower High. The momentum is dying. A crash is imminent.'
    },
    { id: 'i24', type: 'exercise', title: 'Divergence Mechanics', content: 'What is Bearish Divergence?', options: ['When the stock goes down.', 'When Price makes a Higher High, but the Momentum Indicator makes a Lower High, signaling weakness.', 'When you disagree with a trade.'], correctAnswer: 'When Price makes a Higher High, but the Momentum Indicator makes a Lower High, signaling weakness.'
    },
    { id: 'i25', type: 'concept', title: 'Confluence', content: 'You never take a trade based on one signal. You look for Confluence (stacking edges). E.g., The price hits the 200MA + It is a Fibonacci 61.8% level + Bullish Divergence on the RSI.'
    },
    { id: 'i26', type: 'insight', title: 'The High Probability Setup', content: 'A single indicator has a 50% win rate. Stacking 4 uncorrelated indicators at the exact same price zone gives you an 80% high-probability A+ setup.'
    },
    { id: 'i27', type: 'concept', title: 'Stop Loss Placement', content: 'Amateurs put their Stop Loss exactly ON the Support line. Pros put their Stop Loss slightly BELOW the Support line, because they know Market Makers will hunt the obvious liquidity.'
    },
    { id: 'i28', type: 'warning', title: 'The Wicks', content: 'Always wait for the candle to close. A candle can drop below support, panicking everyone into selling, but in the last 5 minutes, institutions buy it back up, leaving a massive wick and closing above support.'
    },
    { id: 'i29', type: 'concept', title: 'Summary', content: 'Price Action is the language of the market. Candlesticks are the words, Support/Resistance are the sentences, and Volume is the emotion.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Divergence and Support Flips in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "A stock broke a massive resistance line at $100 and rallied to $120. Over the next month, it slowly bleeds back down to $100. As it touches $100, the RSI shows massive Bullish Divergence.",
        startingBalance: 20000,
        choices: [
          { text: "Short the stock. It's crashing from $120.", result: -10000, feedback: "You completely ignored the Resistance Flip rule! $100 was massive resistance, so it is now massive Support. You shorted exactly into a major demand zone. The stock bounced to $130 and you were liquidated." },
          { text: "Buy the stock at $100. It is a Resistance-Turned-Support retest with Bullish Divergence.", result: 15000, feedback: "Pro execution. You combined Price Action (S/R Flip) with Momentum (Bullish Divergence) to create an A+ Confluence setup. The stock bounced perfectly off the $100 floor." },
          { text: "Wait for the stock to drop to $90 to get a better price.", result: 0, feedback: "You missed the trade. The $100 Support wall held perfectly. The stock never went to $90. You protected your capital, but missed a massive high-probability win." }
        ]
      }
    }
  ]
};
