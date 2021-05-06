import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { Calendar } from 'react-native-big-calendar';

const events = [
    {
      title: 'Meeting',
      start: new Date(2020, 1, 11, 10, 0),
      end: new Date(2020, 1, 11, 10, 30),
    },
    {
      title: 'Coffee break',
      start: new Date(2020, 1, 11, 15, 45),
      end: new Date(2020, 1, 11, 16, 30),
    },
  ]

function RecommendScreen({ navigation }) {
  return (
    <View>
      <Text>Recommend Screen</Text>
      <Calendar events={events} height={600} />
      <Button
        title="Confirm"
        onPress={() => navigation.navigate('MainCalendar')}
      />
    </View>
  );
}

export default RecommendScreen;