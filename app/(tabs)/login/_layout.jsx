import { useAuth } from '@/context/AuthContext';
import { color } from '@/styles/color';
import { Stack } from 'expo-router';

const screenOptions = {
  headerStyle: { backgroundColor: color.white },
  headerTintColor: color.intermediate,
  headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
  headerTitleAlign: 'center'
}

export default function LoginStackLayout() {
  const { isLoggedIn } = useAuth()

  return (
    <Stack screenOptions={screenOptions}>
      {isLoggedIn ?
        (
          <Stack.Screen name="index"
            options={{
                // title: 'Logout',
                headerTitle: 'Account',
                headerBackVisible: false
              }}
          />
        ):
        (
          <Stack.Screen name="index"
            options={{
                // title: 'Login',
                headerTitle: 'Login',
                headerBackVisible: false
              }}
          />
        )
      }
      <Stack.Screen name="register"
        options={{
            // title: 'Register',
            headerTitle: 'Register',
          }}
      />
    </Stack> 
  )
}