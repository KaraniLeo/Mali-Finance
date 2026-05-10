import { LearningCard } from '../types/curriculum';

// Import images directly so Vite bundles them properly
import candlestickImg from '../assets/education/phase-05/candlestick.png';
import dojiImg from '../assets/education/phase-05/doji.png';
import supportResistanceImg from '../assets/education/phase-05/support-resistance.png';
import budgetingImg from '../assets/education/teen-phase-01/budgeting-flow.png';
import riskManagementImg from '../assets/education/phase-03/risk-management.png';

// Any missing keys will fall back gracefully since the map might not be perfectly 1-to-1 yet
import slippageImg from '../assets/education/phase-01/slippage.png';
import marketorderImg from '../assets/education/phase-01/marketorder.png';
import limitorderImg from '../assets/education/phase-01/limitorder.png';
import marketImg from '../assets/education/phase-01/market.png';
import bullsbearsImg from '../assets/education/phase-01/bullsbears.png';
import priceImg from '../assets/education/phase-01/price.png';
import orderbookImg from '../assets/education/phase-01/orderbook.png';
import spreadImg from '../assets/education/phase-01/spread.png';
import makerImg from '../assets/education/phase-01/maker.png';
import liquidityImg from '../assets/education/phase-01/liquidity.png';

export const educationalImages: Record<string, string> = {
  slippage: slippageImg,
  marketorder: marketorderImg,
  limitorder: limitorderImg,
  market: marketImg,
  bullsbears: bullsbearsImg,
  price: priceImg,
  orderbook: orderbookImg,
  spread: spreadImg,
  maker: makerImg,
  liquidity: liquidityImg,
  candlestick: candlestickImg,
  doji: dojiImg,
  supportResistance: supportResistanceImg,
  budgeting: budgetingImg,
  riskManagement: riskManagementImg,
  // We didn't generate trendline due to quota, so it falls back
};

export function resolveImage(card: LearningCard): string {
  if (card.imageKey && educationalImages[card.imageKey]) {
    return educationalImages[card.imageKey];
  }

  // Generic fallback if an imageKey is missing or not yet generated
  return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80';
}
