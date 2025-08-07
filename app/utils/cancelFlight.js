import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export async function fetchCancelFlight(path, flightBookingDetailId) {
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
        console.error('Fetch failed:', error.message)
        throw error
    }
}

export async function cancelFlight(path, flightBookingDetailId) {
    const { apiUrl } = Constants.expoConfig.extra
    const token = await SecureStore.getItemAsync('authToken')

    try {
        const response = await fetch(`${apiUrl}${path}?flightBookingDetailId=${flightBookingDetailId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Session-Token': token,
            },
        })

        if (!response.ok) {
            throw new Error(`Cancel Flight failed! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Cancel Flight failed:', error.message)
        throw error
    }
}