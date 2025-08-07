import { H3 } from '@/components/HeadingsView';
import { color } from '@/styles/color';
import { formatDate, formatTime } from '@/utils/formatDateTime';
import { StyleSheet, Text, View } from 'react-native';

export default function FlightData({flight}) {

    return (
        <View style={styles.container}>
          <View style={styles.inner}>
            <View style={styles.innerLeftCol}>
              <H3 textColor={color.intermediate}>
                  {flight.flightNumber}
              </H3>
              <Text style={styles.text}>
                  Departure Time: {formatTime(flight.departureTime)}
              </Text>
              <Text style={styles.text}>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - 
              </Text>
          </View>
          { flight.departureTime && (
            <View>
              <Text style={styles.text}>
                  {formatDate(flight.departureTime)}
              </Text>
            </View>
          )}
          </View>
          <Text style={styles.text}>
            Origin: {flight.origin}
          </Text>
          <Text style={styles.text}>
            Destination: {flight.destination} 
          </Text>
        </View>
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
    alignItems: 'flex-start',
  },
  text: {
    color: color.gray,
  },
  overbooked: {
    backgroundColor: color.red,
    color: color.white,
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  safe: {
    backgroundColor: color.intermediate,
    color: color.white,
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  }
})