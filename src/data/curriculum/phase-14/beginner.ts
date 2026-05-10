import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p14-beginner',
  title: 'Intro to Real Estate & Hard Assets',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'What is a Hard Asset?', content: 'A Hard Asset is something physical that has intrinsic value. Real estate, gold, silver, oil, and land are hard assets. You can touch them. They cannot be printed by a central bank.'
    },
    { id: 'b2', type: 'insight', title: 'The Inflation Hedge', content: 'Why do rich people buy hard assets? Because when the government prints trillions of paper dollars, the value of the paper drops (inflation). But the physical house or gold bar doesn\'t change. It just requires more worthless paper dollars to buy it, meaning its price skyrockets.'
    },
    { id: 'b3', type: 'example', title: 'The Century Hedge', content: 'In 1920, an ounce of gold bought a high-end men\'s suit. Today, an ounce of gold still buys a high-end men\'s suit. The gold didn\'t change; the dollar just collapsed in purchasing power.'
    },
    { id: 'b4', type: 'exercise', title: 'Hard Assets', content: 'Why are Hard Assets considered a hedge against inflation?', options: ['Because the government bans inflation on houses.', 'Because they are physically scarce and cannot be printed by central banks, meaning their price rises as paper money loses value.', 'Because they are lightweight.'], correctAnswer: 'Because they are physically scarce and cannot be printed by central banks, meaning their price rises as paper money loses value.'
    },
    { id: 'b5', type: 'concept', title: 'Real Estate: The Ultimate Wealth Builder', content: 'Real Estate is historically the #1 creator of millionaires. It provides two things simultaneously: Capital Appreciation (the house goes up in value) and Cash Flow (the tenant pays you rent).'
    },
    { id: 'b6', type: 'insight', title: 'The Power of Leverage', content: 'If you want to buy $500,000 of stocks, you need $500,000 in cash. But to buy a $500,000 house, the bank will let you put down only $100,000 (20%) and they will lend you the other $400,000.'
    },
    { id: 'b7', type: 'example', title: 'Leveraged Returns', content: 'If that $500k house goes up 10%, it is now worth $550k. You made $50,000 in profit. But because you only invested $100k of your own cash, your actual Return on Investment (ROI) is a massive 50%, not 10%.'
    },
    { id: 'b8', type: 'exercise', title: 'Leverage Mechanics', content: 'What makes Real Estate uniquely powerful compared to buying stocks in cash?', options: ['It is easier to buy.', 'Banks will safely lend you massive amounts of leverage (mortgages) against the asset, magnifying your Return on Investment.', 'Houses never break.'], correctAnswer: 'Banks will safely lend you massive amounts of leverage (mortgages) against the asset, magnifying your Return on Investment.'
    },
    { id: 'b9', type: 'concept', title: 'Cash Flow', content: 'Cash flow is the holy grail. It is the money left over after the tenant pays the rent, and you pay the mortgage, taxes, insurance, and maintenance. If the number is positive, the asset pays YOU to own it.'
    },
    { id: 'b10', type: 'insight', title: 'The Tenant Pays the Debt', content: 'This is the magic of rental properties. The bank loaned you $400,000. But YOU aren\'t paying it back. The tenant is going to work every day to pay the rent, which pays off your massive debt for you.'
    },
    { id: 'b11', type: 'warning', title: 'Negative Cash Flow', content: 'If the rent is $2,000, but the mortgage and expenses are $2,500, you have negative cash flow. You are losing $500 a month. You are bleeding out, hoping the house goes up in value to save you. This is dangerous speculation.'
    },
    { id: 'b12', type: 'exercise', title: 'Real Estate Cash Flow', content: 'What is the ideal scenario for a rental property?', options: ['Negative cash flow, relying purely on the house doubling in value.', 'Positive cash flow, where the tenant pays off your mortgage AND puts profit in your pocket every month.', 'Leaving the house empty.'], correctAnswer: 'Positive cash flow, where the tenant pays off your mortgage AND puts profit in your pocket every month.'
    },
    { id: 'b13', type: 'concept', title: 'The Mortgage (Good Debt)', content: 'Consumer debt (credit cards, car loans) makes you poor because it buys depreciating assets. A Mortgage is "Good Debt" because it buys an appreciating asset that generates income.'
    },
    { id: 'b14', type: 'insight', title: 'Inflating Away Debt', content: 'If you take a 30-year fixed mortgage, your payment stays the same for 30 years. But because of inflation, the "value" of that $2,000 payment drops every year. In year 25, $2,000 will feel like pennies, but the bank is forced to accept it.'
    },
    { id: 'b15', type: 'exercise', title: 'Debt Mechanics', content: 'Why is a 30-year fixed-rate mortgage considered a massive advantage during high inflation?', options: ['Because the bank will forgive the loan.', 'Because inflation destroys the purchasing power of money, meaning you get to pay back a massive historical debt using cheaper, devalued future dollars.', 'Because inflation lowers house prices.'], correctAnswer: 'Because inflation destroys the purchasing power of money, meaning you get to pay back a massive historical debt using cheaper, devalued future dollars.'
    },
    { id: 'b16', type: 'concept', title: 'Types of Real Estate', content: '1. Single Family Homes (SFH): A standard house. 2. Multi-Family: Duplexes, Fourplexes, or massive apartment complexes. 3. Commercial: Office buildings, retail strip malls, warehouses.'
    },
    { id: 'b17', type: 'insight', title: 'The Multi-Family Advantage', content: 'If you own a Single Family House and the tenant moves out, your income drops to $0 (100% vacancy). If you own a Fourplex and one tenant moves out, you still have 3 tenants paying the mortgage (25% vacancy).'
    },
    { id: 'b18', type: 'concept', title: 'House Hacking', content: 'The ultimate beginner strategy. You buy a Duplex or Fourplex. You live in one unit, and rent out the others. The tenants pay your entire mortgage. You live for free while building massive equity.'
    },
    { id: 'b19', type: 'exercise', title: 'Entry Strategies', content: 'What is "House Hacking"?', options: ['Illegally tapping into a neighbor\'s electricity.', 'Buying a multi-unit property, living in one unit, and renting the others out to completely cover your mortgage and living expenses.', 'Flipping a house on TV.'], correctAnswer: 'Buying a multi-unit property, living in one unit, and renting the others out to completely cover your mortgage and living expenses.'
    },
    { id: 'b20', type: 'concept', title: 'Flipping (Active Income)', content: 'You buy a broken house for cheap, spend $50k to renovate it, and sell it 3 months later for a massive profit. It is highly lucrative, but it is a full-time JOB. It is not passive investing.'
    },
    { id: 'b21', type: 'warning', title: 'The Flipping Trap', content: 'If the housing market crashes while you are halfway through the renovation, or if the contractor steals your money, you are trapped holding a massive, expensive debt with no way to sell.'
    },
    { id: 'b22', type: 'concept', title: 'Wholesaling', content: 'A strategy where you find a desperate seller, put their house under contract for $100k, and instantly sell that contract to a rich flipper for $110k, pocketing the $10k difference without ever actually buying the house or swinging a hammer.'
    },
    { id: 'b23', type: 'insight', title: 'The Barrier to Entry', content: 'Wholesaling is marketed as "No Money Down" real estate. It requires massive hustle, cold-calling, and sales skills. It is an active business, not an investment.'
    },
    { id: 'b24', type: 'exercise', title: 'Active vs Passive', content: 'Why is "Flipping" a house considered Active Income rather than a Passive Investment?', options: ['Because it is illegal.', 'Because it requires your constant time, labor, and project management to force the appreciation, and the income stops the moment you stop flipping.', 'Because houses are too heavy.'], correctAnswer: 'Because it requires your constant time, labor, and project management to force the appreciation, and the income stops the moment you stop flipping.'
    },
    { id: 'b25', type: 'concept', title: 'Location, Location, Location', content: 'You can fix an ugly kitchen. You cannot fix a terrible neighborhood. Real estate value is dictated 90% by the land it sits on, and the economic growth of the surrounding city.'
    },
    { id: 'b26', type: 'insight', title: 'Follow the Jobs', content: 'If a massive tech company announces they are building a new headquarters in a mid-sized city, buy real estate there instantly. 10,000 highly paid engineers will soon need houses, driving rents and values to the moon.'
    },
    { id: 'b27', type: 'concept', title: 'Property Management', content: 'The biggest myth of real estate is that it is "Passive". Fixing a toilet at 2 AM is not passive. Pro investors hire a Property Management company for 10% of the rent to handle the tenants and repairs. It turns the asset truly passive.'
    },
    { id: 'b28', type: 'warning', title: 'The Bad Tenant', content: 'A bad tenant will destroy your house, refuse to pay rent, and tie you up in court for 6 months while you try to legally evict them. Your entire profit margin relies on extreme, rigorous tenant screening.'
    },
    { id: 'b29', type: 'concept', title: 'Summary', content: 'Real estate is a get-rich-slow scheme. It requires massive capital, debt management, and patience. But once the snowball starts rolling, the wealth generation is mathematically unstoppable.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Leverage and House Hacking in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You have $50,000 saved. You want to get into Real Estate. A massive, luxury Single Family Home costs $500k. A beat-up Fourplex in a decent neighborhood costs $400k. A guru offers a $20k 'Flipping Masterclass'.",
        startingBalance: 50000,
        choices: [
          { text: "Use your $50k to put 10% down on the luxury Single Family Home and rent it out.", result: -10000, feedback: "You bought a luxury house with high leverage. The mortgage is huge, but you can only rent it to one family. When they moved out, you had to pay the massive $3k mortgage entirely out of pocket. You are bleeding cash." },
          { text: "Buy the $400k Fourplex using an FHA loan (3.5% down). Live in one unit, rent the other three.", result: 300000, feedback: "Pro execution. You 'House Hacked'. The rental income from the three tenants completely paid your mortgage. You lived for free, stacked your cash, and the property appreciated massively over the next 5 years." },
          { text: "Pay the guru $20k to learn how to flip houses with 'no money'.", result: -20000, feedback: "You got scammed. The guru vanished. You spent half your net worth on a PDF document instead of buying an actual hard asset." }
        ]
      }
    }
  ]
};
