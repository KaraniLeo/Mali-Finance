import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p3-beginner',
  title: 'Capital Preservation Basics',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'The Golden Rule', content: 'Rule #1: Never lose money. Rule #2: Never forget Rule #1. \n\nBefore you ever think about making money, you must learn how to protect the money you already have.'
    },
    { id: 'b2', type: 'insight', title: 'The Asymmetry of Loss', content: 'If you have $100 and you lose 50%, you now have $50.\n\nTo get back to $100, you don\'t need a 50% gain. You need a 100% gain just to break even.'
    },
    { id: 'b3', type: 'exercise', title: 'The Math of Ruin', content: 'If your portfolio drops by 75%, what percentage return do you need just to break even?', options: ['75%', '150%', '300%'], correctAnswer: '300%'
    },
    { id: 'b4', type: 'warning', title: 'The Gambler\'s Fallacy', content: '"It\'s down so much, it has to bounce back soon."\n\nNo, it does not. A stock that is down 90% is just a stock that was down 80%, and then got cut in half again.'
    },
    { id: 'b5', type: 'concept', title: 'Position Sizing', content: 'Position sizing is deciding exactly how much of your total portfolio to put into a single trade.\n\nNever put 100% of your money into one stock. That is gambling, not investing.'
    },
    { id: 'b6', type: 'example', title: 'The 1% Rule', content: 'Professional traders risk a maximum of 1% of their total account on any single trade.\n\nIf you have a $10,000 account, the maximum you are allowed to lose on one bad trade is $100.'
    },
    { id: 'b7', type: 'exercise', title: 'Account Survival', content: 'If you use the 1% Rule, how many consecutive trades do you have to lose to wipe out your entire account?', options: ['10 trades', '100 trades', '1 trade'], correctAnswer: '100 trades'
    },
    { id: 'b8', type: 'concept', title: 'The Stop Loss', content: 'A Stop Loss is an automatic order that sells your stock if it drops to a certain price.\n\nIt is your emergency parachute. You must set it BEFORE you enter the trade, and you must never move it.'
    },
    { id: 'b9', type: 'insight', title: 'Accepting Defeat', content: 'A Stop Loss hitting is not a failure. It is a successful execution of your risk management plan. The only failure is canceling your Stop Loss because you "hope" it turns around.'
    },
    { id: 'b10', type: 'concept', title: 'Diversification', content: 'Don\'t put all your eggs in one basket. If you buy 5 tech stocks, and the tech sector crashes, you lose everything. You must diversify across different sectors (Tech, Healthcare, Energy) and asset classes (Stocks, Bonds, Real Estate).'
    },
    { id: 'b11', type: 'example', title: 'The Tech Bubble', content: 'In the year 2000, people who were 100% invested in internet stocks lost everything. People who were diversified into boring dividend stocks survived.'
    },
    { id: 'b12', type: 'exercise', title: 'True Diversification', content: 'Which portfolio is truly diversified?', options: ['Apple, Microsoft, Google, and Amazon.', 'An {{INTERNATIONAL:S&P 500 index|KENYA:NSE 20 Share Index}} Index Fund, Real Estate, and {{INTERNATIONAL:government bonds|KENYA:Treasury Bonds (T-Bonds) or Infrastructure Bonds}}.', 'Bitcoin, Ethereum, and Dogecoin.'], correctAnswer: 'An {{INTERNATIONAL:S&P 500 index|KENYA:NSE 20 Share Index}} Index Fund, Real Estate, and {{INTERNATIONAL:government bonds|KENYA:Treasury Bonds (T-Bonds) or Infrastructure Bonds}}.'
    },
    { id: 'b13', type: 'warning', title: 'Diworsification', content: 'While diversification is good, buying 50 random stocks you know nothing about just to be "diversified" is terrible. You will mathematically guarantee mediocre returns.'
    },
    { id: 'b14', type: 'concept', title: 'Risk-to-Reward Ratio', content: 'Before you enter a trade, you must know your Risk (where your Stop Loss is) and your Reward (where your Take Profit is).\n\nA 1:3 ratio means you are risking $1 to make $3.'
    },
    { id: 'b15', type: 'insight', title: 'The Casino Math', content: 'With a 1:3 Risk-to-Reward ratio, you can lose 7 out of 10 trades and STILL make money. You are no longer gambling; you are acting like the casino.'
    },
    { id: 'b16', type: 'exercise', title: 'Calculating R:R', content: 'You buy a stock at $10. Your Stop Loss is $9. Your Take Profit is $13. What is your Risk-to-Reward ratio?', options: ['1:2', '1:3', '1:4'], correctAnswer: '1:3'
    },
    { id: 'b17', type: 'concept', title: 'FOMO (Fear Of Missing Out)', content: 'FOMO is the destroyer of portfolios. When a stock goes up 500% in a week, and all your friends are getting rich, your brain will scream at you to buy.'
    },
    { id: 'b18', type: 'warning', title: 'Buying the Top', content: 'If a stock is on the front page of the news because it skyrocketed, you are already too late. The institutions are selling their bags to the retail traders who suffer from FOMO.'
    },
    { id: 'b19', type: 'concept', title: 'FUD (Fear, Uncertainty, Doubt)', content: 'FUD is the opposite of FOMO. It is when the media spreads terrifying news to make everyone panic sell their stocks at the exact bottom.'
    },
    { id: 'b20', type: 'insight', title: 'Be Greedy When Others Are Fearful', content: 'Warren Buffett\'s most famous quote. The best time to buy is when there is blood in the streets and everyone is terrified. The best time to sell is when everyone is euphoric.'
    },
    { id: 'b21', type: 'concept', title: 'The Emergency Fund', content: 'You should never invest money you need for rent next month. You must build an Emergency Fund (3-6 months of living expenses in pure cash) before you ever buy a stock.'
    },
    { id: 'b22', type: 'example', title: 'Forced Liquidation', content: 'If you invest all your cash, and your car breaks down, you will be forced to sell your stocks to pay the mechanic. If the market happens to be down that day, you lock in a massive loss.'
    },
    { id: 'b23', type: 'exercise', title: 'Investment Rule #1', content: 'What money should you use to invest in the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}}?', options: ['Your rent money.', 'Money you borrowed from a friend.', 'Only money you will not need to touch for at least 5 years.'], correctAnswer: 'Only money you will not need to touch for at least 5 years.'
    },
    { id: 'b24', type: 'concept', title: 'Dollar Cost Averaging (DCA)', content: 'Instead of trying to guess the exact perfect day to buy a stock, DCA means you buy a set dollar amount every single month, regardless of the price.'
    },
    { id: 'b25', type: 'insight', title: 'Removing Emotion', content: 'DCA removes all emotion. If the market crashes, great! Your monthly $500 buys more shares. If the market moons, great! Your portfolio is up.'
    },
    { id: 'b26', type: 'concept', title: 'The Cash Position', content: 'Cash is not trash. Cash is a position. Having 20% of your portfolio in cash allows you to instantly deploy capital when the market crashes and presents a golden opportunity.'
    },
    { id: 'b27', type: 'warning', title: 'Leverage (Debt)', content: 'As a beginner, never use Margin or Leverage. Leverage amplifies your gains, but it also amplifies your losses. It is the only way a {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} investor can lose more than 100% of their money.'
    },
    { id: 'b28', type: 'concept', title: 'The Sleep Test', content: 'If you are lying awake at night worrying about your portfolio, your position size is too big. Sell half of it until you can sleep peacefully.'
    },
    { id: 'b29', type: 'concept', title: 'Conclusion', content: 'Capital preservation is boring, but it is the only way to survive long enough to experience the magic of compound interest.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your risk management skills in a live simulation.', tool: 'dynamic',
      toolProps: {
        scenario: "You have a $10,000 portfolio. You see a biotech stock that might cure a disease. It could go up 1,000%, but if the FDA rejects the drug tomorrow, it will go to $0.",
        startingBalance: 10000,
        choices: [
          { text: "Go all-in with $10,000. The reward is worth the risk.", result: -10000, feedback: "The FDA rejected the drug. The stock went to $0. Because you didn't use Position Sizing, your entire account is gone. You are out of the game permanently." },
          { text: "Risk 2% of your account ($200) on the trade.", result: 2000, feedback: "The drug was approved! The stock went up 1,000%. Your $200 turned into $2,000. More importantly, if it failed, you would have easily survived a $200 loss." },
          { text: "Short sell the stock.", result: -5000, feedback: "The drug was approved. The stock rocketed 1,000% instantly, triggering a massive margin call on your short position." }
        ]
      }
    }
  ]
};
