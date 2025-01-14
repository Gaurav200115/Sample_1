/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './components/Splash';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import Details from './components/Details';
import Search from './components/Search';
import main from './components/main';

const Stack = createNativeStackNavigator();


const App = () =>{

  const [state, setState] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setState(false)
    }, 3000)
    return () => clearTimeout(timer);
  })

  if (state) {
    return <Splash/>
  }
 
  return (
    <>
     <StatusBar hidden={state} translucent backgroundColor="transparent" barStyle="dark-content" />
    {state ? (
      <Splash />
    ) : (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={main}
          options={{headerShown:false}}/>
          <Stack.Screen name='Search' component={Search}
           options={{headerShown:false}}/>
          <Stack.Screen name='Details' component={Details}
            options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    )}
  </>
   
  );
}


export default App;
