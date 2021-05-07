import * as React from 'react';
import { Button, View, Text } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

// 고정 스케쥴 추가, 삭제, 수정 기능
// 로그아웃 버튼

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