import ButtonView from '@/components/ButtonView';
import { H3 } from '@/components/HeadingsView';
import RebookingFlightContainer from '@/components/RebookingFlightContainer';
import { useSelectedFlight } from '@/context/SelectedFlightContext';
import { fetchData } from '@/utils/fetchData';
import { fetchFlight } from '@/utils/fetchFlight';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AvailableFlight() {
  const { id } = useLocalSearchParams()

  const insets = useSafeAreaInsets()
  
  const router = useRouter()

  const { setCurrentRebookedFlight } = useSelectedFlight()

  const [flights, setFlights] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData(`/api/RebookingFlights`)
      .then(setFlights)
      .catch(err => setError(err.message))
  }, [])

  async function handleSelection(item) {
    setCurrentRebookedFlight(item)
    const data = await fetchFlight(`/api/RebookingFlights/${item.id}`)
    router.push({
      pathname: `/trips/${item.aircraft.flightNumber}/check-in`,
      params: { rebooking: true }
    })
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <H3>Don't want to rebook?</H3>
          <ButtonView warning onPress={() => {
            router.push(`/trips/${id}/cancel-flight`)
          }}>Cancel Flight</ButtonView>
          <View style={[styles.innerView, { paddingBottom: insets.bottom + 160}]}>
            <FlatList
            data={flights}
            renderItem={({ item, index }) => {
              return (
                <RebookingFlightContainer
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
          </View>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    alignItems: 'center'
  },
})