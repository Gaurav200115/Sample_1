
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { RouteProp } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');


type RouteParams = {
    params: {
        movieDetails: {
            image?: { original: string };
            name: string;
            summary?: string;
            language?: string;
            genres?: string[];
            premiered?: string;
            rating?: { average?: number };
        };
    };
};

const Details = () => {
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { movieDetails } = route.params;

    return (
        <ScrollView style={styles.container}>
            {/* Movie Poster */}
            <Image
                source={{ uri: movieDetails.image?.original || 'https://via.placeholder.com/300' }}
                style={styles.moviePoster}
            />

            {/* Movie Title */}
            <View style={styles.back}>
                <Text style={styles.title}>{movieDetails.name}</Text>

                {/* Summary */}
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.summary}>
                    {movieDetails.summary?.replace(/<[^>]*>/g, '') || 'No summary available'}
                </Text>

                {/* Additional Info */}
                <Text style={styles.sectionTitle}>Details</Text>
                <Text style={styles.detailsText}>Language: {movieDetails.language || 'N/A'}</Text>
                <Text style={styles.detailsText}>Genres: {movieDetails.genres?.join(', ') || 'N/A'}</Text>
                <Text style={styles.detailsText}>Premiered: {movieDetails.premiered || 'N/A'}</Text>
                <Text style={styles.detailsText}>
                    Rating: {movieDetails.rating?.average ? `${movieDetails.rating.average} / 10` : 'N/A'}
                </Text>
            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    back:{
        padding:10,
        marginTop:-height*.02,
        backgroundColor:'#333',
        margin:10,
        borderRadius:10,
        elevation:10,

    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    moviePoster: {
        width: '100%',
        height: height * .44,
        resizeMode: 'cover',
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
    },
    summary: {
        color: '#CCC',
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
    },
    detailsText: {
        color: '#AAA',
        fontSize: 14,
        marginTop: 5,
    },
});


export default Details;
