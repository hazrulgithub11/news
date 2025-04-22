import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getNewsByCategory } from '@/lib/api/api';



const NewsByCategory = () => {
    const {newsByCategory} = useLocalSearchParams();
    const {data, error, isError, isSuccess, isLoading} = useQuery({
        queryKey: ['newsByCategory'],
        queryFn: () => getNewsByCategory(newsByCategory),
    });
    const router = useRouter();
    if(isLoading) {
        return <Text>Loading...</Text>
    }
    if(isError) {
        return <Text>Error: {error.message}</Text>
    }
    if(isError) {
        return <Text>Error: {error.message}</Text>
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{newsByCategory} : news</Text>
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
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default NewsByCategory;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16
    },
    articleContainer: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f5f5f5'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8
    },
    description: {
        fontSize: 14,
        color: '#666'
    }
})
