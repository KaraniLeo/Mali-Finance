import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p7-intermediate',
  title: 'Ethereum & Smart Contracts',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'Beyond Digital Gold', content: 'Bitcoin is amazing at being "Digital Gold", but its programming language is intentionally simple and rigid to maximize security. You cannot build complex applications on top of Bitcoin.'
    },
    { id: 'i2', type: 'insight', title: 'The Birth of Ethereum', content: 'In 2015, Vitalik Buterin launched Ethereum. Ethereum is a blockchain just like Bitcoin, but with a Turing-complete programming language built in. It is essentially a decentralized world computer.'
    },
    { id: 'i3', type: 'concept', title: 'Smart Contracts', content: 'A Smart Contract is just a piece of code that lives on the Ethereum blockchain. It executes automatically when certain conditions are met, with no human middleman.'
    },
    { id: 'i4', type: 'example', title: 'The Vending Machine', content: 'A vending machine is a primitive smart contract. Condition: IF $2 is inserted AND button A1 is pressed, THEN release a soda. Smart contracts do this for millions of dollars of financial transactions.'
    },
    { id: 'i5', type: 'exercise', title: 'Smart Contract Logic', content: 'What is the main benefit of a Smart Contract?', options: ['It requires a lawyer to execute.', 'It executes automatically and trustlessly based on code, removing the need for an expensive middleman or escrow agent.', 'It hides your identity.'], correctAnswer: 'It executes automatically and trustlessly based on code, removing the need for an expensive middleman or escrow agent.'
    },
    { id: 'i6', type: 'concept', title: 'Ether (ETH)', content: 'To run a Smart Contract on the Ethereum network, you have to pay the network for the computational power. You pay this fee using Ethereum\'s native currency, called Ether (ETH).'
    },
    { id: 'i7', type: 'insight', title: 'Gas Fees', content: 'This fee is called "Gas". If the Ethereum network is highly congested (everyone is trying to use it at once), Gas prices skyrocket. A simple transaction might cost $50 in Gas fees.'
    },
    { id: 'i8', type: 'concept', title: 'Proof of Work vs Proof of Stake', content: 'Bitcoin uses Proof of Work (Miners burning electricity). Ethereum originally used PoW, but upgraded to Proof of Stake (PoS) in 2022 to reduce energy consumption by 99%.'
    },
    { id: 'i9', type: 'insight', title: 'How Proof of Stake Works', content: 'Instead of buying massive computers to secure the network, "Validators" lock up (Stake) their own ETH as collateral. If they validate fraudulent blocks, their staked ETH is destroyed (slashed).'
    },
    { id: 'i10', type: 'exercise', title: 'Consensus Mechanisms', content: 'Which consensus mechanism relies on users locking up their own currency as collateral to secure the network?', options: ['Proof of Work (PoW)', 'Proof of Stake (PoS)', 'Proof of History (PoH)'], correctAnswer: 'Proof of Stake (PoS)'
    },
    { id: 'i11', type: 'concept', title: 'Decentralized Applications (dApps)', content: 'Because Ethereum can run code, developers build dApps. These look like normal websites (like a banking app), but the backend runs entirely on Smart Contracts on the blockchain instead of AWS servers.'
    },
    { id: 'i12', type: 'example', title: 'Uniswap', content: 'Uniswap is a decentralized exchange (dApp). There is no company, no CEO, and no order book. It is just a massive smart contract that allows anyone to swap tokens instantly using an algorithm.'
    },
    { id: 'i13', type: 'concept', title: 'Tokens vs Coins', content: 'A "Coin" (like BTC or ETH) has its own blockchain. A "Token" is created ON TOP of an existing blockchain (usually Ethereum) using a smart contract.'
    },
    { id: 'i14', type: 'insight', title: 'ERC-20 Tokens', content: 'ERC-20 is the standard code template for creating a token on Ethereum. Anyone can copy/paste this code and launch their own cryptocurrency in 5 minutes. This is why there are 20,000+ scam coins.'
    },
    { id: 'i15', type: 'exercise', title: 'Token Logic', content: 'Is Shiba Inu (SHIB) a Coin or a Token?', options: ['It is a Coin because it has its own blockchain.', 'It is a Token because it was built using a smart contract on the Ethereum blockchain.', 'It is fiat currency.'], correctAnswer: 'It is a Token because it was built using a smart contract on the Ethereum blockchain.'
    },
    { id: 'i16', type: 'concept', title: 'Stablecoins', content: 'Cryptocurrency is too volatile for everyday commerce. Stablecoins are tokens pegged 1:1 to a fiat currency (like the US Dollar). USDC and USDT are the most popular.'
    },
    { id: 'i17', type: 'example', title: 'The Stablecoin Mechanism', content: 'For every 1 USDC token minted on the blockchain, the company (Circle) holds exactly $1 US Dollar in a real {{INTERNATIONAL:bank account|KENYA:bank account or M-PESA wallet}}. This bridges the legacy financial system with the blockchain.'
    },
    { id: 'i18', type: 'warning', title: 'Algorithmic Stablecoins', content: 'Some stablecoins (like Terra LUNA) were NOT backed by real dollars, but by a complex algorithm. When the algorithm failed, the "stablecoin" crashed to $0, wiping out billions.'
    },
    { id: 'i19', type: 'exercise', title: 'Stablecoin Safety', content: 'Which type of stablecoin is generally considered the safest?', options: ['Algorithmic stablecoins backed by code.', 'Fiat-collateralized stablecoins (backed 1:1 by real dollars in an audited bank).', 'Meme stablecoins.'], correctAnswer: 'Fiat-collateralized stablecoins (backed 1:1 by real dollars in an audited bank).'
    },
    { id: 'i20', type: 'concept', title: 'Layer 2 Scaling (L2s)', content: 'Ethereum is slow (15 transactions per second) and expensive. Layer 2 networks (like Arbitrum or Optimism) are built ON TOP of Ethereum to solve this.'
    },
    { id: 'i21', type: 'insight', title: 'The Rollup', content: 'L2s bundle thousands of transactions together off-chain, process them instantly for pennies, and then submit a single cryptographic receipt back to the main Ethereum chain. It scales Ethereum infinitely.'
    },
    { id: 'i22', type: 'concept', title: 'Oracles', content: 'Smart contracts cannot access data outside the blockchain (they don\'t know what the weather is or what the price of Apple stock is). Oracles (like Chainlink) act as a secure bridge, feeding real-world data into the blockchain.'
    },
    { id: 'i23', type: 'warning', title: 'The Oracle Problem', content: 'If the Oracle feeds bad data to the Smart Contract (e.g., says Bitcoin is $1 instead of $60k), the Smart Contract will execute based on the bad data, potentially draining millions of dollars.'
    },
    { id: 'i24', type: 'concept', title: 'Ethereum (ETH) as Ultra-Sound Money', content: 'Since Ethereum upgraded, every time someone pays a Gas fee, a portion of that ETH is permanently destroyed (Burned).'
    },
    { id: 'i25', type: 'insight', title: 'Deflationary Asset', content: 'If the network is heavily used, more ETH is burned than created. This makes ETH mathematically deflationary, increasing the value of all remaining ETH over time.'
    },
    { id: 'i26', type: 'exercise', title: 'The ETH Burn', content: 'What happens to the ETH supply during periods of massive network congestion?', options: ['The supply inflates rapidly.', 'A portion of the gas fees are burned, potentially making the total supply of ETH decrease.', 'The Central Bank prints more.'], correctAnswer: 'A portion of the gas fees are burned, potentially making the total supply of ETH decrease.'
    },
    { id: 'i27', type: 'concept', title: 'The Trilemma', content: 'The Blockchain Trilemma states you can only optimize for 2 out of 3 features: Decentralization, Security, and Scalability. Ethereum chose Decentralization and Security, sacrificing Scalability (which L2s now fix).'
    },
    { id: 'i28', type: 'warning', title: 'Smart Contract Risk', content: 'Code is law. If a developer makes a typo in a smart contract, hackers can exploit it and drain all the money. There are no refunds in crypto.'
    },
    { id: 'i29', type: 'insight', title: 'The Future of Finance', content: 'Ethereum is attempting to rebuild the entire global financial system—lending, borrowing, trading, and insurance—entirely on open-source, trustless code.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Gas Fees and L2s in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You want to swap $50 worth of USDC for a new gaming token. The Ethereum network is heavily congested because of a massive NFT mint.",
        startingBalance: 50,
        choices: [
          { text: "Execute the swap directly on the Ethereum mainnet (Layer 1).", result: -45, feedback: "Because of the congestion, the Gas fee alone was $45! You spent $45 to swap $5. You now only have $5 worth of the token." },
          { text: "Bridge your funds to an Ethereum Layer 2 (like Arbitrum) and execute the swap there.", result: 5, feedback: "Smart move. The bridge cost a small fee, but the swap on the L2 only cost $0.05. You successfully acquired the token while retaining almost all your capital." },
          { text: "Wait until 3:00 AM when the network congestion dies down, then swap on Layer 1.", result: -10, feedback: "A decent strategy. Gas fees fluctuate based on demand. By waiting for off-peak hours, the fee dropped to $10. Not as efficient as an L2, but better than paying $45." }
        ]
      }
    }
  ]
};
