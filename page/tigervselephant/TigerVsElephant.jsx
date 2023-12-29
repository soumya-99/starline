import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';

import tiger from '../../assets/tiger.png';
import elephant from '../../assets/hati_angry.png';
import tgrVsEle from '../../assets/tgr-vs-ele.jpg';
import Banner from '../../component/banner/Banner';

import coinR from '../../assets/coin-rem.png';
import coinB from '../../assets/coin-blu-2-rem.png';
import coinG from '../../assets/coinG-removebg-preview-removebg-preview.png';
import coinBlk from '../../assets/coinBlk-removebg-preview.png';
import coinO from '../../assets/coinO-removebg-preview.png';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import TitleBar from '../../component/titlebar/TitleBar';

const coinArray = [
  {
    amt: 5,
    coinImg: coinO,
  },
  {
    amt: 10,
    coinImg: coinB,
  },
  {
    amt: 50,
    coinImg: coinR,
  },
  {
    amt: 100,
    coinImg: coinG,
  },
  {
    amt: 500,
    coinImg: coinBlk,
  },
];

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.ease;

const ANGLE_2 = 20;
const TIME_2 = 90;
const EASING_2 = Easing.elastic(1.5);

export default function TigerVsElephant() {
  // =================== Animation Starts ===================
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${rotation.value * 360}deg`}],
  }));
  const rot = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rot.value}deg`}],
  }));

  const handlePress = async () => {
    // setTigerState(true);
    // setElephantState(true);
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
    setTimeout(() => {
      generateRandom();
    }, 100);
  };
  const [randomNum1, setRandomNum1] = useState(1);
  const [randomNum2, setRandomNum2] = useState(1);
  // const [tigerState, setTigerState] = useState(true);
  // const [elephantState, setElephantState] = useState(true);
  const generateRandom = () => {
    setRandomNum1(Math.floor(Math.random() * 20));
    setRandomNum2(Math.floor(Math.random() * 20));

    // setTigerState(randomNum1 > randomNum2);
    // setElephantState(randomNum1 < randomNum2);

    // setTimeout(() => {
    //   setTigerState(true);
    //   setElephantState(true);
    // }, 30000);
  };
  // =================== Animation Ends ===================
  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={{flex: 3}}>
        <TitleBar />
      </View>
      <ScrollView
        style={{
          borderWidth: normalize(5),
          borderStyle: 'dotted',
          borderColor: 'green',
        }}>
        <View style={styles.comp2}>
          <Banner />
        </View>
        <View style={styles.headerGameTextContainer}>
          <Text style={styles.headerGameText}>Tiger 🐅 Vs Elephant 🐘</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => {}}>
            <Animated.View
              style={[styles.box, animatedStyle, styles.shadowProp]}>
              <Image
                source={randomNum1 > randomNum2 && tiger}
                style={{width: 'auto', height: normalize(150)}}
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Animated.View
              style={[styles.box, animatedStyle, styles.shadowProp]}>
              <Image
                source={randomNum1 < randomNum2 && elephant}
                style={{width: 'auto', height: normalize(120)}}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.bigCoinsContainer}>
          <Animated.View style={[animStyle]}>
            <ImageBackground source={coinR} style={styles.bigCoin}>
              <Text style={styles.bigCoinText}>{randomNum1}</Text>
            </ImageBackground>
          </Animated.View>
          <Animated.View style={[animStyle]}>
            <ImageBackground source={coinB} style={styles.bigCoin}>
              <Text style={styles.bigCoinText}>{randomNum2}</Text>
            </ImageBackground>
          </Animated.View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: 12353</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            icon="autorenew"
            mode="contained"
            onPress={() => {
              handlePress();
            }}
            buttonColor="orange"
            textColor="black">
            START GAME
          </Button>
        </View>
        <View
          style={{
            marginLeft: normalize(35),
          }}>
          <View style={styles.buttonRow}>
            {coinArray.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.coinButtonStyle}
                onPress={() => {}}>
                <ImageBackground
                  source={item.coinImg}
                  style={styles.coinButton}>
                  <Text style={styles.coinText}>{item.amt}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* <ImageBackground
        source={tgrVsEle}
        resizeMode="cover"
        style={styles.image}></ImageBackground> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'yellow',
    height: '100%',
  },
  container: {
    padding: normalize(30),
    backgroundColor: '#0e0e0e0',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    // height: '100%',
  },
  headerGameTextContainer: {
    width: normalize(300),
    backgroundColor: '#171717',
    height: normalize(60),
    justifyContent: 'center',
    borderBottomRightRadius: normalize(30),
    borderTopRightRadius: normalize(5),
  },
  headerGameText: {
    textAlign: 'center',
    color: 'white',
    fontSize: normalize(25),
    fontWeight: 800,
  },
  box: {
    justifyContent: 'center',
    margin: normalize(10),
    height: normalize(150),
    width: normalize(150),
    backgroundColor: 'blue',
    borderColor: 'dodgerblue',
    borderWidth: normalize(10),
    borderRadius: normalize(20),
  },
  shadowProp: {
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnContainer: {
    padding: normalize(10),
    width: '90%',
    alignSelf: 'center',
  },
  comp2: {
    width: '100%',
    height: normalize(100),
  },
  image: {
    flex: 1,
    // marginBottom: -60,
    justifyContent: 'center',
  },
  bigCoinsContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: normalize(-15),
  },
  bigCoin: {
    minHeight: normalize(80),
    minWidth: normalize(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigCoinText: {
    fontSize: normalize(35),
    fontWeight: '800',
    color: 'white',
  },
  scoreContainer: {
    height: normalize(40),
    width: normalize(200),
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 10,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'aliceblue',
  },
  buttonRow: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: normalize(50),
    height: normalize(50),
  },
  coinText: {
    fontWeight: '800',
    fontSize: normalize(20),
    color: 'white',
  },
  coinButtonStyle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: normalize(55),
    width: normalize(55),
    backgroundColor: 'transparent',
  },
});
