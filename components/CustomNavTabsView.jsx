import { color } from '@/styles/color';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomNavTabsView({ activeTab, setActiveTab }) {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab('UpcomingFlights')}
        activeOpacity={0.7}
      >
        {activeTab === 'UpcomingFlights' ? (
          <LinearGradient
            colors={[color.primary, color.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.activeTab}
          >
            <Text style={[styles.tabText, styles.activeTabText]}>
              Upcoming
            </Text>
          </LinearGradient>
        ) : (
          <View style={styles.inactiveTab}>
            <Text style={styles.tabText}>Upcoming</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab('PastFlights')}
        activeOpacity={0.7}
      >
        {activeTab === 'PastFlights' ? (
          <LinearGradient
            colors={[color.primary, color.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.activeTab}
          >
            <Text style={[styles.tabText, styles.activeTabText]}>
              Past Flights
            </Text>
          </LinearGradient>
        ) : (
          <View style={styles.inactiveTab}>
            <Text style={styles.tabText}>Past Flights</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: color.intermediate,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 4,
    width: '100%',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
  activeTab: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 50,
  },
  inactiveTab: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 50,
  },
  tabText: {
    fontSize: 18,
    color: color.intermediate,
    fontWeight: '500',
  },
  activeTabText: {
    color: color.white,
  },
})
