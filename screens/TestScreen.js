import * as React from 'react';
import { Button, View, Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as dbAct from '../utils/dbAct.js';

const Tab = createBottomTabNavigator();

var algoNum = 2;

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

    var algoScrNum = algoNum;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Test Screen {num}</Text>
            <Button
                title="Test Button"
                onPress={async () => console.log(await dbAct.createTodo({title: "조모임", startDate: new Date().getTime()}))}
            />
        </View>
    )
}

export default TestScreen;