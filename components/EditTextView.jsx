import { color } from '@/styles/color';
import { StyleSheet, TextInput } from 'react-native';

export default function EditTextView({placeholder, marginVertical, value, secure, onChangeText}) {
  return (
    <TextInput 
        style={
          [
            styles.container,
          { marginVertical: marginVertical ?? 10 }
          ]
        }
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    minWidth: '100%',
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: color.gray,
    color: color.gray
  },
})