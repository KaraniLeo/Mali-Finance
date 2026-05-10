import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p7-beginner',
  title: 'What is Blockchain & Bitcoin?',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'The Problem with Money', content: 'In Phase 2, you learned that Central Banks can print infinite amounts of Fiat money, causing inflation and destroying your purchasing power. \n\nBitcoin was created in 2008 as a direct rebellion against this system.'
    },
    { id: 'b2', type: 'insight', title: 'The Double-Spend Problem', content: 'Digital files (like MP3s or JPEGs) are easy to copy and paste. If digital money was just a file, you could copy/paste it and give the same $10 to two different people. This is the Double-Spend problem.'
    },
    { id: 'b3', type: 'concept', title: 'The Solution: The Ledger', content: 'Banks solve the double-spend problem by keeping a private, central ledger (a spreadsheet). When you send $10, the bank subtracts it from your account and adds it to the other. You have to trust the bank.'
    },
    { id: 'b4', type: 'exercise', title: 'The Trust Issue', content: 'What is the primary vulnerability of a traditional banking ledger?', options: ['It uses too much electricity.', 'It is completely centralized, meaning a single bank or government can freeze your account, alter the data, or inflate the currency.', 'It is too fast.'], correctAnswer: 'It is completely centralized, meaning a single bank or government can freeze your account, alter the data, or inflate the currency.'
    },
    { id: 'b5', type: 'concept', title: 'What is a Blockchain?', content: 'A Blockchain is simply a public ledger (spreadsheet) that is not stored in one bank, but copied and distributed across thousands of computers all over the world simultaneously.'
    },
    { id: 'b6', type: 'example', title: 'The Glass Safe', content: 'Imagine a giant glass safe in the middle of a town square. Everyone can see exactly how much money is inside, and everyone can see every time money goes in or out. But no single person has the key to alter the past records.'
    },
    { id: 'b7', type: 'insight', title: 'Decentralization', content: 'Because the ledger is copied on 10,000 different computers (Nodes), if a government tries to shut down one computer, the other 9,999 computers keep the network running perfectly. It is virtually un-killable.'
    },
    { id: 'b8', type: 'concept', title: 'What is Bitcoin?', content: 'Bitcoin (BTC) was the very first blockchain. It is a decentralized, digital currency with a hard-coded maximum supply of 21,000,000 coins. No more can ever be created.'
    },
    { id: 'b9', type: 'insight', title: 'Digital Gold', content: 'Because Bitcoin is mathematically scarce (unlike fiat currency), cannot be forged, and can be sent anywhere in the world instantly, it is widely considered "Digital Gold".'
    },
    { id: 'b10', type: 'exercise', title: 'Bitcoin Scarcity', content: 'How many Bitcoins will ever exist?', options: ['An infinite amount.', 'Exactly 21 Million.', 'It depends on what the Bitcoin CEO decides.'], correctAnswer: 'Exactly 21 Million.'
    },
    { id: 'b11', type: 'concept', title: 'Blocks and Chains', content: 'Transactions on the network are grouped together into "Blocks". Once a Block is full, it is cryptographically sealed and attached to the previous Block, forming a chronological "Chain".'
    },
    { id: 'b12', type: 'example', title: 'The Amber Analogy', content: 'Think of a mosquito trapped in amber. Once a transaction is sealed inside a block, and more blocks are stacked on top of it, it becomes mathematically impossible to alter or erase.'
    },
    { id: 'b13', type: 'concept', title: 'Immutability', content: 'This inability to alter past data is called Immutability. It is what gives a blockchain its trust. You don\'t need to trust a bank; you just trust the open-source mathematics.'
    },
    { id: 'b14', type: 'warning', title: 'The Dark Side of Immutability', content: 'If you send Bitcoin to the wrong address, or if a hacker steals it, there is no "Customer Support" to call. The transaction is immutable. The money is gone forever.'
    },
    { id: 'b15', type: 'exercise', title: 'Blockchain Feature', content: 'If a transaction on the Bitcoin blockchain is "Immutable", what does that mean?', options: ['It is invisible.', 'It can never be changed, reversed, or deleted by anyone.', 'It is free.'], correctAnswer: 'It can never be changed, reversed, or deleted by anyone.'
    },
    { id: 'b16', type: 'concept', title: 'Satoshi Nakamoto', content: 'Bitcoin was created by an anonymous person or group using the pseudonym Satoshi Nakamoto. To this day, no one knows who they are. This anonymity is actually Bitcoin\'s greatest strength, as there is no "founder" for a government to arrest.'
    },
    { id: 'b17', type: 'concept', title: 'Mining (Proof of Work)', content: 'How are new blocks sealed? Specialized computers ("Miners") race to solve an incredibly complex math puzzle. The first miner to solve it gets the right to seal the block and add it to the chain.'
    },
    { id: 'b18', type: 'insight', title: 'The Block Reward', content: 'As a reward for spending electricity to solve the puzzle and secure the network, the winning Miner is given a small amount of brand new Bitcoin. This is the ONLY way new Bitcoin is created.'
    },
    { id: 'b19', type: 'concept', title: 'The Halving', content: 'Every 4 years, the amount of Bitcoin rewarded to miners is cut exactly in half. This ensures the supply of new Bitcoin slows down over time, making it increasingly scarce.'
    },
    { id: 'b20', type: 'exercise', title: 'Mining Mechanics', content: 'What is the purpose of Bitcoin Miners?', options: ['To literally dig in the ground for metal.', 'To use computational power to secure the network, process transactions, and mint new Bitcoin.', 'To hack bank accounts.'], correctAnswer: 'To use computational power to secure the network, process transactions, and mint new Bitcoin.'
    },
    { id: 'b21', type: 'concept', title: 'Public vs Private Keys', content: 'To use crypto, you have two keys. Your Public Key is like your bank account number (you give it to people so they can send you money). Your Private Key is like your ATM PIN (you NEVER show it to anyone).'
    },
    { id: 'b22', type: 'warning', title: 'Not Your Keys, Not Your Coins', content: 'If you buy Bitcoin on Coinbase and leave it there, Coinbase holds your Private Keys. If Coinbase goes bankrupt, you lose your Bitcoin. You must move it to a Self-Custody Wallet.'
    },
    { id: 'b23', type: 'concept', title: 'Self-Custody Wallets', content: 'A hardware wallet (like a Ledger or Trezor) is a physical USB device that holds your Private Keys offline. It is the ultimate protection against hackers.'
    },
    { id: 'b24', type: 'insight', title: 'The Seed Phrase', content: 'When you set up a wallet, it generates a 12 or 24-word "Seed Phrase". This is the master backup to all your crypto. If your house burns down and destroys your hardware wallet, you can buy a new one and type in the 24 words to recover your funds.'
    },
    { id: 'b25', type: 'exercise', title: 'Security Best Practice', content: 'Where is the safest place to store your 24-word Seed Phrase?', options: ['In an email draft.', 'Written on a piece of paper or stamped in metal, stored in a physical safe.', 'As a photo on your phone.'], correctAnswer: 'Written on a piece of paper or stamped in metal, stored in a physical safe.'
    },
    { id: 'b26', type: 'concept', title: 'Fiat vs Crypto', content: 'Fiat is unlimited, centralized, and controlled by politicians. Bitcoin is scarce (21M), decentralized, and controlled by math.'
    },
    { id: 'b27', type: 'concept', title: 'Volatility vs Store of Value', content: 'Bitcoin is still a nascent asset class, making it wildly volatile. It is not yet a stable medium of exchange (you wouldn\'t buy coffee with it), but it serves as an asymmetric long-term Store of Value.'
    },
    { id: 'b28', type: 'warning', title: 'Altcoins', content: 'There are over 20,000 other cryptocurrencies (Altcoins). 99.9% of them are outright scams or centralized cash-grabs by venture capitalists. Bitcoin is unique due to its immaculate, leaderless conception.'
    },
    { id: 'b29', type: 'insight', title: 'The Institutional Shift', content: 'For 10 years, Wall Street called Bitcoin a scam. Today, the largest asset managers in the world (BlackRock, Fidelity) offer Bitcoin ETFs to their clients. The game theory has shifted from "ban it" to "accumulate it".'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Crypto Custody and Security in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You just bought $5,000 worth of Bitcoin on a centralized exchange. You want to hold it for 10 years. A friend tells you about 'Self-Custody'.",
        startingBalance: 5000,
        choices: [
          { text: "Leave the Bitcoin on the exchange because it's easier and they have a nice app.", result: -5000, feedback: "Two years later, the exchange CEO was arrested for fraud and the exchange filed for bankruptcy. Because you didn't own the Private Keys, you were an unsecured creditor. You lost 100% of your Bitcoin." },
          { text: "Move the Bitcoin to a Hardware Wallet and save the 24-word seed phrase in your Google Drive.", result: -5000, feedback: "You moved it off the exchange, but you saved the seed phrase on a cloud server! A hacker gained access to your Google account, found the 24 words, and drained your hardware wallet instantly." },
          { text: "Move the Bitcoin to a Hardware Wallet, write the 24-word seed phrase on paper, and lock it in a fireproof safe.", result: 25000, feedback: "Perfect operational security. The exchange went bankrupt, but your funds were safe offline. 10 years later, Bitcoin's value 5x'd, and your wealth is completely sovereign." }
        ]
      }
    }
  ]
};
