import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p15-beginner',
  title: 'The Blueprint of Wealth',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'The Final Boss', content: 'You have mastered the mechanics of stocks, options, crypto, real estate, and macroeconomics. But none of those matter if your personal financial engine is broken. This phase is the culmination of everything.'
    },
    { id: 'b2', type: 'insight', title: 'The Cash Flow Quadrant', content: 'Robert Kiyosaki\'s framework divides the world into 4 quadrants: E (Employee), S (Self-Employed), B (Business Owner), and I (Investor). The left side (E, S) trades time for money. The right side (B, I) builds systems that print money.'
    },
    { id: 'b3', type: 'example', title: 'The Trap of the "S" Quadrant', content: 'A high-paid doctor or freelance programmer thinks they own a business. They don\'t. They own a job. If they stop performing surgery or coding, their income drops to zero instantly. They are still trading time for money.'
    },
    { id: 'b4', type: 'exercise', title: 'The Quadrants', content: 'What is the primary difference between being Self-Employed (S) and being a Business Owner (B)?', options: ['A Business Owner pays fewer taxes.', 'A Business Owner has built a system that generates money even if they are sleeping or on vacation. A Self-Employed person must actively work to earn money.', 'A Business Owner works harder.'], correctAnswer: 'A Business Owner has built a system that generates money even if they are sleeping or on vacation. A Self-Employed person must actively work to earn money.'
    },
    { id: 'b5', type: 'concept', title: 'The 3 Pillars of Wealth', content: 'True wealth is built on a 3-legged stool: 1. High-Income Skills (to generate massive cash). 2. Business/Systems (to detach your time from your income). 3. Investments (to protect and multiply the cash).'
    },
    { id: 'b6', type: 'insight', title: 'The Order of Operations', content: 'Amateurs try to jump straight to Pillar 3 (Investing) with $500, hoping to get rich in crypto. Pros focus 100% of their energy on Pillar 1 and 2 to generate $10k/month, and THEN use Pillar 3 to multiply it.'
    },
    { id: 'b7', type: 'warning', title: 'You Cannot Invest Your Way Out of Poverty', content: 'If you only have $1,000, a massive 20% return in the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} makes you $200. It takes a year. You could make $200 in a weekend mowing lawns. Focus on income first.'
    },
    { id: 'b8', type: 'exercise', title: 'Wealth Sequencing', content: 'If you currently have a very low income and zero savings, what should your primary financial focus be?', options: ['Day trading crypto with maximum leverage.', 'Developing a High-Income Skill to drastically increase your cash flow (Pillar 1).', 'Buying fractional shares of Apple.'], correctAnswer: 'Developing a High-Income Skill to drastically increase your cash flow (Pillar 1).'
    },
    { id: 'b9', type: 'concept', title: 'Asymmetric Risk', content: 'The holy grail of wealth building. You want to find opportunities where the downside is strictly capped (e.g., losing $100), but the upside is mathematically infinite (e.g., making $1,000,000).'
    },
    { id: 'b10', type: 'example', title: 'Asymmetry in Action', content: 'Starting a YouTube channel has Asymmetric Risk. The downside: You waste a few hours and look silly. The upside: You build a million-dollar media empire. Working a 9-5 job is Symmetric: You trade exactly 1 hour for exactly $20. No leverage.'
    },
    { id: 'b11', type: 'exercise', title: 'Risk Profiles', content: 'What makes an opportunity "Asymmetric"?', options: ['It is illegal.', 'The potential financial loss is incredibly small and capped, but the potential financial upside is massive and theoretically unlimited.', 'It involves symmetric shapes.'], correctAnswer: 'The potential financial loss is incredibly small and capped, but the potential financial upside is massive and theoretically unlimited.'
    },
    { id: 'b12', type: 'concept', title: 'The 4 Types of Leverage', content: 'Naval Ravikant defines leverage in 4 categories: 1. Labor (People working for you). 2. Capital (Money working for you). 3. Code (Software working for you). 4. Media (Content working for you).'
    },
    { id: 'b13', type: 'insight', title: 'Permissionless Leverage', content: 'Labor and Capital require permission (you need someone to say yes to working for you, or a bank to lend you money). Code and Media are Permissionless. You can write code or post a video while you sleep, and it can reach 1 billion people for free.'
    },
    { id: 'b14', type: 'exercise', title: 'Leverage Mechanics', content: 'Why are Code (software) and Media (content) considered the ultimate forms of modern leverage?', options: ['Because they are complicated.', 'Because they are "Permissionless", allowing you to scale to millions of users with zero marginal cost without needing anyone\'s approval.', 'Because the government taxes them less.'], correctAnswer: 'Because they are "Permissionless", allowing you to scale to millions of users with zero marginal cost without needing anyone\'s approval.'
    },
    { id: 'b15', type: 'concept', title: 'The "F-You" Number', content: 'The exact mathematical amount of money you need invested so that the passive income covers your living expenses forever. Once you hit this number, you never have to work for anyone again unless you choose to.'
    },
    { id: 'b16', type: 'insight', title: 'The 4% Rule', content: 'Historically, you can safely withdraw 4% of a diversified stock/bond portfolio every year without ever running out of money. If your annual expenses are $40,000, your F-You number is $1,000,000 ($40k / 0.04).'
    },
    { id: 'b17', type: 'concept', title: 'Lifestyle Creep', content: 'The silent killer of wealth. You get a $20k raise. Instead of investing it, you instantly lease a nicer car and rent a nicer apartment. Your expenses rise exactly to meet your new income. You are making more money, but you are still just as poor.'
    },
    { id: 'b18', type: 'warning', title: 'The Golden Handcuffs', content: 'High-income earners (doctors, lawyers) often fall into this trap. They make $300k a year, but have $290k in mortgages, private school tuition, and luxury car payments. If they quit their stressful job, their life collapses. They are highly paid slaves.'
    },
    { id: 'b19', type: 'exercise', title: 'Wealth Defense', content: 'What is "Lifestyle Creep"?', options: ['A spooky landlord.', 'The subconscious habit of increasing your spending to match your rising income, effectively preventing you from ever accumulating true wealth.', 'Investing in creepy companies.'], correctAnswer: 'The subconscious habit of increasing your spending to match your rising income, effectively preventing you from ever accumulating true wealth.'
    },
    { id: 'b20', type: 'concept', title: 'The Infinite Game', content: 'Amateurs view wealth as a finite game (get $1 Million and retire). Pros view wealth as an Infinite Game. The goal is not to win; the goal is to build a system so robust that you get to keep playing the game forever.'
    },
    { id: 'b21', type: 'insight', title: 'Generational Thinking', content: 'You are no longer investing for yourself. You are investing to ensure that your great-grandchildren, whom you will never meet, are born with absolute financial sovereignty.'
    },
    { id: 'b22', type: 'concept', title: 'The Tax Matrix', content: 'The government wants you to build businesses and provide housing. If you do (Business Owner, Real Estate Investor), they reward you with massive tax loopholes. If you just collect a paycheck (Employee), they punish you with the highest tax rates.'
    },
    { id: 'b23', type: 'warning', title: 'W-2 Inefficiency', content: 'A W-2 employee is taxed BEFORE they get their money. A Business Owner gets their money, spends it on expenses (cars, dinners, travel), and is only taxed on what is LEFT OVER. It is a completely different set of rules.'
    },
    { id: 'b24', type: 'exercise', title: 'Tax Strategy', content: 'Why do W-2 Employees pay statistically higher tax rates than Business Owners and Real Estate Investors?', options: ['Because employees make more money.', 'Because the tax code is designed to legally reward people who build businesses, create jobs, and provide housing.', 'Because it is a conspiracy.'], correctAnswer: 'Because the tax code is designed to legally reward people who build businesses, create jobs, and provide housing.'
    },
    { id: 'b25', type: 'concept', title: 'The Concept of "Enough"', content: 'Wall Street is littered with billionaires who jumped out of windows because they lost half their net worth. If you do not define what "Enough" is, the goalpost will move forever, and you will die stressed and unhappy.'
    },
    { id: 'b26', type: 'insight', title: 'Money is a Tool', content: 'Money does not buy happiness. Money buys Freedom. It buys you the ability to wake up on a Tuesday, look at the ceiling, and say, "What do I want to do today?"'
    },
    { id: 'b27', type: 'concept', title: 'The Execution Phase', content: 'You have completed the Finterns curriculum. The training wheels are off. You understand the math, the psychology, and the systems. The only thing left is execution.'
    },
    { id: 'b28', type: 'warning', title: 'Analysis Paralysis', content: 'Do not spend the next 5 years reading books and taking courses. Action creates clarity. You will learn more losing your first $100 in the real market than reading 1,000 pages of theory.'
    },
    { id: 'b29', type: 'concept', title: 'Summary', content: 'Build a high-income skill. Detach your time from your income using Permissionless Leverage. Deploy that cash into asymmetrical, tax-advantaged hard assets. Buy your freedom.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of the Wealth Pillars in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You are working a 9-5 job making $60,000 a year. You have $5,000 in your {{INTERNATIONAL:bank account|KENYA:bank account or M-PESA wallet}}. You want to be wealthy. A crypto influencer promises a new coin will 100x.",
        startingBalance: 5000,
        choices: [
          { text: "Put the entire $5,000 into the crypto coin. You can't get rich without taking massive risks!", result: -5000, feedback: "You failed the Order of Operations. You tried to use Pillar 3 (Investing) to escape poverty without building Pillar 1 (Income). The coin was a scam. You are back to zero." },
          { text: "Keep the $5,000 in a {{INTERNATIONAL:savings account|KENYA:savings account or SACCO deposit}} and focus on asking your boss for a $5k raise next year.", result: 0, feedback: "You avoided the scam, but you stayed in the 'Employee' quadrant. A 3% raise barely covers inflation. You will work until you are 70." },
          { text: "Use $1,000 to buy a camera and microphone. Spend every night learning video editing (High-Income Skill). Start an agency utilizing Permissionless Media Leverage.", result: 50000, feedback: "Pro execution. You ignored the get-rich-quick scheme. You invested in Pillar 1 & 2. You built a scalable, permissionless business. Once the agency generates $10k/month, you use that massive cash flow to invest safely." }
        ]
      }
    }
  ]
};
