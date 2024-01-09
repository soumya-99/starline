import React, {useContext, useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import SoundPlayer from 'react-native-sound-player';

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
import {useIsFocused} from '@react-navigation/native';
import handleGetGameTime from '../../hooks/controller/Game/handleGetGameTime';
import {AuthContext} from '../../src/context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../src/config';

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

export default function TigerVsElephant({route}) {
  const {userInfo} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [gameTime, setGameTime] = useState([]);
  const {getGameTime} = handleGetGameTime();
  const {game_id, item} = route.params;

  const [currentTime, setCurrentTime] = useState('');

  const [coinAmount, setCoinAmount] = useState(null);
  const [entryNumber, setEntryNumber] = useState(null);

  // =================== Animation Starts ===================
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${rotation.value * 360}deg`}],
  }));
  const rot = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rot.value}deg`}],
  }));

  const [tgrEleState, setTgrEleState] = useState(() => true);
  const handlePress = () => {
    getResult();
    setTgrEleState(false);
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

  const [lastWinners, setLastWinners] = useState([]);

  const getLastWinners = async () => {
    await axios
      .post(
        `${BASE_URL}/today_others_result_list`,
        {
          game_id: futureGame,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        console.log('auirfgsafsa', res.data.data);
        setLastWinners(res.data.data);
      });
  };

  if (lastWinners.length == 0) {
    setTimeout(() => {
      getLastWinners();
    }, 1000);
  }

  console.log('getLastWinners', lastWinners);

  const [winnerState, setWinnerState] = useState('');

  const getResult = async () => {
    await axios
      .post(
        `${BASE_URL}/others_result`,
        {
          game_id: futureGame,
          game_flag: item?.game_flag,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        console.log(res.data.data[0].game_result);
        setWinnerState(res.data.data[0].game_result);
      })
      .catch(err => {
        console.log('EEEERRRRRRRRRR', err);
      });
  };

  const [serverDateTime, setServerDateTime] = useState(() => '');

  const serverFetchedTime = async () => {
    try {
      await axios
        .get(`${BASE_URL}/server_time`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then(res => {
          setServerDateTime(res.data.date_time);
        });
    } catch (error) {
      console.log('ERRR', error);
    }
  };

  useEffect(() => {
    getGameTime(game_id, userInfo.token)
      .then(res => {
        setGameTime(res.data.data);
        console.log('hsdiufyisdutgrgsfrsdgy', res.data.data);
      })
      .catch(error => console.error(error));
  }, [isFocused]);

  const findFutureGame = () => {
    for (let i = 0; i < gameTime?.length; i++) {
      const checkgameTime = gameTime[i].game_time;
      // console.log(checkgameTime,currentTime,"\n")
      if (checkgameTime > currentTime) {
        return gameTime[i].game_id;
      }
    }
    return null; // Return null if no future game is found
  };

  console.log('qwertyuioppadjdsafskdgsufgvbs', serverDateTime);

  // future game ID
  const futureGame = findFutureGame();
  console.log('qwertyuioppadjdsafskdgsufgvbsdsarfsedfrgtr', futureGame);

  // Live starting Time boolean
  const isLive = futureGame != null && futureGame == gameTime[0].game_id;
  console.log('isLive', isLive);

  // Game starting time
  console.log('gameTime.game_time', gameTime[0]?.game_time);

  // returns [date, time] in this format
  let dateAndTimeArray = serverDateTime.split(' ');
  console.log('CUTTTEEDDDD SERVER TIME', dateAndTimeArray[1]);

  let cutToMinuteServerTime = dateAndTimeArray[1]?.slice(0, 5);
  console.log('cutToMinuteServerTime', cutToMinuteServerTime);
  let cutToMinuteGameTime = gameTime[0]?.game_time?.slice(0, 5);
  console.log('cutToMinuteGameTime', cutToMinuteGameTime);

  useEffect(() => {
    const interval = setInterval(() => {
      serverFetchedTime();
      setCurrentTime(dateAndTimeArray);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLive && cutToMinuteGameTime == cutToMinuteServerTime) {
      console.log('TRIGGEREED!!!!!');
      handlePress();
    }
  }, [cutToMinuteServerTime]);

  const sendBidData = async entryNumObj => {
    await axios
      .post(
        `${BASE_URL}/add_bid_others`,
        {
          data: [
            {
              game_id: futureGame,
              game_entry_number: parseInt(entryNumObj),
              game_amt: coinAmount,
              game_flag: item?.game_flag,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        console.log('RES - sendBidData', res.data.status);
        // getResult();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.log('SDYGFFCYTWAGS', item);

  const handleCoinPressed = coinObj => {
    setCoinAmount(parseInt(coinObj.amt));
    console.log(parseInt(coinObj.amt));
    setEntryNumber(null);
    Alert.alert('Coin added', 'Now click on TIGER/ELEPHANT.');
  };

  const handleEntryNumberPressed = async entryNumObj => {
    try {
      if (coinAmount != null) {
        console.log('ewuriwetttttgyetwuirtfrs', entryNumObj);
        await sendBidData(entryNumObj);
        await getResult();
        console.log('RRRRRRWWWWSSDHBFCFWSGVXDDVC', winnerState);
        ToastAndroid.showWithGravityAndOffset(
          'Bidding Done!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          25,
          50,
        );
        setCoinAmount(null);
        // setEntryNumber(null);
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'ADD COIN FIRST!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          25,
          50,
        );
      }
    } catch (error) {
      console.log('====error====', error);
      ToastAndroid.showWithGravityAndOffset(
        "You don't have enough money!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      );
    }
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={{flex: 2}}>
        <TitleBar />
      </View>
      <ScrollView
        style={{
          borderWidth: normalize(5),
          borderStyle: 'dashed',
          borderColor: 'purple',
        }}>
        <View style={styles.comp2}>
          <Banner />
        </View>
        <View style={styles.headerGameTextContainer}>
          <Text style={styles.headerGameText}>Tiger 🐅 Vs Elephant 🐘</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleEntryNumberPressed(0)}>
            <Animated.View
              style={[styles.box, animatedStyle, styles.shadowProp]}>
              {winnerState == '' ? (
                <Image
                  source={tiger}
                  style={{width: 'auto', height: normalize(150)}}
                />
              ) : (
                <Image
                  source={winnerState == '0' ? tiger : ''}
                  style={{width: 'auto', height: normalize(150)}}
                />
              )}
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEntryNumberPressed(1)}>
            <Animated.View
              style={[styles.box, animatedStyle, styles.shadowProp]}>
              {winnerState == '' ? (
                <Image
                  source={elephant}
                  style={{width: 'auto', height: normalize(150)}}
                />
              ) : (
                <Image
                  source={winnerState == '1' ? elephant : ''}
                  style={{width: 'auto', height: normalize(120)}}
                />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.bigCoinsContainer}>
          <Animated.View style={[animStyle]}>
            <ImageBackground source={coinR} style={styles.bigCoin}>
              <Text style={styles.bigCoinText}>{winnerState}</Text>
            </ImageBackground>
          </Animated.View>
          <Animated.View style={[animStyle]}>
            <ImageBackground source={coinB} style={styles.bigCoin}>
              <Text style={styles.bigCoinText}>{winnerState}</Text>
            </ImageBackground>
          </Animated.View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Last Winner:{' '}
            {lastWinners[0]?.game_result == '0'
              ? 'Tiger'
              : lastWinners[0]?.game_result == '1'
              ? 'Elephant'
              : ''}
          </Text>
        </View>
        {/* <View style={styles.btnContainer}>
          <Button
            disabled
            icon="autorenew"
            mode="contained"
            onPress={() => {
              handlePress();
              // console.log('randomNum1 > randomNum2', randomNum1, randomNum2);
            }}
            buttonColor="orange"
            textColor="black">
            START GAME
          </Button>
        </View> */}
        <View
          style={{
            marginTop: normalize(60),
            marginLeft: normalize(6),
            alignSelf: 'center',
          }}>
          <View style={styles.buttonRow}>
            {coinArray.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.coinButtonStyle}
                onPress={() => handleCoinPressed(item)}>
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
    backgroundColor: 'lavender',
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
    marginBottom: normalize(-10),
    marginTop: normalize(-5),
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
    // top: 400,
    // position: 'absolute',
    height: normalize(50),
    width: normalize(250),
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalize(10),
    alignSelf: 'flex-end',
    borderTopLeftRadius: normalize(20),
  },
  scoreText: {
    fontSize: normalize(25),
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
