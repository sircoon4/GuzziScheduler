import * as React from 'react';
import { Button, View, Text, Alert, StyleSheet } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { Calendar } from 'react-native-big-calendar';
import * as dbAct from '../utils/dbAct.js';
import Icon from 'react-native-vector-icons/AntDesign';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const eventsExample1 = [
  {
    title: '윤희 생일파티',
    start: new Date(2021, 4, 20, 16, 0),
    end: new Date(2021, 4, 20, 20, 0),
    color:'red'
  },
  {
    title: '알고리즘1',
    start: new Date(2021, 4, 21, 9, 0),
    end: new Date(2021, 4, 21, 11, 0),
    color:'blue'
  },
  {
    title: '큐시즘 회의',
    start: new Date(2021, 4, 21, 19, 0),
    end: new Date(2021, 4, 21, 22, 0),
    color:'green'
  },
  {
    title: '텐텐데이',
    start: new Date(2021, 4, 22, 10, 0),
    end: new Date(2021, 4, 22, 22, 0),
    color:'green'
  },
   {
    title: '알고리즘1',
    start: new Date(2021, 4, 23, 10, 0),
    end: new Date(2021, 4, 23, 12, 30),
    color:'blue'
  },
  {
    title: '과제3',
    start: new Date(2021, 4, 25, 14, 0),
    end: new Date(2021, 4, 25, 16, 0),
    color:'blue'
  },
  {
    title: '회의',
    start: new Date(2021, 4, 30, 10, 0),
    end: new Date(2021, 4, 30, 12, 30),
    color:'green'
  },
  {
    title: '아르바이트',
    start: new Date(2021, 4, 30, 15, 45),
    end: new Date(2021, 4, 30, 16, 30),
    color:'red'
  },
]

const eventsExample2 = [
  {
    title: '윤희 생일파티',
    start: new Date(2021, 4, 20, 16, 0),
    end: new Date(2021, 4, 20, 20, 0),
    color:'red'
  },
  {
    title: '알고리즘2',
    start: new Date(2021, 4, 21, 11, 0),
    end: new Date(2021, 4, 21, 12, 0),
    color:'blue'
  },
  {
    title: '큐시즘 회의',
    start: new Date(2021, 4, 21, 19, 0),
    end: new Date(2021, 4, 21, 22, 0),
    color:'green'
  },
  {
    title: '텐텐데이',
    start: new Date(2021, 4, 22, 10, 0),
    end: new Date(2021, 4, 22, 22, 0),
    color:'green'
  },
   {
    title: '알고리즘2',
    start: new Date(2021, 4, 23, 10, 0),
    end: new Date(2021, 4, 23, 12, 30),
    color:'blue'
  },
  {
    title: '알고리즘3',
    start: new Date(2021, 4, 25, 14, 0),
    end: new Date(2021, 4, 25, 16, 0),
    color:'blue'
  },
  {
    title: '회의',
    start: new Date(2021, 4, 30, 10, 0),
    end: new Date(2021, 4, 30, 12, 30),
    color:'green'
  },
  {
    title: '아르바이트',
    start: new Date(2021, 4, 30, 15, 45),
    end: new Date(2021, 4, 30, 16, 30),
    color:'red'
  },
]

const eventsExample3 = [
  {
    title: '윤희 생일파티',
    start: new Date(2021, 4, 20, 16, 0),
    end: new Date(2021, 4, 20, 20, 0),
    color:'red'
  },
  {
    title: '알고리즘3',
    start: new Date(2021, 4, 21, 14, 0),
    end: new Date(2021, 4, 21, 16, 0),
    color:'blue'
  },
  {
    title: '큐시즘 회의',
    start: new Date(2021, 4, 21, 19, 0),
    end: new Date(2021, 4, 21, 22, 0),
    color:'green'
  },
  {
    title: '텐텐데이',
    start: new Date(2021, 4, 22, 10, 0),
    end: new Date(2021, 4, 22, 22, 0),
    color:'green'
  },
   {
    title: '알고리즘2',
    start: new Date(2021, 4, 23, 15, 0),
    end: new Date(2021, 4, 23, 17, 30),
    color:'blue'
  },
  {
    title: '알고리즘3',
    start: new Date(2021, 4, 25, 14, 0),
    end: new Date(2021, 4, 25, 16, 0),
    color:'blue'
  },
  {
    title: '회의',
    start: new Date(2021, 4, 30, 10, 0),
    end: new Date(2021, 4, 30, 12, 30),
    color:'green'
  },
  {
    title: '아르바이트',
    start: new Date(2021, 4, 30, 15, 45),
    end: new Date(2021, 4, 30, 16, 30),
    color:'red'
  },
]

function RecommendScreen({ navigation, route }){
      
    
      //const [events1, setEvents1] = useState([])
      const [actualEvents, setActualEvents] = useState([])
      const [date, setDate] = useState();
      const [algoNum, setAlgoNum] = useState(0);
      useEffect(() => {
        
        setActualEvents(eventsExample1);
        
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

      const confirmEvent = () =>
      Alert.alert(
        "",
        "적용하시겠습니까?",
        [
          {
            text: "YES",
            onPress: () => {
              //remove event
              console.log("YES");
              navigation.navigate('MainCalendar')
            },
            style: "default",
          },
          {
            text: "NO",
            onPress: () =>  console.log("NO"),
            style: "cancel",
          },
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
      const cellColorEvent = (day)=>{
        return(
        {
          backgroundColor: '#ffffff',
          borderLeftWidth:4,
          borderColor:day.color,
        }
        )
      }

      const changeRecommendLeft = ()=>{ 
        if(algoNum==0){
          setAlgoNum(2)
          setActualEvents(eventsExample3); // 세번째 알고리즘.
        }
        if(algoNum==1){
          setAlgoNum(0)
         setActualEvents(eventsExample1); // 첫번째 알고리즘.
        }
        if(algoNum==2){
          setAlgoNum(1)
          setActualEvents(eventsExample2); // 두번째 알고리즘
        }
      }

      const changeRecommendRight = ()=>{ 
        if(algoNum==0){
          setAlgoNum(1)
          setActualEvents(eventsExample2); // 첫번째 알고리즘.
        }
        if(algoNum==1){
          setAlgoNum(2)
         setActualEvents(eventsExample3); // 두번째 알고리즘.
        }
        if(algoNum==2){
          setAlgoNum(0)
          setActualEvents(eventsExample1); // 세번째 알고리즘
        }
      }

      return (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin:10}}>
            <Icon name="close" size={34} color="#777777" onPress={() => navigation.navigate('MainToDo')} />
            <Icon name="check" size={34} color="#777777" onPress={confirmEvent} />
          </View>  
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Icon name="leftcircle" size={34} color="#4A5CFF" style={{margin:10}} onPress={changeRecommendLeft} /> 
            <Icon name="rightcircle" size={34} color="#4A5CFF" style={{margin:10}} onPress={changeRecommendRight} /> 
          </View>
          {/* <Text>Recommend {algoNum} Screen!</Text> */}
          <Calendar events={actualEvents} height={700} 
          locale="ko" date={date}
          onPressEvent={(day)=>clickEvent(day)}  
          swipeEnabled={true}
          showTime={false}
          eventCellStyle={(day)=>cellColorEvent(day)}
          style={{color:'black'}}
          />
        
      </View>
      );
}




export default RecommendScreen;