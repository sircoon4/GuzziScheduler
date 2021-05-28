import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, KeyboardAvoidingView, Switch } from "react-native";
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

    const [title, setTitle] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState('start');

    const [repeat, setRepeat] = useState('none');
    const [ddopen, setddOpen] = useState(false);
    const [dditems, setddItems] = useState([
        { label: '안 함', value: 'none' },
        { label: '매 일', value: 'day' },
        { label: '매 주', value: 'week' },
    ]);

    const sign = props.editSign;
    const item = props.editItem;

    const [allDay, setAllDay] = useState(false);
    
    const titleInput = newTitle=>{
        setTitle(newTitle);
    };
    
    const Container = {
        flexDirection:'row',
        paddingVertical:'3%'
    }

    const onChange = (event, selectedDate) => {
        if(dateType == 'start' && mode == 'day'){
            const startDateClone = startDate;
            const currentDate = selectedDate || startDate;

            startDateClone.setFullYear(currentDate.getFullYear());
            startDateClone.setMonth(currentDate.getMonth());
            startDateClone.setDate(currentDate.getDate());

            setStartDate(startDateClone);
        }

        if(dateType == 'start' && mode == 'time'){
            const startDateClone = startDate;
            const currentDate = selectedDate || startDate;

            startDateClone.setHours(currentDate.getHours());
            startDateClone.setMinutes(currentDate.getMinutes());
            startDateClone.setSeconds(currentDate.getSeconds());

            setStartDate(startDateClone);
        }

        if(dateType == 'end' && mode == 'day'){
            const endDateClone = endDate;
            const currentDate = selectedDate || endDate;

            endDateClone.setFullYear(currentDate.getFullYear());
            endDateClone.setMonth(currentDate.getMonth());
            endDateClone.setDate(currentDate.getDate());

            setEndDate(endDateClone);
        }

        if(dateType == 'end' && mode == 'time'){
            const endDateClone = endDate;
            const currentDate = selectedDate || endDate;

            endDateClone.setHours(currentDate.getHours());
            endDateClone.setMinutes(currentDate.getMinutes());
            endDateClone.setSeconds(currentDate.getSeconds());

            setEndDate(endDateClone);
        }

        setShow(false);
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

        data.key = sign?item.key:'new';
        data.title = title;
        data.start_datetime = dateFormat(startDate, 'isoDateTime');
        data.end_datetime = dateFormat(endDate, 'isoDateTime');
        data.repeat = repeat;
        data.isFixed = sign?item.isFixed:true;
        data.color = color;

        props.saveSchedule(data);
    }

    const k_date = (date) => {
        return (
            date.getMonth()+1+"월 " +
            date.getDate()+"일 " +
            ['일','월','화','수','목','금','토','일'][date.getDay()]+"요일"
        )
    }

    const k_time = (date) => {
        var hour = date.getHours();
        return (hour>=12?"오후 ":"오전 ") + hour%12+":"+date.getMinutes();
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
                <TouchableOpacity  onPress={submit} style={{position:'absolute',right:'0%'}}>
                    <Icon2 name="check" size={30} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={{paddingLeft:10, paddingRight:40}}>
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
                    <TextInput 
                        style={styles.ddayInput}
                        placeholder="할 일 제목"
                        value={title}
                        onChangeText={titleInput}
                    ></TextInput>
                </View>
                <View style={{paddingHorizontal:'7%'}}>
                    <View style={Container}>
                        <Text style={[styles.contentTitle]}>종일</Text>
                        <Switch
                            trackColor={{ false: "#E5E5E5", true: "#4E5CF6" }}
                            thumbColor={allDay ? "white" : "#white"}
                            onValueChange={(v) => setAllDay(v)}
                            value={allDay}
                            style={{position:'absolute', right:-30, marginTop:5, transform: [{ scaleX: 1.2 }, { scaleY: 1.2}] }}
                        />
                    </View>
                    {!allDay && (
                    <View style={[Container],{paddingHorizontal:'7%', paddingBottom:'5%'}}>
                        <View style={{flexDirection:'row'}}>
                            <Icon3 name = "ray-start-arrow" size={30} color={'#4E5CF6'} style={styles.icon}/>
                            <TouchableOpacity  onPress={()=>showMode('start','day')}>
                                <Text style={{marginTop: 5, width: 140}}>{k_date(startDate)}</Text>
                            </TouchableOpacity>
                            {/* <Text>{"             "}</Text> */}
                            <TouchableOpacity  onPress={()=>showMode('start','time')}>
                                <Text style={{marginTop: 5}}>{k_time(startDate)}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Icon3 name = "ray-end-arrow" size={30} color={'#4E5CF6'} style={styles.icon}/>
                            <TouchableOpacity  onPress={()=>showMode('end','day')}>
                                <Text style={{marginTop: 5, width: 140}}>{k_date(endDate)}</Text>
                            </TouchableOpacity>
                            {/* <Text>{"             "}</Text> */}
                            <TouchableOpacity  onPress={()=>showMode('end','time')}>
                                <Text style={{marginTop: 5}}>{k_time(endDate)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    )}
                    <Text style={{fontSize: 5}}>{'\n'}</Text>
                    <View style={Container}>
                        <Icon2 name="staro" size={30} color={'gray'} ></Icon2>
                        <Text style={styles.contentTitle}>반복: </Text>
                        <DropDownPicker 
                            style={{
                                height:35,
                                borderRadius:7,
                                borderWidth: 1,
                                borderColor:'#555555',
                            }}
                            containerStyle={{
                                width:80,
                            }}
                            open={ddopen}
                            value={repeat}
                            items={dditems}
                            setOpen={setddOpen}
                            setValue={setRepeat}
                            setItems={setddItems}
                        />
                    </View>
                    <Text style={{fontSize: 5}}>{'\n'}</Text>
                    <View style={Container}>
                        <Icon3 name="bell-ring-outline" size={30} color={'gray'}></Icon3>
                        <Text style={styles.contentTitle}>알림 없음</Text>
                    </View>
                    <Text style={{fontSize: 5}}>{'\n'}</Text>
                    <View style={[Container,{paddingBottom:'2%'}]}>
                        <Icon4 name="alarm-outline" size={30} color={'gray'} ></Icon4>
                        <Text style={styles.contentTitle}>메모 </Text>
                    </View>
                    <View style={Container}>
                        {sign?
                        <TouchableOpacity 
                            style={styles.deleteIcon}
                            onPress={()=>props.deleteSchedule(item.key)}
                        >
                            <Text>
                                <Icon2 name="delete" size={30} color="#4E5CF6" />
                            </Text>
                        </TouchableOpacity> :<></>}
                    </View>
                </View>
            </View>
        {show && (
        <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
        />
        )}
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
        marginTop: 20
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
        marginRight:10, 
        marginBottom:10,
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
        width: 325,
        borderRadius: 10,
        backgroundColor: 'white',
        left: 0,
        top: 20,
        paddingLeft:10,
        paddingRight:10,
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