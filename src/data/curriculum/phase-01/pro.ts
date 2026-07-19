import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p1-pro',
  title: 'Market Microstructure & Order Flow',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'Order Flow Dynamics', content: 'You now understand Limit Orders and Market Orders. Order Flow is the advanced study of how these two interact to drive price.'
    },
    { id: 'p2', type: 'insight', title: 'Passive vs Aggressive', content: 'Limit orders are Passive. They sit in the book waiting. Market orders are Aggressive. They attack the book.\n\nPassive orders provide liquidity. Aggressive orders consume liquidity.'
    },
    { id: 'p3', type: 'concept', title: 'The Imbalance', content: 'Price moves when there is an imbalance between aggressive buyers consuming liquidity, and passive sellers providing it.\n\nIf 10,000 market buy orders attack a price level that only has 1,000 limit sell orders, the price instantly gaps up to find more sellers.'
    },
    { id: 'p4', type: 'example', title: 'Absorption', content: 'Sometimes, thousands of Market Buy orders flood in, but the price DOES NOT MOVE. Why?\n\nBecause an institution is sitting there with a massive, hidden iceberg Limit Sell order, absorbing every single aggressive buyer. The buyers are exhausting themselves against a brick wall.'
    },
    { id: 'p5', type: 'exercise', title: 'Absorption Logic', content: 'If you see massive volume of aggressive market buying, but the price cannot break through resistance, what is likely happening?', options: ['The exchange is broken.', 'A massive institutional seller is absorbing all the buy liquidity.', 'A short squeeze.'], correctAnswer: 'A massive institutional seller is absorbing all the buy liquidity.'
    },
    { id: 'p6', type: 'concept', title: 'Iceberg Orders', content: 'Institutions do not show their full hand on Level 2. If they want to sell 1 million shares, they use an algorithm to slice it into tiny pieces.\n\nThey show 1,000 shares on the Ask. Once that fills, the algorithm instantly replaces it with another 1,000. It looks like a tiny order, but it is hiding an iceberg.'
    },
    { id: 'p7', type: 'warning', title: 'The Level 2 Illusion', content: 'Because of Iceberg orders and Spoofing, relying entirely on Level 2 to find Support and Resistance is dangerous. The true institutional orders are hidden. You must track Volume and Order Flow to see where the actual money is trading.'
    },
    { id: 'p8', type: 'concept', title: 'Tape Reading (Time & Sales)', content: 'The "Tape" is a running list of every single trade that actually executes. It shows the Time, Price, and Size of the trade.\n\nWhile Level 2 shows INTENT (what people want to do), the Tape shows REALITY (what actually happened).'
    },
    { id: 'p9', type: 'insight', title: 'Hitting the Bid vs Lifting the Offer', content: 'If a trade executes at the exact Ask price, it means an aggressive buyer just Market Bought (Lifted the Offer).\nIf a trade executes at the Bid price, an aggressive seller just Market Sold (Hit the Bid).'
    },
    { id: 'p10', type: 'example', title: 'Tape Reading Speed', content: 'If the tape suddenly accelerates, and you see massive blocks of green trades executing entirely at the Ask price, it means institutional momentum is stepping in. Big money is aggressively market buying.'
    },
    { id: 'p11', type: 'exercise', title: 'The Tape', content: 'What is the primary difference between Level 2 and the Tape?', options: ['Level 2 is for stocks, the Tape is for crypto.', 'Level 2 shows executed trades, the Tape shows limit orders.', 'Level 2 shows resting limit orders (intent), the Tape shows executed market orders (reality).'], correctAnswer: 'Level 2 shows resting limit orders (intent), the Tape shows executed market orders (reality).'
    },
    { id: 'p12', type: 'concept', title: 'Volume Profile', content: 'Standard volume shows how much traded during a specific TIME (like one day).\n\nVolume Profile shows how much traded at a specific PRICE.'
    },
    { id: 'p13', type: 'insight', title: 'Point of Control (POC)', content: 'The price level with the highest volume profile is the Point of Control. It is the fairest price, where the most agreement between buyers and sellers occurred.\n\nThe POC acts like a massive magnet and an ultimate support/resistance zone.'
    },
    { id: 'p14', type: 'concept', title: 'Low Volume Nodes (LVN)', content: 'Price levels with almost no volume. This means the market violently rejected these prices and moved through them instantly.\n\nBecause they were skipped over, the market will often violently skip over them again in the future.'
    },
    { id: 'p15', type: 'exercise', title: 'Profile Navigation', content: 'If the price drops into a High Volume Node (HVN) / Point of Control, what is the most likely behavior?', options: ['It will violently gap down.', 'It will slow down and range, as it is a zone of high liquidity and agreement.', 'It will go to zero.'], correctAnswer: 'It will slow down and range, as it is a zone of high liquidity and agreement.'
    },
    { id: 'p16', type: 'concept', title: 'VWAP (Volume Weighted Average Price)', content: 'VWAP is the true average price of a stock, weighted by how much volume traded at each level.\n\nInstitutions are judged by whether they execute their massive orders above or below the VWAP.'
    },
    { id: 'p17', type: 'insight', title: 'The Institutional Baseline', content: 'If an institutional trader buys 100,000 shares below the VWAP, they get a bonus because they got a "good deal" compared to the market average.\n\nTherefore, VWAP acts as a dynamic, intra-day support level.'
    },
    { id: 'p18', type: 'concept', title: 'Delta', content: 'In order flow, Delta is the net difference between Market Buys and Market Sells within a candle.\n\nIf there are 5,000 Market Buys and 3,000 Market Sells, the Delta is +2,000.'
    },
    { id: 'p19', type: 'example', title: 'Divergence', content: 'If the price is making higher highs, but the Cumulative Delta is dropping aggressively into the negative, it is a massive warning sign. The uptrend is exhausting, and aggressive sellers are secretly taking control.'
    },
    { id: 'p20', type: 'exercise', title: 'Delta Dynamics', content: 'What does a positive Delta of +10,000 mean?', options: ['10,000 more limit orders exist.', 'The price went up $10,000.', 'There were 10,000 more aggressive Market Buy executions than Market Sells.'], correctAnswer: 'There were 10,000 more aggressive Market Buy executions than Market Sells.'
    },
    { id: 'p21', type: 'concept', title: 'Payment for Order Flow (PFOF)', content: 'When you use "Zero Fee" brokers like Robinhood, your trades are not sent directly to the exchange.\n\nThey are sold to massive High-Frequency Trading firms (like Citadel) who execute them for you.'
    },
    { id: 'p22', type: 'insight', title: 'You Are The Product', content: 'Why do they pay Robinhood for your orders?\n\nBecause retail flow is "dumb money." It is not toxic institutional flow. The HFT firm can effortlessly match your order internally, pocket the bid-ask spread, and make billions a year off tiny fractions of a penny.'
    },
    { id: 'p23', type: 'concept', title: 'Routing', content: 'Pro traders do not use PFOF brokers. They use Direct Access brokers. They literally select exactly which Exchange (NYSE, ARCA, EDGX) their order goes to, paying a small commission to ensure perfect execution speed and zero front-running.'
    },
    { id: 'p24', type: 'concept', title: 'Options Market Makers', content: 'The options market heavily manipulates the underlying {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}}.\n\nWhen retail buys millions of Call Options (betting the stock will go up), the Market Maker selling them those calls is taking massive risk.'
    },
    { id: 'p25', type: 'insight', title: 'Delta Hedging', content: 'To neutralize their risk, the Market Maker is mathematically forced to buy the underlying stock. If the stock goes up, they buy more. This creates a "Gamma Squeeze", a forced buying loop that creates extreme volatility.'
    },
    { id: 'p26', type: 'warning', title: 'The Tail Wagging the Dog', content: 'On days where trillions of dollars of options expire (OpEx days), the underlying {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} becomes wildly unpredictable. Algorithms are aggressively hedging and un-hedging options exposure, ignoring fundamental news entirely.'
    },
    { id: 'p27', type: 'exercise', title: 'Market Mechanics Summary', content: 'If a massive bank is selling you Call options, how do they hedge their risk?', options: ['They pray the stock goes down.', 'They dynamically buy the underlying stock to remain neutral.', 'They sell your data.'], correctAnswer: 'They dynamically buy the underlying stock to remain neutral.'
    },
    { id: 'p28', type: 'concept', title: 'The True Market', content: 'The {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} is a hyper-complex, multi-layered machine designed to transfer wealth from the impatient and uneducated to the patient and calculated.'
    },
    { id: 'p29', type: 'insight', title: 'Your Edge', content: 'You cannot beat HFT algorithms on speed. You cannot beat hedge funds on data. Your only edge is discipline, risk management, and the patience to wait for A+ setups where the order flow proves the institutions are on your side.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Order Flow, Absorption, and Iceberg orders in a live dynamic scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You are watching the Tape (Time & Sales) for Tesla. It is hitting major resistance at $250. You see massive, rapid-fire green Market Buy orders flooding the tape... but the price refuses to move past $250.05.",
        startingBalance: 15000,
        choices: [
          { text: "Go Long. There is massive green volume, it's about to break out.", result: -2000, feedback: "You bought into massive Absorption. An institution had a hidden Iceberg sell order at $250, absorbing all that green buying pressure. Once the buyers exhausted themselves, the price instantly dumped to $240." },
          { text: "Go Short. The massive buying pressure is being absorbed by an institutional Iceberg seller.", result: 4000, feedback: "Perfect Order Flow reading! You realized the aggressive buyers were hitting a brick wall. When the buyers gave up, the lack of support caused the price to cascade downward, and your short position printed massive profit." },
          { text: "Set a Limit Buy at $251 to catch the breakout if it finally pushes through.", result: 0, feedback: "Smart conservative play. The price never broke $250.05 because of the absorption, so your order never triggered, keeping your capital safe from the subsequent dump." }
        ]
      }
    }
  ]
};
