import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p15-intermediate',
  title: 'Entity Structuring & Tax Arbitrage',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Corporate Veil', content: 'Rich people do not own things in their own name. "Own nothing, control everything." If you own a rental property in your own name and a tenant slips, they sue YOU, and take your personal savings. If an LLC owns the property, they sue the LLC, and your personal savings are protected (The Corporate Veil).'
    },
    { id: 'i2', type: 'insight', title: 'The LLC (Limited Liability Company)', content: 'An LLC is a legal forcefield. It acts as a separate "person" under the law. It creates a firewall between your personal assets and your business liabilities.'
    },
    { id: 'i3', type: 'example', title: 'Compartmentalization', content: 'Pros don\'t put 10 rental properties in one LLC. They put each property in its own separate LLC. If Property A gets sued, the lawsuit cannot touch Property B, C, or D.'
    },
    { id: 'i4', type: 'exercise', title: 'Asset Protection', content: 'Why do wealthy investors put their rental properties inside an LLC rather than owning them in their own name?', options: ['Because LLCs do not pay any taxes.', 'To create a "Corporate Veil" that legally protects their personal life savings from lawsuits directed at the property.', 'Because banks require it.'], correctAnswer: 'To create a "Corporate Veil" that legally protects their personal life savings from lawsuits directed at the property.'
    },
    { id: 'i5', type: 'concept', title: 'The S-Corporation', content: 'An advanced tax structure for Business Owners. If you are an LLC making $100k, you pay 15.3% Self-Employment Tax on ALL of it. An S-Corp allows you to pay yourself a "reasonable salary" (e.g., $50k) and take the rest ($50k) as a "Distribution", completely dodging the 15.3% tax on the distribution.'
    },
    { id: 'i6', type: 'insight', title: 'The Salary/Distribution Split', content: 'By splitting your income in an S-Corp, you can legally save thousands of dollars a year in taxes. However, it requires running payroll and filing a separate corporate tax return.'
    },
    { id: 'i7', type: 'exercise', title: 'Corporate Tax Strategy', content: 'What is the primary financial benefit of electing S-Corporation tax status for a highly profitable business?', options: ['It allows you to sell the business.', 'It allows you to split your income between a W-2 Salary and a Distribution, legally avoiding the 15.3% Self-Employment tax on the Distribution portion.', 'It prevents lawsuits entirely.'], correctAnswer: 'It allows you to split your income between a W-2 Salary and a Distribution, legally avoiding the 15.3% Self-Employment tax on the Distribution portion.'
    },
    { id: 'i8', type: 'concept', title: 'Trusts', content: 'An LLC protects your assets while you are alive. A Trust protects your assets after you die. It is a legal entity that holds your assets for the benefit of your heirs, bypassing the incredibly slow and expensive probate court process.'
    },
    { id: 'i9', type: 'insight', title: 'The Revocable Living Trust', content: 'You create it while alive. You control everything. When you die, the Trust instantly and privately transfers your house and money to your kids, without a judge getting involved or taking a cut.'
    },
    { id: 'i10', type: 'concept', title: 'The Holding Company Structure', content: 'The ultimate boss-level setup. You create a Wyoming LLC (The Holding Company) that you own anonymously. The Holding Company then owns the 5 different local LLCs that hold your businesses and properties. Absolute privacy and maximum protection.'
    },
    { id: 'i11', type: 'exercise', title: 'Estate Planning', content: 'What is the main purpose of placing your assets into a Revocable Living Trust?', options: ['To hide money from the IRS.', 'To ensure your assets transfer smoothly and privately to your heirs upon death, bypassing the expensive and public Probate Court.', 'To get a higher credit score.'], correctAnswer: 'To ensure your assets transfer smoothly and privately to your heirs upon death, bypassing the expensive and public Probate Court.'
    },
    { id: 'i12', type: 'concept', title: 'Geo-Arbitrage', content: 'Earning money in a strong currency (USD), but living in a country with a weak currency and low cost of living (Thailand, Colombia). You mathematically multiply your wealth without actually earning more.'
    },
    { id: 'i13', type: 'insight', title: 'The Remote Advantage', content: 'If you make $5k/month in New York City, you are broke. If you make $5k/month running an online business from Bali, you live like a king. Your geographic location dictates your purchasing power.'
    },
    { id: 'i14', type: 'concept', title: 'Tax Havens', content: 'Puerto Rico (Act 60) or Dubai. If you run a location-independent online business, you can legally move your residence to a tax haven and pay 0% capital gains and near 0% income tax.'
    },
    { id: 'i15', type: 'warning', title: 'The Exit Tax', content: 'If you try to renounce your U.S. Citizenship to avoid taxes forever, the IRS will hit you with an "Exit Tax"—they calculate the unrealized gain of everything you own and tax it instantly as you walk out the door.'
    },
    { id: 'i16', type: 'exercise', title: 'Location Independence', content: 'What is "Geo-Arbitrage"?', options: ['Trading foreign stocks.', 'Earning income in a strong currency while living in a location with a much lower cost of living, instantly magnifying your purchasing power.', 'Buying real estate overseas.'], correctAnswer: 'Earning income in a strong currency while living in a location with a much lower cost of living, instantly magnifying your purchasing power.'
    },
    { id: 'i17', type: 'concept', title: 'The Solo 401(k)', content: 'If you are self-employed with no employees, you can open a Solo 401(k). It allows you to legally shelter massive amounts of money (up to $66,000+ a year) from taxes, compared to the tiny $6,500 limit of an IRA.'
    },
    { id: 'i18', type: 'insight', title: 'The Self-Directed IRA', content: 'Normal retirement accounts force you to buy stocks. A Self-Directed IRA allows you to use your tax-sheltered retirement money to buy Real Estate, Crypto, or Private Equity.'
    },
    { id: 'i19', type: 'concept', title: 'The Roth Conversion Ladder', content: 'You want to retire early at 40, but your money is locked in a 401(k) until age 59.5. The Roth Ladder is a multi-year tax loophole that allows you to slowly convert the funds and access them early completely penalty-free.'
    },
    { id: 'i20', type: 'exercise', title: 'Retirement Vehicles', content: 'What is the massive advantage of a Self-Directed IRA?', options: ['It pays you cash every week.', 'It allows you to use your tax-sheltered retirement funds to buy alternative assets like Real Estate or Crypto, instead of just Wall Street stocks.', 'It prevents the market from crashing.'], correctAnswer: 'It allows you to use your tax-sheltered retirement funds to buy alternative assets like Real Estate or Crypto, instead of just Wall Street stocks.'
    },
    { id: 'i21', type: 'concept', title: 'Infinite Banking (Whole Life Insurance)', content: 'A controversial strategy used by the ultra-wealthy. You overfund a specialized Whole Life Insurance policy. The policy grows tax-free. You then take a loan AGAINST the policy to buy Real Estate.'
    },
    { id: 'i22', type: 'insight', title: 'Double Dipping', content: 'Your money is still growing inside the insurance policy at 5%, but you also used the loan to buy a house making 10%. When you die, the massive death benefit pays off the loan, and your kids get the rest tax-free. You became your own bank.'
    },
    { id: 'i23', type: 'warning', title: 'The Fees', content: 'Whole Life insurance policies have massive, front-loaded fees. If it is not structured perfectly by a professional, it is one of the worst financial products you can buy.'
    },
    { id: 'i24', type: 'exercise', title: 'Alternative Financing', content: 'In the "Infinite Banking" concept, how does an investor use a Whole Life Insurance policy?', options: ['They sell the policy to a bank.', 'They treat the policy\'s cash value as a personal bank, borrowing against it tax-free to fund other investments while the policy continues to grow.', 'They cancel the policy to buy stocks.'], correctAnswer: 'They treat the policy\'s cash value as a personal bank, borrowing against it tax-free to fund other investments while the policy continues to grow.'
    },
    { id: 'i25', type: 'concept', title: 'Buy, Borrow, Die', content: 'The ultimate billionaire tax strategy. 1. BUY assets (Real Estate/Stocks). 2. When they go up, do not sell them (selling triggers taxes). Instead, BORROW money from a bank using the assets as collateral. The loan is tax-free cash.'
    },
    { id: 'i26', type: 'insight', title: 'The Death Loop', content: '3. You live off the tax-free loan. When you DIE, your kids inherit the assets with a "Step-Up in Basis" (wiping out all the taxable gains). They sell a tiny fraction of the assets, pay off the loan, and keep the rest entirely tax-free.'
    },
    { id: 'i27', type: 'exercise', title: 'The Billionaire Loophole', content: 'In the "Buy, Borrow, Die" strategy, why do billionaires borrow against their assets instead of just selling them?', options: ['Because borrowing is faster.', 'Because selling triggers massive Capital Gains taxes, whereas borrowed loan money is 100% tax-free income.', 'Because banks force them to.'], correctAnswer: 'Because selling triggers massive Capital Gains taxes, whereas borrowed loan money is 100% tax-free income.'
    },
    { id: 'i28', type: 'concept', title: 'Asymmetric Information', content: 'The wealthy pay $10,000 for a great CPA, and that CPA saves them $100,000 in taxes. Amateurs use TurboTax to save $50, and miss out on $20,000 in legal deductions. Pay for elite knowledge.'
    },
    { id: 'i29', type: 'concept', title: 'Summary', content: 'Making money is only 50% of the game. Shielding it from lawsuits, sheltering it from taxes, and structuring it for your heirs is the other 50%. The legal system rewards the prepared.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Entity Structuring in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You own a highly profitable e-commerce business making $200,000 a year. You operate as a Sole Proprietor. You sell a defective product and a customer sues you for $1 Million.",
        startingBalance: 200000,
        choices: [
          { text: "Apologize and hope they drop the lawsuit.", result: -200000, feedback: "Because you were a Sole Proprietor, you had no Corporate Veil! The customer won the lawsuit, took your business, and then legally seized your personal life savings and your house to satisfy the $1M judgment. You are ruined." },
          { text: "Quickly transfer all your money to a friend's bank account.", result: -200000, feedback: "That is called 'Fraudulent Conveyance'. The judge reversed the transfers, seized your money, and you are now facing criminal charges." },
          { text: "If you had set up an LLC beforehand, the lawsuit would be contained.", result: 0, feedback: "Pro insight. If you had spent $500 to form an LLC, the lawsuit could only target the assets inside the business. Your personal savings, your house, and your family's future would be 100% legally protected by the Corporate Veil." }
        ]
      }
    }
  ]
};
