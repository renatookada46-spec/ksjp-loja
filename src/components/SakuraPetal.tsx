// Pétala de sakura usada na logo e no ícone do site.
export function SakuraPetal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21.5C5.2 16.6 3.6 10.2 6.4 5.6 7.7 3.5 9.6 2.4 11 2.2L12 4.6l1-2.4c1.4.2 3.3 1.3 4.6 3.4 2.8 4.6 1.2 11-5.6 15.9z"
        fill="var(--sakura)"
      />
      <path d="M12 20V8.5" stroke="var(--sakura-deep)" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    </svg>
  );
}
