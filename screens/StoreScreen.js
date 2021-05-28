import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';

function StoreScreen({ navigation }) {
  return (
    <View style={{height: "100%", backgroundColor: 'white', paddingTop: 20}}>
        <Image
            style={{width: "100%"}}
            source={require('../images/store_screen.png')}
        />
    </View>
  );
}

export default StoreScreen;