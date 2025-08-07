import GradientText from '@/components/GradientText';
import { StyleSheet, Text } from 'react-native';

export default function LogoView({children}) {
  return (
    <GradientText>
      <Text style={styles.logo}>
        {children}
      </Text>
    </GradientText>
  )
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 30,
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: '10%'
  },
})