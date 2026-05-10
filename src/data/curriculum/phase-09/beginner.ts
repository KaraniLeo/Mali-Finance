import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p9-beginner',
  title: 'Intro to Tokenomics',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'What is Tokenomics?', content: 'Tokenomics is a combination of "Token" and "Economics". It is the mathematical study of how a cryptocurrency works: how it is created, how it is distributed, and what gives it value.'
    },
    { id: 'b2', type: 'insight', title: 'Why Tokenomics Matter', content: 'A cryptocurrency can have the most revolutionary technology in the world, but if the tokenomics are designed poorly (e.g., infinite supply, massive inflation), the price of the coin will inevitably crash to zero.'
    },
    { id: 'b3', type: 'concept', title: 'Maximum Supply', content: 'The absolute maximum number of coins that will ever exist. For Bitcoin, this is hard-coded at 21,000,000.'
    },
    { id: 'b4', type: 'warning', title: 'Infinite Supply', content: 'Some coins (like Dogecoin) have no maximum supply. They print billions of new coins every year forever. This means your share of the pie is constantly being diluted by inflation.'
    },
    { id: 'b5', type: 'exercise', title: 'Supply Logic', content: 'If you want to invest in an asset that holds its value over a 10-year period, what type of supply should it ideally have?', options: ['An infinite, ever-expanding supply.', 'A fixed Maximum Supply (Scarcity).', 'A supply controlled by politicians.'], correctAnswer: 'A fixed Maximum Supply (Scarcity).'
    },
    { id: 'b6', type: 'concept', title: 'Circulating Supply', content: 'This is the number of coins that are currently unlocked and trading in the open market right now. It is often much lower than the Maximum Supply.'
    },
    { id: 'b7', type: 'example', title: 'Supply Illusion', content: 'A new coin launches. The Max Supply is 1 Billion. But the Circulating Supply is only 1 Million. Because the circulating supply is so low, the price pumps easily to $10. It looks like a massive success.'
    },
    { id: 'b8', type: 'warning', title: 'The Unlock Dump', content: 'Six months later, the developers unlock the remaining 999 Million coins and dump them on the market. The massive flood of new supply instantly crashes the price from $10 to $0.01. Retail investors lose everything.'
    },
    { id: 'b9', type: 'exercise', title: 'Supply Mechanics', content: 'If a coin has a tiny Circulating Supply but a massive Maximum Supply, what is the major risk to investors?', options: ['The blockchain might stop working.', 'Massive future inflation (unlocks) will dilute the price and crash their investment.', 'The coin will become too expensive to buy.'], correctAnswer: 'Massive future inflation (unlocks) will dilute the price and crash their investment.'
    },
    { id: 'b10', type: 'concept', title: 'Market Capitalization (Market Cap)', content: 'Market Cap = Current Price × Circulating Supply.\n\nIt represents the total current value of the entire network.'
    },
    { id: 'b11', type: 'insight', title: 'Price is an Illusion', content: 'Beginners buy a coin because it is "cheap" at $0.0001, hoping it goes to $100. But if the coin has a supply of 1 Trillion, reaching $100 would mean the coin is worth $100 Trillion (more than all the money in the world). The price doesn\'t matter; only Market Cap matters.'
    },
    { id: 'b12', type: 'exercise', title: 'Market Cap Math', content: 'Coin A is $100 with a supply of 1 million (Market Cap: $100M). Coin B is $0.01 with a supply of 10 billion (Market Cap: $100M). Which coin is "cheaper"?', options: ['Coin B, because it is only $0.01.', 'Coin A, because $100 is a better number.', 'Neither. They are valued exactly the same by the market ($100M).'], correctAnswer: 'Neither. They are valued exactly the same by the market ($100M).'
    },
    { id: 'b13', type: 'concept', title: 'Fully Diluted Valuation (FDV)', content: 'FDV = Current Price × MAXIMUM Supply.\n\nIt shows what the Market Cap would be if every single coin was unlocked today. It is the true measure of a project\'s valuation.'
    },
    { id: 'b14', type: 'insight', title: 'The FDV Trap', content: 'If a project has a Market Cap of $10M, but an FDV of $5 Billion, you are not buying a "cheap micro-cap". You are buying a massively overvalued company that just hasn\'t unlocked its coins yet.'
    },
    { id: 'b15', type: 'exercise', title: 'Valuation Metrics', content: 'Which metric tells you the true, long-term valuation of a crypto project by accounting for all future token unlocks?', options: ['Market Cap', 'Fully Diluted Valuation (FDV)', '24-hour Trading Volume'], correctAnswer: 'Fully Diluted Valuation (FDV)'
    },
    { id: 'b16', type: 'concept', title: 'Token Allocation', content: 'When a new coin is created, who gets the tokens? A good project gives the majority to the community. A bad project gives 80% to the founders and Venture Capitalists.'
    },
    { id: 'b17', type: 'warning', title: 'Venture Capital Dumps', content: 'If Venture Capitalists (VCs) own 50% of the supply, they bought it at $0.01 in a private sale. When the coin launches to the public at $1.00, the VCs will relentlessly sell their bags, ensuring the price never goes up for retail investors.'
    },
    { id: 'b18', type: 'concept', title: 'Utility', content: 'A token must have a reason to exist. If a token\'s only purpose is "buy it and hope it goes up," it is a Ponzi scheme. Utility gives the token real demand.'
    },
    { id: 'b19', type: 'example', title: 'Real Utility', content: 'To use the Ethereum network, you MUST pay gas fees in ETH. This creates a constant, massive, real-world demand for the ETH token, giving it fundamental value.'
    },
    { id: 'b20', type: 'exercise', title: 'Token Demand', content: 'Which of these represents true token Utility?', options: ['A promise from the founder that the price will go up.', 'A cute dog logo.', 'The token is strictly required to pay for computational power or services on the network.'], correctAnswer: 'The token is strictly required to pay for computational power or services on the network.'
    },
    { id: 'b21', type: 'concept', title: 'Burn Mechanisms', content: 'Some projects permanently destroy (Burn) a portion of their tokens. This reduces the Total Supply over time, creating deflation.'
    },
    { id: 'b22', type: 'insight', title: 'Supply vs Demand', content: 'If demand stays the exact same, but the supply is constantly being burned and reduced, the price of the remaining tokens will mathematically go up.'
    },
    { id: 'b23', type: 'concept', title: 'Staking Mechanics', content: 'Projects incentivize users to lock up (Stake) their tokens in exchange for rewards. This temporarily removes circulating supply from the market, reducing selling pressure.'
    },
    { id: 'b24', type: 'warning', title: 'The Staking Illusion', content: 'If a project pays you 50% APY to stake, but they are just printing new tokens to pay you, the inflation rate is 50%. Your staking rewards are instantly canceled out by the devaluation of the token.'
    },
    { id: 'b25', type: 'exercise', title: 'Inflationary Staking', content: 'Why is a 1,000% APY Staking reward usually a massive red flag?', options: ['Because it\'s too hard to calculate.', 'Because the project is hyper-inflating the supply to pay the yield, meaning the token price will inevitably crash to zero.', 'Because the government will tax it.'], correctAnswer: 'Because the project is hyper-inflating the supply to pay the yield, meaning the token price will inevitably crash to zero.'
    },
    { id: 'b26', type: 'concept', title: 'Vesting Schedules', content: 'To prevent founders from dumping their coins on day 1, their tokens are "Vested". This means they are locked in a smart contract and slowly released over 2-4 years.'
    },
    { id: 'b27', type: 'insight', title: 'The Vesting Cliff', content: 'A "Cliff" is a date when a massive chunk of tokens suddenly unlocks. Smart traders track these dates, because a massive cliff unlock usually triggers a massive sell-off.'
    },
    { id: 'b28', type: 'concept', title: 'The Fair Launch', content: 'Bitcoin had a "Fair Launch". There was no pre-mine, no VC allocation, and no CEO. Anyone could mine it from Day 1. It is almost impossible to replicate this today.'
    },
    { id: 'b29', type: 'concept', title: 'Summary', content: 'Tokenomics is the study of Supply and Demand. If a token has infinite inflation and no utility, it will go to zero. If it is scarce, deflationary, and has high utility, it will grow.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Tokenomics in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You find a new crypto gaming token. It costs $0.10. The Market Cap is only $1 Million. But you read the whitepaper and realize the Maximum Supply is 100 Billion tokens, and 90% of them unlock next month.",
        startingBalance: 1000,
        choices: [
          { text: "Buy $1,000 worth. It's so cheap at $0.10, it could easily go to $10!", result: -950, feedback: "You fell for the Unit Bias trap. For this token to hit $10, its Fully Diluted Valuation would have to be $1 Trillion. Next month, the massive supply unlocked, diluting the market. Your investment crashed 95%." },
          { text: "Avoid the token completely. The FDV is absurdly high and the unlock schedule is toxic.", result: 0, feedback: "Excellent risk management. You realized the current $1M Market Cap was a manipulated illusion caused by a tiny circulating supply. You avoided a guaranteed rug pull." },
          { text: "Short the token, betting it will crash next month.", result: 1500, feedback: "Pro move. You identified a toxic tokenomics structure. When the massive VC supply unlocked next month, they dumped their bags exactly as you predicted. You made a massive profit." }
        ]
      }
    }
  ]
};
