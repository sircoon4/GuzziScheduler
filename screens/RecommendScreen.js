import * as React from 'react';
import { Button, View, Text, Alert } from 'react-native';
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
  },
  {
    title: '과제1',
    start: new Date(2021, 4, 21, 9, 0),
    end: new Date(2021, 4, 21, 11, 0),
  },
  {
    title: '큐시즘 회의',
    start: new Date(2021, 4, 21, 19, 0),
    end: new Date(2021, 4, 21, 22, 0),
  },
  {
    title: '텐텐데이',
    start: new Date(2021, 4, 22, 10, 0),
    end: new Date(2021, 4, 22, 22, 0),
  },
   {
    title: '과제2',
    start: new Date(2021, 4, 23, 10, 0),
    end: new Date(2021, 4, 23, 12, 30),
  },
  {
    title: '과제3',
    start: new Date(2021, 4, 25, 14, 0),
    end: new Date(2021, 4, 25, 16, 0),
  },
  {
    title: '회의',
    start: new Date(2021, 4, 30, 10, 0),
    end: new Date(2021, 4, 30, 12, 30),
  },
  {
    title: '아르바이트',
    start: new Date(2021, 4, 30, 15, 45),
    end: new Date(2021, 4, 30, 16, 30),
  },
]

const eventsExample2 = [
  {
    title: '윤희 생일파티',
    start: new Date(2021, 4, 20, 16, 0),
    end: new Date(2021, 4, 20, 20, 0),
  },
  {
    title: '과제1',
    start: new Date(2021, 4, 21, 11, 0),
    end: new Date(2021, 4, 21, 12, 0),
  },
  {
    title: '큐시즘 회의',
    start: new Date(2021, 4, 21, 19, 0),
    end: new Date(2021, 4, 21, 22, 0),
  },
  {
    title: '텐텐데이',
    start: new Date(2021, 4, 22, 10, 0),
    end: new Date(2021, 4, 22, 22, 0),
  },
   {
    title: '과제2',
    start: new Date(2021, 4, 23, 10, 0),
    end: new Date(2021, 4, 23, 12, 30),
  },
  {
    title: '과제3',
    start: new Date(2021, 4, 25, 14, 0),
    end: new Date(2021, 4, 25, 16, 0),
  },
  {
    title: '회의',
    start: new Date(2021, 4, 30, 10, 0),
    end: new Date(2021, 4, 30, 12, 30),
  },
  {
    title: '아르바이트',
    start: new Date(2021, 4, 30, 15, 45),
    end: new Date(2021, 4, 30, 16, 30),
  },
]

const eventsExample3 = [
  {
    title: '윤희 생일파티',
    start: new Date(2021, 4, 20, 16, 0),
    end: new Date(2021, 4, 20, 20, 0),
  },
  {
    title: '과제1',
    start: new Date(2021, 4, 21, 14, 0),
    end: new Date(2021, 4, 21, 16, 0),
  },
  {
    title: '큐시즘 회의',
    start: new Date(2021, 4, 21, 19, 0),
    end: new Date(2021, 4, 21, 22, 0),
  },
  {
    title: '텐텐데이',
    start: new Date(2021, 4, 22, 10, 0),
    end: new Date(2021, 4, 22, 22, 0),
  },
   {
    title: '과제2',
    start: new Date(2021, 4, 23, 15, 0),
    end: new Date(2021, 4, 23, 17, 30),
  },
  {
    title: '과제3',
    start: new Date(2021, 4, 25, 14, 0),
    end: new Date(2021, 4, 25, 16, 0),
  },
  {
    title: '회의',
    start: new Date(2021, 4, 30, 10, 0),
    end: new Date(2021, 4, 30, 12, 30),
  },
  {
    title: '아르바이트',
    start: new Date(2021, 4, 30, 15, 45),
    end: new Date(2021, 4, 30, 16, 30),
  },
]


const RecommendScreen = ({ navigation })=> {
  return (
    <Tab.Navigator>
        <Tab.Screen name="first" component={ScreenGenerator} options={{headerShown: false}} initialParams={{ num: 1 }}/>
        <Tab.Screen name="second" component={ScreenGenerator}  initialParams={{ num: 2 }}/>
        <Tab.Screen name="third" component={ScreenGenerator}  initialParams={{ num: 3 }}/>
        <Tab.Screen name="fourth" component={ScreenGenerator}  initialParams={{ num: 4 }}/>
    </Tab.Navigator>
  );
}

function ScreenGenerator({ navigation, route }){
    const num = route.params.num;

    //var algoScrNum = algoNum;
 
      
    
      //const [events1, setEvents1] = useState([])
      const [actualEvents, setActualEvents] = useState([])
      const [date, setDate] = useState();
      const [algoNum, setAlgoNum] = useState(0);
      useEffect(() => {
        //원래는 axios.get으로 알고리즘 완성된 배열 가져오기.
        setActualEvents(eventsExample1);
        //setEvents1(eventsExample1);

        let current_date = new Date()
        let after_1week_date = new Date(Date.parse(current_date) + 7 * 1000 * 60 * 60 * 24)
        let after_2week_date = new Date(Date.parse(current_date) + 14 * 1000 * 60 * 60 * 24)
        let after_3week_date = new Date(Date.parse(current_date) + 21 * 1000 * 60 * 60 * 24)
        if(num==1){
          setDate(current_date) //new Date(2021,4,9)
          console.log(1)
          console.log(date)
        }
        if(num==2){
          setDate(after_1week_date) //new Date(2021,4,16)
          console.log(2)
          console.log(date)
        }
        if(num==3){
          setDate(after_2week_date)
          console.log(date)
        }if(num==4){
          setDate(after_3week_date)
        }
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
          setActualEvents(eventsExample1); // 첫번째 알고리즘.
        }
        if(algoNum==1){
          setAlgoNum(2)
         setActualEvents(eventsExample2); // 두번째 알고리즘.
        }
        if(algoNum==2){
          setAlgoNum(0)
          setActualEvents(eventsExample3); // 세번째 알고리즘
        }
      }

      return (
        <View>
        <Text>Recommend {num} Screen!</Text>
        <Icon name="leftcircle" size={24} color="green" onPress={changeRecommendLeft} /> 
        <Icon name="rightcircle" size={24} color="green" onPress={changeRecommendRight} /> 
        <Button
          title="Back"
          onPress={() => navigation.navigate('MainToDo')}
        />
        <Button
          title="Confirm"
          onPress={() => navigation.navigate('MainCalendar')}
        />
        <Calendar events={actualEvents} height={500} 
        locale="ko" date={date}
        onPressEvent={(day)=>clickEvent(day)}
        swipeEnabled={true}
        />
        
      </View>
      );
}
    


export default RecommendScreen;