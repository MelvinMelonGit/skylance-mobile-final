import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export async function fetchFlight(path) {
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
        return data
    } catch (error) {
        console.error('Fetch failed:', error.message)
        throw error
    }
}

export async function fetchFlightValidate(path) {
    const { apiUrl } = Constants.expoConfig.extra

    const token = await SecureStore.getItemAsync('authToken')

    try {
        const response = await fetch(`${apiUrl}${path}`)

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Fetch Validate failed:', error.message)
        throw error
    }
}

export async function fetchCheckedInFlights(path) {
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
        console.error('Fetch Checked In Flight failed:', error.message)
        throw error
    }
}