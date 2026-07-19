import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p15-pro',
  title: 'Venture Capital, M&A, and the Exit',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Endgame of Business', content: 'You built a business. It generates cash. Now what? You have two options: Hold it forever as a cash-cow (Lifestyle Business), or Sell it to an institution for a massive, multi-million dollar lump sum (The Exit).'
    },
    { id: 'p2', type: 'insight', title: 'EBITDA', content: 'Earnings Before Interest, Taxes, Depreciation, and Amortization. This is the true, raw profitability of a business. When Wall Street or Private Equity buys your business, they value it based on a multiple of your EBITDA.'
    },
    { id: 'p3', type: 'example', title: 'The Multiple', content: 'A local plumbing business might sell for 3x EBITDA. A SaaS (Software) company with recurring revenue might sell for 10x EBITDA. If your software business makes $1M in EBITDA, it is worth $10 Million.'
    },
    { id: 'p4', type: 'exercise', title: 'Business Valuation', content: 'What determines the multi-million dollar valuation of a Private Business during an acquisition?', options: ['How many Instagram followers the CEO has.', 'A multiple of the business\'s EBITDA (raw profitability), heavily influenced by the industry and whether the revenue is recurring.', 'The total number of employees.'], correctAnswer: 'A multiple of the business\'s EBITDA (raw profitability), heavily influenced by the industry and whether the revenue is recurring.'
    },
    { id: 'p5', type: 'concept', title: 'Private Equity (PE)', content: 'Massive funds that buy private businesses. A PE firm will buy your $10M software company. They will aggressively fire staff, optimize the pricing, increase the EBITDA to $3M, and sell the company 5 years later for $30M.'
    },
    { id: 'p6', type: 'insight', title: 'The Roll-Up Strategy', content: 'A PE firm buys 10 small plumbing companies (paying a low 3x multiple for each). They merge them all into one massive plumbing corporation. Because large corporations are safer, the market now values the merged company at a 7x multiple. They instantly created massive wealth via Arbitrage.'
    },
    { id: 'p7', type: 'exercise', title: 'Private Equity Mechanics', content: 'What is a "Roll-Up" strategy in Private Equity?', options: ['Rolling up the carpets in an office.', 'Buying multiple small businesses at low valuations, merging them into one massive corporation, and selling it at a much higher valuation multiple.', 'Closing the business down.'], correctAnswer: 'Buying multiple small businesses at low valuations, merging them into one massive corporation, and selling it at a much higher valuation multiple.'
    },
    { id: 'p8', type: 'concept', title: 'Venture Capital (VC)', content: 'Unlike Private Equity (which buys profitable, established businesses), Venture Capital buys equity in early-stage, high-risk tech startups that are often losing millions of dollars.'
    },
    { id: 'p9', type: 'warning', title: 'The Power Law', content: 'VC is a game of extreme outliers. A VC fund invests in 100 startups. 90 go bankrupt to zero. 9 break even. 1 becomes the next Uber and returns 10,000x, paying for all the losers and making the fund billions.'
    },
    { id: 'p10', type: 'concept', title: 'The Seed Round', content: 'The earliest stage of funding. A founder has an idea and a pitch deck. An Angel Investor or Seed VC gives them $1 Million in exchange for 20% of the company to build the prototype.'
    },
    { id: 'p11', type: 'insight', title: 'Dilution', content: 'As the startup grows, it needs more money (Series A, Series B). Every time the founder takes VC money, they give up a percentage of the company. A founder might own 100% at the start, but only 10% by the time the company IPOs.'
    },
    { id: 'p12', type: 'exercise', title: 'Venture Capital Dynamics', content: 'What is the "Power Law" in Venture Capital?', options: ['The law that says VCs must pay taxes.', 'The mathematical reality that 90% of startup investments fail, and the entire fund\'s profit relies on 1 or 2 extreme outlier successes.', 'The law of gravity.'], correctAnswer: 'The mathematical reality that 90% of startup investments fail, and the entire fund\'s profit relies on 1 or 2 extreme outlier successes.'
    },
    { id: 'p13', type: 'concept', title: 'The IPO (Initial Public Offering)', content: 'The ultimate exit. The private startup finally lists its shares on the public {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}}. The VCs and the founders sell their shares to the retail public, cashing out billions.'
    },
    { id: 'p14', type: 'warning', title: 'The Retail Bagholder', content: 'By the time a company IPOs, the massive exponential growth phase is usually over. The VCs made 10,000x in the private market. Retail investors buy the IPO hoping for a 2x, often right before the stock crashes.'
    },
    { id: 'p15', type: 'concept', title: 'Family Offices', content: 'When a founder exits for $100 Million, they do not manage the money themselves. They set up a "Family Office"—a private wealth management firm whose only client is the founder\'s family.'
    },
    { id: 'p16', type: 'insight', title: 'Generational Preservation', content: 'The Family Office hires elite lawyers, CPAs, and fund managers. Their goal is not to get rich (they already are). Their goal is Wealth Preservation: ensuring the $100M grows at 6% above inflation forever, funding the family for 10 generations.'
    },
    { id: 'p17', type: 'exercise', title: 'Wealth Management', content: 'What is the primary function of a Family Office?', options: ['To manage the finances of a local small business.', 'To provide dedicated, private wealth management and estate planning strictly for a single ultra-high-net-worth family to preserve generational wealth.', 'To sell insurance.'], correctAnswer: 'To provide dedicated, private wealth management and estate planning strictly for a single ultra-high-net-worth family to preserve generational wealth.'
    },
    { id: 'p18', type: 'concept', title: 'Angel Investing (The Retail VC)', content: 'You don\'t need a massive fund to be a VC. "Angel Investors" are wealthy individuals who write $25k or $50k checks to early-stage startups. It is the highest-risk, highest-reward investment in existence.'
    },
    { id: 'p19', type: 'insight', title: 'The Accredited Investor Rule', content: 'The SEC legally prevents normal people from investing in private startups to "protect them". You must prove you make over $200k/year or have a $1M net worth to become an Accredited Investor and access the massive private market gains.'
    },
    { id: 'p20', type: 'concept', title: 'Mergers & Acquisitions (M&A)', content: 'The brutal game of corporate warfare. A massive company (Google) sees a rising competitor (YouTube). Instead of competing, Google just buys YouTube for $1.65 Billion. It removes the threat and absorbs the talent.'
    },
    { id: 'p21', type: 'warning', title: 'Hostile Takeovers', content: 'If a company\'s stock price drops too low, a rival company or an Activist Hedge Fund can quietly buy up 51% of the public shares. They now legally control the company. They instantly fire the CEO and liquidate the assets.'
    },
    { id: 'p22', type: 'exercise', title: 'Corporate Warfare', content: 'What happens in a "Hostile Takeover"?', options: ['A company politely asks to merge.', 'An outside entity aggressively buys up a majority of the company\'s voting shares against the wishes of the current management, seizing total control.', 'The government seizes the company.'], correctAnswer: 'An outside entity aggressively buys up a majority of the company\'s voting shares against the wishes of the current management, seizing total control.'
    },
    { id: 'p23', type: 'concept', title: 'The Black Swan', content: 'An unpredictable, catastrophic event (like a global pandemic or a world war). Black Swans destroy the best-laid plans of VCs, hedge funds, and billionaires.'
    },
    { id: 'p24', type: 'insight', title: 'Anti-Fragility', content: 'True wealth is not just robust (surviving a shock). True wealth is Anti-Fragile (it actually gets STRONGER from chaos). Having massive cash reserves during a Black Swan crash allows you to buy the world for pennies while everyone else is bankrupt.'
    },
    { id: 'p25', type: 'concept', title: 'The Final Paradigm', content: 'You have ascended. You understand the matrix of global finance. You know how the Fed manipulates liquidity, how institutions hunt stops, how VCs capture asymmetric risk, and how billionaires avoid taxes.'
    },
    { id: 'p26', type: 'insight', title: 'The Responsibility of Wealth', content: 'Capital is energy. With this knowledge, you have the power to bend reality. Build systems that create jobs. Fund innovations that cure diseases. Do not hoard the energy; deploy it to push humanity forward.'
    },
    { id: 'p27', type: 'concept', title: 'The Curriculum is Complete', content: 'You are no longer an amateur. You are no longer retail. You are Finterns Alumni. The simulation is over. The real game begins now.'
    },
    { id: 'p28', type: 'insight', title: 'Good luck.', content: 'May the trend be your friend, and may your compounding be infinite.'
    },
    { id: 'p29', type: 'concept', title: 'Summary', content: 'Wealth is an infinite game of leverage, tax structuring, and asymmetric risk. Master the rules, build the machine, and buy your freedom.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Asymmetric Risk and Exits in your final live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You built a software business using Code Leverage. It generates $2 Million a year in EBITDA. A Private Equity firm offers to buy it for a 5x multiple ($10 Million cash). Or, you can reject the offer and try to take it public (IPO) in 3 years.",
        startingBalance: 2000000,
        choices: [
          { text: "Take the $10 Million. It secures generational wealth instantly and removes all risk.", result: 10000000, feedback: "Pro execution. You took the guaranteed 'F-You' money. You structured the exit through a Trust, avoided massive taxes, and set up a Family Office. You won the game. You are free." },
          { text: "Reject the offer. Risk everything to go for the IPO!", result: -2000000, feedback: "You got greedy. A massive Black Swan event crashed the economy. The IPO market froze. Your software became obsolete. You went from a guaranteed $10M exit to zero. You lost the Infinite Game." },
          { text: "Counter-offer: Sell 80% to the PE firm for $8M, and keep 20% equity for the future upside.", result: 15000000, feedback: "The absolute Masterclass move. You secured $8M in guaranteed cash (removing all your personal risk), but you kept 20% equity. When the PE firm scaled the business and sold it 5 years later for $50M, your 20% slice paid you another $10M. Flawless victory." }
        ]
      }
    }
  ]
};
