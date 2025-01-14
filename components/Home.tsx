// Required imports
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  // Fetch movie data from API
  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Navigate to Details Screen


  // Render each movie item
  const renderMovieItem = ({ item }: { item: { show: { image: { medium: string }, name: string, summary: string, id: number } } }) => (
    <TouchableOpacity style={styles.movieItem}   onPress={() => navigation.navigate('Details', { movieDetails: item.show })}>
      <Image
        source={{ uri: item.show.image?.medium || 'https://via.placeholder.com/150' }}
        style={styles.thumbnail}
      />
      <View style={styles.movieInfo}>
        <Text style={styles.title}>{item.show.name}</Text>
        <Text numberOfLines={2} style={styles.summary}>{item.show.summary?.replace(/<[^>]*>/g, '') || 'No summary available'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <Text style={{color:'white' , fontWeight:'bold' , textAlign:'center' , fontSize:24, marginTop:10 , marginBottom:5}}>RRMovies</Text>
      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar}  onPress={()=>navigation.navigate('Search')}>
        <Text style={styles.searchText}>Search Movies...</Text>
      </TouchableOpacity>

      {/* Movie List */}
      {loading ? (
        <Text style={styles.loadingText}>Loading movies...</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.show.id.toString()}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop:height*.04,
  },
  searchBar: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  searchText: {
    color: '#FFF',
  },
  loadingText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },
  movieItem: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#222',
    borderRadius: 5,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 150,
  },
  movieInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    color: '#CCC',
    fontSize: 14,
    marginTop: 5,
  },
});

export default Home
