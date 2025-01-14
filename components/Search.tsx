import React, { useState } from 'react';
import { 
  View, TextInput, FlatList, TouchableOpacity, Image, Text, StyleSheet 
} from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  // Function to search movies
  const searchMovies = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${term}`);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Handle search bar text change
  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    searchMovies(text);
  };

  // Render movie item
  const renderMovieItem = ({ item }: { item: { show: { id: number, name: string, summary: string, image: { medium: string } } } }) => (
    <TouchableOpacity 
      style={styles.movieItem} 
      onPress={() => navigation.navigate('Details', { movieDetails: item.show })}
    >
      <Image
        source={{ uri: item.show.image?.medium || 'https://via.placeholder.com/150' }}
        style={styles.thumbnail}
      />
      <View style={styles.movieInfo}>
        <Text style={styles.title}>{item.show.name}</Text>
        <Text numberOfLines={2} style={styles.summary}>
          {item.show.summary?.replace(/<[^>]*>/g, '') || 'No summary available'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        placeholderTextColor="#999"
        value={searchTerm}
        onChangeText={handleSearchChange}
      />

      {/* Results List */}
      <FlatList
        data={searchResults}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.show.id.toString()}
        ListEmptyComponent={
          searchTerm ? <Text style={styles.noResultsText}>No results found.</Text> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding:10 , 
    paddingTop:30
  },
  searchBar: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    color: '#FFF',
    marginBottom: 10,
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
  noResultsText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Search;
