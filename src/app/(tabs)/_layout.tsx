import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';
import type { ComponentProps } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, tap, useColors } from '@/components/ui';

type Icon = ComponentProps<typeof Ionicons>['name'];

const TABS: { name: string; title: string; icon: Icon; on: Icon }[] = [
  { name: 'index', title: 'Hoy', icon: 'today-outline', on: 'today' },
  { name: 'semana', title: 'Semana', icon: 'calendar-clear-outline', on: 'calendar-clear' },
  { name: 'compras', title: 'Compras', icon: 'bag-handle-outline', on: 'bag-handle' },
];

export default function TabLayout() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenListeners={{ tabPress: () => tap() }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.accent,
        tabBarInactiveTintColor: c.muted,
        tabBarStyle: {
          backgroundColor: c.bg,
          borderTopColor: c.line,
          height: 66 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 10),
        },
        tabBarLabelStyle: { fontFamily: Fonts['700'], fontSize: 10.5 },
        sceneStyle: { backgroundColor: c.bg },
      }}>
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? tab.on : tab.icon} color={String(color)} size={22} />,
          }}
        />
      ))}
    </Tabs>
  );
}
