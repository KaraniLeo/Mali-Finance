import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p11-beginner',
  title: 'The Psychology of Money',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'The Ultimate Opponent', content: 'In trading, your ultimate opponent is not the market. It is not the institutions. Your ultimate opponent is yourself. The market is just a mirror reflecting your own greed and fear back at you.'
    },
    { id: 'b2', type: 'insight', title: 'Human Evolution', content: 'Our brains evolved over millions of years to survive in the wild. We are hard-wired to run from danger (panic selling) and follow the herd (FOMO buying). These exact survival instincts are what destroy you in the financial markets.'
    },
    { id: 'b3', type: 'example', title: 'The FOMO Trap', content: 'You see a stock go up 100%. All your friends are making money. Your brain perceives this as "being left behind by the tribe" (a fatal threat in evolutionary terms). You panic-buy at the absolute top, just before it crashes.'
    },
    { id: 'b4', type: 'exercise', title: 'Evolutionary Finance', content: 'Why do humans naturally make terrible investors?', options: ['Because math is too hard.', 'Because our evolutionary survival instincts (fear, greed, herd mentality) trigger the exact opposite behaviors needed for successful investing.', 'Because the stock market is rigged.'], correctAnswer: 'Because our evolutionary survival instincts (fear, greed, herd mentality) trigger the exact opposite behaviors needed for successful investing.'
    },
    { id: 'b5', type: 'concept', title: 'Loss Aversion', content: 'Psychological studies show that the pain of losing $100 is twice as intense as the joy of making $100. Humans hate losing so much that they will make irrational, dangerous decisions just to avoid admitting a loss.'
    },
    { id: 'b6', type: 'insight', title: 'Holding Losers', content: 'Because of Loss Aversion, when a stock drops 20%, you refuse to sell. "It\'s only a paper loss. If I sell, it becomes real." So you hold it all the way down to a 90% loss, destroying your account.'
    },
    { id: 'b7', type: 'warning', title: 'Selling Winners', content: 'Conversely, when a stock goes up 10%, you panic and sell it immediately because you are terrified of losing the tiny profit. You cut your winners short, and let your losers run. This is the recipe for bankruptcy.'
    },
    { id: 'b8', type: 'exercise', title: 'Loss Aversion', content: 'What is the most common behavioral mistake caused by Loss Aversion?', options: ['Taking profits too slowly.', 'Refusing to sell a losing stock because it forces you to admit defeat, leading to catastrophic losses.', 'Buying index funds.'], correctAnswer: 'Refusing to sell a losing stock because it forces you to admit defeat, leading to catastrophic losses.'
    },
    { id: 'b9', type: 'concept', title: 'Confirmation Bias', content: 'When you buy a stock, your brain instantly filters out all negative news about that company, and aggressively searches for positive news to validate your decision.'
    },
    { id: 'b10', type: 'example', title: 'The Echo Chamber', content: 'You buy a crypto token. You join the token\'s Discord server. Everyone in there is screaming that it will go to the moon. You ignore the glaring flaws in the code because the echo chamber confirms your bias.'
    },
    { id: 'b11', type: 'insight', title: 'Seek the Bear Case', content: 'Professional investors do the opposite. The moment they buy a stock, they actively seek out the smartest people who HATE the stock, to see if their thesis has blind spots.'
    },
    { id: 'b12', type: 'exercise', title: 'Combating Bias', content: 'How do you defeat Confirmation Bias?', options: ['Only read news that agrees with your trade.', 'Actively seek out the smartest "Bear Case" (arguments against your investment) and evaluate them objectively.', 'Ignore all news.'], correctAnswer: 'Actively seek out the smartest "Bear Case" (arguments against your investment) and evaluate them objectively.'
    },
    { id: 'b13', type: 'concept', title: 'The Endowment Effect', content: 'Humans place a higher value on objects simply because they own them. Once a stock is in your portfolio, you magically believe it is better than all the other stocks you don\'t own.'
    },
    { id: 'b14', type: 'warning', title: 'Marrying Your Bags', content: '"Bagholding" is the result of the Endowment Effect. You fall in love with the company. You forget that the company doesn\'t know you exist, and doesn\'t care about you. It is just a ticker symbol.'
    },
    { id: 'b15', type: 'concept', title: 'Anchoring', content: 'Your brain relies too heavily on the first piece of information it receives. If a stock was $100 last year, and is $10 today, your brain is anchored to $100. You think it\'s "cheap."'
    },
    { id: 'b16', type: 'example', title: 'The Value Trap', content: 'Blockbuster Video was anchored at $30. When it dropped to $5, people thought it was a massive bargain. It wasn\'t a bargain; the business model was dead. It went to $0. It was a Value Trap.'
    },
    { id: 'b17', type: 'exercise', title: 'Psychological Anchors', content: 'Why is it dangerous to buy a stock simply because it is down 80% from its All-Time High?', options: ['Because stocks never go back up.', 'Because you are "Anchoring" to the old high price, ignoring that the fundamental business might now be worthless.', 'Because the government bans buying dips.'], correctAnswer: 'Because you are "Anchoring" to the old high price, ignoring that the fundamental business might now be worthless.'
    },
    { id: 'b18', type: 'concept', title: 'The Gambler\'s Fallacy', content: 'The belief that past random events affect future probabilities. "The roulette wheel landed on red 5 times in a row, so black is definitely next!" (The odds are still exactly 50/50).'
    },
    { id: 'b19', type: 'insight', title: 'The Bounce Illusion', content: '"This stock has dropped 10 days in a row, it HAS to have a green day tomorrow." No, it doesn\'t. The market does not owe you a bounce.'
    },
    { id: 'b20', type: 'concept', title: 'Hindsight Bias', content: '"I knew the market was going to crash!" No, you didn\'t. Hindsight bias makes you believe past events were predictable, leading to extreme overconfidence in your ability to predict the future.'
    },
    { id: 'b21', type: 'warning', title: 'The Illusion of Control', content: 'When you make money, you think you are a genius. When you lose money, you blame the Federal Reserve, the algorithms, or bad luck. You are confusing a bull market with brains.'
    },
    { id: 'b22', type: 'exercise', title: 'Overconfidence', content: 'What is the danger of Hindsight Bias?', options: ['It makes you depressed.', 'It convinces you that the market is predictable, leading you to take massive, reckless risks based on "gut feelings".', 'It makes you sell too early.'], correctAnswer: 'It convinces you that the market is predictable, leading you to take massive, reckless risks based on "gut feelings".'
    },
    { id: 'b23', type: 'concept', title: 'Emotional Regulation', content: 'The goal of trading is not to eliminate emotion (which is impossible). The goal is to recognize the emotion, and refuse to let it dictate your physical actions.'
    },
    { id: 'b24', type: 'insight', title: 'The Mechanical Execution', content: 'The only way to beat your own psychology is to have a strict, written trading plan BEFORE you enter the trade. Where is your entry? Where is your Stop Loss? Where is your Take Profit?'
    },
    { id: 'b25', type: 'example', title: 'The Robot Trader', content: 'Once the trade is placed, you must become a robot. If the Stop Loss hits, the robot sells. The robot does not hope. The robot does not pray. The robot simply executes the plan.'
    },
    { id: 'b26', type: 'concept', title: 'Revenge Trading', content: 'You take a bad loss. You are furious. You instantly enter a massive, highly-leveraged trade to "win it back" from the market. This is Revenge Trading, and it is how accounts go to zero.'
    },
    { id: 'b27', type: 'warning', title: 'The Walk Away Rule', content: 'If you suffer a massive loss, or hit your daily loss limit, you must physically stand up and walk away from the computer. Your brain is compromised. You are trading on tilt.'
    },
    { id: 'b28', type: 'exercise', title: 'Discipline', content: 'What should you do immediately after suffering a massive, unexpected loss?', options: ['Double your position size to win it back.', 'Physically walk away from the screen for the rest of the day to prevent emotional Revenge Trading.', 'Complain on Twitter.'], correctAnswer: 'Physically walk away from the screen for the rest of the day to prevent emotional Revenge Trading.'
    },
    { id: 'b29', type: 'concept', title: 'Summary', content: 'You cannot control the market. You can only control your reaction to it. Master your psychology, and the strategy will follow. Fail to master your psychology, and no strategy can save you.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your emotional control and bias awareness in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "You bought a stock at $100. It is now at $60. Your pre-determined Stop Loss was $70, but you canceled it because you 'had a good feeling' about the CEO. The company just announced an SEC investigation.",
        startingBalance: 10000,
        choices: [
          { text: "Double down. Buy more at $60 to lower your average cost. Be greedy when others are fearful!", result: -6000, feedback: "You fell for the Anchoring and Gambler's Fallacies. You averaged down into a dying company. The stock dropped to $0 following the SEC probe. You lost everything because you refused to admit you were wrong." },
          { text: "Hold the stock. It's only a paper loss. If you sell, you lock it in.", result: -4000, feedback: "Classic Loss Aversion. You held the stock all the way down to $20. You paralyzed your capital in a dead asset for years, suffering massive opportunity cost." },
          { text: "Sell immediately at $60. Take the loss and execute the delayed risk management.", result: -4000, feedback: "Painful, but correct. You broke your rule by canceling the Stop Loss, but you finally woke up and cut the cancer out of your portfolio before it went to $0. You have capital left to trade tomorrow." }
        ]
      }
    }
  ]
};
