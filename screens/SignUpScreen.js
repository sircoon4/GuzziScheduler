import * as React from 'react';
import { Button, View, Text } from 'react-native';

function SignUpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SignUp Screen</Text>
      <Button
        title="Goto Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

export default SignUpScreen;