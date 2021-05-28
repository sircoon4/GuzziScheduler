import React,{useState} from 'react';
import { Button, View,Switch, Text,StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import Tooltip from 'react-native-walkthrough-tooltip';
import Modal from 'react-native-modal';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'path';

import NotifService from '../utils/NotifService';

function SettingScreen({ navigation }) {
  const [alarm, setAlarm] = useState(true);
  const alarmToggleSwitch = () => setAlarm(previousState => !previousState);

  const [darkMode, setDarkMode] = useState(false);
  const darkToggleSwitch = () => setDarkMode(previousState => !previousState);

  const [rountineModal, setRoutine] = useState(false);
  function SettingRoutine(){
    setRoutine(!rountineModal);
  };
  const [wakeupTimePicker, setWPickerMode] = useState(null);
  const [sleepTimePicker, setSPickerMode] = useState(null);
  const [wakeupTime, setWakeupTime] = useState(null);
  const [sleepTime, setSleepTime] = useState(null);

  const [alarmAttach, setAlarmAttach] = useState(false);

  const showWTimePicker = () => {
    setWPickerMode("time");
  };

  const showSTimePicker = () =>{
    setSPickerMode("time");
  }

  const hideWPicker = () => {
    setWPickerMode(null);
  };
  const hideSPicker=()=>{
    setSPickerMode(null);
  }

  const handleWConfirm = (time) => {
    hideWPicker();
    setWakeupTime(time)
  };

  const handleSConfirm = (time)=>{
    hideSPicker();
    setSleepTime(time);
  }

  // 선택 버튼 1: 아침형, 2: 점심형, 3: 저녁형, 4: 새벽형
  const [selectItem,setSelect]=useState(null);
  function SettingChecked(item){
    setSelect(item);
  }

  const getItemStyleTweaks = (key) => {
    let style;
    return {
      backgroundColor: getSelectedColor(key),
    }
  }

  const getSelectedColor=(key)=>{
    let color='#5E5E5E'
    if(key==selectItem){
      color='#4E5CF6'
    }
    return color;
  }

  var notif = null;
  React.useEffect(() => {
    notif = new NotifService(onRegister, onNotif);
  });

  if(!alarmAttach){
    setAlarmAttach(true);
  }

  const onRegister = (token) => {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  const onNotif = (notif) => {
    //Alert.alert(notif.title, notif.message);
    navigation.navigate('Check');
  }

  function formatAMPM(date) {
    var hours = date.toString().slice(16,18);
    var minutes = date.toString().slice(19,21);
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  return (
    <View style={{ flex: 1,paddingHorizontal:20, paddingTop:30, paddingBottom:20,backgroundColor:'white' }}>
      <Text style={styles.mainTitle}>설정</Text>
      <View style={{paddingHorizontal:10, paddingVertical:20}}>
      <Text style={styles.contentTitle}>기본 설정</Text>
      <TouchableOpacity style={{flexDirection:'row'}}>
        <Text style={styles.menu}>프리미엄 계정으로 변환</Text>
        <Icon name="chevron-forward" size={23} color={'#555555'} 
        style={{position:'absolute',right:5,marginVertical:10}}></Icon>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row'}}>
        <Text style={styles.menu}>달력 설정</Text>
        <Icon name="chevron-forward" size={23} color={'#555555'} 
        style={{position:'absolute',right:5,marginVertical:10}}></Icon>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={SettingRoutine}>
        <Text style={styles.menu}>루틴 설정</Text>
        <Icon name="chevron-forward" size={23} color={'#555555'} 
        style={{position:'absolute',right:5,marginVertical:10}}></Icon>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{flexDirection:'row'}}
        onPress={() => notif.localNotif()}
      >
        <Text style={styles.menu}>Push 알림 받기</Text>
        <Switch
        trackColor={{ false: "#E5E5E5", true: "#4E5CF6" }}
        thumbColor={alarm ? "white" : "#white"}
        onValueChange={alarmToggleSwitch}
        value={alarm}
        style={{position:'absolute',right:0,marginVertical:10, transform: [{ scaleX: 1.2 }, { scaleY: 1.2}] }}/>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row'}}>
        <Text style={styles.menu}>다크 모드</Text>
        <Switch
        trackColor={{ false: "#E5E5E5", true: "#4E5CF6" }}
        thumbColor={darkMode ? "white" : "#white"}
        onValueChange={darkToggleSwitch}
        value={darkMode}
        style={{position:'absolute',right:0,marginVertical:10, transform: [{ scaleX: 1.2 }, { scaleY: 1.2}] }}/>
      </TouchableOpacity>
     
    </View>
    <Text style={styles.line}></Text>
    <View style={{paddingHorizontal:10, paddingVertical:20}}>
      <Text style={styles.contentTitle}>더 보기</Text>
      <TouchableOpacity style={{flexDirection:'row'}}>
        <Text style={styles.menu}>도움말</Text>
        <Icon name="chevron-forward" size={23} color={'#555555'} 
        style={{position:'absolute',right:5,marginVertical:10}}></Icon>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row'}}>
        <Text style={styles.menu}>이용 약관</Text>
        <Icon name="chevron-forward" size={23} color={'#555555'} 
        style={{position:'absolute',right:5,marginVertical:10}}></Icon>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row'}}>
        <Text style={styles.menu}>버전 정보</Text>
        <Icon name="chevron-forward" size={23} color={'#555555'} 
        style={{position:'absolute',right:5,marginVertical:10}}></Icon>
      </TouchableOpacity>
    </View>
    <View 
      //style={{position:'absolute', bottom: 10, width: '100%', alignItems: 'center'}}
    >
      <Text style={[styles.appInfo]}>플랜메이커 Plan Maker ver0.9.3</Text>
    </View>
    <Modal 
        isVisible ={rountineModal}
        onBackdropPress = {SettingRoutine}>
          <View style={styles.modal}>
                <View style={{padding:10, alignItems:'center'}}>
                
                <Text style={[styles.subTitle,{marginTop:15}]}>기상/취침 시간을 알려주세요</Text>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={showWTimePicker}>
                    <Text style={[styles.textButton]}>기상 시간 설정</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={showSTimePicker}>
                    <Text style={[styles.textButton]}>취침 시간 설정</Text>
                  </TouchableOpacity>  
                </View>
                <View style={{flexDirection:'row',marginBottom:20}}>
                  <View style={{flexDirection:'row',marginHorizontal:"10%"}}>
                    
                    <Text style={styles.timeText}>{wakeupTime?formatAMPM(wakeupTime):'08:00:AM'}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginHorizontal:"10%"}}>
                    <Text style={styles.timeText}>{sleepTime?formatAMPM(sleepTime):'12:00:PM'}</Text>
                  </View>
                  </View>
                <Text style={[styles.subTitle]}>주로 어떤 시간대에 활동하세요?</Text>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity key={1} style={[styles.button,getItemStyleTweaks(1)]} onPress={()=>SettingChecked(1)}>
                      <Text style={styles.option}>아침형</Text>
                  </TouchableOpacity>
                  <TouchableOpacity key={2} style={[styles.button,getItemStyleTweaks(2)]} onPress={()=>SettingChecked(2)}>
                      <Text style={styles.option}>점심형</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',marginBottom:30}}>
                  <TouchableOpacity key={3} style={[styles.button,getItemStyleTweaks(3)]} onPress={()=>SettingChecked(3)}>
                      <Text style={styles.option}>저녁형</Text>
                  </TouchableOpacity>
                  <TouchableOpacity key={4} style={[styles.button,getItemStyleTweaks(4)]} onPress={()=>SettingChecked(4)}>
                    <Text style={styles.option}>새벽형</Text>
                  </TouchableOpacity>
                </View>
                </View>
                </View>
                <DateTimePickerModal
                  isVisible={wakeupTimePicker !== null}
                  mode={wakeupTimePicker}
                  onConfirm={handleWConfirm}
                  onCancel={hideWPicker}
                  display={"spinner"}
                />
                <DateTimePickerModal
                  isVisible={sleepTimePicker !== null}
                  mode={sleepTimePicker}
                  onConfirm={handleSConfirm}
                  onCancel={hideSPicker}
                  display={"spinner"}
                />
            </Modal>  
    </View>
     
  );
}
const styles = StyleSheet.create({
  mainTitle: {
    paddingBottom:10,
    paddingLeft:10,
    fontSize:20,
    fontWeight:'bold',
    borderBottomWidth: 1,
    fontSize:25,
    fontWeight:'bold',
    borderBottomColor: '#dedede'
  },
  subTitle:{
    paddingVertical:10,
    fontSize:17,
    color:'gray',
  },
  timeText:{
    fontSize:15,
    color:'#555555',
  },
  textButton:{
    fontSize:20,
    fontWeight:'bold',
    paddingHorizontal:20,
    paddingTop:20,
    paddingBottom:3,
    color:'#555555',
    marginBottom:15,
  },
  button:{
    width:'40%',
    height:40,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10,
    marginHorizontal:7,
    backgroundColor:'#4E5CF6'
  },
  option:{
    padding:5,
    color:'white', // #626262
    fontWeight:'bold'
  },
  line:{
    fontSize:1,
    borderTopWidth: 1,
    fontWeight:"bold",
    borderTopColor:'#dedede'
  },
  contentTitle:{
    position:'relative',
    fontSize:17,
    color:'gray',
    marginBottom:12,
  },
 
  menu:{
    fontSize:16,
    marginVertical:14,
  },
  appInfo:{
    position:'absolute',
    top:10,
    color:'#666666',
    paddingTop:10, 
    paddingLeft: 10
  },
  modal: {
    height: '57%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
},
});
export default SettingScreen;