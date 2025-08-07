import { color } from '@/styles/color';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function FlightInfographic({currentBooking}) {
    return (
        <View style={styles.infographic}>
            <View style={styles.infoView}>
                <Text style={styles.text}>{currentBooking.originAirportCode}</Text>
                <Text style={styles.textSmall}>{currentBooking.originAirportName}</Text>
            </View>
            <View style={styles.flightPathContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='airplane-outline' size={30} color={color.gray} />
                <Text style={styles.flightPath}> - - - - - - - - - - -</Text>
                </View>
                <Text style={{ color: color.gray}}>{currentBooking.flightDuration}</Text>
            </View>
            <View style={styles.infoView}>
                <Text style={styles.text}>{currentBooking.destinationAirportCode}</Text>
                <Text style={styles.textSmall}>{currentBooking.destinationAirportName}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  infographic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
  },
  flightPathContainer: {
    alignItems: 'center'
  },
  infoView :{
    alignItems: 'center',
    width: '20%',
    flexWrap: 'wrap'
  },
  flightPath: {
    color: color.gray,
    fontSize: 30
  },
  text: {
    fontSize: 30,
    fontWeight: 400
  },
  textSmall: {
    fontSize: 12,
    fontWeight: 400,
    textAlign: 'center'
  }
})