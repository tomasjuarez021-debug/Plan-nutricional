/* Fechas en hora local. El plan va de lunes (0) a domingo (6). */
export function dateKey(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function fromKey(k: string) {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/* Índice del día del plan: lunes = 0 … domingo = 6. */
export function planIndex(d: Date) {
  return (d.getDay() + 6) % 7;
}

/* Hoy y los días anteriores, del más viejo al más nuevo. */
export function lastDays(n: number, today = new Date()) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (n - 1 - i));
    return d;
  });
}

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export function longDate(d: Date) {
  return `${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}
