import { H3 } from '@/components/HeadingsView';
import { color } from '@/styles/color';
import { StyleSheet, View } from 'react-native';

export default function PassengerData({currentUser, currentBooking}) {
  return (
    <View style={styles.inner}>
        <View style={styles.innerLeftCol}>
            <H3 textColor={color.intermediate}>{currentUser}</H3>
        </View>
        <View style={styles.innerRightCol}>
             <H3 textColor={color.intermediate}>Aircraft #{currentBooking.aircraftModel}</H3>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inner: {
    minWidth: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    padding: 20,

    backgroundColor: color.white,
    shadowColor: color.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,

    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: '100%',
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