import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function PiggyBank({ onComplete }: { onComplete?: () => void }) {
  const [balance, setBalance] = useState(0);
  const [coins, setCoins] = useState<{ id: number; x: number; y: number }[]>([]);

  const addCoin = () => {
    if (balance >= 100) return;
    
    setBalance(prev => {
      const newBal = prev + 20;
      if (newBal >= 100 && onComplete) {
        setTimeout(onComplete, 1000);
      }
      return newBal;
    });

    const newCoin = {
      id: Date.now(),
      x: Math.random() * 60 - 30, // Random drop position
      y: -100
    };
    setCoins(prev => [...prev, newCoin]);
  };

  return (
    <div className="w-full bg-[#fce4ec] p-8 rounded-3xl border-4 border-pink-200 text-center relative overflow-hidden">
      <h3 className="text-xl font-black text-pink-800 mb-2">Piggy Bank Challenge</h3>
      <p className="text-pink-600 font-bold mb-6">Click the button to save coins. Reach 100 KES!</p>
      
      <div className="relative h-48 flex items-center justify-center mb-6">
        <motion.div 
          animate={{ scale: 1 + (balance / 500) }}
          className="text-8xl z-10 select-none"
        >
          🐷
        </motion.div>
        
        <AnimatePresence>
          {coins.map(coin => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 1, y: coin.y, x: coin.x }}
              animate={{ opacity: 0, y: 50, x: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute z-20 text-2xl"
              onAnimationComplete={() => setCoins(prev => prev.filter(c => c.id !== coin.id))}
            >
              🪙
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-3xl font-black text-pink-700 mb-6 bg-white/50 inline-block px-6 py-2 rounded-2xl">
        {balance} / 100 KES
      </div>

      <div>
        <button 
          onClick={addCoin}
          disabled={balance >= 100}
          className={`px-8 py-3 rounded-xl font-black text-white text-lg shadow-xl transition-transform active:scale-95 ${balance >= 100 ? 'bg-stone-300' : 'bg-pink-500 hover:bg-pink-400'}`}
        >
          {balance >= 100 ? 'Goal Reached!' : 'Drop Coin (+20)'}
        </button>
      </div>
    </div>
  );
}
