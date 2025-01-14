import React, { useEffect } from "react";
import home from "./Home";
import search from "./Search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "./Splash";
import Icon from "@react-native-vector-icons/fontawesome";
import Search from "./Search";


const Tab = createBottomTabNavigator();

const main = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarStyle: { backgroundColor:'#333'}, 
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: 'grey', 
      }}>
        
      <Tab.Screen name="Home" component={home} options={{
        headerShown:false,
        tabBarIcon:(tabInfo)=>{
          return (
            <Icon name='star' size={18}
            color={tabInfo.focused ? "white" : "grey"}/>
          )          
        }
      }} />
      <Tab.Screen name="Search" component={Search} 
      options={{
        headerShown:false,
        tabBarIcon:(tabInfo)=>{
          return (
            <Icon name='star' size={18}
            color={tabInfo.focused ? "white" : "grey"}/>
          )          
        }
      }}/>
    </Tab.Navigator>
  );
};

export default main;