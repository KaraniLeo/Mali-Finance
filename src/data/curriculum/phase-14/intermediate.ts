import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p14-intermediate',
  title: 'Real Estate Math & Commercial Valuation',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Numbers Game', content: 'Amateurs buy real estate based on emotion ("It has a beautiful kitchen!"). Pros buy real estate based on spreadsheets. If the math doesn\'t work, you do not buy the property.'
    },
    { id: 'i2', type: 'insight', title: 'Gross Rent Multiplier (GRM)', content: 'A quick back-of-the-napkin math formula. Property Price / Annual Rent. If a $500k house rents for $50k a year, the GRM is 10. A lower GRM means the property generates more rent relative to its price.'
    },
    { id: 'i3', type: 'example', title: 'The 1% Rule', content: 'A classic rule of thumb. If a property costs $200,000, it should rent for at least $2,000 a month (1%). If it only rents for $1,000 a month (0.5%), it will likely have negative cash flow after expenses.'
    },
    { id: 'i4', type: 'exercise', title: 'Quick Math', content: 'What is the purpose of the "1% Rule" in Real Estate investing?', options: ['To calculate taxes.', 'It is a quick screening tool to instantly filter out properties that will likely fail to generate positive cash flow.', 'To determine the interest rate.'], correctAnswer: 'It is a quick screening tool to instantly filter out properties that will likely fail to generate positive cash flow.'
    },
    { id: 'i5', type: 'concept', title: 'Net Operating Income (NOI)', content: 'The most important metric in Commercial Real Estate. NOI = Total Income (Rent) minus Total Operating Expenses (Taxes, Insurance, Maintenance, Vacancy). Note: NOI does NOT include your mortgage payment.'
    },
    { id: 'i6', type: 'insight', title: 'Why exclude the Mortgage?', content: 'Because different investors use different leverage. A billionaire buys the building in cash (no mortgage). You buy it with a loan. The NOI measures the raw performance of the building itself, regardless of who owns it or how it was financed.'
    },
    { id: 'i7', type: 'exercise', title: 'NOI Mechanics', content: 'When calculating the Net Operating Income (NOI) of a property, which expense is specifically EXCLUDED?', options: ['Property Taxes.', 'Your monthly Mortgage/Debt payment.', 'Maintenance costs.'], correctAnswer: 'Your monthly Mortgage/Debt payment.'
    },
    { id: 'i8', type: 'concept', title: 'Cap Rate (Capitalization Rate)', content: 'Cap Rate = NOI / Property Price. If a $1 Million building generates $100k in NOI, the Cap Rate is 10%. It represents your annual return if you bought the building with 100% cash.'
    },
    { id: 'i9', type: 'insight', title: 'Cap Rates measure Risk', content: 'A high Cap Rate (10%) means high cash flow, but usually signifies a risky, dangerous neighborhood. A low Cap Rate (3%) means low cash flow, but signifies a highly desirable, extremely safe neighborhood.'
    },
    { id: 'i10', type: 'example', title: 'Forcing Appreciation', content: 'In residential real estate, value is based on comparable house sales (Comps). In Commercial real estate, Value = NOI / Cap Rate. Therefore, if you increase the NOI (by raising rent), you mathematically force the building\'s value to skyrocket, regardless of what the market is doing.'
    },
    { id: 'i11', type: 'exercise', title: 'Commercial Valuation', content: 'How do you legally force massive appreciation in a Commercial Real Estate building?', options: ['By painting it blue.', 'By increasing the Net Operating Income (NOI), because Commercial buildings are valued strictly on the cash flow they produce.', 'By asking the bank.'], correctAnswer: 'By increasing the Net Operating Income (NOI), because Commercial buildings are valued strictly on the cash flow they produce.'
    },
    { id: 'i12', type: 'concept', title: 'Cash on Cash Return (CoC)', content: 'CoC = Annual Pre-Tax Cash Flow / Total Cash Invested. This is the true metric of your leverage. It tells you exactly what percentage return you are making on the actual cash that left your {{INTERNATIONAL:bank account|KENYA:bank account or M-PESA wallet}}.'
    },
    { id: 'i13', type: 'insight', title: 'The Infinite Return', content: 'If you buy a house, renovate it, and the bank appraises it higher, you can refinance and pull 100% of your original cash back out. Your money is back in your pocket, but you still own the cash-flowing house. Your CoC return is mathematically infinite.'
    },
    { id: 'i14', type: 'concept', title: 'The BRRRR Method', content: 'Buy, Rehab, Rent, Refinance, Repeat. The ultimate wealth-building strategy. You buy a distressed property, fix it to force appreciation, rent it out, refinance to pull your cash out, and use that same cash to buy the next property. It is a legal money glitch.'
    },
    { id: 'i15', type: 'warning', title: 'The BRRRR Trap', content: 'If you do a BRRRR, and the housing market crashes right before you Refinance, the bank will refuse to appraise it higher. Your cash is trapped in the house, and you cannot buy the next one. The glitch stops.'
    },
    { id: 'i16', type: 'exercise', title: 'Advanced Strategies', content: 'What is the goal of the BRRRR Real Estate strategy?', options: ['To live in a nice house.', 'To buy, renovate, rent, and refinance a property, allowing you to pull your original capital out and endlessly recycle it into new properties.', 'To pay the most taxes possible.'], correctAnswer: 'To buy, renovate, rent, and refinance a property, allowing you to pull your original capital out and endlessly recycle it into new properties.'
    },
    { id: 'i17', type: 'concept', title: 'The 1031 Exchange', content: 'A legal tax loophole used by the ultra-wealthy. When you sell a profitable rental property, you normally pay massive Capital Gains tax. A 1031 Exchange allows you to roll the profit into a new, larger property without paying a single dime in taxes.'
    },
    { id: 'i18', type: 'insight', title: 'Swap Till You Drop', content: 'You buy a duplex. 1031 exchange it into a fourplex. 1031 exchange that into an apartment building. You defer taxes your entire life. When you die, your kids inherit it completely tax-free (The Step-Up in Basis). It is the ultimate generational wealth hack.'
    },
    { id: 'i19', type: 'exercise', title: 'Tax Strategy', content: 'What does a 1031 Exchange allow a real estate investor to do?', options: ['Swap a house for a car.', 'Sell a profitable rental property and reinvest the proceeds into a new, larger property while legally deferring 100% of the capital gains tax.', 'Avoid paying rent.'], correctAnswer: 'Sell a profitable rental property and reinvest the proceeds into a new, larger property while legally deferring 100% of the capital gains tax.'
    },
    { id: 'i20', type: 'concept', title: 'Depreciation (The Ghost Expense)', content: 'The IRS allows you to deduct the "wear and tear" of your building from your taxes over 27.5 years. It is a paper loss. You didn\'t actually spend the money, but the IRS lets you pretend you did, shielding your rental income from taxes.'
    },
    { id: 'i21', type: 'example', title: 'Tax-Free Income', content: 'You make $20,000 in rental profit. But you claim $25,000 in Depreciation. On paper, you "lost" $5,000. You pay zero taxes on the $20,000 you actually pocketed. Real estate is the most tax-advantaged asset class in existence.'
    },
    { id: 'i22', type: 'concept', title: 'Syndications', content: 'You want to buy a $10 Million apartment complex, but you only have $100k. A Syndicator pools money from 50 investors ($100k each) to buy the building. You own a fractional share and receive passive checks.'
    },
    { id: 'i23', type: 'warning', title: 'The Sponsor Risk', content: 'In a syndication, you have zero control. If the main operator (The Sponsor) is incompetent, they will bankrupt the building, and you will lose your entire $100k.'
    },
    { id: 'i24', type: 'concept', title: 'REITs (Real Estate Investment Trusts)', content: 'A company that owns or finances income-producing real estate across a range of property sectors. You buy shares of the REIT on the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} just like a normal stock.'
    },
    { id: 'i25', type: 'insight', title: 'Liquid Real Estate', content: 'REITs are perfect if you want real estate exposure but don\'t want to fix toilets. By law, REITs must pay out 90% of their taxable income to shareholders as dividends. It is highly liquid, passive cash flow.'
    },
    { id: 'i26', type: 'exercise', title: 'Liquid Assets', content: 'What is the primary advantage of investing in a REIT rather than buying a physical rental property?', options: ['You get to live in the REIT.', 'It provides fully passive, highly liquid exposure to real estate dividends without the headaches of property management and illiquidity.', 'It avoids taxes.'], correctAnswer: 'It provides fully passive, highly liquid exposure to real estate dividends without the headaches of property management and illiquidity.'
    },
    { id: 'i27', type: 'concept', title: 'Commercial Leases (NNN)', content: 'In a residential lease, the landlord pays the taxes and insurance. In a commercial Triple Net Lease (NNN), the tenant (e.g., Starbucks) pays the rent, PLUS the property taxes, insurance, and maintenance. It is truly passive.'
    },
    { id: 'i28', type: 'insight', title: 'The Retail Apocalypse', content: 'Commercial real estate is shifting. Strip malls are dying due to Amazon. But Warehouses (Industrial) are booming because Amazon needs places to store the boxes. Always follow macro consumer trends.'
    },
    { id: 'i29', type: 'concept', title: 'Summary', content: 'Real Estate is a math equation wrapped in a tax loophole. Master the formulas (NOI, Cap Rate, CoC), understand the tax code (1031, Depreciation), and you will build an empire.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Commercial Valuation and Cap Rates in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You buy a 10-unit apartment building for $1 Million at a 6% Cap Rate. It currently generates $60,000 in Net Operating Income (NOI). The rents are way below market value. You raise the rent by $100 per unit, increasing the NOI by $12,000 a year.",
        startingBalance: 1000000,
        choices: [
          { text: "Do nothing. The building is still worth $1 Million.", result: -10000, feedback: "You failed to understand Commercial Math! Value = NOI / Cap Rate. By raising the NOI, you drastically increased the value of the building. You are leaving massive equity on the table." },
          { text: "Go to the bank and show them the new NOI ($72k). The building is now mathematically worth $1.2 Million ($72k / 0.06). Refinance and pull out $200,000 in tax-free cash.", result: 200000, feedback: "Pro execution. You forced appreciation. By understanding that commercial value is strictly tied to NOI, a simple $100 rent bump created $200,000 in massive, tax-free equity. You used that cash to buy another building." },
          { text: "Sell the building immediately for $1 Million.", result: -200000, feedback: "You just sold a $1.2 Million building for $1 Million. You gave away $200k in forced equity to the next buyer because you didn't do the math." }
        ]
      }
    }
  ]
};
