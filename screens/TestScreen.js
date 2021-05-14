import * as React from 'react';
import { Button, View, Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Schedule from '../utils/Schedule.js';

const Tab = createBottomTabNavigator();

function TestScreen({ navigation }) {
  return (
    <Tab.Navigator>
        <Tab.Screen name="test1" component={ScreenGenerator} initialParams={{ num: 1 }}/>
        <Tab.Screen name="test2" component={ScreenGenerator} initialParams={{ num: 2 }}/>
        <Tab.Screen name="test3" component={ScreenGenerator} initialParams={{ num: 3 }}/>
    </Tab.Navigator>
  );
}

function ScreenGenerator({ route }){
    const num = route.params.num;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Test Screen {num}</Text>
            <Button
                title="Test Button"
                onPress={async () => console.log(await Schedule.getSchedule(2))}
            />
        </View>
    )
}

export default TestScreen;