import { useAuth } from '@/context/AuthContext';
import { color } from '@/styles/color';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';

const screenOptions = {
  headerStyle: { backgroundColor: color.white },
  headerTintColor: color.intermediate,
  headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
  headerTitleAlign: 'center',
}

export default function TabLayout() {
  const { currentUser, isLoggedIn } = useAuth()
  const router = useRouter()

  return (
      <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: color.intermediate,     
        tabBarInactiveTintColor: color.gray,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home'

          if (route.name === 'trips') iconName = 'airplane'
          else if (route.name === 'boarding') iconName = 'ticket'
          else if (route.name === 'login' && isLoggedIn) iconName = 'person-circle-sharp'
          else if (route.name === 'login' && !isLoggedIn) iconName = 'person'

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      >
        <Tabs.Screen name="index"
          options={{
            title: 'Home',
            headerTitle: `Hey ${ isLoggedIn ? currentUser : 'There' }!`,
            headerBackVisible: false,
            headerStyle: screenOptions.headerStyle,
            headerTintColor: screenOptions.headerTintColor,
            headerTitleStyle: screenOptions.headerTitleStyle,
            headerTitleAlign: screenOptions.headerTitleAlign
          }}
            listeners={{
              tabPress: (e) => {
              e.preventDefault()
              router.push('/') // /index
            },
          }}
        />
        <Tabs.Screen name="trips"
            options={{ title: 'Trips', headerShown: false }}
            listeners={{
              tabPress: (e) => {
              e.preventDefault()
              router.push('/trips') // /trips/index
            },
          }}
        />
        <Tabs.Screen
          name="boarding"
          options={{
              title: 'Boarding Pass',
              headerShown: false,
            }}
          listeners={{
              tabPress: (e) => {
              e.preventDefault()
              router.push('/boarding') // /boarding/index
            },
          }}
         />
         <Tabs.Screen
            name="login"
            options={{
              title: isLoggedIn ? 'Account' : 'Login',
              headerShown: false,
            }}
            listeners={{
              tabPress: (e) => {
              e.preventDefault() 
              router.push('/login') // /login/index
            },
        }}
      />
    </Tabs>
  )
}