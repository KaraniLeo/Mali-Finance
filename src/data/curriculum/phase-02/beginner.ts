import { Lesson } from '../../../types/curriculum';
import { phase02Images } from '../phase-02-images';

export const beginnerLesson: Lesson = {
  id: 'p2-beginner',
  title: 'Inflation & The Cost of Living',
  level: 'beginner',
  cards: [
    { id: 'b1', type: 'concept', title: 'What is Macroeconomics?', content: 'Microeconomics is the study of individual businesses (like studying one tree). Macroeconomics is the study of the entire global economy (like studying the whole forest).'
    },
    { id: 'b2', type: 'insight', title: 'The Top-Down View', content: 'You can pick the best stock in the world, but if the global economy crashes, your stock will crash with it. Macroeconomics tells you whether the wind is at your back or in your face.'
    },
    { id: 'b3', type: 'concept', title: 'What is Inflation?', content: 'Inflation is the rate at which the general level of prices for goods and services is rising. As inflation rises, every dollar you own buys a smaller percentage of a good.'
    },
    { id: 'b4', type: 'example', title: 'The Bread Example', content: 'In 1930, a loaf of bread cost $0.09. Today, it costs $3.00. The bread didn\'t get better. The dollar just lost value. This is inflation.'
    },
    { id: 'b5', type: 'exercise', title: 'Inflation Math', content: 'If inflation is 5% per year, and you keep $1,000 under your mattress, what happens to your purchasing power?', options: ['It increases by 5%.', 'It stays the same.', 'It decreases by 5% every year.'], correctAnswer: 'It decreases by 5% every year.'
    },
    { id: 'b6', type: 'warning', title: 'The Silent Tax', content: 'Inflation is a silent tax on savers. If you leave your money in a standard {{INTERNATIONAL:bank account|KENYA:bank account or M-PESA wallet}} earning 0% interest, while inflation is 3%, you are mathematically getting poorer every single day.'
    },
    { id: 'b7', type: 'concept', title: 'Demand-Pull Inflation', content: 'This type of inflation happens when demand for goods outpaces supply. "Too much money chasing too few goods."'
    },
    { id: 'b8', type: 'example', title: 'The Concert Ticket', content: 'If Taylor Swift only has 10,000 tickets, but 1 million people have cash and want to go, the price of the tickets will skyrocket. That is demand-pull inflation.'
    },
    { id: 'b9', type: 'concept', title: 'Cost-Push Inflation', content: 'This happens when the cost of producing goods goes up, so businesses are forced to raise prices to survive.'
    },
    { id: 'b10', type: 'example', title: 'The Oil Crisis', content: 'If the price of oil doubles, it costs more to deliver groceries to the supermarket. The supermarket raises the price of groceries to cover the fuel cost. You pay more for milk.'
    },
    { id: 'b11', type: 'exercise', title: 'Inflation Causes', content: 'If a war destroys half the world\'s wheat supply, causing bread prices to triple, what kind of inflation is this?', options: ['Demand-Pull', 'Cost-Push', 'Deflation'], correctAnswer: 'Cost-Push'
    },
    { id: 'b12', type: 'concept', title: 'Deflation', content: 'Deflation is the opposite of inflation. Prices actually drop. While this sounds great for consumers, it is terrifying for the economy.'
    },
    { id: 'b13', type: 'insight', title: 'The Deflation Death Spiral', content: 'If everyone knows a TV will be cheaper tomorrow, nobody buys it today. Factories stop selling TVs, so they fire workers. Unemployed workers stop buying other things, causing more businesses to fail.'
    },
    { id: 'b14', type: 'concept', title: 'The Target Rate', content: 'Because deflation is a death spiral, governments actually WANT a little bit of inflation. Most central banks target a 2% inflation rate per year.'
    },
    { id: 'b15', type: 'concept', title: 'Gross Domestic Product (GDP)', content: 'GDP is the total monetary value of all finished goods and services made within a country during a specific period. It is the ultimate scoreboard for a country\'s economy.'
    },
    { id: 'b16', type: 'insight', title: 'GDP Growth', content: 'If GDP goes up, the economy is growing, businesses are making more money, and stocks generally rise. If GDP drops for two consecutive quarters, the country is officially in a Recession.'
    },
    { id: 'b17', type: 'exercise', title: 'The Recession Rule', content: 'What is the technical definition of a recession?', options: ['When the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} drops 20%.', 'Two consecutive quarters of negative GDP growth.', 'When unemployment hits 10%.'], correctAnswer: 'Two consecutive quarters of negative GDP growth.'
    },
    { id: 'b18', type: 'concept', title: 'Unemployment Rate', content: 'The percentage of the labor force that is jobless and actively looking for work. High unemployment means a weak economy.'
    },
    { id: 'b19', type: 'warning', title: 'The {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} is NOT the Economy', content: 'The {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} is forward-looking. During a massive recession with high unemployment, the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} might actually hit all-time highs because investors believe the worst is over and are buying the dip.'
    },
    { id: 'b20', type: 'concept', title: 'Fiscal Policy', content: 'Fiscal policy refers to the Government (politicians) changing tax rates and government spending to influence the economy.'
    },
    { id: 'b21', type: 'example', title: 'Stimulus Checks', content: 'During a crisis, the government might send $1,000 checks to every citizen. This is Fiscal Policy. It instantly boosts demand-pull inflation because everyone suddenly has money to spend.'
    },
    { id: 'b22', type: 'exercise', title: 'Who Controls Fiscal Policy?', content: 'Who is in charge of Fiscal Policy?', options: ['The Central Bank', 'The Government (Congress/President)', 'Wall Street Banks'], correctAnswer: 'The Government (Congress/President)'
    },
    { id: 'b23', type: 'concept', title: 'The Central Bank', content: 'While the Government controls Fiscal Policy, the Central Bank (like the US {{INTERNATIONAL:Federal Reserve|KENYA:Central Bank of Kenya (CBK)}}) controls Monetary Policy. They control the money supply and {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}}.'
    },
    { id: 'b24', type: 'insight', title: 'The Independent Engine', content: 'The Central Bank is designed to be independent of politicians. Politicians always want the economy to boom so they get re-elected. The Central Bank\'s job is to take away the punch bowl when the party gets out of hand.'
    },
    { id: 'b25', type: 'concept', title: '{{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} (The Cost of Money)', content: 'When you borrow money to buy a house, you pay interest. Who decides that base interest rate? The Central Bank.'
    },
    { id: 'b26', type: 'insight', title: 'The Gravity of Finance', content: '{{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} are the gravity of the financial world. When {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} are at 0%, money is essentially free. Businesses borrow billions to expand, and the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} moons.'
    },
    { id: 'b27', type: 'example', title: 'The Squeeze', content: 'When inflation gets too high, the Central Bank raises {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} to 5%. Suddenly, mortgages are expensive, credit cards are expensive, and businesses stop expanding. The economy slows down.'
    },
    { id: 'b28', type: 'exercise', title: 'Interest Rate Logic', content: 'If inflation is hitting a dangerous 10%, what will the Central Bank likely do?', options: ['Lower {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} to 0% to stimulate the economy.', 'Raise {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} to slow down spending and destroy demand.', 'Print more money.'], correctAnswer: 'Raise {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} to slow down spending and destroy demand.'
    },
    { id: 'b29', type: 'concept', title: 'The See-Saw', content: '{{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} and the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} usually operate on a see-saw. When rates go down, stocks go up. When rates go up, stocks go down.'
    },
    { id: 'b30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of inflation and purchasing power in a live simulation.', tool: 'dynamic',
      toolProps: {
        scenario: "You have $50,000 in savings. The government announces a massive stimulus package, printing trillions of dollars. Inflation instantly spikes to 8% per year. What do you do with your cash?",
        startingBalance: 50000,
        choices: [
          { text: "Leave it in a standard checking account earning 0% interest because it's 'safe'.", result: -4000, feedback: "You lost $4,000 in purchasing power this year. The money is physically still there, but everything you want to buy costs 8% more. You are being silently taxed into poverty." },
          { text: "Invest it into hard assets like real estate or high-quality stocks.", result: 6000, feedback: "Smart move. Hard assets generally rise with inflation because they are priced in dollars. As the dollar loses value, the nominal price of your assets goes up, protecting your wealth." },
          { text: "Take out a massive loan to buy a depreciating asset like a luxury car.", result: -20000, feedback: "Terrible idea. You locked yourself into high-interest debt for an asset that drops in value every day, while inflation destroys the value of the cash you use to make the payments." }
        ]
      }
    }
  ]
};
