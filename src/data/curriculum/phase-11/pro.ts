import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p11-pro',
  title: 'Institutional Traps & Systemic Flow',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Liquidity Trap', content: 'Institutions (Smart Money) move billions of dollars. If they just buy a stock, the price will instantly skyrocket before their order is filled, ruining their entry. They need LIQUIDITY (sellers) to absorb their massive buy orders.'
    },
    { id: 'p2', type: 'insight', title: 'Engineering Liquidity', content: 'How do institutions find sellers? They ENGINEER panic. They will intentionally dump a small amount of stock to break a key Support level. Retail traders panic and sell. The institution absorbs all that panic selling to fill their massive long position at the bottom.'
    },
    { id: 'p3', type: 'example', title: 'The Stop Hunt', content: 'You put your Stop Loss right below Support. The institution sees the massive cluster of Stop Losses. They drive the price down, triggering your Stop Loss (which is an automatic Sell order). They buy your shares for cheap, and the price instantly reverses upward.'
    },
    { id: 'p4', type: 'exercise', title: 'Institutional Mechanics', content: 'Why do institutions intentionally trigger retail Stop Losses?', options: ['To be mean.', 'Because they need the massive surge of automated retail selling to act as liquidity so they can fill their own massive buy orders without moving the price up.', 'Because the SEC forces them to.'], correctAnswer: 'Because they need the massive surge of automated retail selling to act as liquidity so they can fill their own massive buy orders without moving the price up.'
    },
    { id: 'p5', type: 'concept', title: 'The Spring (Wyckoff)', content: 'The exact moment an institution sweeps the lows, triggers the stops, and rapidly buys the asset back up into the trading range. It leaves a massive wick on the candle. This is the ultimate "Buy" signal for a pro.'
    },
    { id: 'p6', type: 'insight', title: 'Trading the Trap', content: 'Amateurs trade the breakout. Pros trade the FAILED breakout. When price breaks Support, pros wait. If it instantly violently reverses back up (The Spring), they buy heavily, knowing the institutions just fueled up.'
    },
    { id: 'p7', type: 'concept', title: 'Asymmetric Information', content: 'You do not have the same information as Wall Street. They have satellites tracking Walmart parking lots to predict earnings. They pay for raw order flow data. You are playing poker against someone who can see your cards.'
    },
    { id: 'p8', type: 'warning', title: 'News is Manipulation', content: 'By the time a "Bullish" article hits CNBC, the institutions have already bought the asset weeks ago. They are using the news to generate retail Euphoria so they can sell their bags to you.'
    },
    { id: 'p9', type: 'exercise', title: 'Media Literacy', content: 'If a massive, incredibly positive news story drops on mainstream media about a stock, what are the institutions likely doing?', options: ['Buying the stock alongside you.', 'Using the sudden influx of retail buyers as liquidity to quietly sell their positions (Distribution).', 'Nothing.'], correctAnswer: 'Using the sudden influx of retail buyers as liquidity to quietly sell their positions (Distribution).'
    },
    { id: 'p10', type: 'concept', title: 'Order Flow (Level 2)', content: 'Pros don\'t just look at charts. They look at the raw Order Book (Level 2 data) to see exactly where the massive institutional Buy and Sell walls are resting.'
    },
    { id: 'p11', type: 'insight', title: 'The Tape', content: 'Reading the Tape (Time and Sales) allows you to see the exact size of market orders hitting the bid or ask in real-time. If you see massive block orders printing, you know the whales are moving.'
    },
    { id: 'p12', type: 'concept', title: 'Dark Pools', content: 'Institutions do not want to trade on the public exchanges because they will move the price too much. They trade in "Dark Pools" (private exchanges) where their massive volume is hidden from the public tape.'
    },
    { id: 'p13', type: 'warning', title: 'Dark Pool Prints', content: 'Retail cannot trade in Dark Pools, but pro software can track the delayed "Prints" when the trades settle. A massive Dark Pool print usually signifies a major institutional reversal is imminent.'
    },
    { id: 'p14', type: 'exercise', title: 'Market Structure', content: 'Why do massive institutions use "Dark Pools"?', options: ['To avoid paying taxes.', 'To execute massive block trades without causing massive price slippage on the public retail exchanges.', 'Because they are illegal.'], correctAnswer: 'To execute massive block trades without causing massive price slippage on the public retail exchanges.'
    },
    { id: 'p15', type: 'concept', title: 'The VIX Term Structure', content: 'Pros don\'t just look at the VIX. They look at the VIX Futures Curve (Contango vs Backwardation). If the front-month VIX is higher than the back-month (Backwardation), extreme panic is happening RIGHT NOW.'
    },
    { id: 'p16', type: 'insight', title: 'Gamma Exposure (GEX)', content: 'Market Makers must hedge their options positions. GEX measures the total Gamma exposure of dealers. If GEX is highly negative, Market Makers are forced to sell when the market drops, accelerating the crash.'
    },
    { id: 'p17', type: 'concept', title: 'The Reflexive Feedback Loop', content: 'Negative GEX + Panic Selling + Stop Loss Hunting = A Reflexive Feedback Loop. The market drops, forcing dealers to sell, triggering more stops, forcing more selling. This is how Flash Crashes happen.'
    },
    { id: 'p18', type: 'exercise', title: 'Market Maker Mechanics', content: 'What happens when Market Maker Gamma Exposure (GEX) is highly negative?', options: ['The market stays perfectly flat.', 'Market makers are forced to sell as the market drops, violently accelerating the speed and severity of crashes.', 'The government steps in.'], correctAnswer: 'Market makers are forced to sell as the market drops, violently accelerating the speed and severity of crashes.'
    },
    { id: 'p19', type: 'concept', title: 'Systematic Trading (Algos)', content: '80% of volume on the stock market is generated by algorithms (robots), not humans. They do not feel fear. They do not feel greed. They execute math.'
    },
    { id: 'p20', type: 'insight', title: 'Algorithm Signatures', content: 'Algos leave footprints. Examples: TWAP (Time-Weighted Average Price) slices a massive $1B order into thousands of tiny orders executed exactly every 30 seconds to hide their footprint.'
    },
    { id: 'p21', type: 'concept', title: 'The Meta-Game', content: 'Trading is a game of understanding what the other players HAVE to do. If a hedge fund is margin-called, they HAVE to sell, regardless of the price. You position yourself to profit from their forced liquidation.'
    },
    { id: 'p22', type: 'warning', title: 'The Retail Squeeze', content: 'Sometimes retail wins. If hedge funds are massively short (e.g., GameStop 2021), retail can collectively buy the stock, driving the price up, and forcing the hedge funds to cover (buy) their shorts, driving the price up further in an infinite loop.'
    },
    { id: 'p23', type: 'exercise', title: 'The Squeeze', content: 'What causes a "Short Squeeze"?', options: ['The company goes bankrupt.', 'A rising price forces massive Short Sellers to buy back the stock to cover their losses, which violently drives the price even higher.', 'The SEC fines the company.'], correctAnswer: 'A rising price forces massive Short Sellers to buy back the stock to cover their losses, which violently drives the price even higher.'
    },
    { id: 'p24', type: 'concept', title: 'Soros and the Bank of England', content: 'In 1992, George Soros broke the Bank of England. He realized the UK government was artificially pegging their currency. He shorted the Pound so aggressively that the central bank ran out of money and surrendered. He made $1 Billion in a day.'
    },
    { id: 'p25', type: 'insight', title: 'Breaking the Peg', content: 'The lesson: No entity, not even a government or a central bank, can fight the math of the free market forever. If a peg is artificial, it will eventually break.'
    },
    { id: 'p26', type: 'concept', title: 'The Zen of Trading', content: 'Pro traders do not care if the market goes up or down. They only care about Volatility and Liquidity. They extract cash flow from the chaos.'
    },
    { id: 'p27', type: 'insight', title: 'The Ultimate Edge', content: 'Your edge is not a secret indicator. Your edge is discipline, risk management, and the emotional fortitude to execute your plan perfectly while the rest of the world is panicking.'
    },
    { id: 'p28', type: 'warning', title: 'Survival', content: 'There are old traders, and there are bold traders. But there are very few old, bold traders. Do not blow up.'
    },
    { id: 'p29', type: 'concept', title: 'Summary', content: 'Understand the mechanics of the institutions. Stop acting like Retail. Stop reading the news. Watch the volume, watch the liquidity, and trade the traps.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Institutional Stop Hunts in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "A stock has bounced off the $100 Support line three times. Everyone on Twitter is buying at $100 and putting their Stop Loss at $98. Suddenly, massive volume spikes, the price crashes to $96, wiping everyone out. But immediately, it reverses back up to $102.",
        startingBalance: 100000,
        choices: [
          { text: "Short the stock. It broke Support, so it's a confirmed downtrend.", result: -30000, feedback: "You fell for the Institutional Trap. The break of Support was fake. It was a 'Spring'. They hunted the retail stops at $98 to fill their massive long positions. The stock rocketed to $120. You got liquidated." },
          { text: "Buy the stock aggressively the moment it reclaims $100.", result: 40000, feedback: "Pro execution. You identified the 'Spring' (Stop Hunt). You knew the institutions just fueled up on retail liquidity. You bought the reversal and rode the institutional wave up." },
          { text: "Do nothing, the chart is too volatile.", result: 0, feedback: "A safe choice. Preserving capital is never a bad idea if you cannot clearly read the institutional footprint." }
        ]
      }
    }
  ]
};
