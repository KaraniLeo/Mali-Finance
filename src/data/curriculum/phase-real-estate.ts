import { Phase, LearningCard } from '../../types/curriculum';

// Beginner (30 Cards) - Real Estate Basics, Mortgages, Buying Land in Kenya
const begCards: LearningCard[] = Array.from({ length: 30 }).map((_, i) => {
  const topics = [
    { t: "What is Hard Asset Investing?", c: "Hard assets are tangible physical assets with intrinsic value. Real estate is the most common hard asset, offering a hedge against inflation because its value generally rises with the cost of living." },
    { t: "The Dual Return of Real Estate", c: "Real estate is unique because it offers two simultaneous returns: Capital Appreciation (the property goes up in value) and Rental Yield (the cash flow you receive from tenants)." },
    { t: "What is a Title Deed?", c: "A title deed is a legal document proving ownership of a piece of land. In Kenya, you must ensure the deed is genuine by conducting an official search at the Ministry of Lands before any transaction." },
    { t: "Freehold vs Leasehold", c: "Freehold means you own the land and the property on it indefinitely. Leasehold means you own it for a fixed period (often 99 or 999 years), after which ownership reverts to the government or freeholder." },
    { t: "The Land Search Process", c: "Never buy land without an official land search. It reveals the true registered owner, any encumbrances (like bank loans), or caveats placed on the property to prevent its sale." },
    { t: "Encumbrances and Caveats", c: "An encumbrance is a claim against a property by a party that is not the owner (e.g., a mortgage). A caveat is a legal notice to stop a transaction from proceeding until a dispute is resolved." },
    { t: "What is a Mortgage?", c: "A mortgage is a loan specifically used to purchase real estate. The property itself serves as collateral. If you default on the loan, the bank has the legal right to seize the property (foreclosure)." },
    { t: "The Mortgage Down Payment", c: "In Kenya, banks typically require a down payment (deposit) of 10% to 20% of the property's value before they approve a mortgage. You cannot borrow 100%." },
    { t: "Interest Rates in Kenya", c: "Commercial mortgage rates in Kenya are historically high, often ranging from 13% to 18% or more. This makes borrowing money to buy residential real estate extremely expensive." },
    { t: "Fixed vs Variable Rates", c: "A fixed-rate mortgage means your interest rate never changes. A variable rate fluctuates with the Central Bank Rate (CBR), meaning your monthly payments can suddenly increase." },
    { t: "The Kenya Mortgage Refinance Company (KMRC)", c: "KMRC is a government-backed institution that provides long-term funds to primary mortgage lenders (banks, SACCOs) to offer single-digit interest rate mortgages for affordable housing." },
    { t: "Qualifying for a KMRC Mortgage", c: "To qualify for a KMRC-backed mortgage (often under 10% interest), the property value must usually be under a certain threshold (e.g., 4 to 8 Million KES) depending on the location." },
    { t: "The 30% Rule", c: "Banks in Kenya follow the 30% rule: your total monthly debt repayments (including the new mortgage) cannot exceed 30-33% of your gross monthly income." },
    { t: "Off-Plan Properties", c: "Buying off-plan means buying an apartment or house before it is built, often at a significant discount. However, it carries the high risk that the developer might fail to complete the project." },
    { t: "Due Diligence on Developers", c: "Before buying off-plan, investigate the developer's track record. Have they completed previous projects? Are they funded? Never give money to a developer with no history." },
    { t: "The Escrow Account", c: "When buying off-plan, ensure your funds are deposited into an Escrow account managed by a neutral third party (like a lawyer), released to the developer only upon hitting construction milestones." },
    { t: "Sectional Properties Act", c: "Historically, apartment owners in Kenya received long-term leases (sub-leases). The Sectional Properties Act now allows apartment owners to hold individual, absolute title deeds for their specific units." },
    { t: "Why the Sectional Act Matters", c: "With an individual title deed under the new Act, you can easily use your apartment as collateral for a bank loan. It also prevents the original landowner from holding the land hostage." },
    { t: "Stamp Duty in Kenya", c: "Stamp duty is a tax levied on the legal transfer of property. In Kenya, it is 4% of the property value for urban areas (municipalities) and 2% for agricultural/rural land." },
    { t: "Capital Gains Tax (CGT) on Real Estate", c: "When you sell a property at a profit, you must pay CGT. The rate in Kenya is currently 15% of the net gain. It is the seller's responsibility to pay this." },
    { t: "Legal Fees and Valuation Costs", c: "When buying a house via a mortgage, you must pay for a professional valuation, structural surveys, and legal fees (advocate). Budget an extra 5-8% of the property price for these." },
    { t: "What is a Land Surveyor?", c: "A surveyor legally establishes and marks the physical boundaries of a piece of land. Never buy empty land without a licensed surveyor confirming the beacons match the registry map." },
    { t: "Agricultural vs Commercial Land", c: "Land is zoned for specific uses. You cannot legally build a commercial shopping mall on land zoned for agriculture without applying for a 'Change of User' from the county government." },
    { t: "Change of User", c: "This is the legal process of changing the permitted use of a property (e.g., converting a residential house into a commercial office). It requires planning permission and fees." },
    { t: "Property Rates and Land Rent", c: "Land Rent is paid annually to the Ministry of Lands for leasehold properties. Property Rates are paid annually to the County Government for the services they provide." },
    { t: "Clearance Certificates", c: "Before a property can be legally transferred, you must obtain a Rates Clearance Certificate (from the county) and a Rent Clearance Certificate (from the ministry) proving no debts exist." },
    { t: "The Risk of Squatters", c: "In Kenya, if a person occupies your land openly and continuously without your permission for 12 years, they can legally claim ownership under the law of 'Adverse Possession'." },
    { t: "Fencing and Development", c: "To protect empty land from squatters and adverse possession, always fence it, put up a sign, and visit it regularly. Do not abandon your investment." },
    { t: "The Concept of Yield", c: "Rental yield is your annual rental income expressed as a percentage of the property's value. If a 10M KES house rents for 50k a month (600k/year), the gross yield is 6%." },
    { t: "The 1% Rule", c: "A common real estate rule of thumb: a property should ideally rent for 1% of its purchase price per month. In Kenya, achieving the 1% rule on residential property is incredibly rare." }
  ];
  return { id: `re-beg-${i}`, type: 'concept', title: topics[i].t, content: topics[i].c, orderIndex: i };
});

// Intermediate (30 Cards) - Valuation, REITs, Leverage, Flipping
const intCards: LearningCard[] = Array.from({ length: 30 }).map((_, i) => {
  const topics = [
    { t: "The Illusion of High Yields", c: "Gross yield ignores expenses. Net yield is what matters: (Annual Rent - Expenses - Taxes - Vacancy) / Property Value. Residential net yields in Nairobi often sit at a poor 3-5%." },
    { t: "Cash Flow vs Capital Appreciation", c: "In Kenya, residential property is an appreciation play, not a cash flow play. The rent barely covers a commercial mortgage, but the land value increases rapidly over a decade." },
    { t: "What is a REIT?", c: "A Real Estate Investment Trust (REIT) is a company that owns, operates, or finances income-producing real estate. It allows you to invest in huge properties (like malls) by buying shares." },
    { t: "REITs on the NSE", c: "You can buy REITs on the Nairobi Securities Exchange (e.g., ILAM Fahari I-REIT or LAPTrust Imara I-REIT). They offer liquidity, meaning you can sell your 'real estate' instantly." },
    { t: "D-REITs vs I-REITs", c: "Development REITs (D-REITs) focus on constructing new properties (high risk, high reward). Income REITs (I-REITs) buy completed properties to generate steady rental income." },
    { t: "The Tax Advantage of REITs", c: "REITs are legally exempt from corporate income tax in Kenya, provided they distribute at least 80% of their net income to shareholders as dividends. This makes them highly efficient." },
    { t: "Good Leverage vs Bad Leverage", c: "Using a 15% bank mortgage to buy a house that yields 5% in rent is Bad Leverage (Negative Arbitrage). Using a 9% KMRC loan to buy an asset appreciating at 12% is Good Leverage." },
    { t: "The BRRRR Method", c: "Buy, Rehab, Rent, Refinance, Repeat. An advanced strategy where you buy a distressed property, renovate it to force appreciation, rent it out, and then refinance it to pull your original capital out." },
    { t: "Forced Appreciation", c: "Unlike market appreciation (waiting for prices to go up), forced appreciation is increasing the property's value yourself through strategic renovations (e.g., adding a bathroom or modernizing a kitchen)." },
    { t: "House Flipping in Kenya", c: "Flipping (buying, renovating, and quickly selling) is difficult in Kenya due to high transaction costs (4% stamp duty, 15% CGT, high legal fees) and a slow secondary market." },
    { t: "Property Valuation Methods", c: "Valuers use three main methods: The Sales Comparison Approach (residential), The Income/Capitalization Approach (commercial), and The Cost Approach (insurance)." },
    { t: "The Sales Comparison Approach", c: "Used for houses and land. The valuer finds 3-4 similar properties that recently sold in the same area and adjusts for differences (e.g., an extra bedroom or a bigger compound)." },
    { t: "The Income Approach (Capitalization)", c: "Used for commercial property. The value is determined by the income it generates. Value = Net Operating Income (NOI) / Capitalization Rate (Cap Rate)." },
    { t: "Understanding the Cap Rate", c: "The Cap Rate represents the expected rate of return for a specific class of property. A high cap rate means higher risk and lower property value. A low cap rate implies safety and high value." },
    { t: "Commercial Property Leases", c: "Commercial leases are much longer (e.g., 5 years, 10 years) and usually place the burden of maintenance, insurance, and taxes on the tenant (Triple Net Lease)." },
    { t: "Service Charge", c: "In apartments and commercial spaces, a service charge is collected monthly for communal upkeep (security, elevators, cleaning). High service charges can kill your net rental yield." },
    { t: "Managing Agents vs Self-Management", c: "Hiring a property manager typically costs 5-10% of gross rent. While it reduces your yield, it transforms real estate from an active job into a passive investment." },
    { t: "The Eviction Process", c: "You cannot legally lock out a defaulting tenant or disconnect their water in Kenya without following the strict legal process outlined in the Rent Restriction Act and Distress for Rent Act." },
    { t: "Distress for Rent Act", c: "This allows a landlord to hire a licensed auctioneer to seize a tenant's goods to recover unpaid rent, without needing a court order, provided the strict legal procedures are followed." },
    { t: "The Rent Restriction Tribunal", c: "Handles disputes between landlords and tenants for properties renting below 2,500 KES per month. (Yes, the legal limit is severely outdated and needs revision)." },
    { t: "Airbnb and Short-Term Rentals", c: "Short-term rentals can generate 2-3x the income of long-term leases, but they require active management, cleaning staff, furnishing capital, and suffer from seasonal vacancy risks." },
    { t: "The Tourism Regulatory Authority (TRA)", c: "In Kenya, operating an Airbnb legally requires you to register with the TRA, pay an annual license fee, and ensure the property meets specific hospitality standards." },
    { t: "Joint Ventures (JVs)", c: "Don't have money to build? A landowner can enter a JV with a developer. The owner provides the land, the developer builds, and they split the completed apartments." },
    { t: "The Risks of JVs", c: "If the developer runs out of money halfway, the landowner is stuck with a half-built concrete shell and complex legal battles. Always use an airtight Special Purpose Vehicle (SPV)." },
    { t: "Real Estate Syndication", c: "Syndication is pooling money from multiple investors to buy a large commercial property (like an apartment block) that no single investor could afford alone." },
    { t: "The Impact of Infrastructure", c: "The greatest driver of land appreciation in Kenya is government infrastructure (e.g., the SGR, the Expressway, or a new bypass). Savvy investors buy land in the path of progress." },
    { t: "Gated Communities vs Standalone", c: "Gated communities command higher rents and appreciate faster due to shared security and amenities, but they are governed by strict Homeowners Associations (HOAs)." },
    { t: "The 'Off-Plan' Ponzi Risk", c: "Some fraudulent developers use deposits from Project B to finish Project A. If sales slow down, the whole pyramid collapses. Always check their escrow structure." },
    { t: "Liquidity Risk in Real Estate", c: "Real estate is highly illiquid. If you need cash tomorrow for a medical emergency, you cannot sell a house in 24 hours. Always maintain liquid cash reserves." },
    { t: "The True Cost of Ownership", c: "Owning property means paying for maintenance, insurance, property rates, and facing periods of zero income (vacancy). Real estate is not entirely passive." }
  ];
  return { id: `re-int-${i}`, type: 'insight', title: topics[i].t, content: topics[i].c, orderIndex: i + 30 };
});

// Pro (30 Cards) - Advanced Commercial Structuring, Land Banking, Taxation
const proCards: LearningCard[] = Array.from({ length: 30 }).map((_, i) => {
  const topics = [
    { t: "The Math of Commercial Real Estate", c: "Commercial real estate is valued strictly on a multiple of its income (Cap Rate). If you increase the rent of an apartment block by 100k, you increase its overall valuation by millions." },
    { t: "Cap Rate Compression", c: "When market cap rates fall (compress), property values rise. If you buy a building at an 8% cap rate and the market shifts to a 6% cap rate, your building's value just exploded." },
    { t: "Refinancing to Access Equity", c: "If your commercial building appreciates by 50M KES, you don't have to sell it to get the money. You can refinance the mortgage, pull out the 50M in tax-free debt, and buy another building." },
    { t: "The Tax-Free Nature of Debt", c: "Why refinance instead of sell? Selling triggers a 15% Capital Gains Tax. Borrowing against the new equity is not a taxable event. The wealthy live on borrowed money." },
    { t: "Depreciation as a Tax Shield", c: "Commercial investors use 'Wear and Tear' capital allowances to depreciate the building over time. This paper loss offsets the actual rental income, drastically reducing corporate tax." },
    { t: "Cost Segregation Studies", c: "Instead of depreciating a whole building over 40 years, pros hire engineers to segregate costs (HVAC, plumbing) which can be depreciated much faster, front-loading the tax savings." },
    { t: "Land Banking Strategies", c: "Buying large tracts of raw land in the path of development and holding it for 10-20 years. It requires zero maintenance but ties up capital without generating cash flow." },
    { t: "Subdivision for Profit", c: "The easiest way to force appreciation on raw land is the legal process of subdivision. A 5-acre block is worth less per acre than fifty 1/8th-acre plots." },
    { t: "The Power of Zoning Laws", c: "If you buy land zoned for agriculture, its value is capped. If you lobby the county to rezone it to high-density residential, you can multiply its value overnight without touching a brick." },
    { t: "Using Special Purpose Vehicles (SPVs)", c: "Never own commercial real estate in your personal name. Put each building in its own LLC (SPV) to isolate liability. If someone slips and sues Building A, they cannot touch Building B." },
    { t: "The 1031 Exchange (US Concept)", c: "While Kenya doesn't have a direct equivalent to the US 1031 exchange, understanding how global investors defer capital gains by rolling profits directly into larger properties is critical theory." },
    { t: "Master Leasing", c: "You lease a large building from the owner for a fixed price, and then sublease the individual units out at a premium. You control the real estate and the cash flow without actually buying the asset." },
    { t: "Mezzanine Financing", c: "A hybrid of debt and equity financing. If a developer needs 100M but the bank only gives 80M, a mezzanine lender provides the 20M at a very high interest rate, secured by equity in the project." },
    { t: "Real Estate Private Equity (REPE)", c: "Firms that raise billions from institutional investors to buy massive portfolios of real estate. They operate on a '2 and 20' fee structure and focus on IRR (Internal Rate of Return)." },
    { t: "Understanding IRR", c: "The Internal Rate of Return is the annualized effective compounded return rate. Unlike ROI, IRR factors in the time value of money—getting your profit in Year 1 is better than Year 5." },
    { t: "The Equity Multiple", c: "If you invest 1M KES and get back 2.5M KES total over the life of the project, your equity multiple is 2.5x. It doesn't factor in time, making it the perfect partner metric to IRR." },
    { t: "Cross-Collateralization", c: "Using the equity in Property A to secure the down payment for Property B. This allows rapid portfolio scaling but creates a house of cards—if Property A fails, you lose both." },
    { t: "Non-Recourse Loans", c: "A commercial loan where the property is the ONLY collateral. If you default, the bank takes the building but cannot come after your personal bank accounts or other assets." },
    { t: "The Debt Service Coverage Ratio (DSCR)", c: "Banks use DSCR to approve commercial loans. DSCR = Net Operating Income / Annual Debt Service. A DSCR of 1.25 means the property generates 25% more income than the mortgage payment." },
    { t: "Seller Financing", c: "The seller acts as the bank. You pay the seller a down payment and monthly installments directly. This bypasses high bank interest rates and strict lending criteria." },
    { t: "Options Contracts on Land", c: "You pay a landowner a small fee for the 'option' to buy their land at a set price within a set timeframe. You then find a developer to buy it at a higher price, keeping the spread." },
    { t: "Air Rights", c: "In hyper-dense cities, you can sell or lease the empty space above your building to a developer who wants to build a skyscraper next door and needs the legal right to build higher." },
    { t: "Distressed Debt Investing", c: "Instead of buying the foreclosed property, you buy the non-performing loan (the mortgage) from the bank at a discount. You then become the bank and either negotiate with the owner or foreclose." },
    { t: "Tax Lien Certificates", c: "When property owners fail to pay county property taxes, the government can sell that tax debt to investors. The investor earns massive interest, or eventually forecloses on the property." },
    { t: "The Institutional Buyer (BlackRock)", c: "Global institutions are buying single-family homes to rent out, driving up prices. You are no longer competing with families for a house; you are competing with Wall Street algorithms." },
    { t: "The PropTech Revolution", c: "Technology is changing real estate. Blockchain tokenization of property allows 1,000 people to own a fraction of a commercial building, creating ultimate liquidity." },
    { t: "Navigating Kenyan Land Cartels", c: "The dark side of Kenyan real estate. Always use trusted advocates. Beware of double allocations, fake title deeds, and politically exposed land that can be revoked by the state." },
    { t: "The Ndung'u Report", c: "A famous Kenyan commission report on illegal and irregular allocation of public land. Buying land listed in this report guarantees you will eventually lose it to the state." },
    { t: "Spatial Monopolies", c: "Real estate is the only true spatial monopoly. They aren't making any more land in Westlands. The owner of the land dictates the economic rent of all businesses operating upon it." },
    { t: "The Ultimate Edge", c: "Real Estate is a game of finance, not bricks. The person who understands DSCR, Cap Rates, and tax shields will always outperform the person who just knows how to build a good house." }
  ];
  return { id: `re-pro-${i}`, type: 'warning', title: topics[i].t, content: topics[i].c, orderIndex: i + 60 };
});

export const phaseRealEstate: Phase = {
  id: 'phase-real-estate',
  title: 'Real Estate & Hard Assets',
  description: 'Master Mortgages, REITs, Valuations, Commercial Cap Rates, and the Kenyan Sectional Properties Act.',
  lessons: [
    { id: 'lesson-re-beg', phaseId: 'phase-real-estate', title: 'Beginner Foundations', level: 'beginner', cards: begCards },
    { id: 'lesson-re-int', phaseId: 'phase-real-estate', title: 'Intermediate Strategies', level: 'intermediate', cards: intCards },
    { id: 'lesson-re-pro', phaseId: 'phase-real-estate', title: 'Pro Mastery', level: 'pro', cards: proCards }
  ]
};
