/* Lista de compras: suma los ingredientes de los días elegidos, para una o las
   dos personas, y los pasa a lo que se compra (legumbres y cereales en seco,
   leche en litros, huevos en docenas, frutas en unidades enteras). */
import { DAILY, ITEMS, RECIPES, SHOPS, WEEK, item, type ItemId, type Person, type RecipeId, type Shop } from '@/data/plan';

export type Line = { id: ItemId; name: string; qty: string; note?: string };
export type Section = { shop: Shop; name: string; lines: Line[] };

export function buildList(days: number[], people: Person[]): Section[] {
  const total = new Map<ItemId, number>();
  const add = (id: ItemId, n: number) => total.set(id, (total.get(id) ?? 0) + n);
  const share = (el: number, ella: number) => people.reduce((s, p) => s + (p === 'el' ? el : ella), 0);

  for (const d of days) {
    for (const meal of WEEK[d].meals) {
      for (const [id, el, ella] of meal.ing) add(id, share(el, ella));
      if (meal.recipe) {
        const [rid, el, ella] = meal.recipe;
        const times = Math.ceil(share(el, ella) - 1e-6);
        for (const [id, n] of RECIPES[rid as RecipeId].ing) add(id, n * times);
      }
    }
    for (const [id, el, ella] of DAILY) add(id, share(el, ella));
  }

  const order = Object.keys(ITEMS) as ItemId[];
  return SHOPS.map(({ id: shop, name }) => ({
    shop,
    name,
    lines: order.filter((id) => item(id).shop === shop && (total.get(id) ?? 0) > 0).map((id) => line(id, total.get(id)!)),
  })).filter((s) => s.lines.length > 0);
}

const up = (n: number, step: number) => Math.ceil(n / step - 1e-6) * step;
const num = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');

function grams(g: number) {
  const r = g < 100 ? up(g, 10) : up(g, 50);
  return r >= 1000 ? `${num(r / 1000)} kg` : `${r} g`;
}

function line(id: ItemId, n: number): Line {
  const it = item(id);
  const base = { id, name: it.name };

  if (id === 'huevo') {
    const u = Math.ceil(n);
    return { ...base, qty: `${u} u`, note: `≈ ${num(up(u / 12, 0.5))} docenas` };
  }
  if (id === 'pan') {
    const u = Math.ceil(n);
    return { ...base, qty: `${u} rebanadas`, note: `≈ ${Math.ceil(u / 18)} paquete${u > 18 ? 's' : ''}` };
  }
  if (it.unit === 'u') {
    const u = Math.ceil(n - 1e-6);
    const [one, many] = it.word ?? ['u', 'u'];
    return { ...base, qty: `${u} ${u === 1 ? one : many}` };
  }
  if (it.unit === 'ml') {
    if (n >= 1000) return { ...base, qty: `${num(up(n / 1000, 0.5))} L` };
    return { ...base, qty: `${up(n, 50)} ml` };
  }
  if (it.raw) {
    return { ...base, qty: `${grams(n * it.raw)}`, note: `en seco · rinde ${grams(n)} cocido` };
  }
  return { ...base, qty: grams(n) };
}

export function listText(sections: Section[], title: string) {
  const out = [title, ''];
  for (const s of sections) {
    out.push(s.name.toUpperCase());
    for (const l of s.lines) out.push(`• ${l.name}: ${l.qty}${l.note ? ` (${l.note})` : ''}`);
    out.push('');
  }
  return out.join('\n').trim();
}
