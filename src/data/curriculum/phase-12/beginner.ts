import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p12-beginner',
  title: 'Trend Identification & Moving Averages',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'The Purpose of Indicators', content: 'Indicators do not predict the future. They are simply mathematical formulas applied to past price data. Their only purpose is to help you visualize trends and momentum more clearly than raw price alone.'
    },
    { id: 'b2', type: 'warning', title: 'The Lagging Illusion', content: 'Almost all indicators are "Lagging". Because they use past data, by the time an indicator tells you to buy, the actual price move has already started (and might be over). You must combine indicators with raw Price Action.'
    },
    { id: 'b3', type: 'concept', title: 'Moving Averages (MA)', content: 'A Moving Average is a line that smooths out the chaotic daily price swings to show you the overall trend. A 50-day MA is the average closing price of the last 50 days.'
    },
    { id: 'b4', type: 'insight', title: 'The Golden Rule of MAs', content: 'If the price is ABOVE the 200-day Moving Average, you are in a long-term Bull Market. You only look for reasons to BUY. If the price is BELOW the 200-day MA, you are in a Bear Market. You only look for reasons to SELL.'
    },
    { id: 'b5', type: 'exercise', title: 'Trend Filtering', content: 'If a stock is trading well below its 200-day Moving Average, what should your primary strategy be?', options: ['Buy as much as possible because it is cheap.', 'Do not buy long positions; the stock is in a confirmed long-term downtrend (Bear Market).', 'Ignore the moving average.'], correctAnswer: 'Do not buy long positions; the stock is in a confirmed long-term downtrend (Bear Market).'
    },
    { id: 'b6', type: 'concept', title: 'SMA vs EMA', content: 'A Simple Moving Average (SMA) treats all past days equally. An Exponential Moving Average (EMA) puts more mathematical weight on RECENT days. This makes the EMA react much faster to sudden price changes.'
    },
    { id: 'b7', type: 'example', title: 'Using the EMA', content: 'Day traders prefer EMAs (like the 9 EMA or 21 EMA) because they need to see rapid momentum shifts intraday. Long-term investors prefer SMAs (like the 200 SMA) because they ignore daily noise.'
    },
    { id: 'b8', type: 'concept', title: 'Moving Average Crossovers', content: 'When a fast moving average (like the 50-day) crosses over a slow moving average (like the 200-day), it signals a massive shift in market momentum.'
    },
    { id: 'b9', type: 'insight', title: 'The Golden Cross', content: 'When the 50-day MA crosses UP and OVER the 200-day MA, it is called a Golden Cross. It is historically one of the most reliable signals that a massive, multi-year Bull Market has begun.'
    },
    { id: 'b10', type: 'warning', title: 'The Death Cross', content: 'When the 50-day MA crosses DOWN below the 200-day MA, it is a Death Cross. It signals that short-term momentum has collapsed and a severe Bear Market is underway.'
    },
    { id: 'b11', type: 'exercise', title: 'Crossovers', content: 'What does a "Golden Cross" (50 MA crossing above 200 MA) signify?', options: ['The stock is about to go bankrupt.', 'A major shift from a downtrend into a confirmed, long-term Bull Market.', 'Nothing.'], correctAnswer: 'A major shift from a downtrend into a confirmed, long-term Bull Market.'
    },
    { id: 'b12', type: 'concept', title: 'Moving Averages as Support/Resistance', content: 'MAs don\'t just show direction; they act as invisible floors and ceilings. In a strong uptrend, price will pull back to the 21 EMA, bounce off it perfectly, and continue higher.'
    },
    { id: 'b13', type: 'example', title: 'The Rubber Band Effect', content: 'Price is connected to the moving average by a rubber band. If price skyrockets too far away from the 50 MA, the rubber band stretches. Eventually, it must snap back to the MA (Mean Reversion).'
    },
    { id: 'b14', type: 'exercise', title: 'Mean Reversion', content: 'If a stock is currently 50% higher than its 50-day Moving Average, what is statistically likely to happen next?', options: ['It will double again tomorrow.', 'It will likely pull back (Mean Revert) to the Moving Average before continuing the trend.', 'It will be delisted.'], correctAnswer: 'It will likely pull back (Mean Revert) to the Moving Average before continuing the trend.'
    },
    { id: 'b15', type: 'concept', title: 'The MACD (Moving Average Convergence Divergence)', content: 'The MACD takes two moving averages and subtracts them. It shows you the distance between the two MAs as a histogram. It is the ultimate indicator for spotting accelerating or decelerating momentum.'
    },
    { id: 'b16', type: 'insight', title: 'The MACD Cross', content: 'When the fast MACD line crosses above the slow Signal line, momentum is shifting bullish. It is an early warning system that the trend is about to change before the price fully reflects it.'
    },
    { id: 'b17', type: 'concept', title: 'RSI (Relative Strength Index)', content: 'The RSI is an oscillator that measures the speed and change of price movements. It bounces between 0 and 100.'
    },
    { id: 'b18', type: 'insight', title: 'Overbought vs Oversold', content: 'Traditionally, if RSI is above 70, the asset is "Overbought" (due for a pullback). If RSI is below 30, the asset is "Oversold" (due for a bounce).'
    },
    { id: 'b19', type: 'warning', title: 'The Overbought Trap', content: 'In a massive, raging Bull Market, the RSI can stay "Overbought" above 70 for months. If you short a stock just because the RSI is 75, you will be crushed by the trend.'
    },
    { id: 'b20', type: 'exercise', title: 'RSI Logic', content: 'Should you blindly sell a stock the exact moment its RSI hits 71 (Overbought)?', options: ['Yes, it means an instant crash is guaranteed.', 'No, in a strong trend, an asset can remain overbought for a long time. It simply means momentum is extremely high.', 'Yes, the SEC requires it.'], correctAnswer: 'No, in a strong trend, an asset can remain overbought for a long time. It simply means momentum is extremely high.'
    },
    { id: 'b21', type: 'concept', title: 'Volume', content: 'Volume is the number of shares traded. It is the only indicator that cannot be faked. Price moves without volume are fake. Price moves with massive volume are real.'
    },
    { id: 'b22', type: 'example', title: 'Confirming the Breakout', content: 'A stock breaks above a massive resistance line. If the volume is tiny, it is a Trap; institutions aren\'t buying. If the volume is 3x higher than average, it is a true Breakout. The institutions have arrived.'
    },
    { id: 'b23', type: 'exercise', title: 'Volume Confirmation', content: 'What is required to confirm that a "Breakout" above resistance is legitimate?', options: ['A tweet from the CEO.', 'A massive surge in trading Volume accompanying the price move.', 'A low RSI.'], correctAnswer: 'A massive surge in trading Volume accompanying the price move.'
    },
    { id: 'b24', type: 'concept', title: 'Bollinger Bands', content: 'Two bands plotted two standard deviations above and below a moving average. They act as a volatility envelope. 95% of all price action happens inside the bands.'
    },
    { id: 'b25', type: 'insight', title: 'The Squeeze', content: 'When volatility drops, the Bollinger Bands squeeze tightly together. In physics, when you compress a spring, energy builds. A Bollinger Squeeze almost always precedes a massive, violent price explosion (in either direction).'
    },
    { id: 'b26', type: 'concept', title: 'Multiple Timeframe Analysis', content: 'Never trade using just one chart. If the 15-minute chart looks bullish, but the Daily chart is in a massive Death Cross downtrend, the 15-minute rally is just a trap.'
    },
    { id: 'b27', type: 'insight', title: 'Top-Down Approach', content: 'Pros check the Weekly chart for the macro trend. Then the Daily chart for the setup. Then the 1-Hour chart for the precise entry. The higher timeframe always overrules the lower timeframe.'
    },
    { id: 'b28', type: 'warning', title: 'Indicator Soup', content: 'Amateurs put 15 different indicators on their chart. It becomes unreadable. Pros use Price Action, Volume, and maybe 2 moving averages. Keep your charts clean.'
    },
    { id: 'b29', type: 'concept', title: 'Summary', content: 'Indicators are training wheels. They help you see the momentum of price action. But price is always king. If the indicator says buy, but the price is breaking support on massive volume, trust the price.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Moving Averages and Trend in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You are looking at a chart. The price is $50. The 50-day Moving Average is $60. The 200-day Moving Average is $80. The RSI is currently 25 (Oversold).",
        startingBalance: 10000,
        choices: [
          { text: "Buy the stock aggressively! The RSI is oversold, it has to bounce.", result: -5000, feedback: "You ignored the macro trend! The price was below the 50 MA, which was below the 200 MA (a massive Bear Market). An oversold RSI in a Bear Market just means the asset is dying. It dropped to $25." },
          { text: "Do not buy. The asset is in a confirmed Death Cross downtrend.", result: 0, feedback: "Smart execution. You prioritized the Moving Averages over the oscillator. You preserved your capital by refusing to catch a falling knife in a bear market." },
          { text: "Short the stock immediately.", result: -1000, feedback: "You correctly identified the downtrend, but shorting when the RSI is 25 is dangerous. The stock had a brief 10% 'relief bounce' that triggered your stop loss before continuing its downtrend." }
        ]
      }
    }
  ]
};
