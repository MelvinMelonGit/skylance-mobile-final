import BoardingPass from '@/components/BoardingPass';
import ButtonView from '@/components/ButtonView';
import { H3 } from '@/components/HeadingsView';
import { useAuth } from '@/context/AuthContext';
import { useCheckedInFlights } from '@/context/CheckedInFlightsContext';
import { color } from '@/styles/color';
import { fetchCheckedInFlights } from '@/utils/fetchFlight';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { isLoggedIn, currentUserObj } = useAuth()

  const { checkedInFlights, setCheckedInFlights, checkedInFlightId } = useCheckedInFlights()

  const router = useRouter()

  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn) return
      const fetchCheckedInFlightsInfo = async () => {
        try {
          if (checkedInFlightId === '' ) {
            const data = await fetchCheckedInFlights(`/api/BoardingPass/${currentUserObj.user?.id}`)
            setCheckedInFlights(data.boardingPasses)
          }
          else {
            const data2 = await fetchCheckedInFlights(`/api/BoardingPass/${checkedInFlightId}/boardingPass`)
            setCheckedInFlights(prev => [...prev, data2])
          }
        } catch (err) {
          setError(err.message)
        }
    }
  
    fetchCheckedInFlightsInfo()
  }, [isLoggedIn, checkedInFlightId])

  return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={styles.container}>
          { isLoggedIn ? (
            <>
              { checkedInFlights.length === 0 ? (
                <>
                  <H3 textColor={color.intermediate}>Check In to see your boarding pass!</H3>
                  <ButtonView onPress={() => {
                    router.push('/trips')
                  }}>Check In</ButtonView>
                </>
              ) : (
                <FlatList
                  data={checkedInFlights}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => item.toString() + index}
                  renderItem={({ item, index }) => (
                    <View style={{ marginRight: index === checkedInFlights.length - 1 ? 0 : 20 }}>
                      <BoardingPass boardingPass={item}/>
                    </View>
                  )}
                />
              )}
            </>
          ) : (
            <>
              <H3 textColor={color.intermediate}>Login to see your boarding pass!</H3>
              <ButtonView onPress={() => {
                router.push('/login')
              }}>Login</ButtonView>
            </>
          )}
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
})