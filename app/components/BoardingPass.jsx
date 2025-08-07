import { H2 } from '@/components/HeadingsView';
import { color } from '@/styles/color';
import { formatTime } from '@/utils/formatDateTime';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function BoardingPass({ boardingPass }) {
    return (
        <View style={styles.container}>
            <H2>Flight #{boardingPass.flightNumber}</H2>
            <View style={styles.pass}>

                <View style={styles.inner}>
                    <Text style={styles.text}>Origin Airport</Text>
                    <Text style={styles.content}>{boardingPass.originAirportName}</Text>
                </View>
            
                <View style={styles.inner}>
                    <Text style={styles.text}>Aircraft</Text>
                    <Text style={styles.content}>{boardingPass.terminal}</Text>
                </View>
                
                <View style={styles.inner}>
                    <Text style={styles.text}>Destination Airport</Text>
                    <Text style={styles.content}>{boardingPass.destinationAirportName}</Text>
                </View>

                <View style={styles.inner}>
                    <Text style={styles.text}>Airline</Text>
                    <Text style={styles.content}>{boardingPass.airline}</Text>
                </View>
                
                <View style={styles.inner}>
                    <Text style={styles.text}>Seat</Text>
                    <Text style={styles.content}>{boardingPass.seat?.seatNumber}</Text>
                </View>
                
                <View style={styles.inner}>
                    <Text style={styles.text}>Boarding Time</Text>
                    <Text style={styles.content}>{formatTime(boardingPass.boardingTime)}</Text>
                </View>

                <View style={styles.inner}>
                    <Text style={styles.text}>Gate</Text>
                    <Text style={styles.content}>{boardingPass.gate}</Text>
                </View>
                <View style={styles.inner}>
                    <Text style={styles.text}>Terminal</Text>
                    <Text style={styles.content}>{boardingPass.terminal}</Text>
                </View>
                <Text style={styles.text}>Please show this Pass when boarding</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth - 80,
        height: screenHeight - 210,
        backgroundColor: color.white,
        paddingTop: 20,
        borderRadius: 10,
        shadowColor: color.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 2,
    },
    pass: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: 60,
        padding: 20,
    },
    inner: {
        justifyContent: 'baseline',
        width: 100,
    },
    text: {
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 16
    },
    content: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10
    }
})