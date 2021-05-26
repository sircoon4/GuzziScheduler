import React,{useState} from 'react';
import { Button, View,Switch, Text,StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Tooltip from 'react-native-walkthrough-tooltip';
import Modal from 'react-native-modal';
import DateTimePickerModal from "react-native-modal-datetime-picker";

function SettingScreen({ navigation }) {
  const [alarm, setAlarm] = useState(true);
  const alarmToggleSwitch = () => setAlarm(previousState => !previousState);

  const [darkMode, setDarkMode] = useState(false);
  const darkToggleSwitch = () => setDarkMode(previousState => !previousState);

  const [showTip, setTip] = useState(false);
  const [rountineModal, setRoutine] = useState(false);
  function SettingRoutine(){
    setRoutine(!rountineModal);
  };
  const [pickerMode, setPickerMode] = useState(null);

  const showDatePicker = () => {
    setPickerMode("date");
  };

  const showTimePicker = () => {
    setPickerMode("datetime");
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const handleConfirm = (date) => {
    // In order to prevent the double-shown popup bug on Android, picker has to be hidden first (https://github.com/react-native-datetimepicker/datetimepicker/issues/54#issuecomment-618776550)
    hidePicker();
    console.warn("A date has been picked: ", date);
  };

  // 선택 버튼
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

  return (
    <View style={{ flex: 1,paddingHorizontal:20, paddingTop:10, paddingBottom:20,backgroundColor:'white' }}>
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
      <TouchableOpacity style={{flexDirection:'row'}}>
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
    <View>
      <Text style={styles.appInfo}>플랜메이커 Plan Maker ver5.2.9</Text>
    </View>
    <Modal 
        isVisible ={rountineModal}
        onBackdropPress = {SettingRoutine}>
          <View style={styles.modal}>
                <View style={{padding:10, alignItems:'center'}}>
                
                <Text style={[styles.subTitle,{marginTop:15}]}>기상/취침 시간을 알려주세요</Text>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={showTimePicker}>
                    <Text style={[styles.textButton]}>기상 시간 설정</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={[styles.textButton]}>취침 시간 설정</Text>
                  </TouchableOpacity>  
                </View>
                <Text style={[styles.subTitle]}>주로 어떤 시간대에 활동하세요?</Text>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity key={1} style={[styles.button,getItemStyleTweaks(1)]} /* onPress={SettingChecked(1)}*/>
                      <Text style={styles.option}>아침형</Text>
                  </TouchableOpacity>
                  <TouchableOpacity key={2} style={[styles.button,getItemStyleTweaks(2)]}/* onPress={SettingChecked(2)}*/>
                      <Text style={styles.option}>점심형</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',marginBottom:30}}>
                  <TouchableOpacity key={3} style={[styles.button,getItemStyleTweaks(3)]} /* onPress={SettingChecked(3)}*/>
                      <Text style={styles.option}>저녁형</Text>
                  </TouchableOpacity>
                  <TouchableOpacity key={4} style={[styles.button,getItemStyleTweaks(4)]} /* onPress={SettingChecked(4)}*/>
                    <Text style={styles.option}>새벽형</Text>
                  </TouchableOpacity>
                </View>
                </View>
                </View>
                <DateTimePickerModal
                  isVisible={pickerMode !== null}
                  mode={pickerMode}
                  onConfirm={handleConfirm}
                  onCancel={hidePicker}
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
    fontWeight:"bold",
    borderBottomColor: '#dedede'
  },
  subTitle:{
    paddingVertical:10,
    fontSize:17,
    color:'gray',
  },
  textButton:{
    fontSize:20,
    fontWeight:'bold',
    padding:20,
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
    marginBottom:5,
  },
 
  menu:{
    fontSize:16,
    marginVertical:10,
  },
  appInfo:{
    color:'gray'
  },
  modal: {
    height: '55%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
},
});
export default SettingScreen;