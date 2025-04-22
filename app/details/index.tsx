import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const NewsDetails = () => {
    const {title, description, content, urlToImage, url} = useLocalSearchParams();
    const router = useRouter();
    
    // Handle the case where urlToImage and url might be arrays
    const imageUrl = Array.isArray(urlToImage) ? urlToImage[0] : urlToImage;
    const sourceUrl = Array.isArray(url) ? url[0] : url;
    
    const openOriginalSource = () => {
        if (sourceUrl) {
            Linking.openURL(sourceUrl);
        }
    };
    
    const shareArticle = async () => {
        try {
            await Share.share({
                message: `Check out this news article: ${title}\n${sourceUrl || ''}`,
                url: sourceUrl
            });
        } catch (error) {
            console.error('Error sharing article:', error);
        }
    };
    
    return (
        <LinearGradient colors={['#0066cc', '#003366']} style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {imageUrl && (
                    <Image source={{uri: imageUrl}} style={styles.image} />
                )}
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.content}>{content}</Text>
                
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={openOriginalSource}>
                        <Ionicons name="globe-outline" size={20} color="white" />
                        <Text style={styles.buttonText}>Visit Original Source</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.button} onPress={shareArticle}>
                        <Ionicons name="share-social-outline" size={20} color="white" />
                        <Text style={styles.buttonText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default NewsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1,
        padding: 16
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: 'white'
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        fontStyle: 'italic',
        color: 'rgba(255, 255, 255, 0.9)'
    },
    content: {
        fontSize: 14,
        lineHeight: 22,
        color: 'white',
        marginBottom: 24
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 12,
        borderRadius: 8,
        flex: 0.48,
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        marginLeft: 8,
        fontWeight: '500'
    }
});