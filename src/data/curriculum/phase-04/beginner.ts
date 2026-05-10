import { Lesson } from '../../../types/curriculum';
import { phase04Images } from '../phase-04-images';

export const beginnerLesson: Lesson = {
  id: 'p4-beginner',
  title: 'What is a Stock, Really?',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'Fractional Ownership', content: 'A stock is not just a ticker symbol moving up and down on a screen.\n\nIt represents fractional ownership of a living, breathing business.'
    },
    { id: 'b2', type: 'insight', title: 'The True Meaning of a Share', content: 'When you buy a share of Safaricom or Apple, you literally own a tiny piece of their factories, their patents, their bank accounts, and their future profits.'
    },
    { id: 'b3', type: 'concept', title: 'Why do Companies Issue Stock?', content: 'Companies need money to grow. They can either borrow money from a bank (Debt) or sell a piece of the company to the public (Equity).\n\nWhen they sell to the public for the first time, it is called an IPO.'
    },
    { id: 'b4', type: 'example', title: 'The Lemonade Stand', content: 'Imagine you have a lemonade stand worth $100. You want to expand, but you have no money. You sell 50% of the stand to a friend for $50.\n\nYou now have $50 to build a second stand, but your friend now gets 50% of all future profits.'
    },
    { id: 'b5', type: 'exercise', title: 'Ownership Check', content: 'When you buy a stock, what are you actually buying?', options: ['A lottery ticket.', 'A piece of paper guaranteed to go up.', 'A legal percentage of a real business.'], correctAnswer: 'A legal percentage of a real business.'
    },
    { id: 'b6', type: 'concept', title: 'The Stock Market', content: 'The stock market is simply an auction house where buyers and sellers agree on a price to trade these fractional ownership pieces.'
    },
    { id: 'b7', type: 'insight', title: 'The Market is Manic', content: 'In the short term, the stock market is a voting machine driven by emotion. In the long term, it is a weighing machine driven by actual business performance.'
    },
    { id: 'b8', type: 'concept', title: 'The Three Financial Statements', content: 'To evaluate a business, you cannot just look at the stock price. You must look at the company\'s report card.\n\nThere are three main statements: The Income Statement, The Balance Sheet, and The Cash Flow Statement.'
    },
    { id: 'b9', type: 'concept', title: 'The Income Statement', content: 'The Income Statement shows how much money a company made (Revenue) and how much it spent (Expenses) over a specific period of time.'
    },
    { id: 'b10', type: 'example', title: 'Top Line vs Bottom Line', content: 'Revenue is the "Top Line" (all money coming in).\n\nNet Income is the "Bottom Line" (what is left over after paying all bills, salaries, and taxes). This is the true Profit.'
    },
    { id: 'b11', type: 'warning', title: 'Revenue vs Profit Trap', content: 'Revenue is Vanity, Profit is Sanity.\n\nA company can have $1 Billion in revenue and still go bankrupt if their expenses are $1.1 Billion. Never buy a stock just because revenue is growing.'
    },
    { id: 'b12', type: 'exercise', title: 'The Sanity Check', content: 'Company A has $100M revenue and $90M expenses. Company B has $50M revenue and $20M expenses. Which is fundamentally more profitable?', options: ['Company A', 'Company B', 'They are equal'], correctAnswer: 'Company B'
    },
    { id: 'b13', type: 'concept', title: 'The Balance Sheet', content: 'The Balance Sheet shows what a company OWNS (Assets) and what a company OWES (Liabilities) at an exact snapshot in time.'
    },
    { id: 'b14', type: 'example', title: 'Assets', content: 'Assets include cash in the bank, inventory, factories, land, and patents.'
    },
    { id: 'b15', type: 'example', title: 'Liabilities', content: 'Liabilities include bank loans, unpaid bills, and bonds they have issued to investors.'
    },
    { id: 'b16', type: 'concept', title: 'Shareholders Equity', content: 'Assets minus Liabilities equals Equity. This is what is actually left over for the shareholders if the company were to liquidate today.'
    },
    { id: 'b17', type: 'exercise', title: 'Equity Calculation', content: 'If a company has $1M in assets and $600k in debt, what is the Shareholders Equity?', options: ['$1.6M', '$600k', '$400k'], correctAnswer: '$400k'
    },
    { id: 'b18', type: 'warning', title: 'The Debt Trap', content: 'A company with massive revenue but overwhelming debt is a ticking time bomb. When interest rates rise, their debt payments will crush their profits.'
    },
    { id: 'b19', type: 'concept', title: 'The Cash Flow Statement', content: 'The Cash Flow statement tracks the actual cash entering and leaving the bank account. It is the hardest statement for accountants to manipulate.'
    },
    { id: 'b20', type: 'insight', title: 'Cash is King', content: 'A company can look profitable on the Income Statement due to accounting tricks, but the Cash Flow statement reveals the raw truth of survival.'
    },
    { id: 'b21', type: 'concept', title: 'Dividends', content: 'When a company makes a profit, they can either reinvest it back into the business, or pay it out directly to shareholders as a cash reward. This reward is called a Dividend.'
    },
    { id: 'b22', type: 'example', title: 'The Dividend Snowball', content: 'If you own 1,000 shares of a stock that pays a $1 annual dividend per share, you get $1,000 a year for doing absolutely nothing. If you use that $1,000 to buy more shares, your next dividend will be even bigger.'
    },
    { id: 'b23', type: 'exercise', title: 'Dividend Reality', content: 'Do all companies pay dividends?', options: ['Yes, it is legally required.', 'No, growing companies usually reinvest the cash to expand instead.'], correctAnswer: 'No, growing companies usually reinvest the cash to expand instead.'
    },
    { id: 'b24', type: 'concept', title: 'Market Capitalization', content: 'Market Cap is the total value of the entire company on the stock market.\n\nCalculation: Stock Price × Total Number of Shares.'
    },
    { id: 'b25', type: 'warning', title: 'The "Cheap" Stock Illusion', content: 'A stock priced at $1 is not necessarily "cheaper" than a stock priced at $1,000.\n\nIf the $1 stock has 10 billion shares, the company is worth $10 Billion. If the $1,000 stock has 1 million shares, the company is only worth $1 Billion.'
    },
    { id: 'b26', type: 'exercise', title: 'Market Cap Math', content: 'Stock X is $5 with 1M shares. Stock Y is $10 with 100k shares. Which company is larger?', options: ['Stock X', 'Stock Y', 'They are equal'], correctAnswer: 'Stock X'
    },
    { id: 'b27', type: 'concept', title: 'Sectors and Industries', content: 'The market is broken down into sectors: Technology, Healthcare, Energy, Financials, etc. Different sectors perform better at different times in the economic cycle.'
    },
    { id: 'b28', type: 'insight', title: 'Defensive vs Cyclical', content: 'Defensive stocks (utilities, healthcare) do well even in recessions. Cyclical stocks (travel, luxury goods) get crushed in recessions but soar in booms.'
    },
    { id: 'b29', type: 'concept', title: 'Indexes (The S&P 500)', content: 'An index is a basket of top stocks. The S&P 500 holds the 500 largest companies in the US. Buying an index fund guarantees you match the market\'s performance without picking individual stocks.'
    },
    { id: 'b30', type: 'concept', title: 'Next Steps', content: 'Now that you understand the anatomy of a business, you need to learn how to value it. Move to the Intermediate lesson to learn Value Investing.', tool: 'budget'
    }
  ]
};
