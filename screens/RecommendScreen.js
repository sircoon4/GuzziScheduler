import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { Calendar } from 'react-native-big-calendar';

// 당일 주차 부터 4주차까지 나오도록
// 일정 삭제 기능....
// array 변수에 따라서 다르게 표시되도록

function RecommendScreen({ navigation }) {
  return (
    <View>
      <Text>Recommend Screen</Text>
      <Calendar events={actualEvents} height={600} />
      <Button
        title="Confirm"
        onPress={() => navigation.navigate('MainCalendar')}
      />
    </View>
  );
}

export default RecommendScreen;