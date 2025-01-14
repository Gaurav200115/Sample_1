
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
const { width, height } = Dimensions.get('window');


const Splash = () =>{
 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:'#333333' }}>
      <Image
        source={require('./movie1.png')}
        resizeMode="contain" 
        style={{ width: width * 0.8, height: height * 0.4 }} 
      />
      <Text style={{color:'white' , fontWeight:'bold' , textAlign:'center' , fontSize:24, marginTop:10 , marginBottom:5}}>RRMovies</Text>
      
    </View>
  );
}


export default Splash;
