import { Phase, LearningCard } from '../../types/curriculum';

// Beginner (31 Cards) - Income Tax, Deductions, KRA Basics
const begCards: LearningCard[] = [
  { 
    id: `tax-beg-intro`, 
    type: 'concept', 
    title: 'Introduction to Taxes & The Legal Framework', 
    content: 'Welcome to the Taxes and Legal Framework module! In this phase, you will learn exactly how the government funds itself by taking a percentage of your income, consumption, and capital gains. By understanding the rules (like eTIMS, VAT, and PAYE), you will learn how to legally minimize your tax burden and operate your hustle strictly within the law.',
    orderIndex: -1
  },
  ...Array.from({ length: 30 }).map((_, i): LearningCard => {
  const topics = [
    { t: "What is Income Tax?", c: "Income tax is a mandatory contribution levied by the government on the financial income of individuals and corporations." },
    { t: "The Role of KRA", c: "The Kenya Revenue Authority (KRA) is the primary agency responsible for the assessment, collection, and accounting of all revenues." },
    { t: "Understanding PAYE", c: "Pay As You Earn (PAYE) is a method of collecting tax from individuals in gainful employment. Your employer deducts it automatically." },
    { t: "Gross vs Net Pay", c: "Gross pay is your total salary before any deductions. Net pay is what hits your bank account after PAYE, NSSF, and NHIF/SHIF." },
    { t: "Tax Brackets in Kenya", c: "Kenya uses a progressive tax system. The more you earn, the higher the percentage of tax you pay on the upper tiers of your income." },
    { t: "The Tax-Free Threshold", c: "Not all income is taxed. There is a personal relief threshold that shields the lowest earners from paying income tax." },
    { t: "What is a KRA PIN?", c: "A Personal Identification Number (PIN) is required for every Kenyan above 18 to perform financial transactions like opening a bank account." },
    { t: "Filing Nil Returns", c: "Even if you have no income, you are legally required to file a Nil Return by June 30th every year to avoid penalties." },
    { t: "Statutory Deductions", c: "Statutory deductions are mandated by law. They include NSSF (Retirement) and SHIF (Health), which are separate from income tax." },
    { t: "The NSSF Contribution", c: "The National Social Security Fund acts as your mandatory retirement savings. Both you and your employer contribute." },
    { t: "The SHIF Contribution", c: "The Social Health Insurance Fund replaces NHIF, taking 2.75% of gross income to fund universal healthcare in Kenya." },
    { t: "What is VAT?", c: "Value Added Tax (VAT) is a 16% consumption tax placed on a product whenever value is added at each stage of the supply chain." },
    { t: "Zero-Rated vs Exempt", c: "Zero-rated items have a VAT of 0%, allowing suppliers to claim input tax. Exempt items are outside the VAT scope entirely." },
    { t: "Filing Deadlines", c: "PAYE is due by the 9th of the following month. Annual personal returns must be filed between January 1st and June 30th." },
    { t: "Penalties for Late Filing", c: "Failing to file your annual returns attracts a penalty of 2,000 KES or 5% of the tax due, whichever is higher." },
    { t: "Understanding iTax", c: "iTax is KRA's online platform for tax administration. It allows you to file returns, register for a PIN, and apply for compliance certificates." },
    { t: "Tax Compliance Certificate (TCC)", c: "A TCC is proof you have paid your taxes. It is often required when applying for government tenders or jobs." },
    { t: "What is Withholding Tax?", c: "Withholding Tax is deducted at the source of income (like dividends or consulting fees) and remitted directly to KRA." },
    { t: "Withholding Tax on Dividends", c: "If you buy shares on the NSE, the dividends you receive are subjected to a 5% withholding tax before they reach you." },
    { t: "Withholding Tax on Consultancy", c: "For professional services, residents face a 5% withholding tax, which acts as an advance payment on their final income tax." },
    { t: "Introduction to Deductions", c: "Deductions are expenses you can legally subtract from your gross income, reducing the amount of income that is subject to tax." },
    { t: "Personal Relief", c: "Every resident individual is entitled to a personal tax relief of 2,400 KES per month, directly reducing the PAYE deducted." },
    { t: "Insurance Relief", c: "If you have a life insurance policy or pay SHIF, you are entitled to an insurance relief of 15% of the premiums paid." },
    { t: "Mortgage Interest Relief", c: "Homeowners can deduct up to 300,000 KES per year in mortgage interest paid from their taxable income." },
    { t: "Home Ownership Savings Plan", c: "Deposits of up to 96,000 KES per year into registered HOSP accounts were traditionally tax-deductible to encourage home ownership." },
    { t: "The Housing Levy", c: "The Affordable Housing Levy takes 1.5% of your gross salary, matched by your employer, and is NOT tax-deductible." },
    { t: "Tax on Allowances", c: "Housing, transport, and airtime allowances provided by your employer are generally considered taxable benefits." },
    { t: "Per Diems", c: "Daily allowances (per diems) for business travel up to 2,000 KES per day are usually exempt from tax." },
    { t: "Tax Avoidance vs Evasion", c: "Tax avoidance is legally using the tax regime to one's advantage (smart). Tax evasion is illegally hiding income (criminal)." },
    { t: "The Golden Rule of Tax", c: "You only pay tax on what you earn, but if you don't track your deductible expenses, you will pay more than you legally owe." }
  ];
  return { id: `tax-beg-${i}`, type: i % 4 === 0 ? 'insight' : 'concept', title: topics[i].t, content: topics[i].c, orderIndex: i };
})];

// Intermediate (30 Cards) - Capital Gains, eTIMS, Corporate Tax
const intCards: LearningCard[] = Array.from({ length: 30 }).map((_, i): LearningCard => {
  const topics = [
    { t: "Capital Gains Tax (CGT)", c: "CGT is a tax on the profit made from selling a non-inventory asset, like land or shares, that was purchased at a lower price." },
    { t: "CGT Rate in Kenya", c: "As of recent Finance Acts, the CGT rate in Kenya is 15% of the net gain. It is a final tax, meaning it's not added to your income tax." },
    { t: "Exemptions from CGT", c: "Transfers of property for the purpose of administering an estate, or transferring property to an immediate family member, are often exempt from CGT." },
    { t: "Calculating Net Gain", c: "Net Gain = Transfer Value (Selling Price) - Adjusted Cost (Purchase Price + Improvement Costs + Incidental Costs like legal fees)." },
    { t: "What is eTIMS?", c: "The electronic Tax Invoice Management System (eTIMS) mandates businesses to transmit electronic invoices directly to KRA in real-time." },
    { t: "Who needs eTIMS?", c: "Any person running a business, regardless of whether they are VAT registered or not, is required to onboard onto eTIMS to validate their expenses." },
    { t: "The Penalty for Missing eTIMS", c: "If a business expense is not supported by an eTIMS-generated invoice, it cannot be claimed as a tax-deductible expense, artificially inflating your tax bill." },
    { t: "Corporate Tax Basics", c: "Corporate Tax is levied on the profits of a company. Resident companies in Kenya are taxed at a standard rate of 30%." },
    { t: "Turnover Tax (TOT)", c: "TOT is a simplified tax for SMEs with an annual gross turnover between 1M and 25M KES. The rate is typically 3% of gross sales." },
    { t: "TOT vs Corporate Tax", c: "TOT is paid monthly on gross sales without deducting expenses. Corporate tax is paid annually on net profits. Businesses must calculate which is optimal." },
    { t: "Installment Taxes", c: "Companies don't wait until the end of the year to pay. They pay installment taxes in four tranches: 20th of the 4th, 6th, 9th, and 12th months." },
    { t: "Advance Tax", c: "Advance tax is paid by owners of commercial vehicles (matatus, lorries) before they can renew their NTSA operating licenses." },
    { t: "Rental Income Tax", c: "Residential Rental Income Tax is typically 7.5% of gross rent for landlords earning between 288k and 15M KES annually. It is a final tax." },
    { t: "Commercial vs Residential Rent", c: "Commercial rent is subject to 16% VAT if the landlord's annual turnover exceeds 5M KES. Residential rent is VAT exempt." },
    { t: "Tax Loss Harvesting", c: "If your business makes a loss, that loss can be carried forward indefinitely in Kenya to offset future taxable profits." },
    { t: "Capital Allowances", c: "Also known as Wear and Tear allowances, these allow businesses to deduct the depreciation of assets (like computers or machinery) from their taxable income." },
    { t: "Investment Deduction Allowance", c: "To encourage manufacturing, building a factory outside Nairobi can attract an Investment Deduction of 100% in the first year." },
    { t: "Digital Service Tax (DST)", c: "DST is payable at 1.5% of the gross transaction value by non-resident businesses providing services in the digital marketplace in Kenya." },
    { t: "Excise Duty", c: "Often called a 'sin tax', Excise Duty is levied on specific goods like alcohol, tobacco, fuel, and financial transactions (like M-PESA transfers)." },
    { t: "Fringe Benefit Tax", c: "If an employer gives an employee a loan at an interest rate lower than the market rate, the employer pays a Fringe Benefit Tax on the difference." },
    { t: "Tax on ESOPs", c: "Employee Stock Ownership Plans (ESOPs) are taxed as a benefit. The taxable value is the difference between the market value of shares and the offer price." },
    { t: "The 30% Rule for Mortgages", c: "Banks will not deduct more than a third of your basic salary. This limits how much mortgage you can qualify for, protecting you from over-leveraging." },
    { t: "Double Taxation Agreements (DTA)", c: "DTAs prevent income from being taxed in two different countries. Kenya has DTAs with countries like the UK, UAE, and South Africa." },
    { t: "Transfer Pricing", c: "Transfer pricing rules prevent multinational companies from artificially shifting profits to low-tax jurisdictions to avoid paying corporate tax in Kenya." },
    { t: "Thin Capitalization", c: "If a company is funded mostly by debt from its parent company, KRA limits the amount of interest expense it can deduct to prevent tax erosion." },
    { t: "Tax Compliance for Tenders", c: "Accessing the 30% AGPO (Access to Government Procurement Opportunities) requires a valid TCC, making tax compliance a business growth tool." },
    { t: "The Informal Sector Challenge", c: "KRA struggles to tax the informal sector (Jua Kali). eTIMS and Turnover Tax are recent tools designed to widen the tax base into this sector." },
    { t: "Voluntary Tax Disclosure", c: "The VTDP allowed taxpayers to declare previously undisclosed income and receive a waiver on penalties and interest. (Now expired, replaced by amnesty programs)." },
    { t: "Tax Agents", c: "Licensed tax agents (like ICPAK members) are authorized to represent you before KRA, file returns on your behalf, and handle audits." },
    { t: "The Cost of Ignorance", c: "In tax law, ignorance is never a defense. Failing to file a nil return out of ignorance still attracts the 2,000 KES penalty." }
  ];
  return { id: `tax-int-${i}`, type: 'concept', title: topics[i].t, content: topics[i].c, orderIndex: i + 30 };
});

// Pro (30 Cards) - Advanced Structuring, Trusts, REITs Tax
const proCards: LearningCard[] = Array.from({ length: 30 }).map((_, i): LearningCard => {
  const topics = [
    { t: "Tax Structuring via Holding Companies", c: "Wealthy individuals often use holding companies. Dividends passed from a subsidiary to a holding company controlling >12.5% are tax-exempt." },
    { t: "Family Trusts & Wealth Preservation", c: "A registered family trust offers massive tax advantages. Property transferred into a family trust is exempt from Capital Gains Tax." },
    { t: "Offshore Companies vs KRA", c: "Using offshore entities (e.g., Mauritius or BVI) must comply with Controlled Foreign Company (CFC) rules to ensure global income isn't illegally hidden." },
    { t: "Taxation of REITs", c: "Real Estate Investment Trusts (REITs) are exempt from corporate income tax. This makes them highly efficient vehicles for pooling capital." },
    { t: "Special Economic Zones (SEZ)", c: "Enterprises in SEZs (like Tatu City) enjoy a 10% corporate tax rate for 10 years, 15% for the next 10 years, and exemption from VAT and Excise duty." },
    { t: "Export Processing Zones (EPZ)", c: "EPZ companies enjoy a 10-year corporate tax holiday, making it the ultimate tax strategy for export-oriented manufacturing." },
    { t: "Capital Allowances Strategies", c: "Aggressive businesses time their capital expenditures to perfectly offset their most profitable years, minimizing their effective tax rate." },
    { t: "Debt vs Equity Financing Tax", c: "Interest payments on debt are tax-deductible expenses. Dividends paid on equity are not. This makes debt cheaper than equity in the tax code." },
    { t: "The Interest Restriction Rule", c: "KRA restricts the deduction of interest expenses to 30% of Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)." },
    { t: "Withholding Tax as a Cashflow Drain", c: "If you run a B2B service, 5% withholding tax traps your cash with KRA. You must constantly claim tax credits to optimize cashflow." },
    { t: "VAT Refunds", c: "If your input VAT (what you paid) exceeds your output VAT (what you collected), KRA owes you money. Claiming this requires a rigorous audit." },
    { t: "Taxation of Cryptocurrencies", c: "KRA is increasingly targeting crypto. Currently, crypto trading is subject to a 3% Digital Asset Tax (DAT) on the gross transfer value." },
    { t: "The DAT Controversy", c: "Because DAT is charged on gross value rather than net profit, a crypto day trader can lose money on a trade and still owe KRA 3%." },
    { t: "Taxing Influencers", c: "Content creators and influencers are subject to a 5% withholding tax on the gross amount paid to them by brands for endorsements." },
    { t: "Venture Capital Tax Incentives", c: "Registered venture capital companies enjoy a 10-year tax holiday on dividends received from their investments in local startups." },
    { t: "The Agency Problem in Tax", c: "Your accountant's goal is to keep you out of jail. Your goal is to keep your money. You must learn the tax code to push for legal optimizations." },
    { t: "Asset Protection via LLPs", c: "Limited Liability Partnerships offer the limited liability of a company but the tax transparency of a partnership (profits are taxed on the partners, avoiding double taxation)." },
    { t: "The 'Subject to Tax' Rule", c: "Global minimum tax rules are emerging, meaning if you shift profits to a 0% tax haven, Kenya might apply a top-up tax to reach 15%." },
    { t: "KRA Intelligence Operations", c: "KRA uses AI and data matching between your bank deposits, eTIMS, and mobile money to flag lifestyle discrepancies." },
    { t: "Handling a KRA Audit", c: "Never ignore KRA correspondence. Hire a licensed tax agent immediately. Audits review your bank statements, M-PESA lines, and lifestyle." },
    { t: "The Alternative Dispute Resolution (ADR)", c: "Instead of going to the Tax Appeals Tribunal (TAT), you can use ADR to negotiate a settlement with KRA without litigating." },
    { t: "Tax Appeals Tribunal", c: "If you disagree with a KRA assessment, you can appeal to the TAT. However, you must usually pay a portion of the disputed tax first." },
    { t: "Statute of Limitations", c: "KRA can generally only go back 5 years in an audit, unless they suspect fraud or gross/willful neglect, in which case there is no time limit." },
    { t: "Tax Evasion Penalties", c: "Tax fraud can result in a fine of double the tax evaded and up to 5 years in prison. It is a strict liability offense." },
    { t: "Tax Planning vs Tax Compliance", c: "Compliance is looking at the past (filing what happened). Planning is looking at the future (structuring contracts to minimize what will happen)." },
    { t: "The Shell Company Myth", c: "Setting up a shell company in a tax haven without real 'economic substance' (employees, offices) is now heavily penalized globally." },
    { t: "Taxation on Government Bonds", c: "Infrastructure bonds are extremely popular because the interest earned is completely tax-free, unlike standard Treasury bonds (15% WHT)." },
    { t: "Section 38 of the Tax Procedures Act", c: "KRA has the power to issue Agency Notices to your bank, freezing your accounts and sweeping funds to settle unpaid taxes without a court order." },
    { t: "Lifting the Corporate Veil", c: "If you use a company to evade taxes, KRA can ignore the limited liability structure and hold the directors personally liable for the tax debt." },
    { t: "The Ultimate Wealth Hack", c: "The wealthy don't evade taxes. They hire the best legal minds to legally structure their assets into tax-exempt brackets (Trusts, Infra Bonds, SEZs)." }
  ];
  return { id: `tax-pro-${i}`, type: 'insight', title: topics[i].t, content: topics[i].c, orderIndex: i + 60 };
});

export const phaseTaxes: Phase = {
  id: 'phase-taxes',
  title: 'Taxes and the Legal Framework',
  description: 'Master KRA, PAYE, eTIMS, VAT, Capital Gains, and advanced corporate tax structures in Kenya.',
  lessons: [
    { id: 'lesson-taxes-beg', phaseId: 'phase-taxes', title: 'Beginner Foundations', level: 'beginner', cards: begCards },
    { id: 'lesson-taxes-int', phaseId: 'phase-taxes', title: 'Intermediate Strategies', level: 'intermediate', cards: intCards },
    { id: 'lesson-taxes-pro', phaseId: 'phase-taxes', title: 'Pro Mastery', level: 'pro', cards: proCards }
  ]
};
