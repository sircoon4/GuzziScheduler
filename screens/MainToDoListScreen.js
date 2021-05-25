import React, { useState} from "react";
import { View, TouchableOpacity, Text, Button ,StyleSheet,Alert} from "react-native";
import { DraxProvider, DraxView ,DraxList} from 'react-native-drax';
import Setting from '../rn_modules/Setting';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { ProgressBar, Colors } from 'react-native-paper';
import Modal from 'react-native-modal';


export function requestList(){
  return [
    { id:0,title: "정기회의1", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:"12",
  minTime:"1", maxTime:"3",priority:"4",color:'#ED6B58', process:0.64},
  { id:1,title: "교육세션1", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:"12",
  minTime:"1", maxTime:"3",priority:"4",color:'#6178C3', process:0.20}, 
  { id:2,title: "정기회의2", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:"12",
  minTime:"1", maxTime:"3",priority:"4", color:'#F19D4E',process:0.80}, 
  {id:3, title: "교육세션2", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:"12",
  minTime:"1", maxTime:"3",priority:"4", color:'#439459',process:0.1}, 
  { id:4,title: "정기회의3", startDate: "2020-05-11" ,endDate:"2020-05-12",duration:"12",
  minTime:"1", maxTime: "3",priority:"4", color:'#8A2DA3',process:0.64}, 
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
  const height = 180;
  return height;
};

const getItemStyleTweaks = (userItem,unselectList,active) => {
  const userIndex=6;
  return {
    backgroundColor: getSelectedColor(userItem,unselectList,active),
    height: getHeight(userIndex),
    borderColor:userItem.color,
    borderWidth:getBorderWidth(userItem,unselectList,active)
  };
};
 
const handleSelected = (id,unselectList)=>{
  return{
    backgroundColor: getSelectedColor(id,unselectList),
    height:150,
  } 
};
const getBorderWidth=(item,unselectList,active)=>{
  let width=0;
  if(unselectList.find(el=>el.id===item.id)){
    ;
  }  else{
    if(active)
      width=6;
  
  }
  return width;
}

const getSelectedColor=(item,unselectList,active)=>{
  let color= '#aaffaa';
    let r = parseInt(item.color.slice(1, 3), 16);
    let g = parseInt(item.color.slice(3, 5), 16);
    let b = parseInt(item.color.slice(5, 7), 16);

    color= "rgba(" + r + ", " + g + ", " + b + ", " + 0.3 + ")";
  
   
  return color;
};

const MainToDoListScreen = ({navigation}) => {
  // 전체 todos
  const [todos,setTodos]=useState(requestList());
  // 1. todo 추가
  const addTodo = (newTitle, newStart, newEnd, newDuration, newMin, newMax, newPriority,newColor) => {
    const newItem = {id:id,title:newTitle,startDate:newStart,endDate:newEnd ,
      duration: newDuration, minTime: newMin, maxTime:newMax, priority:newPriority,color:newColor,process:0} 
   
      if(edit){
      setId(editId)
      const originItem = {id:id,title:newTitle,startDate:newStart,endDate:newEnd,
        duration: newDuration, minTime: newMin, maxTime:newMax, priority:newPriority,color:newColor,process:0} 
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
  const [check,setCheck] = useState(true);

  function SettingActive(){
    console.log(active);
    if(!active)setUnselected(todos);
    setActive(!active);
  }
  const [unselectList,setUnselected]=useState(todos);
  function SettingChecked(item){
    if(active){
      if(count==0 || unselectList.indexOf(item)>-1){
        setUnselected(unselectList.filter(el=>el.id!==item.id));
        console.log("hello");
      }
      else {setUnselected(()=>[...unselectList,item]);
    console.log("hi");}
    SettingCount();
  }
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
  const [count,setCount]=useState(0);
  function SettingCount(){
    setCount(count+1);
  }

  function Plus(){
    SettingModal();
    setEdit(false);
  }

  // item select

  return (
    <View style={{flex:1}}>
      <DraxProvider>

      <View style={styles.container}>
        <TouchableOpacity style={styles.btn}
          onPress={() => SettingActive()}>
            <Text  style={styles.buttonText}>선택</Text>
        </TouchableOpacity>
        <View style={styles.btn_container}>
          <TouchableOpacity onPress={Plus}>
          <Icon name="pluscircleo" size={25} color="blue"/>
          </TouchableOpacity>
        </View>

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
              <ProgressBar style={{position:"relative", top:5, left:'48%', width:150, height:22}} progress={parseFloat(item.process)} color={item.color}  />
              <Text style={{position:"relative", bottom:18, left:'50%',color:'white', fontWeight:'bold'}}>{item.process}%</Text>
              </TouchableOpacity>
              
            )}
            onItemReorder={({ fromIndex, toIndex }) => {
              const newData = todos.slice();
              newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
              setTodos(newData); 
            }}
            
            keyExtractor={(item) => item}
          />
       
        </View>
      </DraxProvider>
      <View style={{width:'100%', justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
        <TouchableOpacity style={styles.btn_container2}
        onPress={() => navigation.navigate('Recommend')}>
          <Icon2 name="magic" size={22} color="white" />
          <Text style={{color:'white', margin:6, fontSize:15}}>Plan Maker</Text></TouchableOpacity>
     
      </View>
      <Modal 
          isVisible ={modal}
          onBackdropPress = {SettingModal}>
          <Setting onAddTodo={addTodo} idHandler={SettingId} 
      modalHandler={SettingModal} editSign={edit} editItem={editList}/>
        </Modal>
    
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
    backgroundColor:'white',
  },
  mainTitle:{
    fontSize: 25,
    textAlign:"center",
    marginTop: 15,
    marginBottom: -25,
  },
  btn:{  // 선택
   position:'absolute',
   top:10,
   left:15,
  },
  btn_container: {  // + 버튼
    position: "absolute",
    top:5,
    right:10,
   },
   btn_container2: {
    flexDirection:'row',
    backgroundColor:"#4E5CF6",
    width:'30%',
    position:'relative',
    left:'30%',
    padding:3,
    justifyContent:'center',
    borderRadius:6,
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
    color:'blue',
    fontSize:18,
  },
  color:{
    flexDirection:'row',
    paddingRight:10,
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
});

export default MainToDoListScreen;
