import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p11-intermediate',
  title: 'Market Sentiment & Cycles',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Wall Street Cheat Sheet', content: 'Markets do not move in straight lines. They move in psychological cycles driven by human emotion: Disbelief, Hope, Optimism, Belief, Thrill, Euphoria, Complacency, Anxiety, Denial, Panic, Capitulation, Anger, and Depression.'
    },
    { id: 'i2', type: 'insight', title: 'The Cycle of Doom', content: 'Retail investors almost always buy during "Euphoria" (when the asset is on the news and everyone is rich), and sell during "Panic" (when the market crashes and everyone is terrified). They buy the exact top and sell the exact bottom.'
    },
    { id: 'i3', type: 'example', title: 'Smart Money vs Dumb Money', content: 'Smart Money (Institutions) accumulates assets quietly during "Depression" when nobody wants them. They sell those exact same assets to Dumb Money (Retail) during "Euphoria" at a massive markup.'
    },
    { id: 'i4', type: 'exercise', title: 'Market Cycles', content: 'At what stage of the market psychological cycle do retail investors usually flood into an asset?', options: ['Depression (when the price is lowest).', 'Euphoria (when the price is highest and it is on the news).', 'Disbelief.'], correctAnswer: 'Euphoria (when the price is highest and it is on the news).'
    },
    { id: 'i5', type: 'concept', title: 'Contrarian Investing', content: 'To beat the market, you must be a Contrarian. You must be willing to buy when there is blood in the streets, and sell when the bartender is giving you stock tips.'
    },
    { id: 'i6', type: 'insight', title: 'The Pain Trade', content: 'The "Pain Trade" is the direction the market moves that causes the maximum amount of financial pain to the majority of participants. If 90% of retail is heavily shorting the market, the Pain Trade is a massive rally that liquidates them all.'
    },
    { id: 'i7', type: 'concept', title: 'The VIX (Fear Gauge)', content: 'The Volatility Index (VIX) measures the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}}\'s expectation of volatility based on {{INTERNATIONAL:S&P 500 index|KENYA:NSE 20 Share Index}} index options. It is literally a mathematical measurement of Wall Street\'s fear.'
    },
    { id: 'i8', type: 'warning', title: 'VIX Spikes', content: 'When the VIX spikes above 30, institutions are panicking and buying crash insurance. When the VIX drops below 15, institutions are complacent and greedy.'
    },
    { id: 'i9', type: 'exercise', title: 'Sentiment Indicators', content: 'What does a massive, sudden spike in the VIX indicate?', options: ['The market is calm and bullish.', 'Extreme fear and panic among institutional investors.', '{{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} are dropping.'], correctAnswer: 'Extreme fear and panic among institutional investors.'
    },
    { id: 'i10', type: 'concept', title: 'Fear and Greed Index', content: 'A popular indicator that analyzes volatility, momentum, junk bond demand, and safe-haven demand to spit out a daily score from 0 (Extreme Fear) to 100 (Extreme Greed).'
    },
    { id: 'i11', type: 'insight', title: 'Using the Index', content: 'You do not trade strictly based on the index, but it provides macro context. If the index is at 95 (Extreme Greed), it is statistically a terrible time to deploy new long-term capital.'
    },
    { id: 'i12', type: 'concept', title: 'Social Media Sentiment', content: 'Twitter, Reddit, and Discord are massive echo chambers of financial sentiment. If a specific ticker symbol is trending #1 globally on Twitter, it is almost always a signal of Euphoria (a local top).'
    },
    { id: 'i13', type: 'example', title: 'The Shoe Shine Boy', content: 'In 1929, Joe Kennedy famously sold all his stocks right before the Great Depression because his shoe shine boy started giving him stock tips. When the absolute bottom of the retail food chain is hyper-bullish, there is no one left to buy.'
    },
    { id: 'i14', type: 'exercise', title: 'Retail Sentiment', content: 'If your Uber driver, bartender, and grandmother are all enthusiastically buying the exact same crypto token, what is the most likely market state?', options: ['The absolute bottom.', 'Extreme Euphoria (The Top), meaning a crash is statistically imminent.', 'A safe entry point.'], correctAnswer: 'Extreme Euphoria (The Top), meaning a crash is statistically imminent.'
    },
    { id: 'i15', type: 'concept', title: 'Capitulation', content: 'The violent, final stage of a bear market crash. Everyone who was holding out hope finally breaks psychologically and panic sells everything at any price just to stop the pain.'
    },
    { id: 'i16', type: 'insight', title: 'The Volume Climax', content: 'Capitulation is easy to spot on a chart. It features the largest red volume bar in history. It is the exact moment Smart Money steps in and absorbs all the panic selling, marking the absolute bottom.'
    },
    { id: 'i17', type: 'concept', title: 'The Trend is Your Friend', content: 'While being a contrarian is important for macro-investing, fighting a strong daily trend is suicide. "The market can remain irrational longer than you can remain solvent."'
    },
    { id: 'i18', type: 'warning', title: 'Catching Falling Knives', content: 'A stock drops 50% in an hour. You buy it because it\'s "cheap". It drops another 50%. Trying to pick the exact bottom of a crash is called "Catching a falling knife." You will get cut.'
    },
    { id: 'i19', type: 'exercise', title: 'Trend Following', content: 'What is the danger of trying to buy the exact bottom of a violently crashing stock?', options: ['You might make too much money.', 'You are "Catching a falling knife", fighting massive momentum that will likely crush your portfolio before reversing.', 'The broker will ban you.'], correctAnswer: 'You are "Catching a falling knife", fighting massive momentum that will likely crush your portfolio before reversing.'
    },
    { id: 'i20', type: 'concept', title: 'Herd Immunity', content: 'To survive in the markets, you must develop an immunity to the herd. You must feel physically uncomfortable when you agree with the majority of Twitter.'
    },
    { id: 'i21', type: 'insight', title: 'The 90/90/90 Rule', content: 'In retail trading, 90% of traders lose 90% of their money in the first 90 days. If you are doing exactly what the 90% are doing, you are mathematically guaranteed to lose.'
    },
    { id: 'i22', type: 'concept', title: 'Self-Sabotage (The Fear of Success)', content: 'Subconsciously, many traders do not believe they deserve wealth. When their account hits a new high, they will intentionally take a massive, reckless trade just to bring themselves back down to their psychological comfort zone.'
    },
    { id: 'i23', type: 'warning', title: 'Account High Euphoria', content: 'You are at your most vulnerable immediately after a massive winning streak. You feel invincible. You increase your position sizing. The market instantly humbles you.'
    },
    { id: 'i24', type: 'exercise', title: 'Psychological Vulnerability', content: 'When are you statistically most likely to take a reckless, account-destroying trade?', options: ['When you are bored.', 'Immediately after a massive winning streak, when Euphoria makes you feel invincible and immune to risk.', 'On Mondays.'], correctAnswer: 'Immediately after a massive winning streak, when Euphoria makes you feel invincible and immune to risk.'
    },
    { id: 'i25', type: 'concept', title: 'Process Over Outcome', content: 'You can make a terrible, reckless trade and win $10,000. You can execute a perfect, high-probability setup and lose $1,000. Do not judge your trading by the outcome of a single trade.'
    },
    { id: 'i26', type: 'insight', title: 'The Long Game', content: 'Judge your trading by your adherence to the Process. If you followed your rules perfectly and lost, it is a Good Trade. If you broke all your rules and won, it is a Bad Trade that reinforces terrible habits.'
    },
    { id: 'i27', type: 'concept', title: 'The Trading Journal', content: 'Professionals log every single trade. Not just the entry and exit, but how they FELT. Were they angry? Tired? FOMOing? By tracking emotions, you find the exact psychological triggers that cost you money.'
    },
    { id: 'i28', type: 'insight', title: 'Data Driven Psychology', content: 'You might look at your journal and realize: "Every time I trade on Fridays after a losing week, my win rate drops to 10%." The solution is simple: Stop trading on Fridays.'
    },
    { id: 'i29', type: 'concept', title: 'Summary', content: 'The market is a mechanism for transferring wealth from the impatient to the patient. From the emotional to the mechanical. Master the cycle.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your ability to read Market Sentiment in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "Bitcoin hits a new All-Time High of $100,000. Your favorite celebrities are tweeting about it. CNN is running special reports. The Fear and Greed index is at 98. Your Uber driver tells you he just took out a loan to buy BTC.",
        startingBalance: 50000,
        choices: [
          { text: "Take out a loan and go all-in. It's clearly going to $500,000.", result: -40000, feedback: "You fell for the Euphoria trap. When the shoe-shine boy is giving stock tips, the top is in. The market crashed 80% over the next year. You are bankrupt." },
          { text: "Hold your current position, but don't buy more.", result: -20000, feedback: "A safer choice, but you failed to recognize the extreme macro top. You rode the crash all the way back down, losing massive unrealized profits." },
          { text: "Quietly begin scaling out of your position and selling your bags to the retail Euphoria.", result: 50000, feedback: "Pro execution. You recognized the classic signs of extreme Euphoria. You acted as the Smart Money, selling your assets at a massive premium to the frantic retail herd right before the crash." }
        ]
      }
    }
  ]
};
