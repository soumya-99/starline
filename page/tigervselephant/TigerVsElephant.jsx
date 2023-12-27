import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  Keyframe,
} from 'react-native-reanimated';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import tiger from '../../assets/tiger.png';
import elephant from '../../assets/hati_angry.png';
import coinR from '../../assets/coin-rem.png';
import coinB from '../../assets/coin-blu-2-rem.png';
import tgrVsEle from '../../assets/tgr-vs-ele.jpg';
import Banner from '../../component/banner/Banner';

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.ease;

const ANGLE_2 = 10;
const TIME_2 = 90;
const EASING_2 = Easing.elastic(1.5);

export default function TigerVsElephant() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${rotation.value * 360}deg`}],
  }));

  // useEffect(() => {
  //   rotation.value = withRepeat(
  //     withTiming(1, {duration: TIME, easing: EASING}),
  //     -1,
  //   );
  // }, []);

  const rot = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rot.value}deg`}],
  }));

  const handlePress = () => {
    rot.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE_2, {duration: TIME_2 / 2, easing: EASING_2}),
      // wobble between -ANGLE and ANGLE 7 times
      withRepeat(
        withTiming(ANGLE_2, {
          duration: TIME_2,
          easing: EASING_2,
        }),
        7,
        true,
      ),
      // go back to 0 at the end
      withTiming(0, {duration: TIME_2 / 2, easing: EASING_2}),
    );

    rotation.value = withSequence(
      withTiming(-ANGLE, {duration: TIME, easing: EASING}),
      withRepeat(withTiming(ANGLE, {duration: TIME, easing: EASING}), 5, true),
      withTiming(ANGLE, {duration: TIME, easing: EASING}),
    );
  };

  const [randomNum1, setRandomNum1] = useState(1);
  const [randomNum2, setRandomNum2] = useState(1);

  const generateRandom = () => {
    setRandomNum1(Math.floor(Math.random() * 20));
    setRandomNum2(Math.floor(Math.random() * 20));
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'yellow',
        height: '100%',
        borderWidth: 5,
        borderStyle: 'dotted',
        borderColor: 'green',
      }}>
      <View style={styles.comp2}>
        <Banner />
      </View>
      <View
        style={{
          width: 300,
          backgroundColor: '#171717',
          height: 80,
          justifyContent: 'center',
          borderBottomRightRadius: 30,
          borderTopRightRadius: 5,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 25,
            fontWeight: 800,
          }}>
          Tiger 🐅 Vs Elephant 🐘
        </Text>
      </View>
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle, styles.shadowProp]}>
          <Image source={tiger} style={{width: 'auto', height: 150}} />
        </Animated.View>
        <Animated.View style={[styles.box, animatedStyle, styles.shadowProp]}>
          <Image source={elephant} style={{width: 'auto', height: 150}} />
        </Animated.View>
      </View>
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Animated.View style={[animStyle]}>
          <ImageBackground
            source={coinR}
            style={{
              minHeight: 80,
              minWidth: 80,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 35, fontWeight: '800', color: 'white'}}>
              {randomNum1}
            </Text>
          </ImageBackground>
        </Animated.View>
        <Animated.View style={[animStyle]}>
          <ImageBackground
            source={coinB}
            style={{
              minHeight: 80,
              minWidth: 80,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 35, fontWeight: '800', color: 'white'}}>
              {randomNum2}
            </Text>
          </ImageBackground>
        </Animated.View>
      </View>
      {/* <Text>aslhrfuilarl8sa</Text> */}
      <View style={styles.btnContainer}>
        <Button
          icon="autorenew"
          mode="contained"
          onPress={() => {
            generateRandom();
            handlePress();
          }}
          buttonColor="orange"
          textColor="black">
          START GAME
        </Button>
      </View>
      {/* <ImageBackground
        source={tgrVsEle}
        resizeMode="cover"
        style={styles.image}></ImageBackground> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#0e0e0e0',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    // height: '100%',
  },
  box: {
    justifyContent: 'center',
    margin: 10,
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderColor: 'dodgerblue',
    borderWidth: 10,
    borderRadius: 20,
  },
  shadowProp: {
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnContainer: {
    padding: 50,
    width: '100%',
  },
  comp2: {
    width: '100%',
    height: 100,
  },
  shadowProp: {
    shadowOffset: {width: 0, height: 14},
    shadowColor: '#FF0000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 20,
  },
  image: {
    flex: 1,
    // marginBottom: -60,
    justifyContent: 'center',
  },
});
