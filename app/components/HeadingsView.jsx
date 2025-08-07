import { color } from '@/styles/color';
import { StyleSheet, Text } from 'react-native';
import GradientText from './GradientText';

export function H1({children}) {
  return (
    <GradientText>
      <Text style={styles.h1}>
        {children}
      </Text>
    </GradientText>
  )
}

export function H2({children, textColor, textAlign}) {
  return (
    <GradientText>
      <Text style={
      [
        styles.h2, 
        { 
          color: textColor ? textColor : color.intermediate,
          textAlign: textAlign ? textAlign : 'center'
        }
      ]}>
        {children}
    </Text>
    </GradientText>
  )
}

export function H3({children, textColor, textAlign, marginVertical}) {
  return (
      <Text style={
      [
        styles.h3, 
        { 
          color: textColor ? textColor : color.gray,
          textAlign: textAlign ? textAlign : 'center',
          marginVertical: marginVertical ? marginVertical : 5
        }
      ]}>
        {children}
    </Text>
  )
}


export function P({children, textAlign}) {
  return (
    <Text style={
      [
        styles.p,
        { textAlign : textAlign ? textAlign : 'left'}
      ]}>
        {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 10
  },
  h2: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 10,
  },
  h3: {
    fontSize: 20,
    fontWeight: 500
  },
  p: {
    fontSize: 18,
    fontWeight: 400,
    marginVertical: 20,
    color: color.gray
  },
})