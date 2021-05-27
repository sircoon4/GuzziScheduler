import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, KeyboardAvoidingView } from "react-native";
import { TextInputMask } from 'react-native-masked-text';
import dateFormat from 'dateformat';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Tooltip from 'react-native-walkthrough-tooltip';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Ionicons';

const ScheduleBuilder = (props) => {
    const [color, setColor] = useState('#ED6B58');
    const [showTip, setTip] = useState(false);

    const [title, onChangeTitle] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState('start');

    const [repeat, setRepeat] = useState(0);
    const [ddopen, setddOpen] = useState(false);
    const [dditems, setddItems] = useState([
        { label: '안 함', value: 0 },
        { label: '매 일', value: 1 },
        { label: '매 주', value: 2 },
    ]);

    const sign = props.editSign;
    const item = props.editItem;
    const [duration,setDuration]=sign?useState(String(item.duration)):useState('1');
    const [minTime,setMin]=sign?useState(String(item.minTime)):useState('1');
    const [maxTime,setMax]=sign?useState(String(item.maxTime)):useState('1');
    const [priority,setPrioirty]=sign?useState(String(item.priority)):useState('1');
    
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
        console.log(newMax);
        setMax(newMax);
    };
    const priorityInput = newPriority=>{
        setPrioirty(newPriority);
    };
    const addTodoHandler = () => {
        if(sign==false)props.idHandler();
        if(title!=null & startDate!=null&endDate!=null){
        props.onAddTodo(title, startDate, endDate,duration, minTime, maxTime, priority,color);
        }
        else{
            props.modalHandler();
        }
    };
  
    
    const textInputStype = {
        height:35,
        width:80,
        borderRadius:7,
        borderWidth: 1,
        borderColor:'#555555',
        }
    
    const Container = {
        flexDirection:'row',
        paddingVertical:'3%'
    }

    // picker (maxTime, minTime, prioirty 설정) 관련 변수
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [items, setItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'}
    ]);

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

    const onChange = (event, selectedDate) => {
        if (dateType == 'start') {
            const currentDate = selectedDate || startDate;
            if (mode == 'day') {
                setDate(currentDate);
                setMode('time');
            }
            else if (mode == 'time') {
                setStartDate(currentDate);
                setShow(false);
            }
        }
        else if (dateType == 'end') {
            const currentDate = selectedDate || endDate;
            setEndDate(currentDate);
            setShow(false);
        }
    };

    const showMode = (currentType, currentMode) => {
        setDateType(currentType);

        if (dateType == 'start')
            setDate(startDate);
        else if (dateType == 'end')
            setDate(endDate);

        setMode(currentMode);
        setShow(true);
    };

    const submit = () => {
        var data = {};

        data.color = color;
        data.title = title;
        data.startDate = startDate;
        data.endDate = endDate;
        data.repeat = repeat;

        props.saveSchedule(data);
    }

    const createToolTip = (
        <View style={{marginBottom:3}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 300, padding:5}}>
            <TouchableOpacity onPress={() => setColor('#ED6B58')}>
                <Icon name = "circle" size={30} color='#ED6B58'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('#6178C3')}>
                <Icon name = "circle" size={30} color="#6178C3"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('#CBFDC0')}>
                <Icon name = "circle" size={30} color="#CBFDC0"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('#C6BAFA')}>
                <Icon name = "circle" size={30} color="#C6BAFA"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('#FDF394')}>
                <Icon name = "circle" size={30} color="#FDF394"/>
            </TouchableOpacity>
        </View>
        <   View style={{flexDirection: 'row', justifyContent: 'space-between', width: 300,padding:5}}>
            <TouchableOpacity onPress={() => setColor('#727272')}>
                <Icon name = "circle" size={30} color='#727272'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('#F19D4E')}>
                <Icon name = "circle" size={30} color="#F19D4E"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('#8A2DA3')}>
                <Icon name = "circle" size={30} color="#8A2DA3"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('#439459')}>
                <Icon name = "circle" size={30} color="#439459"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('#80DEFB')}>
                <Icon name = "circle" size={30} color="#80DEFB"/>
            </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <>
        <KeyboardAvoidingView 
            style={styles.modal}
            behavior="height" 
            enabled={Platform.OS === "android"}
        >
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>props.modalHandler()} style={{position:'absolute'}}>
                <Icon2 name="close" size={30} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>addTodoHandler()} style={{position:'absolute',right:'0%'}}>
                <Icon2 name="check" size={30} color="grey" />
            </TouchableOpacity>
            </View>
        <View style={{paddingHorizontal:'6%'}}>
        <View style={[Container,{paddingTop:'12%',paddingBottom:'6%'}]}>
        <Tooltip 
                isVisible={showTip}
                content={createToolTip}
                onClose={() => setTip(false)}
                placement="bottom"
                closeOnContentInteraction={false}>
                <TouchableOpacity style={{position:'relative',top:'20%'}}
                    onPress={() => setTip(true)}>
                    <Icon name = "circle" size={30} color={color}/>
                </TouchableOpacity>
            </Tooltip>
            <TextInput style={styles.ddayInput}
            placeholder="할 일 제목"
            value={title}
            onChangeText={titleInput}></TextInput>
        </View>
        <View style={{paddingHorizontal:'7%'}}>
        <View style={Container}>
            <Icon name="calendar-check-o" size={25} color={'gray'}></Icon>
            <Text style={[styles.contentTitle]}>시작/마감 시간 설정</Text>
        </View>
        <View style={[Container],{paddingHorizontal:'7%', paddingBottom:'5%'}}>
            <TouchableOpacity  onPress={()=>console.log("Hit!")}>
                <View style={{flexDirection:'row'}}>
                <Icon3 name = "ray-start-arrow" size={30} color={'#4E5CF6'}
                style={styles.icon}/>
                <Text>시작일자               {startRange?startDate:sign?startDate:''}</Text>
                </View>
            
                <View style={{flexDirection:'row'}}>
                <Icon3 name = "ray-end-arrow" size={30} color={'#4E5CF6'} style={styles.icon}/>
                <Text>마감일자               {endRange?endDate:sign?endDate:''}</Text>
                </View>
        </TouchableOpacity>
        </View>
        
 
        <View style={[Container,{paddingBottom:'2%'}]}>
            <Icon4 name="alarm-outline" size={30} color={'gray'} ></Icon4>
            <Text style={styles.contentTitle}>총 소요시간 </Text>
            <TextInputMask
            type={'datetime'}
            options={{
                format: 'HH'
            }}
            value={duration}
            onChangeText={text => {durationInput(text)}}
            style={[textInputStype,{position:'relative',right:'88%'}]}
            />
        </View>
        <View style={[Container,{paddingBottom:'2%'}]}>
                <Text style={[styles.contentTitle,{position:'relative',left:30}]}>하루 최소 시간 </Text>
                <DropDownPicker  style={[textInputStype]}
                    zIndexInverse={1}
                    open={open1}
                    value={maxTime}
                    items={items}
                    setOpen={setOpen1}
                    setValue={setMax}
                    setItems={setItems}
                    />
                
             </View>
        <View style={[Container,{paddingBottom:'2%'}]}>
           
             <Text style={[styles.contentTitle,{position:'relative',left:30}]}>하루 최대 시간 </Text>
                <DropDownPicker  style={[textInputStype]}
                    zIndex={2}
                    zIndexInverse={2}
                    open={open2}
                    value={minTime}
                    items={items}
                    setOpen={setOpen2}
                    setValue={setMin}
                    setItems={setItems}
                    />
             </View>
             <View style={Container}>
                <Icon3 name="bell-ring-outline" size={30} color={'gray'}></Icon3>
                <Text style={styles.contentTitle}>알림 없음</Text>
             </View>
             <View style={Container}>
                <Icon2 name="staro" size={30} color={'gray'} ></Icon2>
                <Text style={styles.contentTitle}>중요도: </Text>
                <DropDownPicker style={[textInputStype,{position:'relative',right:'88%'}]}
                    zIndex={1}
                    zIndexInverse={3}
                    open={open3}
                    value={priority}
                    items={items}
                    setOpen={setOpen3}
                    setValue={setPrioirty}
                    setItems={setItems}
                    />
             </View>
             <View style={Container}>
             {sign?<TouchableOpacity style={styles.deleteIcon}>
                <Text onPress={()=>showDelteAlert(item)}>
                  <Icon2 name="delete" size={30} color="#4E5CF6" />
                </Text>
              </TouchableOpacity> :<></>}
              </View>
              </View>
              </View>
        </KeyboardAvoidingView>
    </>
        // <KeyboardAvoidingView 
        //     style={styles.container}
        //     behavior="padding" enabled={Platform.OS === "android"}
        // >
        //     <Text>{"\n"}</Text>
        //     <Tooltip
        //         isVisible={showTip}
        //         content={createToolTip}
        //         onClose={() => setTip(false)}
        //         placement="bottom"
        //         closeOnContentInteraction={false}
        //     >
        //         <TouchableOpacity
        //             onPress={() => setTip(true)}
        //         >
        //             <Icon name = "circle" size={30} color={color}/>
        //         </TouchableOpacity>
        //     </Tooltip>
        //     <TextInput
        //         style={styles.input}
        //         onChangeText={onChangeTitle}
        //         placeholder="Title"
        //         value={title}
        //     />
        //     <Text>{"\n"}</Text>
        //     <View>
        //         <Text>
        //             Start Date Time
        //         </Text>
        //         <TouchableOpacity
        //             style={styles.button}
        //             onPress={() => showMode('start', 'day')}
        //         >
        //             <Text>{dateFormat(startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</Text>
        //         </TouchableOpacity>
        //     </View>
        //     <Text>{"\n"}</Text>
        //     <View>
        //         <Text>
        //             End Date Time
        //     </Text>
        //         <TouchableOpacity
        //             style={styles.button}
        //             onPress={() => showMode('end', 'time')}
        //         >
        //             <Text>{dateFormat(endDate, "h:MM:ss TT")}</Text>
        //         </TouchableOpacity>
        //     </View>
        //     <Text>{"\n"}</Text>
        //     <View>
        //         <Text>
        //             반복
        //         </Text>
        //         <DropDownPicker
        //             open={ddopen}
        //             value={repeat}
        //             items={dditems}
        //             setOpen={setddOpen}
        //             setValue={setRepeat}
        //             setItems={setddItems}
        //         />
        //     </View>
        //     <Text>{"\n"}</Text>
        //     <Button
        //         title="save"
        //         onPress={submit}
        //     />
        //     {show && (
        //         <DateTimePicker
        //             testID="dateTimePicker"
        //             value={date}
        //             mode={mode}
        //             is24Hour={false}
        //             display="default"
        //             onChange={onChange}
        //         />
        //     )}
        // </KeyboardAvoidingView>
    );
};

const Container = {
    flexDirection:'row',
    paddingVertical:'3%'
}

const styles = StyleSheet.create({
    itemContainer:{
        flex: 1,
        flexDirection:"row",
        paddingTop: 10,
        width:'100%'
    },
    contentTitle:{
        width:'60%',
        fontSize:16, 
        color:'gray',
        marginHorizontal:'4%',
        marginBottom:'3%',
    },
    subTitle:{
        position:'relative',
        fontSize:18,
        color:'gray',
        paddingBottom:30,
        marginBottom:5,
    },
    buttonContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    text:{
        flex:1,
        marginLeft:20,
    },
    container: {
        position: 'absolute',
        left:'-10%',
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
    picker:{
        marginLeft:30,
    },
    icon:{
        marginRight:20, marginTop:-5,
    },
    titleIcon:{
        position:'relative',
        left:5,
        marginLeft:25, 
        paddingRight:15,
        marginTop:-5,
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
        width:'95%',
        borderBottomWidth: 1,
        fontSize:25,
        fontWeight:"bold",
        color:'#999999',
        borderBottomColor: '#a5a5a5',
        marginLeft:'2%'
    },
    modal: {
        position: 'absolute',
        height: 600,
        width: 320,
        borderRadius: 10,
        backgroundColor: 'white',
        left: 0,
        top: 20,
        paddingHorizontal:5
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
    },
    deleteIcon: {
        position:'absolute',
        right:'-15%',
        paddingTop:'5%'
    },
    rangemodal:{
        height:'85%',
        width:'105%',
        borderRadius: 10,
        backgroundColor: 'white',
    },
});

export default ScheduleBuilder;