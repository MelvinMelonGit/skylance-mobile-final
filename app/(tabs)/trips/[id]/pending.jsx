import { H2, P } from '@/components/HeadingsView';
import PendingContainer from '@/components/PendingContainer';
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Pending() {
  const { currentUser } = useAuth()
  const { id } = useLocalSearchParams()

  const router = useRouter()
  
  return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={styles.container}>
          <H2 textAlign='left'>Hey { currentUser },</H2>
          <P>We apologize that your flight is overbooked. Sorry for the inconvenience caused. Please select one of the following compensation options.</P>
          <PendingContainer choice={1} onPress={() => {
              router.push(`/trips/${id}/cancel-flight`)
            }}/>
          <PendingContainer choice={2} onPress={() => {
              router.push(`/trips/${id}/available-flight`)
            }}/>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
})