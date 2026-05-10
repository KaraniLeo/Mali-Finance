import { Lesson } from '../../../types/curriculum';
import { phase04Images } from '../phase-04-images';

export const intermediateLesson: Lesson = {
  id: 'p4-intermediate',
  title: 'Valuation & Strategy Logic',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'Price vs Value', content: 'Price is what you pay for an asset on the open market. Value is what the asset is actually worth based on its ability to generate cash flow in the future.\n\nThey are rarely the exact same number.'
    },
    { id: 'i2', type: 'insight', title: 'The Goal of Value Investing', content: 'The entire goal of fundamental analysis is to find companies where the Price is significantly lower than the intrinsic Value, and wait for the market to correct its mistake.'
    },
    { id: 'i3', type: 'concept', title: 'P/E Ratio (Price-to-Earnings)', content: 'The P/E Ratio is the most common valuation metric. It tells you how much money you are paying for $1 of the company\'s earnings.\n\nCalculation: Stock Price / Earnings Per Share.'
    },
    { id: 'i4', type: 'example', title: 'Reading P/E Ratios', content: 'If a stock is $100 and it earns $5 per share, the P/E is 20.\n\nThis means it will take 20 years for the company to earn back the money you paid for the stock, assuming profits never grow.'
    },
    { id: 'i5', type: 'exercise', title: 'P/E Comparison', content: 'Company A has a P/E of 10. Company B has a P/E of 100. Assuming they are in the same industry, which stock is considered more "expensive" by the market?', options: ['Company A', 'Company B', 'They are priced equally.'], correctAnswer: 'Company B'
    },
    { id: 'i6', type: 'warning', title: 'The Growth Trap', content: 'A high P/E (like 100) means investors expect the company to grow massively in the future. If the company misses their growth target, the stock will crash violently as the P/E compresses.'
    },
    { id: 'i7', type: 'concept', title: 'Free Cash Flow (FCF)', content: 'Earnings (Net Income) can be manipulated by accountants. Free Cash Flow cannot.\n\nFCF is the cash left over after a company pays all operating expenses and capital expenditures (buying factories, etc).'
    },
    { id: 'i8', type: 'insight', title: 'The Ultimate Metric', content: 'Free Cash Flow is what allows a company to pay dividends, buy back stock, pay down debt, or acquire other companies. It is the lifeblood of shareholder returns.'
    },
    { id: 'i9', type: 'concept', title: 'Economic Moats', content: 'An Economic Moat is a competitive advantage that protects a company\'s profits from competitors. Like a castle with a moat, a wider moat means a safer business.'
    },
    { id: 'i10', type: 'example', title: 'Types of Moats', content: '- Brand Moat: Apple, Coca-Cola.\n- Network Effect: Facebook, Visa (more users = more value).\n- Switching Costs: Oracle, Microsoft (too painful to switch to a competitor).\n- Cost Advantage: Amazon, Walmart.'
    },
    { id: 'i11', type: 'exercise', title: 'Identify the Moat', content: 'Why is it hard to create a competitor to Visa?', options: ['Visa has the best logo.', 'Visa has a massive Network Effect (merchants accept it because consumers have it, consumers use it because merchants accept it).', 'Credit cards are cheap to print.'], correctAnswer: 'Visa has a massive Network Effect (merchants accept it because consumers have it, consumers use it because merchants accept it).'
    },
    { id: 'i12', type: 'concept', title: 'Strategy: Value Investing', content: 'What is it?\nBuying high-quality companies with wide moats when the market has temporarily mispriced them due to irrational panic.'
    },
    { id: 'i13', type: 'insight', title: 'Why it Works', content: 'Human emotion drives the market in the short term. During a panic, retail investors dump all stocks indiscriminately. The Price crashes, but the true Value of a fundamentally sound business remains unchanged.'
    },
    { id: 'i14', type: 'example', title: 'Step-by-Step Execution: Part 1', content: '- Step 1: Identify a company with a strong Economic Moat.\n- Step 2: Verify they have consistent, growing Free Cash Flow over 5+ years.\n- Step 3: Ensure their Debt is extremely low.'
    },
    { id: 'i15', type: 'example', title: 'Step-by-Step Execution: Part 2', content: '- Step 4: Calculate the Intrinsic Value.\n- Step 5: Wait for the market to crash or panic over temporary bad news.\n- Step 6: Buy when the Price drops 20-30% below Intrinsic Value.'
    },
    { id: 'i16', type: 'concept', title: 'Margin of Safety', content: 'The 20-30% discount you demand before buying is your Margin of Safety.\n\nIt protects you from your own math errors. If you think the stock is worth $100, you don\'t buy it at $100. You buy it at $70.'
    },
    { id: 'i17', type: 'exercise', title: 'The Safety Net', content: 'What is the purpose of the Margin of Safety?', options: ['To guarantee you beat the market.', 'To protect against errors in calculation and unforeseen negative events.', 'To avoid paying taxes.'], correctAnswer: 'To protect against errors in calculation and unforeseen negative events.'
    },
    { id: 'i18', type: 'warning', title: 'The Value Trap', content: 'A Value Trap is a stock that looks incredibly cheap (P/E of 5, price down 80%), but is cheap for a very good reason (the business model is permanently dead).'
    },
    { id: 'i19', type: 'example', title: 'Blockbuster Video', content: 'When Netflix launched streaming, Blockbuster\'s stock crashed. Value investors bought it because it looked "cheap." They lost everything because the moat was permanently destroyed. That is a Value Trap.'
    },
    { id: 'i20', type: 'exercise', title: 'Trap Evasion', content: 'How do you avoid a Value Trap?', options: ['Only buy tech stocks.', 'Ensure the core business model and economic moat are still completely intact before buying the dip.', 'Buy exactly when it hits a P/E of 5.'], correctAnswer: 'Ensure the core business model and economic moat are still completely intact before buying the dip.'
    },
    { id: 'i21', type: 'concept', title: 'Return on Invested Capital (ROIC)', content: 'ROIC measures how efficiently a company uses the capital it has. If a company raises $100 and generates $20 in profit, their ROIC is 20%.'
    },
    { id: 'i22', type: 'insight', title: 'The Wealth Compounder', content: 'Companies with a consistently high ROIC (over 15%) are wealth compounding machines. They can reinvest their profits internally to generate even more profits without needing debt.'
    },
    { id: 'i23', type: 'concept', title: 'Share Buybacks', content: 'Instead of paying a dividend, a company can use its cash to buy its own stock on the open market and destroy the shares.'
    },
    { id: 'i24', type: 'example', title: 'The Pizza Analogy', content: 'Imagine a pizza cut into 8 slices. You own 1 slice. If the company buys back 4 slices and destroys them, the pizza is now 4 slices. Your 1 slice just doubled in ownership percentage without you paying a dime.'
    },
    { id: 'i25', type: 'warning', title: 'Bad Buybacks', content: 'Buybacks are great, UNLESS management buys back stock when it is massively overvalued. That is destroying shareholder capital.'
    },
    { id: 'i26', type: 'concept', title: 'Management Evaluation', content: 'A great business can be ruined by terrible management. You must evaluate the CEO. Do they allocate capital wisely? Do they reward themselves with massive stock options while the stock crashes?'
    },
    { id: 'i27', type: 'insight', title: 'Skin in the Game', content: 'Always check "Insider Ownership". If the CEO and Founders own 20% of the company, their incentives are perfectly aligned with yours. If they own 0.1%, run away.'
    },
    { id: 'i28', type: 'exercise', title: 'The Ultimate Checklist', content: 'Which of these is NOT a sign of a fundamentally sound company?', options: ['High Insider Ownership.', 'Consistent Free Cash Flow.', 'Constantly issuing new shares to pay for operating expenses.'], correctAnswer: 'Constantly issuing new shares to pay for operating expenses.'
    },
    { id: 'i29', type: 'concept', title: 'The Macro Environment', content: 'Even the best company in the world will see its stock drop during a recession or when interest rates rise. You must contextualize the business within the global economy.'
    },
    { id: 'p30', type: 'concept', title: 'Next Steps', content: 'You now know the qualitative factors of a great business. In the Pro lesson, we will get strictly mathematical and learn how to run a Discounted Cash Flow model.', tool: 'market'
    }
  ]
};
