import React, { useState} from "react";
import { View, TouchableOpacity, Text, Button ,StyleSheet,Alert} from "react-native";
import { DraxProvider, DraxView ,DraxList} from 'react-native-drax';
import Setting from '../rn_modules/Setting';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';


export function requestList(){
  return [
    { id:0,title: "정기회의1", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime:3,priority:4,color:'red'},
  { id:1,title: "교육세션1", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime:3,priority:4,color:'blue'}, 
  { id:2,title: "정기회의2", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime:3,priority:4, color:'blue'}, 
  {id:3, title: "교육세션2", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime:3,priority:4, color:'yellow'}, 
  { id:4,title: "정기회의3", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:12,
  minTime:1, maxTime: 3,priority:4, color:'red'}, 
   ];
  }

const getBackgroundColor = (userItem) => {
  if(selectList.includes(userItem))userIndex=0;
  else userIndex=1;
  switch (userIndex % 6) {
    case 0:
      return '#dedede';
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
};

const getHeight = (userIndex) => {
  const height = 130;
  return height;
};

const getItemStyleTweaks = (userItem,unselectList,active) => {
  const userIndex=6;
  return {
    backgroundColor: getSelectedColor(userItem,unselectList,active),
    height: getHeight(userIndex),
  };
};
 
const handleSelected = (id,unselectList)=>{
  return{
    backgroundColor: getSelectedColor(id,unselectList),
    height:130,
  } 
};

const getSelectedColor=(item,unselectList,active)=>{
  let color= '#aaffaa';
  if(unselectList.find(el=>el.id===item.id))
      color='#rgba(0,0,0,0.1)';
  else{
    if(active)
      color='#aaffaa'; // item.color로 추후 변경 예정
    else 
      color='#rgba(0,0,0,0.1)';
  }
  return color;
};

const MainToDoListScreen = ({navigation}) => {
  // 전체 todos
  const [todos,setTodos]=useState(requestList());
  // 1. todo 추가
  const addTodo = (newTitle, newStart, newEnd, newDuration, newMin, newMax, newPriority,newColor) => {
    const newItem = {id:id,title:newTitle,startDate:newStart,endDate:newEnd ,
      duration: newDuration, minTime: newMin, maxTime:newMax, priority:newPriority,color:newColor} 
    if(edit){
      setId(editId)
      const originItem = {id:id,title:newTitle,startDate:newStart,endDate:newEnd ,
        duration: newDuration, minTime: newMin, maxTime:newMax, priority:newPriority,color:newColor} 
      setTodos(todos.map(todo=>todo.id==editId?originItem:todo));
      setEditId(null);
      setId(todos.length);
    }
    else{
      setTodos(() =>[
      ...todos,
      newItem
      ]);
      setUnselected(()=>[
        ...unselectList, newItem
      ]);
    }
      SettingModal();
  };

  const showDelteAlert = (item) =>
  Alert.alert(
    "Delete Todo",
    "Are you sure you want to delete",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert(
          "",
          "Cancel."),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          Alert.alert(
            "",
            "Deleted successfully.");    
          onRemove(item.id)
        },
        style: "default",
      }
    ],
  );
  const showCompleteAlert = (item) =>
  Alert.alert(
    "Complete Todo",
    "Are you sure you want to complete",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert(
          "",
          "Cancel."),
        style: "cancel",
      },
      {
        text: "Complete",
        onPress: () => {
          Alert.alert(
            "",
            "Complete");    
          onRemove(item.id)
        },
        style: "default",
      }
    ],
  );

// todo 추가시 변경된 id 반영
  const[id,setId]=useState(todos.length);
  const SettingId=()=>{
    setId(id+1);
  }
 // 2. todo 삭제
  const onRemove = id =>{
    setTodos(todos.filter(todo=>todo.id!==id));
  };

  // 3. todo 추가를 위한 사용자 입력 화면
  const [modal,setModal]=useState(false);
  function SettingModal(){
    setModal(!modal);
  };
  
  // 4. 선택된 elemnt
  const [active,setActive]=useState(false);
  const [check,setCheck] = useState(false);

  function SettingActive(){
    setActive(!active);
  }
  // 5. edit
  const [editId,setEditId]=useState(null);
  function settingEditID(item){
    setEdit(item.id);
  }
  const [edit,setEdit]=useState(false);
  const [editList,setEditList]=useState([]);
  function SettingEdit(item){
    setEdit(true);
    setEditList(todos.filter(todo=>todo.id==item.id));
    setEditId(item.id);
    SettingModal();
  }
  const [count,setCount]=useState('0');
  function SettingCount(){
    setCount(count+1);
  }
  
  const [unselectList,setUnselected]=useState(requestList());
  function SettingChecked(item){
    if(active){
      SettingCount();
      if(count==1){
        setCheck(true);
      }
      else if(unselectList.indexOf(item)>-1)setCheck(true);
      else setCheck(false)
      if(check){
        setUnselected(unselectList.filter(el=>el.id!==item.id));
      }
      else{
        setUnselected(()=>[...unselectList,item]);
      }
    }
  }
  return (
    <View style={{flex:1}}>
      <Text style={styles.mainTitle}>ToDo-List</Text>
      <DraxProvider>
      <View style={styles.container}>
          <DraxList
            data={todos}
            renderItemContent={({ item }) => (
              <TouchableOpacity onPress={()=>SettingChecked(item)} style={[styles.alphaItem, getItemStyleTweaks(item,unselectList,active)]}>
                <View style={styles.color}>
                  <Icon2 name="circle" size={20} color={item.color} style={styles.color}/>
                  <Text style={styles.title}>{item.title}{"\n"}</Text>
                </View>
                <Text style={styles.alphaText}>
                  id: {item.id}
                  term: {item.startDate}   ~   {item.endDate}{"\n"}
                  duration: {item.duration}(h)                       priority: {item.priority}{"\n"}
                  minTime: {item.minTime}(h)                         maxTime: {item.maxTime}(h){"\n"}
                </Text>
                <TouchableOpacity style={styles.editIcon}>
                <Text onPress={()=>SettingEdit(item)}>
                  <Icon name="edit" size={20} color="black" />
                </Text>
              </TouchableOpacity> 
                <TouchableOpacity style={styles.completeIcon}>
                <Text onPress={()=>showCompleteAlert(item)}>
                  <Icon name="circledowno" size={20} color="blue" />
                </Text>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.deleteIcon}>
                <Text onPress={()=>showDelteAlert(item)}>
                  <Icon name="delete" size={22} color="red" />
                </Text>
              </TouchableOpacity> 
              </TouchableOpacity>
            )}
            onItemReorder={({ fromIndex, toIndex }) => {
              const newData = todos.slice();
              newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
              setTodos(newData); 
            }}
            
            keyExtractor={(item) => item}
          />
        <View style={styles.btn_container}>
          <TouchableOpacity onPress={()=>SettingModal()}>
          <Icon3 name="add-circle" size={70} color="#00B9AD"/>
          </TouchableOpacity>
        </View>
        </View>
      </DraxProvider>
      <View style={styles.btn_container2}>
        <TouchableOpacity style={styles.btn}
        onPress={() => navigation.navigate('Recommend')}>
          <Text style={styles.buttonText}>Recommend</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btn}
        onPress={() => SettingActive()}>
          <Text  style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
      </View>
      {modal?<Setting onAddTodo={addTodo} idHandler={SettingId} 
      modalHandler={SettingModal} editSign={edit} editItem={editList}/>:<></>}

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
  btn:{
   marginRight:10,
   width:'40%',
  },
  btn_container: {
      position: "absolute",
      bottom:10,
      right:5,
   },
   btn_container2: {
    flexDirection:'row',
    backgroundColor:'#rgba(260,260,260,0.1)',
    width:'100%',
    height: '7%',
    justifyContent:'center',
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
    color:"white",
  },
  editIcon:{
    position:'absolute',
    left:270,
    bottom:102
  },
  completeIcon: {
    position:'absolute',
    left:305,
    bottom: 102
  },
  deleteIcon: {
    position:'absolute',
    left:340,
    bottom: 100,
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unstrikeText: {
    color: '#29323c',
  },
 
  buttonText:{
    textAlign:'center',
    paddingTop: '5%',
    color:`#00B9AD`,
    fontSize:20,
  },
  color:{
    flexDirection:'row',
    paddingRight:10,
}
});

export default MainToDoListScreen;
