import { Lesson } from '../../../types/curriculum';
import { phase02Images } from '../phase-02-images';

export const intermediateLesson: Lesson = {
  id: 'p2-intermediate',
  title: 'Monetary Policy & Quantitative Easing',
  level: 'intermediate',
  cards: [
    { id: 'i1', type: 'concept', title: 'The Money Printer', content: 'You often hear that the Central Bank "prints money". While they literally print paper bills, 90% of money printing is entirely digital.'
    },
    { id: 'i2', type: 'insight', title: 'How Money is Created', content: 'When a bank issues a mortgage, they don\'t pull money out of a vault. They literally type numbers into a computer, creating that money out of thin air. Money is created through Debt.'
    },
    { id: 'i3', type: 'concept', title: 'Quantitative Easing (QE)', content: 'When the economy is crashing and lowering {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} to 0% isn\'t enough, the Central Bank uses Quantitative Easing.\n\nThey magically create trillions of digital dollars and use them to buy {{INTERNATIONAL:government bonds|KENYA:Treasury Bonds (T-Bonds) or Infrastructure Bonds}} and mortgage-backed securities from banks.'
    },
    { id: 'i4', type: 'example', title: 'The Wealth Effect', content: 'By injecting trillions of dollars into the banks, the banks have excess cash. They lend it out cheaply. This cash floods into the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} and real estate, pumping asset prices to all-time highs.'
    },
    { id: 'i5', type: 'exercise', title: 'The QE Result', content: 'What is the immediate effect of massive Quantitative Easing (money printing)?', options: ['The {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} crashes.', 'Asset prices (stocks, real estate) skyrocket due to massive liquidity injections.', 'Deflation occurs.'], correctAnswer: 'Asset prices (stocks, real estate) skyrocket due to massive liquidity injections.'
    },
    { id: 'i6', type: 'warning', title: 'The Hangover', content: 'QE is like giving a drug addict a massive hit of adrenaline. It saves them in the short term, but eventually, all that printed money causes severe inflation.'
    },
    { id: 'i7', type: 'concept', title: 'Quantitative Tightening (QT)', content: 'The opposite of QE. When inflation runs too hot, the Central Bank destroys money. They let the bonds they bought mature, and they erase the digital cash from existence, draining liquidity from the markets.'
    },
    { id: 'i8', type: 'insight', title: 'The Liquidity Drain', content: 'When QT happens, the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} panics. It is like draining water from a pool; all the boats (stocks) sink.'
    },
    { id: 'i9', type: 'concept', title: 'The Yield Curve', content: 'The Yield Curve is a chart showing the {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} of different {{INTERNATIONAL:government bonds|KENYA:Treasury Bonds (T-Bonds) or Infrastructure Bonds}} (like the 2-year Treasury vs the 10-year Treasury).'
    },
    { id: 'i10', type: 'insight', title: 'Normal Yield Curve', content: 'Normally, you get paid a higher interest rate for locking your money up for 10 years than for 2 years, because 10 years carries more risk. This is a "Normal" upward-sloping yield curve.'
    },
    { id: 'i11', type: 'concept', title: 'The Inverted Yield Curve', content: 'Sometimes, the 2-year bond pays a HIGHER interest rate than the 10-year bond. This is completely illogical. Why would you accept less money for locking your cash up longer?'
    },
    { id: 'i12', type: 'example', title: 'The Ultimate Warning Sign', content: 'An inverted yield curve happens because investors are terrified of the near-term future, so they flee to long-term safety, driving the 10-year yield down.\n\nIt has correctly predicted almost every single recession in modern history.'
    },
    { id: 'i13', type: 'exercise', title: 'The Curve', content: 'An inverted yield curve is widely considered a leading indicator for what?', options: ['A massive economic boom.', 'A recession.', 'A drop in taxes.'], correctAnswer: 'A recession.'
    },
    { id: 'i14', type: 'concept', title: 'The U.S. Dollar (DXY)', content: 'The DXY is an index that measures the strength of the US Dollar against a basket of other global currencies.'
    },
    { id: 'i15', type: 'insight', title: 'The Dollar Wrecking Ball', content: 'Because most global debt and commodities (like oil and gold) are priced in US Dollars, a massively strong Dollar crushes emerging markets and multinational corporate profits.'
    },
    { id: 'i16', type: 'example', title: 'Inverse Correlation', content: 'When the DXY goes up rapidly, the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} and Bitcoin usually go down. When the DXY drops, risk assets soar.'
    },
    { id: 'i17', type: 'exercise', title: 'DXY Logic', content: 'If the DXY (US Dollar Index) is rapidly skyrocketing, what typically happens to the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}}?', options: ['It crashes.', 'It moons.', 'It stays perfectly flat.'], correctAnswer: 'It crashes.'
    },
    { id: 'i18', type: 'concept', title: 'Consumer Price Index (CPI)', content: 'The CPI is the official scorecard for inflation. The government tracks the price of a "basket" of goods (milk, rent, gas) every month.'
    },
    { id: 'i19', type: 'warning', title: 'Manipulated Math', content: 'Many economists argue CPI is heavily manipulated by the government to make inflation look lower than it actually is, by constantly changing what is inside the "basket".'
    },
    { id: 'i20', type: 'concept', title: 'Core vs Headline CPI', content: 'Headline CPI includes everything. Core CPI removes food and energy, because gas and food prices are extremely volatile.'
    },
    { id: 'i21', type: 'insight', title: 'CPI Day', content: 'The day CPI data is released is one of the most volatile days in the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}}. If inflation comes in higher than expected, the market instantly crashes because it means the Central Bank will raise {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}}.'
    },
    { id: 'i22', type: 'concept', title: 'Non-Farm Payrolls (NFP)', content: 'The NFP report comes out on the first Friday of every month. It shows how many jobs the US economy added or lost.'
    },
    { id: 'i23', type: 'example', title: 'Bad News is Good News', content: 'During high inflation, if the NFP report says "100,000 people lost their jobs", the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} might actually GO UP. Why? Because terrible job numbers mean the Central Bank might lower {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} to save the economy.'
    },
    { id: 'i24', type: 'exercise', title: 'Market Logic', content: 'Why would the {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} rally on terrible unemployment data?', options: ['Because investors hate workers.', 'Because bad data means the Central Bank might lower {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} and print money to save the economy.', 'Because the data is fake.'], correctAnswer: 'Because bad data means the Central Bank might lower {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} and print money to save the economy.'
    },
    { id: 'i25', type: 'concept', title: 'Purchasing Managers Index (PMI)', content: 'A survey of supply chain managers. A PMI over 50 means the manufacturing sector is expanding. Under 50 means it is contracting.'
    },
    { id: 'i26', type: 'insight', title: 'Leading vs Lagging Indicators', content: 'Unemployment is a lagging indicator (companies only fire people AFTER the economy is already bad). PMI is a leading indicator (managers stop ordering raw materials BEFORE the recession hits).'
    },
    { id: 'i27', type: 'concept', title: 'Global Liquidity', content: 'The {{INTERNATIONAL:stock market|KENYA:Nairobi Securities Exchange (NSE) or global markets}} is essentially just a sponge that absorbs global liquidity. When central banks across the world are printing money, stocks go up regardless of how bad company earnings are.'
    },
    { id: 'i28', type: 'warning', title: 'Don\'t Fight the Fed', content: 'This is the oldest saying on Wall Street. If the Central Bank is doing Quantitative Easing, do not short the market. You will be crushed by infinite printed money.'
    },
    { id: 'i29', type: 'exercise', title: 'The Golden Rule', content: 'What does "Don\'t Fight the Fed" mean?', options: ['Never pay taxes.', 'Do not bet against the direction the Central Bank is pushing liquidity.', 'Always protest at the bank.'], correctAnswer: 'Do not bet against the direction the Central Bank is pushing liquidity.'
    },
    { id: 'i30', type: 'concept', title: 'Live Scenario', content: 'Test your understanding of Macroeconomic data releases in a live dynamic scenario.', tool: 'dynamic',
      toolProps: {
        scenario: "It is CPI (Inflation) Data Day. The market expects inflation to be 3.0%. The numbers are released: Inflation spiked to 5.5%! The Central Bank immediately schedules an emergency meeting.",
        startingBalance: 10000,
        choices: [
          { text: "Buy the dip! Stocks always go up.", result: -3000, feedback: "You got crushed. 5.5% inflation means the Central Bank is going to violently raise {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} and destroy liquidity. The market crashed 4% instantly." },
          { text: "Short the market, or move entirely to Cash.", result: 2000, feedback: "Perfect Macro reading. You knew that high inflation forces the Central Bank to raise {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}}, which acts like gravity on stock prices. You protected your capital." },
          { text: "Buy Long-Term {{INTERNATIONAL:government bonds|KENYA:Treasury Bonds (T-Bonds) or Infrastructure Bonds}}.", result: -1500, feedback: "Terrible idea. When {{INTERNATIONAL:interest rates|KENYA:interest rates (CBR)}} rise to fight inflation, the value of existing low-interest bonds crashes." }
        ]
      }
    }
  ]
};
