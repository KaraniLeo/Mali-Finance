import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p10-pro',
  title: 'On-Chain IP & Generative Art',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'On-Chain vs Off-Chain', content: 'As discussed, most NFTs are "Off-Chain". The blockchain only stores a link to a centralized server. A "Fully On-Chain" NFT stores the entire image data directly inside the Ethereum smart contract.'
    },
    { id: 'p2', type: 'insight', title: 'The Permanence Premium', content: 'Storing data on Ethereum is incredibly expensive. A 1MB image could cost $100,000 in gas to upload. Therefore, Fully On-Chain NFTs (like CryptoPunks) are usually tiny, pixelated SVG files. They trade at a massive premium because they are truly permanent and un-censorable.'
    },
    { id: 'p3', type: 'example', title: 'Generative Art', content: 'Instead of uploading an image, artists upload a piece of code (an algorithm) to the blockchain. When someone mints the NFT, the code executes and randomly generates a unique piece of art right then and there (e.g., Art Blocks).'
    },
    { id: 'p4', type: 'exercise', title: 'Data Permanence', content: 'Why do Fully On-Chain NFTs usually consist of very simple code or pixelated SVG files?', options: ['Because artists are lazy.', 'Because storing large amounts of data directly on the Ethereum blockchain is prohibitively expensive.', 'Because the government bans 4K images.'], correctAnswer: 'Because storing large amounts of data directly on the Ethereum blockchain is prohibitively expensive.'
    },
    { id: 'p5', type: 'concept', title: 'Dynamic NFTs (dNFTs)', content: 'A static NFT never changes. A Dynamic NFT has a smart contract that alters its metadata based on external conditions. For example, a sports NFT whose stats update automatically when the real-world player scores a goal.'
    },
    { id: 'p6', type: 'insight', title: 'The Oracle Connection', content: 'Dynamic NFTs rely entirely on decentralized Oracles (like Chainlink) to feed the real-world data into the smart contract securely.'
    },
    { id: 'p7', type: 'concept', title: 'CC0 (Creative Commons Zero)', content: 'Some projects release their NFTs under CC0, meaning "No Rights Reserved". They surrender the copyright completely to the public domain.'
    },
    { id: 'p8', type: 'example', title: 'The CC0 Thesis', content: 'If anyone can legally use a Nouns NFT to make a cartoon, sell merch, or build a brand, the Nouns brand proliferates globally at zero cost to the founders. The original NFTs become incredibly valuable as the historical source of a global meme.'
    },
    { id: 'p9', type: 'exercise', title: 'Copyright Models', content: 'What does it mean if an NFT collection is CC0?', options: ['The creators fiercely protect their copyright and will sue you.', 'The art is placed in the public domain, allowing absolutely anyone (even non-owners) to use it commercially.', 'It means it is a scam.'], correctAnswer: 'The art is placed in the public domain, allowing absolutely anyone (even non-owners) to use it commercially.'
    },
    { id: 'p10', type: 'concept', title: 'NFT Automated Market Makers (NFT AMMs)', content: 'Traditionally, you list an NFT on OpenSea and wait for a buyer. Platforms like Sudoswap introduced AMMs for NFTs. You can dump your NFT instantly into a liquidity pool, just like trading a token.'
    },
    { id: 'p11', type: 'insight', title: 'Financializing JPEGs', content: 'NFT AMMs treat all NFTs in a collection as fungible. They provide instant exit liquidity, but at the cost of ignoring rarity traits. They turn art into pure financial commodities.'
    },
    { id: 'p12', type: 'warning', title: 'The Royalty Bypass', content: 'Because AMMs are just smart contracts swapping tokens, they completely bypass the creator royalties hard-coded into traditional marketplaces. This sparked a massive war between traders (who want zero fees) and creators (who need revenue).'
    },
    { id: 'p13', type: 'exercise', title: 'NFT Liquidity', content: 'What is the primary advantage of an NFT AMM (like Sudoswap)?', options: ['It forces buyers to pay high royalties.', 'It provides instant liquidity, allowing you to sell an NFT immediately without waiting for a specific buyer.', 'It makes the art look better.'], correctAnswer: 'It provides instant liquidity, allowing you to sell an NFT immediately without waiting for a specific buyer.'
    },
    { id: 'p14', type: 'concept', title: 'ERC-721 vs ERC-1155', content: 'ERC-721 is the standard for 1-of-1 unique NFTs. ERC-1155 is a newer standard that allows for "semi-fungible" tokens. For example, a video game might mint 10,000 identical healing potions in a single, gas-efficient transaction.'
    },
    { id: 'p15', type: 'insight', title: 'Gas Efficiency', content: 'If you want to send 5 different NFTs to a friend using ERC-721, you must pay 5 separate gas fees. With ERC-1155, you can batch send them all in one single, cheap transaction.'
    },
    { id: 'p16', type: 'concept', title: 'Bidding Walls & Spoofing', content: 'Whales will place massive bids slightly below the Floor Price of an entire collection to establish a "Bidding Wall". It gives sellers a psychological safety net, knowing they can instantly liquidate.'
    },
    { id: 'p17', type: 'warning', title: 'The Spoof', content: 'A malicious whale places a massive bid wall, waits for retail to buy into the collection feeling safe, and then instantly cancels all their bids (Spoofing) before dumping their own bags, collapsing the floor.'
    },
    { id: 'p18', type: 'exercise', title: 'Market Manipulation', content: 'What is "Spoofing" in the NFT market?', options: ['Making fun of an NFT.', 'Placing massive bids to create a false sense of security and liquidity, only to cancel them before execution.', 'Burning an NFT.'], correctAnswer: 'Placing massive bids to create a false sense of security and liquidity, only to cancel them before execution.'
    },
    { id: 'p19', type: 'concept', title: 'Flash Loan Bidding', content: 'Hackers use Flash Loans to borrow thousands of ETH, buy out the entire floor of an NFT collection in a single transaction, artificially pump the price, and dump them into existing bids.'
    },
    { id: 'p20', type: 'insight', title: 'The Pro Edge in NFTs', content: 'Amateurs buy NFTs because the art looks cool. Pros track the smart contract deployer wallet, analyze the token distribution, monitor the bidding walls, and hedge their positions using NFT derivatives.'
    },
    { id: 'p21', type: 'concept', title: 'NFT Derivatives (Perps)', content: 'You can now trade Perpetual Futures on NFTs. You don\'t need $100k to buy a Bored Ape. You can use $100 and 10x leverage to short the Floor Price of Bored Apes.'
    },
    { id: 'p22', type: 'insight', title: 'Hedging an Illiquid Asset', content: 'If you own a $100k NFT, and you fear a market crash but don\'t want to sell your specific piece, you can open a Short position on an NFT Perp exchange. If the market crashes, your short pays out cash, offsetting the value loss of your NFT.'
    },
    { id: 'p23', type: 'exercise', title: 'Advanced Hedging', content: 'How can a pro trader protect the value of their illiquid NFT during a market crash without actually selling the NFT?', options: ['By printing out a picture of it.', 'By opening a Short position on an NFT Perpetual Futures exchange to offset the loss in value.', 'By deleting their wallet.'], correctAnswer: 'By opening a Short position on an NFT Perpetual Futures exchange to offset the loss in value.'
    },
    { id: 'p24', type: 'concept', title: 'Phygital Assets', content: 'The bridging of Physical and Digital. High-end brands (like Nike or Rolex) issue an NFT as a cryptographic certificate of authenticity alongside the physical item. You must burn the NFT to redeem the physical item.'
    },
    { id: 'p25', type: 'insight', title: 'Ending Counterfeits', content: 'If you buy a physical Rolex on the secondary market without the accompanying NFT transferred to your wallet, you instantly know it is a fake.'
    },
    { id: 'p26', type: 'concept', title: 'The Legal Wrapper', content: 'Some advanced NFTs have complex legal contracts embedded in their metadata. The NFT acts as a legally binding signature bridging the blockchain with real-world courts.'
    },
    { id: 'p27', type: 'warning', title: 'Regulatory Enforcement', content: 'If an NFT promises future profits from a business, the SEC will classify it as an unregistered security. The founders will face massive fines and the asset will be delisted from marketplaces.'
    },
    { id: 'p28', type: 'insight', title: 'The Future of NFTs', content: 'The term "NFT" will eventually disappear, just like we no longer say "Information Superhighway". It will simply be the backend technology powering all digital property rights.'
    },
    { id: 'p29', type: 'concept', title: 'Summary', content: 'The NFT market is the Wild West of finance. It combines the illiquidity of fine art, the volatility of crypto, and the tribalism of social media. Proceed with extreme caution and cold calculation.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of On-Chain data and IP rights in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You are launching a $10 Million NFT collection for a global brand. You need the art to survive for 100 years, and you want the community to build products around the brand to grow it virally.",
        startingBalance: 10000000,
        choices: [
          { text: "Store the images on an AWS server and retain strict copyright control over all the art.", result: -5000000, feedback: "You failed. Your AWS server went down during a payment dispute, causing all the NFTs to display blank errors. Because you kept strict copyright, the community got bored, sued you, and abandoned the project." },
          { text: "Encode the images as Fully On-Chain SVGs directly into the Ethereum contract, and release the art under CC0.", result: 5000000, feedback: "Pro execution. Because the art is Fully On-Chain, it will exist as long as the Ethereum network exists. Because it is CC0, the community built a massive merchandise empire around it, skyrocketing the value of the original tokens." },
          { text: "Store the images on IPFS, but ban anyone from using them commercially.", result: 0, feedback: "The IPFS storage was smart, protecting the images. But your strict IP rules alienated the Web3 community. The project survived, but never achieved viral growth." }
        ]
      }
    }
  ]
};
