import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface Country {
  id: string;
  name: string;
}

const countries: Country[] = [
  { id: 'my', name: 'Malaysia' },
  { id: 'us', name: 'United States' },
  { id: 'gb', name: 'United Kingdom' },
  { id: 'ca', name: 'Canada' },
  { id: 'au', name: 'Australia' },
  { id: 'in', name: 'India' },
  { id: 'fr', name: 'France' },
  { id: 'de', name: 'Germany' },
  { id: 'jp', name: 'Japan' },
  { id: 'br', name: 'Brazil' },
  { id: 'ru', name: 'Russia' }
];

export default function CountryCategories() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <LinearGradient 
        colors={['#0066cc', '#004080', '#002b55']} 
        style={styles.container}
      >
        <Text style={styles.title}>Browse by Country</Text>
        <FlatList
          data={countries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <View style={styles.countryRow}>
              <TouchableOpacity 
                style={styles.country}
                onPress={() => router.push({
                  pathname: "/categories/[newsByCountry]",
                  params: { newsByCountry: item.id }
                })}
              >
                <Text style={styles.countryText}>{item.name}</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.infoButton}>
                <MaterialIcons name="info-outline" size={22} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 10,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  country: {
    flex: 1,
    padding: 16,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  countryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  }
});
