import { color } from '@/styles/color';
import { Stack } from 'expo-router';

const screenOptions = {
  headerStyle: { backgroundColor: color.white },
  headerTintColor: color.intermediate,
  headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
  headerTitleAlign: 'center'
}

export default function LoginStackLayout() {
  return (
    <Stack screenOptions={screenOptions}>
        <Stack.Screen name="index"
          options={{
            // title: 'Trips',
            headerTitle: 'Your Trips',
            headerBackVisible: false
          }}
        />

      <Stack.Screen name="[id]"
        options={{
            headerShown: false,
          }}
      />
    </Stack> 
  )
}