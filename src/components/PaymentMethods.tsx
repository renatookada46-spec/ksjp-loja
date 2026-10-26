// Formas de pagamento aceitas, com o ícone de cada empresa.
export function PaymentMethods() {
  return (
    <ul className="pay" aria-label="Formas de pagamento">
      <li>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g fill="#32BCAD">
            <path d="M12 2.6 15.6 6.2l-2.4 2.4a1.7 1.7 0 0 1-2.4 0L8.4 6.2z" />
            <path d="M12 21.4 8.4 17.8l2.4-2.4a1.7 1.7 0 0 1 2.4 0l2.4 2.4z" />
            <path d="M2.6 12 6.2 8.4l2.4 2.4a1.7 1.7 0 0 1 0 2.4l-2.4 2.4z" />
            <path d="M21.4 12 17.8 15.6l-2.4-2.4a1.7 1.7 0 0 1 0-2.4l2.4-2.4z" />
          </g>
        </svg>
        Pix
      </li>
      <li>
        <svg viewBox="0 0 48 16" className="wide" aria-hidden="true">
          <text x="24" y="13" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="15" fontStyle="italic" fontWeight="900" fill="#1A1F71" letterSpacing="0.5">VISA</text>
        </svg>
        Visa
      </li>
      <li>
        <svg viewBox="0 0 38 24" className="wide" aria-hidden="true">
          <circle cx="14" cy="12" r="10" fill="#EB001B" />
          <circle cx="24" cy="12" r="10" fill="#F79E1B" />
          <path d="M19 3.3a10 10 0 0 1 0 17.4 10 10 0 0 1 0-17.4z" fill="#FF5F00" />
        </svg>
        Mastercard
      </li>
    </ul>
  );
}
