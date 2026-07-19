import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../lib/currency';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MarketSim({ onComplete }: { onComplete?: () => void }) {
  const [cash, setCash] = useState(1000);
  const [shares, setShares] = useState(0);
  const [price, setPrice] = useState(100);
  const [history, setHistory] = useState<number[]>([100]);
  const [day, setDay] = useState(1);
  const MAX_DAYS = 10;

  useEffect(() => {
    if (day > MAX_DAYS) return;
    const timer = setInterval(() => {
      setDay(d => {
        if (d >= MAX_DAYS) {
          clearInterval(timer);
          return d;
        }
        return d + 1;
      });
      setPrice(p => {
        const change = (Math.random() - 0.4) * 30; // slight upward bias
        const newPrice = Math.max(10, Math.round(p + change));
        setHistory(h => [...h, newPrice]);
        return newPrice;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [day]);

  const totalValue = cash + (shares * price);

  const buy = () => {
    if (cash >= price && day <= MAX_DAYS) {
      setCash(c => c - price);
      setShares(s => s + 1);
    }
  };

  const sell = () => {
    if (shares > 0 && day <= MAX_DAYS) {
      setShares(s => s - 1);
      setCash(c => c + price);
    }
  };

  const isFinished = day >= MAX_DAYS;

  return (
    <div className="w-full bg-[#F3E5F5] p-6 md:p-8 rounded-3xl border-4 border-purple-200">
      <h3 className="text-xl font-black text-purple-900 mb-2">Market Simulator</h3>
      <p className="text-purple-700 font-bold mb-6">Buy low, sell high! Try to make a profit in 10 days.</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs font-bold text-stone-500 uppercase">Total Value</div>
          <div className={`text-2xl font-black ${totalValue >= 1000 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(totalValue)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm flex flex-col items-end">
          <div className="text-xs font-bold text-stone-500 uppercase">Day {Math.min(day, MAX_DAYS)} / {MAX_DAYS}</div>
          <div className="text-2xl font-black text-stone-800">
            {shares} Shares
          </div>
        </div>
      </div>

      <div className="bg-white h-40 rounded-2xl mb-6 border border-purple-100 p-4 flex items-end gap-1 overflow-hidden relative">
        <div className="absolute top-4 left-4 font-black text-xl flex items-center gap-2">
          {formatCurrency(price)}
          {history.length > 1 && price >= history[history.length - 2] ? (
             <TrendingUp className="text-green-500" />
          ) : (
             <TrendingDown className="text-red-500" />
          )}
        </div>
        {history.map((p, i) => (
          <div 
            key={i} 
            className="flex-1 bg-purple-500 rounded-t-sm transition-all duration-300 min-w-[10px]"
            style={{ height: `${(p / Math.max(...history, 200)) * 100}%` }}
          />
        ))}
      </div>

      {!isFinished ? (
        <div className="flex gap-4">
          <button 
            onClick={buy} 
            disabled={cash < price}
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-black shadow-lg hover:bg-green-400 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all"
          >
            Buy (Cost: {price})
          </button>
          <button 
            onClick={sell}
            disabled={shares === 0}
            className="flex-1 bg-red-500 text-white py-3 rounded-xl font-black shadow-lg hover:bg-red-400 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all"
          >
            Sell (Gain: {price})
          </button>
        </div>
      ) : (
        <button 
          onClick={onComplete}
          className="w-full bg-purple-600 text-white py-4 rounded-xl font-black text-lg shadow-xl hover:bg-purple-500 transition-all"
        >
          {totalValue > 1000 ? 'Great Trading! Continue' : 'Tough Market. Continue'}
        </button>
      )}
    </div>
  );
}
