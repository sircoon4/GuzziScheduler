import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, Image, StyleSheet } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import { TouchableOpacity } from 'react-native-gesture-handler';

function IntroScreen({ navigation }) {
  const [maskWidth, setMaskWidth] = useState(0);
  const [titleAlpha, setTitleAlpha] = useState(0);
  const [titleSize, setTitleSize] = useState(25);
  const [titleString, setTitleString] = useState("당신의 일상을 채워줄게요.");
  const [titleMargin, setTitleMargin] = useState(250);
  const [titleShadow, setTitleShadow] = useState(0);
  const [firstLoopDone, setFirstLoopDone] = useState(false);
  const [secondLoopDone, setSecondLoopDone] = useState(false);

  const firstLoop = () => {
    setTimeout(function() {
      if (maskWidth <= 100) {
        setMaskWidth(maskWidth+1);
      }
      if (titleAlpha <= 100) {
        setTitleAlpha(titleAlpha+1);
      }

      if(maskWidth >= 100 && titleAlpha >= 100) {
        setFirstLoopDone(true);
      }
    }, 20)
  }

  const secondLoop = () => {
    setTimeout(function() {
      if (titleAlpha >= 25) {
        setTitleAlpha(titleAlpha-1);
      }

      if(titleAlpha <= 25) {
        setTitleString('Plan Maker');
        setTitleSize(40);
        setTitleMargin(230);
        setSecondLoopDone(true);
      }
    }, 5)
  }

  const thirdLoop = () => {
    setTimeout(function() {
      if (titleAlpha <= 100) {
        setTitleAlpha(titleAlpha+1);
      }
      if(titleShadow <= 55) {
        setTitleShadow(titleShadow+0.6);
      }

      if(titleAlpha >= 100 && titleShadow >= 55) {
        setTimeout(function() {
          navigation.navigate("Login");
        }, 1000);
      }
    }, 5)
  }

  if(firstLoopDone){
    if(secondLoopDone)
      thirdLoop();
    else
      secondLoop();
  }
  else{
    firstLoop();
  }

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: titleSize,
        fontWeight:"700",
        color:'rgba(255, 255, 255,'+ (titleAlpha/100) +')',
        textShadowColor: 'rgba(0, 0, 0, '+ (titleShadow/100) +')',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        marginTop: titleMargin,
      }}>{titleString}</Text>
      <MaskedView
        style={{width: '100%', alignItems: "center"}}
        maskElement={
          <View
            style={{
              backgroundColor: 'black',
              flex: 1,
              width: maskWidth + '%',
            }}
          >
          </View>
        }
      >
        <Image
          style={styles.img}
          source={require('../images/IntroCurve.png')}
        />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4A5CFF",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  title: {
    fontSize:25,
    fontWeight:"700",
    color:'white',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginTop: 250,
  },
  img: {
    marginTop: 100,
    width: "100%",
  },
  img_mask: {
    backgroundColor: 'black',
    flex: 1,
    width: '70%',
  }
});

export default IntroScreen;