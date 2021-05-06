import * as React from 'react';
import { Button, View, Text } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

function MainCalendarScreen({ navigation }) {
  return (
    <View>
      <Text>Main Calendar Screen</Text>
      <Calendar/>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

export default MainCalendarScreen;