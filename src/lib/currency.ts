import { useAppStore } from '../state/store';

export const formatCurrency = (amount: number): string => {
  const regionMode = useAppStore.getState().regionMode;
  const formattedAmount = amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (regionMode === 'kenya') {
    return `${formattedAmount} KES`;
  }
  
  // International mode uses "Cash" or no label. 
  // Let's use the word "Cash" as requested: "should not use any label just use cash"
  return `${formattedAmount} Cash`;
};
