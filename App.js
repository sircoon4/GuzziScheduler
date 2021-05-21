import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text, Image } from 'react-native';
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

import TestScreen from './screens/TestScreen';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function ProfileHeader() {
  var profilePath;

  profilePath = require('./images/defaultProfile.jpg');

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Image
        style={{ width: 50, height: 50 }}
        source={profilePath}
      />
      <Text>Hello, world!</Text>
      <Button
        title="Sign Out"
        onPress={() => auth().signOut()}
      />
    </View>
  );
}

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
          headerTitle: props => <ProfileHeader {...props} />
        }}
      >
        <Stack.Screen name="Main" component={MainTab} />
        <Stack.Screen name="Recommend" component={RecommendScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MainCalendar" component={MainCalendarScreen} />
      <Tab.Screen name="MainToDo" component={MainToDoListScreen} />
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