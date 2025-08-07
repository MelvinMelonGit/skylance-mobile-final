import { color } from '@/styles/color';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

export default function GradientText({ children, style }) {
  return (
    <MaskedView
      maskElement={
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={[style, { color: 'black' }]}>
            {children}
          </Text>
        </View>
      }
    >
      <LinearGradient
        colors={[color.primary, color.secondary]} // Tailwind blue-600 to purple-600
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  )
}