/* Estado guardado en el teléfono: quién mira (él/ella), qué comidas se marcaron
   como hechas cada día y qué se tachó de la lista de compras. */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

import type { Person } from '@/data/plan';

type State = {
  person: Person;
  /* persona → fecha (AAAA-MM-DD) → índices de comidas hechas */
  done: Record<Person, Record<string, number[]>>;
  /* clave de ítem de compras → tachado */
  bought: Record<string, boolean>;
};

const KEY = 'plan.state.v1';
let state: State = { person: 'el', done: { el: {}, ella: {} }, bought: {} };
const listeners = new Set<() => void>();

AsyncStorage.getItem(KEY)
  .then((v) => {
    if (!v) return;
    const saved = JSON.parse(v) as Partial<State>;
    state = { ...state, ...saved, done: { el: {}, ella: {}, ...saved.done } };
    listeners.forEach((l) => l());
  })
  .catch(() => {});

function set(next: State) {
  state = next;
  AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useStore(): State {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

export function setPerson(person: Person) {
  set({ ...state, person });
}

export function toggleMeal(person: Person, date: string, i: number) {
  const list = state.done[person][date] ?? [];
  const next = list.includes(i) ? list.filter((x) => x !== i) : [...list, i];
  set({ ...state, done: { ...state.done, [person]: { ...state.done[person], [date]: next } } });
}

export function toggleBought(key: string) {
  set({ ...state, bought: { ...state.bought, [key]: !state.bought[key] } });
}

export function clearBought() {
  set({ ...state, bought: {} });
}
