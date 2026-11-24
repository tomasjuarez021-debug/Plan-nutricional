import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Inter_800ExtraBold } from '@expo-google-fonts/inter/800ExtraBold';
import { Inter_900Black } from '@expo-google-fonts/inter/900Black';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { Fonts, useColors } from '@/components/ui';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const c = useColors();
  const scheme = useColorScheme();
  const [fonts] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black });

  useEffect(() => {
    if (fonts) SplashScreen.hideAsync();
  }, [fonts]);

  if (!fonts) return null;

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: c.text,
          headerStyle: { backgroundColor: c.bg },
          headerTitleStyle: { fontFamily: Fonts['800'], fontSize: 17 },
          contentStyle: { backgroundColor: c.bg },
        }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="comida" options={{ presentation: 'modal', headerShown: true, title: '' }} />
      </Stack>
    </>
  );
}
