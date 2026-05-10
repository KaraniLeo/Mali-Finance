import { Lesson } from '../../../types/curriculum';
import { phase05Images } from '../phase-05-images';

export const beginnerLesson: Lesson = {
  id: 'p5-beginner',
  title: 'Candlesticks & Market Emotion',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'What is Technical Analysis?', content: 'Technical Analysis (TA) is the study of historical price action to identify probabilities of future market movements.\n\nIt is NOT a crystal ball. It does not predict the future.'
    },
    { id: 'b2', type: 'insight', title: 'Why It Actually Works', content: 'Charts are visual representations of human psychology: Fear and Greed.\n\nWhen a stock hits $100 and drops violently, it leaves a psychological scar on the buyers. The chart shows you these battlegrounds.'
    },
    { id: 'b3', type: 'concept', title: 'The Line Chart vs Candlesticks', content: 'A standard line chart only shows the closing price of an asset over time. It hides all the volatility and fighting that happened during the day.\n\nCandlesticks reveal everything.'
    },
    { id: 'b4', type: 'concept', title: 'Candlestick Basics (OHLC)', content: 'A candlestick gives you four critical pieces of information for a specific time period:\n- Open: Where price started\n- High: The maximum price reached\n- Low: The minimum price reached\n- Close: Where the price ended'
    },
    { id: 'b5', type: 'example', title: 'The Body', content: 'The thick colored part is the "Body" (Open to Close).\n\nA Green body means the Close was higher than the Open (Buyers won).\nA Red body means the Close was lower than the Open (Sellers won).'
    },
    { id: 'b6', type: 'example', title: 'The Wicks', content: 'The thin lines above and below the body are the "Wicks" or "Shadows".\n\nThey show the extreme highs and lows the price reached before being pushed back by the opposing side.'
    },
    { id: 'b7', type: 'exercise', title: 'Body Check', content: 'If a candle opens at $10 and closes at $15, what color is the body?', options: ['Red', 'Green', 'Black'], correctAnswer: 'Green'
    },
    { id: 'b8', type: 'concept', title: 'Timeframes', content: 'A candlestick can represent any timeframe: 1 minute, 1 hour, 1 day, or 1 month. A daily candle contains all the price action of that entire day.'
    },
    { id: 'b9', type: 'warning', title: 'The Timeframe Trap', content: 'Avoid trading candlestick patterns on 1-minute or 5-minute charts. Micro-timeframes are filled with algorithmic noise. The higher the timeframe (Daily, Weekly), the more powerful the pattern.'
    },
    { id: 'b10', type: 'insight', title: 'Context is King', content: 'A candlestick pattern by itself is useless. A bullish pattern floating in the middle of a downtrend means nothing. It only matters when it occurs at a key psychological level.'
    },
    { id: 'b11', type: 'concept', title: 'The Doji: Indecision', content: 'A Doji occurs when the Open and the Close are exactly the same. It looks like a cross.\n\nPsychologically, it means that despite buyers and sellers fighting, nobody won. It represents extreme indecision.'
    },
    { id: 'b12', type: 'example', title: 'Doji Reversals', content: 'If you see a Doji after a massive 5-day uptrend, it is a warning sign. The buyers who were previously in complete control have suddenly lost their momentum. The market is pausing.'
    },
    { id: 'b13', type: 'exercise', title: 'Identify the Doji', content: 'If you see a Doji after a massive 5-day uptrend, what does it likely signify?', options: ['Buyers are getting stronger.', 'The uptrend is pausing and buyers are losing momentum.', 'The market is broken.'], correctAnswer: 'The uptrend is pausing and buyers are losing momentum.'
    },
    { id: 'b14', type: 'concept', title: 'The Hammer (Bullish Pin Bar)', content: 'A Hammer has a small body at the top and a massive lower wick. It looks like a hammer.\n\nIt forms when sellers aggressively push the price down, but buyers step in and violently reject the low prices, pushing the price back up.'
    },
    { id: 'b15', type: 'example', title: 'Hammer Psychology', content: 'The Hammer shows a complete failure of the sellers. They tried to crash the market, but the demand was too strong. It is a powerful bullish reversal signal if found at the bottom of a downtrend.'
    },
    { id: 'b16', type: 'concept', title: 'The Shooting Star', content: 'The exact opposite of a Hammer. It has a small body at the bottom and a massive upper wick.\n\nBuyers tried to push the price to new highs, but sellers aggressively rejected them.'
    },
    { id: 'b17', type: 'exercise', title: 'Wick Interpretation', content: 'A long upper wick indicates what?', options: ['Aggressive buying pressure.', 'Aggressive selling pressure rejecting higher prices.', 'Indecision.'], correctAnswer: 'Aggressive selling pressure rejecting higher prices.'
    },
    { id: 'b18', type: 'concept', title: 'Engulfing Patterns', content: 'An Engulfing pattern involves two candles. A Bullish Engulfing occurs when a small red candle is completely swallowed (engulfed) by a massive green candle the next day.'
    },
    { id: 'b19', type: 'example', title: 'Engulfing Psychology', content: 'The Bullish Engulfing means the sellers had control yesterday, but today, buyers completely destroyed the sellers, erasing all of yesterday\'s progress and then some.'
    },
    { id: 'b20', type: 'concept', title: 'Marubozu', content: 'A Marubozu is a candlestick with absolutely no wicks. Just a massive solid body.\n\nIt means one side was in 100% control from the very first second the market opened until the very last second it closed.'
    },
    { id: 'b21', type: 'warning', title: 'Never Trade in Isolation', content: 'Never buy a stock just because you see a Bullish Engulfing or a Hammer. These are just pieces of the puzzle. You must combine them with Support and Resistance (next lesson).'
    },
    { id: 'b22', type: 'insight', title: 'The Story of the Chart', content: 'Stop trying to memorize 100 different Japanese names for patterns. Instead, look at the candle and ask yourself: "Who won the battle today? The buyers or the sellers?"'
    },
    { id: 'b23', type: 'exercise', title: 'Story Time', content: 'If a candle has no upper wick, a massive green body, and no lower wick, who won?', options: ['The Bulls (Buyers)', 'The Bears (Sellers)', 'It was a tie'], correctAnswer: 'The Bulls (Buyers)'
    },
    { id: 'b24', type: 'concept', title: 'Volume Integration', content: 'Candlesticks tell you the result of the battle. Volume tells you how many soldiers were fighting.\n\nA Hammer with low volume is weak. A Hammer with record-breaking volume is extremely powerful.'
    },
    { id: 'b25', type: 'concept', title: 'Trend Continuation', content: 'Not all candles signal a reversal. Many candles (like small dojis in the middle of a strong trend) simply signal a brief pause before the trend continues.'
    },
    { id: 'b26', type: 'example', title: 'The Pause', content: 'If a stock goes up 10% on Monday, prints a Doji on Tuesday, and then goes up another 10% on Wednesday, the Doji was just the market catching its breath.'
    },
    { id: 'b27', type: 'concept', title: 'Gaps', content: 'Sometimes, the Open of today\'s candle is significantly higher or lower than the Close of yesterday\'s candle. This empty space is called a Gap.\n\nGaps usually happen because of overnight news.'
    },
    { id: 'b28', type: 'insight', title: 'Filling the Gap', content: 'There is a famous saying: "Markets hate vacuums." Gaps act like magnets. The price will often eventually return to "fill the gap" before continuing its original trend.'
    },
    { id: 'b29', type: 'exercise', title: 'Gap Trap', content: 'If a stock closes at $10, announces terrible news overnight, and opens the next day at $5, what has occurred?', options: ['A Bullish Engulfing', 'A Bearish Gap Down', 'A Doji'], correctAnswer: 'A Bearish Gap Down'
    },
    { id: 'b30', type: 'concept', title: 'Next Steps', content: 'You now know how to read the footprints of the market. But knowing the footprints isn\'t enough; you need to know the map. In the next lesson, we will cover Support, Resistance, and Strategy.', tool: 'market'
    }
  ]
};
