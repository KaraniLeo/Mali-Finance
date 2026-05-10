import { Lesson } from '../../../types/curriculum';

export const beginnerLesson: Lesson = {
  id: 'p13-beginner',
  title: 'Introduction to Macroeconomics',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'What is Macroeconomics?', content: 'Microeconomics is studying how one person or one company makes money. Macroeconomics is studying how entire countries, central banks, and global economies function as a giant, interconnected machine.'
    },
    { id: 'b2', type: 'insight', title: 'The Economic Machine', content: 'The economy looks complex, but it is just a machine driven by three main forces: Productivity Growth, The Short-Term Debt Cycle (recessions), and The Long-Term Debt Cycle (depressions).'
    },
    { id: 'b3', type: 'example', title: 'Productivity', content: 'In the long run, the only way a country gets richer is if its people become more productive (inventing tractors instead of farming by hand, or inventing AI instead of coding by hand).'
    },
    { id: 'b4', type: 'exercise', title: 'Economic Growth', content: 'In the long run, what is the true driver of a country\'s wealth and rising standard of living?', options: ['Printing more paper money.', 'Innovation and Productivity Growth.', 'Raising taxes on the poor.'], correctAnswer: 'Innovation and Productivity Growth.'
    },
    { id: 'b5', type: 'concept', title: 'Credit is Money', content: 'Most of the "money" in the world isn\'t physical cash. It is Credit (debt). When you swipe a credit card, you are literally creating new money out of thin air based on a promise to pay it back.'
    },
    { id: 'b6', type: 'insight', title: 'One Man\'s Debt is Another Man\'s Income', content: 'If you borrow money to buy a car, the car salesman gets paid. He then spends that money on a vacation. The hotel owner gets paid. Credit drives the entire economy forward.'
    },
    { id: 'b7', type: 'warning', title: 'The Hangover', content: 'Borrowing money allows you to consume more than you produce today. But eventually, you have to pay it back. To pay it back, you must consume LESS than you produce in the future. This drop in spending causes a Recession.'
    },
    { id: 'b8', type: 'exercise', title: 'The Nature of Credit', content: 'Why does borrowing money to stimulate the economy eventually lead to a recession?', options: ['Because borrowing money is illegal.', 'Because credit allows you to spend more today, but forces you to drastically cut your spending in the future to repay the debt.', 'Because credit is fake.'], correctAnswer: 'Because credit allows you to spend more today, but forces you to drastically cut your spending in the future to repay the debt.'
    },
    { id: 'b9', type: 'concept', title: 'The Central Bank (The Fed)', content: 'The Federal Reserve (The Fed) is the central bank of the United States. It does not print physical cash. Its main job is to control the flow of Credit in the economy using Interest Rates.'
    },
    { id: 'b10', type: 'example', title: 'The Gas Pedal', content: 'If the economy is crashing (Recession), the Fed lowers Interest Rates to 0%. Borrowing money becomes incredibly cheap. People borrow to buy houses, companies borrow to hire workers. The economy booms. This is "Stimulus".'
    },
    { id: 'b11', type: 'warning', title: 'The Brake Pedal', content: 'If the economy grows too fast, Inflation happens (prices skyrocket). The Fed raises Interest Rates. Borrowing money becomes very expensive. People stop spending, companies fire workers, and prices drop. This causes pain, but kills inflation.'
    },
    { id: 'b12', type: 'exercise', title: 'Central Banking', content: 'What tool does the Central Bank use to slow down an overheating, inflationary economy?', options: ['They lower interest rates to 0%.', 'They raise interest rates, making borrowing expensive and forcing people to stop spending.', 'They ban people from buying groceries.'], correctAnswer: 'They raise interest rates, making borrowing expensive and forcing people to stop spending.'
    },
    { id: 'b13', type: 'concept', title: 'Gross Domestic Product (GDP)', content: 'GDP is the total dollar value of all goods and services produced by a country in one year. It is the scorecard of the economy. If GDP is rising, the economy is growing.'
    },
    { id: 'b14', type: 'insight', title: 'The GDP Illusion', content: 'If a country\'s GDP grows by 5%, but inflation is 10%, the country actually got POORER. The numbers went up, but the purchasing power of those numbers went down. This is "Real" vs "Nominal" GDP.'
    },
    { id: 'b15', type: 'exercise', title: 'Economic Indicators', content: 'What does Gross Domestic Product (GDP) measure?', options: ['The amount of gold a country has.', 'The total dollar value of all goods and services produced by a country in a year.', 'The average age of citizens.'], correctAnswer: 'The total dollar value of all goods and services produced by a country in a year.'
    },
    { id: 'b16', type: 'concept', title: 'Inflation', content: 'Inflation is the invisible tax. It is the rate at which the price of goods (food, rent, gas) increases over time. 2% inflation means a $100 grocery bill will cost $102 next year.'
    },
    { id: 'b17', type: 'warning', title: 'The Silent Thief', content: 'If you keep $10,000 in a savings account paying 1% interest, but inflation is 5%, you are losing 4% of your purchasing power every single year. You are bleeding wealth while doing nothing.'
    },
    { id: 'b18', type: 'concept', title: 'Deflation', content: 'Deflation is when prices drop. It sounds good (cheaper TVs!), but it destroys economies. If prices are dropping, people delay buying things ("I\'ll buy it next year when it\'s cheaper"). Because nobody buys anything, companies go bankrupt.'
    },
    { id: 'b19', type: 'exercise', title: 'Price Mechanics', content: 'Why do Central Banks fear Deflation (falling prices) more than Inflation?', options: ['Because cheaper prices help the poor.', 'Because it causes consumers to stop spending entirely, leading to massive bankruptcies and economic collapse.', 'Because it makes the stock market go up.'], correctAnswer: 'Because it causes consumers to stop spending entirely, leading to massive bankruptcies and economic collapse.'
    },
    { id: 'b20', type: 'concept', title: 'The CPI (Consumer Price Index)', content: 'The CPI is how the government officially measures inflation. They track the price of a "basket" of goods (milk, rent, gas) every month.'
    },
    { id: 'b21', type: 'insight', title: 'The Flawed Basket', content: 'Many argue the CPI is manipulated to look artificially low. It often excludes volatile items like food and energy, or uses "substitution" (if beef gets too expensive, they swap it for cheaper chicken in the basket to hide the price increase).'
    },
    { id: 'b22', type: 'concept', title: 'Unemployment Rate', content: 'The percentage of people who WANT to work but cannot find a job. The Fed has a "Dual Mandate": Keep inflation low, and keep unemployment low. They are constantly balancing these two conflicting goals.'
    },
    { id: 'b23', type: 'warning', title: 'The Phillips Curve', content: 'Usually, when unemployment is very low, everyone has money, so they spend heavily, causing inflation to rise. To kill the inflation, the Fed must raise rates, which intentionally causes unemployment to rise.'
    },
    { id: 'b24', type: 'exercise', title: 'The Dual Mandate', content: 'What are the two primary, often conflicting, goals of the Federal Reserve?', options: ['To print money and buy Bitcoin.', 'To keep inflation low while also maximizing employment.', 'To help the stock market go up.'], correctAnswer: 'To keep inflation low while also maximizing employment.'
    },
    { id: 'b25', type: 'concept', title: 'Fiscal Policy vs Monetary Policy', content: 'Monetary Policy = The Fed changing interest rates. Fiscal Policy = The Government passing laws to tax people or spend money (like stimulus checks).'
    },
    { id: 'b26', type: 'insight', title: 'The Stimulus Bomb', content: 'In 2020, the Fed dropped interest rates to 0% (Monetary), AND the Government handed out trillions in free checks (Fiscal). This massive injection of money into a closed economy caused the highest inflation in 40 years.'
    },
    { id: 'b27', type: 'concept', title: 'Safe Havens', content: 'When the global economy panics (war, pandemic), investors flee volatile assets (stocks) and buy "Safe Havens" like Gold or US Treasury Bonds to protect their capital.'
    },
    { id: 'b28', type: 'insight', title: 'The Everything Correlation', content: 'During a massive panic (liquidity crisis), people sell EVERYTHING to get cash. Gold drops. Bitcoin drops. Stocks drop. Safe havens fail initially because the world is desperate for U.S. Dollars to pay off debts.'
    },
    { id: 'b29', type: 'concept', title: 'Summary', content: 'Macroeconomics is the study of human behavior at a global scale. It is a pendulum swinging between greed (credit expansion) and fear (deleveraging).'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Interest Rates and Inflation in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "Inflation just hit 9%. A loaf of bread costs $10. The Federal Reserve announces an emergency meeting. You hold $50,000 in high-growth, unprofitable tech stocks.",
        startingBalance: 50000,
        choices: [
          { text: "Hold the stocks. High inflation means prices go up, so the stock prices will go up too!", result: -30000, feedback: "You failed to anticipate the Fed's reaction. To kill the 9% inflation, the Fed violently raised Interest Rates. High rates crush unprofitable tech companies because borrowing money to survive becomes too expensive. Your stocks crashed." },
          { text: "Sell the tech stocks immediately and move to cash or short-term Treasury bonds.", result: 5000, feedback: "Pro execution. You knew 9% inflation would force the Fed to raise rates. Rising rates crush risky stocks but make safe, short-term government bonds highly attractive. You protected your capital." },
          { text: "Take out a massive bank loan to buy more stocks.", result: -45000, feedback: "The worst possible choice. The Fed raised rates, meaning the interest on your new loan skyrocketed. The stocks crashed. You are now drowning in expensive debt with worthless collateral." }
        ]
      }
    }
  ]
};
