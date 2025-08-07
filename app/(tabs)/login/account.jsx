import ButtonView from '@/components/ButtonView';
import { H1 } from '@/components/HeadingsView';
import { useAuth } from '@/context/AuthContext';
import { useCheckedInFlights } from '@/context/CheckedInFlightsContext';
import { logoutUser } from '@/utils/AuthCheck';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Account() {
  const { currentUser, isLoggedIn, logout, setCurrentUserObj } = useAuth()
  const { setCheckedInFlights, setCheckedInFlightId } = useCheckedInFlights()

  const [error, setError] = useState('')

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutUser()
      setCurrentUserObj(null)
      setCheckedInFlights([])
      setCheckedInFlightId('')
      logout()
      router.push('/')
    } catch (err) {
      setError(err.message)
      Alert.alert('Logout Error', err.message)
    }
  }

  return (
    <>
      <H1>Welcome { isLoggedIn && currentUser }!</H1>
      <ButtonView onPress={handleLogout}>Logout</ButtonView>
    </>
  )
}