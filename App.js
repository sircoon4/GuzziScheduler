import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen';
import RecommendScreen from './screens/RecommendScreen';
import MainCalendarScreen from './screens/MainCalendarScreen';
import MainToDoListScreen from './screens/MainToDoListScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Stack.Screen name="Recommend" component={RecommendScreen} />
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

export default App;