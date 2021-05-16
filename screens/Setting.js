import React,{useState} from 'react';
import {View, StyleSheet, Picker,Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";
import { TextInputMask } from 'react-native-masked-text'
import { block, exp } from 'react-native-reanimated';
import { height } from 'react-native-daterange-picker/src/modules';
import DropDownPicker from 'react-native-dropdown-picker';
import { createNativeWrapper } from 'react-native-gesture-handler';
import { relative } from 'path';
import Placeholder from 'react-select/src/components/Placeholder';

const Setting =(props)=> {
    const [title,setTitle]=useState('');
    const [startDate,setStart]=useState('');
    const [endDate,setEnd]=useState('');
    const [duration,setDuration]=useState('1');
    const [minTime,setMin]=useState('1');
    const [maxTime,setMax]=useState('1');
    const [priority,setPrioirty]=useState('1');

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
        props.onAddTodo(title, startDate, endDate,duration, minTime, maxTime, priority);
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

      // picker 값 나타내는 변수
      const [selectedValue1, setSelectedValue1] = useState("1");
      const [selectedValue2, setSelectedValue2] = useState("1");
      const [selectedValue3, setSelectedValue3] = useState("1");

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
          <Text style={styles.text}>StartDate:  </Text>
            <TextInputMask
        type={'datetime'}
        options={{
            format: 'YYYY/MM/DD'
        }}
        value={startDate}
        onChangeText={text => {startInput(text)}}
        style={textInputStype}
        />
        </View>
        
        <View style={Container}>
          <Text style={styles.text}>EndDate:    </Text>
            <TextInputMask
        type={'datetime'}
        options={{
            format: 'YYYY/MM/DD'
        }}
        value={endDate}
        onChangeText={text => {endInput(text)}}
        style={textInputStype}
        />
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
                        <Picker.Item label="1" value='1'/>
                        <Picker.Item label="2" value='2' />
                        <Picker.Item label="3" value='3'/>
                        <Picker.Item label="4" value='4' />
                        <Picker.Item label="5" value='5'/>
                        <Picker.Item label="6" value='6'/>
                    </Picker>
             </View>

             <View style={styles.itemContainer}>
            <Text style={styles.text,{padding:10}}>MinTime: </Text> 
            <Picker
                selectedValue={minTime}
                onValueChange={(itemValue,itemIndex)=>minInput(itemValue)}
                style={{ height: 40, width: 290 }}
                >
                    <Picker.Item label="1" value='1'/>
                    <Picker.Item label="2" value='2' />
                    <Picker.Item label="3" value='3'/>
                    <Picker.Item label="4" value='4' />
                    <Picker.Item label="5" value='5'/>
                    <Picker.Item label="6" value='6'/>
                </Picker>
             </View>
             <View style={styles.itemContainer}>
                <Text style={styles.text,{padding:10}}>Priority:     </Text> 
                <Picker
                    selectedValue={priority}
                    onValueChange={(itemValue,itemIndex)=>priorityInput(itemValue)}
                    style={{ height: 40, width: 290 }}
                >
                        <Picker.Item label="1" value='1'/>
                        <Picker.Item label="2" value='2' />
                        <Picker.Item label="3" value='3'/>
                        <Picker.Item label="4" value='4' />
                        <Picker.Item label="5" value='5'/>
                    </Picker>
             </View>
        <TouchableOpacity onPress={addTodoHandler}>
            <Text style={styles.doneText}>완료
        </Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
    </>
);
}
    
  const styles = StyleSheet.create({
    textInputStype : {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1
      },
      itemContainer:{
        flex: 1,
        flexDirection:"row",
        paddingTop: 10,
        width:'100%'
      },
      input_container:{
        width: '100%'
      },
      Text:{
          flex:1
      },
    container: {
      position: 'absolute',
      top:'-30%',
      height: '140%',
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
    background: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    TextInput:{
        fontSize:11,
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
    }
  });
  export default Setting;