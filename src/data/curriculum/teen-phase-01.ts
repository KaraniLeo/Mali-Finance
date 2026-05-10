import { Phase } from '../../types/curriculum';

export const teenPhase01: Phase = {
  id: 'teen-1',
  title: 'Budgeting & Financial Survival',
  description: 'Master the 50/30/20 framework, understand the Latte Factor, and avoid debt traps using local Kenyan tools like M-Pesa.',
  lessons: [
    {
      id: 't1-l1',
      title: 'The 50/30/20 Blueprint',
      level: 'intermediate',
      cards: [
        {
          id: 't1-c1',
          type: 'concept',
          level: 'intermediate',
          title: 'What is a Budget?',
          content: 'A budget isn\'t about restricting yourself; it\'s about telling your money where to go so you don\'t wonder where it went. \n\nThe most effective framework for teens and adults is the **50/30/20 Rule**.'
        },
        {
          id: 't1-c2',
          type: 'example',
          level: 'intermediate',
          title: '50% Needs',
          content: 'Half of your income goes to non-negotiable survival costs. \n\nThis includes rent, groceries, electricity tokens, and matatu fare to school or work. If it is required to survive, it goes here.'
        },
        {
          id: 't1-c3',
          type: 'example',
          level: 'intermediate',
          title: '30% Wants',
          content: 'This is the fun category! \n\nEating out at KFC, movie tickets, new sneakers, or subscribing to Netflix. You don\'t have to cut out fun, you just have to limit it to 30% of your total income.'
        },
        {
          id: 't1-c4',
          type: 'example',
          level: 'intermediate',
          title: '20% Savings & Investing',
          content: 'This is paying your future self. \n\nThis money goes into an emergency fund, a SACCO for high-interest savings, or the stock market. Never skip this step.'
        },
        {
          id: 't1-c5',
          type: 'exercise',
          level: 'intermediate',
          title: 'The Golden Rule',
          content: 'In the 50/30/20 rule, what does the 20% stand for?',
          options: ['Wants', 'Savings & Investing', 'Needs'],
          correctAnswer: 'Savings & Investing'
        }
      ]
    },
    {
      id: 't1-l2',
      title: 'Digital Money & Debt Traps',
      level: 'intermediate',
      cards: [
        {
          id: 't1-c6',
          type: 'concept',
          level: 'intermediate',
          title: 'M-Pesa Management',
          content: 'M-Pesa makes spending incredibly easy, which makes budgeting incredibly hard.\n\nEvery time you "Send Money" or "Lipa na M-Pesa", the money disappears instantly. Tracking digital spending requires extreme discipline.'
        },
        {
          id: 't1-c7',
          type: 'warning',
          level: 'intermediate',
          title: 'The Fuliza & M-Shwari Trap',
          content: 'Mobile loan apps like Fuliza and M-Shwari offer quick cash, but they come with massive daily or monthly interest rates.\n\nBorrowing to buy "Wants" (like clothes or going out) is the fastest way to get trapped in a cycle of debt.'
        },
        {
          id: 't1-c8',
          type: 'insight',
          level: 'intermediate',
          title: 'The Power of SACCOs',
          content: 'Instead of borrowing from mobile apps, smart Kenyans use Savings and Credit Cooperative Organizations (SACCOs).\n\nYou save a little every month, earn high dividends, and can eventually borrow against your savings at very low, fair interest rates.'
        },
        {
          id: 't1-c9',
          type: 'exercise',
          level: 'intermediate',
          title: 'Debt Awareness',
          content: 'Why are quick mobile loans dangerous for buying Wants?',
          options: ['They take too long to process', 'They come with massive interest rates that trap you in debt', 'They are illegal'],
          correctAnswer: 'They come with massive interest rates that trap you in debt'
        }
      ]
    }
  ]
};
