import { useAuth } from '@/context/AuthContext';
import { color } from '@/styles/color';
import { Stack } from 'expo-router';

const screenOptions = {
  headerStyle: { backgroundColor: color.white },
  headerTintColor: color.intermediate,
  headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
  headerTitleAlign: 'center'
}

export default function BoardingStackLayout() {
  const { isLoggedIn, currentUser } = useAuth()

  return (
    <Stack screenOptions={screenOptions}>
        <Stack.Screen name="index"
          options={{
            // title: 'Boarding Pass',
            headerTitle: `Boarding Pass ${isLoggedIn ? `for ${currentUser}` : ''}`,
            headerBackVisible: false
          }}
        />
    </Stack> 
  )
}