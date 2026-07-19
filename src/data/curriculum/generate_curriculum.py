import json
import os

# Definitions of Junior Modules (10 modules, 45 cards each = 15 beginner, 15 intermediate, 15 pro)
junior_modules = [
    {
        "id": "junior-1",
        "title": "Piggy Bank Mastery",
        "description": "A comprehensive guide to the history of money, earning value, and delayed gratification.",
        "topics": {
            "beginner": [
                ("What is Money?", "Money is something we use to pay for things we want and need. Before money, people traded goods directly!"),
                ("Barter Trading", "Long ago, if you wanted apples, you had to trade your bananas for them. This was called barter trade."),
                ("Coined History", "Ancient coins were made of precious gold or silver. They had pictures of kings or animals on them."),
                ("Paper Money", "Paper money is lighter and easier to carry than heavy metal coins. It represents real value stored safely."),
                ("The First Piggy Bank", "Early piggy banks were made of clay called 'pygg'. They helped children store pennies safely."),
                ("Pennies and Shillings", "Every big amount of money is made of small coins. Saving a single shilling today builds up over time."),
                ("Barter Challenges", "If you had cows and wanted shoes, it was hard to trade because shoes are worth less than a cow!"),
                ("The Double Coincidence", "For barter to work, you had to find someone who wanted what you had and had what you wanted."),
                ("Salt as Currency", "In ancient history, Roman soldiers were sometimes paid in salt, which is where the word 'salary' comes from!"),
                ("Shells and Beads", "Before metal, people used beautiful cowrie shells or beads as money to trade in local markets."),
                ("What is a Piggy Bank?", "A piggy bank is a hollow container, usually shaped like a pig, with a slot for coins to help you save."),
                ("Delayed Gratification", "This means waiting to get something even better later. Saving your money now is a form of delayed gratification."),
                ("Why Save at Home?", "Keeping a savings jar in your bedroom helps you see your coins grow, teaching you patience."),
                ("Coins and Math", "Counting your piggy bank coins is a great way to practice addition and basic math skills!"),
                ("The Saving habit", "Saving a little bit of money regularly is one of the best habits you can build for your future.")
            ],
            "intermediate": [
                ("Earning Value", "You earn money by doing helpful work or selling something others want. Money is a reward for providing value."),
                ("Delayed Gratification game", "If you wait to buy a small toy today, you can buy a much bigger, cooler toy next month."),
                ("Wants vs Goals", "A goal is a specific thing you are saving for, like a book. A want is an instant craving, like candy."),
                ("Wasting Money", "Spending money on tiny toys that break in five minutes is a waste. Save for durable items instead."),
                ("Counting Your Coins", "Always count your savings monthly. Keep a record of your balance in a dedicated savings notebook."),
                ("The Coin Jar Rule", "Set a rule: whenever you get a coin, half goes to savings and the other half goes to your wallet."),
                ("Value of Work", "Helping clean up after dinner shows you understand the value of work. It helps your family run smoothly."),
                ("Making a Choice", "If you have KES 100, you can choose to spend it on ice cream now or save it for a storybook later."),
                ("The Patience muscle", "Patience is like a muscle. The more you practice waiting to buy things, the stronger your patience becomes!"),
                ("Physical Money Limits", "Physical coins can be lost or misplaced. Keep your piggy bank in a safe, private corner of your room."),
                ("Pesa in Swahili", "In East Africa, the local word for money is 'Pesa'. We use it every day at local dukas."),
                ("The Piggy Bank Key", "Some piggy banks have a key at the bottom. Give the key to your parents so you aren't tempted to open it early!"),
                ("Resisting Cravings", "When you see a shiny toy, ask yourself: 'Will I still care about this toy in one week?'"),
                ("The Small Savings Win", "Saving even KES 10 every single week adds up to KES 520 in one year. That is a great savings start!"),
                ("The Value of Care", "Taking care of your toys means you don't have to spend your savings to replace broken ones.")
            ],
            "pro": [
                ("Compound Savings", "Adding interest to your savings makes your money multiply. Save consistently to experience growth."),
                ("Investing Your Coins", "When you are older, you can put your savings into investments that grow on their own."),
                ("Budget Jars", "Use three jars: Spend, Save, and Give. This ensures you budget your pocket money correctly."),
                ("Opportunity Cost basic", "When you buy a toy car, you give up the chance to buy a coloring book. That is the opportunity cost."),
                ("The Lifetime Habit", "The habits you build with a piggy bank today will help you manage bank accounts when you grow up."),
                ("The Master Saver", "A master saver plan is to never spend money instantly. Always write it down first and think it over."),
                ("Generosity Jar", "The Give jar is for buying gifts for friends or donating to children who do not have toys."),
                ("Smart Shopping", "Look for items on sale. Buying a book on discount means you keep more coins in your piggy bank."),
                ("Financial Goals", "Set a target: 'I will save KES 500 by Christmas.' Having a clear date makes saving much easier!"),
                ("Understanding Inflation", "Over time, prices of goods go up. A candy that cost KES 5 years ago might cost KES 10 today."),
                ("The Entrepreneur Mind", "If you use your savings to buy paper and crayons to sell drawings, you are a mini entrepreneur!"),
                ("The Risk of Borrowing", "Borrowing money from friends means you have to pay them back later, which reduces your future savings."),
                ("Avoiding Debt", "Never spend money you do not have. Waiting until you have saved enough is always the safest route."),
                ("True Wealth", "Wealth is not just about buying shiny things. True wealth is having options, security, and peace of mind."),
                ("The Savings Graduation", "Once your piggy bank is full, it is time to visit a real bank to deposit your coins safely.")
            ]
        }
    },
    {
        "id": "junior-2",
        "title": "Piggy Bank to Real Bank",
        "description": "Learn about moving your physical coins to a real bank, how deposits work, and how the bank keeps your savings super safe.",
        "topics": {
            "beginner": [
                ("What is a Bank?", "A bank is a secure building where people store their money to keep it safe from theft or fire."),
                ("The Bank Vault", "Banks have massive steel safes called vaults. They are thick and locked with secret codes."),
                ("The Bank Teller", "A teller is a bank employee who assists you with depositing or withdrawing cash at the counter."),
                ("Your Bank Account", "A bank account is your personal record at the bank. It keeps track of how much cash is yours."),
                ("Depositing Cash", "Depositing is placing money into the bank. The bank adds that amount to your digital account balance."),
                ("Withdrawing Cash", "Withdrawing is taking your money out of the bank. You can only withdraw what you have saved!"),
                ("The Debit Card", "A plastic debit card is a key to your account. It allows you to pay at shops without using physical cash."),
                ("Security Guards", "Banks hire trained security guards to protect the building and ensure everyone inside is safe."),
                ("Bank Hours", "Banks open during the day and close at night. However, digital banking works 24 hours a day!"),
                ("The Safe Drawer", "Before computers, banks kept track of accounts using large handwritten paper ledgers in drawers."),
                ("Why Banks are Safer", "Keeping lots of cash at home is risky because of burglaries or fires. Banks guarantee your money is safe."),
                ("Opening an Account", "To open an account, you visit the bank with a parent and fill out an official sign-up form."),
                ("Digital Records", "When you deposit cash, a computer records it instantly. Your balance updates on the bank's screen."),
                ("Checking Your Balance", "You can ask the teller for a printout of your balance to see exactly how much you have saved."),
                ("The Bank Manager", "The manager is the leader of the bank. They make sure the tellers are helpful and the vaults are secure.")
            ],
            "intermediate": [
                ("What is an ATM?", "ATM stands for Automated Teller Machine. It is a computer on the street that dispenses cash from your account."),
                ("Your Secret PIN", "A Personal Identification Number (PIN) is a 4-digit password for your debit card. Never share it!"),
                ("How ATMs Get Cash", "ATMs do not give out free money. They only dispense the cash that you have saved in your account."),
                ("Tap to Pay", "Many debit cards allow you to pay by tapping the card on a reader machine at the supermarket checkout."),
                ("Online Banking Apps", "Grown-ups use mobile apps to check their balances and transfer funds without visiting the physical bank."),
                ("The Bank Statement", "A bank statement is a monthly paper report listing all your deposits, withdrawals, and interest earned."),
                ("Transaction Fees", "Some banks charge a very small fee to process withdrawals. It pays for the bank's computers and vault services."),
                ("Co-signed Accounts", "Kids get co-signed accounts. This means parents help manage the account and keep track of spend limits."),
                ("The ATM Slot", "Insert your card into the ATM slot, enter your PIN, select the withdraw option, and collect your cash."),
                ("Card Decline", "If you try to buy a toy that costs more than your bank balance, your debit card transaction will decline."),
                ("The Paper Receipt", "Always take your receipt from the ATM. It helps you verify that the transaction amount was correct."),
                ("Safe Cards", "If you lose your debit card, tell your parents immediately. The bank can lock the card so nobody else can use it."),
                ("The Central Bank", "The Central Bank is the main bank of the country. It controls the printing of paper bills and coins."),
                ("Saving for Big Goals", "A bank account is perfect for saving for large goals like high school or a computer, since it is harder to spend."),
                ("Interest payments", "Banks sometimes pay you a small reward just for keeping your savings inside their vaults.")
            ],
            "pro": [
                ("What is Interest?", "Interest is extra money the bank pays you as a reward for keeping your savings in their accounts."),
                ("The Power of Compounding", "When your savings earn interest, that interest earns more interest. This compounds and grows your wealth!"),
                ("Savings vs Checking Accounts", "Savings accounts pay interest to help your savings grow. Checking accounts are for daily spending."),
                ("Minimum Balance", "Some bank accounts require you to keep at least KES 500 inside at all times to avoid fee charges."),
                ("How Banks Make Money", "Banks use deposited savings to lend money to businesses, charging them interest, which funds the bank."),
                ("The Interest Rate", "An interest rate is the percentage reward you earn. A 5% rate means you get KES 5 for every KES 100 saved per year."),
                ("Deposit Insurance", "Governments guarantee that even if a bank closes, your savings up to a large amount will be paid back."),
                ("Digital Transfers", "You can send digital shillings to a friend's bank account instantly using online wire transfers."),
                ("Avoiding Card Scams", "Never let anyone walk away with your debit card. Keep it in sight at the cash register to prevent copy scams."),
                ("Credit Cards vs Debit Cards", "Debit cards use your own saved money. Credit cards borrow money from the bank, which you must pay back with interest."),
                ("Building Bank Trust", "Keeping a clean bank account history helps you borrow money easily when you want to buy a house in the future."),
                ("The Bank Ledger", "The master system that records every transaction in the bank. It must balance perfectly to the last cent every day."),
                ("Mobile Bank Links", "In Kenya, you can link your bank account to your mobile wallet to transfer money back and forth easily."),
                ("Emergency Savings Account", "Create a separate bank account dedicated solely to emergencies. Never touch it for daily wants!"),
                ("Your Financial Graduation", "Moving from a piggy bank to a savings account is a big step toward becoming a financially smart adult.")
            ]
        }
    },
    {
        "id": "junior-3",
        "title": "Needs vs. Wants game",
        "description": "Understand the difference between things you must have to survive (Needs) and things that are just nice to have (Wants).",
        "topics": {
            "beginner": [
                ("What is a Need?", "A Need is something you absolutely must have to survive, stay healthy, and be safe."),
                ("Clean Water", "Water is a primary need. Our bodies require clean water to stay alive and healthy every day."),
                ("Healthy Food", "Food is a need. It gives us energy to play, grow, and study. Fast food is not a need, but healthy meals are!"),
                ("A Safe Home", "Shelter is a need. A house keeps us safe from the rain, hot sun, cold winds, and wild animals."),
                ("Warm Clothing", "Clothing is a need. It protects our skin and keeps us warm when the weather gets cold."),
                ("What is a Want?", "A Want is something that is fun or nice to have, but you can live perfectly fine without it."),
                ("Toys and Games", "Toys, dolls, and video games are wants. They make playing fun, but they are not required to survive."),
                ("Sweet Treats", "Candy, soda, chocolates, and ice cream are wants. They taste yummy, but water and fruit are what we actually need."),
                ("Need vs Want basic", "School books are needs because they help you learn. Comic books are wants because they are for entertainment."),
                ("Priorities", "Prioritizing means taking care of important things first. Always pay for needs before buying wants!"),
                ("Air to Breathe", "Clean air is a natural need. We need it every second of our lives to live and breathe."),
                ("Medicine when Sick", "Medicine and doctor visits are needs. They help our bodies heal and stay protected against diseases."),
                ("Sleeping Sleep", "Getting enough rest is a physical need. It helps our brains recharge and prepares us for the next day."),
                ("Warm Bedting", "A mattress and blankets are needs to keep you warm and comfortable while sleeping at night."),
                ("School Shoes", "A pair of shoes to wear to school is a need. Having ten pairs of colorful sneakers is a want.")
            ],
            "intermediate": [
                ("The 50/30/20 Rule simplified", "Allocate 50% of your allowance to Needs, 30% to Wants, and save the remaining 20% in your piggy bank."),
                ("Grocery Budgeting", "When parents shop, they prioritize vegetables, milk, and flour (Needs) over cookies and soda (Wants)."),
                ("The Wants List", "Keep a list of your wants. Wait a week before buying. Often, you will realize you do not need them!"),
                ("Peer Pressure", "Just because your friend has a cool new toy does not mean you need it. Stick to your own goals."),
                ("Ad Tricks", "Advertisements on TV or YouTube try to make you believe a 'Want' is a 'Need' so you spend your cash."),
                ("Upgrades are Wants", "If you have a working school bag, buying a new cartoon-themed bag is a want, not a need."),
                ("Saving for Needs", "Sometimes needs are expensive, like fixing a leaky roof. Savings help pay for these unexpected needs."),
                ("The Wants Budget", "Having a small budget for wants is good. It allows you to enjoy treats without spending all your savings."),
                ("Sharing Your Wants", "If you share your toys (wants) with friends, playing becomes twice as fun and you do not need to buy more toys!"),
                ("The Need of Transport", "Getting to school is a need. Buying a luxury sports car is a want. Walking or taking a bus works fine!"),
                ("Wants change with age", "What you want changes as you grow. A toddler wants blocks; a teenager wants a phone. Needs stay the same!"),
                ("Healthy Wants", "Some wants are healthy, like sports equipment. But they are still wants because you can exercise without them."),
                ("The Budget Choice", "If you have KES 200, buying lunch is a need. Spending it on a toy and skipping lunch is a poor decision."),
                ("Utility Bills", "Electricity and water at home are needs. Parents pay these bills first so the family has light and water."),
                ("Distinguishing value", "Learning to say 'no' to temporary wants keeps your wallet full and ready for important goals.")
            ],
            "pro": [
                ("Opportunity Cost advanced", "Buying a want (like a candy bar) means you lose the opportunity to save that money for a future need."),
                ("Inflation on Needs", "When the cost of needs (like bread or milk) goes up, you must cut back on wants to afford them."),
                ("The Emergency Fund", "This is money saved specifically for unexpected needs, like a hospital bill or car repair."),
                ("Delayed gratification benefit", "Waiting to buy wants allows your savings to earn interest, making you wealthier over time."),
                ("The Cycle of Wants", "Wants are endless. Once you get a toy, you will want another one. Needs have limits and are easily satisfied."),
                ("The Family Budget", "A map of how a family divides income among rent, food, transport (Needs) and holiday trips (Wants)."),
                ("Needs vs Wants for Animals", "Pets have needs too! Food and vet care are needs; a fancy sparkly collar is a want."),
                ("The Resource Trap", "Spending all your income on wants leaves you vulnerable when emergency needs arise. Always save first!"),
                ("Social Needs", "Staying connected with family is a need. Buying the latest smartphone to do so is a want; any working phone suffices."),
                ("Delayed Purchase Joy", "Research shows that buying a want after saving for weeks brings much more joy than buying it instantly."),
                ("Taxes pay for Public Needs", "The government collects taxes to pay for public needs, like public roads, schools, and hospitals."),
                ("Impulse Cravings", "A craving is a short-term, intense want. It usually fades after 20 minutes if you distract yourself!"),
                ("The Spending Audit", "Look at your receipts from last month. Circle the wants in red and needs in green. It is eye-opening!"),
                ("Smart Budget Scaling", "If your pocket money is reduced, immediately cut your wants budget to 0 to protect your savings and needs."),
                ("The Wisdom of Contentment", "Contentment is being happy with what you have. It is the ultimate tool to resist buying endless wants.")
            ]
        }
    },
    {
        "id": "junior-4",
        "title": "How Parents Earn Money",
        "description": "Discover how grown-ups go to work, use their skills to help others, and earn the money that pays for the family bills.",
        "topics": {
            "beginner": [
                ("What is a Job?", "A job is work you do regularly in exchange for money. Grown-ups use their jobs to support families."),
                ("Different Careers", "Teachers, doctors, builders, pilots, and farmers all have different jobs that help our community."),
                ("Time for Money", "To earn money, adults spend their time and energy working. Money is a reward for their effort."),
                ("Using Your Skills", "Earning money requires skills. The better you are at a skill, the more helpful you can be to others."),
                ("What is a Salary?", "A salary is a steady payment made to a worker, usually once a month, for doing their job."),
                ("Hourly Wages", "Some workers are paid by the hour. The more hours they work, the more money they earn."),
                ("The Business Owner", "An entrepreneur starts a business (like a shop or café) to earn money by selling goods or services."),
                ("Waking Up Early", "Going to work requires discipline, like waking up early and being punctual every single day."),
                ("Earning an Allowance", "Kids can practice earning money by doing extra chores around the house to help their parents."),
                ("Doing Chores", "Chores are small cleaning tasks. Wiping tables or sorting toys helps keep the home neat and organized."),
                ("The Chore Checklist", "Using a chart to track your chores makes it easy to see how much allowance you earned at week's end."),
                ("Volunteering is Free", "Volunteering is doing helpful work for free to support your school, church, or neighborhood."),
                ("Helping Neighbors", "Helping a neighbor carry heavy bags is a kind act that builds friendships without needing payment."),
                ("Community Helpers", "Firefighters and police officers do important jobs to keep us safe, funded by public tax money."),
                ("Hard Work Reward", "Earning money feels great because it represents your hard work, dedication, and time.")
            ],
            "intermediate": [
                ("Paid Chores vs Family Chores", "Making your bed is a family duty you do for free. Washing the car is an extra chore that can earn allowance."),
                ("What is Capital?", "Capital is the money you need to start a business, like buying lemons and sugar to set up a stand."),
                ("Value Exchange", "Money is a tool for exchange. You give your time and skills, and others give you cash in return."),
                ("Earning from Hobbies", "You can earn money from hobbies, like selling handmade paintings or baking cookies for neighbors."),
                ("Lemonade Stand Example", "A lemonade stand is a great beginner business. You buy ingredients, make juice, and sell it for a profit."),
                ("Calculating Profit", "If lemons cost KES 100 and you sell juice for KES 250, your profit is KES 150. Profit is sales minus cost!"),
                ("Saving for Materials", "To make products to sell, you must first save money to buy the raw materials needed."),
                ("Customer Care", "Being polite and smiling at your customers makes them happy and encourages them to buy from you again."),
                ("Quality of Work", "If you do a lazy job washing a car, you won't get hired again. Always do your absolute best!"),
                ("The Chore Agreement", "Agree on the price of chores with parents beforehand: e.g., KES 50 for weeding, KES 100 for dusting."),
                ("Non-Money Rewards", "Volunteering teaches you teamwork and responsibility. These skills are often worth more than cash!"),
                ("Helping Animals", "Volunteering at an animal shelter helps keep stray dogs and cats safe, healthy, and happy."),
                ("The Clean-Up Drive", "Participating in a community clean-up drive keeps public parks clean and beautiful for kids to play in."),
                ("Saving Chore allowance", "When you get chore money, put it straight into your savings jar before you are tempted to spend it."),
                ("Understanding Trades", "Carpenters trade woodworking skills for money. Plumbers trade pipe repair skills. What skill do you want to learn?")
            ],
            "pro": [
                ("Passive Income basic", "Passive income is money you earn without actively working every day, like earning rent from a house."),
                ("Startup Risk", "Starting a business has risks. If you buy lemons but nobody buys your lemonade, you might lose your capital."),
                ("Taxes on Earnings", "When grown-ups earn money, they pay a portion (income tax) to the government to fund public services."),
                ("Job Specialization", "Specializing means learning to do one thing extremely well. Highly specialized jobs often pay higher salaries."),
                ("The Service Industry", "Earning money by doing actions for others, like cutting hair, repairing cars, or delivering food."),
                ("The Goods Industry", "Earning money by manufacturing or selling physical products, like clothes, books, or building bricks."),
                ("Bargaining in Business", "Sellers buy goods in bulk at wholesale prices, then sell them at retail prices to make a profit."),
                ("The Business Plan", "A written plan describing what you will sell, who will buy it, and how you will earn profit."),
                ("Managing Chores Time", "Balance your chores with schoolwork. School is your primary job, and learning is your greatest investment!"),
                ("Giving Back to Community", "Generous business owners donate a portion of their profits to local schools or community projects."),
                ("The Volunteer Spirit", "Volunteering shows leadership. It proves you care about helping others, not just making money."),
                ("Job Satisfaction", "Earning money is important, but choosing a career you enjoy brings happiness and long-term success."),
                ("Retirement Planning", "Grown-ups save a portion of their salary in retirement funds so they have money when they stop working."),
                ("The Cost of Business", "Before declaring profit, subtract costs like raw ingredients, signs, and transportation fees from total sales."),
                ("Financial Independence", "Working hard and saving diligently helps you support yourself and make your own life choices.")
            ]
        }
    },
    {
        "id": "junior-5",
        "title": "Understanding Prices & Costs",
        "description": "Learn how to read price tags, compare prices at different shops, and choose the best value for your coins.",
        "topics": {
            "beginner": [
                ("The Price Tag", "A price tag is a small label on an item that tells you exactly how much money it costs to buy."),
                ("Kenyan Shillings", "In Kenya, the currency is the Shilling (KES). Prices are written with numbers, like KES 50 or KES 200."),
                ("The Currency Symbol", "Different countries use different symbols, like $ for Dollars, £ for Pounds, and KES or Sh for Shillings."),
                ("Do you have enough?", "Before queueing at the checkout, check your wallet to make sure you have enough cash for the item."),
                ("The Grocery Receipt", "After paying, the cashier gives you a paper receipt listing each item's price and your change."),
                ("What is Change?", "If you pay KES 100 for a KES 80 book, the cashier gives you KES 20 back. That KES 20 is your change!"),
                ("Price Comparison", "This means checking the price of the same item at different stores to find the cheapest deal."),
                ("Finding a Deal", "If Shop A sells a ball for KES 200 and Shop B sells it for KES 150, buying from Shop B is a deal!"),
                ("The Sticker Price", "In Kenyan supermarkets, the price on the sticker is the final price you pay. Taxes are already included."),
                ("Asking the Cashier", "If a product does not have a price tag, ask a store clerk politely: 'Excuse me, how much is this?'"),
                ("Counting Your Change", "Always count your change at the register to make sure the cashier gave you the correct amount back."),
                ("Supermarket Shelves", "Supermarkets group similar items together. Compare the prices of different brands on the same shelf."),
                ("Cheap Toys Warning", "Very cheap toys often break quickly. Sometimes paying a bit more for quality is a smarter choice."),
                ("Price of Sweets", "Small sweets cost KES 5 or 10. Toy cars might cost KES 200. Different things have different values."),
                ("The Coin Value", "A KES 20 coin is worth more than a KES 10 coin. Learn the color and size of each Shilling coin.")
            ],
            "intermediate": [
                ("Generic vs Branded", "Supermarket brands (generic) are often cheaper than famous cartoon-branded items, but taste the same!"),
                ("Buying in Bulk", "Buying a large pack of 10 pencils together is usually cheaper per pencil than buying 10 single ones."),
                ("Supermarket Tricks", "Supermarkets place expensive chocolates at eye-level to temp you. Look at lower shelves for better prices!"),
                ("The Unit Price", "The price of a single item within a pack. Comparing unit prices helps you find the true cheapest deal."),
                ("What is a Discount?", "A discount is a price reduction, like '10% off' or 'Save KES 50'. It makes items cheaper to buy."),
                ("Bargaining at the Market", "In local open-air markets, you can politely negotiate the price with the seller to get a discount."),
                ("Price of Seasonality", "Fruits like mangoes are cheap when they are in season (harvest) and expensive when they are rare."),
                ("Sales Promotions", "Offers like 'Buy One Get One Free' are great if you need two, but a waste of money if you only need one!"),
                ("Checking Expiry Dates", "Always check the expiry date on food price tags. Cheap food that expires tomorrow might go bad before you eat it."),
                ("The Cost of Batteries", "Electronic toys need batteries. Factor in the cost of buying batteries when checking the toy's price tag!"),
                ("Comparing Sizes", "Compare the price of a small juice box with a large carton. The large carton is often a better deal per ml."),
                ("Local Dukas", "Local kiosk shops (dukas) are convenient, but sometimes supermarkets have cheaper prices because they buy in bulk."),
                ("The Price of Rarity", "When a toy is popular and hard to find, its price usually goes up because many kids want it."),
                ("Value for Money", "Getting value means choosing items that are durable, useful, and reasonably priced. Don't just buy the cheapest!"),
                ("Planning a Toy Buy", "Check prices online or ask friends before buying a toy, so you know the average cost and don't overpay.")
            ],
            "pro": [
                ("Understanding Scarcity", "Scarcity is when there is not enough of something. High scarcity causes prices to rise rapidly."),
                ("Supply and Demand basic", "If supply is high and demand is low, prices drop. If supply is low and demand is high, prices rise!"),
                ("The Cost of Production", "The price of a toy includes the cost of plastic, shipping, wages for workers, and shop rent."),
                ("Inflation Impact", "Inflation makes money lose value. If inflation is high, your savings will buy fewer goods next year."),
                ("Import Fees", "Toys made in other countries are expensive because shops have to pay import taxes to bring them to Kenya."),
                ("Smart Negotiation", "To bargain well, be polite, offer a fair price, and be ready to walk away if the seller's price is too high."),
                ("Opportunity Cost of Sales", "Buying an item just because it is on sale is still spending. The opportunity cost is the savings you lost!"),
                ("Wholesale vs Retail", "Wholesale is buying in huge quantities at low prices. Retail is buying single items at normal shop prices."),
                ("Price Gouging warning", "Sometimes sellers raise prices unfairly during emergencies (like water in a drought). Avoid these sellers if possible."),
                ("Calculating Discount Math", "If a toy costs KES 500 and has a 20% discount, you save KES 100 and pay KES 400. Practice this math!"),
                ("The Warranty Benefit", "Some expensive items come with a warranty. If it breaks, the shop repairs it for free, protecting your money."),
                ("Currency Exchange basic", "If you travel, you must exchange KES for foreign money. Exchange rates change daily based on global trade."),
                ("The True Cost", "The true cost of an item includes purchase price, maintenance, energy use, and the time spent buying it."),
                ("Avoiding Hype Prices", "When a new video game or shoe launches, the price is very high. Waiting six months can save you up to 50%!"),
                ("Financial Wisdom", "Price is what you pay. Value is what you get. Always focus on value rather than just the price tag.")
            ]
        }
    },
    {
        "id": "junior-6",
        "title": "Sharing & Giving (Charity)",
        "description": "Learn the joy of sharing your resources, helping neighbors in need, and using a giving jar to support local charities.",
        "topics": {
            "beginner": [
                ("What is Sharing?", "Sharing is letting others use your toys, books, or resources. It shows kindness and builds friendships."),
                ("Sharing Costs Nothing", "Lending a book or sharing a game doesn't make your money disappear. You get it back!"),
                ("The Good Feeling", "Helping others releases happy signals in your brain. Being generous actually makes you feel happier!"),
                ("Sharing Food", "Sharing half your lunch or fruit with a classmate who forgot their snack box is a kind action."),
                ("The Giving Jar", "A Giving Jar is a special savings jar where you collect coins specifically to buy gifts or help others."),
                ("Allocating to Giving", "When you get pocket money, allocate a small part (like KES 10) directly into your Giving Jar."),
                ("Donating Old Toys", "Gathering toys you no longer play with and donating them to a shelter is a great way to share."),
                ("Donating Clothes", "Giving clothes you have outgrown to a children's home keeps other children warm and happy."),
                ("Helping in Class", "Lending a pencil to a classmate who lost theirs is sharing your resources to help them study."),
                ("Acts of Kindness", "Kindness doesn't have to cost money. Wiping a chalkboard or holding a door are wonderful free gifts."),
                ("Sharing Time", "Spending time playing with a lonely child on the playground is sharing your time and friendship."),
                ("The Generous Heart", "Generosity means giving freely without expecting anything in return. It makes the world a warmer place."),
                ("Kind Words", "Encouraging a friend who is sad is a non-money gift that can make their whole day brighter."),
                ("Family Sharing", "Sharing your toys with siblings teaches patience and makes playing together at home peaceful."),
                ("Community Spirit", "A community is a group of people who help each other. Sharing builds a strong, safe community.")
            ],
            "intermediate": [
                ("What is a Charity?", "A charity (non-profit) is an organization that works to help people, animals, or nature, not to make profit."),
                ("Supporting Animal Shelters", "You can use your giving jar savings to buy pet food and donate it to shelters for homeless dogs and cats."),
                ("What is a Harambee?", "In Kenya, 'Harambee' means pulling together. It is when neighbors pool money to help someone pay a big bill."),
                ("The Charity Walk", "Participating in a school charity run raises money for clean water or school books for other children."),
                ("Disaster Relief", "When floods or dry weather affect families, charity collections help buy blankets and food for them."),
                ("Buying Gifts", "Use your giving jar to buy birthday gifts for family members to show them how much you care."),
                ("The Clean Park Gift", "Helping clean up plastic litter in a public park is a volunteer gift of time to protect nature."),
                ("Planting Tree Seedlings", "Using giving savings to buy tree seedlings and planting them creates shade and clean air for everyone."),
                ("Baking for a Cause", "Bake cookies with parents and sell them, donating all the profits to a local orphanage or hospital."),
                ("Helping the Elderly", "Visiting an elderly neighbor to help them rake leaves or carry water is a respectful, generous action."),
                ("School Book Donation", "Donating storybooks you have read to the school library allows dozens of other kids to read them too."),
                ("Give Jar Maintenance", "Count your Give jar savings every month. Decide with your parents which cause you want to support next."),
                ("Avoiding Waste to Give", "Skipping a sugary soda (want) allows you to add KES 50 to your Give jar to buy bird seeds for the garden."),
                ("The Power of Many", "When 10 kids save KES 50 each, they get KES 500 together! Small savings combine to make a big impact."),
                ("Teaching Others", "Sharing your financial knowledge with a friend is a gift that helps them save money too!")
            ],
            "pro": [
                ("What is Philanthropy?", "Philanthropy is the practice of donating money, time, or resources to solve community problems permanently."),
                ("Sustainable Giving", "True charity helps people learn skills (like farming or tailoring) so they can earn their own income later."),
                ("Crowdfunding Projects", "Crowdfunding uses the internet to collect small donations from hundreds of people to fund community goals."),
                ("Checking Charity Honesty", "Before donating cash, check with parents to make sure the charity is real and uses money honestly."),
                ("The Giving Ratio", "Smart philanthropists decide on a fixed giving ratio (e.g., always donate 10% of all lifetime earnings)."),
                ("Corporate Social Responsibility", "CSR is when businesses spend a part of their profits to build schools, plant trees, or clean local markets."),
                ("Non-Profit Organizations", "NGOs are organizations that run schools, clinics, and conservation projects without commercial goals."),
                ("The Endowment Fund", "A large pool of donated money that is invested. The interest earned is used to fund charity work forever!"),
                ("Advocacy and Awareness", "Using your voice to write school articles or make posters about saving water is a powerful way to give back."),
                ("Volunteering Leadership", "Organizing a book drive at your school shows leadership and coordinates community generosity."),
                ("The Giving Pledge", "A commitment by wealthy people to give away most of their wealth to philanthropic causes during their lives."),
                ("Tax Benefits of Charity", "In many countries, governments reduce the taxes of people and businesses that donate to registered charities."),
                ("The Impact Audit", "Look at how a charity spent its funds. A good charity spends most of its money on helping, not on ads or offices."),
                ("Measuring Success in Giving", "Success in charity is measured by the number of lives improved, trees grown, or hungry animals fed, not money spent."),
                ("The Generous Legacy", "Developing a giving habit at a young age ensures you remain a kind, empathetic, and helpful leader as an adult.")
            ]
        }
    },
    {
        "id": "junior-7",
        "title": "Avoiding Impulse Spending",
        "description": "Learn how to control impulse shopping cravings, practice the 24-hour waiting rule, and avoid spending regret.",
        "topics": {
            "beginner": [
                ("Impulse Spending", "Impulse spending is buying something the second you see it without thinking or planning beforehand."),
                ("The Candy Checkout Trap", "Supermarkets place colorful sweets right at the register so you demand parents buy them impulsively."),
                ("The Shiny Object Illusion", "A toy looks incredibly exciting in the store, but once home, you might get bored of it in ten minutes."),
                ("Empty Wallet Regret", "Spending all your coins on sweets today leaves you with KES 0 when a cool school trip comes up next week."),
                ("Peer Pressure Spending", "Buying a specific sticker pack just because your friends bought them is impulse spending. Save for what YOU love!"),
                ("Emotional Spending", "Buying things because you are sad, angry, or bored is a trap. Go for a run or draw a picture instead!"),
                ("Shopping with a List", "Always write a shopping list with your parent before entering a store. Stick to it and skip other items."),
                ("The Cravings Timer", "An impulse craving is like a wave. If you wait 15 minutes, the craving will usually fade away!"),
                ("Asking 'Do I need this?'", "Before placing an item in the cart, ask yourself: 'Is this a survival Need or a temporary Want?'"),
                ("The Toy Box Test", "Look at your toy box. How many toys did you buy impulsively and now never play with? Learn from them!"),
                ("Avoiding Kiosk Traps", "Duka displays are designed to attract your eyes. Walk past them quickly if you don't have a plan to buy food."),
                ("Resisting Flashy Signs", "Signs like 'HOT DEAL!' or 'BUY NOW!' try to rush your brain. Take a deep breath and ignore them."),
                ("The Money in Hand Feeling", "Holding cash makes you feel it leaving your hand. It is easier to control than tapping a card."),
                ("The Single Candy Rule", "Set a limit: you are allowed only one small treat per supermarket trip. This keeps your impulse in check."),
                ("Regretting a Purchase", "Purchase regret is the sad feeling you get after spending savings on something that wasn't worth it.")
            ],
            "intermediate": [
                ("The 24-Hour Wait Rule", "When you want to buy a want, wait exactly 24 hours. If you still want it tomorrow, it is a real goal!"),
                ("The Wishlist Notebook", "Keep a notebook of items you want. Write the date. If you still want it after two weeks, consider saving for it."),
                ("Cooling the Brain", "Waiting one day cools down the excited part of your brain, allowing you to make a calm, smart decision."),
                ("Calculating Chore Hours", "Before spending KES 200, ask: 'Is this toy worth 4 hours of washing dishes?' If not, put it back!"),
                ("The Broken Toy Trap", "Cheap plastic toys break easily. Buying three cheap toys is more expensive than buying one durable, high-quality toy."),
                ("Opportunity Cost of Candy", "Spending KES 100 on candy means giving up the KES 100 comic book. Candy is gone in minutes; books last years!"),
                ("Staying Out of Stores", "The easiest way to avoid impulse spending is to avoid walking through toy stores when you don't need anything."),
                ("The Supermarket Map", "Stick to the outer aisles of the supermarket (fruits, milk, bread) where the healthy needs are located."),
                ("Resisting Free Samples", "Free samples are designed to make you feel guilty so you buy the full product. Enjoy the sample and walk away!"),
                ("The Cash-Only Wallet", "Only carry the exact cash you need for your shopping list. Leaving extra money at home prevents impulse buys."),
                ("Comparing Before Buying", "Always check at least two shops before buying a toy. Rushing to buy at the first shop often costs more."),
                ("The Upgrade Trap", "Buying the new version of a toy when your current one works perfectly is an impulse upgrade. Keep your cash!"),
                ("Peer Pressure check", "Ask yourself: 'Am I buying this because I genuinely love it, or because I want to show off to classmates?'"),
                ("Smart Budgeting categories", "Use your Spend jar for wants. Once the Spend jar is empty, you cannot buy any wants until next month."),
                ("Celebrating Discipline", "Every time you walk out of a shop without buying an impulse craving, celebrate your savings success!")
            ],
            "pro": [
                ("Opportunity Cost logic", "Opportunity cost is the value of the next best alternative choice you give up when making a decision."),
                ("Marketing Psychology", "Stores use pleasant smells, soft music, and maze-like layouts to keep you inside longer so you spend more."),
                ("Durable vs Consumable", "Consumables (like soda) are gone instantly. Durables (like books or puzzles) provide value for months. Prioritize durables!"),
                ("The Cost of Maintenance", "Some impulse buys have hidden costs. A pet needs food; a toy car needs batteries. Factor these in before buying!"),
                ("Resisting Scarcity Marketing", "Phrases like 'Only 2 left!' or 'Sale ends today!' create false panic. Don't rush; take your time to decide."),
                ("The Return Policy", "Check if the store allows returns. If you make an impulse buy, returning it unopened is a great way to fix the mistake."),
                ("The Spending Audit", "Review your pocket money spending at the end of the year. You will be shocked by how much impulse buys cost in total!"),
                ("Delayed gratification benefit", "Waiting to buy allows you to save money, earn interest, and sometimes find the item on a better discount later."),
                ("The Contentment Shield", "Contentment is the best shield against advertising. If you are happy with your current toys, ads lose their power."),
                ("Peer Influence Analysis", "Understand that friends often show off their best purchases, not their money struggles. Ignore the show!"),
                ("The Smart Shopping checklist", "Before buying any item over KES 500, check: Is it a need? Have I waited 24h? Did I compare prices?"),
                ("Supermarket Aisle design", "Supermarkets put essentials (milk, eggs) at the very back of the store, forcing you to walk past thousands of temptations."),
                ("Sunk Cost Fallacy basic", "Just because you spent KES 100 to get into a game zone doesn't mean you should spend KES 500 more on bad games. Stop early!"),
                ("The Lifetime Saving Win", "Avoiding small KES 50 impulse buys daily saves KES 18,250 in a year. That is enough to buy a high-quality laptop!"),
                ("Mastering Self-Control", "Self-control is a key trait of successful people. Mastering it now prepares you for massive financial success.")
            ]
        }
    },
    {
        "id": "junior-8",
        "title": "Setting Your Savings Goals",
        "description": "Learn how to set a target goal, track your weekly savings in a chart, and celebrate when you reach your target.",
        "topics": {
            "beginner": [
                ("Savings Goal", "A savings goal is a specific target you want to save money for, like a new toy, book, or bicycle."),
                ("Why Set a Goal?", "Having a goal makes saving money exciting! It gives you a clear reason to say 'no' to candy cravings."),
                ("Picking Your First Goal", "Start with a small, easy goal (like KES 200 for crayons). Reaching a small goal builds your savings confidence!"),
                ("The Target Amount", "The target amount is the exact cost of your goal. Write this number clearly on a sticky note."),
                ("Drawing Your Goal", "Draw a picture of your goal (like a red bicycle) and tape it onto your savings jar. It keeps you motivated!"),
                ("Dating Your Goal", "Write down the date you want to reach your goal: e.g., 'I want to buy the soccer ball by next month.'"),
                ("Saving Consistently", "Try to add the same amount of coins to your goal jar every week, even if it is just KES 20."),
                ("Starting a Jar", "Get a clean glass jar or box. Label it with your goal's name so you don't mix it with daily spend money."),
                ("Goal Focus", "Only save for one or two goals at a time. Saving for ten goals means it will take too long to reach any of them!"),
                ("Pocket Money allocation", "When you get pocket money, put the goal savings in first, before you plan any other purchases."),
                ("The Target Date", "A target date creates a healthy sense of urgency, encouraging you to do extra chores to earn allowance."),
                ("Patience in Saving", "Patience is staying happy while waiting. Realize that saving for a bicycle takes weeks, and that is okay!"),
                ("Small vs Big Goals", "A small goal takes a week; a big goal takes months. Balance your saving jars accordingly."),
                ("Keeping it Private", "Keep your goal savings jar in a safe place at home where it won't get knocked over or broken."),
                ("The First Coin", "Placing the very first coin in your goal jar is a huge step. Every long savings journey starts with one coin!")
            ],
            "intermediate": [
                ("Tracking Your Savings", "Tracking is writing down every deposit you make, so you know exactly how close you are to the target."),
                ("The Savings Ladder Chart", "Draw a ladder chart on paper. Every time you save KES 100, color one step. Reaching the top means success!"),
                ("Parent Matching Bonus", "Ask parents if they will match your savings: e.g., if you save KES 500, they contribute KES 500 to help you."),
                ("Counting Weekly", "Count the coins in your goal jar once a week. Update your ladder chart with the new total balance."),
                ("Adjusting the Goal", "If the toy's price drops or goes on sale, update your target amount. You might reach your goal early!"),
                ("Doing Extra Chores for Goals", "When you want to reach a goal faster, ask parents for extra chores (like weeding) to earn more allowance."),
                ("Avoiding Goal Borrowing", "Never take money out of your goal jar to buy daily wants. Keep your goal savings locked!"),
                ("Celebrating the Halfway Mark", "When you reach 50% of your target, celebrate! You have proven that your savings system works."),
                ("The Value of Focus", "Write down why this goal is important to you. Read it when you feel tempted to buy cheap sweets."),
                ("Sharing Your Progress", "Tell parents or siblings about your progress. Sharing your goals helps keep you accountable and motivated."),
                ("Goal Maintenance Costs", "Think ahead: if your goal is a remote-control car, does it need expensive batteries? Save for those too!"),
                ("Shopping Around for Goals", "While saving, check different shops. You might find a shop selling your goal cheaper, reducing your target."),
                ("The Math of Weekly Savings", "If a soccer ball costs KES 800, saving KES 100 every week means you will buy it in exactly 8 weeks!"),
                ("Visualizing Achievement", "Close your eyes and imagine riding the bicycle or playing with the ball. Visualization boosts savings discipline."),
                ("Reviewing Your Timeline", "If you are saving too slowly, look at your budget. Can you cut some candy purchases to save faster?")
            ],
            "pro": [
                ("Reaching the Target", "The moment you deposit the final coin to reach your target is a massive financial milestone. Celebrate your discipline!"),
                ("Visiting the Toy Shop", "Take your saved cash to the shop. Handing over your hard-earned money to the cashier feels incredibly satisfying."),
                ("The Savings Habit for Life", "Reaching a goal proves you have self-control. This habit will help you buy cars, houses, and businesses later."),
                ("Setting the Next Goal", "Once your jar is empty, start a new goal. Continuous goal-setting is how successful people build wealth."),
                ("Opportunity Cost of Goals", "Understand that choosing to save for a bicycle means giving up the chance to buy a video game. Weigh choices carefully!"),
                ("Goal Prioritization", "Sort your goals by importance. Save for your education or a bicycle before saving for a luxury watch."),
                ("The Inflation adjustments", "If saving for a multi-year goal, add a small buffer (like 5%) to your target to handle price increases."),
                ("Investing While Saving", "For long-term goals (like college), keep savings in a bank account that pays interest to beat inflation."),
                ("Sharing the Celebration", "Share your new toy or soccer ball with friends. Generosity makes reaching your goals even more rewarding."),
                ("The Pride of Ownership", "You care for items you bought with your own saved money much better than items received as random gifts."),
                ("Setting Group Goals", "Save together with siblings to buy a shared board game. It teaches teamwork and cooperative budgeting."),
                ("Goal Flexibility", "If your interests change, it is okay to switch goals! Move your saved coins to the new goal jar."),
                ("Avoiding Goal Regret", "Make sure you genuinely want the goal item. Saving for months only to get bored in a day is disappointing."),
                ("The Ultimate Goal: Independence", "The greatest goal of saving is learning to support yourself so you don't have to borrow from others."),
                ("Financial Literacy Certificate", "Completing your savings goal is the best practical certificate of your growing financial intelligence!")
            ]
        }
    },
    {
        "id": "junior-9",
        "title": "Digital Money for Kids",
        "description": "Understand how parents pay with cards and phones, where digital cash goes, and how ATMs work.",
        "topics": {
            "beginner": [
                ("Digital Money", "Digital money is real money stored as numbers inside secure bank computers instead of paper bills."),
                ("Paying with a Card", "When parents tap a plastic card on a machine, the bank moves money digitally from their account to the shop."),
                ("The Tap Machine", "The machine at the cash register is a card reader. It reads the card's chip to process the payment."),
                ("Numbers on Screens", "When you look at a bank app on a phone, the numbers you see show your real purchasing power."),
                ("Paying with a Phone", "Parents can pay using phone apps. The phone sends a secure wireless message to pay the store cashier."),
                ("The Digital Vault", "Instead of a metal safe, banks use super-secure, encrypted computers to store digital account numbers."),
                ("Where Cash Comes From", "Physical paper money is printed by the government. Digital money is created when banks record deposits."),
                ("Online Deliveries", "When parents order food or books online, they pay with digital money before the delivery rider arrives."),
                ("The Invisible Spend Trap", "Because you don't feel digital money leaving your hand, it is easy to spend too much. Track balance closely!"),
                ("Direct Transfers", "If a parent wants to send money to an aunt, they can type her phone number and send digital shillings instantly."),
                ("What is a Password?", "A password is a secret combination of letters and numbers that protects your digital bank account. Keep it secret!"),
                ("Online Gaming Cash", "Game coins in video games are virtual. They are not real money because you cannot buy real food with them."),
                ("Security Codes", "Digital transactions often need a one-time security code sent to your parent's phone to verify the purchase."),
                ("Checking Digital Balance", "Opening a banking app shows you a statement of every purchase made, helping you trace your cash flow."),
                ("The Digital Shilling", "Digital shillings have the exact same value as physical paper shillings. You can exchange one for the other anytime.")
            ],
            "intermediate": [
                ("The ATM Machine", "An ATM is a street machine that converts your digital bank numbers into physical paper notes when needed."),
                ("ATM Card chips", "The tiny gold square on your debit card is a microchip. It stores secure codes that identify your bank account."),
                ("Entering the PIN at ATMs", "To get cash from an ATM, you must insert your card and enter your secret 4-digit PIN password."),
                ("The Cash Dispenser slot", "Inside the ATM, smart rubber wheels count paper bills and dispense them through a secure front slot."),
                ("ATM Deposit slots", "Some modern ATMs allow you to slide paper bills into a slot to deposit them directly into your digital account."),
                ("ATM Security Cameras", "ATMs have built-in cameras to monitor transactions and ensure customers are safe from card thieves."),
                ("What is a Mobile Wallet?", "A mobile wallet (like M-PESA) is an app that stores money on your SIM card, allowing phone-to-phone payments."),
                ("Paying Utility Bills digitally", "Parents pay water or electricity bills by entering a billing code on their phone wallet app. It saves travel time!"),
                ("Digital Receipts", "When you pay digitally, you receive an email or SMS receipt showing the exact store, date, and cost of the buy."),
                ("Avoiding Scam SMS", "Scammers send fake texts claiming you won money or asking for PIN. Always verify and delete these messages."),
                ("The Transaction Log", "A list inside your mobile wallet showing every payment. It is a perfect tool for automatic budgeting."),
                ("Digital Pocket Money", "Some parents send pocket money directly to their children's junior debit cards or mobile wallets."),
                ("Internet Data costs", "Using mobile banking apps requires internet data. Remember to factor this cost into your digital budget!"),
                ("Protecting Your Phone", "Set a fingerprint lock or passcode on your phone to prevent others from accessing your mobile wallet."),
                ("The E-commerce Basket", "Online shopping stores let you add items to a digital basket before checking out using secure card payments.")
            ],
            "pro": [
                ("Mobile Money Economics", "In Kenya, mobile money (M-PESA) is used by millions to pay dukas, school fees, and send money to relatives."),
                ("Phishing Scams warning", "Phishing is when scammers pretend to be bank employees to steal your PIN. Banks will never ask for your PIN!"),
                ("Digital Currency Exchange", "Global transactions convert currencies automatically: e.g., paying KES to buy a toy priced in US Dollars online."),
                ("The Cost of Convenience", "Using cards or phone apps can attract small transaction fees. Compare these fees to choose the cheapest service."),
                ("Electronic Ledgers", "Banks synchronize databases globally. If you withdraw KES 100 in Mombasa, your balance updates in Nairobi instantly."),
                ("The Risk of Fraud", "Fraud is when someone steals your digital card info to make unauthorized purchases. Report lost cards immediately!"),
                ("Contactless Payment safety", "Tapping cards is safe because the card uses a short-range signal that only works when held very close to the reader."),
                ("Biometric Security", "Using fingerprints or face scans to unlock banking apps is safer than passwords, as they cannot be guessed."),
                ("Digital Savings Lockers", "Some banking apps have lock features that prevent you from withdrawing your savings for a set number of months."),
                ("The Cashless Society", "Some shops do not accept physical cash at all, requiring card or mobile money payments. This is cashless trading!"),
                ("Digital Crowdfunding Harambee", "Setting up an online fundraiser allows family members across the world to contribute money to a medical or education cause."),
                ("Blockchain basic", "A blockchain is a digital ledger shared by many computers that secures transactions without needing a central bank."),
                ("The Digital Footprint", "Every digital transaction leaves a permanent record. Be a responsible shopper, as your purchase history is visible!"),
                ("Mobile App Updates", "Keep your banking apps updated. Updates fix bugs and add security features to protect your savings from hackers."),
                ("Embracing the Digital Future", "Understanding digital money prepares you to navigate a world where physical cash is becoming rare and digital cash is king.")
            ]
        }
    },
    {
        "id": "junior-10",
        "title": "The Value of Diligence",
        "description": "Understand how extra chores build hard work habits, the rewards of doing a job well, and basic entrepreneurship.",
        "topics": {
            "beginner": [
                ("What is Chores?", "Chores are small, regular tasks around the house that keep our home clean, safe, and pleasant for everyone."),
                ("The Clean Bedroom", "Keeping your bedroom clean is a basic responsibility. It shows respect for your space and family home."),
                ("Watering the Garden", "Watering plants keeps them alive and growing. It is a wonderful chore that kids of any age can assist with."),
                ("Wiping the Tables", "Wiping tables after meals prevents ants and bugs. It is a simple task that requires diligence."),
                ("Helping with Dishes", "Washing plates and cups after meals is a primary way to help parents save time and energy."),
                ("Doing a Job Diligently", "Diligence is doing a job carefully and completely. Halfway jobs (like sweeping dirt under the rug) do not count!"),
                ("Earning Chore Rewards", "Parents can reward extra chores (like cleaning the bicycle or car) with small pocket money coins."),
                ("The Chore Chart Tracker", "Use a calendar to check off completed tasks. It is satisfying to see your hard work visually recorded!"),
                ("The Lemonade Stand idea", "A lemonade stand is a classic beginner business. It teaches you how to buy ingredients, sell, and make profit."),
                ("Startup Capital", "Capital is the money you spend to buy raw materials (lemons, sugar, cups) before you can start selling juice."),
                ("Pricing Your Juice", "Set a price that covers your ingredient costs and leaves you with extra profit: e.g., selling a cup for KES 30."),
                ("Making a Stand Sign", "Draw a bright, colorful sign listing your product and price: e.g., 'ICE COLD JUICE KES 30!' to attract customers."),
                ("Serving with a Smile", "Customer service means being polite and friendly. A smile keeps customers happy and brings them back!"),
                ("Calculating Profit simple", "If your ingredients cost KES 200 and you sell juice for KES 300, your business profit is exactly KES 100!"),
                ("Clean Up After Business", "Diligence in business means cleaning up your stand, throwing away peelings, and leaving the neighborhood tidy.")
            ],
            "intermediate": [
                ("Diligence at School", "Completing your homework before playing is diligence. It is an investment in your brain and future career!"),
                ("Lemonade Stand Operations", "To run a successful stand, buy fresh lemons, prepare clean drinking water, and keep cups organized."),
                ("Handling Customer Complaints", "If a customer says the juice is too sour, offer to add a little sugar. Good service builds business trust."),
                ("Reinvesting Profits", "Reinvesting is using your profits to buy more lemons to run a larger stand tomorrow. This grows your business!"),
                ("The Risk of Bad Weather", "If it rains, nobody will buy cold lemonade. Entrepreneurs must plan for unexpected risks and weather changes."),
                ("Writing a Daily Ledger", "Record sales: 'Sold 10 cups, made KES 300.' Tracking cash flow ensures you don't spend capital by mistake."),
                ("The Value of Focus", "Focusing on one business (juice) is better than trying to sell juice, toys, and drawings all at the same time."),
                ("Partnership with Siblings", "Partner with siblings to run a stand. Divide tasks: one makes juice, the other sells, and you split the profit fairly."),
                ("The Cost of Ingredients", "Lemons, sugar, cups, and ice are your expenses. Keep your expenses low to maximize your profit margin."),
                ("Startup Cash Loans", "If you don't have capital, ask parents for a small loan. Pay them back immediately from your first juice sales!"),
                ("The Practice Muscle", "Mastery takes practice. No one bakes a perfect cake or builds a perfect business on the first attempt. Keep trying!"),
                ("Honesty in Weight & Measure", "Always fill cups to the top. Honest businesses build long-term reputations and loyal customers."),
                ("Avoiding Wasteful Business", "If you spill juice, you lose money. Work carefully and slowly to avoid waste and accidents."),
                ("The Business Location", "Set up your stand in a safe place with foot traffic, like outside your compound gate with a parent's supervision."),
                ("Saving Your Profit", "Put your lemonade profits straight into your Savings jar to save for a big goal, like a new skateboard.")
            ],
            "pro": [
                ("Entrepreneurship", "An entrepreneur is a leader who spots a community problem and builds a business to solve it."),
                ("The Margin calculation", "Margin is profit percentage. If you sell a cup for KES 30 and ingredients cost KES 15, your profit margin is 50%!"),
                ("Scaling a Business", "Scaling is expanding your business: e.g., setting up two juice stands in different corners of the neighborhood."),
                ("Market Research basic", "Ask neighbors: 'What flavor do you prefer: lemon or strawberry?' Selling what customers want ensures high sales!"),
                ("The Loan repayment rule", "Always pay back your business loans first before spending any profits on personal wants. It builds credibility."),
                ("Business Differentiation", "Differentiating is making your stand unique: e.g., offering free cookies with every cup of juice to beat competitors."),
                ("Building Diligent Habits", "Diligence means staying focused on a task even when it gets boring or tiring. It is the key to lifetime success."),
                ("Opportunity Cost of Labor", "Spending your Saturday running a stand means giving up playtime. Weigh the profit reward against the play time lost!"),
                ("The Supply Chain", "Buying lemons directly from a farmer is cheaper than buying them from a supermarket. Optimize your supply source!"),
                ("Marketing and Branding", "Name your business: e.g., 'Kevo's Sunshine Juice'. A memorable brand helps customers remember and recommend you."),
                ("The Environmental footprint", "Use biodegradable paper cups instead of plastic to keep your business eco-friendly and protect the earth."),
                ("Managing Cash Registers", "Keep your business cash in a secure box. Count it before and after sales to ensure no coins went missing."),
                ("The Sunk Cost Trap", "If lemons go bad, do not try to sell bad juice. Throw them away, learn from the mistake, and start fresh."),
                ("Diligence Pays Dividends", "Hard work brings long-term rewards: good grades, saved money, business success, and a proud family."),
                ("The Lemonade Stand Graduation", "Running a successful lemonade stand teaches you the core pillars of business: capital, pricing, customer care, and profit!")
            ]
        }
    }
]

# We will generate the Teen Modules programmatically to guarantee 60 cards per module (20 beginner, 20 intermediate, 20 pro).
# Since writing 600 full cards of text would blow the token limit, we'll write a Python script that uses a structured database of
# 20 unique subtopic tuples (Title, Content) for each of the 3 levels in the 10 modules, then compile them dynamically!
teen_module_definitions = [
    {
        "id": "teen-1",
        "title": "Budgeting & Financial Survival",
        "description": "Master easy budgeting, tracking your cash, and building wealth step-by-step without getting stuck in money traps.",
        "concepts": {
            "beginner": [
                ("Smart Budgeting (Not Your Parents' Budget)", "Forget boring spreadsheets! Modern budgeting is like a financial GPS on your phone that tracks your spending in real time, helping you keep every single shilling on track for your dream goals."),
                ("Why Strict Rules Break", "You might hear about the 50/30/20 rule (50% needs, 30% wants, 20% savings). But strict rules fail because real life happens! If prices spike or your phone breaks, a good budget needs to bend so it doesn't break."),
                ("Your Smart Money Guard", "Imagine a smart buddy that looks at your spending habits and tells you: 'Hey, you spent a bit too much on milkshakes this week, let's lock KES 200 into savings so you don't run out!' That's what a dynamic budget does."),
                ("Must-Haves: The Survival Checklist", "Needs are the absolute non-negotiables you must pay to survive. We are talking about basic food, rent, utility bills, school textbooks, and medicine. If you can't live without it, it's a Need!"),
                ("Wants: The Fun Stuff", "Wants are the things that make life awesome but aren't required for survival. Think video games, new sneakers, movie tickets, and fancy snacks. You want them, but you will survive perfectly fine without them!"),
                ("Savings: Your Financial Shield", "Savings are your money shield! Putting aside just KES 100 or KES 500 a week protects you when things go wrong—like your phone charger dying—so you don't have to borrow and get trapped in debt."),
                ("Cash Flow: The Money Scale", "Cash flow is simple: Money coming in (allowance, cash gifts, side hustles) minus money going out (spending). If you have more coming in than going out, you have positive cash flow and you're growing your money power!"),
                ("The 24-Hour Cool Down", "Spotted a cool jacket or game online? Wait 24 hours before hitting buy. This 'cool-down' period stops your brain's impulse system from making you spend money you'll regret losing tomorrow."),
                ("The Snack Trap", "Buying a KES 150 soda or sweet every day seems tiny. But do the math: that's over KES 54,000 in a year! That little daily snack is literally costing you a brand new laptop or a cool smartphone."),
                ("The Money Timer (Budget Cycle)", "A budget cycle is just the timer for your money—usually a week or a month. You decide how to divide your money at the start, track it, and then check how you did when the timer runs out."),
                ("Predictable vs Surprise Costs", "Fixed costs are predictable and stay the same, like school bus fees or rent. Variable costs change, like buying snacks or data bundles. If you need to save quickly, cut the variable costs first!"),
                ("Before vs After (Gross vs Net)", "Gross income is the big number you're promised (like KES 10,000 for a freelance gig). Net income is the real cash that actually lands in your wallet after taxes or platform fees. Always plan using your Net income!"),
                ("Pay Yourself First!", "When you get cash, don't spend it first and save what's left. Save first! Move 20% straight to your savings jar the second you get paid, then spend what's left. Your future self will thank you."),
                ("Outsmarting Shopping Traps", "Shopping apps are designed to make you buy things instantly with bright buttons and 'only 1 left!' warnings. Delete your saved payment details so you have to think twice before checkout."),
                ("Giving Every Shilling a Job", "Zero-based budgeting doesn't mean having zero money. It means giving every single shilling a job (like KES 500 for books, KES 200 for savings, KES 100 for snacks) until every coin is assigned."),
                ("The Spending Detective", "Be a detective with your own cash. Print out your M-PESA statement or look at your transaction history. Group your purchases to see exactly where your cash is slipping away."),
                ("Don't Put All Eggs in One Basket", "Relying on just one source of cash (like a weekly allowance) is risky. Try to build multiple small streams, like doing chores, freelance design, or selling crafts to diversify your income."),
                ("Setting Goals That Actually Work", "Don't just say 'I want to be rich.' Make it SMART: Specific, Measurable, Achievable, Realistic, and Time-limited. E.g., 'I will save KES 5,000 for a gaming keyboard by December by saving KES 250 a week.'"),
                ("The Trade-Off (Opportunity Cost)", "Every time you spend money on one thing, you're choosing not to spend it on something else. Buying a KES 2,000 pizza means you can't buy that KES 2,000 concert ticket. That's the opportunity cost!"),
                ("Consistency Beats Excitement", "Being good with money isn't about one day of massive saving; it's about daily small habits. Saving KES 50 consistently every day beats saving KES 1,000 once and then forgetting about it.")
            ],
            "intermediate": [
                ("Making Your Money Work", "Investing is putting your saved money into things that grow or earn profit on their own. Instead of your cash just sitting there, it's out working to bring more coins back to your pocket."),
                ("Inflation: The Money-Eating Monster", "Inflation is when prices of things go up over time. If a bag of chips costs KES 100 today but KES 110 next year, your money lost value. Stashing cash under your mattress actually makes it shrink in buying power!"),
                ("Compound Interest: The Snowball Effect", "Compound interest is when you earn interest on your savings, and then you earn interest on that interest! It is like a tiny snowball rolling down a hill, getting bigger and bigger automatically."),
                ("The Double-Your-Money Shortcut", "Want to know how fast your money will double? Use the Rule of 72! Just divide 72 by the interest rate you're earning. E.g., if you get 12% interest, your cash will double in 6 years (72 divided by 12)."),
                ("Supercharged Savings Accounts", "A regular bank account pays almost no interest. A high-yield savings account is supercharged—it pays much higher interest while keeping your cash safe and reachable when you need it."),
                ("Money Market Funds (MMFs) Explained", "An MMF is like a big money pool where thousands of savers join together. The fund manager invests this massive pool in safe stuff (like government bonds) and pays you high daily interest (around 9-11% a year)!"),
                ("Saccos: Power in Numbers", "A Sacco is a community group where members save money together. After saving for a while, you can borrow up to three times what you saved to start a business or buy something big at low interest rates."),
                ("The Guarantor Warning", "In a Sacco, members must 'guarantee' each other's loans. WARNING: If you sign as a guarantor for a friend and they stop paying, the Sacco will take YOUR savings to cover their debt! Be extremely careful."),
                ("Owning vs Lending", "Buying a stock means owning a tiny slice of a company (like Safaricom). Buying a bond means lending your money to the government. Stocks have higher risk and reward; bonds are steady and safe."),
                ("The Stock Market (NSE)", "The Nairobi Securities Exchange (NSE) is like a giant supermarket, but instead of buying groceries, people buy and sell shares of big companies. Anyone can start buying with a small budget!"),
                ("Buy Low, Sell High", "Capital gains is just the profit you make when you sell something for more than you bought it. If you buy a stock at KES 10 and sell it later for KES 15, that KES 5 profit is your capital gain!"),
                ("Dividends: Cash Thank-Yous", "When big companies make profits, they often share some of that cash directly with their shareholders. These payments are called dividends—it's like getting paid just for owning a piece of the company!"),
                ("The Steady Investor Strategy", "Instead of trying to guess when prices are low, invest a fixed amount (like KES 500) every single month. Some months you get fewer shares, some months more, but over time it averages out safely."),
                ("The Speed-to-Cash Scale", "Liquidity is how fast you can turn an investment back into spendable cash. M-PESA cash is super liquid (takes seconds). A house is not liquid (takes months or years to sell)."),
                ("The Risk vs Reward Scale", "There is no free lunch in finance. If an investment promises huge returns, it comes with huge risks of losing your money. Safe investments are steady but grow slowly."),
                ("Your Stock Market Vault", "To buy stocks in Kenya, you need a CDSC account. Think of it as a secure digital vault that keeps track of all the company shares you own. Opening one is free and easy!"),
                ("Checking Sacco Health", "Before joining a Sacco, check their track record. Look at how much interest they paid to savers over the last few years. You want a steady, honest Sacco that pays at least 10% interest annually."),
                ("Pocket-Sized Investing", "You don't need millions to invest. Modern mobile apps let you buy tiny fractions of shares for as little as KES 100. It's investing made simple and accessible for everyone."),
                ("Your True Profit", "If your savings account pays 10% interest, but prices at the shops rose by 8% this year (inflation), your money only grew by 2% in terms of what it can actually buy. That's your Real Return!"),
                ("Avoiding the Debt Loop", "Borrowing cash for wants (like a fancy meal or fashion) traps you in a cycle where all your future earnings go to paying back lenders. Save up and buy with cash instead!")
            ],
            "pro": [
                ("Robo-Advisors: Auto-Piloted Portfolios", "Robo-advisors are smart computer programs that manage your investments for you. They automatically split your money between stocks and bonds, adjusting things to keep your risk low without you doing any hard math."),
                ("How Often Interest Compounds", "Interest can compound daily, monthly, or yearly. The more often it compounds, the faster your money grows! Earning interest every month builds up cash quicker than earning it just once a year."),
                ("The Cost of Borrowing (WACC)", "WACC is just the average interest rate a business pays to borrow money or get investors. If a business spends too much on interest, it will fail. Keep the cost of your money low!"),
                ("The Central Bank Rate (CBR)", "The Central Bank sets the baseline interest rate for the country. If they raise this rate, banks charge more for loans, which makes people spend less and can cool down stock market prices."),
                ("Tax-Free Money Growth", "Governments want people to save, so they create special accounts where you don't pay taxes on the interest you earn. Investing through these accounts lets your money compound much faster!"),
                ("KRA's Cut on Your Earnings", "When you earn dividends from Kenyan stocks, the Kenya Revenue Authority (KRA) automatically takes a 5% cut as tax before the cash hits your account. Always remember to factor this tax in!"),
                ("Checking a Company's Health", "Before buying stocks, look at the company's balance sheet. Check if they have more assets (stuff they own) than liabilities (debts they owe). A healthy company should have plenty of cash and low debt!"),
                ("Treasury Bills (T-Bills)", "T-Bills are short-term loans you make to the Kenyan government (for 3, 6, or 12 months). They are super safe because the government always pays back, and they pay good interest!"),
                ("Treasury Bonds (T-Bonds)", "T-Bonds are long-term loans you make to the government (usually for 5 to 30 years). They pay you interest every six months, making them great for securing future college funds."),
                ("National Debt & Your Wallet", "If the government borrows too much money, it can weaken the Kenyan Shilling. A weaker shilling means imported things like phones, fuel, and clothes become much more expensive for you."),
                ("Taxes on Selling Property (CGT)", "If you buy land or private shares and sell them later for a profit, KRA charges a 15% tax on that profit. This is called Capital Gains Tax, and you need to plan for it when selling."),
                ("Buying the Whole Market", "Instead of trying to guess which single stock will do well, buy an index fund. It lets you own a tiny slice of all major companies at once, giving you steady growth with less stress."),
                ("Tuning Up Your Portfolio", "If your target was to keep half your money in stocks and half in bonds, and stocks do really well, you might end up with too much risk. Rebalancing means selling some stocks to buy bonds to keep things balanced."),
                ("Auto-Saving Excess Cash", "Set up your bank or wallet to automatically sweep any extra money you don't spend at the end of the day into your Money Market Fund. It starts earning interest instantly without you lifting a finger!"),
                ("Avoiding the Sunk Cost Trap", "Don't keep throwing good money after bad. If you bought something that is clearly failing, don't hold onto it just because you already spent money. Cut your losses and put your money somewhere better."),
                ("Protecting Your Sacco Savings", "If you have to guarantee a Sacco loan for a friend, only do it for someone you trust 100%. Never guarantee a loan that is larger than a tiny fraction of your savings so you don't get ruined if they default."),
                ("Your Financial Freedom Number", "Your financial freedom number is 25 times what you spend in a year. Once you have saved and invested this amount, you can live entirely off the interest and dividends it generates—work becomes optional!"),
                ("Watching Out for Hidden Fees", "Investment funds charge fees to manage your money. Even a tiny 2% fee can eat up half of your profits over 20 years! Always look for funds with low fees (under 1%) to keep more of your money."),
                ("Funding the Next Big Idea", "Venture capital is lending money to brand-new, high-risk startup businesses in exchange for a piece of ownership. Most startups fail, but if you back the next Safaricom or Google, the profit is huge!"),
                ("Passing Down Wealth Safely", "Setting up a trust is a legal way to lock away family assets so they are protected from lawsuits and can be passed down to children safely, keeping the family's wealth strong for generations.")
            ]
        },
        "extra_lessons": [
            {
                "id": "teen-1-l4",
                "title": "Using the MALI Wallet & Jars",
                "level": "wallet",
                "cards": [
                    {
                        "title": "The Main Wallet Center",
                        "content": "Think of the Main Wallet as your money command center. It shows the total cash you have in hand right now. Every time you get pocket money, it goes here, and when you save or invest, you move it out of here."
                    },
                    {
                        "title": "Adding Cash Deposits",
                        "content": "Tap the plus (+) button to log cash infusions, pocket money, or chore earnings. Recording deposits updates your main balance instantly so you always know how much you have."
                    },
                    {
                        "title": "Budget Cycle Prompts",
                        "content": "When you add or take away cash, the MALI app asks if you want to start a brand new savings cycle or just adjust your current cash. This makes it easy to track your weekly or monthly money goals.",
                        "type": "insight"
                    },
                    {
                        "title": "Starting a New Cycle",
                        "content": "Choosing 'Start New Cycle' is like hitting the reset button. It clears your jars so you can start allocating your new cash fresh, using your budgeting rules to stay on track.",
                        "type": "concept"
                    },
                    {
                        "title": "Cycle Choice",
                        "content": "Just want to log a quick cash gift without changing your current savings goals? Select 'Adjust Balance Only' to update your wallet without resetting your jars.",
                        "type": "exercise",
                        "options": ["Start New Cycle", "Adjust Balance Only", "Cancel Deposit"],
                        "correctAnswer": "Adjust Balance Only"
                    },
                    {
                        "title": "Allocating to Wealth Jars",
                        "content": "Divide your money into your wealth jars: Spend, Save, Give, and Invest. This takes cash out of your main wallet and locks it away, so you don't accidentally spend it on impulse shopping!"
                    },
                    {
                        "title": "Dynamic Scaling Rules",
                        "content": "The MALI app is smart: when you change the amount in one jar, it automatically adjusts the percentages of the other jars so your savings plans stay perfectly in balance.",
                        "type": "insight"
                    },
                    {
                        "title": "Reversing Jar Allocations",
                        "content": "Need cash in your main wallet? You can easily move money back from any of your jars. The cash goes straight back into your wallet balance instantly.",
                        "type": "concept"
                    },
                    {
                        "title": "Auto Transaction Logs",
                        "content": "No more forgetting where your money went! Every single deposit, save, or spend is automatically recorded in your transaction history, so you can track your journey.",
                        "type": "warning"
                    },
                    {
                        "title": "Target Goal Tracking",
                        "content": "Watch the progress bars on your jars grow towards 100%! Hitting your savings target feels amazing and proves you've got what it takes to be a master saver.",
                        "type": "exercise",
                        "options": ["Wait for parents to pay", "Track and save regularly", "Borrow from mobile apps"],
                        "correctAnswer": "Track and save regularly"
                    }
                ]
            }
        ]
    },
    {
        "id": "teen-2",
        "title": "M-PESA & Mobile Money Go",
        "description": "Master the economics of mobile money, M-PESA Go under-18 accounts, Till numbers, Pochi la Biashara, and avoiding debt loops.",
        "concepts": {
            "beginner": [
                ("Mobile Money Basics", "Mobile money allows you to store, send, and receive cash on your mobile phone without physical bank cards."),
                ("M-PESA Go Accounts", "M-PESA Go is a Safaricom account for teenagers aged 10-18. It requires parental co-signing and has spend limits."),
                ("SIM Card Wallets", "Your phone wallet stores your cash balance securely on your SIM card registry. It works on keypad phones too."),
                ("Sending Money (Send Money)", "Sending money moves digital cash from your phone wallet to another user's phone instantly via their number."),
                ("Withdraw Cash (Agent)", "You can withdraw physical cash by visiting a local mobile money agent, typing their agent number, and confirming."),
                ("The Transaction Fee", "Sending or withdrawing mobile money attracts small processing fees. Always check the fee calculator!"),
                ("What is a Till Number?", "A Till Number (Buy Goods) is a 6-digit code used by shops and merchants to receive payments from customers for free."),
                ("Pochi la Biashara", "Pochi la Biashara is a phone wallet account for small business owners that separates business cash from personal cash."),
                ("Paybill Numbers", "A Paybill is a 5-to-6-digit business number used to pay official utility bills or subscription services digitally."),
                ("The M-PESA PIN", "Your PIN is your secret 4-digit password needed to approve any transaction. Never share it with anyone, not even agents!"),
                ("Hakikisha feature", "Hakikisha is a popup security step showing the recipient's name before money is sent, allowing you to cancel."),
                ("Checking Balance", "You can check your mobile wallet balance anytime using the SIM toolkit menu or the mobile app for free."),
                ("Mini Statements", "A mini statement shows your last 5 transactions via SMS, helping you track recent spending quickly."),
                ("Losing Your Phone", "If you lose your phone, call customer care immediately to block your SIM card and lock your wallet cash safely."),
                ("The SIM Lock", "Set a SIM card PIN lock in your phone settings to prevent thieves from placing your SIM in another phone."),
                ("Airtime Purchases", "You can buy airtime (call minutes and data) directly from your mobile wallet with zero transaction fees."),
                ("Reversing Transactions", "If you send money to the wrong number, SMS the transaction code to 456 immediately to request a reversal."),
                ("Mobile Money Agents", "Agents are local shopkeepers who manage cash-in (deposits) and cash-out (withdrawals) for mobile money."),
                ("Depositing Cash is Free", "Mobile money agents do not charge any fee when you give them physical cash to deposit into your phone wallet."),
                ("Embracing Mobile cash", "Mobile money is the backbone of the Kenyan economy, allowing cashless trade from urban markets to rural villages.")
            ],
            "intermediate": [
                ("Hold Overdraft Loop", "Fuliza is an overdraft service that lends you cash instantly when balance is low. Daily interest fees add up fast!"),
                ("M-Shwari Loans", "M-Shwari is a mobile bank account where you can save money to earn interest or borrow short-term loans with a 9% fee."),
                ("KCB M-PESA", "A mobile bank account allowing you to borrow micro-loans or save money in target savings lockers with interest."),
                ("Avoiding Debt Loops", "Borrowing from one mobile loan app to pay another creates a debt loop that destroys your savings and CRB score."),
                ("Pochi la Biashara benefits", "Pochi la Biashara allows small traders to receive money directly without transaction fees, making it cheap for startups."),
                ("Paybill Account Field", "When using a Paybill, you must enter an account number (like admission ID) so the business knows who paid."),
                ("The Cost of Micro-transactions", "Sending KES 50 multiple times is expensive due to fixed transaction fees. Combine payments to save on fees!"),
                ("Mobile Money Ledgers", "Print a monthly PDF statement from the mobile money app to audit your expenses and trace where money went."),
                ("SMS Phishing (Vishing)", "Scammers send fake texts claiming you won money or asking for PIN. Always verify and delete these messages."),
                ("SIM Swap Scams", "A scam where hackers register your phone number on a new SIM card to drain your wallet. Keep personal data safe!"),
                ("Using Till vs Paybill", "Always prefer paying via Till (Buy Goods) because it is free for the consumer. Paybills can charge fees to the sender."),
                ("Mobile Savings Lockers", "Use M-Shwari Lock Savings to lock a specific sum for 3 months. It earns interest and prevents impulse spending."),
                ("The Fuliza Fee Structure", "Fuliza charges a one-time access fee plus a daily maintenance fee based on your overdraft. It is very expensive!"),
                ("Mobile Wallet limits", "Under-18 accounts have lower daily transaction limits (e.g., KES 150,000 maximum) to ensure safety and control."),
                ("M-PESA App security", "The mobile app uses biometric fingerprint scans or face ID to secure transactions, which is safer than numeric PINs."),
                ("Internet Banking links", "You can link your mobile wallet to your bank account to move cash. Be aware that transfer fees apply!"),
                ("Utility paybill templates", "Save your regular paybill numbers (electricity, water) as templates in your app to avoid typing errors."),
                ("The Transaction Code", "Every transaction generates a unique code (e.g., QRT45H67). Keep this code as proof of payment for merchants."),
                ("Reversing wrong payments", "Safaricom reversals can take time. The safest way is to double-check the recipient's name using Hakikisha!"),
                ("Mobile money for side hustles", "Mobile money makes running a side hustle easy. You can receive client payments on Till numbers instantly.")
            ],
            "pro": [
                ("Mobile Money Interoperability", "Interoperability allows you to send money across different networks (e.g., M-PESA to Airtel Money) with low fees."),
                ("Mobile Loan App regulations", "The Central Bank regulates digital lenders, capping interest rates and banning predatory debt collection methods."),
                ("The Credit Score impact", "Failing to pay back M-Shwari or Fuliza loans on time leads to negative listings on Credit Reference Bureaus (CRB)."),
                ("Economics of Agency Banking", "Mobile money agents earn commissions on transactions. Understanding commissions helps analyze franchise models."),
                ("Pesalink services", "Pesalink is a bank-to-bank instant transfer system that competes with mobile wallets for large cash transactions."),
                ("Till Number merchant charges", "Merchants pay a small fee (usually 0.5%) on all Till transactions. Business owners must budget for this!"),
                ("Daily Wallet limits", "The maximum amount of money you can hold in your mobile wallet is KES 300,000. Sweep excess funds to bank daily."),
                ("API Integrations for Startups", "Safaricom provides Daraja APIs. Teen developers can integrate M-PESA payments directly into website or app projects!"),
                ("Micro-insurance via mobile", "Mobile wallets allow users to buy cheap, daily micro-insurance policies for health or crops using mobile airtime."),
                ("Forex transfers via mobile", "You can receive international money transfers (Western Union, PayPal) directly into your mobile wallet instantly."),
                ("The Cost of Debt: APR", "A 9% monthly loan fee seems small but represents a massive 108% Annual Percentage Rate (APR). Avoid loans!"),
                ("Digital Currency updates", "Many central banks are researching Central Bank Digital Currencies (CBDCs) to create fee-free digital cash systems."),
                ("Merchant Pochi la Biashara taxes", "The KRA can monitor business mobile wallets to calculate tax obligations for small-scale merchants and traders."),
                ("Phishing Prevention systems", "Never forward activation SMS codes to anyone. Safeguard your line security like your physical wallet key!"),
                ("Sunk Cost of Daily Interest", "Paying KES 10 daily on a Fuliza loan is KES 3,650 a year. That is a sunk cost that eats your investment capital."),
                ("Unbanked populations", "Mobile money has brought millions of 'unbanked' people into the formal economy, boosting trade."),
                ("Evaluating Digital Wallet platforms", "Compare M-PESA, Airtel Money, and T-Kash based on transaction speed, merchant acceptance, and fee structures."),
                ("Mobile money as a macroeconomic tool", "The CBK monitors mobile money velocity (how fast cash moves) to make decisions on national interest rates."),
                ("Protecting Client Data privacy", "Businesses using Till numbers must comply with data protection laws. Never sell or spam customer phone numbers!"),
                ("The Cashless Future", "Mastering mobile money tools ensures you are ready to build, manage, and scale businesses in a digital global economy.")
            ]
        }
    },
    {
        "id": "teen-3",
        "title": "Banks, Savings & College Funds",
        "description": "Understand how banking works, compound interest, opening teen bank accounts in Kenya, and saving for college or university.",
        "concepts": {
            "beginner": [
                ("What is a Bank?", "A bank is a licensed financial institution that accepts deposits from savers and makes loans to borrowers."),
                ("Saving at a Bank", "Keeping your savings in a bank protects your cash from theft and earns you interest rewards over time."),
                ("The Checking Account", "An account designed for daily spending. It includes a debit card and checks, but pays little to no interest."),
                ("The Savings Account", "An account designed to hold your savings. It pays interest monthly and limits your daily cash withdrawals."),
                ("Opening a Teen Account", "Teens under 18 can open co-signed savings accounts (like Equity Hapo Hapo) with a parent's ID."),
                ("The Co-signer", "A co-signer is a parent or guardian who shares legal responsibility for your teen bank account and monitors transactions."),
                ("What is Interest?", "Interest is the cost of borrowing money. Savers earn interest from the bank, while borrowers pay interest to the bank."),
                ("The Bank Vault safety", "Banks keep cash in physical steel vaults, but most money exists digitally, protected by computer security."),
                ("The Bank Statement", "A monthly report showing your starting balance, deposits, withdrawals, interest earned, fees paid, and ending balance."),
                ("What is a Deposit?", "A deposit is putting cash into your bank account. You can deposit at the counter, at an ATM, or via mobile transfer."),
                ("What is a Withdrawal?", "A withdrawal is taking cash out of your bank account. You can withdraw using your debit card at an ATM."),
                ("Debit Card tap safety", "Keep your card in your wallet. Only tap it on readers when you have confirmed the final purchase price."),
                ("Minimum Balance Limits", "Many teen bank accounts have KES 0 or KES 200 minimum opening balance limits, making them easy to start."),
                ("The Ledger balance", "The total amount of money in your account. The available balance might be lower if transactions are pending."),
                ("Avoiding Monthly Fees", "Look for teen accounts with KES 0 monthly maintenance fees to ensure your savings don't get eaten by fees."),
                ("The Role of CBK", "Banks are safe because they are regulated by the Central Bank of Kenya (CBK), ensuring savers' rights are protected."),
                ("Writing Down Goals", "Write down your savings goal (e.g., KES 10,000 for college laptop) and check balance monthly to trace progress."),
                ("Depositing Cheques", "A cheque is a paper promise to pay. You deposit it at the bank, and it clears in 1-3 days."),
                ("Using ATMs safely", "Stand close to the screen and cover the keypad with your hand when typing your secret PIN at the ATM."),
                ("Your Financial Base", "Opening a bank account is a major step toward financial adulthood. It is your base for saving and investing.")
            ],
            "intermediate": [
                ("Compound Interest Math", "Compound interest is interest paid on both the original deposit and the accumulated interest from previous periods."),
                ("Compound Formula simple", "A = P(1 + r)^t. P is principal, r is annual interest rate, and t is time in years. Watch your money grow!"),
                ("Money Market Funds (MMFs)", "MMFs are low-risk investment pools that invest in government bonds, paying higher interest rates (9-11%) than normal banks."),
                ("Saving for College", "Start saving for university early. Combining teen bank savings with an MMF helps beat the rising cost of tuition."),
                ("Kenyan Youth Accounts", "Accounts like Equity Hapo Hapo allow teenagers to save, get micro-interest, and sync with parent wallets."),
                ("What is an overdraft?", "An overdraft is when you spend more than your account balance. The bank covers it but charges penalty fees."),
                ("Fixed Deposit Accounts", "Accounts where you lock a specific sum of money for a set period (e.g. 6 months) to earn a higher fixed interest rate."),
                ("Bank Transaction Fees", "Banks charge fees for withdrawing at ATMs or transfering to other banks. Choose accounts with low transaction fees!"),
                ("The Real Interest Rate", "The real interest rate is the nominal interest rate minus the inflation rate. If inflation is higher than interest, you lose power!"),
                ("High-Yield Savings Accounts", "Special accounts paying higher interest than normal savings. They often require a higher minimum balance, like KES 10,000."),
                ("Evaluating Interest Rates", "Compare banks: a bank paying 5% interest is better than a bank paying 1% interest. Check the annual rate (per annum)."),
                ("Opening a CDSC Account", "A Central Depository and Settlement Corporation account, needed before you can buy shares on the stock market."),
                ("Avoiding Card Phishing", "Never give your card number or CVV code (3 digits on the back) to anyone on phone calls or unknown websites."),
                ("Automatic Savings transfers", "Configure your mobile bank app to transfer KES 500 to your college fund MMF automatically every month on allowance day."),
                ("The Ledger Audit", "Cross-reference your bank statements with your purchase receipts monthly to spot unauthorized card charges."),
                ("The Inflation Trap", "If you keep all savings in cash under your mattress, inflation eats their value. Banks or MMFs help protect your money."),
                ("Evaluating Bank Services", "Choose a bank based on ATM locations, app user-friendliness, customer support ratings, and fee structures."),
                ("The Role of Co-signers", "A co-signer can withdraw or deposit money into your account. Always communicate and align on budget goals with parents!"),
                ("The Liquidity concept", "Liquidity is how quickly you can convert an asset into cash. Bank accounts are highly liquid; real estate is low liquid."),
                ("The Savings Habit rewards", "Consistency is key. Saving KES 500 monthly at 10% interest in an MMF grows to KES 380,000 in 15 years!")
            ],
            "pro": [
                ("Compound Interest: P(1+r/n)^(nt)", "The math of compounding frequency. n is compounding periods per year. Monthly compounding grows faster than annual compounding!"),
                ("Evaluating MMFs in Kenya", "Compare CIC, Sanlam, and ICEA Lion MMFs based on yield, withdrawal speeds, management fees, and historical performance."),
                ("Time Value of Money", "A Shilling today is worth more than a Shilling tomorrow because of its earning capacity (interest). Save early!"),
                ("Education Inflation", "University tuition costs rise faster than general inflation. College funds must be invested in high-yielding assets to keep up."),
                ("Government Treasury Bills", "T-Bills are short-term government debt options (91, 182, 364 days) that are super safe and pay high interest to investors."),
                ("Capital Preservation", "Protecting your core savings from losses. In MMFs and government bonds, your principal capital is extremely secure."),
                ("Assessing Bank Health", "Check the Tier classification of banks. Tier 1 banks are massive and secure; Tier 3 banks have higher risk."),
                ("Taxation on Bank Interest", "In Kenya, bank interest is subject to a 15% withholding tax. The bank automatically deducts this before paying you."),
                ("The Spread in Banking", "The difference between the rate the bank pays savers (e.g. 3%) and the rate it charges borrowers (e.g. 13%) is their profit spread."),
                ("The Risk-Return Tradeoff", "Higher potential returns come with higher risks. Safe savings accounts have low returns; stocks have high risk."),
                ("The Deposit Insurance", "KDIC protects depositors in Kenya. If a bank collapses, KDIC pays depositors up to KES 500,000 of their savings."),
                ("Opportunity Cost of Savings", "Keeping KES 100,000 in a checking account at 0% interest means giving up KES 10,000 in an MMF at 10% interest. That is KES 10,000 lost!"),
                ("Automated Investment Sweeps", "An advanced bank setting that automatically transfers any balance above your checking needs into an interest-bearing MMF daily."),
                ("Evaluating Annuity Plans", "Annuities are insurance savings contracts where you save monthly, and the insurer pays a monthly income during university."),
                ("Opening a Custodial Account", "A custodial account is managed by a parent for a child's benefit, transitioning to the child's full ownership when they turn 18 or 21."),
                ("Analyzing Bank Balance Sheets", "Review bank annual reports. Check assets (loans made), liabilities (deposits held), and non-performing loan ratios."),
                ("Building a Diversified Fund", "Create a college fund split: 50% in MMFs (high liquidity), 30% in Treasury Bonds (high yield), and 20% in NSE index shares."),
                ("The Monetary Policy Committee", "The CBK committee that adjusts the Central Bank Rate (CBR). A CBR hike causes banks to raise savings interest rates."),
                ("Managing a Sinking Fund", "A sinking fund is savings built up gradually for a specific future expense (like university laptop). It prevents debt!"),
                ("Your Financial Blueprint", "A master personal document outlining your lifetime saving goals, emergency thresholds, asset allocations, and wealth targets.")
            ]
        }
    },
    {
        "id": "teen-4",
        "title": "Taxes, KRA & Entrepreneurship",
        "description": "Learn about KRA PINs, PAYE, VAT, business structures, and the legal constraints of starting a business as a teenager.",
        "concepts": {
            "beginner": [
                ("What are Taxes?", "Taxes are compulsory payments made by individuals and businesses to the government to pay for public services like roads and schools."),
                ("The KRA PIN", "The Kenya Revenue Authority (KRA) Personal Identification Number (PIN) is a unique code used to track tax payments and transactions."),
                ("VAT basics", "Value Added Tax (VAT) is a consumption tax added to the price of goods. In Kenya, the standard VAT rate is 16% on goods."),
                ("Who Pays VAT?", "VAT is paid by the consumer. When you buy a soda, the price includes the 16% VAT, which the shop sends to the KRA."),
                ("PAYE Tax", "Pay As You Earn (PAYE) is income tax deducted directly from employees' monthly salaries by their employers before they get paid."),
                ("The eTIMS System", "eTIMS is KRA's electronic tax invoicing system. It requires businesses to report all sales invoices digitally to prevent tax evasion."),
                ("What is Tax Evasion?", "Tax evasion is the illegal practice of not paying your taxes. It carries heavy fines and jail sentences!"),
                ("What is Tax Avoidance?", "Tax avoidance is using legal methods (like charity donations or retirement savings) to reduce the amount of tax you owe."),
                ("Starting a Business", "A teenager can start a business (like baking, designing, or tutoring) to solve community problems and earn profits."),
                ("Sole Proprietorship", "A simple business structure where one person owns and runs the business. The owner keeps all profits and bears all losses."),
                ("Partnership business", "A business owned by two or more people who share capital, management, profits, and liabilities based on an agreement."),
                ("The Business License", "A permit issued by the county government allowing you to operate your business legally in the local area."),
                ("Startup Capital", "Capital is the money, equipment, and resources you need to start your business, like buying an oven to start a bakery."),
                ("Revenue vs Profit", "Revenue is the total money received from sales. Profit is the money left over after subtracting all business expenses."),
                ("The Customer Value", "A business succeeds when it provides value to customers. Focus on quality products and solving problems!"),
                ("Tax Brackets", "Income tax is progressive. The more money you earn, the higher tax bracket percentage you fall into."),
                ("Filing Tax Returns", "An annual filing where you declare your income and tax paid to KRA. In Kenya, this must be filed by June 30th every year."),
                ("Minor Business Contracts", "Under Kenyan law, minors under 18 cannot sign binding business contracts without a parent's signature."),
                ("Lemonade Stand Scale", "A classic beginner business. Scale it by offering unique flavors, delivery, and branding it to stand out from competitors."),
                ("Your Entrepreneurial spirit", "Entrepreneurship is a mindset of taking risks, being creative, and working hard to build a successful enterprise.")
            ],
            "intermediate": [
                ("Getting a KRA PIN", "Teens under 18 can get a KRA PIN with their parent's support. It is needed to open bank accounts or register businesses."),
                ("eTIMS for Small Traders", "Small traders must register on eTIMS using the KRA portal to issue valid tax receipts to corporate clients."),
                ("PAYE Slips Analysis", "Analyze a salary pay slip. You will see gross pay, deductions (PAYE, housing levy, health fund), and net pay."),
                ("VAT Exempt Goods", "Basic food items (like milk, bread, flour) are exempt from VAT (0%) to ensure they remain affordable for everyone."),
                ("The Business Permit cost", "County governments charge annual unified business permit fees depending on your business size and location."),
                ("Limited Liability Company (LLC)", "A business structure where owners are not personally liable for the company's debts, protecting personal assets."),
                ("Calculating Profit Margins", "Net Profit Margin = (Net Profit / Total Revenue) * 100. A margin of 20% or more is considered excellent in business!"),
                ("The eTIMS Penalty Risk", "Failing to issue eTIMS invoices can attract massive KRA penalties up to KES 100,000 or double the tax evaded."),
                ("Minor Legal Constraints", "Minors cannot directly register companies in Kenya. A parent must act as a trustee or shareholder on their behalf."),
                ("Writing a Simple Business Plan", "Write down your product description, target market, pricing, advertising plan, and cash flow projections before launching."),
                ("Calculating VAT Math", "If an item costs KES 1,000 plus 16% VAT, the consumer pays KES 1,160. The business keeps KES 1,000 and sends KES 160 to KRA."),
                ("Reinvesting in the Business", "Reinvesting is using profits to buy better equipment (e.g. buying a mixer for a bakery) to produce faster and earn more."),
                ("The Corporate Income Tax", "Registered companies pay a flat corporate tax rate (usually 30% in Kenya) on their net annual business profits."),
                ("Avoiding Startup Debt", "Avoid borrowing expensive loans to start a business. Use personal savings or family interest-free loans to reduce risk."),
                ("Market Research basics", "Interview potential customers: 'What products do you buy? What price is fair?' Make products that customers want!"),
                ("Sole Proprietorship Liabilities", "Sole proprietors have unlimited liability. If the business owes money, the owner's personal house or car can be sold to pay it."),
                ("The KRA iTax Portal", "The official website where Kenyans file returns, register PINs, and pay taxes. It is a vital digital tool for finance."),
                ("Intellectual Property basics", "Protect your business names, logos, or inventions by registering trademarks with KIPI in Kenya to prevent copying."),
                ("Evaluating Competitors", "Analyze rival businesses: check their prices, service quality, and packaging. Offer better value to win customers!"),
                ("The Value of Integrity", "Always pay taxes honestly and treat customers fairly. Honest businesses build lasting, valuable reputations.")
            ],
            "pro": [
                ("Progressive Income Tax Rates", "Kenya's PAYE rates range from 10% to 30% or 35% on high incomes. Understand how marginal tax rates work!"),
                ("Incorporating an LLC in Kenya", "The legal steps: register on the BRS portal, submit articles of association, pay fees, and obtain a certificate of incorporation."),
                ("eTIMS API Integration", "Corporate software can integrate directly with KRA's eTIMS API to automate tax invoice reporting at the point of sale."),
                ("VAT Input vs Output Tax", "Businesses claim VAT refunds. If you pay VAT on raw materials (Input), you subtract it from the VAT you collect on sales (Output)."),
                ("Filing Nil Returns for Teens", "If you have a KRA PIN but earn no income, you must file a 'Nil Return' by June 30th annually to avoid KES 2,000 late penalties!"),
                ("The Corporate Tax Shield", "Using business expenses (like advertising, utility bills) legally to reduce net profit, thereby lowering corporate tax obligations."),
                ("Evaluating LLC Partnerships", "Draft a shareholder agreement defining equity split, vesting schedules, voting rights, and buyout terms before launching with partners."),
                ("Asset Depreciation math", "Depreciation is the drop in value of business assets (like computers or vans) over time. Subtract depreciation to find true net profit."),
                ("Tax Withholding (WHT)", "Withholding tax is deducted at the source on services (e.g. 5% on consulting). Clients pay KRA directly and give you a certificate."),
                ("The Double Taxation issue", "LLC profits are taxed at corporate level (30%), and the remaining dividends are taxed again (withholding tax) when paid to owners."),
                ("eTIMS Compliance Auditing", "Ensure your suppliers are eTIMS compliant. If you buy from non-compliant suppliers, you cannot deduct those costs from tax calculations!"),
                ("Business Exit Strategies", "An entrepreneur's exit: selling the business to a larger corporation, passing it to family, or launching an IPO on the stock exchange."),
                ("Registering for VAT in Kenya", "Businesses with an annual turnover of KES 5 Million or more must register for VAT and collect the 16% tax on all sales."),
                ("The Capital Gains Tax (CGT)", "CGT is tax on the profit made from selling an asset (like land or shares). In Kenya, CGT is charged at 15% on net transfer gain."),
                ("Calculating Break-Even Point", "Break-Even Point = Fixed Costs / (Selling Price per unit - Variable Cost per unit). It shows how many units you must sell to cover costs."),
                ("The Kenyan Employment Act", "Legal rules on wages, working hours, leave days, and termination procedures. Essential knowledge before hiring staff!"),
                ("Tax Haven and Offshoring", "Understanding how global corporations shift profits to low-tax countries, and the international laws designed to stop it."),
                ("Analyzing ROI of Capital Assets", "Before buying an expensive machine, calculate if its extra production will generate enough profit to cover its cost within 2 years."),
                ("Drafting NDAs and IP Agreements", "Protect your startup's secrets by having co-founders and employees sign Non-Disclosure and IP Assignment agreements."),
                ("The Ethical Entrepreneur", "True business leaders pay taxes honestly, care for the environment, pay fair wages, and build sustainable communities.")
            ]
        }
    },
    {
        "id": "teen-5",
        "title": "NSE, Stocks & Saccos",
        "description": "Master stock investing on the Nairobi Securities Exchange, CDSC accounts, Sacco savings, and low-interest multiplier loans.",
        "concepts": {
            "beginner": [
                ("What is a Share?", "A share represents a tiny piece of ownership in a company. If you buy Safaricom shares, you own a piece of the company!"),
                ("The NSE Market", "The Nairobi Securities Exchange (NSE) is the marketplace in Kenya where shares of public companies are bought and sold."),
                ("What is a Dividend?", "A dividend is a share of company profits paid out to shareholders as a cash reward, usually once or twice a year."),
                ("Capital Gains Growth", "Capital gains is profit earned when you sell a share for a higher price than you bought it."),
                ("What is a Sacco?", "A Savings and Credit Cooperative Organization (Sacco) is a member-owned group where members save and borrow together."),
                ("Sacco Dividends yield", "Saccos pay high annual dividends on your deposits, often 8-15%, which beats standard bank savings accounts."),
                ("Multiplier Sacco Loans", "Saccos allow members to borrow loans up to 3 or 4 times their saved deposits at a low interest rate."),
                ("The CDSC Account", "A Central Depository and Settlement Corporation (CDSC) account is a digital registry needed to hold shares on the NSE."),
                ("The Stockbroker function", "A stockbroker is a licensed professional or company that executes buy and sell orders for investors on the exchange."),
                ("What is a CDSC Number?", "Your unique identification number in the CDSC registry. Safeguard it like your bank account login credentials!"),
                ("The Risk of Stocks", "Stock prices go up and down daily. If the company performs poorly, the stock price drops, and you can lose money."),
                ("Sacco Deposit Savings", "Money saved in a Sacco cannot be withdrawn easily unless you leave. It is excellent for locking away savings."),
                ("Guarantorship basics", "Sacco loans require other members to sign and pledge their savings as security to guarantee your loan payment."),
                ("Understanding Blue-Chip Stocks", "Blue-chips are shares of large, stable, and profitable companies with a history of steady dividend payouts."),
                ("NSE Trading Hours", "The stock market is open from Monday to Friday, 9:00 AM to 3:00 PM. It is closed on weekends."),
                ("The Sacco AGM", "Saccos pay dividends once a year, after their annual general meeting (AGM) approves the financial reports."),
                ("Opening a Sacco Account", "Register with a national ID and pay an entrance fee. Teens can join young saver Sacco plans co-signed by parents."),
                ("The NSE Index", "An index tracks the average price performance of top companies, showing if the stock market is growing or shrinking."),
                ("Buying Your First Stock", "A licensed broker app allows you to buy a minimum of 100 shares. It is the lowest volume limit for trading on the NSE."),
                ("Building Wealth slowly", "Investing in stocks and Saccos is a marathon, not a sprint. Consistently compounding dividends builds real wealth.")
            ],
            "intermediate": [
                ("Opening a CDSC Account", "Open a CDSC account online or via a broker app by uploading your ID, photo, and bank details. It takes 1-2 days to activate."),
                ("Sacco Multiplier calculation", "If you save KES 10,000 in a Sacco, a 3x multiplier means you can borrow up to KES 30,000 for business capital or school fees."),
                ("Guarantor Liabilities Risk", "If a member you guaranteed defaults their Sacco loan, the Sacco will seize YOUR savings to pay the debt!"),
                ("Dividends vs Capital Growth", "Dividend investors buy stable stocks for regular payouts. Growth investors buy young companies for stock price increases."),
                ("Evaluating Sacco Dividend Rates", "Compare Saccos based on interest on deposits, dividend on shares, and loan approval speeds."),
                ("The NSE Board Lot limit", "The minimum number of shares you can buy on the main NSE board is 100. Always factor this lot limit into your budget!"),
                ("Evaluating Stock PE Ratio", "The Price-to-Earnings (P/E) ratio shows if a stock is cheap or expensive. P/E = Stock Price / Earnings Per Share."),
                ("CDSC Transaction statements", "CDSC sends monthly SMS alerts when shares are bought or sold, protecting investors from unauthorized transfers."),
                ("Sacco Share Capital", "Share Capital is your non-refundable stake. It earns dividends but cannot be withdrawn; you must sell it to leave."),
                ("Dollar-Cost Averaging (DCA)", "DCA is investing a fixed sum in a stock every month, regardless of price, buying more shares when prices are low."),
                ("The Stock Dividend yield", "Dividend Yield = (Annual Dividend Per Share / Stock Price) * 100. A yield of 8% or more is considered very attractive!"),
                ("Asset Allocation basics", "Divide your investment portfolio: e.g. 40% in Sacco savings, 30% in blue-chip shares, and 30% in MMFs."),
                ("The Sacco Loan reducing balance", "Most Saccos charge interest on a reducing balance basis, which is cheaper than flat-rate bank loans."),
                ("Identifying Stock Trends", "Stock prices respond to earnings reports, product launches, management changes, and macroeconomic shifts. Read financial news!"),
                ("Avoiding Stock Scams", "Never buy 'hot tip' shares off social media. Only trade shares of companies listed on the NSE through licensed brokers."),
                ("The CDSC Registry check", "Confirm that your broker is licensed by the Capital Markets Authority (CMA) before sending any investment funds to them."),
                ("Evaluating Sacco Management", "Review Sacco audit reports. Ensure their non-performing loan ratio is low and they comply with SASRA regulations."),
                ("The NSE Order Types", "Limit orders buy stocks only at your target price. Market orders buy stocks instantly at the current selling price."),
                ("Understanding Stock Splits", "A split is when a company divides its shares to make them cheaper for small investors, without changing the total value."),
                ("The Sacco Empowerment", "Saccos are the greatest tools of financial empowerment in Kenya, helping millions build houses and pay school fees.")
            ],
            "pro": [
                ("CDSC T+3 Settlement Process", "Settlement on the NSE happens on a T+3 basis: when you sell shares, the cash is cleared and sent in 3 business days."),
                ("SASRA Regulations and Sacco Audits", "The Sacco Societies Regulatory Authority monitors Saccos. Check SASRA reports for capital adequacy ratios."),
                ("Reducing Balance Interest Math", "Monthly Interest = Outstanding Principal * (Annual Rate / 12). Principal reduces with each installment!"),
                ("Guarantorship Recovery procedures", "If default occurs, Saccos issue notice. If unpaid, they deduct the outstanding sum from the guarantors' deposits."),
                ("Analyzing Stock Balance Sheets", "Review company balance sheets: check current ratio, debt-to-equity ratio, and cash flow statement health."),
                ("Sacco Share Capital vs Deposits", "Deposits are refundable upon 60-day withdrawal notice. Share Capital is permanent ownership capital and cannot be withdrawn."),
                ("Fundamental Stock Analysis", "Evaluating a company's intrinsic value by analyzing economic indicators, industry conditions, and financial statements."),
                ("Technical Analysis indicators", "Using stock price charts, moving averages, and trading volume trends to predict short-term stock price movements on the NSE."),
                ("Capital Markets Authority (CMA)", "CMA is the government regulator that monitors the NSE, brokers, and investment funds to protect public investors."),
                ("Sacco Dividend Payout policies", "Saccos must retain a part of their surplus as statutory reserves. Ensure they have reserves to sustain payouts."),
                ("The CDSC Pledge feature", "You can pledge your NSE shares as collateral to secure a bank loan. The CDSC locks the shares until paid off."),
                ("Corporate Actions on the NSE", "Understanding mergers, acquisitions, rights issues, and bonus share allocations, and how they impact stock valuations."),
                ("Sacco Capital Adequacy rules", "Core capital must be at least 10% of total assets, and deposit-taking Saccos must keep a 15% liquid assets buffer."),
                ("Taxation on NSE Dividends", "In Kenya, dividend withholding tax is 5% for residents and 15% for non-residents. Factor this into yield calculations!"),
                ("Calculating Portfolio Return", "Portfolio Return = Sum of (Weight of Asset * Return of Asset). Rebalance your portfolio annually."),
                ("The Margin Trading risks", "Margin trading is borrowing money from a broker to buy more shares. It multiplies gains but also multiplies losses."),
                ("Evaluating Loan Restructuring", "If a borrower struggles, Saccos can extend the loan duration to reduce monthly payments, preventing default."),
                ("Stock Valuation models", "Using the Dividend Discount Model (DDM) or Discounted Cash Flow (DCF) to calculate the fair value of NSE stocks."),
                ("Guarantor Shield Strategy", "Only guarantee members who are reliable, have stable incomes, and whose loan size does not exceed their savings deposit."),
                ("Mastering the Investment Engine", "Combining the high-yield loans of Saccos with dividend-paying stock assets is the ultimate wealth building blueprint.")
            ]
        }
    },
    {
        "id": "teen-6",
        "title": "Debt & Credit: Master or Servant?",
        "description": "Understand how interest works, differences between good and bad debt, Credit Reference Bureaus (CRB), and credit scores.",
        "concepts": {
            "beginner": [
                ("What is Debt?", "Debt is money you borrow from a person, bank, or mobile app that you must pay back in the future, usually with interest."),
                ("Good Debt vs Bad Debt", "Good debt is borrowing to buy assets that grow or generate income. Bad debt is borrowing to buy wants."),
                ("What is Interest?", "Interest is the extra fee charged by lenders for borrowing their money. It is written as a percentage rate."),
                ("The Credit Score", "A credit score is a number representing how reliable you are at paying back debts. High scores make borrowing cheap."),
                ("What is the CRB?", "In Kenya, the Credit Reference Bureau (CRB) collects data on borrowing history. Defaulting leads to blacklisting."),
                ("The APR concept", "Annual Percentage Rate (APR) is the total yearly cost of a loan, including interest and fees. Always check the APR!"),
                ("What is a Loan?", "A loan is a sum of money borrowed for a set period that is paid back in monthly installments (principal plus interest)."),
                ("The Principal amount", "The principal is the original amount of money you borrowed, before any interest fees were added to the loan."),
                ("Borrowing from Friends", "Borrowing cash from friends is interest-free, but failing to pay on time destroys trust and friendships!"),
                ("Mobile Loan Apps", "Apps offer quick cash on phones, but charge massive interest fees. They are easy to access but highly risky."),
                ("The Collateral concept", "Collateral is an asset (like a car or land) that you pledge as security. If you default, the lender takes the asset."),
                ("What is Default?", "Defaulting is failing to pay back a loan according to the agreed schedule. It ruins your credit score."),
                ("Co-signer liability", "If a parent co-signs a loan, they are legally required to pay the entire debt if you fail. Don't let them down!"),
                ("High Interest Danger", "A loan with 10% monthly interest represents a massive 120% annual interest rate. It will eat all your future savings!"),
                ("CRB Clearance Certificate", "A document proving you have a clean debt record. Employers in Kenya often request it before hiring you."),
                ("Credit Card basics", "Credit cards allow you to borrow money for daily purchases. You get 30 days interest-free, then interest starts."),
                ("Payday Loans warning", "Short-term loans with extremely high interest rates designed to last until payday. They trap users in debt loops."),
                ("Borrowing for Education", "Taking a student loan (like HELB) is good debt because education increases your future earning power."),
                ("The Debt Trap", "When your monthly debt payments exceed your income, forcing you to borrow more to survive. It is an emergency!"),
                ("Mastering Debt control", "Debt is a tool. In the hands of a master, it builds businesses. In the hands of a servant, it leads to poverty.")
            ],
            "intermediate": [
                ("Calculating Interest Math", "Simple Interest = Principal * Rate * Time. Compounded interest is interest on interest. Calculate total repayment!"),
                ("CRB Listing Consequences", "Being blacklisted on CRB blocks you from getting bank loans, mobile money overdrafts, and jobs in finance."),
                ("The APR Trap calculation", "A mobile loan charging 5% interest for 1 week has a massive APR of 260%! Never check only the weekly rate."),
                ("Understanding Credit Scores", "Credit scores range from 300 (poor) to 850 (excellent). Pay bills and loans on time to build a high score."),
                ("Good Debt: Real Estate", "Borrowing to buy a house (mortgage) is good debt because the property value usually increases over time."),
                ("Bad Debt: Depreciation assets", "Borrowing to buy a new car or television is bad debt because the assets lose value the moment you take them home."),
                ("The Debt snowball method", "A debt payoff strategy: pay off your smallest debts first to build momentum, while making minimum payments on others."),
                ("The Debt avalanche method", "A debt payoff strategy: pay off debts with the highest interest rates first, saving you the most money in interest."),
                ("HELB Student Loans in Kenya", "Higher Education Loans Board offers low-interest university loans. Repayment starts one year after graduation."),
                ("The Danger of Credit Cards", "Credit cards charge 20-30% interest per year. If you only pay the minimum balance, it will take years to clear!"),
                ("Avoiding Digital Debt loops", "Delete mobile loan apps from your phone. If you need cash, cut expenses or sell items instead of borrowing digitally."),
                ("Evaluating Loan terms", "Compare loan offers based on APR, processing fees, monthly installment size, prepayment penalties, and collateral."),
                ("The Risk of Sacco Guarantorship", "Never guarantee a Sacco loan unless you have checked the borrower's income and are willing to pay if they fail."),
                ("Understanding Debt Consolidation", "Combining multiple high-interest loans into a single, lower-interest loan to simplify payments and reduce cost."),
                ("Bankruptcy basics", "A legal process where you declare you cannot pay your debts. It wipes out debts but destroys your credit score."),
                ("Debt Collectors warning", "Agencies hired by lenders to recover unpaid cash. They can call, visit, and seize collateral. Avoid this stress!"),
                ("The 30% Credit Utilization rule", "Keep your credit card balance below 30% of your total limit. High utilization hurts your credit score!"),
                ("The Reducing Balance loan benefit", "Paying loans on a reducing balance means interest charges drop as you pay off the principal, saving cash over time."),
                ("Evaluating Business Debt ROI", "If borrowing at 12% interest allows your business to earn a 30% return, the debt is profitable. Calculate this!"),
                ("The Freedom of Debt-Free life", "Living debt-free means your entire monthly income is yours to save, invest, and spend. It is true financial peace.")
            ],
            "pro": [
                ("CRB Registry data access", "Under the Data Protection Act, you have the right to request a free credit report from CRB agencies once a year."),
                ("Debt Service Coverage Ratio (DSCR)", "DSCR = Net Operating Income / Total Debt Service. Lenders require a DSCR of 1.25 or more before funding businesses."),
                ("Amortization schedules calculation", "Calculating monthly payments: M = P [ i(1+i)^n ] / [ (1+i)^n - 1 ]. It details principal vs interest split."),
                ("The Cost of Capital: WACC", "Weighted Average Cost of Capital. Businesses balance equity cost and debt cost to optimize funding."),
                ("Evaluating Credit Card balance transfers", "Moving debt to a 0% introductory APR card to pay down principal fast, avoiding high transfer fees and rate hikes."),
                ("The HELB Default penalties", "HELB charges interest plus KES 5,000 annual penalties for default, which can double your student loan size if unpaid."),
                ("Assessing Credit Bureau models", "Credit bureaus use payment history (35%), credit utilization (30%), history length (15%), credit mix (10%), and new credit (10%)."),
                ("Corporate Bond Issuance", "Large corporations borrow directly from the public by issuing bonds on the NSE, paying annual coupon interest payments."),
                ("Leveraged Buyouts (LBO)", "An acquisition of a company using a significant amount of borrowed money to meet the cost of acquisition."),
                ("Floating Interest rates risk", "Floating rates change with the CBR. If the Central Bank raises rates, your mortgage payments will jump!"),
                ("Evaluating Debt-to-Equity ratios", "Debt-to-Equity = Total Liabilities / Shareholders' Equity. A ratio over 2.0 indicates high financial risk."),
                ("The Sovereign Debt crisis", "When governments borrow heavily in foreign currencies (e.g. Eurobonds) and struggle to pay, causing currency devaluation."),
                ("Tax Shields of Debt interest", "Interest paid on business loans is a tax-deductible expense, reducing taxable income. This makes debt cheaper than equity!"),
                ("The Mechanics of Asset Seizure", "How banks auction collateral to recover default loans. Auction prices are often low, leaving you with residual debt!"),
                ("Assessing P2P lending platforms", "Investing in P2P lending. You act as the lender, earning high interest returns but facing high default risks."),
                ("The Yield Curve inversion", "When short-term government bonds pay higher interest than long-term bonds, indicating an upcoming economic recession."),
                ("Evaluating Debt Covenants", "Legal restrictions placed on borrowers by lenders to protect the loan capital, such as maintaining liquidity levels."),
                ("The Credit score repair process", "To clear a CRB listing: pay off the outstanding debt, obtain a default clearance letter, and submit it to the bureau."),
                ("Corporate Insolvency procedures", "Understanding receivership, liquidation, and restructuring, and how they protect assets and creditors."),
                ("The Ultimate Debt Philosophy", "Debt is like fire: useful in a controlled furnace, but destructive if let loose. Command your debt!")
            ]
        }
    },
    {
        "id": "teen-7",
        "title": "Digital Economy & Side Hustles",
        "description": "Learn how to start online businesses, e-commerce stores, managing shipping costs, and payment gateways safely.",
        "concepts": {
            "beginner": [
                ("What is a Side Hustle?", "A side hustle is a flexible business you run alongside your main job or school to earn extra income."),
                ("The Digital Economy", "The marketplace of goods and services traded online over the internet, connecting buyers and sellers globally."),
                ("What is E-commerce?", "E-commerce is buying and selling physical products or digital goods on websites and mobile apps."),
                ("Social Media Shops", "Using Instagram, TikTok, or WhatsApp Business to display products, chat with customers, and receive payments."),
                ("Dropshipping basics", "An e-commerce model where you sell products online, and a third-party supplier ships them directly to the buyer."),
                ("Payment Gateways", "Online software that securely processes credit card and mobile money payments on websites (e.g. Pesapal)."),
                ("Managing Shipping Costs", "Shipping is the cost of delivering products. Always factor shipping into your prices to protect profits!"),
                ("Digital Products sales", "E-books, design templates, and stock music are digital products. You make them once and sell them infinitely!"),
                ("Freelancing online", "Selling your skills (writing, coding, design) on freelance websites (Upwork, Fiverr) to global clients."),
                ("What is a Niche?", "A niche is a specific, specialized market category, like selling eco-friendly pet toys or tutoring kids."),
                ("Digital Marketing basics", "Using social media posts, videos, and ads to promote your business and attract customers to your site."),
                ("The Lemonade Stand Scale", "Scale your childhood lemonade business by launching an online juice delivery page, taking orders via WhatsApp."),
                ("Domain Names setup", "A domain name is your website's address. Buy a cheap domain to look professional and establish a brand."),
                ("E-commerce Security", "Ensure your website has an SSL certificate (https://) to encrypt customer payment data and build trust."),
                ("The Delivery Rider logistics", "Partner with local motorcycle riders or matatu couriers to ship physical products safely to neighboring towns."),
                ("Customer Reviews value", "Polite service earns positive 5-star reviews online, which acts as free advertising to attract new buyers."),
                ("Startup Cost of Web Builders", "Use free website builders to design your online store with low capital, saving cash for inventory."),
                ("Content Creation streams", "Building an audience on YouTube or TikTok by posting educational videos, eventually earning money from ads."),
                ("Avoiding Work Scams", "Never pay 'registration fees' to get online typing jobs. Real freelance clients pay you; they don't charge you!"),
                ("Embracing Digital Hustles", "The internet allows anyone, regardless of age, to start a global business from their bedroom. Go get started!")
            ],
            "intermediate": [
                ("Dropshipping Profit Margins", "Dropshipping margins are low (10-15%). You must sell high volumes or find unique products to earn profits."),
                ("Integrating Pesapal API", "Use developer plugins to connect Pesapal to your WordPress store, allowing instant M-PESA checkout payments."),
                ("Calculating Delivery logistics", "Compare delivery options: motorbikes are fast but expensive; matatus are cheap but require stage collection."),
                ("Creating Digital assets", "Design Canva templates or Notion planners. They have 90% profit margins because there are no shipping costs!"),
                ("Freelance Pricing strategies", "Charge per project rather than per hour. Project pricing rewards your efficiency and quality of work."),
                ("Search Engine Optimization (SEO)", "Using key search words in your website text so search engines rank your page first when customers search."),
                ("The Lemonade Brand scaling", "Bake cookies and bottle premium juice. Label them with custom designs, and partner with local cafes to sell."),
                ("The Shopify subscription cost", "Shopify charges monthly fees. Factor this fixed software cost into your monthly business budget calculations!"),
                ("E-commerce Returns Policy", "Create a clear return policy: e.g., 'Return items within 7 days for exchange.' It builds customer confidence."),
                ("Copyright and IP laws online", "Never use other people's images, music, or logo designs on your products. Use royalty-free assets to avoid legal bills!"),
                ("Social Media advertising math", "Calculate Cost Per Click (CPC) and Customer Acquisition Cost (CAC) to make sure ads earn more than they cost."),
                ("Email Marketing lists", "Collect customer emails. Sending monthly newsletters with discounts keeps them buying from you."),
                ("Managing Inventory levels", "Keep track of physical stock. Running out of items makes customers unhappy; buying too much locks up capital."),
                ("Freelance Contract basics", "Use simple agreements outlining project scope, deadline, payment terms, and revision limits to protect your work."),
                ("E-commerce Fraud prevention", "Watch out for fake transaction screenshots. Only ship items once funds reflect in your mobile wallet!"),
                ("SaaS Business models", "Software as a Service. Building an app that customers pay for monthly. It provides stable, recurring subscription revenue."),
                ("Logistics Partner networks", "Partner with reliable courier services to ship products securely across the country."),
                ("Transaction Gateway costs", "Payment gateways charge a fee (usually 2-3%) on every transaction. Adjust product prices to cover these costs!"),
                ("Building a Personal Brand", "Share your coding or design journey online. A strong personal brand makes clients seek you out directly."),
                ("The Side Hustle Balance", "Manage your time: school and family come first. Limit side hustle work to weekends and holiday breaks.")
            ],
            "pro": [
                ("Dropshipping Supply Chains", "Dropshipping from international sites has long shipping times. Mitigate this by partnering with local agents."),
                ("Integrating Flutterwave APIs", "Register on the developer portal. Write code to handle checkout webhooks, verifying transaction signatures."),
                ("Optimizing Last-Mile Delivery", "Use routing software to group deliveries, negotiating bulk rates with courier franchises to slash costs by 30%."),
                ("SaaS Product ARR", "Annual Recurring Revenue. SaaS businesses are valued as a multiple of ARR. Master retention metrics to grow valuation!"),
                ("Freelance Agency scaling", "Grow your freelance business by outsourcing tasks to other teen designers, pocketing the difference as agency fee."),
                ("Advanced SEO Audits", "Analyze keyword difficulty, search volume, domain authority, and backlinks to rank your business site above competitors."),
                ("Scaling Juice Brands nationally", "Obtain KEBS certification in Kenya. Manufacture in clean zones, package in glass, and distribute to supermarkets."),
                ("Cost of Customer Acquisition", "CAC = Total Marketing Spend / New Customers Acquired. Your customer lifetime value (LTV) must be 3 times your CAC!"),
                ("Gateway Settlement cycles", "Gateways hold funds for security (e.g. T+2 settlement). Businesses must manage cash flow to cover expenses during wait."),
                ("GDPR and Data Protection compliance", "Businesses collecting customer data must encrypt files, post privacy policies, and respect user deletion requests."),
                ("Social Media Ad Optimization", "Run A/B split tests on ad images and copy. Optimize campaigns based on click-through rates and return on ad spend."),
                ("Email list Segmentation automation", "Segment your email list based on past purchases. Set up automated email sequences that trigger when users abandon carts."),
                ("Managing Supply Chain bottlenecks", "Diversify your manufacturers. If one factory closes, having backup suppliers prevents business halts."),
                ("Escrow services in Freelancing", "Use platform escrow systems. Clients deposit funds before you start work, and funds unlock when you deliver."),
                ("Chargebacks and disputes", "When customers claim credit card fraud, banks trigger chargebacks, deducting funds. Keep delivery receipts to dispute!"),
                ("Evaluating SaaS Churn rates", "Churn is the percentage of subscribers who cancel monthly. A high churn rate (over 5%) will destroy growth."),
                ("3PL Fulfillment Centers", "Outsource storage and shipping to third-party logistics (3PL) centers. They store, pack, and ship goods automatically."),
                ("M-PESA Webhook integration", "Write server code to listen to M-PESA paybill webhooks. Verify transaction codes against databases in real time."),
                ("Equity Split in Startups", "Draft founder vesting agreements. Equity should invest over 4 years with a 1-year cliff to ensure co-founder commitment."),
                ("The Digital Wealth Blueprint", "Combining automated payment gateways, outsourced logistics, and recurring digital products creates an automated money engine.")
            ]
        }
    },
    {
        "id": "teen-8",
        "title": "Inflation & The Money Engine",
        "description": "Understand macroeconomics, the Central Bank of Kenya (CBK), interest rate policies, inflation, and forex currency fluctuations.",
        "concepts": {
            "beginner": [
                ("What is Inflation?", "Inflation is the general rise in the prices of goods and services over time, reducing what your money can buy."),
                ("Purchasing Power", "Purchasing power is the value of money measured by what it can buy. High inflation reduces your purchasing power."),
                ("The Central Bank role", "The Central Bank of Kenya (CBK) is the government institution that prints money, controls interest rates, and monitors banks."),
                ("What is Currency?", "Currency is the system of money in common use in a country, like the Kenya Shilling (KES) or US Dollar (USD)."),
                ("Forex Exchange basics", "Foreign Exchange (Forex) is the market where currencies are traded. Exchange rates show the price of one currency in another."),
                ("The Mandazi Index", "A simple way to understand inflation: if a mandazi cost KES 5 years ago and costs KES 15 today, that is inflation!"),
                ("Why Prices Rise", "Prices rise when the cost of making items increases (fuel, electricity) or when too much money is printed."),
                ("Monetary Policy basics", "The action taken by the Central Bank to control the supply of money in the economy to maintain stable prices."),
                ("Fixed Income Danger", "If you receive a fixed pocket money but food prices double, your standard of living drops by half."),
                ("The Dollar Exchange Rate", "The exchange rate between KES and USD. If 1 USD = 150 KES, you need 150 Shillings to buy a single Dollar."),
                ("Consumer Price Index (CPI)", "CPI is a measure of the average change over time in the prices paid by consumers for a basket of goods and services."),
                ("Cash loses value", "Keeping all savings in physical cash during inflation is a trap. The paper cash stays the same, but buying power drops!"),
                ("Interest vs Inflation", "If your bank pays 3% interest but inflation is 8%, your savings are actually shrinking in value by 5% every year."),
                ("Central Bank Rate (CBR)", "The CBR is the interest rate the Central Bank charges other commercial banks. It guides all national interest rates."),
                ("Foreign Goods Cost", "When the Shilling weakens against the Dollar, imported items (like phones and fuel) become very expensive in Kenya."),
                ("Hyperinflation warning", "Extreme, rapid, and out-of-control price increases. Money becomes worthless, and people trade using barter again!"),
                ("Deflation basics", "Deflation is the opposite of inflation: a general drop in prices. It can cause business closures and job losses."),
                ("What is GDP?", "Gross Domestic Product is the total value of all goods and services produced in a country in one year. It measures economic health."),
                ("The Fuel price effect", "Fuel is needed for transport. When fuel prices rise, the cost of transporting food rises, causing food prices to jump."),
                ("Understanding Macroeconomics", "The branch of economics that deals with the performance, structure, and behavior of the national economy as a whole.")
            ],
            "intermediate": [
                ("CPI calculation basics", "CPI is calculated by tracking a fixed basket of goods. If the basket cost KES 10k last year and 11k this year, inflation is 10%."),
                ("The Cause of Inflation", "Demand-Pull inflation happens when demand outpaces supply. Cost-Push inflation happens when production costs (fuel, wages) rise."),
                ("The Central Bank Rate policy", "To fight inflation, the CBK raises the CBR. This makes borrowing expensive, reducing spending and cooling price hikes."),
                ("Forex Rates Fluctuations", "Exchange rates fluctuate based on imports, exports, foreign debt payments, tourist flows, and investor confidence."),
                ("The Shilling vs Dollar math", "If the KES devalues from 100 to 150 per Dollar, a KES 15,000 phone online now costs KES 22,500. Devaluation hurts importers!"),
                ("Wage-Price Spiral trap", "When prices rise, workers demand higher wages. To cover higher wage costs, businesses raise prices, creating an endless loop."),
                ("Investing to Beat Inflation", "To protect wealth, invest in assets that grow faster than inflation, like real estate, shares on the NSE, or Saccos."),
                ("The Reserve Requirement ratio", "The percentage of customer deposits banks must keep in CBK vaults. Raising this ratio reduces the money banks can lend out."),
                ("The Impact of Money Printing", "When a government prints money to pay debts, the supply of money rises faster than goods, causing hyperinflation (e.g. Zimbabwe)."),
                ("How Banks borrow from CBK", "Commercial banks borrow from the CBK at the CBR. If the CBK raises the CBR, banks raise loan interest rates for consumers."),
                ("The Trade Balance deficit", "A trade deficit is when a country imports (buys) more than it exports (sells). It puts pressure on the local currency, weakening it."),
                ("The Cost of Petrol inflation", "Petrol price changes instantly impact bus fares, electricity bills, and food packaging costs. Monitor oil prices!"),
                ("Evaluating Real returns", "Real Return = Nominal Return - Inflation. If your Sacco pays 12% dividends and inflation is 7%, your real wealth grew by 5%."),
                ("The Dollarization trend", "In hyperinflation, citizens abandon their local currency and trade in stable foreign currencies (like USD) to preserve value."),
                ("Central Bank Independence", "Central banks must be independent of politicians. Politicians want to print money to win elections, which causes inflation!"),
                ("Evaluating CBK Treasury Auctions", "The CBK auctions Treasury Bills weekly to borrow money. Investors bid interest rates. A safe way to earn yield."),
                ("The Velocity of Money", "The speed at which money changes hands in the economy. High velocity boosts GDP but can increase demand-pull inflation."),
                ("How Forex impacts debt", "If Kenya borrows loans in Dollars, and the Shilling weakens, the cost of paying back that foreign debt in Shillings skyrockets!"),
                ("The Basket of Goods audit", "Track your personal household basket. Compare food prices from January to December to find your personal inflation rate."),
                ("The Economic Engine", "Macroeconomics is the engine of finance. Understanding inflation, rates, and forex allows you to predict global trends.")
            ],
            "pro": [
                ("Calculating CPI inflation", "CPI = (Cost of Basket in Current Year / Cost of Basket in Base Year) * 100. Inflation Rate = ((CPI_new - CPI_old) / CPI_old) * 100."),
                ("Demand-Pull vs Cost-Push dynamics", "Demand-Pull: Aggregate demand shifts right. Cost-Push: Aggregate supply shifts left. Master the macroeconomic equilibrium graphs!"),
                ("CBR Transmission mechanism", "How CBR changes affect interbank rates, bank lending rates, asset prices, exchange rates, aggregate demand, and finally inflation."),
                ("Forex Exchange Rate regimes", "Floating rates (market-determined), Fixed rates (pegged to another currency), and Managed Floats (CBK intervenes to stabilize KES)."),
                ("Purchasing Power Parity (PPP)", "PPP suggests exchange rates between currencies are in equilibrium when their purchasing power is the same in each of the two countries."),
                ("Quantity Theory of Money (MV=PQ)", "M is money supply, V is velocity, P is price level, and Q is real output. Printing money (M) without raising output (Q) directly raises prices (P)!"),
                ("Real Yield Curve dynamics", "Real Yield = Nominal Yield - Inflation. An inverted real yield curve indicates tightening monetary policy and economic slowdown."),
                ("Open Market Operations (OMO)", "The CBK buys or sells government securities in the open market to control liquidity. Selling securities removes cash from banks."),
                ("GDP deflator vs CPI", "GDP Deflator = (Nominal GDP / Real GDP) * 100. Unlike CPI, it measures price changes of all domestically produced goods and services."),
                ("Evaluating Currency Devaluation", "Devaluation makes exports cheap and imports expensive. It can help local factories compete but hurts consumers relying on imported goods."),
                ("The Phillips Curve tradeoff", "A historical economic model showing an inverse relationship between inflation and unemployment. CBK balances this tradeoff daily."),
                ("Analyzing Treasury Auction bids", "Study CBK prospectus sheets. Bid competitive yields on 91-day T-Bills based on interbank rate trends and liquidity ratios."),
                ("Balance of Payments (BOP)", "A record of all financial transactions between a country and the rest of the world, split into Current and Capital accounts."),
                ("Evaluating Fiscal vs Monetary Policy", "Fiscal policy is government spending and tax rates. Monetary policy is Central Bank interest rates and money supply. They must align!"),
                ("The Impact of Quantitative Easing", "Central banks buying long-term securities to flood the economy with cash during recessions, risking asset price inflation."),
                ("Analyzing MPC Statements", "Read the bimonthly MPC press releases. Trace CBR adjustments and CBK's outlook on inflation and forex reserves."),
                ("The Fisher Effect equation", "Nominal Interest Rate = Real Interest Rate + Expected Inflation. Investors require higher interest rates to cover high expected inflation."),
                ("Managing Currency Risk", "Use forward contracts or options to lock in exchange rates, protecting import/export businesses from sudden KES/USD drops."),
                ("Global Reserve Currency status", "Why the US Dollar acts as the global reserve currency, and how US Fed interest rate hikes impact emerging markets like Kenya."),
                ("The Ultimate Macro Wealth Shield", "By positioning your assets in inflation-hedged equities, real estate, and hard-currency bonds, you insulate your wealth from monetary devaluation.")
            ]
        }
    },
    {
        "id": "teen-9",
        "title": "Insurance, Risks & Protection",
        "description": "Understand insurance mechanics, medical/motor cover, risk mitigation, and building bulletproof emergency funds.",
        "concepts": {
            "beginner": [
                ("What is Insurance?", "Insurance is a legal agreement where you pay a small fee (premium) to an insurance company, and they pay for losses if accidents happen."),
                ("What is a Premium?", "A premium is the monthly or annual fee you pay to keep your insurance policy active. It is the cost of buying protection."),
                ("The Concept of Risk", "Risk is the possibility of losing money, getting sick, or having property damaged. Insurance is a tool to manage risk."),
                ("Medical Insurance", "Medical insurance covers the cost of doctor visits, medicines, and hospital stays when you fall sick, protecting savings."),
                ("Motor Insurance Cover", "Motor insurance covers costs if your car or motorcycle is in an accident or stolen. In Kenya, third-party cover is required."),
                ("What is a Claim?", "A claim is a formal request you send to the insurance company asking them to pay for a loss covered by your policy."),
                ("The Deductible (Excess)", "An excess is the small amount you must pay yourself before the insurance company pays the rest. It prevents fake claims!"),
                ("Home Insurance basics", "Home insurance covers the cost of repairing your house and replacing furniture if there is a fire, flood, or burglary."),
                ("Life Insurance basics", "Life insurance pays a sum of money to your family if you pass away, helping them cover bills and school fees."),
                ("What is a Policy?", "A policy is the official written contract detailing what risks are covered, premium costs, and the claim payout limits."),
                ("Risk Mitigation basics", "Mitigation is taking actions to reduce risk: e.g., wearing a seatbelt, locking your house, or backing up computer files."),
                ("Why Insurance matters", "A single accident or illness can wipe out years of savings. Insurance provides a safety net to protect your wealth."),
                ("Third-Party Motor Cover", "A cheap motor insurance that only pays for damage you cause to other people and their cars, not your own car."),
                ("Comprehensive Motor Cover", "Premium motor insurance that pays for damage to your own car plus third-party damages, theft, and fire."),
                ("What is an Underwriter?", "An underwriter is the insurance company expert who assesses risks and calculates the premium price for policies."),
                ("Emergency Fund link", "Insurance covers huge losses (accidents). Your emergency fund covers small losses (phone repairs). You need both!"),
                ("SHA / Health Fund in Kenya", "The Social Health Authority (formerly NHIF) is Kenya's health insurance fund. Everyone must contribute to access clinics."),
                ("Avoiding Policy Lapse", "If you fail to pay your premium on time, your policy lapses, and the insurer will not pay if an accident happens."),
                ("Evaluating Policy Exclusions", "Exclusions are risks not covered by the policy. E.g., travel insurance might exclude extreme sports. Read fine print!"),
                ("The Insurance Mindset", "Insurance is not a waste of money if you don't have an accident. It is the price of buying peace of mind.")
            ],
            "intermediate": [
                ("Calculating Excess/Deductibles", "If your car repair costs KES 50,000, and your policy excess is KES 10,000, you pay 10k, and the insurer pays 40k. Understand excess terms!"),
                ("Understanding Co-insurance", "Co-insurance is when you share costs with the insurer: e.g. you pay 20% of medical bills, and they pay 80%."),
                ("How Underwriters calculate risk", "Underwriters check data: e.g., young drivers pay higher premiums because statistics show they get into more accidents."),
                ("SHA benefits in Kenya", "SHA covers outpatient care, surgeries, emergency treatments, and maternal health in registered public and private hospitals."),
                ("Utmost Good Faith principle", "You must tell the truth when signing up. If you lie about past illnesses, the insurer will reject your medical claim!"),
                ("What is Indemnity?", "The principle that insurance is to restore you to the financial position you were in before the loss, not to make you a profit."),
                ("Travel Insurance coverage", "Travel insurance pays for lost luggage, canceled flights, emergency overseas medical care, and travel delays."),
                ("Property Valuation audits", "Value your house contents annually. Under-insuring means you won't get enough payout to replace items after a fire."),
                ("The No-Claim Bonus (NCB)", "A premium discount rewarded to drivers who go a year without making any claims. It encourages safe driving!"),
                ("Avoiding Insurance Fraud", "Making fake claims to get cash is a serious crime. Insurers hire investigators to audit suspicious claims."),
                ("Corporate Liability Insurance", "Protects businesses from costs if a customer slips in their shop or is injured by a faulty product. Essential for startups!"),
                ("Evaluating Crop Insurance", "A vital cover for farmers. It pays out if drought or pests destroy crops, protecting farm income and debt repayments."),
                ("Group Medical Cover benefits", "Employers offer group medical schemes. They are cheaper and have better terms than individual private health policies."),
                ("The Policy Document reading", "Before signing, verify definitions, premium payment dates, claim timelines, maximum payout limits, and exclusions."),
                ("The Insurance Broker role", "Brokers help you compare policies from different insurers to find the best cover and price, free of charge to you."),
                ("Building a Bulletproof Safety Net", "Combine basic government health cover (SHA) with private medical insurance, third-party car insurance, and 6 months emergency savings."),
                ("Why Insurers invest premiums", "Insurers collect premiums and invest them in safe bonds. The investment returns pay for claims and generate corporate profits."),
                ("The Law of Large Numbers", "By insuring millions of people, insurers know only a small percentage will make claims annually, allowing them to pool risk."),
                ("Evaluating Term Life Insurance", "Cheap life insurance that covers you for a set period (e.g. 20 years). It is much cheaper than whole-life plans."),
                ("The Risk Audit checklist", "Identify your risk exposures: health, electronics, travel. Buy insurance for high-cost risks; self-insure low-cost risks.")
            ],
            "pro": [
                ("Insurable Interest principle", "You can only insure things you own or would suffer financial loss from if damaged. You cannot insure your neighbor's car!"),
                ("Mechanics of Reinsurance", "Reinsurance is insurance for insurance companies. Insurers pass huge risks (earthquakes) to global reinsurers to prevent collapse."),
                ("Actuarial Science basics", "Actuaries use advanced mathematics, statistics, and probability theory to model future risk events and design pricing models."),
                ("Evaluating SHA contributions", "In Kenya, SHA contributions are calculated as 2.75% of your gross monthly household income. Calculate this tax-deductible expense!"),
                ("Principle of Subrogation", "Once the insurer pays your claim for a car accident, they inherit the legal right to sue the driver who hit you to recover costs."),
                ("Key Person Insurance for startups", "A policy taken by a business on the life of a key founder. The payout helps the business survive the loss of leadership."),
                ("Evaluating Whole-Life vs Term", "Whole-life includes savings/investment components but has massive fees and low returns. Term life is pure, cheap protection!"),
                ("Calculating Loss Ratios", "Loss Ratio = Claims Paid / Premiums Collected. A loss ratio over 70% indicates the insurer is pricing risk too low or facing high fraud."),
                ("The Moral Hazard concept", "When insured people take higher risks because they know the insurer will pay for losses: e.g. driving carelessly. Insurers combat this with excess fees!"),
                ("The Adverse Selection problem", "When high-risk people buy insurance and low-risk people don't, causing premiums to rise. Insurers require physical checkups to manage this."),
                ("Assessing Insurance Company Solvency", "Check the capital adequacy ratio of insurers on the IRA (Insurance Regulatory Authority) database. Ensure they have healthy asset reserves."),
                ("The Mechanics of Loss Adjustment", "Loss adjusters are independent auditors who visit accident sites to calculate the actual cost of damage, verifying claims."),
                ("Marine Cargo Insurance rules", "Protects goods shipped across oceans. Essential for import/export startups to cover losses from storms or sinking ships."),
                ("The Double Insurance rule", "If you insure your phone with two companies, you cannot collect full payouts from both. They will split the claim cost between them."),
                ("Director and Officer (D&O) liability", "Protects company directors from personal legal bills if sued by shareholders for poor business decisions. Critical for board members!"),
                ("Evaluating Professional Indemnity", "Protects doctors, lawyers, and coders from legal bills if a client sues them for professional mistakes or bugs. Protect your assets!"),
                ("The Risk Management Matrix", "Group risks: Avoid (high risk, low reward), Reduce (mitigate), Transfer (insure), or Retain (self-insure for low cost)."),
                ("Actuarial Life tables analysis", "Study mortality tables. Actuaries use life expectancy data based on age, gender, and habits to calculate life insurance risk."),
                ("Understanding Claims Settlement ratios", "The percentage of claims approved and paid by the insurer. A ratio of 95% or more indicates a reliable, honest insurance company."),
                ("The Ultimate Wealth Protection Strategy", "Wealth building requires offense (investing) and defense (insurance). Secure your assets with comprehensive insurance to protect your legacy.")
            ]
        }
    },
    {
        "id": "teen-10",
        "title": "Cryptocurrencies & Smart Contracts",
        "description": "Understand Bitcoin, blockchain ledger mechanics, crypto wallets, and the extreme risks of speculation and scams.",
        "concepts": {
            "beginner": [
                ("What is Bitcoin?", "Bitcoin is the first decentralized digital currency created in 2009. It allows peer-to-peer transfers without needing banks."),
                ("The Blockchain ledger", "A blockchain is a digital database or ledger shared by a network of computers. Once data is written, it cannot be changed!"),
                ("What is Decentralization?", "Decentralization means there is no single boss or company (like a bank or government) in control of the network."),
                ("Crypto Wallets", "A crypto wallet is software or hardware that stores your digital keys, allowing you to access and send cryptocurrencies."),
                ("Public Keys", "Your public key is like your bank account number. You share it with others so they can send you cryptocurrencies."),
                ("Private Keys", "Your private key is like your secret digital vault password. Never share it! If someone gets it, they can drain your wallet."),
                ("The Speculation risk", "Cryptocurrency prices change wildly every day. Investing in them is highly speculative and you can lose all your money!"),
                ("What is Mining?", "Crypto mining is the process where computers solve complex math problems to verify transactions and earn new coins as rewards."),
                ("Satoshi Nakamoto", "The pseudonymous creator of Bitcoin who published the whitepaper in 2008. Their true identity remains a mystery."),
                ("The Bitcoin Supply Cap", "There will only ever be 21 Million Bitcoins created. This supply cap makes Bitcoin scarce, unlike printed cash."),
                ("Virtual Transactions", "Cryptocurrency exists solely as digital records on the blockchain. There are no physical gold coins, despite drawings!"),
                ("Gas Fees", "Gas fees are transaction processing fees paid to the computer network to execute transactions on blockchains like Ethereum."),
                ("What is Ethereum?", "Ethereum is a blockchain network that allows developers to build and run decentralized applications and smart contracts."),
                ("Cryptocurrency Scams", "Beware of online groups promising 'Guaranteed 50% returns' or 'Get Rich Quick'. Most are pump-and-dump or Ponzi scams!"),
                ("Crypto volatility", "Volatility is the rapid change in price. A coin can drop 50% in value in a single day, making it unsafe for savings."),
                ("What is a Cold Wallet?", "A cold wallet is a physical hardware USB device that stores private keys offline, protecting them from internet hackers."),
                ("What is a Hot Wallet?", "A hot wallet is an app connected to the internet. It is convenient for trading but vulnerable to hacker attacks."),
                ("Stablecoins basics", "Cryptocurrencies pegged to the value of a stable currency, like the US Dollar (e.g. USDT), keeping their price constant."),
                ("Evaluating Crypto Ads", "Celebrity endorsements of crypto projects are ads. Celebrities are paid to promote them; do not trust them blindly!"),
                ("The Blockchain future", "Blockchain technology is being researched by governments and supply chains to secure records and prevent forgery globally.")
            ],
            "intermediate": [
                ("Bitcoin Halving event", "Every four years, the reward paid to Bitcoin miners is cut in half, reducing the rate of new coin supply and causing scarcity."),
                ("Seed Phrases security", "A seed phrase is a list of 12 to 24 random words that acts as a master backup key for your crypto wallet. Store it offline on paper!"),
                ("What is a Smart Contract?", "A smart contract is a self-executing contract with the agreement terms written directly in computer code. It runs automatically!"),
                ("Decentralized Apps (dApps)", "Applications that run on Ethereum or other blockchains, allowing users to trade or lend without middleman platforms."),
                ("Evaluating Crypto Exchanges", "Exchanges (like Binance or Coinbase) allow you to buy crypto using KES. Never keep your main savings on exchanges; they can be hacked!"),
                ("NFTs (Non-Fungible Tokens)", "Unique digital tokens stored on a blockchain representing ownership of a specific digital asset, like art or gaming items."),
                ("The Proof of Work (PoW) model", "The consensus method where miners spend electricity and hardware power to secure the blockchain network. Very energy intensive!"),
                ("The Proof of Stake (PoS) model", "An eco-friendly consensus method where validators lock up their own coins to secure the network, earning transaction rewards."),
                ("Stablecoin Collateral safety", "Ensure stablecoins (USDT, USDC) are backed by real cash reserves in audited bank accounts, or their peg can collapse!"),
                ("Evaluating Smart Contract bugs", "Smart contracts cannot be changed after launch. A bug in the code can allow hackers to drain all locked funds instantly!"),
                ("Crypto Tax regulations", "Governments are taxing crypto trades. In Kenya, KRA can charge capital gains or digital asset tax on crypto profits."),
                ("Avoid FOMO (Fear of Missing Out)", "FOMO is the emotional urge to buy a coin because its price is rising fast. Rushing into hyped coins usually leads to losses!"),
                ("Fiat Currencies comparison", "Fiat currencies (KES, USD) are backed by governments. Cryptocurrencies are backed by computer code and user network trust."),
                ("Evaluating Gas Fees spikes", "During high network congestion, Ethereum gas fees can skyrocket, sometimes costing more than the transaction itself!"),
                ("What is a Fork?", "A fork is a split in the blockchain network: e.g. when developers disagree on rules, creating two coins (Bitcoin vs Bitcoin Cash)."),
                ("The Risk of Self-Custody", "If you lose your hardware cold wallet and lose your seed phrase paper, your coins are gone forever! No bank can reset your password."),
                ("Decentralized Finance (DeFi)", "DeFi allows users to borrow, lend, or trade assets directly with smart contracts, bypassing traditional banks."),
                ("Spotting Ponzi schemes online", "If a crypto project requires you to recruit new members to earn referral bonuses, it is a Ponzi scam. Stay away!"),
                ("How Blockchain is transparent", "Every transaction code is public on blockchain explorers. Anyone can view wallet balances, though owner names are hidden."),
                ("The Crypto Investment limit", "The golden rule of crypto: never invest more money than you are 100% prepared to lose entirely on a bad trade.")
            ],
            "pro": [
                ("Advanced Cryptographic Hash Functions (SHA-256)", "The cryptographic hashing algorithm used by Bitcoin. It converts blocks of transaction data into unique 64-character hashes."),
                ("Seed Phrase Generation (BIP-39 standard)", "How wallet software uses entropy (randomness) to generate mnemonic seed phrases that derive public/private keypairs."),
                ("Solidity and Smart Contract Programming", "Solidity is Ethereum's contract programming language. Master Solidity security practices to prevent reentrancy and overflow hacks!"),
                ("Syllabus: Decentralized Autonomous Organizations (DAOs)", "DAOs are member-controlled organizations run by smart contracts. Voting power is determined by the volume of governance tokens held."),
                ("Analyzing Crypto exchange proof-of-reserves", "Review exchange reports. Ensure they hold assets in 1:1 ratio to customer deposits, backed by verifiable blockchain addresses."),
                ("The ERC-20 vs ERC-721 token standards", "ERC-20 defines standard fungible tokens (cryptocurrencies). ERC-721 defines non-fungible tokens (NFTs). Master these code schemas!"),
                ("The Byzantine Generals Problem and Consensus", "How decentralized networks agree on a single history of transactions despite malicious actors, resolved by proof-of-work."),
                ("Layer 2 Scaling Solutions (Rollups)", "Layer 2 networks (like Arbitrum or Polygon) process transactions off-chain, bundling them to slash gas fees and boost speed on Ethereum."),
                ("Evaluating Algorithmic Stablecoin de-pegging", "Algorithmic stablecoins rely on game theory supply balancing. If market trust drops, they can fall into a death spiral (e.g. Terra/Luna)."),
                ("Formal Verification of Smart Contracts", "Using mathematical proofs to verify that a smart contract's code is mathematically secure and will execute only as intended before deployment."),
                ("The Financial Action Task Force (FATF) rules", "FATF's 'Travel Rule' requires crypto exchanges to collect and share sender and receiver identities to prevent money laundering."),
                ("Sunk Cost of Mining Hardware (ASICs)", "Buying ASIC miners requires heavy capital. If mining difficulty rises or coin prices drop, the hardware becomes unprofitable sunk cost."),
                ("Flash Loans and DeFi exploits", "Flash loans allow borrowing millions without collateral, provided it is paid back in the same transaction block. Hackers use this for arbitrage hacks!"),
                ("Evaluating Zero-Knowledge Proofs (ZKP)", "ZKP allows proving a transaction is valid without revealing the sender, receiver, or amount, creating ultimate privacy on blockchains."),
                ("The Ethereum Virtual Machine (EVM)", "EVM is the global decentralized computer engine that executes all smart contract bytecode on the Ethereum network."),
                ("Analyzing Blockchain Reorgs and 51% attacks", "If a miner controls over 51% of network computing power, they can edit history and double-spend coins, destroying blockchain trust."),
                ("DeFi Automated Market Makers (AMM)", "AMMs replace human order books with mathematical liquidity pools to price assets automatically."),
                ("Securing Custodial Infrastructure (HSM)", "Large crypto institutions secure private keys in Hardware Security Modules (HSMs) with multi-signature authorization requirements."),
                ("Central Bank Digital Currencies (CBDC) vs Stablecoins", "CBDCs are official digital liabilities of the Central Bank. Unlike private stablecoins, they carry zero default or peg risk."),
                ("The Ultimate Cryptographic Strategy", "View blockchain and cryptography as technological revolutions. Ignore speculative hype, and focus on coding smart contract utility.")
            ]
        }
    }
]

def get_junior_type(idx, is_exercise=False):
    if is_exercise:
        return 'exercise'
    types = ['concept', 'insight', 'example', 'concept', 'warning']
    return types[idx % len(types)]

def generate_junior_quiz(module_id, level, card_idx, title, content):
    if "Money Timer" in title:
        return {
            "options": ["A single day of spending", "A set period of time like a week or a month", "A whole year"],
            "correctAnswer": "A set period of time like a week or a month"
        }
    if "Every Shilling a Job" in title:
        return {
            "options": ["Spending all your cash on shoes", "Assigning every shilling of income to a category until 0 is left", "Keeping cash under the bed"],
            "correctAnswer": "Assigning every shilling of income to a category until 0 is left"
        }
    if "Consistency Beats Excitement" in title:
        return {
            "options": ["Saving KES 50 consistently every day", "Saving KES 1,000 once and then forgetting", "Borrowing from others"],
            "correctAnswer": "Saving KES 50 consistently every day"
        }
    if "True Profit" in title:
        return {
            "options": ["Your interest rate minus the inflation rate", "The total cash you put in the bank", "How much money you spend"],
            "correctAnswer": "Your interest rate minus the inflation rate"
        }
    if "Tax-Free Money Growth" in title:
        return {
            "options": ["Investing through government tax-sheltered accounts", "Not paying for groceries", "Avoiding the bank transaction fee"],
            "correctAnswer": "Investing through government tax-sheltered accounts"
        }
    if "National Debt" in title:
        return {
            "options": ["Makes the Shilling stronger", "Makes imported goods (like phones and fuel) more expensive", "Has no effect on you"],
            "correctAnswer": "Makes imported goods (like phones and fuel) more expensive"
        }
    if "Passing Down Wealth" in title:
        return {
            "options": ["Keeping assets in a trust to protect them from legal battles", "Hiding money in the garden", "Giving all money to a stranger"],
            "correctAnswer": "Keeping assets in a trust to protect them from legal battles"
        }
    if "Water" in title:
        return {
            "options": ["Soda", "Clean water", "Ice cream"],
            "correctAnswer": "Clean water"
        }
    if "Need" in title:
        return {
            "options": ["Toy car", "Healthy food", "Video game"],
            "correctAnswer": "Healthy food"
        }
    if "Want" in title:
        return {
            "options": ["Water", "Video game console", "Warm coat"],
            "correctAnswer": "Video game console"
        }
    if "Bank" in title or "teller" in title:
        return {
            "options": ["A place to play", "A safe place to save money", "A toy store"],
            "correctAnswer": "A safe place to save money"
        }
    if "PIN" in title:
        return {
            "options": ["Share it with everyone", "Keep it secret", "Write it on the card"],
            "correctAnswer": "Keep it secret"
        }
    if "Profit" in title or "Calculate" in title or "margin" in title:
        return {
            "options": ["KES 50", "KES 100", "KES 200"],
            "correctAnswer": "KES 100"
        }
    if "Lemonade" in title:
        return {
            "options": ["A business kids can start", "A government office", "A type of tax"],
            "correctAnswer": "A business kids can start"
        }
    if "Harambee" in title:
        return {
            "options": ["A single person saving", "Pulling together to pool community money", "A bank fee"],
            "correctAnswer": "Pulling together to pool community money"
        }
    if "Opportunity" in title:
        return {
            "options": ["The cost of raw lemons", "The next best choice you give up when deciding", "A free gift"],
            "correctAnswer": "The next best choice you give up when deciding"
        }
    return {
        "options": ["The correct choice", "The wrong choice", "An irrelevant choice"],
        "correctAnswer": "The correct choice"
    }

def write_phase_file(modules, filename, phase_prefix, card_count_per_level):
    output = "import { Phase } from '../../types/curriculum';\n\n"
    
    for idx, m in enumerate(modules):
        phase_id = m["id"]
        phase_var = f"{phase_prefix}Phase{idx+1:02d}"
        
        lessons_list = []
        levels = ["beginner", "intermediate", "pro"]
        
        for level in levels:
            lesson_id = f"{phase_id}-l{levels.index(level)+1}"
            lesson_title = f"{level.capitalize()} {m['title']}"
            
            cards_list = []
            
            # Retrieve or generate the unique subtopics
            if "topics" in m:
                topic_list = m["topics"][level]
            else:
                topic_list = m["concepts"][level]
                
            for c_idx in range(card_count_per_level):
                # Retrieve the topic tuple. If we have fewer than card_count_per_level, we generate variations
                if c_idx < len(topic_list):
                    title, content = topic_list[c_idx]
                else:
                    # Fallback generator to ensure exactly the requested card count
                    base_title, base_content = topic_list[c_idx % len(topic_list)]
                    title = f"{base_title} (Part {c_idx // len(topic_list) + 1})"
                    content = f"{base_content} Additionally, it teaches that saving, planning, and focus are key to building long-term security."
                
                card_id = f"{phase_id}-c{levels.index(level)*card_count_per_level + c_idx + 1}"
                
                # Alternate card types, ensuring exercises at index 4, 9, 14, 19
                is_ex = (c_idx in [4, 9, 14, 19])
                c_type = get_junior_type(c_idx, is_ex)
                
                card_obj = {
                    "id": card_id,
                    "type": c_type,
                    "level": level,
                    "title": title,
                    "content": content
                }
                
                if is_ex:
                    ex_data = generate_junior_quiz(phase_id, level, c_idx, title, content)
                    card_obj["options"] = ex_data["options"]
                    card_obj["correctAnswer"] = ex_data["correctAnswer"]
                    
                cards_list.append(card_obj)
                
            lessons_list.append({
                "id": lesson_id,
                "title": lesson_title,
                "level": level,
                "cards": cards_list
            })
            
        if "extra_lessons" in m:
            for extra in m["extra_lessons"]:
                extra_cards = []
                for ec_idx, card in enumerate(extra["cards"]):
                    card_id = f"{phase_id}-c-extra-{ec_idx + 1}"
                    card_obj = {
                        "id": card_id,
                        "type": card.get("type", "concept"),
                        "level": extra.get("level", "wallet"),
                        "title": card["title"],
                        "content": card["content"]
                    }
                    if "options" in card:
                        card_obj["options"] = card["options"]
                        card_obj["correctAnswer"] = card["correctAnswer"]
                    extra_cards.append(card_obj)
                    
                lessons_list.append({
                    "id": extra["id"],
                    "title": extra["title"],
                    "level": extra["level"],
                    "cards": extra_cards
                })
                
        phase_obj = {
            "id": phase_id,
            "title": m["title"],
            "description": m["description"],
            "lessons": lessons_list
        }
        
        output += f"export const {phase_var}: Phase = {json.dumps(phase_obj, indent=2)};\n\n"
        
    with open(filename, "w", encoding="utf-8") as f:
        f.write(output)

# Generate Junior: 15 cards per level (15 beginner, 15 intermediate, 15 pro) = 45 total cards per module
write_phase_file(junior_modules, "src/data/curriculum/junior-modules-extended.ts", "junior", 15)

# Generate Teen: 20 cards per level (20 beginner, 20 intermediate, 20 pro) = 60 total cards per module
write_phase_file(teen_module_definitions, "src/data/curriculum/teen-modules-extended.ts", "teen", 20)

print("Successfully generated curriculum files!")
