import { Phase } from '../../types/curriculum';

export const juniorPhase01: Phase = {
  id: 'junior-1',
  title: 'Piggy Bank Mastery',
  description: 'A comprehensive guide to the history of money, earning value, and delayed gratification. Perfect for young savers.',
  lessons: [
    {
      id: 'j1-l1',
      title: 'What is Money?',
      level: 'beginner',
      cards: [
        {
          id: 'j1-c1',
          type: 'concept',
          level: 'beginner',
          title: 'The Age of Bartering',
          content: 'Thousands of years ago, people didn\'t use coins or paper. They used a system called **bartering**. \n\nYou traded a chicken for a bag of wheat. But what if the person with wheat didn\'t want your chicken? That was the big problem with bartering!'
        },
        {
          id: 'j1-c2',
          type: 'insight',
          level: 'beginner',
          title: 'Commodity Money',
          content: 'To solve the bartering problem, people started using things that everyone wanted and had value. \n\nThey used salt, cowrie shells, and eventually shiny metals like gold and silver.'
        },
        {
          id: 'j1-c3',
          type: 'concept',
          level: 'beginner',
          title: 'Modern Money',
          content: 'Today we use **Fiat Money**. These are the paper bills (like Kenyan Shillings) and digital numbers in a bank app.\n\nIt has value simply because the government says it does, and because everyone agrees to trust it at the local duka or supermarket.'
        },
        {
          id: 'j1-c4',
          type: 'example',
          level: 'beginner',
          title: 'Earning Value',
          content: 'Money is simply a receipt for **value provided**.\n\nWhen you do extra chores at home or help wash a car, you are providing value. Your allowance or pocket money is the receipt for that hard work!'
        },
        {
          id: 'j1-c5',
          type: 'exercise',
          level: 'beginner',
          title: 'The Money Evolution',
          content: 'What system did people use before money was invented?',
          options: ['Credit Cards', 'Bartering', 'M-Pesa'],
          correctAnswer: 'Bartering'
        }
      ]
    },
    {
      id: 'j1-l2',
      title: 'The Magic of Saving',
      level: 'beginner',
      cards: [
        {
          id: 'j1-c6',
          type: 'concept',
          level: 'beginner',
          title: 'Delayed Gratification',
          content: 'The secret superpower of wealthy people is **delayed gratification**. \n\nThis means choosing to wait for something bigger and better later, rather than spending your money on something small right now.'
        },
        {
          id: 'j1-c7',
          type: 'example',
          level: 'beginner',
          title: 'The Sweet Trap',
          content: 'If you buy mandazi or sweets every single day after school, your money is gone immediately.\n\nBut if you save that money in your piggy bank for a month, you could buy a new video game or a cool toy.'
        },
        {
          id: 'j1-c8',
          type: 'insight',
          level: 'beginner',
          title: 'Setting a Goal',
          content: 'You are much more likely to save money if you have a specific goal. \n\nWhether it\'s saving 500 KES for a new book or 5,000 KES for a bicycle, having a target makes it fun to watch your money grow!'
        },
        {
          id: 'j1-c9',
          type: 'exercise',
          level: 'beginner',
          title: 'Superpower Check',
          content: 'What is delayed gratification?',
          options: ['Waiting to buy something better later', 'Buying sweets immediately', 'Borrowing money from friends'],
          correctAnswer: 'Waiting to buy something better later'
        }
      ]
    }
  ]
};
