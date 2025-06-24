import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#374151',
          backgroundColor: '#111827',
          paddingTop: 8,
          paddingBottom: 40,
          height: 80,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Carteira',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="insert-chart-outlined" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="investments"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center">
              <View
                className={`-mt-6 h-14 w-14 items-center justify-center rounded-full ${
                  focused ? 'bg-primary-dark' : 'bg-primary'
                }`}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 8,
                }}>
                <Ionicons name="trending-up-outline" size={30} color="#FFFFFF" />
              </View>
              <Text className="mt-2 w-full text-sm font-bold text-white">Investir</Text>
            </View>
          ),
          title: '',
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transações',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
