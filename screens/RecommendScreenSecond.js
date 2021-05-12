import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-big-calendar';

import 'dayjs/locale/ko';


// 당일 주차 부터 4주차까지 나오도록
// 일정 삭제 기능....
// array 변수에 따라서 다르게 표시되도록



function RecommendScreenSecond({navigation}) {
  const eventsExample1 = [
    {
      title: 'Meeting',
      start: new Date(2021, 4, 11, 10, 0),
      end: new Date(2021, 4, 11, 12, 30),
    },
    {
      title: 'Coffee break',
      start: new Date(2021, 4, 11, 15, 45),
      end: new Date(2021, 4, 11, 16, 30),
    },
    {
      title: 'Meeting',
      start: new Date(2021, 4, 17, 10, 0),
      end: new Date(2021, 4, 17, 12, 30),
    },
    {
      title: 'Coffee break',
      start: new Date(2021, 4, 17, 15, 45),
      end: new Date(2021, 4, 17, 16, 30),
    },
     {
      title: 'Meeting',
      start: new Date(2021, 4, 25, 10, 0),
      end: new Date(2021, 4, 25, 12, 30),
    },
    {
      title: 'Coffee break',
      start: new Date(2021, 4, 25, 15, 45),
      end: new Date(2021, 4, 25, 16, 30),
    },
    {
      title: 'Meeting',
      start: new Date(2021, 4, 30, 10, 0),
      end: new Date(2021, 4, 30, 12, 30),
    },
    {
      title: 'Coffee break',
      start: new Date(2021, 4, 30, 15, 45),
      end: new Date(2021, 4, 30, 16, 30),
    },
  ]
  

  const [events1, setEvents1] = useState([])
  const [actualEvents, setActualEvents] = useState([])
  const [date, setDate] = useState();
  useEffect(() => {
    //원래는 axios.get으로 알고리즘 완성된 배열 가져오기.
    setActualEvents(eventsExample1);
    setEvents1(eventsExample1);
  }, [])

  
  const showAlert = (day) =>
  Alert.alert(
    "일정 삭제",
    "해당 일정을 삭제하시겠습니까?",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert("취소되었습니다."),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          Alert.alert("삭제되었습니다.");
          //remove event
          console.log(day, " 삭제");
          setActualEvents(actualEvents.filter(event => event.title !== day.title));
        },
        style: "default",
      }
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );

  const clickEvent = (day)=>{
    console.log(day)
    showAlert(day)
  }

  const changeDay =(index)=>{
    let current_date = new Date()
    let after_1week_date = new Date(Date.parse(current_date) + 7 * 1000 * 60 * 60 * 24)
    let after_2week_date = new Date(Date.parse(current_date) + 14 * 1000 * 60 * 60 * 24)
    let after_3week_date = new Date(Date.parse(current_date) + 21 * 1000 * 60 * 60 * 24)
    if(index==1){
      setDate(current_date) //new Date(2021,4,9)
      console.log(1)
      console.log(date)
    }
    if(index==2){
      setDate(after_1week_date) //new Date(2021,4,16)
      console.log(2)
      console.log(date)
    }
    if(index==3){
      setDate(after_2week_date)
      console.log(date)
    }if(index==4){
      setDate(after_3week_date)
    }
  }

  return (
    <View>
    <Text>Recommend second Screen!</Text>
    <Calendar events={actualEvents} height={500} 
    locale="ko" date={date}
    onPressEvent={(day)=>clickEvent(day)}/>
    <Button
      title="firstWeek"
      onPress={()=>{
        changeDay(1)
      }
      }
    />
    <Button
      title="secondWeek"
      onPress={()=>{
        changeDay(2)
      }
      }
    />
    <Button
      title="thirdWeek"
      onPress={()=>{
        changeDay(3)
      }
      }
    />
    <Button
      title="fourthWeek"
      onPress={()=>{
        changeDay(4)
      }
      }
    />
    <Button
      title="Back"
      onPress={() => navigation.navigate('MainToDo')}
    />
    <Button
      title="Confirm"
      onPress={() => navigation.navigate('MainCalendar')}
    />
  </View>
  );
}

export default RecommendScreenSecond;