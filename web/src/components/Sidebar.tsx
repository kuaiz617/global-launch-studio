import type { PageId } from '../types';

export type NavItem = { id: PageId; label: string; index: string };

type Props = { page: PageId; items: NavItem[]; onNavigate: (page: PageId) => void };

export function Sidebar({ page, items, onNavigate }: Props) {
  return <aside className="sidebar">
    <div className="brand-block"><div className="brand-mark">GL</div><div><div className="brand-name">GlobalLaunch</div><div className="brand-subtitle">AI PRODUCT MARKETING STUDIO</div></div></div>
    <nav className="nav-list">{items.map(item => <button key={item.id} type="button" className={page === item.id ? 'nav-item active' : 'nav-item'} onClick={() => onNavigate(item.id)}><span className="nav-index">{item.index}</span><span>{item.label}</span></button>)}</nav>
    <div className="sidebar-footer">Portfolio environment · curated demo data</div>
  </aside>;
}
