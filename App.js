import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text, Image, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
// import RecommendScreenFirst from './screens/RecommendScreenFirst';
// import RecommendScreenSecond from './screens/RecommendScreenSecond';
// import RecommendScreenThird from './screens/RecommendScreenThird';
// import RecommendScreenFourth from './screens/RecommendScreenFourth';
import RecommendScreen from './screens/RecommendScreen';
import MainCalendarScreen from './screens/MainCalendarScreen';
import MainToDoListScreen from './screens/MainToDoListScreen';
import SettingScreen from './screens/SettingScreen';
import CheckScreen from './screens/CheckScreen';

import TestScreen from './screens/TestScreen';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);

      if(user){
        console.log(user);
        var path = '/users/' + user.email.slice(0,-4);
        database()
        .ref(path)
        .update({
          profile: {
            name: user.displayName
          }
        })
        .then(() => console.log('Data updated.'));
      }
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Main"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Main" component={MainTab} />
        <Stack.Screen name="Recommend" component={RecommendScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Check" component={CheckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Calendar') {
            return <AntIcon name='calendar' size={size} color={color} />;
          } else if (route.name === 'Plan Maker') {
            return <FAIcon name='magic' size={size} color={color} />;
          } else if (route.name === 'Setting') {
            return <AntIcon name='setting' size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Calendar" component={MainCalendarScreen} />
      <Tab.Screen name="Plan Maker" component={MainToDoListScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

// function RecommendTab() {
//   return (
//     <RecommedTab.Navigator
//     tabBarOptions={{
//       labelStyle: { fontSize: 12 },
//       style: { backgroundColor: 'sky'},
//     }}
//   >
//     <RecommedTab.Screen name="Screen1" component={RecommendScreenFirst} />
//     <RecommedTab.Screen name="Screen2" component={RecommendScreenSecond} />
//     <RecommedTab.Screen name="Screen3" component={RecommendScreenThird} />
//     <RecommedTab.Screen name="Screen4" component={RecommendScreenFourth}/>
//   </RecommedTab.Navigator>
//   );
// }

export default App;