import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getNewsByCountry } from '@/lib/api/api';
import { LinearGradient } from 'expo-linear-gradient';

export default function NewsByCountry() {
    const params = useLocalSearchParams();
    // Convert to string if it's an array
    const country = Array.isArray(params.newsByCountry) 
        ? params.newsByCountry[0] 
        : params.newsByCountry as string;
    
    // Country name mapping
    const countryNames = {
        'my': 'Malaysia',
        'us': 'United States',
        'gb': 'United Kingdom',
        'ca': 'Canada',
        'au': 'Australia',
        'in': 'India',
        'fr': 'France',
        'de': 'Germany',
        'jp': 'Japan',
        'br': 'Brazil',
        'ru': 'Russia'
    };

    const countryName = countryNames[country as keyof typeof countryNames] || country;
    
    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['newsByCountry', country],
        queryFn: () => getNewsByCountry(country),
    });
    
    const router = useRouter();
    
    if(isLoading) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.loadingText}>Loading news from {countryName}...</Text>
            </View>
        );
    }
    
    if(isError) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error loading news</Text>
            </View>
        );
    }
    
    return (
        <LinearGradient colors={['#0066cc', '#003366']} style={styles.container}>
            <Text style={styles.title}>News from {countryName}</Text>
            {data && data.articles && data.articles.length > 0 ? (
                <FlatList
                    data={data.articles}
                    keyExtractor={(item) => item.url}
                    renderItem={({item}) => (
                        <TouchableOpacity
                        style={styles.articleContainer}
                        onPress={() => {
                            router.push({
                                pathname: '/details',
                                params: {
                                    title: item.title,
                                    description: item.description,
                                    content: item.content,
                                    urlToImage: item.urlToImage,
                                    url: item.url
                                }
                            });                          
                        }}>
                        {item.urlToImage && (
                            <Image
                            source={{uri: item.urlToImage}}
                            style={styles.image}
                            />
                        )}
                        <Text style={styles.articleTitle}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={styles.centerContainer}>
                    <Text style={styles.noResults}>No news available from {countryName}</Text>
                </View>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'white'
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#ff6666'
    },
    articleContainer: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },
    description: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)'
    },
    noResults: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
}); 