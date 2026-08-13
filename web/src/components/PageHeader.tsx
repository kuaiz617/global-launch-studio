export function PageHeader(props: { eyebrow: string; title: string; subtitle: string }) {
  return <div className="page-header"><div><div className="eyebrow">{props.eyebrow}</div><h1>{props.title}</h1><p>{props.subtitle}</p></div></div>;
}
