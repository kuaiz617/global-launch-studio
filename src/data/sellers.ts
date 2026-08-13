import type { SellerProfile } from '../types/index.js';
export const sellers: SellerProfile[] = [
  { id:'sz-electronics', name:'NovaWave Electronics', location:'Shenzhen', category:'Consumer electronics', currentMarkets:['US'], targetMarkets:['Germany','Japan'], teamSize:22, readiness:74, strengths:['US marketplace experience','centralized inventory team'], gaps:['EU compliance education','Japan listing localization'] },
  { id:'gz-home', name:'Harbor Home', location:'Guangzhou', category:'Home & kitchen', currentMarkets:['UK'], targetMarkets:['US','Canada'], teamSize:14, readiness:68, strengths:['stable catalog','English content team'], gaps:['inventory planning','North America onboarding sequence'] },
  { id:'dg-sports', name:'PeakMotion Gear', location:'Dongguan', category:'Sports accessories', currentMarkets:['US','UK'], targetMarkets:['Germany'], teamSize:31, readiness:82, strengths:['multi-market operations','documented SOPs'], gaps:['market-specific claims review'] },
  { id:'hz-beauty', name:'Luma Beauty Lab', location:'Hangzhou', category:'Beauty', currentMarkets:['Japan'], targetMarkets:['US'], teamSize:18, readiness:61, strengths:['localized content','brand storytelling'], gaps:['claims education','launch ownership'] }
];
export function getSeller(id?: string): SellerProfile { return sellers.find(seller => seller.id === id) ?? sellers[0]!; }
