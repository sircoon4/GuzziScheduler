import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SafeAreaView, StyleSheet, TextInput, Alert  } from "react-native";
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

  const confirmRegister = () =>
      Alert.alert(
        "",
        id+"님 회원가입을 축하드립니다!",
        [
          {
            text: "YES",
            onPress: () => {
              //remove event
              console.log("YES");
              navigation.navigate('Login')
              setId("")
              setPassword("")
            },
            style: "default",
          }
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              "This alert was dismissed by tapping outside of the alert dialog."
            ),
        }
      );
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
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.btn} onPress={confirmRegister}>
        <Text style={{color:'white', fontSize: 20, fontWeight:'700'}}>계정등록</Text>
      </TouchableOpacity>
      <Text style={{margin:20, color:'#4A5CFF', fontSize:18}}>or</Text>
      <TouchableOpacity style={{width:350, height:60, flexDirection: 'row', justifyContent: 'center', alignItems:'center', 
      margin:12, borderWidth:2, borderRadius:10, borderColor:'#4A5CFF'}}>
        <Icon style={styles.innerIcon} name="google" size={34} color="orange"/> 
        <Text style={{fontWeight:'700', marginLeft:24}}>Google 계정으로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width:350, height:60, flexDirection: 'row', justifyContent: 'center', alignItems:'center', 
      margin:12, borderWidth:2, borderRadius:10, borderColor:'#4A5CFF'}}>
        <Icon name="facebook-square" size={34} color="#1877F2"/> 
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
    color:'#4A5CFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)', 
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10,
    margin:40
  },
  input: {
    height: 40,
    width:350,
    margin: 12,
    borderBottomWidth: 1,
    borderColor:'#4A5CFF',
    fontSize: 18,
  },
  btn : {
    height:60,
    width:350,
    margin:12,
    backgroundColor: '#4A5CFF',
    color: 'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
});
export default SignUpScreen;