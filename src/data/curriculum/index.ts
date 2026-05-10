export * from './phase-01-market-basics';
export * from './phase-02-macro';
export * from './phase-03-risk-management';
export * from './phase-04-equities';
export * from './phase-05-technical-analysis';
export * from './phase-06-derivatives';
export * from './phase-07-crypto';
export * from './phase-08-web3';
export * from './phase-09-tokenomics';
export * from './phase-10-nfts';
export * from './phase-11-psychology';
export * from './phase-12-charting';
export * from './phase-13-macro';
export * from './phase-14-real-estate';
export * from './phase-15-wealth';
export * from './junior-phase-01';
export * from './teen-phase-01';

import { phase01 } from './phase-01-market-basics';
import { phase02 } from './phase-02-macro';
import { phase03 } from './phase-03-risk-management';
import { phase04 } from './phase-04-equities';
import { phase05 } from './phase-05-technical-analysis';
import { phase06 } from './phase-06-derivatives';
import { phase07 } from './phase-07-crypto';
import { phase08 } from './phase-08-web3';
import { phase09 } from './phase-09-tokenomics';
import { phase10 } from './phase-10-nfts';
import { phase11 } from './phase-11-psychology';
import { phase12 } from './phase-12-charting';
import { phase13 } from './phase-13-macro';
import { phase14 } from './phase-14-real-estate';
import { phase15 } from './phase-15-wealth';
import { juniorPhase01 } from './junior-phase-01';
import { teenPhase01 } from './teen-phase-01';

export const allPhases = [
  phase01,
  phase02,
  phase03,
  phase04,
  phase05,
  phase06,
  phase07,
  phase08,
  phase09,
  phase10,
  phase11,
  phase12,
  phase13,
  phase14,
  phase15,
  juniorPhase01,
  teenPhase01
];

export const getPhaseById = (id: string) => allPhases.find(p => p.id === id);
