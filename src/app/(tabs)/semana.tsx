/* Semana: el plan completo día por día, más reglas, suplementos y ajustes. */
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Divider, Row, T, tap, useColors } from '@/components/ui';
import { ADJUSTMENTS, PROFILE, RULES, SUPPLEMENTS, WEEK } from '@/data/plan';
import { planIndex } from '@/lib/dates';
import { useStore } from '@/lib/store';

export default function Week() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { person } = useStore();
  const todayI = planIndex(new Date());
  const [di, setDi] = useState(todayI);
  const day = WEEK[di];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <T size={12} weight="700" caps muted>
        Plan · {PROFILE[person].label}
      </T>
      <T size={34} weight="900">
        Semana
      </T>

      <Row style={{ justifyContent: 'space-between', marginTop: 20 }} gap={0}>
        {WEEK.map((d, i) => {
          const on = i === di;
          return (
            <Pressable
              key={d.name}
              onPress={() => {
                tap();
                setDi(i);
              }}
              style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? c.text : c.card }}>
              <T size={14} weight="800" color={on ? c.bg : i === todayI ? c.accent : c.text}>
                {d.short}
              </T>
            </Pressable>
          );
        })}
      </Row>

      <T size={22} weight="900" style={{ marginTop: 24 }}>
        {day.name}
      </T>
      <View style={{ marginTop: 6 }}>
        {day.meals.map((m, i) => (
          <View key={m.kind}>
            {i > 0 ? <Divider /> : null}
            <Pressable
              onPress={() => {
                tap();
                router.push({ pathname: '/comida', params: { dia: String(di), i: String(i) } });
              }}
              style={({ pressed }) => ({ paddingVertical: 14, gap: 3, opacity: pressed ? 0.6 : 1 })}>
              <T size={11} weight="800" caps color={c.accent}>
                {m.kind}
              </T>
              <T size={16} weight="700">
                {m.menu}
              </T>
              <T size={13} weight="500" muted>
                {m.free ? 'Libre' : m[person]}
              </T>
            </Pressable>
          </View>
        ))}
      </View>

      <Block title="Reglas" items={RULES} />
      <Block title="Suplementación" items={SUPPLEMENTS.map(([k, v]) => `${k}: ${v}`)} />
      <Block title="Ajustes" items={ADJUSTMENTS} />
    </ScrollView>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  const c = useColors();
  return (
    <View style={{ marginTop: 30, backgroundColor: c.card, borderRadius: 18, padding: 16, gap: 10 }}>
      <T size={12} weight="800" caps muted>
        {title}
      </T>
      {items.map((t) => (
        <Row key={t} gap={10} style={{ alignItems: 'flex-start' }}>
          <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: c.accent, marginTop: 8 }} />
          <T size={14} style={{ flex: 1, lineHeight: 20 }}>
            {t}
          </T>
        </Row>
      ))}
    </View>
  );
}
