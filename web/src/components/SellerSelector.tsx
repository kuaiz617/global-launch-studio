import type { SellerProfile } from '../types';

export function SellerSelector({ sellers, value, onChange }: { sellers: SellerProfile[]; value: string; onChange: (value: string) => void }) {
  return <select value={value} onChange={event => onChange(event.target.value)}>{sellers.map(seller => <option key={seller.id} value={seller.id}>{seller.name}</option>)}</select>;
}
