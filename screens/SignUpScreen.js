import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useRef, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

GoogleSignin.configure({
  webClientId: "565682699402-b5705p4t6onush99tmbc12kpg3uci4pn.apps.googleusercontent.com",
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function SignUpScreen({ navigation }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (text)=>{
    setId(text);
  }

  const onChangePassword = (text)=>{
    setPassword(text);
  }
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>Plan Maker</Text>
      <TextInput
        style={styles.input}
        onChangeText={text=>{onChangeId(text)}}
        value={id}
        placeholder="아이디"
      />
      <TextInput
        style={styles.input}
        onChangeText={text=>{onChangePassword(text)}}
        value={password}
        placeholder="8~20자리의 비밀번호"
      />
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
        <Text style={{color:'white', fontSize: 20, fontWeight:'700'}}>계정등록</Text>
      </TouchableOpacity>
      <Text style={{margin:20, color:'blue', fontSize:18}}>or</Text>
      <TouchableOpacity style={{width:350, height:60, flexDirection: 'row', justifyContent: 'center', alignItems:'center', 
      margin:12, borderWidth:2, borderRadius:10, borderColor:'blue'}}>
        <Icon style={styles.innerIcon} name="google" size={34} color="orange"/> 
        <Text style={{fontWeight:'700', marginLeft:24}}>Google 계정으로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width:350, height:60, flexDirection: 'row', justifyContent: 'center', alignItems:'center', 
      margin:12, borderWidth:2, borderRadius:10, borderColor:'blue'}}>
        <Icon name="facebook-square" size={34} color="blue"/> 
        <Text style={{fontWeight:'700', marginLeft:15}}>Facebook 계정으로 시작하기</Text>
      </TouchableOpacity>
      <Text style={{marginTop:80}}>
        <Text  ></Text> 
        <Text > </Text> 
        <Text ></Text>
      </Text>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize:40,
    fontWeight:"700",
    color:'blue',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    margin:40
  },
  input: {
    height: 40,
    width:350,
    margin: 12,
    borderBottomWidth: 1,
    borderColor:'blue',
    fontSize: 18,
  },
  btn : {
    height:60,
    width:350,
    margin:12,
    backgroundColor: 'blue',
    color: 'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
});
export default SignUpScreen;