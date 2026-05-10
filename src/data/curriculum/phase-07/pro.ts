import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p7-pro',
  title: 'Consensus & Institutional Architecture',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Byzantine Generals Problem', content: 'Bitcoin\'s greatest achievement was solving the Byzantine Generals Problem: How do independent, untrusted nodes in a network reach a perfectly synchronized consensus without a central leader?'
    },
    { id: 'p2', type: 'insight', title: 'The 51% Attack', content: 'The only way to hack the Bitcoin network is to control 51% of the global computational mining power. If you control 51%, you can rewrite the ledger and double-spend coins.'
    },
    { id: 'p3', type: 'example', title: 'Economic Impracticality', content: 'To launch a 51% attack on Bitcoin today would require buying tens of billions of dollars worth of supercomputers and entire power plants. The cost to attack the network is vastly higher than the reward you could steal. The math protects the network.'
    },
    { id: 'p4', type: 'exercise', title: 'The Ultimate Hack', content: 'How could someone theoretically hack the Bitcoin blockchain?', options: ['By guessing Satoshi Nakamoto\'s password.', 'By physically acquiring and coordinating 51% of the entire global mining hash rate.', 'By shutting off the internet in the United States.'], correctAnswer: 'By physically acquiring and coordinating 51% of the entire global mining hash rate.'
    },
    { id: 'p5', type: 'concept', title: 'UTXO Model (Bitcoin)', content: 'Bitcoin does not use account balances like a bank. It uses Unspent Transaction Outputs (UTXOs). Think of them like digital cash bills.'
    },
    { id: 'p6', type: 'insight', title: 'Change Addresses', content: 'If you have a 10 BTC UTXO, and you want to send 2 BTC, the network destroys the 10 BTC UTXO, sends 2 BTC to the receiver, and generates an 8 BTC UTXO to send back to you as "change".'
    },
    { id: 'p7', type: 'concept', title: 'Account Model (Ethereum)', content: 'Ethereum does NOT use UTXOs. It uses an Account Model (like a standard bank). It just tracks that Address A has 10 ETH, and if they send 2 ETH, the balance updates to 8 ETH. This allows for complex smart contracts.'
    },
    { id: 'p8', type: 'concept', title: 'Zero-Knowledge Proofs (ZK-Rollups)', content: 'The bleeding edge of cryptography. A ZK-Proof allows one party to prove to another that a statement is true, without revealing ANY information beyond the validity of the statement.'
    },
    { id: 'p9', type: 'example', title: 'The ZK Analogy', content: 'Imagine proving to a bouncer that you are over 21, but without showing him your ID, your birthday, your face, or your name. He just mathematically knows you are over 21. That is a ZK-Proof.'
    },
    { id: 'p10', type: 'insight', title: 'ZK Scaling', content: 'ZK-Rollups use this math to bundle 10,000 Ethereum transactions into a tiny cryptographic proof. It scales the network exponentially while maintaining absolute privacy and security.'
    },
    { id: 'p11', type: 'exercise', title: 'Cryptography', content: 'What technology allows a network to verify thousands of transactions are valid without actually processing all the raw data?', options: ['Zero-Knowledge Proofs (ZK-Rollups)', 'Proof of Work', 'The UTXO Model'], correctAnswer: 'Zero-Knowledge Proofs (ZK-Rollups)'
    },
    { id: 'p12', type: 'concept', title: 'MEV (Maximal Extractable Value)', content: 'Miners (or Validators) choose which transactions go into a block. Because they see the orders before they are sealed, they can front-run your trade to extract hidden profit. This is MEV.'
    },
    { id: 'p13', type: 'warning', title: 'The Sandwich Attack', content: 'You try to buy $100k of a token. An MEV bot sees your order in the "Mempool", bribes the miner to put their buy order BEFORE yours, and their sell order AFTER yours. They artificially inflate the price, you buy it higher, and they instantly dump it on you.'
    },
    { id: 'p14', type: 'concept', title: 'Flashbots', content: 'Developers created Flashbots to mitigate MEV. It creates a private communication channel between traders and miners, preventing the public Mempool from being manipulated by Sandwich bots.'
    },
    { id: 'p15', type: 'concept', title: 'Interoperability (Bridges)', content: 'Blockchains are walled gardens. Bitcoin cannot talk to Ethereum. Bridges are smart contracts that lock your asset on Chain A, and mint a synthetic version of it on Chain B.'
    },
    { id: 'p16', type: 'warning', title: 'The Bridge Vulnerability', content: 'Bridges are the most hacked technology in crypto. If a hacker exploits the smart contract on the bridge and steals the locked collateral, the synthetic tokens on the other chain instantly go to $0.'
    },
    { id: 'p17', type: 'exercise', title: 'Security Hotspots', content: 'Where do the largest multi-million dollar hacks in crypto usually occur?', options: ['Hacking the core Bitcoin network.', 'Exploiting cross-chain Bridges that hold massive honeypots of locked collateral.', 'Guessing seed phrases.'], correctAnswer: 'Exploiting cross-chain Bridges that hold massive honeypots of locked collateral.'
    },
    { id: 'p18', type: 'concept', title: 'EVM (Ethereum Virtual Machine)', content: 'The EVM is the software environment where all Ethereum smart contracts live. It is the operating system of Web3.'
    },
    { id: 'p19', type: 'insight', title: 'EVM Compatibility', content: 'Many rival blockchains (Avalanche, Binance Smart Chain, Polygon) are "EVM Compatible". This means a developer can copy/paste their Ethereum code directly onto the rival chain without rewriting it.'
    },
    { id: 'p20', type: 'concept', title: 'Institutional Custody', content: 'Wall Street banks cannot legally hold Bitcoin on a ledger Nano. They use Multi-Party Computation (MPC). The private key is shattered into multiple shards and distributed across global servers. It requires a quorum of executives to piece it together and move funds.'
    },
    { id: 'p21', type: 'concept', title: 'Tokenization of Real World Assets (RWAs)', content: 'The ultimate endgame of blockchain. Taking real-world assets (Real Estate, Treasury Bonds, Private Equity) and turning them into tokens on the blockchain.'
    },
    { id: 'p22', type: 'example', title: 'Fractional Real Estate', content: 'A $100 Million skyscraper is tokenized into 100 million tokens. You can buy $1 worth of the skyscraper, and the smart contract automatically sends you your $0.05 fraction of the rent yield every month.'
    },
    { id: 'p23', type: 'insight', title: 'Liquidity Injection', content: 'RWAs take completely illiquid assets (like a skyscraper) and make them tradeable 24/7 on a global, permissionless market.'
    },
    { id: 'p24', type: 'exercise', title: 'The RWA Endgame', content: 'What is the primary benefit of Tokenizing Real World Assets?', options: ['It makes them immune to taxes.', 'It provides massive fractional liquidity and 24/7 global settlement to traditionally illiquid assets.', 'It removes the need for maintenance.'], correctAnswer: 'It provides massive fractional liquidity and 24/7 global settlement to traditionally illiquid assets.'
    },
    { id: 'p25', type: 'concept', title: 'Governance Tokens', content: 'Decentralized protocols are ruled by Decentralized Autonomous Organizations (DAOs). If you hold a Governance token, you get voting rights on how the protocol upgrades its code or spends its treasury.'
    },
    { id: 'p26', type: 'warning', title: 'The Governance Illusion', content: 'Most DAOs are not actually decentralized. The Venture Capitalists who funded the project own 40% of the tokens, meaning their vote always wins. It is an illusion of democracy.'
    },
    { id: 'p27', type: 'concept', title: 'Self-Sovereign Identity', content: 'In Web2, Google and Facebook own your identity data. In Web3, your wallet is your identity. You own your data cryptographically, and you can revoke access at any time.'
    },
    { id: 'p28', type: 'insight', title: 'The Paradigm Shift', content: 'Web1 was Read. Web2 was Read/Write. Web3 is Read/Write/Own. For the first time in history, you can natively own a piece of the internet without relying on a corporation.'
    },
    { id: 'p29', type: 'concept', title: 'The Pro Edge', content: 'Amateurs buy dog coins hoping for a 100x. Pros study network effects, developer activity, MEV protection, and tokenomics. They invest in the infrastructure of the new internet.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of MEV and network architecture in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You spot a massive arbitrage opportunity on an obscure decentralized exchange. You are about to buy $50,000 worth of a token. You know MEV bots are scanning the Mempool.",
        startingBalance: 50000,
        choices: [
          { text: "Submit the transaction normally with a high slippage tolerance so it guarantees a fill.", result: -5000, feedback: "You got Sandwiched! An MEV bot saw your massive order, front-ran you, spiked the price, and dumped it on you. You lost 10% of your capital instantly." },
          { text: "Route your transaction through a private RPC endpoint (like Flashbots) to bypass the public Mempool.", result: 2000, feedback: "Pro move. By hiding your transaction from the public Mempool, the MEV bots couldn't see it. Your transaction executed perfectly, capturing the arbitrage profit." },
          { text: "Wait 10 minutes to see if the price drops.", result: 0, feedback: "Another trader saw the arbitrage and took it. You missed the opportunity entirely, but kept your capital safe." }
        ]
      }
    }
  ]
};
