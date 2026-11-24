/* Detalle de una comida: qué es, cuánto le toca a cada uno y con qué se arma. */
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Divider, Row, T, tap, useColors } from '@/components/ui';
import { MAIN_MEALS, OIL_RULE, PROFILE, RECIPES, WEEK, item, type ItemId, type Person } from '@/data/plan';
import { fromKey, longDate } from '@/lib/dates';
import { toggleMeal, useStore } from '@/lib/store';

const PEOPLE: Person[] = ['el', 'ella'];

export default function MealDetail() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { dia, i, fecha } = useLocalSearchParams<{ dia: string; i: string; fecha?: string }>();
  const { person, done } = useStore();
  const day = WEEK[Number(dia)];
  const idx = Number(i);
  const meal = day?.meals[idx];
  if (!meal) return null;
  const isDone = fecha ? (done[person][fecha] ?? []).includes(idx) : false;
  const main = MAIN_MEALS.includes(meal.kind);

  return (
    <>
      <Stack.Screen options={{ title: meal.kind }} />
      <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 110 }}>
        <T size={12} weight="700" caps muted>
          {day.name}
          {fecha ? ` · ${longDate(fromKey(fecha))}` : ''}
        </T>
        <T size={28} weight="900" style={{ marginTop: 4 }}>
          {meal.menu}
        </T>

        {meal.free ? (
          <T size={15} muted style={{ marginTop: 16 }}>
            Un plato razonable, sin repetir. Disfrutalo.
          </T>
        ) : (
          <>
            {/* Porción de cada uno */}
            <Row gap={10} style={{ marginTop: 22, alignItems: 'stretch' }}>
              {PEOPLE.map((p) => {
                const me = p === person;
                return (
                  <View key={p} style={{ flex: 1, borderRadius: 16, padding: 14, gap: 6, backgroundColor: me ? c.accentSoft : c.card, borderWidth: me ? 1.5 : 0, borderColor: c.accent }}>
                    <T size={11} weight="800" caps color={me ? c.accent : c.muted}>
                      {PROFILE[p].label}
                    </T>
                    <T size={15} weight="700">
                      {meal[p].split(' · ').join('\n')}
                    </T>
                  </View>
                );
              })}
            </Row>

            {main ? (
              <T size={13} muted style={{ marginTop: 12 }}>
                + {OIL_RULE[person]} de oliva, medido. Verduras de hoja libres.
              </T>
            ) : null}

            {/* Ingredientes */}
            <T size={12} weight="800" caps muted style={{ marginTop: 28, marginBottom: 6 }}>
              Ingredientes
            </T>
            <Row style={{ paddingVertical: 6 }}>
              <View style={{ flex: 1 }} />
              {PEOPLE.map((p) => (
                <T key={p} size={11} weight="800" caps color={p === person ? c.accent : c.muted} style={{ width: 70, textAlign: 'right' }}>
                  {PROFILE[p].label}
                </T>
              ))}
            </Row>
            {meal.recipe ? (
              <>
                <Divider />
                <Row style={{ paddingVertical: 12 }}>
                  <T size={15} weight="600" style={{ flex: 1 }}>
                    {RECIPES[meal.recipe[0]].name}
                  </T>
                  <T size={15} weight="800" style={{ width: 70, textAlign: 'right' }}>
                    {frac(meal.recipe[1])}
                  </T>
                  <T size={15} weight="800" style={{ width: 70, textAlign: 'right' }}>
                    {frac(meal.recipe[2])}
                  </T>
                </Row>
              </>
            ) : null}
            {meal.ing.map(([id, el, ella]) => (
              <View key={id}>
                <Divider />
                <Row style={{ paddingVertical: 12 }}>
                  <T size={15} weight="600" style={{ flex: 1 }}>
                    {item(id).name}
                    {item(id).raw ? <T size={12} muted>{'  cocido'}</T> : null}
                  </T>
                  <T size={15} weight="800" style={{ width: 70, textAlign: 'right' }}>
                    {amount(id, el, 'el')}
                  </T>
                  <T size={15} weight="800" style={{ width: 70, textAlign: 'right' }}>
                    {amount(id, ella, 'ella')}
                  </T>
                </Row>
              </View>
            ))}
            {meal.recipe ? (
              <T size={13} muted style={{ marginTop: 14 }}>
                Receta entera: {RECIPES[meal.recipe[0]].ing.map(([id, n]) => `${item(id).name.toLowerCase()} ${amount(id, n)}`).join(', ')}.
              </T>
            ) : null}
          </>
        )}
      </ScrollView>

      {fecha ? (
        <View style={{ position: 'absolute', left: 20, right: 20, bottom: insets.bottom + 20 }}>
          <Pressable
            onPress={() => {
              tap(isDone ? 'light' : 'success');
              toggleMeal(person, fecha, idx);
              if (!isDone) router.back();
            }}
            style={({ pressed }) => ({
              height: 54,
              borderRadius: 27,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDone ? c.card : c.accent,
              opacity: pressed ? 0.85 : 1,
            })}>
            <T size={16} weight="800" color={isDone ? c.text : c.onAccent}>
              {isDone ? 'Desmarcar' : `Hecha · ${PROFILE[person].label}`}
            </T>
          </Pressable>
        </View>
      ) : null}
    </>
  );
}

function frac(n: number) {
  const map: [number, string][] = [
    [0.125, '⅛'],
    [0.15, '⅛'],
    [1 / 6, '⅙'],
    [0.25, '¼'],
    [3 / 8, '⅜'],
    [0.5, '½'],
  ];
  const whole = Math.floor(n + 1e-6);
  const rest = n - whole;
  if (rest < 1e-6) return String(whole);
  const f = map.find(([v]) => Math.abs(v - rest) < 0.02)?.[1] ?? String(Math.round(rest * 10) / 10);
  return whole ? `${whole}${f}` : f;
}

function amount(id: ItemId, n: number, p?: Person) {
  if (id === 'aceite' && p) return p === 'el' ? '1 cda' : '2 cdtas';
  const it = item(id);
  if (it.unit === 'u') return frac(n);
  return `${n} ${it.unit}`;
}
