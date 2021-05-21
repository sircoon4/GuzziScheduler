import React,{useState} from 'react';
import {View, StyleSheet, Picker,Text, TextInput, Image,TouchableOpacity, ScrollView} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import CalendarPicker from 'react-native-calendar-picker';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'


const Setting =(props)=> {
    const sign = props.editSign;
    const item = props.editItem[0];
    const [title,setTitle]=sign?useState(item.title):useState(null);
    const [startDate,setStart]=sign?useState(String(item.startDate)):useState(null);
    const [endDate,setEnd]=sign?useState(String(item.endDate)):useState(null);
    const [duration,setDuration]=sign?useState(String(item.duration)):useState('1');
    const [minTime,setMin]=sign?useState(String(item.minTime)):useState('1');
    const [maxTime,setMax]=sign?useState(String(item.maxTime)):useState('1');
    const [priority,setPrioirty]=sign?useState(String(item.priority)):useState('1');
    const [color, setColor] =sign?useState(String(item.color)):useState('red');
    
    const titleInput = newTitle=>{
        setTitle(newTitle);
    };
    const startInput = newStart=>{
        setStart(newStart);
    };
    const endInput = newEnd=>{
        setEnd(newEnd);
    };
    const durationInput = newduration=>{
        setDuration(newduration);
    };
    const minInput = newMin=>{
        setMin(newMin);
    };
    const maxInput = newMax=>{
        setMax(newMax);
    };
    const priorityInput = newPriority=>{
        setPrioirty(newPriority);
    };
    const addTodoHandler = () => {
        props.idHandler();
        if(title!=null & startDate!=null&endDate!=null){
        props.onAddTodo(title, startDate, endDate,duration, minTime, maxTime, priority,color);
        }
        else{
            props.modalHandler();
        }
      };
  
    
    const textInputStype = {
        height: 35,
        flex:1,
        width: '60%',
        borderColor: 'gray',
        justifyContent:'center',
        borderWidth: 1
      }
      
      const Container = {
        width: '100%',
        flexDirection:'row',
        padding:10
      }


      //  달력에서 date 를 받아옴
      const [startRange,setRangeStart]=useState(null);
      const [endRange,setRangeEnd]=useState(null);

      // 달력에서 받아온 date의 foramt 변경
      const setRange=()=>{
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const month=["01","02","03","04","05","06","07","08","09","10","11","12"]
      const s_dates=startRange.toString().slice(4,15).split(" ");
      const s_month= month[monthNames.indexOf(s_dates[0])];
      const s_day=s_dates[1];
      const s_year=s_dates[2];

      if(s_day.length==1)s_day="0"+`${s_day}`;
      setStart(`${s_year}`+"-"+`${s_month}`+"-"+`${s_day}`);

      const e_dates=endRange.toString().slice(4,15).split(" ");
      const e_month= month[monthNames.indexOf(e_dates[0])];
      const e_day=e_dates[1];
      const e_year=e_dates[2];

      if(e_day.length==1)e_day="0"+`${e_day}`;

      setEnd(`${e_year}`+"-"+`${e_month}`+"-"+`${e_day}`);

      SettingRangeModal();
      }


      // 달력에서 선택한 날짜 값 저장
      const  onDateChange=(date, type)=>{
        if (type === 'END_DATE') {
          setRangeEnd(date);
        } else {
          setRangeStart(date);
          setRangeEnd(null);
        }
      }
      
      const minDate = new Date(); // Today
      const maxDate = new Date(2050, 6, 3);
  
        // todo 추가를 위한 사용자 입력 화면
        const [rangeModal,setRangeModal]=useState(false);
        function SettingRangeModal(){
            setRangeModal(!rangeModal);
        };
    // 일정 색깔
  


      return(
        <>
        <TouchableOpacity style={styles.background} activeOpacity={1}
        onPress={props.modalHandler}/>
        <ScrollView style={styles.container}>

        <View style={styles.modal}>
        <Text style={styles.titleText}>Setting</Text>
        <View style={Container}>
            <Text style={styles.text,{paddingTop:27}}>Title: </Text>
            <TextInput style={styles.ddayInput}
            placeholder="Add Todo!"
            value={title}
            onChangeText={titleInput}></TextInput>
        </View>
        <View style={Container}>
            <Text style={styles.text,styles.color}>Color: </Text>
            <View style={{flexDirection:"row"}}>
                <RadioButton
                    value="red"
                    status={ color === 'red' ? 'checked' : 'unchecked' }
                    onPress={() => setColor('red')}>
                </RadioButton>
                <Text style={styles.color}>red</Text>
                <Icon name="circle" size={20} color="red" style={styles.color}/>
            </View>
            <View style={{flexDirection:"row"}}>
                <RadioButton
                    value="blue"
                    status={ color === 'blue' ? 'checked' : 'unchecked' }
                    onPress={() => setColor('blue')}>
                </RadioButton>
                <Text style={styles.color}>blue</Text>
                <Icon name="circle" size={20} color="blue" style={styles.color}/>
            </View>

            <View style={{flexDirection:"row"}}>
                <RadioButton
                    value="yellow"
                    status={ color === 'yellow' ? 'checked' : 'unchecked' }
                    onPress={() => setColor('yellow')}>
                </RadioButton>
                <Text style={styles.color}>yellow</Text>
                <Icon name="circle" size={20} color="yellow" style={styles.color}/>
            </View>
        </View>
        <View style={Container}>
            <TouchableOpacity  onPress={()=>SettingRangeModal()}>
                <View style={{justifyContent:'center'}}>
                <Text> START DATE:  {startRange?startDate:sign?startDate:''}</Text>
                <Text> END DATE:    {endRange?endDate:sign?endDate:''}</Text>
            </View>
            </TouchableOpacity>
        
      </View>

        <View style={Container}>
            <Text style={styles.text}>Duration :   </Text>
            <TextInputMask
            type={'datetime'}
            options={{
                format: 'HH'
            }}
            value={duration}
            onChangeText={text => {durationInput(text)}}
            style={textInputStype}
            />
        </View>
            <View style={styles.itemContainer}>
                <Text style={styles.text,{padding:10}}>MaxTime: </Text> 
                <Picker
                    selectedValue={maxTime}
                    onValueChange={(itemValue,itemIndex)=>maxInput(itemValue)}
                    style={{ height: 40, width: 290 ,border:1}}
                >
                        <Picker.Item label='1' value="1"/>
                        <Picker.Item label='2' value="2" />
                        <Picker.Item label='3' value="3"/>
                        <Picker.Item label='4' value="4" />
                        <Picker.Item label='5' value="5"/>
                        <Picker.Item label='6' value="6"/>
                    </Picker>
             </View>

            <View style={styles.itemContainer}>
            <Text style={styles.text,{padding:10}}>MinTime: </Text> 
            <Picker
                selectedValue={minTime}
                onValueChange={(itemValue,itemIndex)=>minInput(itemValue)}
                style={{ height: 40, width: 290 }}
                >
                    <Picker.Item label='1' value="1"/>
                    <Picker.Item label='2' value="2" />
                    <Picker.Item label='3' value="3"/>
                    <Picker.Item label='4' value="4" />
                    <Picker.Item label='5' value="5"/>
                    <Picker.Item label='6' value="6"/>
                </Picker>
             </View>
             <View style={styles.itemContainer}>
                <Text style={styles.text,{padding:10}}>Priority:     </Text> 
                <Picker
                    selectedValue={priority}
                    onValueChange={(itemValue,itemIndex)=>priorityInput(itemValue)}
                    style={{ height: 40, width: 290 }}
                >
                        <Picker.Item label='1' value="1"/>
                        <Picker.Item label='2' value="2" />
                        <Picker.Item label='3' value="3"/>
                        <Picker.Item label='4' value="4" />
                        <Picker.Item label='5' value="5"/>
                    </Picker>
             </View>
             <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=>props.modalHandler()}>
                    <Text style={styles.doneText}>Cancel
                </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>addTodoHandler()}>
                    <Text style={styles.doneText}>Complete
                </Text>
                </TouchableOpacity>
            </View>
        </View>
            {rangeModal?
            <View style={styles.dateRange_container}>
                <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <Text style={styles.doneText} onPress={SettingRangeModal}>Cancel
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.doneText} onPress={setRange}>Complete
                </Text>
                </TouchableOpacity>
            </View>
            </View>:<></>}
        </ScrollView>
    </>
);
}
    
  const styles = StyleSheet.create({
      itemContainer:{
        flex: 1,
        flexDirection:"row",
        paddingTop: 10,
        width:'100%'
      },
      buttonContainer:{
        flexDirection:"row",
        alignItems:'center'
      },
      text:{
        flex:1,
        width:100,
        marginLeft: 30,
      },
    container: {
      position: 'absolute',
      top:'-30%',
      height: '130%',
      width: '100%',
      color: 'transparent'
    },
    date_container:{
        flexDirection:'row',
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    dateRange_container:{
        position: 'absolute',
        marginTop: 200,
        paddingVertical: 40,
        height: '100%',
        width: '100%',
        backgroundColor: "#fff",
        alignItems: "center",
    },
    btn_container: {
        alignItems:'center',
        justifyContent:'center',
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth:1,        
        width:60,
        marginRight:10,
        height:40,
     },
    background: {
      position: 'absolute',
      height: '120%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    ddayInput: {
    position:'relative',
        left:'50%',
      width:'70%',
      backgroundColor: 'white',
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#a5a5a5'
    },
    modal: {
      marginHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: '50%',
      backgroundColor: 'white',
    },
    doneText: {
      color: 'rgb(1,123,255)',
      fontSize: 15,
      margin: 10
    },
    titleText: {
      fontSize: 18,
      margin: 10
    },
    color:{
        paddingRight:10,
        paddingTop:5
    }
  });
  export default Setting;