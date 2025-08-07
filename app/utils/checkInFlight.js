import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export async function checkInFlight(
    path,
    appUserId,
    flightBookingDetailId,
) {
    const { apiUrl } = Constants.expoConfig.extra
    const token = await SecureStore.getItemAsync('authToken')

    console.log(`appUserId: ${appUserId},
    flightBookingDetailId: ${flightBookingDetailId}` )

    try {
        const response = await fetch(`${apiUrl}${path}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                // 'Session-Token': token 
            },
            body: JSON.stringify({
                appUserId,
                flightBookingDetailId,
            }),
        })

        if (!response.ok) {
            throw new Error(`Check In failed! status: ${response.status}`)
        }

        const data = await response.text()
        return data
    } catch (error) {
        console.error('Check In failed:', error.message)
        throw error
    }
}

export async function rebookingCheckInFlight(
    path,
    appUserId,
    flightDetailId,
    overbookingDetailId,
    finalCompensationAmount 
) {
    const { apiUrl } = Constants.expoConfig.extra
    const token = await SecureStore.getItemAsync('authToken')

    console.log(`appUserId: ${appUserId},
    flightDetailId: ${flightDetailId},
    overbookingDetailId: ${overbookingDetailId},
    finalCompensationAmount: ${finalCompensationAmount}` )

    try {
        const response = await fetch(`${apiUrl}${path}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                // 'Session-Token': token 
            },
            body: JSON.stringify({
                appUserId,
                flightDetailId,
                overbookingDetailId,
                finalCompensationAmount
            }),
        })

        if (!response.ok) {
            throw new Error(`Check In failed! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Check In failed:', error.message)
        throw error
    }
}