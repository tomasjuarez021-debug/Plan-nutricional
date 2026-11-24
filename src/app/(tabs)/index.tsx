/* Hoy: los últimos 7 días en círculos arriba y, abajo, las comidas del día
   elegido con la porción de quien mira. Tocar una comida abre el detalle. */
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Check, Divider, Ring, Row, Segmented, T, tap, useColors } from '@/components/ui';
import { PROFILE, WEEK, type Person } from '@/data/plan';
import { dateKey, lastDays, longDate, planIndex } from '@/lib/dates';
import { setPerson, toggleMeal, useStore } from '@/lib/store';

export default function Today() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { person, done } = useStore();
  const days = lastDays(7);
  const todayK = dateKey(days[6]);
  const [selected, setSelected] = useState(todayK);
  const sel = days.find((d) => dateKey(d) === selected) ?? days[6];
  const di = planIndex(sel);
  const day = WEEK[di];
  const doneList = done[person][selected] ?? [];
  const isToday = selected === todayK;
  const p = PROFILE[person];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View style={{ flex: 1 }}>
          <T size={12} weight="700" caps muted>
            {day.name} · {longDate(sel)}
          </T>
          <T size={34} weight="900">
            {isToday ? 'Hoy' : day.name}
          </T>
        </View>
        <Segmented<Person>
          value={person}
          options={[
            { id: 'el', label: 'Él' },
            { id: 'ella', label: 'Ella' },
          ]}
          onChange={setPerson}
        />
      </Row>

      {/* Días anteriores en círculos */}
      <Row style={{ justifyContent: 'space-between', marginTop: 22 }} gap={0}>
        {days.map((d) => {
          const k = dateKey(d);
          const total = WEEK[planIndex(d)].meals.length;
          const n = (done[person][k] ?? []).length;
          return <DayDot key={k} letter={WEEK[planIndex(d)].short} num={d.getDate()} value={n / total} selected={k === selected} today={k === todayK} onPress={() => setSelected(k)} />;
        })}
      </Row>

      {/* Números del día, estilo resumen de actividad */}
      <Row style={{ marginTop: 26, justifyContent: 'space-between' }}>
        <Stat label="Comidas" value={`${doneList.length}/${day.meals.length}`} />
        <Stat label="Kcal" value={`~${p.kcal}`} />
        <Stat label="Proteína" value={`${p.prot} g`} />
      </Row>
      <View style={{ height: 4, backgroundColor: c.track, borderRadius: 2, marginTop: 14, overflow: 'hidden' }}>
        <View style={{ width: `${(doneList.length / day.meals.length) * 100}%`, height: 4, backgroundColor: c.accent }} />
      </View>

      <View style={{ marginTop: 18 }}>
        {day.meals.map((m, i) => (
          <View key={m.kind}>
            {i > 0 ? <Divider /> : null}
            <Pressable
              onPress={() => {
                tap();
                router.push({ pathname: '/comida', params: { dia: String(di), i: String(i), fecha: selected } });
              }}
              style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 14, opacity: pressed ? 0.6 : 1 })}>
              <View style={{ flex: 1, gap: 3 }}>
                <T size={11} weight="800" caps color={c.accent}>
                  {m.kind}
                </T>
                <T size={17} weight="800" style={doneList.includes(i) ? { color: c.muted } : undefined}>
                  {m.menu}
                </T>
                <T size={13.5} weight="500" muted>
                  {m.free ? 'Libre' : m[person]}
                </T>
              </View>
              <Check on={doneList.includes(i)} onPress={() => toggleMeal(person, selected, i)} />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function DayDot({ letter, num, value, selected, today, onPress }: { letter: string; num: number; value: number; selected: boolean; today: boolean; onPress: () => void }) {
  const c = useColors();
  const size = 40;
  const full = value >= 1;
  return (
    <Pressable
      onPress={() => {
        tap();
        onPress();
      }}
      style={{ alignItems: 'center', gap: 6 }}>
      <T size={11} weight="700" color={selected ? c.text : c.muted}>
        {letter}
      </T>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: full ? c.accent : selected ? c.text : 'transparent',
        }}>
        {full ? null : <Ring size={size} value={value} stroke={3} track={selected ? c.text : c.track} />}
        <T size={14} weight="800" color={full ? c.onAccent : selected ? c.bg : c.text}>
          {num}
        </T>
      </View>
      <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: today ? c.accent : 'transparent' }} />
    </Pressable>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: 2 }}>
      <T size={11} weight="600" caps muted>
        {label}
      </T>
      <T size={24} weight="900">
        {value}
      </T>
    </View>
  );
}
