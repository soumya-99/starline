import React, { useContext, useEffect, useState } from 'react';
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
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TitleBar from '../../component/titlebar/TitleBar';
import { useIsFocused } from '@react-navigation/native';
import handleGetGameTime from '../../hooks/controller/Game/handleGetGameTime';
import { AuthContext } from '../../src/context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../src/config';

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
var secTimer;

export default function TigerVsElephant({ route }) {
  const { userInfo } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [gameTimeArrayData, setGameTimeArrayData] = useState([]);
  const { getGameTime } = handleGetGameTime();
  const { game_id, item } = route.params;

  const [currentGameInfo, setCurrentGameInfo] = useState(() => { });
  const [coinAmount, setCoinAmount] = useState(null);
  const [entryNumber, setEntryNumber] = useState(null);
  const [winnerState, setWinnerState] = useState('');
  const [lastWinners, setLastWinners] = useState([]);
  const [lastWinnersStatus, setLastWinnersStatus] = useState(false);
  const [serverDateTime, setServerDateTime] = useState(() => '');

  const [dt, setDt] = useState();

  // =================== Animation Starts ===================
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value * 360}deg` }],
  }));
  const rot = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rot.value}deg` }],
  }));

  // const [tgrEleState, setTgrEleState] = useState(() => true);
  const handlePress = async () => {
    try {
      await getResult();

      // console.log('winnerState|winnerState|winnerState', winnerState);
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Error during fetching results.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      );
    }
    // setTgrEleState(false);
    rot.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE_2, { duration: TIME_2 / 2, easing: EASING_2 }),
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
      withTiming(0, { duration: TIME_2 / 2, easing: EASING_2 }),
    );
    rotation.value = withSequence(
      withTiming(-ANGLE, { duration: TIME, easing: EASING }),
      withRepeat(withTiming(ANGLE, { duration: TIME, easing: EASING }), 5, true),
      withTiming(ANGLE, { duration: TIME, easing: EASING }),
    );


    await delaysetData(20);


    setWinnerState('');
    setInterval(() => {
      const currentTime = new Date();
      setDt(currentTime.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
  };

  const delaysetData = async (seconds) => {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
  });
  };

  const getLastWinners = async () => {
    await axios
      .post(
        `${BASE_URL}/today_others_result_list`,
        {
          game_id: gameTimeArrayData[0]?.game_id,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        console.log('getLastWinners', res.data.data);
        setLastWinners(res.data.data);
        setLastWinnersStatus(res.data.status);
      });
  };

  if (lastWinnersStatus === false) {
    setTimeout(async () => {
      try {
        await getLastWinners();
        console.log(
          'lastWinnersStatus await getLastWinners()====>',
          lastWinnersStatus,
        );
      } catch (error) {
        console.log('SET_TIMEOUT - 2000ms tgr', error);
      }
    }, 2000);
  }

  // console.log('lastWinners.length', lastWinners.length);

  console.log('getLastWinners', lastWinners);

  const getResult = async () => {
    await axios
      .post(
        `${BASE_URL}/others_result`,
        {
          game_id: gameTimeArrayData[0].game_id,
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
        // Playing sound
        if (res.data.data[0].game_result == '0') {
          try {
            SoundPlayer.playSoundFile('tiger1', 'mp3');
          } catch (e) {
            console.log(`cannot play the sound file and err in server.`, e);
          }
        } else if (res.data.data[0].game_result == '1') {
          try {
            SoundPlayer.playSoundFile('elephant1', 'mp3');
          } catch (e) {
            console.log(`cannot play the sound file and err in server.`, e);
          }
        } else {
          try {
            SoundPlayer.playSoundFile('draw1', 'mp3');
          } catch (e) {
            console.log(`cannot play the sound file and err in server.`, e);
          }
        }
      })
      .catch(err => {
        console.log('EEEERRRRRRRRRR', err);
      });
  };

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

          // returns [date, time] in this format
          let dateAndTimeArray = res.data.date_time.split(' ');
          console.log('CUTTTEEDDDD SERVER TIME', dateAndTimeArray[1]);

          setDt(
            new Date(dateAndTimeArray[1]).toLocaleTimeString('en-US', {
              hour12: false,
            }),
          );
        });
    } catch (error) {
      console.log('ERRR', error);
    }
  };

  useEffect(() => {
    serverFetchedTime();
    const fetchGameTimeData = async () => {
      try {
        await getGameTime(game_id, userInfo.token)
          .then(res => {
            setGameTimeArrayData(res.data?.data);
            console.log('fetchGameTimeData', res.data?.data);
          })
          .catch(err => {
            console.log('fetchGameTimeData X==X ERR CATCH', err);
          });
      } catch (error) {
        console.log('fetchGameTimeData trycatch - ERR', error);
      }
    };
    fetchGameTimeData();
  }, [isFocused]);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  let nGTime = '';
  const findFutureGame = () => {
    console.log("/////////////////////////////////")
    // for (let i = 0; i < gameTimeArrayData?.length; i++) {
    //   const checkgameTime = gameTimeArrayData[i].game_time;
    //   // console.log(checkgameTime,currentTime,"\n")
    //   nGTime = checkgameTime;
    //   console.log('checkgameTime, dt', checkgameTime, dt);
    //   if (checkgameTime > dt) {
    //     if (currentGameInfo?.game_id != gameTimeArrayData[i].game_id) {
    //       setCurrentGameInfo(gameTimeArrayData[i]);
    //     }
    //     console.log('}}}}}}}}}}', gameTimeArrayData[i].game_id);
    //     return gameTimeArrayData[i].game_id;
    //   }
    // }

    for (const gameData of gameTimeArrayData ?? []) {
      const checkgameTime = gameData.game_time;
      nGTime = checkgameTime;
      // console.log('checkgameTime, dt', checkgameTime, dt);

      if (checkgameTime > dt) {
        console.log('_______(❁´◡`❁)_________', currentGameInfo?.game_id);
        console.log('gameData.game_id', gameData.game_id);
        if (
          currentGameInfo?.game_id !== gameData.game_id ||
          currentGameInfo?.length == 0
        ) {
          console.log("............ ^_~ ..................", gameData)
          setCurrentGameInfo(gameData);
        }
        console.log('_________game id', gameData.game_id);
        return gameData.game_id;
      }
    }
    return null; // Return null if no future game is found
  };

  console.log('serverDateTime', serverDateTime);
  console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', currentGameInfo);

  // future game ID
  const futureGame = findFutureGame();
  console.log('futureGame', futureGame);

  // Live starting Time boolean
  // const isLive = futureGame != null && futureGame == gameTime[0].game_id;
  // console.log('isLive', isLive);

  // Game starting time
  console.log('gameTime.game_time', gameTimeArrayData[0]?.game_time);
  console.log('gameTime[0].game_id', gameTimeArrayData[0]?.game_id);

  // const [dt, setDt] = useState(
  //   new Date(dateAndTimeArray[1]).toLocaleTimeString('en-US', {hour12: false}),
  // );
  // let cutToMinuteServerTime = dateAndTimeArray[1]?.slice(0, 5);
  // console.log('cutToMinuteServerTime', cutToMinuteServerTime);
  // 1:32:01 -> 7
  // 12:21:04 -> 8
  // let cutToMinuteServerTime
  // if (dt.length === 8) {
  //   cutToMinuteServerTime = dt?.slice(0, 5);
  // } else {
  //   cutToMinuteServerTime = dt?.slice(0, 4);
  // }
  let cutToMinuteServerTime = dt?.slice(0, 5);
  console.log('cutToMinuteServerTime', cutToMinuteServerTime);
  // let cutToMinuteGameTime = gameTime[0]?.game_time?.slice(0, 5);
  let cutToMinuteGameTime = currentGameInfo?.game_time?.slice(0, 5);
  console.log('cutToMinuteGameTime', cutToMinuteGameTime);

  useEffect(() => {
    secTimer = setInterval(() => {
      const currentTime = new Date();
      setDt(currentTime.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  // console.log('DTDTDTDTDTDTDTTDTDTDTDTTDD', dt.slice(0, 8));

  // useEffect(() => {
  //   if (isLive && cutToMinuteGameTime == cutToMinuteServerTime) {
  //     console.log('TRIGGEREED!!!!!');
  //     handlePress();
  //   }
  // }, [cutToMinuteServerTime]);


  function addOneMinute(time) {

    if (!time) {
      time = "00:00";
    }

    // Split the time string into hours and minutes
    var parts = time.split(':');
    var hours = parseInt(parts[0]);
    var minutes = parseInt(parts[1]);

    // Subtract one minute
    minutes -= 1;

    // Adjust hours and minutes if necessary
    if (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }
    if (hours < 0) {
      hours += 24;
    }

    // Format the result as HH:mm
    var formattedHours = String(hours).padStart(2, '0');
    var formattedMinutes = String(minutes).padStart(2, '0');

    return formattedHours + ':' + formattedMinutes;
  }


  useEffect(() => {
    console.log("*****************************************************")
    console.log('cutToMinuteGameTime', cutToMinuteGameTime);
    console.log('cutToMinuteGameTime', addOneMinute(cutToMinuteGameTime));
    console.log('cutToMinuteServerTime', cutToMinuteServerTime);

    // if (addOneMinute(cutToMinuteGameTime)) {
    if (addOneMinute(cutToMinuteGameTime) == cutToMinuteServerTime) {
      console.log('TRIGGEREED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      clearInterval(secTimer)
      handlePress();

      

    }
    // }
  }, [cutToMinuteServerTime]);

  const sendBidData = async entryNumObj => {
    // console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{', {
    //   game_id: gameTime[0].game_id,
    //   game_entry_number: parseInt(entryNumObj),
    //   game_amt: coinAmount,
    //   game_flag: item?.game_flag,
    // });
    await axios
      .post(
        `${BASE_URL}/add_bid_others`,
        {
          data: [
            {
              game_id: gameTimeArrayData[0].game_id,
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
        // await getResult();
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
      <View style={{ flex: 2 }}>
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
                  style={{ width: 'auto', height: normalize(150) }}
                />
              ) : (
                <Image
                  source={winnerState == '0' ? tiger : ''}
                  style={{ width: 'auto', height: normalize(150) }}
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
                  style={{ width: 'auto', height: normalize(150) }}
                />
              ) : (
                <Image
                  source={winnerState == '1' ? elephant : ''}
                  style={{ width: 'auto', height: normalize(120) }}
                />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.bigCoinsContainer}>
          <Animated.View style={[animStyle]}>
            <ImageBackground source={coinR} style={styles.bigCoin}>
              <Text style={styles.bigCoinText}>
                {winnerState == '0' && 'T'}
              </Text>
            </ImageBackground>
          </Animated.View>
          <Animated.View style={[animStyle]}>
            <ImageBackground source={coinB} style={styles.bigCoin}>
              <Text style={styles.bigCoinText}>
                {winnerState == '1' && 'E'}
              </Text>
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
            <Text>START GAME</Text>
          </Button>
        </View> */}
        <View
          style={{
            marginBottom: -20,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text style={{ fontWeight: '700', fontSize: normalize(18) }}>
            {/* NEXT GAME IN: {gameTime[0]?.game_time} */}
            NEXT GAME IN: {nGTime}
          </Text>
          <Text style={{ fontWeight: '700', fontSize: normalize(18) }}>
            NOW: {dt}
          </Text>
          {/* <Text></Text> */}
        </View>
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
    shadowOffset: { width: -2, height: 4 },
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
