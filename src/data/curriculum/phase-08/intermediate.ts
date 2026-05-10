import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p8-intermediate',
  title: 'Advanced DeFi Mechanics & MEV',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Anatomy of a DEX', content: 'In a traditional exchange, buyers and sellers place orders in an "Order Book". A Decentralized Exchange (DEX) uses an Automated Market Maker (AMM) with Liquidity Pools.'
    },
    { id: 'i2', type: 'insight', title: 'Constant Product Formula', content: 'The AMM prices assets using the formula x * y = k. (Quantity of Token A) * (Quantity of Token B) = Constant. As you drain Token A from the pool, its price mathematically approaches infinity to prevent the pool from ever emptying.'
    },
    { id: 'i3', type: 'example', title: 'Slippage', content: 'If you try to buy $100,000 of a token from a Liquidity Pool that only holds $200,000 total, you will suffer massive slippage. The formula will drastically spike the price you pay on the last tokens you buy compared to the first.'
    },
    { id: 'i4', type: 'exercise', title: 'AMM Pricing', content: 'Why does an AMM cause "Slippage" on large trades?', options: ['Because the blockchain is slow.', 'Because the x*y=k formula exponentially increases the price of an asset as its quantity in the pool decreases.', 'Because the miners steal the difference.'], correctAnswer: 'Because the x*y=k formula exponentially increases the price of an asset as its quantity in the pool decreases.'
    },
    { id: 'i5', type: 'concept', title: 'Flash Loans', content: 'A Flash Loan allows you to borrow millions of dollars with ZERO collateral, as long as you repay the loan within the exact same blockchain transaction (which takes 12 seconds).'
    },
    { id: 'i6', type: 'insight', title: 'The Ultimate Arbitrage', content: 'You borrow $10M from Protocol A. You use it to buy a token cheap on DEX B, and instantly sell it high on DEX C for $10.1M. You repay the $10M to Protocol A, and keep the $100k profit. All in one block. If the trade fails, the transaction reverts as if it never happened.'
    },
    { id: 'i7', type: 'warning', title: 'Flash Loan Attacks', content: 'Hackers use Flash Loans to manipulate the price of thinly-traded tokens, draining millions from poorly coded protocols without risking a single dollar of their own money.'
    },
    { id: 'i8', type: 'exercise', title: 'Flash Loan Mechanics', content: 'What is the absolute requirement for a Flash Loan to be successful?', options: ['You must have a high credit score.', 'The loan must be borrowed and fully repaid within the exact same transaction block.', 'You must put up 100% collateral.'], correctAnswer: 'The loan must be borrowed and fully repaid within the exact same transaction block.'
    },
    { id: 'i9', type: 'concept', title: 'MEV (Maximal Extractable Value)', content: 'When you submit a transaction, it sits in a public waiting room called the "Mempool" before a miner seals it into a block. Miners can reorder transactions to extract profit.'
    },
    { id: 'i10', type: 'insight', title: 'The Sandwich Attack', content: 'You submit a large buy order. An MEV bot sees it in the Mempool. The bot pays the miner a higher fee to place the bot\'s buy order BEFORE yours, and a sell order AFTER yours. The bot front-runs you, you push the price up for them, and they dump it on you.'
    },
    { id: 'i11', type: 'concept', title: 'Flashbots & Private RPCs', content: 'To protect yourself from Sandwich Attacks, professionals use Private RPC endpoints (like Flashbots). Your transaction bypasses the public Mempool and goes directly to a trusted miner.'
    },
    { id: 'i12', type: 'exercise', title: 'MEV Protection', content: 'How do you protect your trades from MEV Sandwich Attacks?', options: ['By complaining to the SEC.', 'By using a Private RPC endpoint (Flashbots) to hide your transaction from the public Mempool.', 'By trading on a Sunday.'], correctAnswer: 'By using a Private RPC endpoint (Flashbots) to hide your transaction from the public Mempool.'
    },
    { id: 'i13', type: 'concept', title: 'Impermanent Loss (Deep Dive)', content: 'When you provide liquidity (LP) to a pool containing ETH and USDC, you are essentially shorting volatility. You want the price of ETH to stay exactly the same.'
    },
    { id: 'i14', type: 'insight', title: 'The Math of IL', content: 'If ETH goes up 100%, the AMM automatically sells your ETH for USDC to balance the pool. You end up with way less ETH than you started with. Compared to just holding the ETH in your wallet, you suffered a "loss".'
    },
    { id: 'i15', type: 'warning', title: 'The APY Trap', content: 'A protocol offers 200% APY to provide liquidity for a volatile new token. The token crashes 90%. Your Impermanent Loss completely wipes out the 200% APY you earned from fees.'
    },
    { id: 'i16', type: 'concept', title: 'Concentrated Liquidity (Uniswap V3)', content: 'In older DEXs, your liquidity was spread infinitely from $0 to $Infinity. In V3, you choose a specific price range (e.g., $1000 to $1200) to provide liquidity.'
    },
    { id: 'i17', type: 'insight', title: 'Capital Efficiency', content: 'By concentrating your liquidity in a tight range where the trading actually happens, you earn 100x more fees than traditional LPs. But if the price exits your range, you earn absolutely nothing and suffer massive Impermanent Loss.'
    },
    { id: 'i18', type: 'exercise', title: 'Concentrated Liquidity', content: 'What is the main advantage of Uniswap V3 Concentrated Liquidity?', options: ['It has zero risk.', 'It provides massive capital efficiency and higher fees by allowing you to deploy capital only within a specific price range.', 'It uses fiat currency.'], correctAnswer: 'It provides massive capital efficiency and higher fees by allowing you to deploy capital only within a specific price range.'
    },
    { id: 'i19', type: 'concept', title: 'Liquid Staking Derivatives (LSDs)', content: 'If you stake your ETH to secure the network, it is locked up. You can\'t use it in DeFi. Protocols like Lido solve this by giving you a receipt token (stETH) when you deposit ETH.'
    },
    { id: 'i20', type: 'insight', title: 'Double Dipping', content: 'stETH automatically earns staking yield (e.g., 4%). But because it is a liquid token, you can take that stETH, deposit it into Aave, and borrow against it to yield farm elsewhere. You earn yield on top of yield.'
    },
    { id: 'i21', type: 'warning', title: 'The De-Peg Risk', content: 'stETH is supposed to trade 1:1 with ETH. But during a market panic, if everyone rushes to sell their stETH for real ETH, the liquidity pools drain and the asset "de-pegs". If you borrowed against it, you get liquidated.'
    },
    { id: 'i22', type: 'concept', title: 'Oracles & Chainlink', content: 'Smart contracts are blind. They cannot see the price of Apple stock or Bitcoin. An Oracle (like Chainlink) is a decentralized network that pulls real-world data and feeds it into the blockchain.'
    },
    { id: 'i23', type: 'insight', title: 'The Oracle Exploit', content: 'If a lending protocol uses a single, centralized exchange to check the price of a token, a hacker can manipulate the price on that exchange with a Flash Loan, trick the protocol into thinking the token is worth $1M, and drain all the funds.'
    },
    { id: 'i24', type: 'exercise', title: 'Oracle Vulnerability', content: 'Why do DeFi protocols need decentralized Oracles?', options: ['To speed up transactions.', 'Because smart contracts cannot natively access external real-world data (like price feeds) without an Oracle bridge.', 'To hide transactions.'], correctAnswer: 'Because smart contracts cannot natively access external real-world data (like price feeds) without an Oracle bridge.'
    },
    { id: 'i25', type: 'concept', title: 'Bridging Risk', content: 'Moving assets from Ethereum to Solana requires a Bridge. The Bridge locks your ETH in a smart contract and mints a synthetic "Wrapped ETH" on Solana.'
    },
    { id: 'i26', type: 'insight', title: 'The Honeypot', content: 'Bridges hold massive amounts of locked collateral. They are the biggest honeypots in crypto. If a hacker exploits the bridge\'s code on Ethereum and steals the locked ETH, the synthetic Wrapped ETH on Solana instantly becomes worthless.'
    },
    { id: 'i27', type: 'concept', title: 'Smart Contract Audits', content: 'Before using a DeFi protocol, professionals check if the code was audited by a top-tier security firm (like Certik or Trail of Bits).'
    },
    { id: 'i28', type: 'warning', title: 'Audits aren\'t Guarantees', content: 'An audit just means a human read the code. It does not guarantee the code is un-hackable. Billions have been stolen from fully audited protocols.'
    },
    { id: 'i29', type: 'concept', title: 'Summary', content: 'DeFi is an adversarial environment. You are trading in a dark forest filled with MEV bots, hackers, and complex mathematics. Master the mechanics, or become liquidity for those who do.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Slippage and MEV in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "A new meme coin just launched. It only has $50,000 of total liquidity in the Uniswap pool. You want to buy $10,000 worth of the coin immediately.",
        startingBalance: 10000,
        choices: [
          { text: "Submit a market buy with standard slippage (0.5%).", result: 0, feedback: "Transaction Failed. Because your $10k order is 20% of the entire liquidity pool, the AMM formula pushed the price up drastically. Your 0.5% slippage tolerance was hit instantly, and the transaction reverted. You paid gas fees for nothing." },
          { text: "Submit a market buy with massive slippage (30%) to guarantee the fill.", result: -4000, feedback: "You got Sandwiched! An MEV bot saw your massive slippage tolerance in the Mempool, bought the coin before you, let your $10k order push the price up 30%, and dumped it on you. You lost $4,000 to the bot." },
          { text: "Use a Flashbots RPC to hide the transaction, and buy in small $1,000 increments.", result: 5000, feedback: "Pro execution. By hiding from the Mempool, you avoided the MEV bots. By chunking your orders, you minimized the AMM price impact. You secured the bag and the coin pumped." }
        ]
      }
    }
  ]
};
