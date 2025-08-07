import ButtonView from '@/components/ButtonView';
import CustomNavTabsView from '@/components/CustomNavTabsView';
import FlightContainer from '@/components/FlightContainer';
import { H3 } from '@/components/HeadingsView';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { useCheckedInFlights } from '@/context/CheckedInFlightsContext';
import { useSelectedFlight } from '@/context/SelectedFlightContext';
import { color } from '@/styles/color';
import { fetchData } from '@/utils/fetchData';
import { fetchFlight, fetchFlightValidate } from '@/utils/fetchFlight';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { isLoggedIn } = useAuth()
  const [activeTab, setActiveTab] = useState('UpcomingFlights')

  const insets = useSafeAreaInsets()

  const router = useRouter()

  const { setCurrentFlight, setCurrentBooking, setCurrentFlightValidate } = useSelectedFlight()
  const { checkedInFlights } = useCheckedInFlights()


  const [flights, setFlights] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      fetchData(`/api/Flights/${activeTab}`)
        .then(setFlights)
        .catch(err => setError(err.message))
    }
  }, [activeTab, checkedInFlights])

  async function handleSelection(item) {
    if (activeTab === 'UpcomingFlights') {
      setCurrentFlight(item)
      const data = await fetchFlight(`/Trip/${item.flightBookingDetailId}`)
      setCurrentBooking(data)
      const data2 = await fetchFlightValidate(`/Trip/${item.flightBookingDetailId}/checkin/validate`)
      setCurrentFlightValidate(data2)
      router.push(
        `/trips/${item.flightNumber}`
      )
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <>
          <View style={styles.outerView}>
              <CustomNavTabsView activeTab={activeTab} setActiveTab={setActiveTab} />
          </View>
          { !flights && <LoadingSpinner /> }
          <View style={[styles.innerView, { paddingBottom: insets.bottom + 50}]}>
            { flights.length === 0 ?
            (<H3 textColor={color.intermediate}>No flights available!</H3>) : 
            ( 
              <FlatList
              data={flights}
              renderItem={({ item }) => {
                return (
                  <FlightContainer
                    flight={item}
                    onPress={() => {
                      handleSelection(item)
                    }}
                  />
                )
              }}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
            />
            )}
          </View>
        </>
      ) : (
        <View style={styles.centered}>
          <H3 textColor={color.intermediate}>Login to see your trips!</H3>
          <ButtonView onPress={() => {
              router.push('/login')
          }}>Login</ButtonView>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  outerView: {
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  innerView: {
    width: '100%',
    paddingHorizontal: '5%',
    alignItems: 'center'
  },
  list: {
    flex: 2,
    width: '100%',
  },
  centered: {
    flex: 1,
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})