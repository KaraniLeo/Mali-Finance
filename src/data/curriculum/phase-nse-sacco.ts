import { Phase, LearningCard } from '../../types/curriculum';

// Beginner (30 Cards) - SACCO Basics, BOSA vs FOSA, Dividends
const begCards: LearningCard[] = Array.from({ length: 30 }).map((_, i) => {
  const topics = [
    { t: "What is a SACCO?", c: "A Savings and Credit Cooperative Organization is a member-owned financial institution. Its primary purpose is to mobilize savings and provide affordable credit to its members." },
    { t: "The Cooperative Principle", c: "Unlike banks which exist to maximize profit for external shareholders, SACCOs exist to benefit their members. You are both a customer and an owner." },
    { t: "Share Capital vs Deposits", c: "Share capital makes you an owner and earns dividends, but it can never be withdrawn (only sold to another member). Deposits earn interest and can be withdrawn or used to guarantee loans." },
    { t: "The Power of Regular Savings", c: "SACCOs force financial discipline. You must commit to a minimum monthly contribution. This forced consistency is the secret to compound wealth." },
    { t: "BOSA (Back Office Service Activities)", c: "BOSA deals with long-term savings and loans. You cannot use BOSA like an ATM. It is the core engine of the SACCO's wealth generation." },
    { t: "FOSA (Front Office Service Activities)", c: "FOSA acts like a traditional bank account. You get an ATM card, can process salaries, and get short-term advances. It provides daily liquidity." },
    { t: "The Multiplier Loan", c: "The greatest advantage of a SACCO. You can borrow up to 3x or 4x your accumulated deposits. If you save 1M KES, you can borrow 3M KES to buy an asset." },
    { t: "Interest Rates in SACCOs", c: "SACCO loans usually charge around 1% per month on a reducing balance (roughly 12% p.a.). This is historically much cheaper and more stable than commercial bank loans." },
    { t: "The Reducing Balance Method", c: "Interest is only charged on the outstanding principal. As you pay off the loan, the interest portion of your monthly payment decreases. This saves you money compared to flat-rate loans." },
    { t: "Guarantorship", c: "To get a loan exceeding your deposits, other SACCO members must guarantee your loan using their deposits. If you default, their money is seized." },
    { t: "The Danger of Guaranteeing", c: "Never guarantee a loan for someone you do not trust with your life. You are legally accepting their debt as your own if they vanish." },
    { t: "Dividends on Share Capital", c: "Because Share Capital is permanent, it carries higher risk and thus earns a higher dividend rate (often 12-18% annually)." },
    { t: "Interest on Deposits", c: "Your monthly savings earn 'Interest on Deposits' (often 8-12% annually). You get paid for saving money, beating standard bank savings accounts." },
    { t: "SASRA Regulation", c: "The SACCO Societies Regulatory Authority (SASRA) licenses and regulates all deposit-taking SACCOs in Kenya to ensure they don't collapse with members' funds." },
    { t: "Joining a SACCO", c: "Historically, SACCOs were tied to specific employers (e.g., Teachers or Police). Today, many are 'open' SACCOs that allow any Kenyan to join." },
    { t: "The Withholding Tax on Dividends", c: "SACCO dividends and interest on deposits are subject to a 5% withholding tax by KRA, which the SACCO deducts before paying you." },
    { t: "Development Loans", c: "These are large loans (3x-4x deposits) meant for long-term investments like buying land or building a house. They usually have a repayment period of 36-60 months." },
    { t: "Emergency Loans", c: "Processed within 24 hours to handle medical or unforeseen crises. They usually have a shorter repayment period (12 months) and slightly higher interest." },
    { t: "School Fee Loans", c: "A specific product to pay tuition directly to schools. Repaid over a calendar year (12 months) to align with the academic cycle." },
    { t: "Dividend Capitalization", c: "Instead of withdrawing your annual dividends to spend, you can instruct the SACCO to reinvest them back into your deposits. This accelerates compound growth." },
    { t: "The Capitalization Math", c: "If you have 500k KES earning 10%, you get 50k. If you spend it, next year you start with 500k. If you capitalize it, next year you earn 10% on 550k." },
    { t: "Retiring with a SACCO", c: "Because your deposits earn annual interest, building a large SACCO balance can provide a passive income stream in retirement that rivals a pension." },
    { t: "Defaulting on a SACCO Loan", c: "If you default, the SACCO first deducts your own deposits to clear the loan. If a balance remains, they deduct from your guarantors, and then list you on CRB." },
    { t: "Clearing from a SACCO", c: "If you want to leave a SACCO and withdraw your deposits, you must give a 60-day notice. You must also replace yourself as a guarantor for any loans you secured." },
    { t: "The Risk of Illiquidity", c: "You cannot access your BOSA deposits easily. To get your cash, you must take a loan against it or resign from the SACCO entirely (waiting 60 days)." },
    { t: "Evaluating a SACCO", c: "Before joining, check their Dividend History, their Non-Performing Loan (NPL) ratio, and verify they are officially licensed by SASRA." },
    { t: "The NPL Ratio", c: "This indicates how many members are defaulting on their loans. A high NPL ratio means the SACCO is struggling and your deposits are at risk." },
    { t: "Annual General Meetings (AGM)", c: "As a shareholder, you have a right to attend the AGM, vote on resolutions, and elect the Board of Directors. It operates on a 'One Member, One Vote' system." },
    { t: "Patronage Bonus", c: "Some advanced SACCOs pay a bonus based on how much you borrowed. Yes, you get paid a small rebate just for taking a loan and paying interest to the SACCO." },
    { t: "The SACCO Ecosystem", c: "SACCOs are the backbone of Kenyan middle-class wealth. They fund the majority of land purchases, home builds, and small businesses in the country." }
  ];
  return { id: `nse-beg-${i}`, type: 'concept', title: topics[i].t, content: topics[i].c, orderIndex: i };
});

// Intermediate (30 Cards) - NSE Basics, CDS Accounts, T-Bills, Bonds
const intCards: LearningCard[] = Array.from({ length: 30 }).map((_, i) => {
  const topics = [
    { t: "What is the NSE?", c: "The Nairobi Securities Exchange is a public market where buyers and sellers trade shares of publicly listed companies, government bonds, and REITs." },
    { t: "The CDSC Account", c: "You cannot buy shares directly. You must open a Central Depository and Settlement Corporation (CDSC) account through a licensed stockbroker to hold your electronic shares." },
    { t: "Choosing a Stockbroker", c: "Brokers execute your trades for a commission (around 1.5% - 2.1%). Choose a broker backed by a large bank for security and good online trading platforms." },
    { t: "The Bid and the Ask", c: "The Bid is the highest price a buyer is willing to pay. The Ask (Offer) is the lowest price a seller will accept. The difference is the Spread." },
    { t: "Market Orders vs Limit Orders", c: "A Market Order buys shares immediately at whatever the current asking price is. A Limit Order only buys if the price drops to a specific target you set." },
    { t: "Bull vs Bear Markets", c: "A Bull market is characterized by rising prices and optimism. A Bear market occurs when prices fall by 20% or more, driven by pessimism." },
    { t: "Dividends on the NSE", c: "When a company makes a profit, it may distribute a portion of it to shareholders as dividends. Companies like Safaricom and Equity Bank have strong dividend histories." },
    { t: "Capital Gains on the NSE", c: "If you buy Safaricom at 15 KES and sell at 30 KES, you have made a 100% capital gain. Currently, capital gains on NSE listed shares are tax-exempt!" },
    { t: "The NSE 20 Share Index", c: "A price-weighted index of the 20 most highly capitalized and liquid blue-chip companies on the NSE. It acts as a barometer for the Kenyan economy." },
    { t: "Blue-Chip Stocks", c: "These are shares of large, well-established, and financially sound companies with a history of reliable performance (e.g., Safaricom, KCB, EABL)." },
    { t: "Penny Stocks", c: "Shares that trade for very low prices (under 5 KES). They are highly volatile and speculative. You can double your money or lose it all in weeks." },
    { t: "Government Securities", c: "When the Kenyan government needs money to build roads or fund the budget deficit, it borrows from the public by issuing Treasury Bills and Treasury Bonds." },
    { t: "Treasury Bills (T-Bills)", c: "Short-term debt instruments. They mature in 91 days, 182 days, or 364 days. You buy them at a discount and receive face value at maturity." },
    { t: "The Math of T-Bills", c: "If a 91-day T-Bill has a 10% yield, you might pay 97,500 KES today. In 91 days, the CBK pays you 100,000 KES. The 2,500 difference is your interest." },
    { t: "Treasury Bonds (T-Bonds)", c: "Long-term debt instruments maturing between 1 and 30 years. They pay you a fixed interest rate (coupon) every 6 months until maturity." },
    { t: "The Primary vs Secondary Market", c: "Buying a bond directly from the Central Bank is the Primary Market. Selling that bond to another investor before it matures happens on the Secondary Market (NSE)." },
    { t: "Infrastructure Bonds (IFBs)", c: "The holy grail of Kenyan fixed income. IFBs are issued to fund mega-projects. Their greatest advantage? The interest earned is 100% tax-free." },
    { t: "Taxation on Normal Bonds", c: "Interest earned on normal Treasury Bonds is subject to a 15% Withholding Tax (if maturity is under 10 years) or 10% (if over 10 years)." },
    { t: "Opening a CBK CDS Account", c: "To buy T-Bills or Bonds directly from the government and avoid broker fees, you must open a CDS account directly with the Central Bank of Kenya." },
    { t: "Minimum Investment Sizes", c: "The minimum investment for a T-Bill is 100,000 KES. The minimum investment for a Treasury Bond is typically 50,000 KES." },
    { t: "The Yield Curve", c: "A graph showing interest rates across different maturity lengths. A normal curve slopes upward (longer lockup = higher interest). An inverted curve signals economic trouble." },
    { t: "Inflation vs Yield", c: "If inflation is 8% and your T-Bill pays 7%, your real return is negative. Your money is growing numerically but losing purchasing power." },
    { t: "Corporate Bonds", c: "Large companies (like EABL or Safaricom) also issue bonds to raise capital. They usually offer higher interest rates than government bonds due to higher default risk." },
    { t: "The Risk of Corporate Bonds", c: "If a company goes bankrupt (like Chase Bank or Imperial Bank), corporate bondholders can lose their entire investment. Government bonds are considered 'risk-free'." },
    { t: "Mutual Funds / Unit Trusts", c: "If you don't want to pick individual stocks or bonds, you can pool your money into a Unit Trust managed by professionals (e.g., CIC, Britam, Sanlam)." },
    { t: "Money Market Funds (MMFs)", c: "An MMF is a type of Unit Trust that invests strictly in highly liquid, short-term debt (T-Bills, bank deposits). It is the best place for an emergency fund." },
    { t: "Equity Funds", c: "A type of Unit Trust that invests your money heavily in the stock market. High risk, high volatility, but potential for high long-term returns." },
    { t: "The Magic of Compounding in MMFs", c: "MMFs calculate interest daily and credit it to your account monthly. This means next month, you earn interest on your original capital PLUS the interest you just earned." },
    { t: "Withholding Tax in MMFs", c: "Interest earned in an MMF is subject to a 15% final Withholding Tax. When the fund declares a 10% yield, you actually pocket 8.5%." },
    { t: "Diversification", c: "Never put all your money in one stock. A portfolio should mix asset classes: SACCOs for leverage, MMFs for liquidity, Bonds for cash flow, and Equities for growth." }
  ];
  return { id: `nse-int-${i}`, type: 'insight', title: topics[i].t, content: topics[i].c, orderIndex: i + 30 };
});

// Pro (30 Cards) - Advanced Valuation, Bond Pricing, Derivative Hedging, Agency Problems
const proCards: LearningCard[] = Array.from({ length: 30 }).map((_, i) => {
  const topics = [
    { t: "The Inverse Relationship of Bonds", c: "When market interest rates go UP, the price of existing bonds goes DOWN. When interest rates fall, existing bonds become more valuable and their price rises." },
    { t: "Trading Bonds for Capital Gains", c: "Pros don't just hold bonds for interest. They buy a bond at 12% yield. If the CBK drops rates to 9%, they sell that 12% bond on the secondary market for a massive premium." },
    { t: "Yield to Maturity (YTM)", c: "YTM is the total anticipated return on a bond if held until it matures. It factors in the coupon rate, current market price, and time to maturity." },
    { t: "Fundamental Analysis: P/E Ratio", c: "The Price-to-Earnings ratio tells you how much you are paying for 1 KES of a company's profit. A P/E of 5 means the stock is cheap; a P/E of 50 means it is wildly expensive." },
    { t: "Price-to-Book (P/B) Ratio", c: "Compares a company's market value to its accounting value. A P/B under 1.0 means the stock is trading for less than the value of its raw assets. A classic value investing signal." },
    { t: "Dividend Yield vs Dividend Payout", c: "Dividend Yield is the annual dividend divided by the share price. Payout Ratio is the percentage of total profits paid as dividends. A 100% payout ratio is unsustainable." },
    { t: "Return on Equity (ROE)", c: "Measures how effectively management is using shareholders' capital to generate profits. A consistent ROE above 15-20% is a hallmark of a company with a strong economic moat." },
    { t: "Economic Moats", c: "A term coined by Warren Buffett. It is a company's ability to maintain competitive advantages to protect long-term profits (e.g., Safaricom's network effect with M-PESA)." },
    { t: "Insider Trading", c: "Buying or selling shares based on material, non-public information. This is highly illegal. The CMA monitors trading volumes before major announcements to catch this." },
    { t: "The Capital Markets Authority (CMA)", c: "The regulatory body that oversees the NSE, licenses stockbrokers, and protects investors from market manipulation and fraud." },
    { t: "Foreign Institutional Investors", c: "The NSE is heavily driven by foreign investors. When global interest rates rise (like the US Fed raising rates), foreign capital flees the NSE, causing severe market crashes." },
    { t: "Market Capitalization", c: "Total value of a company. Share Price x Total Number of Shares. Safaricom often accounts for over 40% of the entire NSE's market cap, meaning as Safaricom goes, the market goes." },
    { t: "Liquidity Risk on the NSE", c: "Many small companies on the NSE are highly illiquid. You might want to sell 10,000 shares, but there simply aren't any buyers for weeks. You are trapped." },
    { t: "Short Selling", c: "Borrowing shares you don't own, selling them at the current price, hoping the price falls so you can buy them back cheaper, return them, and keep the difference. Legalized recently on the NSE." },
    { t: "Securities Lending and Borrowing (SLB)", c: "The framework that allows short selling. Large funds lend their shares out for a fee to short-sellers, generating extra yield on long-term holdings." },
    { t: "NSE Derivatives Market (NEXT)", c: "The NSE now allows trading in Single Stock Futures and Index Futures. Derivatives are complex contracts deriving their value from an underlying asset." },
    { t: "Hedging with Futures", c: "If you own a massive Safaricom portfolio and fear a market crash, you can short a Safaricom Futures contract. If the stock crashes, the profit from the short offsets your portfolio loss." },
    { t: "Leverage in Derivatives", c: "Derivatives require only a small margin (e.g., 10%) to control a large position. This leverage multiplies both your potential profits and your potential losses." },
    { t: "Margin Calls", c: "If your leveraged trade moves against you, the broker will issue a Margin Call, demanding you deposit more cash immediately. If you don't, they liquidate your position at a massive loss." },
    { t: "The Agency Problem in Corporations", c: "Management (agents) often acts in their own interest (high salaries, private jets) rather than maximizing value for Shareholders (principals). Look for CEOs who own large blocks of stock." },
    { t: "Stock Splits and Bonus Issues", c: "A company gives free shares to existing shareholders (e.g., a 1-for-1 split). The share price halves, but you have double the shares. Value doesn't change, but it increases market liquidity." },
    { t: "Rights Issues", c: "A company needs cash, so it offers existing shareholders the 'right' to buy new shares at a discount. If you don't buy, your ownership percentage is diluted." },
    { t: "Share Buybacks", c: "When a company buys its own shares from the open market and retires them. This reduces the supply of shares, making every remaining share more valuable. It is often more tax-efficient than dividends." },
    { t: "The Efficient Market Hypothesis (EMH)", c: "The theory that share prices reflect all known information, making it impossible to consistently 'beat the market'. If true, you should just buy index funds." },
    { t: "Behavioral Finance", c: "The counter to EMH. Markets are driven by human emotion (fear and greed). By identifying irrational panic, value investors buy great companies at distressed prices." },
    { t: "Value Traps", c: "A stock that looks incredibly cheap (low P/E, high dividend) but is actually a dying company. The price is cheap for a reason. Do not catch a falling knife." },
    { t: "The Macro Link: FX and Equities", c: "If the Kenyan Shilling depreciates heavily against the Dollar, foreign investors lose money on exchange rates even if the stock price rises. This causes them to dump NSE stocks." },
    { t: "Arbitrage", c: "The simultaneous purchase and sale of an asset in different markets to profit from tiny differences in the asset's price. Algorithms hunt for these risk-free returns." },
    { t: "The SACCO Liquidity Crisis", c: "If too many members borrow long-term development loans, the SACCO runs out of liquid cash to issue short-term FOSA loans. SASRA monitors liquidity ratios to prevent bank runs." },
    { t: "The Ultimate Edge", c: "In markets, patience pays. Most traders lose money trying to time the market. The wealthy buy fundamentally sound assets (Bonds, Blue Chips) and hold them for decades to compound." }
  ];
  return { id: `nse-pro-${i}`, type: 'warning', title: topics[i].t, content: topics[i].c, orderIndex: i + 60 };
});

export const phaseNseSacco: Phase = {
  id: 'phase-nse-sacco',
  title: 'NSE, Stocks & Saccos',
  description: 'Master the Nairobi Securities Exchange, Treasury Bonds, Derivatives, and Sacco multiplier loans.',
  lessons: [
    { id: 'lesson-nse-beg', phaseId: 'phase-nse-sacco', title: 'Beginner Foundations', level: 'beginner', cards: begCards },
    { id: 'lesson-nse-int', phaseId: 'phase-nse-sacco', title: 'Intermediate Strategies', level: 'intermediate', cards: intCards },
    { id: 'lesson-nse-pro', phaseId: 'phase-nse-sacco', title: 'Pro Mastery', level: 'pro', cards: proCards }
  ]
};
