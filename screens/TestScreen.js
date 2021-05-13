import * as React from 'react';
import { Button, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

function TestScreen({ navigation }) {
  const user = auth().currentUser;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Test Screen</Text>
      <Button
        title="Test Button"
        onPress={() => console.log('User: ', user)}
      />
    </View>
  );
}

export default TestScreen;