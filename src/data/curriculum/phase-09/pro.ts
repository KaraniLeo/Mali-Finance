import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p9-pro',
  title: 'Game Theory & Advanced Economics',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Prisoner\'s Dilemma', content: 'Tokenomics is applied Game Theory. The classic Prisoner\'s Dilemma: Two criminals are interrogated separately. If both stay silent, they get 1 year. If one snitches, he goes free and the other gets 10 years. If both snitch, they get 5 years. Rational self-interest forces them both to snitch, ensuring a worse outcome for everyone.'
    },
    { id: 'p2', type: 'insight', title: 'Game Theory in Crypto', content: 'In crypto, "Staying Silent" is HODLing. "Snitching" is Dumping. If everyone HODLs, everyone gets rich. But because everyone secretly fears the other person will dump first, everyone races to dump, crashing the price.'
    },
    { id: 'p3', type: 'concept', title: 'Nash Equilibrium', content: 'A situation where no player can improve their outcome by changing their strategy, assuming the other players don\'t change theirs. A perfectly designed tokenomics system reaches a Nash Equilibrium where HODLing is the most mathematically profitable action.'
    },
    { id: 'p4', type: 'exercise', title: 'Game Theory', content: 'Why do most meme coins eventually crash to zero?', options: ['Because the blockchain is slow.', 'Because the Game Theory heavily incentivizes early buyers to "snitch" (dump) on late buyers before late buyers dump on them.', 'Because they are illegal.'], correctAnswer: 'Because the Game Theory heavily incentivizes early buyers to "snitch" (dump) on late buyers before late buyers dump on them.'
    },
    { id: 'p5', type: 'concept', title: 'The veToken Model (Vote Escrow)', content: 'Pioneered by Curve Finance. To get voting power and maximum yield, you must lock your tokens for 4 years. This completely alters the Game Theory, forcing users to align with the long-term success of the protocol rather than dumping.'
    },
    { id: 'p6', type: 'insight', title: 'Bribing Dynamics', content: 'Because veToken holders control where the massive yield emissions go, other protocols literally bribe them. This creates a secondary market where holding the governance token generates massive cash flow (Bribes) instead of just voting rights.'
    },
    { id: 'p7', type: 'concept', title: 'Olympus DAO (Protocol Owned Liquidity)', content: 'Olympus DAO tried to solve the "renting liquidity" problem. They sold OHM tokens at a massive discount, but users had to pay with Liquidity Pool tokens. The protocol permanently absorbed the liquidity, ensuring it could never leave.'
    },
    { id: 'p8', type: 'warning', title: 'The (3,3) Illusion', content: 'Olympus DAO used Game Theory "(3,3)" to convince everyone to stake and never sell, offering 100,000% APY. But it was highly inflationary. When the APY dropped, the Nash Equilibrium broke, everyone dumped, and it collapsed 99%.'
    },
    { id: 'p9', type: 'exercise', title: 'veTokenomics', content: 'What is the primary Game Theory advantage of the Vote-Escrow (veToken) model?', options: ['It allows users to sell instantly.', 'It forces short-term mercenary capital to become long-term aligned stakeholders by locking their tokens for years.', 'It lowers taxes.'], correctAnswer: 'It forces short-term mercenary capital to become long-term aligned stakeholders by locking their tokens for years.'
    },
    { id: 'p10', type: 'concept', title: 'Tokenomics Audits', content: 'Just like code audits, professional funds now demand Tokenomics Audits. They use complex mathematical modeling and agent-based simulations to stress-test how the economy will react during a Black Swan crash.'
    },
    { id: 'p11', type: 'insight', title: 'Reflexivity', content: 'George Soros\'s theory of Reflexivity: Price drives Fundamentals, and Fundamentals drive Price. In crypto, if a token goes up, the APY goes up, attracting more users, driving the price up further (Positive Reflexivity). When it reverses, it is a Death Spiral.'
    },
    { id: 'p12', type: 'warning', title: 'The Death Spiral', content: 'Price drops -> APY drops -> Users withdraw liquidity -> Protocol revenue drops -> Token holders sell -> Price drops more. This is the doom-loop of reflexive tokenomics.'
    },
    { id: 'p13', type: 'concept', title: 'Hyper-Structures', content: 'A concept where protocols run infinitely, for free, with no maintenance, generating value for participants. Uniswap is a hyper-structure. It is an unstoppable, immutable financial utility.'
    },
    { id: 'p14', type: 'exercise', title: 'Reflexivity', content: 'What happens in a Negative Reflexivity loop (Death Spiral)?', options: ['The protocol automatically pauses.', 'Dropping prices cause fleeing liquidity, which lowers utility, causing further price drops in an endless loop.', 'The government bails them out.'], correctAnswer: 'Dropping prices cause fleeing liquidity, which lowers utility, causing further price drops in an endless loop.'
    },
    { id: 'p15', type: 'concept', title: 'Burn-and-Mint Equilibrium (BME)', content: 'A model used by Helium. Users must BURN the HNT token to buy network services. But the protocol MINTS new HNT to reward hotspot providers. If Network Usage > Emissions, it becomes deflationary.'
    },
    { id: 'p16', type: 'insight', title: 'Commoditizing Trust', content: 'Tokenomics is ultimately about using cryptography and incentives to commoditize trust. You don\'t need to trust the CEO; you just need to trust the incentive structure.'
    },
    { id: 'p17', type: 'concept', title: 'The Fat Protocol Thesis', content: 'In Web2, the applications (Google, Facebook) captured all the value, while the base protocols (HTTP, TCP/IP) captured zero. In Web3, the Base Protocols (Ethereum) capture the massive value, while the applications (dApps) are thin.'
    },
    { id: 'p18', type: 'warning', title: 'The Fat App Thesis', content: 'Many now argue the Fat Protocol thesis is dead. Applications (like Uniswap or Maker) own the end-user. They can easily launch their own blockchain (AppChain) and take all the value with them.'
    },
    { id: 'p19', type: 'exercise', title: 'Value Capture', content: 'What does the Fat Protocol Thesis suggest?', options: ['That Bitcoin is too big.', 'That in Web3, the underlying blockchain (Layer 1) will capture the majority of the financial value, unlike Web2 where apps captured it all.', 'That apps will always win.'], correctAnswer: 'That in Web3, the underlying blockchain (Layer 1) will capture the majority of the financial value, unlike Web2 where apps captured it all.'
    },
    { id: 'p20', type: 'concept', title: 'AppChains', content: 'Instead of building a dApp on Ethereum and fighting for blockspace (causing high gas fees), a massive protocol can launch its own customized blockchain strictly for its own app (e.g., dYdX).'
    },
    { id: 'p21', type: 'insight', title: 'Internalizing MEV', content: 'By owning the entire AppChain, the protocol can capture 100% of the MEV (Maximal Extractable Value) generated by its users, and redirect that profit directly back to its token holders.'
    },
    { id: 'p22', type: 'concept', title: 'Liquid Restaking (EigenLayer)', content: 'The newest evolution of DeFi. You stake ETH to secure Ethereum. EigenLayer allows you to take that exact same staked ETH and "Restake" it to secure OTHER protocols simultaneously, earning double yield.'
    },
    { id: 'p23', type: 'warning', title: 'Slashing Contagion', content: 'If you restake your ETH to secure 5 different protocols, and one of those protocols gets hacked or slashes your stake, you lose the base ETH. The risk profile is exponential.'
    },
    { id: 'p24', type: 'exercise', title: 'Restaking Risks', content: 'What is the primary risk of Liquid Restaking?', options: ['The yields are too low.', 'Slashing Contagion: A failure or penalty on a secondary protocol can result in the total loss of your underlying base collateral.', 'It requires multiple wallets.'], correctAnswer: 'Slashing Contagion: A failure or penalty on a secondary protocol can result in the total loss of your underlying base collateral.'
    },
    { id: 'p25', type: 'concept', title: 'The Meta-Governance Game', content: 'If Protocol A holds a massive treasury of Protocol B\'s tokens, Protocol A can maliciously vote in Protocol B\'s governance to sabotage them. This is corporate warfare on the blockchain.'
    },
    { id: 'p26', type: 'insight', title: 'Gresham\'s Law', content: '"Bad money drives out good." In crypto, people HODL their pristine assets (Bitcoin, ETH), but they gleefully spend and dump their inflationary, low-quality tokens (meme coins) to pay for things.'
    },
    { id: 'p27', type: 'concept', title: 'The Endgame', content: 'A perfectly designed token is invisible. The user shouldn\'t even know it exists. The protocol abstracts away the gas fees, the bridging, and the staking, delivering pure utility to the end user.'
    },
    { id: 'p28', type: 'insight', title: 'Mastery', content: 'You now understand the deepest mechanics of the global financial casino. You are no longer the gambler at the table; you understand how the house is built.'
    },
    { id: 'p29', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Game Theory and Reflexivity in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You are yield farming in a highly reflexive protocol. The APY is 10,000%. The token price has gone up 5x in two weeks. But you notice the Total Value Locked (TVL) just dropped by 20% today, even though the price is still high.",
        startingBalance: 50000,
        choices: [
          { text: "Double down. The TVL drop is just a blip, the APY is too good to leave.", result: -50000, feedback: "You ignored the Death Spiral trigger. The whales started withdrawing liquidity. The next day, the APY crashed. Everyone rushed to the exit. Slippage went to 90%. You lost everything." },
          { text: "Immediately withdraw all liquidity and sell the token.", result: 15000, feedback: "Pro execution. You recognized the Negative Reflexivity loop before it accelerated. You secured your massive APY gains and exited the Ponzi just before the entire house of cards collapsed." },
          { text: "Withdraw liquidity, but hold the token because it might go higher.", result: -30000, feedback: "You withdrew your liquidity (smart), but you held the token (fatal error). When the death spiral hit, the token price hyper-inflated to zero. You saved your LP position but lost your capital." }
        ]
      }
    }
  ]
};
