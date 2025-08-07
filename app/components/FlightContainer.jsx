import { color } from '@/styles/color';
import { formatDate, formatTime } from '@/utils/formatDateTime';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { H3 } from './HeadingsView';

export default function FlightContainer({flight, onPress}) {
  return (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        >
        <View style={styles.inner}>
            <View style={styles.innerLeftCol}>
                <H3 textColor={color.intermediate}>
                    {flight.flightNumber} { flight.departureTime && `- ${formatDate(flight.departureTime)}`}
                </H3>
                { flight.departureTime && (
                  <Text style={styles.text}>
                    Departure Time: {formatTime(flight.departureTime)}
                  </Text>
                )}
                <Text style={styles.text}>
                    - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                </Text>
            </View>
            { flight.departureTime && (
              <View style={styles.innerRightCol}>
            { flight.seatNumber === null ? (
              <View style={styles.pending}>
                <Text style={styles.tag}>
                    Proceed to Check In
                </Text>
              </View>
            ) : (
              <View style={styles.completed}>
                <Text style={styles.tag}>
                    Completed Check In
                </Text>
              </View>
            )}
            </View>
            ) }
        </View>
        <Text style={styles.text}>
           Origin: {flight.origin}
        </Text>
        <Text style={styles.text}>
          Destination: {flight.destination} 
        </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    borderRadius: 5,
    marginVertical: 10,
    padding: 20,

    backgroundColor: color.white,
    shadowColor: color.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  innerLeftCol: {
    alignItems: 'flex-start'
  },
  innerRightCol: {
    alignItems: 'flex-end'
  },
  text: {
    color: color.gray
  },
  completed: {
    backgroundColor: color.green,
    width: 100,
    fontWeight: 500,
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  pending: {
    backgroundColor: color.intermediate,
    width: 100,
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  tag: {
    color: color.white,
    textAlign: 'center',
    fontWeight: 500,
  }
})