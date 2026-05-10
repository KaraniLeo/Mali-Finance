import React from 'react';
import { Globe } from 'lucide-react';
import { Module, Tier, Subtopic } from '../types';

export const modulesData: Record<Tier, Module[]> = {
  parent: [],
  junior: [
    { 
      id: 'j1', 
      title: 'Piggy Bank Mastery', 
      description: 'A comprehensive guide to the history of money, earning value, and delayed gratification.', 
      progress: 0, 
      icon: <div className="text-3xl">🐷</div>,
      phaseId: 'junior-1'
    }
  ],
  teen: [
    { 
      id: 't1', 
      title: 'Budgeting & Financial Survival', 
      description: 'Master the 50/30/20 framework, understand the Latte Factor, and avoid debt traps.', 
      progress: 0, 
      icon: <div className="text-3xl">📊</div>,
      phaseId: 'teen-1'
    }
  ],
  pro: [
    {
      id: 'p1',
      title: 'Market Mechanics & Auction Theory',
      description: 'Understand the fundamental mechanics of the global financial market.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-01'
    },
    {
      id: 'p2',
      title: 'Macroeconomics & The Money Engine',
      description: 'Understand how central banks, inflation, and interest rates drive global liquidity.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-02'
    },
    {
      id: 'p3',
      title: 'Risk Management (The Holy Grail)',
      description: 'Capital preservation is the only rule that matters. Master position sizing, stop losses, and R:R.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-03'
    },
    {
      id: 'p4',
      title: 'Equities & Fundamental Analysis',
      description: 'Learn how to read financial statements, identify economic moats, and value businesses.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-04'
    },
    {
      id: 'p5',
      title: 'Technical Analysis & Price Action',
      description: 'Learn to read raw price action, market structure, and the visual footprint of institutional money.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-05'
    },
    {
      id: 'p6',
      title: 'Derivative Markets',
      description: 'Understand Options, Futures, Leverage, and the extreme dangers of trading derivatives.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-06'
    },
    {
      id: 'p7',
      title: 'The Crypto Ecosystem & Blockchain',
      description: 'Understand the foundational technology of distributed ledgers, consensus mechanisms, and Bitcoin.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-07'
    },
    {
      id: 'p8',
      title: 'Web3 & Decentralized Finance',
      description: 'Learn how smart contracts are replacing traditional banking infrastructure.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-08'
    },
    {
      id: 'p9',
      title: 'Tokenomics & Utility',
      description: 'Learn how to mathematically evaluate if a cryptocurrency is designed to accrue value.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-09'
    },
    {
      id: 'p10',
      title: 'NFTs and Digital Property Rights',
      description: 'Move beyond the "JPEG" narrative. Understand cryptographic receipts and tokenization.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-10'
    },
    {
      id: 'p11',
      title: 'Trading Psychology & Emotional Control',
      description: 'You are your own worst enemy. Master FOMO, Revenge Trading, and the market cycle.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-11'
    },
    {
      id: 'p12',
      title: 'Advanced Charting & Indicators',
      description: 'Master Volume Profile, Fibonacci, and order flow dynamics.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-12'
    },
    {
      id: 'p13',
      title: 'Portfolio Construction',
      description: 'Build an invincible portfolio using the Barbell Strategy and rebalancing.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-13'
    },
    {
      id: 'p14',
      title: 'Taxes and the Legal Framework',
      description: 'Master capital gains, tax loss harvesting, and legal structuring.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-14'
    },
    {
      id: 'p15',
      title: 'Putting It All Together',
      description: 'Synthesize everything you have learned into a mechanical operating system.',
      progress: 0,
      icon: <Globe className="text-[#6B8E23]" size={32} />,
      phaseId: 'phase-15'
    }
  ]
};
