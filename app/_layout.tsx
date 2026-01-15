import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { ProgressProvider } from '@/contexts/ProgressContext';

export const unstable_settings = {
  initialRouteName: 'index',
};

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <NavThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="lesson/[id]" options={{ title: 'Lesson' }} />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <RootLayoutNav />
      </ProgressProvider>
    </ThemeProvider>
  );
}
