const items = [
  {
    label: "Comprado em loja oficial no Japão",
    icon: <><path d="M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  },
  {
    label: "Envio rastreado até sua casa",
    icon: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.5" /><circle cx="17" cy="17.5" r="1.5" /></>,
  },
  {
    label: "Pix ou cartão de crédito",
    icon: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 14h4" /></>,
  },
  {
    label: "Curadoria feita no Japão",
    icon: <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />,
  },
];

export function TrustBar() {
  return (
    <div className="trust">
      <ul className="wrap">
        {items.map((item) => (
          <li key={item.label}>
            <svg viewBox="0 0 24 24" aria-hidden="true">{item.icon}</svg>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
