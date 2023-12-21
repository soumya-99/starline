import React, {useEffect, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import tiger from '../../assets/tiger.png';
import elephant from '../../assets/elephant.png';
import Banner from '../../component/banner/Banner';

const duration = 5000;
// const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
const easing = Easing.bounce;

export default function TigerVsElephant() {
  const sv = useSharedValue(0);

  useEffect(() => {
    // highlight-next-line
    sv.value = withRepeat(withTiming(1, {duration, easing}), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${sv.value * 360}deg`}],
  }));

  const [randomNum1, setRandomNum1] = useState(1);
  const [randomNum2, setRandomNum2] = useState(1);

  const generateRandom = () => {
    setRandomNum1(Math.floor(Math.random() * 20));
    setRandomNum2(Math.floor(Math.random() * 20));
  };

  return (
    <SafeAreaView style={{backgroundColor: 'hotpink', height: '100%'}}>
      <View style={styles.comp2}>
        <Banner />
      </View>
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Image source={tiger} style={{width: 'auto', height: 150}} />
        </Animated.View>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Image source={elephant} style={{width: 'auto', height: 150}} />
        </Animated.View>
      </View>
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View>
          <Text style={{fontSize: 40, fontWeight: '800', color: 'white'}}>
            {randomNum1}
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 40, fontWeight: '800', color: 'green'}}>
            {randomNum2}
          </Text>
        </View>
      </View>
      {/* <Text>aslhrfuilarl8sa</Text> */}
      <View style={styles.btnContainer}>
        <Button
          icon="autorenew"
          mode="contained"
          onPress={generateRandom}
          buttonColor="yellow"
          textColor="black">
          START GAME
        </Button>
      </View>
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
    backgroundColor: 'red',
    borderRadius: 20,
  },
  btnContainer: {
    padding: 50,
    width: '100%',
  },
  comp2: {
    width: '100%',
    height: 120,
  },
});
