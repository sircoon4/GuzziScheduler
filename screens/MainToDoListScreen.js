import React, { useState} from "react";
import { View, TouchableOpacity, Text, Button ,StyleSheet,Alert} from "react-native";
import { DraxProvider, DraxView ,DraxList} from 'react-native-drax';
import Setting from '../rn_modules/Setting';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Feather';
import { ProgressBar, Colors } from 'react-native-paper';
import Modal from 'react-native-modal';


export function requestList(){
  return [
    { id:0,title: "큐시즘 영상제작", startDate: "2021-05-27" ,endDate:"2021-06-02",duration:"3",
  minTime:"1", maxTime:"3",priority:"4",color:'#ED6B58', process:0.64},
  { id:1,title: "헬시즘", startDate: "2021-05-27" ,endDate:"2021-05-30",duration:"4",
  minTime:"1", maxTime:"4",priority:"6",color:'#6178C3', process:0.20}, 
  { id:2,title: "큐시즘 출사 소모임", startDate: "2021-05-27" ,endDate:"2021-05-31",duration:"1",
  minTime:"1", maxTime:"1",priority:"1", color:'#F19D4E',process:0.80}, 
  {id:3, title: "마케팅 스터디 과제", startDate: "2021-05-27" ,endDate:"2021-05-30", duration:"3",
  minTime:"1", maxTime:"3",priority:"5", color:'#439459',process:0.5}, 
  { id:4,title: "큐시즘 롤링페이퍼", startDate: "2021-05-27" ,endDate:"2021-06-01", duration:"3",
  minTime:"1", maxTime: "3",priority:"2", color:'#8A2DA3',process:0.64}, 
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
  const height = 97;
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
    height:30,
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
  const addTodo = (newTitle, newStart, newEnd, newDuration, newMin, newMax, newPriority,newColor,newProcess) => {
    const newItem = {id:id,title:newTitle,startDate:newStart,endDate:newEnd ,
      duration: newDuration, minTime: newMin, maxTime:newMax, priority:newPriority,color:newColor,process:newProcess} 
   
      if(edit){
      setEditId(id)
      console.log(id);
      const originItem = {id:id,title:newTitle,startDate:newStart,endDate:newEnd,
        duration: newDuration, minTime: newMin, maxTime:newMax, priority:newPriority,color:newColor,process:newProcess} 
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
    setModal(!modal)
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
  else{
    SettingEdit(item)
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
    setId(item.id);
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
              <TouchableOpacity onload={()=>settingDday} onPress={()=>SettingChecked(item)} style={[styles.alphaItem, getItemStyleTweaks(item,unselectList,active)]}>
                <View style={styles.color}>
                  
                  <Text style={styles.title}>{item.title}{"\n"}</Text>
                  <Text style={{fontSize:19, color:'#646464', position:'absolute', left:'87%',textAlign:'right',width:'15%'}}>D-{Math.floor((new Date(item.endDate).getTime()-new Date().getTime())/(1000 * 60 * 60 * 24))}</Text>
                </View>
                
              <ProgressBar style={{position:"relative", left:'50%', width:180, height:26,borderRadius:5}} progress={parseFloat(item.process)} color={item.color}  />
              <Text style={{position:"relative", bottom:22, left:'52%',color:'white', }}>{item.process*100}%</Text>
              
              {item.id%3==0?<Icon3 name="paperclip" size={22} color={'black'} style={{position:'absolute',bottom:'12%',left:'2%'}}/>
              :item.id==2? <Icon4 name="link" size={22} color={'#555555'} style={{position:'absolute',bottom:'12%',left:'2%'}}/>:<></>}
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
      modalHandler={SettingModal} editSign={edit} editItem={editList} onRemove={onRemove}/>
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
      fontSize: 18,
      color:'black'
   },
  alphaItem: {
    backgroundColor: '#aaaaff',
    borderRadius: 8,
    marginVertical: '2%',
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
