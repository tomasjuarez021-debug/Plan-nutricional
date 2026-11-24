/* Piezas de interfaz: blanco/negro, letra pesada y apretada, un solo color
   de acento naranja. */
import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import { Platform, Pressable, Text, View, useColorScheme, type TextStyle, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export const Fonts = {
  '400': 'Inter_400Regular',
  '500': 'Inter_500Medium',
  '600': 'Inter_600SemiBold',
  '700': 'Inter_700Bold',
  '800': 'Inter_800ExtraBold',
  '900': 'Inter_900Black',
} as const;

const LIGHT = {
  bg: '#ffffff',
  card: '#f6f6f4',
  line: '#e8e8e5',
  text: '#121212',
  muted: '#7a7a76',
  accent: '#fc5a1c',
  accentSoft: '#ffece3',
  onAccent: '#ffffff',
  track: '#ececea',
};
const DARK: typeof LIGHT = {
  bg: '#0c0c0c',
  card: '#171716',
  line: '#262624',
  text: '#f4f4f2',
  muted: '#8c8c87',
  accent: '#fc5a1c',
  accentSoft: '#2e1709',
  onAccent: '#ffffff',
  track: '#262624',
};
export type Palette = typeof LIGHT;

export function useColors(): Palette {
  return useColorScheme() === 'dark' ? DARK : LIGHT;
}

export function tap(kind: 'light' | 'success' = 'light') {
  if (Platform.OS === 'web') {
    (globalThis.navigator as Navigator | undefined)?.vibrate?.(kind === 'success' ? [10, 30, 14] : 6);
    return;
  }
  if (kind === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

type Weight = keyof typeof Fonts;

export function T({
  children,
  size = 15,
  weight = '400',
  muted,
  color,
  caps,
  style,
  numberOfLines,
  center,
}: {
  children: ReactNode;
  size?: number;
  weight?: Weight;
  muted?: boolean;
  color?: string;
  /* Etiqueta chica en mayúsculas, con aire entre letras. */
  caps?: boolean;
  style?: TextStyle;
  numberOfLines?: number;
  center?: boolean;
}) {
  const c = useColors();
  const tight = size >= 20 ? -size * 0.035 : size >= 16 ? -0.3 : 0;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: size,
          fontFamily: Fonts[weight],
          color: color ?? (muted ? c.muted : c.text),
          letterSpacing: caps ? 1.2 : tight,
          textTransform: caps ? 'uppercase' : undefined,
          textAlign: center ? 'center' : undefined,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export function Row({ children, gap = 8, style }: { children: ReactNode; gap?: number; style?: ViewStyle }) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center', gap }, style]}>{children}</View>;
}

/* Anillo de progreso. */
export function Ring({ size, value, stroke = 3, color, track }: { size: number; value: number; stroke?: number; color?: string; track?: string }) {
  const c = useColors();
  const r = (size - stroke) / 2;
  const len = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={track ?? c.track} strokeWidth={stroke} fill="none" />
      {v > 0 ? (
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color ?? c.accent}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${len * v} ${len}`}
        />
      ) : null}
    </Svg>
  );
}

/* Tilde dentro de un círculo: hecho / no hecho. */
export function Check({ on, size = 28, onPress }: { on: boolean; size?: number; onPress?: () => void }) {
  const c = useColors();
  return (
    <Pressable
      hitSlop={10}
      onPress={() => {
        tap(on ? 'light' : 'success');
        onPress?.();
      }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: on ? 0 : 2,
        borderColor: c.line,
        backgroundColor: on ? c.accent : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {on ? (
        <Svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24">
          <Path d="M4 12.5l5 5L20 6.5" stroke={c.onAccent} strokeWidth={3.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      ) : null}
    </Pressable>
  );
}

/* Selector de dos o tres opciones, en píldora. */
export function Segmented<K extends string>({ value, options, onChange }: { value: K; options: { id: K; label: string }[]; onChange: (k: K) => void }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', backgroundColor: c.card, borderRadius: 999, padding: 3 }}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <Pressable
            key={o.id}
            onPress={() => {
              tap();
              onChange(o.id);
            }}
            style={{ paddingHorizontal: 16, paddingVertical: 7, borderRadius: 999, backgroundColor: on ? c.text : 'transparent' }}>
            <T size={13} weight="700" color={on ? c.bg : c.muted}>
              {o.label}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Divider({ style }: { style?: ViewStyle }) {
  const c = useColors();
  return <View style={[{ height: 1, backgroundColor: c.line }, style]} />;
}
