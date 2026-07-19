import { Phase, LearningCard } from '../../types/curriculum';

// Beginner (31 Cards) - M-PESA Basics, Paybill vs Buy Goods, Velocity of Money
const begCards: LearningCard[] = [
  { 
    id: `mpesa-beg-intro`, 
    type: 'concept', 
    title: 'Introduction to M-PESA & Mobile Money Economics', 
    content: 'Welcome to the M-PESA & Mobile Money Economics module! In this phase, you will learn how mobile money operates as the financial nervous system of Kenya. You will understand the fundamental mechanics of M-PESA, the differences between Paybill and Buy Goods, how transaction costs affect businesses, and how digital ledgers move money instantly across the economy.',
    orderIndex: -1
  },
  ...Array.from({ length: 30 }).map((_, i): LearningCard => {
  const topics = [
    { t: "The Velocity of Money", c: "M-PESA revolutionized Kenya by increasing the velocity of money. Money moves faster, allowing a single 1,000 KES note to facilitate ten different transactions in a single day." },
    { t: "Send Money vs Withdraw", c: "Sending money (P2P) is usually cheaper than withdrawing cash. Safaricom incentivizes keeping money within the digital ecosystem." },
    { t: "The Cost of Convenience", c: "M-PESA is not a bank; it's a payment gateway. The fees you pay are the premium for instant liquidity and convenience." },
    { t: "What is M-Shwari?", c: "M-Shwari is a paperless banking service offered through M-PESA in partnership with NCBA. It allows you to save and borrow instantly." },
    { t: "M-Shwari Savings", c: "You can lock your money in M-Shwari for a fixed period (1-6 months) to earn interest. It's a great tool for short-term emergency funds." },
    { t: "M-Shwari Loans", c: "M-Shwari offers 30-day micro-loans. These are not traditional loans with an Annual Percentage Rate (APR); they charge a flat 'facility fee'." },
    { t: "The 9% Facility Fee", c: "An M-Shwari loan charges a 9% facility fee for 30 days. If annualized, this equals a massive 108% APR. It is very expensive debt." },
    { t: "Late Payment Penalties", c: "If you fail to repay an M-Shwari loan within 30 days, your loan period is extended, and you are charged an additional 9% fee on the outstanding balance." },
    { t: "Building a Credit Limit", c: "Your M-Shwari loan limit is determined by your M-PESA usage, airtime purchases, and savings behavior. Regular usage increases your limit." },
    { t: "What is Fuliza?", c: "Fuliza is a continuous overdraft service. It allows you to complete an M-PESA transaction even when you don't have enough funds." },
    { t: "Fuliza's Access Fee", c: "When you use Fuliza, you are charged an immediate 1% access fee on the amount drawn." },
    { t: "Fuliza's Daily Maintenance Fee", c: "Unlike a loan, Fuliza charges a daily maintenance fee based on your outstanding balance. This fee eats into your wealth every single day." },
    { t: "The Fuliza Trap", c: "Because Fuliza automatically deducts from any incoming M-PESA funds, it can create a cycle where your income is instantly swallowed by debt." },
    { t: "KCB M-PESA", c: "Similar to M-Shwari, this is a partnership with KCB. It offers loans and savings, often with slightly different interest structures (e.g., lower facility fees but rolling interest)." },
    { t: "KCB M-PESA vs M-Shwari", c: "You can use both. Comparing their loan limits and fees allows you to access the cheapest micro-credit available to you." },
    { t: "Lipa na M-PESA Basics", c: "This includes Paybill (C2B) and Buy Goods (Till Number). They are designed to separate personal transactions from business payments." },
    { t: "Paybill Mechanics", c: "With Paybill, the customer typically bears the transaction cost. It's ideal for utilities, school fees, and rent." },
    { t: "Buy Goods Mechanics", c: "With a Till Number, the merchant pays a percentage of the transaction (usually 0.5% - 1%) as a fee. The customer pays nothing to send." },
    { t: "When to use a Till Number", c: "Use a Till when you want to encourage sales by removing friction. Customers hate paying transaction fees on retail goods." },
    { t: "Pochi La Biashara", c: "This is a product for small business owners (like food vendors) to separate business funds from personal M-PESA funds without a formal company registration." },
    { t: "Benefits of Pochi", c: "Funds in Pochi La Biashara cannot be reversed without the merchant's consent, and they cannot be automatically swept by Fuliza to pay personal overdrafts." },
    { t: "M-PESA Reversals", c: "Sending money to the wrong number? M-PESA has an automatic reversal system, but it requires the recipient's funds to still be in their account." },
    { t: "The Reversal Scam", c: "Beware of scammers who send you a fake M-PESA SMS, then call begging you to 'reverse' it by sending money back to them." },
    { t: "M-PESA Global Basics", c: "M-PESA allows you to send and receive money internationally using partners like Western Union directly from your phone." },
    { t: "Safaricom's Monopoly Power", c: "Because M-PESA is so dominant, Safaricom controls the rails of the Kenyan economy. This gives them immense pricing power." },
    { t: "Interoperability", c: "You can now send money from M-PESA to Airtel Money or T-Kash seamlessly. This was mandated by the Central Bank to reduce monopoly power." },
    { t: "The Daily Transaction Limit", c: "Currently, you can transact up to 500,000 KES per day on M-PESA, with a maximum per-transaction limit of 250,000 KES." },
    { t: "M-PESA Statements", c: "You can request free PDF statements. These are critical for tracking your actual spending versus your perceived budget." },
    { t: "The Illusion of Free", c: "Depositing money into M-PESA is free, but accessing it or moving it almost always costs money. Safaricom taxes the movement of capital." },
    { t: "M-PESA as an Emergency Fund", c: "While convenient, keeping large sums in M-PESA is dangerous due to zero interest and easy access, which encourages impulse spending." }
  ];
  return { id: `mpesa-beg-${i}`, type: 'concept', title: topics[i].t, content: topics[i].c, orderIndex: i };
})];

// Intermediate (30 Cards) - PayPal, Global Pay, Zidi, Business Tills
const intCards: LearningCard[] = Array.from({ length: 30 }).map((_, i): LearningCard => {
  const topics = [
    { t: "PayPal to M-PESA", c: "Kenya has an exclusive integration. You can withdraw funds from PayPal directly to M-PESA in minutes, bypassing the traditional 3-5 day banking system." },
    { t: "The PayPal Exchange Rate Trap", c: "The convenience comes at a cost. The exchange rate offered by the PayPal/Thunes integration is usually significantly lower than the spot market rate." },
    { t: "Transaction Limits on PayPal", c: "Your PayPal withdrawal limits are tied to your M-PESA tier limits. Large freelancers often hit the 500k KES daily cap quickly." },
    { t: "M-PESA Global Pay (Virtual Visa)", c: "This feature generates a virtual Visa card linked directly to your M-PESA balance, allowing you to pay for global subscriptions (Netflix, Amazon)." },
    { t: "CVV Security", c: "The Global Pay CVV (the 3-digit security code) expires every 30 minutes. This makes it almost impossible for hackers to steal your card details for recurring fraud." },
    { t: "Global Pay Forex Markup", c: "Transactions in USD are subject to a forex markup (usually around 3.5%). It is more expensive than using a traditional dollar-denominated bank card." },
    { t: "Registering a Business Till", c: "To get a formal Buy Goods Till, you must provide Business Registration documents (CR12, KRA PIN). This brings your business into the formal economy." },
    { t: "The 1% Merchant Fee", c: "Till numbers usually deduct a flat 1% of the transaction value. If you sell an item for 1,000 KES, you only receive 990 KES." },
    { t: "Capping the Merchant Fee", c: "Safaricom caps the merchant fee at a certain amount (e.g., 200 KES) for very large transactions. High-value retail benefits from this cap." },
    { t: "Sweeping Till Funds", c: "You cannot spend money directly from a standard Till. You must 'sweep' (transfer) it to a nominated bank account or your personal M-PESA." },
    { t: "The Tax Implication of Tills", c: "KRA has direct visibility into Business Tills and Paybills. If your Till handles 10 Million KES a year, you cannot declare 1 Million KES in revenue to KRA." },
    { t: "eTIMS and M-PESA", c: "KRA is moving to integrate eTIMS directly with M-PESA Paybills, aiming to automate VAT collection at the point of payment." },
    { t: "What is Mali?", c: "Safaricom Mali is a wealth management product allowing you to invest in Unit Trusts from as low as 100 KES. It earns daily interest." },
    { t: "Mali Interest Rates", c: "Mali typically offers interest rates comparable to Money Market Funds (MMFs), currently around 10-12% annually, subject to 15% withholding tax." },
    { t: "Mali vs Traditional MMFs", c: "Mali offers instant withdrawals (liquidity) unlike traditional MMFs which take 48 hours, but the interest rate might be slightly lower." },
    { t: "Zidii (SME Financing)", c: "Zidii is an inventory financing solution. It allows shopkeepers to buy stock on credit and pay later as they sell, easing cashflow crunches." },
    { t: "How Zidii Works", c: "Your Zidii credit limit is determined by your historic Till Number or Paybill transaction volumes. High turnover = high credit limit." },
    { t: "Halal Pesa", c: "In partnership with Gulf African Bank, Safaricom offers Halal Pesa, a Shariah-compliant micro-financing product that charges a profit margin instead of interest." },
    { t: "The Float System", c: "M-PESA agents buy 'float' (electronic money) using cash at a bank. They then trade this float with customers for cash, earning a commission." },
    { t: "Agent Commissions", c: "Agents earn commissions based on the transaction bands. Higher withdrawals yield higher commissions. This is a volume-based business." },
    { t: "The Liquidity Trap for Agents", c: "Agents often fail because they run out of either float (digital money) or cash. Managing this balance is the core skill of an M-PESA agent." },
    { t: "Paybill APIs for Developers", c: "Daraja is Safaricom's API portal. It allows businesses to integrate M-PESA directly into their websites or apps for automated checkouts." },
    { t: "C2B vs B2C APIs", c: "C2B (Customer to Business) is for receiving payments. B2C (Business to Customer) is used for bulk disbursements like paying salaries or dividends." },
    { t: "STK Push (M-PESA Express)", c: "This API sends a prompt directly to the customer's phone to enter their PIN. It drastically reduces checkout friction and cart abandonment." },
    { t: "The Danger of STK Push", c: "Scammers abuse STK push by sending unexpected prompts, hoping the victim blindly enters their PIN. Always read the prompt!" },
    { t: "M-PESA and CRB", c: "Defaulting on M-Shwari or Fuliza will get you listed on the Credit Reference Bureau (CRB). This locks you out of the entire formal banking sector." },
    { t: "Clearing a CRB Listing", c: "To clear a listing, you must pay the principal, the accrued penalties, and a fee for the clearance certificate. Avoid defaults at all costs." },
    { t: "The Micro-Credit Bubble", c: "Because digital loans are instant and uncollateralized, millions of Kenyans are trapped in cycles of borrowing from Peter to pay Paul." },
    { t: "Good Debt vs Bad Debt on M-PESA", c: "Using Zidii to buy inventory that sells at a 20% margin is Good Debt. Using Fuliza to buy drinks on a Friday is Bad Debt." },
    { t: "The Unbanked Myth", c: "M-PESA didn't just bank the unbanked; it created a new parallel banking system that is faster, more liquid, and more expensive." }
  ];
  return { id: `mpesa-int-${i}`, type: 'insight', title: topics[i].t, content: topics[i].c, orderIndex: i + 30 };
});

// Pro (30 Cards) - Advanced Integrations, Central Bank Regulations, Monopoly Economics
const proCards: LearningCard[] = Array.from({ length: 30 }).map((_, i): LearningCard => {
  const topics = [
    { t: "The CBK Trust Account", c: "For every digital Shilling on M-PESA, Safaricom must hold an equivalent physical Shilling in a Trust Account regulated by the Central Bank of Kenya." },
    { t: "Interest on Trust Accounts", c: "The billions sitting in the CBK Trust Account earn interest. Safaricom cannot keep this interest; it is typically donated to charity via the Safaricom Foundation." },
    { t: "Systemic Risk & Too Big to Fail", c: "If M-PESA goes offline for 2 hours, the Kenyan economy loses billions. M-PESA is classified as a Systemically Important Payment System." },
    { t: "Data as the Real Asset", c: "Safaricom's true power isn't transaction fees; it's data. They know exactly how much you earn, where you spend it, and who you send it to. This is credit scoring gold." },
    { t: "Algorithmic Credit Scoring", c: "NCBA and Safaricom use machine learning on your calling patterns, location data, and transaction history to determine your probability of default in milliseconds." },
    { t: "M-PESA Super App Strategy", c: "The Super App aims to keep users entirely within the ecosystem. By offering mini-apps (SGR, BuuPass, NTSA), Safaricom captures more of your daily spend." },
    { t: "The Threat of CBDCs", c: "A Central Bank Digital Currency (Digital Shilling) could theoretically bypass M-PESA, allowing citizens to transact for free directly on a CBK ledger." },
    { t: "Safaricom's Expansion (Ethiopia)", c: "M-PESA is expanding into Ethiopia, a massive untapped market. The success of this venture is critical for Safaricom's long-term stock valuation." },
    { t: "B2B Payment Rails", c: "M-PESA is moving beyond retail. Their B2B APIs allow FMCG companies (like Coca-Cola) to automate payments from distributors, bypassing banks entirely." },
    { t: "The Split of M-PESA", c: "The CBK has historically pressured Safaricom to split M-PESA from its telecommunications wing to regulate it strictly as a financial institution." },
    { t: "Why Safaricom Resists the Split", c: "Splitting would incur massive tax liabilities (capital gains on the transfer of assets) and subject M-PESA to stricter banking capital requirements." },
    { t: "M-PESA and Anti-Money Laundering (AML)", c: "M-PESA algorithms flag structuring (smurfing)—breaking large sums into smaller 50k transactions to avoid detection. Accounts are frozen instantly." },
    { t: "Know Your Customer (KYC)", c: "You cannot open a Till Number without rigorous KYC. This is why Pochi La Biashara has lower limits—it bypasses corporate KYC." },
    { t: "The Fuliza Revenue Model", c: "Fuliza is hyper-profitable because it targets low-value, high-frequency transactions. A 100 KES overdraft with a 2 KES daily fee is mathematically predatory." },
    { t: "Cannibalizing the Banks", c: "Commercial banks in Kenya survive purely because they partnered with M-PESA (M-Shwari, KCB M-PESA) rather than trying to build competing rails." },
    { t: "Pesalink vs M-PESA", c: "Banks built Pesalink to compete with M-PESA for large transfers. Pesalink is much cheaper for moving 500k KES, but suffers from terrible UI and lower adoption." },
    { t: "The Cost of Cash Out", c: "The M-PESA ecosystem charges the highest fees when money leaves the system (withdrawal to cash). This mathematically forces users to keep it digital." },
    { t: "M-PESA as an Escrow", c: "Through various APIs, businesses can build escrow services on top of M-PESA, holding funds until goods are delivered. (e.g., used car sales)." },
    { t: "The Float Optimization Problem", c: "For large retail chains (like Naivas), sweeping millions from Till numbers to Bank accounts requires sophisticated API automation to manage liquidity." },
    { t: "The Taxation of Airtime", c: "Buying airtime via M-PESA attracts Excise Duty. The government uses Safaricom as its most efficient tax collection agent." },
    { t: "Mobile Money and Inflation", c: "By making transactions frictionless, M-PESA increases the velocity of money. In macroeconomic theory (MV=PQ), higher velocity can simulate inflation." },
    { t: "Cross-Border Remittances", c: "M-PESA Global allows instant remittances from the diaspora. This inflow of hard currency (USD, GBP) is a critical pillar of Kenya's forex reserves." },
    { t: "The PayPal Arbitrage", c: "Traders sometimes exploit the difference between PayPal's M-PESA exchange rate and the black market rate using P2P crypto exchanges." },
    { t: "Safaricom's RoE", c: "Return on Equity for Safaricom is astronomical because M-PESA is a high-margin software business layered on top of sunk-cost telco infrastructure." },
    { t: "The Threat of Starlink", c: "If satellite internet bypasses Safaricom's data network, users could use WhatsApp Pay or Crypto, threatening the foundation of M-PESA's monopoly." },
    { t: "The 48-Hour Reversal Rule", c: "If KRA or the police issue a warrant, Safaricom can freeze and reverse M-PESA transactions spanning back several days." },
    { t: "Reverse Engineering the Algorithm", c: "Users have discovered that paying off Fuliza on the same day repeatedly can artificially pump your limit, allowing you to access a massive loan before defaulting." },
    { t: "The Risk of Aggregators", c: "Payment aggregators (like Cellulant) sit between businesses and M-PESA. If an aggregator collapses, merchants lose their pending settlements." },
    { t: "The Future of M-PESA", c: "The endgame is wealth management (Mali), insurance (Bima), and automated taxation, transforming M-PESA into the operating system of the entire country." },
    { t: "The Ultimate Edge", c: "Understand that M-PESA is an expensive convenience. The wealthy move capital via RTGS and EFTs for flat fees. Only the poor pay 1% to move money." }
  ];
  return { id: `mpesa-pro-${i}`, type: 'warning', title: topics[i].t, content: topics[i].c, orderIndex: i + 60 };
});

export const phaseMpesa: Phase = {
  id: 'phase-mpesa',
  title: 'M-PESA & Mobile Money Economics',
  description: 'Master M-Shwari, Fuliza, Global Pay, Business Tills, APIs and mobile business economics.',
  lessons: [
    { id: 'lesson-mpesa-beg', phaseId: 'phase-mpesa', title: 'Beginner Foundations', level: 'beginner', cards: begCards },
    { id: 'lesson-mpesa-int', phaseId: 'phase-mpesa', title: 'Intermediate Strategies', level: 'intermediate', cards: intCards },
    { id: 'lesson-mpesa-pro', phaseId: 'phase-mpesa', title: 'Pro Mastery', level: 'pro', cards: proCards }
  ]
};
