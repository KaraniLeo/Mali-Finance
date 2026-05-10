import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p10-beginner',
  title: 'Intro to Digital Property',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'What is an NFT?', content: 'NFT stands for Non-Fungible Token. It is a unique cryptographic token that represents ownership of a specific digital or physical asset on the blockchain.'
    },
    { id: 'b2', type: 'insight', title: 'Fungible vs Non-Fungible', content: 'Fungible means replaceable. A $1 bill is fungible. If I trade my $1 bill for your $1 bill, we both still have $1. Non-Fungible means unique. The Mona Lisa is non-fungible. You cannot trade it for another painting and have the same thing.'
    },
    { id: 'b3', type: 'example', title: 'The Problem with Digital Art', content: 'Before NFTs, if an artist drew a picture, anyone could right-click and save it. The artist could never prove which one was the "original" and therefore couldn\'t sell it.'
    },
    { id: 'b4', type: 'exercise', title: 'Fungibility', content: 'Which of the following is an example of a Fungible asset?', options: ['A signed baseball card.', 'A single Bitcoin (BTC).', 'Your house.'], correctAnswer: 'A single Bitcoin (BTC).'
    },
    { id: 'b5', type: 'concept', title: 'The Solution: The Digital Receipt', content: 'An NFT is essentially an unbreakable digital receipt. It publicly proves exactly who owns the original asset. You can still right-click and save the image, just like you can take a photo of the Mona Lisa, but you don\'t OWN it.'
    },
    { id: 'b6', type: 'insight', title: 'Why Ownership Matters', content: 'Ownership is the foundation of value. If you buy a Rolex, you want the certificate of authenticity. An NFT is a certificate of authenticity secured by thousands of computers instead of a piece of paper.'
    },
    { id: 'b7', type: 'concept', title: 'Smart Contracts in NFTs', content: 'NFTs are minted using Smart Contracts. These contracts can have rules hard-coded into them. For example, a rule that says "Every time this NFT is resold, the original artist gets a 10% royalty automatically."'
    },
    { id: 'b8', type: 'example', title: 'The Royalty Revolution', content: 'In the traditional art world, an artist sells a painting for $100. Ten years later, it sells at auction for $1 Million. The artist gets nothing. With NFTs, the smart contract automatically sends the artist $100,000 instantly.'
    },
    { id: 'b9', type: 'exercise', title: 'Smart Royalties', content: 'How do NFT creators guarantee they receive a percentage of secondary sales?', options: ['They hire a lawyer to track sales.', 'They hard-code a royalty percentage directly into the NFT\'s smart contract.', 'They rely on the honor system.'], correctAnswer: 'They hard-code a royalty percentage directly into the NFT\'s smart contract.'
    },
    { id: 'b10', type: 'concept', title: 'Profile Pictures (PFPs)', content: 'The first massive wave of NFTs were PFPs (like CryptoPunks or Bored Apes). They acted as digital country club memberships and status symbols for the Web3 native generation.'
    },
    { id: 'b11', type: 'warning', title: 'The Bubble', content: 'In 2021, the market became a massive speculative bubble. People were paying millions for pictures of pixelated monkeys simply because they thought they could sell them for more the next day (The Greater Fool Theory).'
    },
    { id: 'b12', type: 'exercise', title: 'Speculation', content: 'What happens when people buy an asset purely because they expect to sell it to a "Greater Fool" tomorrow?', options: ['The asset becomes a stable currency.', 'It creates an unsustainable speculative bubble that eventually crashes.', 'It guarantees long-term profit.'], correctAnswer: 'It creates an unsustainable speculative bubble that eventually crashes.'
    },
    { id: 'b13', type: 'concept', title: 'Beyond Art: Ticketing', content: 'NFTs are far more than JPEGs. Imagine a concert ticket as an NFT. It cannot be counterfeited, scalpers can be hard-coded out of the contract, and the ticket becomes a digital collectible after the show.'
    },
    { id: 'b14', type: 'concept', title: 'Beyond Art: Gaming', content: 'In traditional games (like Fortnite), you buy a $10 skin, but you don\'t own it. If Epic Games bans you, you lose it. If the skin is an NFT, you physically own the asset in your wallet and can sell it on the open market.'
    },
    { id: 'b15', type: 'exercise', title: 'True Ownership', content: 'What is the main benefit of an NFT in a video game?', options: ['It makes the game graphics better.', 'It gives the player cryptographic ownership of their in-game assets, allowing them to trade or sell them outside the game.', 'It makes the game free.'], correctAnswer: 'It gives the player cryptographic ownership of their in-game assets, allowing them to trade or sell them outside the game.'
    },
    { id: 'b16', type: 'concept', title: 'Beyond Art: Music', content: 'Musicians make pennies from Spotify streams. By dropping an album as an NFT, musicians can sell directly to their 1,000 true fans, cutting out the record label entirely.'
    },
    { id: 'b17', type: 'insight', title: 'The Metaverse', content: 'The Metaverse is a persistent virtual world. NFTs will act as the property rights layer of this world. Your avatar, your virtual land, and your digital clothes will all be NFTs.'
    },
    { id: 'b18', type: 'warning', title: 'Illiquidity', content: 'Bitcoin is highly liquid. You can sell it instantly. NFTs are highly illiquid. You cannot sell your NFT until you find a specific human being who wants to buy your exact specific image. If panic hits, you are trapped.'
    },
    { id: 'b19', type: 'exercise', title: 'NFT Liquidity', content: 'Why is selling an NFT much harder than selling a token like Ethereum?', options: ['Because Ethereum is faster.', 'Because NFTs are non-fungible, meaning you must wait for a buyer who wants your specific unique asset, making them highly illiquid.', 'Because the government bans NFT sales.'], correctAnswer: 'Because NFTs are non-fungible, meaning you must wait for a buyer who wants your specific unique asset, making them highly illiquid.'
    },
    { id: 'b20', type: 'concept', title: 'Where is the Image Stored?', content: 'Blockchains are terrible at storing large files. Most NFTs DO NOT contain the actual image. The NFT is just a few lines of text containing a web link (URL) pointing to where the image is saved.'
    },
    { id: 'b21', type: 'warning', title: 'The Broken Link Problem', content: 'If the NFT points to a standard website (HTTP), and the creator stops paying their server bill, the image goes offline. You now own a permanent receipt pointing to a dead link.'
    },
    { id: 'b22', type: 'concept', title: 'IPFS (InterPlanetary File System)', content: 'To solve the broken link problem, high-quality NFTs use IPFS. It is a decentralized, peer-to-peer network for storing files. The link points to the cryptographic hash of the image, making it permanent.'
    },
    { id: 'b23', type: 'exercise', title: 'Data Storage', content: 'Why is it risky if an NFT points to an image stored on an Amazon AWS server?', options: ['AWS is too slow.', 'If the creator stops paying the AWS bill, the server goes down, and the NFT image vanishes forever.', 'AWS will steal it.'], correctAnswer: 'If the creator stops paying the AWS bill, the server goes down, and the NFT image vanishes forever.'
    },
    { id: 'b24', type: 'concept', title: 'Minting', content: 'Minting is the process of generating the NFT on the blockchain. It requires paying a gas fee to the miners to permanently record your ownership.'
    },
    { id: 'b25', type: 'insight', title: 'The Gas War', content: 'If a highly anticipated NFT collection drops, thousands of people will try to mint at the same exact second. This clogs the network and causes Gas Fees to spike to thousands of dollars.'
    },
    { id: 'b26', type: 'concept', title: 'Scams and Phishing', content: 'Because NFTs are so visual, hackers use Discord and Twitter to post fake "Free Mint" links. If you connect your wallet and click approve, the malicious contract instantly steals all the NFTs and crypto in your wallet.'
    },
    { id: 'b27', type: 'warning', title: 'Wallet Drainers', content: 'Never click links in Discord DMs. Never sign a transaction unless you know exactly what you are approving. Use a "Burner Wallet" with minimal funds for minting new projects.'
    },
    { id: 'b28', type: 'exercise', title: 'Security', content: 'What is the safest way to interact with a brand new, unverified NFT mint?', options: ['Use your main vault wallet that holds your life savings.', 'Use a completely empty Burner Wallet loaded only with the exact amount needed for the mint.', 'Give your seed phrase to the founder.'], correctAnswer: 'Use a completely empty Burner Wallet loaded only with the exact amount needed for the mint.'
    },
    { id: 'b29', type: 'concept', title: 'Summary', content: 'NFTs are not just JPEGs. They are a revolutionary technology that introduces digital property rights to the internet. They allow us to own, trade, and monetize digital assets without intermediaries.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of NFT liquidity and storage in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You bought a rare digital art NFT for $5,000. It is stored on a centralized server. The artist's website just went offline. At the same time, the crypto market is crashing, and you need cash immediately.",
        startingBalance: 5000,
        choices: [
          { text: "Try to sell the NFT immediately on a marketplace at market price.", result: -5000, feedback: "Because NFTs are completely illiquid, and the image isn't loading, there are zero buyers. You are trapped in the asset while the market crashes. You cannot liquidate it." },
          { text: "Use the NFT as collateral to take out an instant DeFi loan.", result: -5000, feedback: "You can't. DeFi protocols only accept liquid tokens (like ETH) as collateral. Because the NFT is non-fungible and illiquid, the smart contract refuses to accept it." },
          { text: "Wait 5 years and hope the artist turns the server back on.", result: -5000, feedback: "The artist abandoned the project. The server never came back. You own a permanent blockchain receipt pointing to a 404 Error page. The asset is permanently worthless." }
        ]
      }
    }
  ]
};
