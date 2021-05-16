import React, { useState, useCallback ,Component} from "react";
import { View, TouchableOpacity, Text, Button ,StyleSheet} from "react-native";
import { DraxProvider, DraxView ,DraxList} from 'react-native-drax';
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";
import Setting from './Setting'
import { borderRadius } from "react-select/src/theme";
import Icon from 'react-native-vector-icons/AntDesign';
import { block } from "react-native-reanimated";

export function requestList(){
  return [
    { id:Math.random().toString(),title: "정기회의1", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime:3,priority:4},
  { id:Math.random().toString(),title: "교육세션1", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime:3,priority:4}, 
  { id:Math.random().toString(),title: "정기회의2", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime:3,priority:4}, 
  {id:Math.random().toString(), title: "교육세션2", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime:3,priority:4}, 
  { id:Math.random().toString(),title: "정기회의3", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime: 3,priority:4}, 
   ];
  }
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const getBackgroundColor = (userIndex) => {
  switch (userIndex % 6) {
    case 0:
      return '#ffaaaa';
    case 1:
      return '#aaffaa';
    case 2:
      return '#aaaaff';
    case 3:
      return '#ffffaa';
    case 4:
      return '#ffaaff';
    case 5:
      return '#aaffff';
    default:
      return '#aaaaaa';
  }
}

const getHeight = (userIndex) => {
  let height = 130;
  return height;
}

const getItemStyleTweaks = (userItem) => {
  const userIndex = 6;
  return {
    backgroundColor: getBackgroundColor(userIndex),
    height: getHeight(userIndex),
  };
};

const MainToDoListScreen = ({navigation}) => {

  // 전체 todos
  const [todos,setTodos]=useState(requestList());
  // 1. todo 추가
  const addTodo = (newTitle, newStart, newEnd, newDuration, newMin, newMax, newPriority) => {
    console.log("Hello");
    setTodos(() =>[
      ...todos,
      {id:Math.random().toString(),title:newTitle,startDate:newStart,endDate:newEnd ,
      duration: newDuration, minTime: newMin, maxTime:newMax, priority:newPriority},
      ]);
      SettingModal();
  };
 // 2. todo 삭제
  const onRemove = id =>{

    setTodos(todos.filter(todo=>todo.id!==id));
  };

  // 3. todo 추가를 위한 사용자 입력 화면
  const [modal,setModal]=useState(false);
  function SettingModal(){
    setModal(!modal);
  };

  return (
    <View style={{flex:1}}>
      <Text style={styles.mainTitle}>ToDo-List</Text>
      <DraxProvider>
      <View style={styles.container}>
          <DraxList
            data={todos}
            renderItemContent={({ item }) => (
              <View style={[styles.alphaItem, getItemStyleTweaks(item)]}>
                <Text style={styles.title}> Title: {item.title}{"\n"}</Text>
                <Text style={styles.alphaText}>
                  startDate: {item.startDate}   ~   endDate: {item.endDate}{"\n"}
                  duration: {item.duration}(h)                       priority: {item.priority}{"\n"}
                  minTime: {item.minTime}(h)                         maxTime: {item.maxTime}(h){"\n"}
                </Text>
                <TouchableOpacity style={styles.completeCircle}>
                <Text style={styles.buttonText} onPress={()=>onRemove(item.id)}>
                  <Icon name="circledowno" size={24} color="green" />
                </Text>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText} onPress={()=>onRemove(item.id)}>
                  <Icon name="delete" size={25} color="#e33057" />
                </Text>
              </TouchableOpacity> 
              </View>
            )}
            onItemReorder={({ fromIndex, toIndex }) => {
              const newData = todos.slice();
              newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
              setTodos(newData); // 우선순위 변경
            }}
            keyExtractor={(item) => item}
          />
        <View style={styles.btn_container}>
          <TouchableOpacity onPress={()=>SettingModal()}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
        </View>
        {modal?<Setting modalHandler={()=>SettingModal()} onAddTodo={addTodo}/>:<></>}
      </DraxProvider>
      <Button
      title="Recommend"
      onPress={() => navigation.navigate('Recommend')}
   />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
  },
  mainTitle:{
    fontSize: 25,
    textAlign:"center",
    marginTop: 15,
    marginBottom: -25,
  },
  btn_container: {
      position: "absolute",
      bottom:10,
      right:0,
      color:`white`,
      backgroundColor: `orange`,
      alignItems: 'center',
      justifyContent: `center`,
      width:60,
      height:60,
      borderRadius: 35
   },
   title: {
      fontSize: 17,
      fontWeight: "bold"
   },
  alphaItem: {
    backgroundColor: '#aaaaff',
    borderRadius: 8,
    margin: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10
  },
  alphaText: {
    fontSize: 16
  },
  date_container: {
    flex: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
    textAlign:"center",
    color: `white`,
  },
  completeCircle: {
    position:'absolute',
    left:305,
    bottom: 95
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unstrikeText: {
    color: '#29323c',
  },
  buttonContainer: {
    position:'absolute',
    left:340,
    bottom: 95,
  }
});

export default MainToDoListScreen;
