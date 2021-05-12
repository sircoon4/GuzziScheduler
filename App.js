import * as React from 'react';
import { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import LoginScreen from './screens/LoginScreen';
import RecommendScreenFirst from './screens/RecommendScreenFirst';
import RecommendScreenSecond from './screens/RecommendScreenSecond';
import RecommendScreenThird from './screens/RecommendScreenThird';
import RecommendScreenFourth from './screens/RecommendScreenFourth';
import MainCalendarScreen from './screens/MainCalendarScreen';
import MainToDoListScreen from './screens/MainToDoListScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RecommedTab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Recommend" component={RecommendTab} />
        <Stack.Screen name="Main" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MainCalendar" component={MainCalendarScreen} />
      <Tab.Screen name="MainToDo" component={MainToDoListScreen} />
    </Tab.Navigator>
  );
}
function RecommendTab() {
  return (
    <RecommedTab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 12 },
      style: { backgroundColor: 'sky'},
    }}
  >
    <RecommedTab.Screen name="Screen1" component={RecommendScreenFirst} />
    <RecommedTab.Screen name="Screen2" component={RecommendScreenSecond} />
    <RecommedTab.Screen name="Screen3" component={RecommendScreenThird} />
    <RecommedTab.Screen name="Screen4" component={RecommendScreenFourth}/>
  </RecommedTab.Navigator>
  );
}

export default App;