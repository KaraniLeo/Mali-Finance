import { Lesson } from '../../../types/curriculum';

export const proLesson: Lesson = {
  id: 'p14-pro',
  title: 'Real Estate Syndications & Institutional Capital',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Capital Stack', content: 'In massive commercial deals ($50M+), the money isn\'t just "a loan and a downpayment". The Capital Stack refers to the different layers of funding: Senior Debt (the main bank loan), Mezzanine Debt, Preferred Equity, and Common Equity.'
    },
    { id: 'p2', type: 'insight', title: 'Risk and Reward Hierarchy', content: 'The higher you are on the Capital Stack (Senior Debt), the safer your money is, but the lower your return (e.g., 5%). The lower you are (Common Equity), the more risk you take if the deal goes bad, but you capture all the unlimited upside.'
    },
    { id: 'p3', type: 'example', title: 'The Wipeout', content: 'If a $100M building drops in value to $70M, the Senior Debt ($60M) is perfectly safe. The Common Equity ($30M) is completely wiped out to zero. Know your place in the stack.'
    },
    { id: 'p4', type: 'exercise', title: 'Capital Structure', content: 'In a massive commercial real estate deal, which layer of the Capital Stack takes on the most risk but captures the highest potential upside?', options: ['The Senior Debt (Bank Loan).', 'The Common Equity (The Investors/Sponsors).', 'The Mezzanine Debt.'], correctAnswer: 'The Common Equity (The Investors/Sponsors).'
    },
    { id: 'p5', type: 'concept', title: 'The General Partner (GP) vs Limited Partner (LP)', content: 'In a syndication, the GP (Sponsor) finds the deal, signs the loan, and manages the building. The LPs (Investors) just write the checks and provide the capital. LPs have no voting rights and no liability beyond their initial investment.'
    },
    { id: 'p6', type: 'insight', title: 'The Promote (Carried Interest)', content: 'How does the GP get rich? They charge a "Promote". After the LPs receive their promised return (e.g., 8%), the GP takes a massive cut (often 20-30%) of all the remaining profit, even though the GP put in very little of their own cash.'
    },
    { id: 'p7', type: 'concept', title: 'The Preferred Return (Pref)', content: 'A mechanism to protect LPs. The GP promises that the first 8% of all cash flow goes entirely to the LPs. The GP does not get paid a single dime in profit until the LPs hit their 8% hurdle.'
    },
    { id: 'p8', type: 'exercise', title: 'Syndication Mechanics', content: 'What is a "Preferred Return" in a real estate syndication?', options: ['A tax on the investors.', 'A hurdle rate ensuring the Limited Partners (investors) get paid their promised return first before the General Partner (sponsor) shares in the profits.', 'A fee paid to the bank.'], correctAnswer: 'A hurdle rate ensuring the Limited Partners (investors) get paid their promised return first before the General Partner (sponsor) shares in the profits.'
    },
    { id: 'p9', type: 'concept', title: 'Value-Add Syndications', content: 'The GP buys a 1980s apartment complex. They spend $10k per unit upgrading the kitchens and floors. This allows them to raise rents by $300 a month. They drastically increase the NOI, force millions in appreciation, and sell the building 5 years later.'
    },
    { id: 'p10', type: 'warning', title: 'Cap Rate Compression Risk', content: 'Many GPs look like geniuses simply because they bought a building when Cap Rates were 6% and sold it when Cap Rates dropped to 4%. When interest rates rise and Cap Rates expand, those same GPs will go bankrupt because the math reverses.'
    },
    { id: 'p11', type: 'concept', title: 'Cost Segregation Studies', content: 'A devastatingly powerful tax strategy. Normally, you depreciate a building over 27.5 years. A Cost Segregation study hires engineers to identify every light fixture, carpet, and appliance, allowing you to depreciate them instantly in Year 1.'
    },
    { id: 'p12', type: 'insight', title: 'Bonus Depreciation', content: 'By front-loading 27 years of depreciation into Year 1, a $100k investment might generate a $80k paper loss immediately. You use this massive paper loss to completely wipe out your actual income taxes for the year.'
    },
    { id: 'p13', type: 'exercise', title: 'Advanced Taxes', content: 'What is the primary goal of a Cost Segregation study?', options: ['To make the building look prettier.', 'To radically accelerate the depreciation schedule of specific building components, creating massive Year 1 paper losses to wipe out your tax bill.', 'To increase property taxes.'], correctAnswer: 'To radically accelerate the depreciation schedule of specific building components, creating massive Year 1 paper losses to wipe out your tax bill.'
    },
    { id: 'p14', type: 'concept', title: 'Debt Service Coverage Ratio (DSCR)', content: 'The metric banks use to approve commercial loans. DSCR = NOI / Annual Debt Payment. A DSCR of 1.0 means the building makes exactly enough money to pay the mortgage. Banks usually require a DSCR of 1.25 or higher to provide a safety cushion.'
    },
    { id: 'p15', type: 'warning', title: 'The Refinance Cliff', content: 'Commercial loans are not 30-year fixed. They often "balloon" (come due) in 5 years. If the market crashes and interest rates spike right when your 5-year loan expires, you cannot refinance. You must hand the keys back to the bank.'
    },
    { id: 'p16', type: 'concept', title: 'Hard Money Loans', content: 'If you want to flip a house, a traditional bank moves too slow (30 days). A Hard Money Lender will give you the cash in 3 days, but they charge loan shark interest rates (12% + massive upfront fees). It is short-term, high-risk capital.'
    },
    { id: 'p17', type: 'insight', title: 'The Speed of Money', content: 'Pros use Hard Money because they need speed to beat other buyers to a deal. They pay the exorbitant 12% interest for 3 months, fix the house, and immediately refinance into a cheap 5% bank loan.'
    },
    { id: 'p18', type: 'exercise', title: 'Financing', content: 'Why do real estate flippers use "Hard Money" lenders despite the incredibly high interest rates?', options: ['Because they have bad credit.', 'Because Hard Money lenders prioritize the value of the asset and provide capital incredibly fast, allowing investors to secure competitive deals.', 'Because it is tax-free.'], correctAnswer: 'Because Hard Money lenders prioritize the value of the asset and provide capital incredibly fast, allowing investors to secure competitive deals.'
    },
    { id: 'p19', type: 'concept', title: 'Distressed Debt (Note Investing)', content: 'You don\'t have to buy the house. You can buy the Mortgage. If a homeowner stops paying their mortgage, the bank will sell that "Non-Performing Note" to an investor for pennies on the dollar.'
    },
    { id: 'p20', type: 'insight', title: 'Being the Bank', content: 'You buy a $100k mortgage for $40k. You can either aggressively foreclose on the house (taking a $100k house for $40k), or you can modify the loan and let the homeowner stay, turning the $40k into a massive, high-yield cash flow stream.'
    },
    { id: 'p21', type: 'concept', title: 'Private Equity Real Estate', content: 'Massive Wall Street firms (like Blackstone) raising billions of dollars to buy up entire neighborhoods of Single Family Homes. They outbid retail buyers with all-cash offers and turn the homes into permanent rentals.'
    },
    { id: 'p22', type: 'warning', title: 'The Institutionalization of Housing', content: 'Wall Street realized that housing is a basic human necessity with inelastic demand. By monopolizing the supply of entry-level homes, they guarantee infinite, inflation-adjusted cash flow.'
    },
    { id: 'p23', type: 'exercise', title: 'Macro Trends', content: 'What is the long-term impact of Private Equity firms buying massive amounts of Single Family Homes?', options: ['Houses become cheaper for everyone.', 'It permanently removes homeownership inventory from the market, driving up prices and forcing younger generations into a permanent renter class.', 'They donate the houses to charity.'], correctAnswer: 'It permanently removes homeownership inventory from the market, driving up prices and forcing younger generations into a permanent renter class.'
    },
    { id: 'p24', type: 'concept', title: 'Opportunity Zones', content: 'A federal tax program. If you take your capital gains from selling a business and invest it into developing real estate in a low-income "Opportunity Zone", you pay zero taxes on the new investment if you hold it for 10 years.'
    },
    { id: 'p25', type: 'insight', title: 'Gentrification Mechanics', content: 'Opportunity Zones are the financial engine behind gentrification. Billions of tax-free dollars flood into impoverished neighborhoods, rapidly building luxury condos and displacing the original residents.'
    },
    { id: 'p26', type: 'concept', title: 'Subject-To Financing', content: 'An advanced, legal ninja tactic. You find a seller who is about to be foreclosed on. You take the deed to their house, but leave THEIR original mortgage in place. You just start making their payments. You acquire the house with zero bank qualification.'
    },
    { id: 'p27', type: 'warning', title: 'The Due-on-Sale Clause', content: 'If the bank finds out the deed transferred to you, they can trigger the "Due on Sale" clause and demand the entire $300k mortgage be paid in full immediately. It is high-risk, high-reward maneuvering.'
    },
    { id: 'p28', type: 'insight', title: 'The Ultimate Truth of Real Estate', content: 'Real Estate is not about bricks and wood. It is a game of managing debt, exploiting the tax code, and understanding macroeconomic cycles.'
    },
    { id: 'p29', type: 'concept', title: 'Summary', content: 'From single-family flips to massive commercial syndications, Real Estate is the bedrock of generational wealth. It requires leverage, patience, and absolute mathematical precision.'
    },
    { id: 'p30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Commercial Debt and the Refinance Cliff in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You bought a $10M apartment building 5 years ago. You used a 5-year balloon loan at 3% interest. The loan is due next month. You must refinance. However, the Fed just hiked rates. The new interest rate for your refinance will be 8%.",
        startingBalance: 10000000,
        choices: [
          { text: "Just refinance at 8%. The building makes good money, it will be fine.", result: -10000000, feedback: "You didn't do the DSCR math! At 8% interest, your new mortgage payment doubled. Your Net Operating Income (NOI) is no longer high enough to cover the new massive debt payment. The bank refused to refinance you. You defaulted and lost the entire $10M building." },
          { text: "Aggressively sell the building before the balloon payment hits.", result: 5000000, feedback: "Pro execution. You saw the 'Refinance Cliff' coming. You knew the math wouldn't work at 8%. You sold the building, secured your 5-year equity profit, and passed the debt bomb to someone else." },
          { text: "Ask the bank for an extension.", result: -5000000, feedback: "Banks are merciless in high-interest rate environments. They denied the extension, foreclosed on your property, and wiped out your entire equity stack." }
        ]
      }
    }
  ]
};
