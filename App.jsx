import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './components/Home';
import Search from './components/Search';
import IconTab from 'react-native-vector-icons/Ionicons'
import * as Font from 'expo-font'
import * as SQLite from 'expo-sqlite';
import Form from './components/Form';
import { createStackNavigator } from '@react-navigation/stack'
import Detail from './components/Detail';
import Show from './components/Show'

const db = SQLite.openDatabase('name','1.0')
export default function App() {
  
  const [TextLoading,setTextLoading] = useState(false)
  const Tab = createBottomTabNavigator();
  const StackNav = createStackNavigator()
  const SearchRoute = ()=>{
    return(
    <StackNav.Navigator screenOptions={({route})=>({
      headerShown:false
    })}>
      <StackNav.Screen name="Search" children={()=>(<Search/>)}/>
      <StackNav.Screen name="Detail" component={Detail}/>
    </StackNav.Navigator>
    )}
  const Table = async ()=>{
    await db.transaction((tx)=>{
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS datarental 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
           property TEXT,
            room TEXT NOT NULL,
            dateTime TEXT,
             monthlyPrice TEXT,
              furnitureType TEXT ,
               note TEXT,
                report TEXT)`
  )
  console.log('Create success!');
    })
  }

useEffect(() => {
  Fonts();
  Table()
  
}, [])
  const Fonts = async () => {
    await Font.loadAsync({
      'oxygen': require("./assets/Oxygen-Light.ttf"),
    });
    setTextLoading(true);
  }
  if(!TextLoading){
    return null
  }
  else {
    return (
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route})=>({
          headerShown:false,
        })
        }
        >
          <Tab.Screen
           options={{
             tabBarLabel:'Home',
             tabBarIcon:({color,size,focused})=>{
               let iconHome;
               iconHome = focused ? 'home':'home-outline'
               return (<IconTab name={iconHome} color={color} size={size}/>)
             }
           }}
           name="Home" component={Home}/>
          <Tab.Screen
           options={{
             tabBarLabel:'Show',
             tabBarIcon:({color,size,focused})=>{
               let iconList;
               iconList = focused ? 'list':'list-outline'
               return (<IconTab name={iconList} color={color} size={size}/>)
             }
           }}
           name="List" component={Show}/>
          <Tab.Screen
           options={{
             tabBarLabel:'Search',
             tabBarIcon:({color,size,focused})=>{
               let iconSearch;
               iconSearch = focused ? 'search':'search-outline'
               return (<IconTab name={iconSearch} color={color} size={size}/>)
             }
           }}
           name="SearchRoute" children={SearchRoute}/>
        </Tab.Navigator>
      </NavigationContainer>
    )   
  }

}
