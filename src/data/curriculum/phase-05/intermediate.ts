import { Lesson } from '../../../types/curriculum';
import { phase05Images } from '../phase-05-images';

export const intermediateLesson: Lesson = {
  id: 'p5-intermediate',
  title: 'Support, Resistance & Strategy Logic',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Battlefield', content: 'If candlesticks are the soldiers, Support and Resistance are the trenches.\n\nThe market moves between these predefined zones. Understanding where they are is the most important skill in Technical Analysis.'
    },
    { id: 'i2', type: 'concept', title: 'Support (The Floor)', content: 'Support is a price level where demand (buyers) is historically strong enough to prevent the price from falling further.\n\nImagine a bouncy ball hitting the floor. The floor pushes it back up.'
    },
    { id: 'i3', type: 'insight', title: 'Why Support Exists', content: 'Support exists because of Memory.\n\nIf Bitcoin drops to $30,000 and immediately rockets to $60,000, traders REMEMBER that $30k was a great buying opportunity. When it hits $30k again, they aggressively buy.'
    },
    { id: 'i4', type: 'concept', title: 'Resistance (The Ceiling)', content: 'Resistance is a price level where supply (sellers) is historically strong enough to prevent the price from rising further.\n\nThe ball hits the ceiling and falls back down.'
    },
    { id: 'i5', type: 'insight', title: 'Why Resistance Exists', content: 'Resistance exists because of Regret and Profit Taking.\n\nTraders who bought at the absolute top of a rally regret it when the price crashes. When the price finally returns to their break-even point, they sell to escape without a loss. Simultaneously, smart money is taking profit.'
    },
    { id: 'i6', type: 'warning', title: 'Lines vs Zones', content: 'Never draw Support or Resistance as a razor-thin, exact line. The market is not that perfect.\n\nDraw them as thick ZONES. Price might bounce at $98, $100, or $102.'
    },
    { id: 'i7', type: 'exercise', title: 'Zone Check', content: 'Is support an exact price point or an area?', options: ['An exact price point (e.g., $100.00)', 'A zone or area (e.g., $98 - $102)', 'It does not exist.'], correctAnswer: 'A zone or area (e.g., $98 - $102)'
    },
    { id: 'i8', type: 'concept', title: 'Role Reversal', content: 'When a Resistance ceiling is finally broken, it often becomes the new Support floor. When a Support floor breaks, it becomes the new Resistance ceiling.'
    },
    { id: 'i9', type: 'example', title: 'The Roof Becomes the Floor', content: 'You are in a 2-story house. You break through the ceiling (Resistance) to the 2nd floor. Now, if you look down, that exact same wood acts as your Floor (Support).'
    },
    { id: 'i10', type: 'concept', title: 'Trendlines', content: 'Support and Resistance do not have to be perfectly horizontal. They can be diagonal, forming Trendlines.'
    },
    { id: 'i11', type: 'example', title: 'Uptrend Structure', content: 'An Uptrend is defined by a series of Higher Highs (HH) and Higher Lows (HL).\n\nYou can draw a diagonal Support trendline connecting the Higher Lows.'
    },
    { id: 'i12', type: 'concept', title: 'The More Touches, The Weaker', content: 'Many retail traders think "The more times a support line is hit, the stronger it is."\n\nThis is completely WRONG.'
    },
    { id: 'i13', type: 'insight', title: 'The Ice Phenomenon', content: 'Think of Support like ice on a lake. Every time you jump on it (price hits support), the ice cracks a little more because the buy orders are being consumed.\n\nBy the 4th or 5th jump, the ice breaks.'
    },
    { id: 'i14', type: 'exercise', title: 'Strength Check', content: 'What happens to a support zone the more times it is tested?', options: ['It gets stronger.', 'It gets weaker because buy orders are being consumed.', 'Nothing changes.'], correctAnswer: 'It gets weaker because buy orders are being consumed.'
    },
    { id: 'i15', type: 'concept', title: 'Strategy: The Hammer Bounce', content: 'What is it?\nA strategy that buys a "Hammer" candlestick exactly when it touches a major Support zone.'
    },
    { id: 'i16', type: 'insight', title: 'Why The Hammer Bounce Works', content: 'Sellers try to push the price through Support, triggering fear. But massive institutional buyers step in, absorbing all the selling pressure and violently pushing the price back up, leaving a long lower wick.'
    },
    { id: 'i17', type: 'example', title: 'Step-by-Step Execution: Part 1', content: '- Step 1: Identify a major horizontal Support zone on the Daily chart.\n- Step 2: Wait for the price to drop into that zone. Do NOT buy yet. Be patient.'
    },
    { id: 'i18', type: 'example', title: 'Step-by-Step Execution: Part 2', content: '- Step 3: Wait for the daily candle to close as a Hammer (long lower wick).\n- Step 4: Buy at the open of the next candle.\n- Step 5: Place a Stop Loss just below the lowest point of the Hammer\'s wick.'
    },
    { id: 'i19', type: 'warning', title: 'When NOT to use this strategy', content: 'Do NOT use this strategy if the overall macroeconomic trend is a violent crash (e.g., a massive global recession). In a true panic, support zones will break regardless of candlestick patterns.'
    },
    { id: 'i20', type: 'exercise', title: 'Stop Loss Placement', content: 'Where should your stop-loss be placed when trading a Hammer bounce at support?', options: ['Exactly on the support line.', 'Just below the lowest point of the Hammer\'s wick.', 'There is no need for a stop-loss on a strong support.'], correctAnswer: 'Just below the lowest point of the Hammer\'s wick.'
    },
    { id: 'i21', type: 'concept', title: 'Strategy: The Break and Retest', content: 'What is it?\nWaiting for Resistance to break, and then buying when the price pulls back down to retest the broken resistance as new support.'
    },
    { id: 'i22', type: 'insight', title: 'Why it Works', content: 'Traders who missed the initial breakout wait for a pullback to get in. Traders who shorted the breakout at resistance are now trapped, and they buy to cover their losses when the price returns to break-even. This creates massive demand.'
    },
    { id: 'i23', type: 'example', title: 'Step-by-Step Execution: Part 1', content: '- Step 1: Identify a major Resistance zone.\n- Step 2: Wait for a massive green candle to break through and close ABOVE the zone on high volume.'
    },
    { id: 'i24', type: 'example', title: 'Step-by-Step Execution: Part 2', content: '- Step 3: Let the FOMO traders buy the top. Wait for the price to pull back (retest) the zone.\n- Step 4: Look for a bullish candlestick pattern (like a Hammer or Doji) at the retest.\n- Step 5: Buy, placing your stop loss below the new support zone.'
    },
    { id: 'i25', type: 'warning', title: 'The Fakeout Danger', content: 'If you buy the initial breakout instead of waiting for the retest, you are vulnerable to a "Fakeout" (where the price instantly crashes back down).'
    },
    { id: 'i26', type: 'exercise', title: 'The Patient Trader', content: 'Why is the Break and Retest strategy safer than buying the initial breakout?', options: ['It confirms that the broken resistance is actually acting as new support.', 'It guarantees a 100% win rate.', 'It allows you to buy at the absolute highest price.'], correctAnswer: 'It confirms that the broken resistance is actually acting as new support.'
    },
    { id: 'i27', type: 'concept', title: 'Moving Averages as Dynamic Support', content: 'The 50-day and 200-day Moving Averages act as invisible, moving Support and Resistance lines. Many algorithmic trading bots use them to execute trades.'
    },
    { id: 'i28', type: 'insight', title: 'The Golden Cross', content: 'When the 50-day moving average crosses above the 200-day moving average, it is called a Golden Cross. It is a lagging, but powerful, long-term bullish signal.'
    },
    { id: 'i29', type: 'example', title: 'Death Cross', content: 'The opposite of a Golden Cross. When the 50-day crosses below the 200-day, indicating a long-term bear market has begun.'
    },
    { id: 'i30', type: 'concept', title: 'Next Steps', content: 'You now know how to draw the battlefield and trade the bounces. But what happens when the institutions decide to break the rules to trap you? Let\'s look at advanced liquidity concepts.', tool: 'market'
    }
  ]
};
