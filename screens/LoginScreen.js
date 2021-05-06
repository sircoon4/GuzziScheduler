import * as React from 'react';
import { Button, View, Text } from 'react-native';

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <Button
        title="Goto Main"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
}

export default LoginScreen;