import * as React from 'react';
import { Button, View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { Calendar } from 'react-native-big-calendar';
import * as dbAct from '../utils/dbAct.js';
import Icon from 'react-native-vector-icons/AntDesign';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Event =[{
        title: '식사',
        start: new Date(2021, 4, 29, 11, 0),
        end: new Date(2021, 4, 29, 12, 0),
        color:'red'
      },
      {
        title: '큐시즘 학술제',
        start: new Date(2021, 4, 29, 12, 0),
        end: new Date(2021, 4, 29, 18, 0),
        color:'blue'
      },
      {
        title: '식사',
        start: new Date(2021, 4, 29, 18, 0),
        end: new Date(2021, 4, 29, 19, 0),
        color:'red'
      },
]

function CheckScreen({ navigation, route }){
  

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ffffff'}}>
        <View style={{margin:30}}>
            <Text style={{fontSize:17, lineHeight:20, fontWeight:'500'}}>오늘 완료한 할 일을 선택해주세요</Text>
        </View>
        <View style={{borderTopColor:'#EEEEEE',
        borderTopWidth: 1,
        borderBottomColor:'#EEEEEE',
        borderBottomWidth:1}}>
            <TouchableOpacity style={styles.container} >
                <Text style={styles.fixed_time}>11:00 ~ 12:00</Text>
                <Text style={styles.fixed_title}>식사</Text>
                
            </TouchableOpacity>
        </View>
        <View style={styles.big_container}>
            <TouchableOpacity style={styles.container}>
                <Text style={styles.time}>12:00 ~ 18:00</Text>
                <Text style={styles.title}>큐시즘 학술제</Text>
                <BouncyCheckbox size={25}
                    fillColor="#4A5CFF"
                    unfillColor="#FFFFFF"
                     />
            </TouchableOpacity >
        </View>
        <View style={styles.big_container}>
            <TouchableOpacity style={styles.container}>
                <Text style={styles.fixed_time}>18:00 ~ 19:00</Text>
                <Text style={styles.fixed_title}>식사</Text>
                
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Plan Maker')} >
          <Text style={{color:'white', margin:6, fontSize:15}}>완료</Text>
        </TouchableOpacity>
      
    </View>
    );
}

const styles = StyleSheet.create({
    big_container:{
        borderBottomColor:'#EEEEEE',
        borderBottomWidth:1
    },
    container: {
      borderLeftColor:'#5A79C9',
      borderLeftWidth: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width:335,
      padding:15,
      margin:5
    },
    fixed_time:{
        width:50,
        fontWeight:'900',
        fontSize:13,
        color:'#DADADA',
        lineHeight:20,
    },
    time:{
        width:50,
        fontWeight:'900',
        fontSize:13,
        color:'#666666',
        lineHeight:20,
    },
    title:{
        textAlign:'left', paddingLeft:20,
        width:200,
        fontSize:17,
        lineHeight:20,
        fontWeight:'500',
        color:'#333333'
    },
    fixed_title:{
        textAlign:'left', paddingLeft:20,
        width:200,
        fontSize:17,
        fontWeight:'500',
        lineHeight:20,
        color:'#DADADA'
    },
    btn: {
        flexDirection:'row',
        backgroundColor:"#4E5CF6",
        width:144,
        padding:3,
        justifyContent:'center',
        borderRadius:6,
        margin:30,
      },
    
  });


export default CheckScreen;