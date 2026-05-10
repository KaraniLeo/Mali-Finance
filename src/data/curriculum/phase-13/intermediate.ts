import { Lesson } from '../../../types/curriculum';

export const intermediateLesson: Lesson = {
  id: 'p13-intermediate',
  title: 'Bonds, Yield Curves & The Debt Cycle',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Bond Market', content: 'The stock market gets the news, but the Bond Market is where the real money is. It is vastly larger than the stock market. A Bond is simply an I.O.U. You lend money to the government, and they promise to pay you back with interest.'
    },
    { id: 'i2', type: 'insight', title: 'Bond Prices vs Yields', content: 'The most important rule in finance: Bond Prices and Bond Yields (Interest Rates) move inversely. If Interest Rates go UP, the price of existing Bonds goes DOWN.'
    },
    { id: 'i3', type: 'example', title: 'The Seesaw', content: 'You hold a bond paying 2%. The Fed suddenly raises rates to 5%. Nobody wants to buy your 2% bond when they can buy a brand new one paying 5%. The only way you can sell yours is by slashing the price. Rates up = Prices down.'
    },
    { id: 'i4', type: 'exercise', title: 'Bond Mechanics', content: 'If the Federal Reserve announces a massive increase in Interest Rates, what immediately happens to the price of existing bonds?', options: ['They go up.', 'They go down, because their lower fixed interest rate is now less attractive to investors.', 'Nothing happens.'], correctAnswer: 'They go down, because their lower fixed interest rate is now less attractive to investors.'
    },
    { id: 'i5', type: 'concept', title: 'The Yield Curve', content: 'A chart plotting the interest rates of bonds with different maturity dates (e.g., 2-year vs 10-year). Normally, the curve slopes upward: you demand a higher interest rate for locking up your money for 10 years than for 2 years.'
    },
    { id: 'i6', type: 'warning', title: 'The Inverted Yield Curve', content: 'When the 2-year bond pays a HIGHER interest rate than the 10-year bond, the curve "Inverts". This means investors are terrified of the near-term future. It is the most historically accurate predictor of a massive Recession.'
    },
    { id: 'i7', type: 'exercise', title: 'Yield Curve Inversion', content: 'What does an "Inverted Yield Curve" historically signal?', options: ['A massive economic boom is coming.', 'Investors are terrified of the short-term future, historically signaling an impending Recession.', 'The government is printing money.'], correctAnswer: 'Investors are terrified of the short-term future, historically signaling an impending Recession.'
    },
    { id: 'i8', type: 'concept', title: 'Quantitative Easing (QE)', content: 'When interest rates hit 0%, the Fed can\'t lower them anymore. So they use QE. They literally print digital money out of thin air and use it to buy trillions of dollars of Bonds and Mortgages from banks.'
    },
    { id: 'i9', type: 'insight', title: 'The Wealth Effect', content: 'QE floods the banks with cash. The banks then lend that cash to hedge funds, who use it to buy stocks. Stock prices skyrocket, making rich people richer. This is why the stock market can hit All-Time Highs even during a global pandemic.'
    },
    { id: 'i10', type: 'concept', title: 'Quantitative Tightening (QT)', content: 'The reverse of QE. The Fed stops buying bonds and starts destroying the digital money they created. This drains liquidity out of the financial system, causing stock markets and crypto to crash.'
    },
    { id: 'i11', type: 'exercise', title: 'Central Bank Mechanics', content: 'What is Quantitative Easing (QE)?', options: ['A tax on the rich.', 'When the Central Bank prints digital money to buy massive amounts of bonds, flooding the financial system with liquidity and driving asset prices up.', 'A mathematical formula for stocks.'], correctAnswer: 'When the Central Bank prints digital money to buy massive amounts of bonds, flooding the financial system with liquidity and driving asset prices up.'
    },
    { id: 'i12', type: 'concept', title: 'The Short-Term Debt Cycle (5-8 Years)', content: 'The economy naturally breathes in and out. Credit expands (Boom), inflation rises, the Fed raises rates, credit contracts (Recession), inflation falls, the Fed lowers rates, and the cycle starts again.'
    },
    { id: 'i13', type: 'insight', title: 'The Reset', content: 'Recessions are not inherently evil. They are a necessary "forest fire" that burns away the dead wood (inefficient, over-leveraged companies) so new, healthy companies can grow.'
    },
    { id: 'i14', type: 'concept', title: 'The Long-Term Debt Cycle (75-100 Years)', content: 'During every Short-Term cycle, debt never fully resets to zero. Over decades, massive debt accumulates at the sovereign (government) level. Eventually, the debt becomes so large that it can never be mathematically repaid.'
    },
    { id: 'i15', type: 'warning', title: 'The Sovereign Debt Crisis', content: 'When a country\'s debt becomes unpayable, they have two choices: Default (refuse to pay, destroying the country\'s credit) or Inflate (print infinite money to pay the debt, destroying the currency). Politicians always choose Inflation.'
    },
    { id: 'i16', type: 'exercise', title: 'Long-Term Debt', content: 'When a government accumulates a massive debt that is mathematically impossible to repay through taxes, what do they historically do?', options: ['They declare bankruptcy and close the government.', 'They print massive amounts of currency to inflate the debt away, destroying the purchasing power of the citizens.', 'They ask other countries for donations.'], correctAnswer: 'They print massive amounts of currency to inflate the debt away, destroying the purchasing power of the citizens.'
    },
    { id: 'i17', type: 'concept', title: 'Fiat Currency', content: 'Money that is not backed by gold or anything physical. It has value simply because the government decrees it is legal tender, and demands you pay your taxes in it.'
    },
    { id: 'i18', type: 'insight', title: 'The Petrodollar System', content: 'The US Dollar is the global reserve currency. Why? Because in the 1970s, the US made a deal with Saudi Arabia: Saudi Arabia will only sell oil in US Dollars. If any country wants oil, they must hold US Dollars, creating massive global demand.'
    },
    { id: 'i19', type: 'concept', title: 'De-Dollarization', content: 'Rival nations (BRICS) are currently attempting to bypass the US Dollar by trading oil and goods in their own local currencies or gold, threatening the Dollar\'s global hegemony.'
    },
    { id: 'i20', type: 'exercise', title: 'Global Finance', content: 'What mechanism historically cemented the U.S. Dollar as the global reserve currency?', options: ['The fact that the U.S. has the best banks.', 'The Petrodollar agreement, which forced all countries to hold U.S. Dollars if they wanted to buy oil on the global market.', 'A vote by the United Nations.'], correctAnswer: 'The Petrodollar agreement, which forced all countries to hold U.S. Dollars if they wanted to buy oil on the global market.'
    },
    { id: 'i21', type: 'concept', title: 'The Cantillon Effect', content: 'When the government prints new money, it does not distribute evenly. The people closest to the money printer (banks, politicians, hedge funds) get the money first, before prices rise. By the time the money trickles down to the working class, inflation has already destroyed its value.'
    },
    { id: 'i22', type: 'insight', title: 'The Wealth Gap', content: 'The Cantillon Effect is the mathematical reason the wealth gap continues to widen. The system structurally steals purchasing power from those who hold cash, and transfers it to those who hold assets (stocks, real estate).'
    },
    { id: 'i23', type: 'concept', title: 'Stagflation', content: 'The worst possible economic scenario. Stagnation (high unemployment, no growth) combined with Inflation (skyrocketing prices). The Fed is trapped: if they lower rates, inflation gets worse. If they raise rates, unemployment gets worse.'
    },
    { id: 'i24', type: 'warning', title: 'The 1970s', content: 'The 1970s was a decade of Stagflation. The stock market went nowhere for 10 years, while the cost of living exploded. The only assets that survived were hard commodities like Gold.'
    },
    { id: 'i25', type: 'exercise', title: 'Economic Nightmares', content: 'What is "Stagflation"?', options: ['A period of rapid economic growth and falling prices.', 'A devastating scenario where economic growth stops (high unemployment) but prices continue to skyrocket (inflation).', 'When the stock market closes for a week.'], correctAnswer: 'A devastating scenario where economic growth stops (high unemployment) but prices continue to skyrocket (inflation).'
    },
    { id: 'i26', type: 'concept', title: 'Financial Repression', content: 'A stealthy government tactic to reduce national debt. They keep interest rates artificially lower than inflation. If inflation is 5% and your bank pays 1%, the government is secretly taxing you 4% a year to melt away their own debt.'
    },
    { id: 'i27', type: 'insight', title: 'M2 Money Supply', content: 'The total amount of cash and checking deposits in the economy. Pro investors watch the M2 chart closer than the stock chart. If M2 is expanding violently, buy assets. If M2 is shrinking, buy dollars.'
    },
    { id: 'i28', type: 'concept', title: 'Summary', content: 'You do not live in a free market. You live in a centrally planned, credit-based economy. To survive, you must anticipate the moves of the central planners.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of the Yield Curve and the Fed in a live scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "The Yield Curve just violently inverted (2-year bonds pay 5%, 10-year bonds pay 3%). The Fed announces they are beginning Quantitative Tightening (QT) to fight inflation.",
        startingBalance: 100000,
        choices: [
          { text: "Buy risky tech stocks on margin. The economy is booming!", result: -70000, feedback: "A catastrophic failure. The inverted yield curve signaled a massive impending recession, and QT meant the Fed was actively draining liquidity from the market. Tech stocks were decimated as borrowing costs skyrocketed. You were wiped out." },
          { text: "Move 80% of your portfolio to short-term Treasury bonds locking in the 5% yield, and wait for the crash.", result: 5000, feedback: "Pro execution. You read the macroeconomic indicators perfectly. You locked in a high, risk-free yield while the rest of the market crashed, preserving your capital to buy cheap assets later." },
          { text: "Buy Gold because of the inflation.", result: -10000, feedback: "A decent thesis, but wrong timing. Because the Fed was doing QT and raising rates, the U.S. Dollar strengthened massively, which historically crushes the price of Gold in the short term." }
        ]
      }
    }
  ]
};
