import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const AllCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Business',
      icon: 'business',
    },
    {
      id: 2,
      name: 'Entertainment',
      icon: 'entertainment',
    },
    {
      id: 3,
      name: 'General',
      icon: 'general',
    },
    {
      id: 4,
      name: 'Health',
      icon: 'healing',
    },
    {
      id: 5,
      name: 'Science',
      icon: 'science',
    },
    {
      id: 6,
      name: 'Sports',
      icon: 'sports',
    },
    {
      id: 7,
      name: 'Technology',
      icon: 'devices',
    },
    {
      id: 8,
      name: 'Politics',
      icon: 'account-balance',
    },
    {
      id: 9,
      name: 'Environment',
      icon: 'nature',
    },
    {
      id: 10,
      name: 'Education',
      icon: 'school',
    }
  ];
  
  const router = useRouter();
  
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <LinearGradient 
        colors={['#0066cc', '#004080', '#002b55']} 
        style={styles.container}
      >
        <Text style={styles.title}>Categories</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <View style={styles.categoryRow}>
              <TouchableOpacity 
                style={styles.category}
                onPress={() => router.push({
                  pathname: "/categories/[newsByCategory]",
                  params: { newsByCategory: item.name.toLowerCase() }
                })}
              >
                <Text style={styles.categoryText}>{item.name}</Text>
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
};

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
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  category: {
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
  categoryText: {
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

export default AllCategories;
