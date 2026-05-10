import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p8-pro',
  title: 'DeFi Architecture & Systemic Risk',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Curve Wars', content: 'Curve Finance is a DEX specialized for stablecoins. Because stablecoins shouldn\'t fluctuate, Curve uses a different AMM formula to provide massive liquidity with almost zero slippage.'
    },
    { id: 'p2', type: 'insight', title: 'Bribing for Liquidity', content: 'Curve emits CRV tokens as a reward to Liquidity Providers. But which pools get the most CRV? The ones voted on by the community. Entire protocols bribe CRV holders to vote for their pool to attract liquidity. This is the "Curve War".'
    },
    { id: 'p3', type: 'example', title: 'Convex Finance', content: 'Convex realized they could just buy up all the CRV tokens, permanently lock them, and control the entire voting power of Curve. They monopolized the liquidity engine of DeFi.'
    },
    { id: 'p4', type: 'exercise', title: 'Curve Mechanics', content: 'Why did protocols bribe Curve token holders?', options: ['To hack the protocol.', 'To direct massive CRV token emissions to their own liquidity pools, thereby attracting millions in user deposits.', 'To lower gas fees.'], correctAnswer: 'To direct massive CRV token emissions to their own liquidity pools, thereby attracting millions in user deposits.'
    },
    { id: 'p5', type: 'concept', title: 'Algorithmic Stablecoin Collapse (Terra LUNA)', content: 'UST was a stablecoin pegged to $1, but backed by nothing except an algorithm tied to a volatile coin called LUNA. If UST dropped below $1, the algorithm printed LUNA to buy UST.'
    },
    { id: 'p6', type: 'insight', title: 'The Death Spiral', content: 'When a massive whale dumped UST, it lost its $1 peg. Panic ensued. The algorithm violently hyper-inflated the supply of LUNA trying to save the peg. LUNA went from $100 to $0.000001 in 48 hours. $40 Billion vanished.'
    },
    { id: 'p7', type: 'warning', title: 'Endogenous Collateral', content: 'You cannot back a stablecoin with a volatile asset created by the exact same protocol. That is Endogenous Collateral. It is a mathematical house of cards.'
    },
    { id: 'p8', type: 'concept', title: 'Cross-Chain MEV', content: 'MEV isn\'t just happening on Ethereum anymore. Traders are running complex algorithms to front-run transactions ACROSS different blockchains simultaneously, exploiting the latency between bridges.'
    },
    { id: 'p9', type: 'insight', title: 'The Block Builder Monopoly', content: 'In modern Ethereum (PBS - Proposer/Builder Separation), the people who build the blocks (Builders) are separate from those who propose them to the network. A few massive Builders now control the majority of MEV extraction.'
    },
    { id: 'p10', type: 'exercise', title: 'Algorithmic Failure', content: 'What caused the $40 Billion collapse of Terra LUNA?', options: ['A hack of their bridge.', 'A death spiral caused by backing a stablecoin with an endogenous, hyper-inflationary volatile asset instead of real dollars.', 'The CEO stole the money.'], correctAnswer: 'A death spiral caused by backing a stablecoin with an endogenous, hyper-inflationary volatile asset instead of real dollars.'
    },
    { id: 'p11', type: 'concept', title: 'Delta-Neutral Yield Farming', content: 'Yield farming is risky because the underlying token can crash. Delta-Neutral farming involves taking a Long and Short position simultaneously, canceling out the price risk, but still collecting the massive DeFi yield.'
    },
    { id: 'p12', type: 'example', title: 'The Short-Farm Strategy', content: 'You deposit $10k USDC. You borrow $5k worth of Token X. You sell the Token X for USDC. You now provide USDC/USDC liquidity. You are earning yield, but if Token X crashes, your debt just got cheaper to repay. You neutralized the risk.'
    },
    { id: 'p13', type: 'warning', title: 'Borrowing Rates', content: 'In Delta-Neutral farming, if the interest rate to borrow Token X suddenly spikes higher than your yield, you will bleed money. You must actively monitor the spread.'
    },
    { id: 'p14', type: 'concept', title: 'Smart Contract Upgradeability', content: 'Blockchains are immutable, but developers often use "Proxy Contracts" to allow them to upgrade the code later. This introduces a massive trust vector.'
    },
    { id: 'p15', type: 'insight', title: 'The God Mode Exploit', content: 'If a protocol has a malicious or compromised admin key, the admin can simply "upgrade" the smart contract to a new version that instantly sends all user funds to their own wallet. This is a Rug Pull.'
    },
    { id: 'p16', type: 'exercise', title: 'Contract Security', content: 'Why is a "Proxy Contract" a double-edged sword?', options: ['It uses too much gas.', 'It allows developers to fix bugs, but also allows a compromised admin to maliciously alter the code and steal funds.', 'It makes the code public.'], correctAnswer: 'It allows developers to fix bugs, but also allows a compromised admin to maliciously alter the code and steal funds.'
    },
    { id: 'p17', type: 'concept', title: 'Reentrancy Attacks', content: 'The most famous smart contract hack (The DAO hack of 2016). A malicious contract asks to withdraw funds. Before the protocol updates the user\'s balance to zero, the malicious contract recursively asks to withdraw again, draining the pool.'
    },
    { id: 'p18', type: 'insight', title: 'Checks-Effects-Interactions', content: 'To prevent Reentrancy, developers must strictly order their code: Check the balance first, update the balance to zero (Effects), and ONLY THEN send the money (Interactions).'
    },
    { id: 'p19', type: 'concept', title: 'Vampire Attacks', content: 'Protocol A has massive liquidity. Protocol B launches an exact clone, but offers wildly higher token rewards to users who migrate their liquidity over. They literally suck the lifeblood (liquidity) out of the original protocol.'
    },
    { id: 'p20', type: 'example', title: 'SushiSwap vs Uniswap', content: 'In 2020, SushiSwap launched a Vampire Attack on Uniswap. They stole over $1 Billion in liquidity in a few days by bribing LPs with SUSHI tokens.'
    },
    { id: 'p21', type: 'exercise', title: 'DeFi Warfare', content: 'What is a Vampire Attack?', options: ['A malware virus.', 'When a cloned protocol uses aggressive token incentives to drain the liquidity from a competitor.', 'A tax on trades.'], correctAnswer: 'When a cloned protocol uses aggressive token incentives to drain the liquidity from a competitor.'
    },
    { id: 'p22', type: 'concept', title: 'Liquidity Cascades', content: 'DeFi is highly leveraged. If the price of ETH drops 10%, it triggers a liquidation on Aave. Aave automatically sells that ETH on Uniswap. This drops the price of ETH another 5%, triggering more liquidations on MakerDAO. The cascade destroys the market.'
    },
    { id: 'p23', type: 'warning', title: 'Systemic Contagion', content: 'Because protocols use each other\'s tokens as collateral (Money Legos), a failure in one obscure protocol can infect and collapse the entire ecosystem.'
    },
    { id: 'p24', type: 'concept', title: 'Zero-Knowledge rollups (zkEVM)', content: 'The holy grail of Ethereum scaling. A zkEVM allows developers to run complex DeFi smart contracts entirely off-chain, mathematically prove they executed correctly, and settle them on Ethereum for a fraction of a cent.'
    },
    { id: 'p25', type: 'insight', title: 'The Privacy Era', content: 'Currently, every transaction on Ethereum is public. Your wallet is an open book. ZK technology will eventually allow institutions to trade massive volumes in DeFi with absolute privacy, unlocking Wall Street adoption.'
    },
    { id: 'p26', type: 'concept', title: 'Real-Yield', content: 'The era of protocols printing inflationary tokens to pay fake APYs is over. The "Real Yield" movement focuses on protocols that generate actual cash flow (from trading fees) and distribute it to token holders in USDC.'
    },
    { id: 'p27', type: 'insight', title: 'The P/E Ratio of DeFi', content: 'You can now value a DeFi protocol exactly like a traditional stock. If a DEX generates $10M in fees a year, and the token market cap is $100M, it trades at a 10x Price-to-Earnings ratio.'
    },
    { id: 'p28', type: 'warning', title: 'Regulatory Arbitrage', content: 'DeFi exists in a legal grey area. Governments cannot shut down a smart contract, but they can arrest the developers or sanction the front-end website (e.g., Tornado Cash).'
    },
    { id: 'p29', type: 'concept', title: 'The Apex Predator', content: 'To survive in Pro DeFi, you must understand macroeconomics, smart contract architecture, MEV game theory, and tokenomics. It is the most brutally efficient free market in human history.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of DeFi Systemic Risk in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You are yield farming in a highly complex 'Money Lego' strategy. You deposited ETH into Protocol A to borrow USDC. You deposited the USDC into Protocol B to earn 20% APY. A major exploit is just announced on Protocol B's Twitter.",
        startingBalance: 100000,
        choices: [
          { text: "Wait for the developers to pause the contract and fix the bug.", result: -100000, feedback: "You hesitated. In DeFi, code is law. Hackers drained the entire liquidity pool of Protocol B in 3 minutes. Your USDC is gone. Worse, you still owe the USDC to Protocol A, meaning your ETH collateral is also trapped. Total loss." },
          { text: "Immediately execute an emergency withdrawal from Protocol B, paying the massive $100 gas fee to front-run the panic.", result: 5000, feedback: "Pro execution. You didn't wait for confirmation. You paid a massive gas fee to bribe the miners, ensuring your withdrawal processed BEFORE the hacker drained the pool. You rescued your capital." },
          { text: "Buy Put options on Protocol B's native token.", result: -20000, feedback: "You tried to profit off the hack, but the token price was already crashing. You bought wildly overpriced Puts. Meanwhile, you forgot to withdraw your actual capital, which got stolen in the hack." }
        ]
      }
    }
  ]
};
