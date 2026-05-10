import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p9-intermediate',
  title: 'Liquidity & Emission Schedules',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Initial Coin Offering (ICO)', content: 'An ICO is how projects used to raise money. They would sell their new token to the public for ETH before the project even launched. It was essentially an unregulated IPO.'
    },
    { id: 'i2', type: 'insight', title: 'The Regulatory Crackdown', content: 'The SEC cracked down on ICOs, classifying most of them as illegal unregistered securities. Today, projects raise money privately from Venture Capitalists, and then "Airdrop" the tokens to early users to avoid regulatory heat.'
    },
    { id: 'i3', type: 'concept', title: 'The Airdrop', content: 'An Airdrop is when a protocol distributes free tokens directly to the wallets of users who interacted with their platform early on. It is a marketing tactic to decentralize the network and reward early adopters.'
    },
    { id: 'i4', type: 'warning', title: 'The Sybil Attack', content: 'Because Airdrops are so lucrative, "Sybil Attackers" write scripts to control thousands of fake wallets, interacting with the protocol to farm massive amounts of free tokens, which they immediately dump on launch.'
    },
    { id: 'i5', type: 'exercise', title: 'Token Distribution', content: 'What is a Crypto Airdrop?', options: ['Airdropping physical cash from a plane.', 'A method of distributing free tokens to early users to decentralize ownership and bypass ICO regulations.', 'A virus.'], correctAnswer: 'A method of distributing free tokens to early users to decentralize ownership and bypass ICO regulations.'
    },
    { id: 'i6', type: 'concept', title: 'Emission Schedules', content: 'Almost no project unlocks 100% of its tokens on Day 1. The Emission Schedule dictates exactly how many new tokens enter circulating supply every single day.'
    },
    { id: 'i7', type: 'insight', title: 'Inflation vs Price', content: 'If a token has an inflation rate of 50% per year (due to emissions), the project must attract 50% MORE fiat capital every single year just to keep the price exactly the same. High emissions are a gravity well on price.'
    },
    { id: 'i8', type: 'example', title: 'The Bitcoin Emission Model', content: 'Bitcoin\'s emission schedule is hard-coded. It emits new coins every 10 minutes, but cuts that amount in half every 4 years (The Halving). It is the most predictable monetary policy in human history.'
    },
    { id: 'i9', type: 'exercise', title: 'Emission Gravity', content: 'If a project has massive daily token emissions, what must happen for the price to stay flat?', options: ['The devs must pause the blockchain.', 'New buyers must inject massive amounts of fresh capital every day just to absorb the inflation.', 'The price will automatically go up.'], correctAnswer: 'New buyers must inject massive amounts of fresh capital every day just to absorb the inflation.'
    },
    { id: 'i10', type: 'concept', title: 'Token Sinks', content: 'A "Sink" is a mechanism designed to permanently remove tokens from circulating supply, offsetting emissions.'
    },
    { id: 'i11', type: 'example', title: 'Burning as a Sink', content: 'Binance (BNB) uses 20% of its quarterly exchange profits to buy back BNB tokens from the open market and burn them. This is a massive sink that creates constant buy pressure.'
    },
    { id: 'i12', type: 'concept', title: 'Locking as a Sink', content: 'Curve Finance requires users to lock their CRV tokens for 4 years to get maximum voting power (veCRV). By locking the tokens, they are temporarily removed from circulating supply, acting as a sink.'
    },
    { id: 'i13', type: 'warning', title: 'The Velocity Problem', content: 'If a token has no sink, users will buy it to pay a fee, and the protocol will immediately sell it to pay server costs. The token changes hands instantly (High Velocity) and never accumulates value.'
    },
    { id: 'i14', type: 'exercise', title: 'Token Utility', content: 'What is the purpose of a Token Sink?', options: ['To wash the tokens.', 'To permanently or temporarily remove tokens from circulation, reducing supply and offsetting inflation.', 'To increase gas fees.'], correctAnswer: 'To permanently or temporarily remove tokens from circulation, reducing supply and offsetting inflation.'
    },
    { id: 'i15', type: 'concept', title: 'Liquidity Depth', content: 'Liquidity is the amount of money available in a trading pool. If a token has a $100M Market Cap, but only $50k in liquidity, it is highly illiquid and dangerous.'
    },
    { id: 'i16', type: 'insight', title: 'The Slippage Trap', content: 'With low liquidity, if you try to sell $10k of that token, your order will drain the pool and crash the price by 50% instantly. You will only get $5k back.'
    },
    { id: 'i17', type: 'example', title: 'Protocol Owned Liquidity (POL)', content: 'Instead of renting liquidity from users (by paying them high APYs), some protocols (like Olympus DAO) pioneered buying and owning their own liquidity pools outright. This ensures the liquidity can never flee.'
    },
    { id: 'i18', type: 'exercise', title: 'Liquidity Mechanics', content: 'Why is massive Liquidity Depth important for a token?', options: ['It makes the logo look better.', 'It allows whales and institutions to buy and sell massive amounts without causing violent price crashes (slippage).', 'It reduces the total supply.'], correctAnswer: 'It allows whales and institutions to buy and sell massive amounts without causing violent price crashes (slippage).'
    },
    { id: 'i19', type: 'concept', title: 'Initial DEX Offering (IDO)', content: 'Instead of raising money privately, a project launches directly on a Decentralized Exchange (Uniswap) by creating a liquidity pool and letting the free market decide the price.'
    },
    { id: 'i20', type: 'warning', title: 'The Sniper Bot', content: 'When an IDO launches, MEV Sniper Bots buy up 50% of the supply in the very first block (in milliseconds). When retail traders buy in minute 2, they push the price up, and the bots instantly dump on them.'
    },
    { id: 'i21', type: 'concept', title: 'Vesting Overhang', content: 'When evaluating a token, you must look at the "Overhang"—the amount of tokens held by VCs that are about to unlock. A massive overhang acts as an invisible ceiling on the price, because every time the price goes up, VCs sell.'
    },
    { id: 'i22', type: 'insight', title: 'The Float', content: 'The "Float" is the percentage of total tokens actively trading. A low float / high FDV token is easily manipulated by market makers because there are very few tokens actually available to buy.'
    },
    { id: 'i23', type: 'exercise', title: 'Vesting Dynamics', content: 'What happens to a token\'s price if it has a massive "Vesting Overhang" unlocking next week?', options: ['The price usually pumps.', 'The price usually drops or hits a ceiling due to the immense selling pressure from early investors cashing out.', 'Nothing happens.'], correctAnswer: 'The price usually drops or hits a ceiling due to the immense selling pressure from early investors cashing out.'
    },
    { id: 'i24', type: 'concept', title: 'The Dual Token Model', content: 'Many crypto games (like Axie Infinity) use two tokens. Token A is the Governance token (fixed supply). Token B is the In-Game Reward token (infinite supply).'
    },
    { id: 'i25', type: 'warning', title: 'The Death Spiral of Play-to-Earn', content: 'If the game prints infinite Reward Tokens to pay players, the token will inevitably hyper-inflate and crash to zero. Once the rewards are worthless, players leave, and the entire economy collapses.'
    },
    { id: 'i26', type: 'concept', title: 'Value Accrual', content: 'How does the protocol generate value, and does that value flow to the token holders? If a DEX makes $1B in fees, but 100% of those fees go to the founders, the Governance token is worthless.'
    },
    { id: 'i27', type: 'insight', title: 'Fee Switches', content: 'Many protocols have a "Fee Switch" hard-coded in their smart contracts. It is currently turned off to avoid SEC regulation, but if turned on, it would instantly route millions in protocol revenue to token holders.'
    },
    { id: 'i28', type: 'exercise', title: 'Value Accrual Logic', content: 'Why might a Governance token be considered worthless by fundamentals?', options: ['Because it has no utility.', 'Because the protocol generates massive revenue, but none of that revenue accrues to the token holders.', 'Because it is on Ethereum.'], correctAnswer: 'Because the protocol generates massive revenue, but none of that revenue accrues to the token holders.'
    },
    { id: 'i29', type: 'concept', title: 'Summary', content: 'Tokenomics is not magic. It is just math. Track the emissions, locate the sinks, analyze the liquidity depth, and verify value accrual. If the math doesn\'t make sense, it\'s a scam.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Token Sinks and Value Accrual in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You are analyzing a new decentralized exchange. They generate $500k a day in trading fees. They have a Governance Token, but right now, 100% of the trading fees go to the Liquidity Providers. The token just lets you vote on minor UI changes.",
        startingBalance: 25000,
        choices: [
          { text: "Buy the token because the exchange makes massive revenue.", result: -20000, feedback: "You bought a useless token! The exchange makes revenue, but absolutely ZERO of that value accrues to the token. You just bought a glorified voting ticket. The token price bled to death." },
          { text: "Provide liquidity to the exchange instead of buying the token.", result: 5000, feedback: "Smart move. You realized the Liquidity Providers were capturing 100% of the real yield. You deposited USDC and earned a steady, cash-flowing APY while avoiding the useless Governance token." },
          { text: "Short the Governance Token.", result: 15000, feedback: "Pro execution. You realized the Governance token had zero value accrual, zero utility, and high inflation. You shorted it and made a fortune as retail investors slowly realized it was worthless." }
        ]
      }
    }
  ]
};
