import { H3 } from '@/components/HeadingsView';
import { color } from '@/styles/color';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

export default function CardView({item, image}) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.innerLeftCol}>
          <H3>
            {/* Capitalise first char */}
            {item.country.charAt(0).toUpperCase() + item.country.slice(1)}
          </H3>
        </View>
        <View style={styles.innerRightCol}>
          <Text style={styles.text}>
            S${item.price}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>Step into {item.country} and enjoy it!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    marginRight: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: color.white,

    shadowColor: color.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    height: 120,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: 300,
    color: color.gray
  },
  innerLeftCol: {
    alignItems: 'flex-start',
  },
  innerRightCol: {
    alignItems: 'flex-end'
  },
  description: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    textAlign: 'left',
    flexShrink: 1,
    width: '100%'
  }
})