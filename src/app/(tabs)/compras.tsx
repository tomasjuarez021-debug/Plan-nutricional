/* Compras: lista generada del plan, separada por verdulería, supermercado y
   dietética, con cantidades justas para los días y personas elegidos. */
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Share, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Check, Divider, Row, Segmented, T, tap, useColors } from '@/components/ui';
import { WEEK, type Person } from '@/data/plan';
import { buildList, listText } from '@/lib/shopping';
import { clearBought, toggleBought, useStore } from '@/lib/store';

type Who = 'ambos' | Person;
const PEOPLE: Record<Who, Person[]> = { ambos: ['el', 'ella'], el: ['el'], ella: ['ella'] };
const ALL = [0, 1, 2, 3, 4, 5, 6];

export default function Shopping() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { bought } = useStore();
  const [who, setWho] = useState<Who>('ambos');
  const [days, setDays] = useState<number[]>(ALL);
  const sections = useMemo(() => buildList(days, PEOPLE[who]), [days, who]);
  const count = sections.reduce((s, x) => s + x.lines.length, 0);
  const got = sections.reduce((s, x) => s + x.lines.filter((l) => bought[l.id]).length, 0);

  const toggleDay = (i: number) => {
    tap();
    setDays((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i].sort()));
  };

  const share = () => {
    tap();
    const label = days.length === 7 ? 'semana completa' : days.map((d) => WEEK[d].name).join(', ');
    const title = `Lista de compras · ${label}${who === 'ambos' ? '' : ` · ${who === 'el' ? 'Él' : 'Ella'}`}`;
    Share.share({ message: listText(sections, title) }).catch(() => {});
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View style={{ flex: 1 }}>
          <T size={12} weight="700" caps muted>
            {got}/{count} en el changuito
          </T>
          <T size={34} weight="900">
            Compras
          </T>
        </View>
        <Pressable onPress={share} hitSlop={8} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: c.card, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="share-outline" size={20} color={c.text} />
        </Pressable>
      </Row>

      <Row style={{ marginTop: 20, justifyContent: 'space-between' }}>
        <T size={12} weight="800" caps muted>
          Para
        </T>
        <Segmented<Who>
          value={who}
          options={[
            { id: 'ambos', label: 'Ambos' },
            { id: 'el', label: 'Él' },
            { id: 'ella', label: 'Ella' },
          ]}
          onChange={setWho}
        />
      </Row>

      <Row style={{ marginTop: 16, justifyContent: 'space-between' }}>
        <T size={12} weight="800" caps muted>
          Días
        </T>
        <Pressable
          onPress={() => {
            tap();
            setDays(days.length === 7 ? [] : ALL);
          }}>
          <T size={12} weight="700" color={c.accent}>
            {days.length === 7 ? 'Ninguno' : 'Toda la semana'}
          </T>
        </Pressable>
      </Row>
      <Row style={{ justifyContent: 'space-between', marginTop: 10 }} gap={0}>
        {WEEK.map((d, i) => {
          const on = days.includes(i);
          return (
            <Pressable
              key={d.name}
              onPress={() => toggleDay(i)}
              style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? c.accent : c.card }}>
              <T size={14} weight="800" color={on ? c.onAccent : c.muted}>
                {d.short}
              </T>
            </Pressable>
          );
        })}
      </Row>

      {sections.length === 0 ? (
        <T muted center style={{ marginTop: 40 }}>
          Elegí al menos un día.
        </T>
      ) : null}

      {sections.map((s) => (
        <View key={s.shop} style={{ marginTop: 30 }}>
          <Row style={{ justifyContent: 'space-between', marginBottom: 4 }}>
            <T size={22} weight="900">
              {s.name}
            </T>
            <T size={12} weight="700" muted>
              {s.lines.filter((l) => bought[l.id]).length}/{s.lines.length}
            </T>
          </Row>
          {s.lines.map((l, i) => {
            const on = !!bought[l.id];
            return (
              <View key={l.id}>
                {i > 0 ? <Divider /> : null}
                <Pressable
                  onPress={() => {
                    tap();
                    toggleBought(l.id);
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, opacity: on ? 0.45 : 1 }}>
                  <Check on={on} size={24} onPress={() => toggleBought(l.id)} />
                  <View style={{ flex: 1 }}>
                    <T size={15.5} weight="600" style={on ? { textDecorationLine: 'line-through' } : undefined}>
                      {l.name}
                    </T>
                    {l.note ? (
                      <T size={12} muted>
                        {l.note}
                      </T>
                    ) : null}
                  </View>
                  <T size={16} weight="900">
                    {l.qty}
                  </T>
                </Pressable>
              </View>
            );
          })}
        </View>
      ))}

      {got > 0 ? (
        <Pressable
          onPress={() => {
            tap();
            clearBought();
          }}
          style={{ alignSelf: 'center', marginTop: 30, paddingVertical: 10, paddingHorizontal: 18, borderRadius: 999, backgroundColor: c.card }}>
          <T size={13} weight="700">
            Empezar lista nueva
          </T>
        </Pressable>
      ) : null}

      <T size={12} muted center style={{ marginTop: 24, lineHeight: 18 }}>
        Legumbres y cereales en seco. Verduras libres con cantidad estimada.{'\n'}Incluye lino molido diario (omega-3).
      </T>
    </ScrollView>
  );
}
