import React from 'react';
import { Globe } from 'lucide-react';
import { Module, Tier } from '../types';

export const modulesData: Record<Tier, Module[]> = {
  parent: [],
  junior: [
    { 
      id: 'j1', 
      title: 'Piggy Bank Mastery', 
      description: 'A comprehensive guide to the history of money, earning value, and delayed gratification.', 
      progress: 0, 
      icon: <div className="text-3xl">🐷</div>,
      phaseId: 'junior-1',
      orderIndex: 1
    },
    { 
      id: 'j4', 
      title: 'How Parents Earn Money', 
      description: 'Discover how grown-ups go to work, use their skills to help others, and earn money for the family.', 
      progress: 0, 
      icon: <div className="text-3xl">👨‍💼</div>,
      phaseId: 'junior-4',
      orderIndex: 2
    },
    { 
      id: 'j10', 
      title: 'The Value of Diligence', 
      description: 'Understand how extra chores build hard work habits, the rewards of doing a job well, and entrepreneurship.', 
      progress: 0, 
      icon: <div className="text-3xl">⭐</div>,
      phaseId: 'junior-10',
      orderIndex: 3
    },
    { 
      id: 'j3', 
      title: 'Needs vs. Wants game', 
      description: 'Understand the difference between things you must have to survive (Needs) and things that are just nice to have (Wants).', 
      progress: 0, 
      icon: <div className="text-3xl">🍎</div>,
      phaseId: 'junior-3',
      orderIndex: 4
    },
    { 
      id: 'j5', 
      title: 'Understanding Prices & Costs', 
      description: 'Learn how to read price tags, compare prices at different shops, and choose the best value for your coins.', 
      progress: 0, 
      icon: <div className="text-3xl">🏷️</div>,
      phaseId: 'junior-5',
      orderIndex: 5
    },
    { 
      id: 'j7', 
      title: 'Avoiding Impulse Spending', 
      description: 'Learn how to control impulse shopping cravings, practice the 24-hour waiting rule, and avoid spending regret.', 
      progress: 0, 
      icon: <div className="text-3xl">🛑</div>,
      phaseId: 'junior-7',
      orderIndex: 6
    },
    { 
      id: 'j8', 
      title: 'Setting Your Savings Goals', 
      description: 'Learn how to set a target goal, track your weekly savings in a chart, and celebrate when you reach your target.', 
      progress: 0, 
      icon: <div className="text-3xl">🎯</div>,
      phaseId: 'junior-8',
      orderIndex: 7
    },
    { 
      id: 'j2', 
      title: 'Piggy Bank to Real Bank', 
      description: 'Learn about moving your coins to a real bank and how the bank keeps your savings super safe.', 
      progress: 0, 
      icon: <div className="text-3xl">🏦</div>,
      phaseId: 'junior-2',
      orderIndex: 8
    },
    { 
      id: 'j9', 
      title: 'Digital Money for Kids', 
      description: 'Understand how parents pay with cards and phones, where digital cash goes, and how ATMs work.', 
      progress: 0, 
      icon: <div className="text-3xl">📱</div>,
      phaseId: 'junior-9',
      orderIndex: 9
    },
    { 
      id: 'j6', 
      title: 'Sharing & Giving (Charity)', 
      description: 'Learn the joy of sharing your resources, helping neighbors, and using a giving jar to support charities.', 
      progress: 0, 
      icon: <div className="text-3xl">🤝</div>,
      phaseId: 'junior-6',
      orderIndex: 10
    }
  ],
  teen: [
    { 
      id: 't1', 
      title: 'Budgeting & Financial Survival', 
      description: 'Master easy budgeting, tracking your cash, and building wealth step-by-step without getting stuck in money traps.', 
      progress: 0, 
      icon: <div className="text-3xl">📊</div>,
      phaseId: 'teen-1',
      orderIndex: 1
    },
    { 
      id: 't2', 
      title: 'M-PESA & Mobile Money Go', 
      description: 'Master the economics of mobile money, M-PESA Go under-18 accounts, Till numbers, Pochi la Biashara, and avoiding debt loops.', 
      progress: 0, 
      icon: <div className="text-3xl">📲</div>,
      phaseId: 'teen-2',
      orderIndex: 2
    },
    { 
      id: 't3', 
      title: 'Banks, Savings & College Funds', 
      description: 'Understand how banking works, compound interest, opening teen bank accounts in Kenya, and saving for college or university.', 
      progress: 0, 
      icon: <div className="text-3xl">🏦</div>,
      phaseId: 'teen-3',
      orderIndex: 3
    },
    { 
      id: 't6', 
      title: 'Debt & Credit: Master or Servant?', 
      description: 'Understand how interest works, differences between good and bad debt, Credit Reference Bureaus (CRB), and credit scores.', 
      progress: 0, 
      icon: <div className="text-3xl">💳</div>,
      phaseId: 'teen-6',
      orderIndex: 4
    },
    { 
      id: 't9', 
      title: 'Insurance, Risks & Protection', 
      description: 'Understand insurance mechanics, medical/motor cover, risk mitigation, and building bulletproof emergency funds.', 
      progress: 0, 
      icon: <div className="text-3xl">🛡️</div>,
      phaseId: 'teen-9',
      orderIndex: 5
    },
    { 
      id: 't7', 
      title: 'Digital Economy & Side Hustles', 
      description: 'Learn how to start online businesses, e-commerce stores, managing shipping costs, and payment gateways safely.', 
      progress: 0, 
      icon: <div className="text-3xl">💻</div>,
      phaseId: 'teen-7',
      orderIndex: 6
    },
    { 
      id: 't4', 
      title: 'Taxes, KRA & Entrepreneurship', 
      description: 'Learn about KRA PINs, PAYE, VAT, business structures, and the legal constraints of starting a business as a teenager.', 
      progress: 0, 
      icon: <div className="text-3xl">💼</div>,
      phaseId: 'teen-4',
      orderIndex: 7
    },
    { 
      id: 't5', 
      title: 'NSE, Stocks & Saccos', 
      description: 'Master stock investing on the Nairobi Securities Exchange, CDSC accounts, Sacco savings, and low-interest multiplier loans.', 
      progress: 0, 
      icon: <div className="text-3xl">📈</div>,
      phaseId: 'teen-5',
      orderIndex: 8
    },
    { 
      id: 't8', 
      title: 'Inflation & The Money Engine', 
      description: 'Understand macroeconomics, the Central Bank of Kenya (CBK), interest rate policies, inflation, and forex currency fluctuations.', 
      progress: 0, 
      icon: <div className="text-3xl">⚙️</div>,
      phaseId: 'teen-8',
      orderIndex: 9
    },
    { 
      id: 't10', 
      title: 'Cryptocurrencies & Smart Contracts', 
      description: 'Understand Bitcoin, blockchain ledger mechanics, crypto wallets, and the extreme risks of speculation and scams.', 
      progress: 0, 
      icon: <div className="text-3xl">🪙</div>,
      phaseId: 'teen-10',
      orderIndex: 10
    }
  ],
  pro: [
    {
      id: 'p1',
      title: 'Market Mechanics & Auction Theory',
      description: 'Understand the fundamental mechanics of the global financial market.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-01',
      orderIndex: 1
    },
    {
      id: 'p2',
      title: 'Macroeconomics & The Money Engine',
      description: 'Understand how central banks, inflation, and interest rates drive global liquidity.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-02',
      orderIndex: 2
    },
    {
      id: 'p3',
      title: 'Risk Management (The Holy Grail)',
      description: 'Capital preservation is the only rule that matters. Master position sizing, stop losses, and R:R.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-03',
      orderIndex: 3
    },
    {
      id: 'p4',
      title: 'Equities & Fundamental Analysis',
      description: 'Learn how to read financial statements, identify economic moats, and value businesses.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-04',
      orderIndex: 4
    },
    {
      id: 'p5',
      title: 'Technical Analysis & Price Action',
      description: 'Learn to read raw price action, market structure, and the visual footprint of institutional money.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-05',
      orderIndex: 5
    },
    {
      id: 'p6',
      title: 'Derivative Markets',
      description: 'Understand Options, Futures, Leverage, and the extreme dangers of trading derivatives.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-06',
      orderIndex: 6
    },
    {
      id: 'p7',
      title: 'The Crypto Ecosystem & Blockchain',
      description: 'Understand the foundational technology of distributed ledgers, consensus mechanisms, and Bitcoin.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-07',
      orderIndex: 7
    },
    {
      id: 'p8',
      title: 'Web3 & Decentralized Finance',
      description: 'Learn how smart contracts are replacing traditional banking infrastructure.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-08',
      orderIndex: 8
    },
    {
      id: 'p9',
      title: 'Tokenomics & Utility',
      description: 'Learn how to mathematically evaluate if a cryptocurrency is designed to accrue value.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-09',
      orderIndex: 9
    },
    {
      id: 'p10',
      title: 'NFTs and Digital Property Rights',
      description: 'Move beyond the "JPEG" narrative. Understand cryptographic receipts and tokenization.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-10',
      orderIndex: 10
    },
    {
      id: 'p11',
      title: 'Trading Psychology & Emotional Control',
      description: 'You are your own worst enemy. Master FOMO, Revenge Trading, and the market cycle.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-11',
      orderIndex: 11
    },
    {
      id: 'p12',
      title: 'Advanced Charting & Indicators',
      description: 'Master Volume Profile, Fibonacci, and order flow dynamics.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-12',
      orderIndex: 12
    },
    {
      id: 'p13',
      title: 'Portfolio Construction',
      description: 'Build an invincible portfolio using the Barbell Strategy and rebalancing.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-13',
      orderIndex: 13
    },
    {
      id: 'p14',
      title: 'Taxes and the Legal Framework',
      description: 'Master capital gains, tax loss harvesting, and legal structuring. {{INTERNATIONAL:Understand global tax systems.|KENYA:Master KRA, PAYE, and iTax filing.}}',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-taxes',
      orderIndex: 14
    },
    {
      id: 'p15',
      title: 'Putting It All Together',
      description: 'Synthesize everything you have learned into a mechanical operating system.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-15',
      orderIndex: 15
    },
    {
      id: 'p16',
      title: 'Real Estate & Hard Assets',
      description: 'Learn the legal money glitches of the wealthy: Leverage, Commercial Valuation, and the BRRRR Method.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-real-estate',
      orderIndex: 16
    },
    {
      id: 'p17',
      title: 'M-PESA & Mobile Money Economics',
      description: 'Understand the infrastructure of mobile money, Fuliza, M-Shwari, and transaction costs.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-mpesa',
      orderIndex: 17
    },
    {
      id: 'p18',
      title: 'NSE, Stocks & Saccos',
      description: 'Master the Nairobi Securities Exchange, CDSC, and Sacco multiplier loans.',
      progress: 0,
      icon: <Globe className="text-brand-accent" size={32} />,
      phaseId: 'phase-nse-sacco',
      orderIndex: 18
    }
  ]
};
