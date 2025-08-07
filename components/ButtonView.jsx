import { color } from '@/styles/color';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ButtonView({ children, onPress, warning, clear }) {
  let gradientColors = [color.primary, color.secondary];
  let buttonTextColor = color.white;

  if (warning) gradientColors = [color.red, color.orange];
  else if (clear) {
    gradientColors = ['transparent', 'transparent'];
    buttonTextColor = color.intermediate;
  }

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        clear && {
          backgroundColor: 'transparent',
          borderColor: color.intermediate,
          borderWidth: 2,
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} style={styles.touchable} activeOpacity={0.7}>
        <Text style={[styles.text, { color: buttonTextColor }]}>{children}</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    marginVertical: 10,
    borderRadius: 50,
    overflow: 'hidden', // Ensures TouchableOpacity doesn't overflow gradient corners
  },
  touchable: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
