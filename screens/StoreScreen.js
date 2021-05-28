import * as React from 'react';
import { Button, View, Text, Image, ImageBackground } from 'react-native';

// require('../images/store_screen.png')

function StoreScreen({ navigation }) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image 
            source={require('../images/store_screen.png')}
            style={{zIndex: 10, position: 'absolute', top:35, width:'100%', height:'100%', resizeMode: 'cover'}}
        />
    </View>
  );
}

export default StoreScreen;