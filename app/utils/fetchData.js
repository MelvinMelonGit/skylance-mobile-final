import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export async function fetchData(path) {
    const { apiUrl } = Constants.expoConfig.extra

    const token = await SecureStore.getItemAsync('authToken')

    try {
         const response = await fetch(`${apiUrl}${path}`, {
            headers: {
                'Session-Token': token,
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Fetch failed:', error.message)
        throw error
    }
}