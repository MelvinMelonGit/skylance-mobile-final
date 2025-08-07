import { color } from '@/styles/color';
import { formatDate, formatTime } from '@/utils/formatDateTime';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { H3 } from './HeadingsView';

export default function RebookingFlightContainer({flight, onPress}) {
  return (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        >
        <View style={styles.inner}>
            <View style={styles.innerLeftCol}>
                <H3 textColor={color.intermediate}>
                    {flight.aircraft.flightNumber} { flight.departureTime && `- ${formatDate(flight.departureTime)}`}
                </H3>
                <Text style={styles.text}>
                    Departure Time: {formatTime(flight.departureTime)}
                </Text>
                <Text style={styles.text}>
                    - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                </Text>
            </View>
        </View>
        <Text style={styles.text}>
           Origin: {flight.originAirport.name}
        </Text>
        <Text style={styles.text}>
          Destination: {flight.destinationAirport.name} 
        </Text>
        { flight.departureTime && (
          <View>
            <Text style={styles.text}>
              Compensation: S${flight.compensation}
            </Text>
          </View>
        )}
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
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  innerLeftCol: {
    alignItems: 'flex-start'
  },
  text: {
    color: color.gray
  },
  overbooked: {
    backgroundColor: color.red,
    color: color.white,
    fontWeight: 500,
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  safe: {
    backgroundColor: color.green,
    color: color.white,
    fontWeight: 500,
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  }
})