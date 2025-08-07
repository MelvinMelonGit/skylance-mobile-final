import ButtonView from '@/components/ButtonView';
import EditTextView from '@/components/EditTextView';
import { H1 } from '@/components/HeadingsView';
import LogoView from '@/components/LogoView';
import TextView from '@/components/TextView';
import { useAuth } from '@/context/AuthContext';
import { color } from '@/styles/color';
import { loginUser } from '@/utils/AuthCheck';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Account from './account';

export default function Index() {
  const { isLoggedIn, login, setCurrentUserObj } = useAuth()

  const router = useRouter()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    setErrors({ email: '', password: '' })

    const emptyFields = Object.entries(form)
      .filter(([_, value]) => value.trim() === '')
      .map(([key]) => key);

        if (emptyFields.length > 0) {
          setErrors(prev => ({
            ...prev,
            email: emptyFields.includes('email') ? 'Email is required.' : '',
            password: emptyFields.includes('password') ? 'Password is required.' : ''
          }))
          return
        }

        try {
          const data = await loginUser(form.email, form.password)
          setForm({ email: '', password: '' })
          if (data.token) {
            login(data)
            setCurrentUserObj(data)
            router.push('/')
          }
        } catch (err) {
          if (err.message.toLowerCase().includes('email')) {
            setErrors(prev => ({ ...prev, email: err.message }))
          } else if (err.message.toLowerCase().includes('password')) {
            setErrors(prev => ({ ...prev, password: err.message }))
          } else {
            setErrors(prev => ({ ...prev, password: err.message }))
          }
        }
    }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.container}>
        <LogoView>Skylance</LogoView>
        {isLoggedIn ?
          ( <Account /> )
          : (
          <>
            <H1>Welcome Back!</H1>
            <View style={styles.inner}>
                <TextView>Email</TextView>
                <EditTextView
                    placeholder="Enter Email"
                    value={form.email}
                    onChangeText={(text) => handleChange('email', text)}
                />
                {errors.email ? <Text style={{ color: color.red, marginBottom: 10 }}>{errors.email}</Text> : null}
            </View>
            
            <View style={styles.inner}>
                <TextView>Enter Password</TextView>
                <EditTextView
                    placeholder="Enter Password"
                    value={form.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secure
                />
                {errors.password ? <Text style={{ color: color.red, marginBottom: 10 }}>{errors.password}</Text> : null}
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <ButtonView onPress={() => {
                  handleSubmit()
                 }}>Login</ButtonView>
            </View>
          </>
        )}
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})