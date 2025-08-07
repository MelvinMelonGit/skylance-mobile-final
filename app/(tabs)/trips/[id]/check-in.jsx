import ButtonView from '@/components/ButtonView';
import CheckBox from '@/components/CheckBox';
import FlightData from '@/components/FlightData';
import { H3 } from '@/components/HeadingsView';
import ModalView from '@/components/ModalView';
import PassengerData from '@/components/PassengerData';
import RebookingFlightData from '@/components/RebookingFlightData';
import { useAuth } from '@/context/AuthContext';
import { useCheckedInFlights } from '@/context/CheckedInFlightsContext';
import { useSelectedFlight } from '@/context/SelectedFlightContext';
import { color } from '@/styles/color';
import { checkInFlight, rebookingCheckInFlight } from '@/utils/checkInFlight';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckIn() {
  const { id, rebooking } = useLocalSearchParams()
  const isRebooking = rebooking?.toLowerCase() === 'true'

  const router = useRouter()

  const { currentFlight, currentBooking, currentRebookedFlight, overBooking } = useSelectedFlight()
  const { setCheckedInFlightId } = useCheckedInFlights()
  const { currentUser, currentUserObj } = useAuth()

  const [modalVisible, setModalVisible] = useState(false)
  const [isAcknowledged, setIsAcknowledged] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckIn() {
    if (!isAcknowledged) {
      setError("You must acknowledge before check in.")
      return
    }

    try {
      if (isRebooking) {
        const data = await rebookingCheckInFlight(
          `/api/ConfirmFlight/CheckinForRebooking/`,
          currentUserObj.user?.id,
          currentRebookedFlight.id,
          overBooking.overbookingDetailId,
          overBooking.finalCompensationAmount
        )
        setCheckedInFlightId(data.checkInId)
      }
      else {
        const data2 = await checkInFlight(
          `/api/ConfirmFlight/NormalCheckIn`,
          currentUserObj.user?.id,
          currentFlight.flightBookingDetailId,
        )
        setCheckedInFlightId(data2.checkInId)
      }

      setModalVisible(true)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={styles.container}>
          <PassengerData currentUser={currentUser} currentBooking={currentBooking}/>
          { isRebooking ?
          ( <RebookingFlightData flight={currentRebookedFlight} />) :
          ( <FlightData flight={currentFlight} />)
          }
          <H3 textColor={color.intermediate}>Please do not bring these items:</H3>
          <View style={styles.warnings}>
            <View style={styles.warningsInner}>
              <FontAwesome5 name="skull-crossbones" size={50} color={color.black} />
              <Text style={styles.iconText}>Toxic Chemicals</Text>
              <MaterialCommunityIcons name="block-helper" size={70} color={color.red} style={styles.warningsIcons}/>
            </View>
            <View style={styles.warningsInner}>
              <FontAwesome5 name="fire" size={50} color={color.black} />
              <Text style={styles.iconText}>Flammable Items</Text>
              <MaterialCommunityIcons name="block-helper" size={70} color={color.red} style={styles.warningsIcons}/>
            </View>
            
            <View style={styles.warningsInner}>
              <FontAwesome5 name="bomb" size={50} color={color.black} />
              <Text style={styles.iconText}>Explosive Goods</Text>
              <MaterialCommunityIcons name="block-helper" size={70} color={color.red} style={styles.warningsIcons}/>
            </View>
            
            <View style={styles.warningsInner}>
              <FontAwesome5 name="spray-can" size={50} color={color.black} />
              <Text style={styles.iconText}>Aerosols & Sprays</Text>
              <MaterialCommunityIcons name="block-helper" size={70} color={color.red} style={styles.warningsIcons}/>
            </View>
            
            <View style={styles.warningsInner}>
              <Ionicons name="warning" size={50} color={color.black} />
              <Text style={styles.iconText}>Corrosive Materials</Text>
              <MaterialCommunityIcons name="block-helper" size={70} color={color.red} style={styles.warningsIcons}/>
            </View>

            <View style={styles.warningsInner}>
               <MaterialCommunityIcons name="propane-tank" size={50} color={color.black} />
               <Text style={styles.iconText}>Propane Gas</Text>
               <MaterialCommunityIcons name="block-helper" size={70} color={color.red} style={styles.warningsIcons}/>
            </View>
            
          </View>
          <CheckBox
            checked={isAcknowledged}
            onChange={setIsAcknowledged}
          >I acknowledge my details above are correct.</CheckBox>
          {error ? <Text style={{ color: color.red, marginBottom: 10 }}>{error}</Text> : null}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <ButtonView onPress={() => {
              handleCheckIn()
            }}>Check In</ButtonView>
          </View>
          <ModalView
             visible={modalVisible}
             onClose={() => {
              setModalVisible(false)
              router.push('/boarding')
            }}
             onPress={() => {
              setModalVisible(false)
              router.push('/boarding')
            }}
             title="Check In Success!"
             content='Congratulations! You have successfully checked in!'
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
  warnings: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: color.white,
    width: '100%',
    gap: 30,
    padding: 20,
    paddingVertical: 30,

    borderRadius: 5,
    shadowColor: color.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  warningsInner: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
    position: 'relative',
    overflow: 'visible', 
  },
  warningsIcons: {
    position: 'absolute',
    top: -10
  },
  iconText: {
    textAlign: 'center',
    fontWeight: 500
  }
})