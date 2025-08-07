import ButtonView from '@/components/ButtonView';
import EditTextView from '@/components/EditTextView';
import LogoView from '@/components/LogoView';
import TextView from '@/components/TextView';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const [form, setForm] = useState({
    saluation: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    nationality: '',
    mobileCountryCode: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    // Validate all fields are filled
    const emptyFields = Object.entries(form)
        .filter(([key, value]) => value.trim() === '')
        .map(([key]) => key)

    if (emptyFields.length > 0) {
        Alert.alert(
        'Missing Fields',
        `Please fill in the following: ${emptyFields.join(', ')}`
        )
        return
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    try {
      const response = await fetch('https://your-api.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (!response.ok) throw new Error('Registration failed')
      const data = await response.json()
      Alert.alert('Success', 'Registration completed!')
    } catch (err) {
      Alert.alert('Error', err.message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <LogoView>Skylance</LogoView>
        <View style={styles.inner}>
          <TextView>Saluation</TextView>
          <EditTextView
            placeholder="Enter Salutation"
            value={form.saluation}
            onChangeText={(text) => handleChange('salutation', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>First Name</TextView>
          <EditTextView
            placeholder="Enter First Name"
            value={form.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>Last Name</TextView>
          <EditTextView
            placeholder="Enter Last Name"
            value={form.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>Gender</TextView>
          <EditTextView
            placeholder="Enter Gender"
            value={form.gender}
            onChangeText={(text) => handleChange('gender', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>Enter Date of Birth</TextView>
          <EditTextView
            placeholder="Enter Date Of Birth"
            value={form.gender}
            onChangeText={(text) => handleChange('dateOfBirth', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>Email</TextView>
          <EditTextView
            placeholder="Enter Email"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>Nationality</TextView>
          <EditTextView
            placeholder="Enter Nationality"
            value={form.nationality}
            onChangeText={(text) => handleChange('nationality', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>Mobile Country Code</TextView>
          <EditTextView
            placeholder="Enter Mobile Country Code"
            value={form.mobileCountryCode}
            onChangeText={(text) => handleChange('mobileCountryCode', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>Mobile Number</TextView>
          <EditTextView
            placeholder="Enter Mobile Number"
            value={form.mobileNumber}
            onChangeText={(text) => handleChange('mobileNumber', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>Enter Password</TextView>
          <EditTextView
            placeholder="Enter Password"
            secure
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
          />
        </View>

        <View style={styles.inner}>
          <TextView>Confirm Password</TextView>
          <EditTextView
            placeholder="Confirm Password"
            secure
            value={form.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
          />
        </View>

        <ButtonView onPress={handleSubmit}>Register</ButtonView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    alignItems: 'center'
  },
  inner: {}
})