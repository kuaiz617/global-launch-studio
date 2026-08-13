import type { SellerProfile } from '../types';

export function SimulatorPage({ sellers }: { sellers: SellerProfile[] }) {
  return <div className="panel"><h2>Seller Simulator</h2><p>{sellers.length} seller scenarios loaded.</p></div>;
}
