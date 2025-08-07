import { color } from '@/styles/color';
import { StyleSheet, Text } from 'react-native';

export default function TextView({children, marginVertical}) {
  return (
    <Text
        style={
          [
            styles.container,
          { 
            marginVertical: marginVertical ?? 0,
          }
          ]
        }
    >
        {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    color: color.black,
    fontSize: 16,
    fontWeight: 500,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
})