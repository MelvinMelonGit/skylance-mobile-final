import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export async function fetchOverbooking(path, flightBookingDetailId) {
    const { apiUrl } = Constants.expoConfig.extra

    const token = await SecureStore.getItemAsync('authToken')

    try {
         const response = await fetch(`${apiUrl}${path}?flightBookingDetailId=${flightBookingDetailId}`, {
            headers: {
                'Session-Token': token,
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Fetch overbooking failed:', error.message)
        throw error
    }
}