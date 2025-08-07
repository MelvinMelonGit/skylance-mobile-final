import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export async function loginUser(email, password) {
    const { apiUrl } = Constants.expoConfig.extra

    try {
        const response = await fetch(`${apiUrl}/api/Auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error(`Login failed! status: ${response.status}`)
        }

        const data = await response.json()
        await SecureStore.setItemAsync('authToken', data.token)
        return data
    } catch (error) {
        console.error('Login failed:', error.message)
        throw error
    }
}

export async function logoutUser() {
  const { apiUrl } = Constants.expoConfig.extra
  const token = await SecureStore.getItemAsync('authToken')

  if (!token) {
    console.warn('No auth token found to logout')
    return
  }

  try {
    const response = await fetch(`${apiUrl}/api/Auth/logout`, {
      method: 'POST',
      headers: {
        'Session-Token': token,
      },
    })

    if (!response.ok) {
      throw new Error(`Logout failed! status: ${response.status}`)
    }

    await SecureStore.deleteItemAsync('authToken')
  } catch (error) {
    console.error('Logout failed:', error.message)
    throw error
  }
}