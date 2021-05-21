import * as React from 'react';
import { Button, View, Text } from 'react-native';

function IntroScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Intro Screen</Text>
      <Button
        title="Goto Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Goto SignUp"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

export default IntroScreen;