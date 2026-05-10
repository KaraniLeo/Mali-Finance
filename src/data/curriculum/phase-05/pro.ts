import { Lesson } from '../../../types/curriculum';
import { phase05Images } from '../phase-05-images';

export const proLesson: Lesson = {
  id: 'p5-pro',
  title: 'Liquidity Sweeps & Market Traps',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Matrix of the Market', content: 'You now know how retail traders think. You know they buy at Support and sell at Resistance. You know they put their stop-losses just outside those zones.\n\nInstitutions know this too. And they use it against you.'
    },
    { id: 'p2', type: 'insight', title: 'The Liquidity Problem', content: 'If you want to buy 10 shares of Apple, you just click buy. If a hedge fund wants to buy 10 MILLION shares, they can\'t just click buy. There aren\'t enough sellers at that exact price.\n\nIf they market-buy, they will spike the price up and ruin their average entry. They need massive Liquidity.'
    },
    { id: 'p3', type: 'concept', title: 'Hunting Stop Losses', content: 'Where is massive liquidity resting?\n\nIn the form of retail stop-losses. A stop-loss on a long position is an automatic SELL order. If a hedge fund wants to BUY millions of shares, they need millions of SELL orders to hit the market.'
    },
    { id: 'p4', type: 'example', title: 'The Setup', content: 'Retail traders buy at Support ($100). They place their stop-losses at $98.\n\nInstitutions intentionally dump a block of shares to push the price down to $97.'
    },
    { id: 'p5', type: 'example', title: 'The Execution', content: 'When the price hits $97, all the retail stop-losses trigger. Millions of SELL orders flood the market.\n\nThe institution now has the liquidity to execute their massive BUY order without spiking the price.'
    },
    { id: 'p6', type: 'concept', title: 'The Result', content: 'The price drops below support, triggering panic. Then, it violently reverses and rockets up. Retail is stopped out and left behind. This is called a Liquidity Sweep.'
    },
    { id: 'p7', type: 'exercise', title: 'Institutional Logic', content: 'Why do institutions trigger retail stop losses?', options: ['To be mean to retail traders.', 'To generate enough opposite-side liquidity to fill their massive orders.', 'Because algorithms are glitchy.'], correctAnswer: 'To generate enough opposite-side liquidity to fill their massive orders.'
    },
    { id: 'p8', type: 'concept', title: 'Strategy: The Liquidity Sweep', content: 'What is it?\nTrading the FAKE breakout. You wait for retail traders to get trapped buying a breakout or selling a breakdown, then you enter when the price reverses.'
    },
    { id: 'p9', type: 'insight', title: 'Why it Works', content: 'Once the retail stop-losses are triggered, the institutions have the liquidity they need. They reverse the price, leaving the breakout traders trapped at the absolute top or bottom.'
    },
    { id: 'p10', type: 'example', title: 'Step-by-Step Execution: Part 1', content: '- Step 1: Identify a major Resistance level that is extremely obvious to everyone.\n- Step 2: Watch price break above it. Retail FOMO kicks in.'
    },
    { id: 'p11', type: 'example', title: 'Step-by-Step Execution: Part 2', content: '- Step 3: Wait for the price to close back BELOW the resistance level (Fake-out). This confirms it was a Sweep, not a true breakout.\n- Step 4: Enter a short position immediately.\n- Step 5: Stop-loss goes above the new fake-out high.'
    },
    { id: 'p12', type: 'warning', title: 'The True Breakout Risk', content: 'Do NOT front-run the fake-out. Sometimes a breakout is real. You MUST wait for the candle to close back inside the range before assuming it was a trap.'
    },
    { id: 'p13', type: 'exercise', title: 'Sweep Confirmation', content: 'What is the absolute requirement before entering a Liquidity Sweep trade?', options: ['The price must go up.', 'The price must close back INSIDE the previous range.', 'You must enter exactly when it breaks out.'], correctAnswer: 'The price must close back INSIDE the previous range.'
    },
    { id: 'p14', type: 'concept', title: 'Fair Value Gaps (FVG)', content: 'An FVG occurs when the price moves so violently in one direction that no trading occurs between the wicks of the surrounding candles.\n\nIt leaves a gap of inefficiency in the market.'
    },
    { id: 'p15', type: 'insight', title: 'The FVG Magnet', content: 'Algorithms are programmed to seek efficiency. Therefore, price is magnetically drawn back to Fair Value Gaps to fill the empty orders before continuing the macro trend.'
    },
    { id: 'p16', type: 'example', title: 'Trading the FVG', content: 'If there is a massive bullish FVG left behind during an uptrend, patient traders will set limit orders inside the FVG. When price pulls back to fill it, their orders trigger for a perfect sniper entry.'
    },
    { id: 'p17', type: 'concept', title: 'Order Blocks', content: 'An Order Block is the last opposite-colored candle before a massive institutional move.\n\nIf the market explodes upward, the last red candle before the explosion is the Bullish Order Block.'
    },
    { id: 'p18', type: 'insight', title: 'The Footprint of Giants', content: 'Institutions use that final red candle to manipulate the price down and accumulate their longs. Because they left massive buy orders resting there, it becomes an ultimate Support zone for the future.'
    },
    { id: 'p19', type: 'exercise', title: 'Order Block ID', content: 'A Bullish Order Block is defined as:', options: ['The biggest green candle on the chart.', 'The last down (red) candle before a massive upward impulse.', 'A Doji.'], correctAnswer: 'The last down (red) candle before a massive upward impulse.'
    },
    { id: 'p20', type: 'concept', title: 'Confluence', content: 'No single concept should be traded in isolation. The holy grail of trading is Confluence: layering multiple signals on top of each other.'
    },
    { id: 'p21', type: 'example', title: 'The Perfect Setup', content: 'Imagine price drops into a Daily Bullish Order Block. Inside that block is a Fair Value Gap. As price hits the zone, it sweeps retail liquidity below support, and prints a Hammer candle.\n\nThis is a high-probability A+ setup.'
    },
    { id: 'p22', type: 'warning', title: 'Analysis Paralysis', content: 'If you need 10 different indicators and concepts to align perfectly, you will never take a trade. Find 2 or 3 core concepts that make logical sense to you and master them.'
    },
    { id: 'p23', type: 'concept', title: 'Risk-to-Reward Skew', content: 'Pro traders do not have a 90% win rate. They often lose more trades than they win. They are profitable because of their Risk-to-Reward (R:R) ratio.'
    },
    { id: 'p24', type: 'insight', title: 'The Asymmetric Bet', content: 'If your Stop Loss is risking $100, your Take Profit must be at least $300 (1:3 R:R). With a 1:3 ratio, you can be wrong 70% of the time and still break even.'
    },
    { id: 'p25', type: 'exercise', title: 'The Math of Ruin', content: 'If you have a 1:1 Risk-to-Reward ratio, what win rate do you need just to break even?', options: ['30%', '50%', '75%'], correctAnswer: '50%'
    },
    { id: 'p26', type: 'concept', title: 'Volume Spread Analysis (VSA)', content: 'VSA analyzes the relationship between Volume and the Spread (range) of a candlestick.\n\nA massive volume spike on a tiny Doji candle means huge effort, but no result. Someone massive is absorbing all the pressure.'
    },
    { id: 'p27', type: 'example', title: 'Climactic Volume', content: 'The largest volume bar in a trend often signifies the end of that trend. It represents the final capitulation of retail traders throwing in the towel, bought up entirely by smart money.'
    },
    { id: 'p28', type: 'insight', title: 'The Market Maker Model', content: 'The market is not random. It is an engineered delivery of price from one liquidity pool (retail stops) to another.'
    },
    { id: 'p29', type: 'warning', title: 'The Ego Trap', content: 'You cannot outsmart the algorithm. You cannot fight the trend. Your only job is to ride the coattails of the institutions and exit before they do.'
    },
    { id: 'p30', type: 'concept', title: 'The Final Test', content: 'You have seen the matrix. Now, open the Market Simulator and see if you can survive the ultimate 10-day volatility test using everything you have learned.', tool: 'market'
    }
  ]
};
