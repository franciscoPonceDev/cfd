import '../global.css';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Logo } from '../components/Logo';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'login',
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          headerTitle: () => (
            <View className="items-center">
              <Logo size="sm" />
            </View>
          ),
          headerStyle: {
            backgroundColor: '#111827', // background.DEFAULT
          },
          headerTintColor: '#F9FAFB', // text.DEFAULT
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          headerStyle: {
            backgroundColor: '#111827', // background.DEFAULT
          },
          headerTintColor: '#F9FAFB', // text.DEFAULT
        }}
      />
    </Stack>
  );
}
