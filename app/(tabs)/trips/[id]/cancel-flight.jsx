import ButtonView from '@/components/ButtonView';
import CheckBox from '@/components/CheckBox';
import FlightInfographic from '@/components/FlightInfographic';
import { H2, H3, P } from '@/components/HeadingsView';
import ModalView from '@/components/ModalView';
import { useSelectedFlight } from '@/context/SelectedFlightContext';
import { color } from '@/styles/color';
import { cancelFlight, fetchCancelFlight } from '@/utils/cancelFlight';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CancelFlight() {
  const { id } = useLocalSearchParams()

  const { currentFlight, currentBooking } = useSelectedFlight()

  const [cancelledSelection, setCancelledSelection] = useState({})
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [isAcknowledged, setIsAcknowledged] = useState(false)

  const router = useRouter()

  useEffect(() => {
      const fetchCancelFlightInfo = async () => {
        try {
          const data = await fetchCancelFlight(`/api/CancelFlight/cancelconfirmation`, currentFlight.flightBookingDetailId)
          setCancelledSelection(data)
        } catch (err) {
          setError(err.message)
        }
    }
  
    fetchCancelFlightInfo()
  }, [])

  async function handleCancel() {
    if (!isAcknowledged) {
      setError("You must acknowledge before cancelling the flight.")
      return
    }

    try {
      await cancelFlight(`/api/CancelFlight/excutecancel`, currentFlight.flightBookingDetailId)
      setModalVisible(true)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={styles.container}>
          <FlightInfographic currentBooking={currentBooking}/>
          <H2>Flight #{id}</H2>
          <H3 textColor={color.intermediate}>Full Compensation S${cancelledSelection.compensation}</H3>
          <Text style={styles.warning}>This action is permanent and cannot be undone.</Text>
          <H3 textColor={color.intermediate}>What's next?</H3>
          <P textAlign="center">The compensation amount will be credited into your designated bank account within three weeks upon the cancellation.</P>
          <CheckBox
            checked={isAcknowledged}
            onChange={setIsAcknowledged}
          >I acknowledge that this is not reversible.</CheckBox>
          {error ? <Text style={{ color: color.red, marginBottom: 10 }}>{error}</Text> : null}
          <ButtonView
            warning
            onPress={() => {
              handleCancel()
            }}
          >Cancel Flight</ButtonView>
          <ModalView
             visible={modalVisible}
             onClose={() => {
              setModalVisible(false)
              router.push('/')
            }}
             onPress={() => {
              setModalVisible(false)
              router.push('/')
            }}
             title="Flight Successfully Cancelled!"
             content='You have successfully cancelled your flight and received a full compensation'
             btnContent='Ok'
          />
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warning: {
    color: color.red,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20
  },
  text: {
    fontSize: 30,
    fontWeight: 400,
  }
})