import { Lesson } from '../../../types/curriculum';
import { phase04Images } from '../phase-04-images';

export const proLesson: Lesson = {
  id: 'p4-pro',
  title: 'Discounted Cash Flows (DCF)',
  level: 'pro',
  cards: [
    { id: 'p1', type: 'concept', title: 'The Ultimate Metric', content: 'You can fake earnings. You can fake revenue. You cannot fake cold, hard cash.\n\nThe intrinsic value of ANY asset is simply the total amount of cash it will produce over its lifetime, discounted back to today.'
    },
    { id: 'p2', type: 'insight', title: 'The Time Value of Money', content: 'Would you rather have $1,000 today or $1,000 in ten years?\n\nObviously today. You can invest the $1,000 today and earn 10% a year, turning it into $2,593 in ten years. Therefore, future cash is worth LESS than current cash.'
    },
    { id: 'p3', type: 'concept', title: 'Strategy: The DCF Model', content: 'What is it?\nA mathematical model used by Wall Street analysts to determine the exact intrinsic value of a business by projecting future cash flows and discounting them.'
    },
    { id: 'p4', type: 'insight', title: 'Why it Works', content: 'It strips away market emotion, P/E ratios, hype, and news. It focuses entirely on the cold, hard cash the business will print over the next 10 years and mathematically tells you exactly what to pay for it.'
    },
    { id: 'p5', type: 'example', title: 'Step-by-Step Execution: Part 1', content: '- Step 1: Find the company\'s Current Free Cash Flow (FCF).\n- Step 2: Project how much that FCF will grow each year for the next 5-10 years (e.g., 10% growth per year).'
    },
    { id: 'p6', type: 'example', title: 'Step-by-Step Execution: Part 2', content: '- Step 3: Determine a "Discount Rate". This is your required rate of return to take on the risk of the stock (usually 8-12%).\n- Step 4: Discount each of those projected future cash flows back to Year 0.'
    },
    { id: 'p7', type: 'example', title: 'Step-by-Step Execution: Part 3', content: '- Step 5: Calculate the "Terminal Value" (what the company will be worth after your 10-year projection ends), and discount that back to Year 0 as well.\n- Step 6: Add them all up. This is the Intrinsic Value of the total company.'
    },
    { id: 'p8', type: 'example', title: 'Step-by-Step Execution: Part 4', content: '- Step 7: Divide the total Intrinsic Value by the number of Shares Outstanding.\n\nThis gives you the Fair Value Price per share. If the stock is currently trading 30% below this price, you buy.'
    },
    { id: 'p9', type: 'warning', title: 'When NOT to use a DCF', content: 'Do NOT use a DCF model on early-stage tech startups or biotech companies with zero revenue. They have no current cash flow, so projecting their future cash flow is pure gambling.'
    },
    { id: 'p10', type: 'exercise', title: 'The Ultimate Trap', content: 'What is the biggest weakness of the DCF Model?', options: ['It is too hard to calculate.', 'Garbage in, garbage out. It relies entirely on your assumptions of future growth, which are often wrong.', 'It does not account for inflation.'], correctAnswer: 'Garbage in, garbage out. It relies entirely on your assumptions of future growth, which are often wrong.'
    },
    { id: 'p11', type: 'concept', title: 'Weighted Average Cost of Capital (WACC)', content: 'When selecting your Discount Rate, professional analysts use WACC. It calculates exactly how much it costs the company to fund itself via a mix of Debt (interest rates) and Equity.'
    },
    { id: 'p12', type: 'insight', title: 'Interest Rate Gravity', content: 'When the Central Bank raises interest rates, the WACC (Discount Rate) goes UP.\n\nMathematically, when you divide future cash flows by a higher discount rate, the Intrinsic Value drops. This is why stocks crash when interest rates rise.'
    },
    { id: 'p13', type: 'concept', title: 'Terminal Value', content: 'You can\'t project cash flows to infinity. Terminal Value assumes that after year 10, the company will just grow at a steady, perpetual rate (usually 2-3%, matching GDP growth) forever.'
    },
    { id: 'p14', type: 'warning', title: 'The Terminal Skew', content: 'The Terminal Value often makes up 70% of the total DCF calculation. If your perpetual growth rate assumption is off by even 1%, it will drastically change the final stock price.'
    },
    { id: 'p15', type: 'exercise', title: 'Gravity Check', content: 'If interest rates rise to 10%, what happens to the intrinsic value of future cash flows?', options: ['They become more valuable.', 'They become less valuable.', 'They remain unchanged.'], correctAnswer: 'They become less valuable.'
    },
    { id: 'p16', type: 'concept', title: 'The Magic Formula', content: 'Joel Greenblatt created the "Magic Formula" to simplify this. He ranks all stocks based on two metrics: High Earnings Yield (Cheap Price) and High Return on Capital (High Quality).'
    },
    { id: 'p17', type: 'insight', title: 'Automating Value', content: 'Buying the top 30 ranked stocks in the Magic Formula historically crushes the S&P 500, because it mechanically forces you to buy "Good companies at Cheap prices".'
    },
    { id: 'p18', type: 'concept', title: 'Net Net Stocks', content: 'Benjamin Graham (Buffett\'s mentor) used to buy "Cigar Butts". These were companies trading below their Net Current Asset Value.\n\nBasically, the cash in their bank account was worth more than the entire stock price.'
    },
    { id: 'p19', type: 'insight', title: 'The Death of the Cigar Butt', content: 'Net Net stocks barely exist today because algorithmic trading bots instantly find and buy them. Value investing has evolved from "buying trash for dirt cheap" to "buying monopolies at fair prices".'
    },
    { id: 'p20', type: 'concept', title: 'Capital Allocation', content: 'When a CEO generates Free Cash Flow, they have 5 choices: reinvest in the business, acquire other companies, pay down debt, pay dividends, or buy back stock. This is Capital Allocation.'
    },
    { id: 'p21', type: 'insight', title: 'The Outsiders', content: 'The best CEOs in history (like Henry Singleton) were essentially just master Capital Allocators. They ruthlessly bought back stock when it was cheap and issued stock when it was expensive.'
    },
    { id: 'p22', type: 'concept', title: 'Enterprise Value (EV)', content: 'Market Cap only looks at equity. Enterprise Value looks at the whole business.\n\nEV = Market Cap + Total Debt - Cash.\n\nIf you buy a house for $100k, but it has a $50k mortgage, the true cost to buy it outright is $150k.'
    },
    { id: 'p23', type: 'example', title: 'EV vs Market Cap', content: 'Company A: Market Cap $1B, Cash $500M, Debt $0. (EV = $500M)\nCompany B: Market Cap $1B, Cash $0, Debt $500M. (EV = $1.5B)\n\nCompany A is mathematically much cheaper despite having the same Market Cap.'
    },
    { id: 'p24', type: 'exercise', title: 'Valuation Reality', content: 'Why is EV/EBITDA often preferred over P/E?', options: ['It is easier to calculate.', 'It factors in the company\'s debt and cash, providing a more accurate picture of the true cost to acquire the entire business.', 'It ignores taxes.'], correctAnswer: 'It factors in the company\'s debt and cash, providing a more accurate picture of the true cost to acquire the entire business.'
    },
    { id: 'p25', type: 'concept', title: 'The Intangibles', content: 'No spreadsheet can value company culture, visionary leadership, or a cult-like brand loyalty (e.g., Apple users refusing to use Android). Quantitative analysis must be paired with Qualitative analysis.'
    },
    { id: 'p26', type: 'warning', title: 'The Value Trap Part 2', content: 'Sometimes a spreadsheet says a company is worth $100, and it trades at $50. But the CEO is corrupt and slowly siphoning cash out through massive salaries. The math works, but the qualitative analysis fails. You still lose money.'
    },
    { id: 'p27', type: 'concept', title: 'The Efficient Market Hypothesis (EMH)', content: 'EMH states that all known information is instantly priced into the stock. If a company announces $1B in profit, the stock instantly adjusts. You cannot beat the market based on public info.'
    },
    { id: 'p28', type: 'insight', title: 'Beating the EMH', content: 'The only way to beat an efficient market is through Time Arbitrage. Institutional funds are forced to think in 3-month quarters. As a retail investor, your superpower is thinking in 5-year horizons.'
    },
    { id: 'p29', type: 'exercise', title: 'Your Edge', content: 'What is the greatest advantage a retail value investor has over a Wall Street hedge fund?', options: ['Better supercomputers.', 'Inside information.', 'Time Arbitrage (patience to wait years for the thesis to play out).'], correctAnswer: 'Time Arbitrage (patience to wait years for the thesis to play out).'
    },
    { id: 'p30', type: 'concept', title: 'Test Your Mastery', content: 'You have mastered the mechanics of value. Now, put it to the test by allocating a mock portfolio in the Budget Tool based on intrinsic value targeting.', tool: 'budget'
    }
  ]
};
