import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import SoundPlayer from 'react-native-sound-player';

import {GoGoSpin} from 'react-native-gogo-spin';

import kingIm from '../../assets/king.png';
import prizeIm from '../../assets/prize.png';
// import whlIm from '../../assets/wheel.png';
// import whlIm from '../../assets/whl-2.png';
import whlIm from '../../assets/whl-2_work-1.png';
// import btnIm from '../../assets/btn.png';
import btnIm from '../../assets/btn-12.png';

import coinR from '../../assets/coin-rem.png';
import coinB from '../../assets/coin-blu-2-rem.png';
import coinG from '../../assets/coinG-removebg-preview-removebg-preview.png';
import coinBlk from '../../assets/coinBlk-removebg-preview.png';
import coinO from '../../assets/coinO-removebg-preview.png';
import normalize from 'react-native-normalize';
import {ScrollView} from 'react-native-gesture-handler';
import TitleBar from '../../component/titlebar/TitleBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import handleGetGameTime from '../../hooks/controller/Game/handleGetGameTime';
import {useIsFocused} from '@react-navigation/native';
import {AuthContext} from '../../src/context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../src/config';

const buttonArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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

const prize = [
  {name: '0', color: '#ef66b8'},
  {name: '1', color: '#fbe34f'},
  {name: '2', color: '#84fa95'},
  {name: '3', color: '#7287bc'},
  {name: '4', color: '#f96726'},
  {name: '5', color: '#bda868'},
  {name: '6', color: '#73fb4f'},
  {name: '7', color: '#14bdf6'},
  {name: '8', color: '#13f2d5'},
  {name: '9', color: '#a068e3'},
];

const SIZE = 270;
const WheelOfFortune = ({route}) => {
  const {userInfo} = useContext(AuthContext);
  const spinRef = useRef(null);
  const [prizeIdx, setprizeIdx] = useState(-1);

  const isFocused = useIsFocused();
  const [gameTime, setGameTime] = useState([]);
  const {getGameTime} = handleGetGameTime();
  const {game_id, item} = route.params;

  const [currentTime, setCurrentTime] = useState('');

  const [coinAmount, setCoinAmount] = useState(null);
  const [entryNumber, setEntryNumber] = useState(null);

  const getWinnerIdx = async () => {
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
        setprizeIdx(parseInt(res.data.data[0].game_result));
        console.log('RESSSSSSS IDXXXXX', res.data);
        console.log(
          'RESSSSSSS IDXXXXX',
          parseInt(res.data.data[0].game_result),
        );
        let idx = parseInt(res.data.data[0].game_result);
        console.log('-------========-------=========---', idx);
        spinRef?.current?.doSpinAnimate(idx);

        try {
          SoundPlayer.playSoundFile('whl2', 'mp3');
        } catch (e) {
          console.log(`cannot play the sound file and err in server.`, e);
        }
      })
      .catch(err => {
        console.log(
          'Error in the server, please wait or come back in few times.',
          err,
        );
      });
  };

  // const doSpin = idx => {
  //   // const getIdx = Math.floor(Math.random() * prize.length);
  //   // setprizeIdx(getIdx);
  //   // getWinnerIdx();

  //   try {
  //     // console.log('=====================kasj============', idx);
  //     // spinRef?.current?.doSpinAnimate(idx);
  //     // play the file tone.mp3
  //     SoundPlayer.playSoundFile('whl2', 'mp3');
  //   } catch (e) {
  //     console.log(`cannot play the sound file and err in server.`, e);
  //   }
  // };

  const onEndSpin = endSuccess => {
    console.log('endSuccess', endSuccess);
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
      })
      .catch(err => {
        console.log('============+++++++++++', err);
      });
  };

  if (lastWinners.length === 0) {
    setTimeout(async () => {
      if (lastWinners.length === 0) {
        try {
          await getLastWinners();
        } catch (error) {
          console.log('SET_TIMEOUT - 2000ms', error);
        }
      }
    }, 2000);
  }

  console.log('getLastWinners', lastWinners);

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
    try {
      serverFetchedTime();
    } catch (error) {
      console.log('ERRR_SERVER_FETCHING_TIME', error);
    }
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

  const [dt, setDt] = useState(
    new Date(dateAndTimeArray[1]).toLocaleTimeString('en-US', {hour12: false}),
  );
  // let cutToMinuteServerTime = dateAndTimeArray[1]?.slice(0, 5);
  // console.log('cutToMinuteServerTime', cutToMinuteServerTime);
  let cutToMinuteServerTime;
  if (dt.length === 8) {
    cutToMinuteServerTime = dt?.slice(0, 5);
  } else {
    cutToMinuteServerTime = dt?.slice(0, 4);
  }
  console.log('cutToMinuteServerTime', cutToMinuteServerTime);
  let cutToMinuteGameTime = gameTime[0]?.game_time?.slice(0, 5);
  console.log('cutToMinuteGameTime', cutToMinuteGameTime);

  useEffect(() => {
    const secTimer = setInterval(() => {
      const currentTime = new Date();
      setDt(currentTime.toLocaleTimeString('en-US', {hour12: false}));
    }, 2000);

    return () => clearInterval(secTimer);
  }, []);

  console.log('DTDTDTDTDTDTDTTDTDTDTDTTDD', dt.slice(0, 8));

  useEffect(() => {
    if (isLive && cutToMinuteGameTime == cutToMinuteServerTime) {
      console.log('TRIGGEREED!!!!!');
      getWinnerIdx();
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
        console.log(res.data.status);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCoinPressed = coinObj => {
    setCoinAmount(parseInt(coinObj.amt));
    console.log(parseInt(coinObj.amt));
    setEntryNumber(null);
    Alert.alert('Coin added', 'Now Add Bid Number.');
  };

  const handleEntryNumberPressed = async entryNumObj => {
    try {
      if (coinAmount != null) {
        await sendBidData(entryNumObj);
        ToastAndroid.showWithGravityAndOffset(
          'Bidding Done!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          25,
          50,
        );
        setCoinAmount(null);
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
      console.log('====error====', err);
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
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <TitleBar />
      </View>
      <ScrollView>
        <View style={styles.rowContainer}>
          {/* <Text style={styles.prizeText}>
            REWARD: {prizeIdx !== -1 ? prize[prizeIdx]?.name : ''}
          </Text> */}
          {/* <Image source={prize[prizeIdx]?.image} style={styles.itemWrap} /> */}
        </View>
        <View style={styles.centerWheel}>
          <GoGoSpin
            onEndSpinCallBack={onEndSpin}
            notShowDividLine={true}
            spinDuration={15000}
            spinReverse={false}
            spinTime={15}
            ref={spinRef}
            width={SIZE}
            height={SIZE}
            radius={SIZE / 2}
            data={prize}
            offsetEnable={true}
            source={whlIm}
            renderItem={(data, i) => {
              return (
                <View key={i} style={styles.itemWrapper}>
                  <Text style={styles.prizeText}>{data.name}</Text>

                  {/* <Image source={data.image} style={styles.itemWrap} /> */}
                </View>
              );
            }}
          />
          <TouchableOpacity
            disabled
            style={styles.spinWarp}
            onPress={getWinnerIdx}>
            <Image source={btnIm} style={styles.spinBtn} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              padding: normalize(20),
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignSelf: 'center',
              alignItems: 'center',
              width: '100%',
              height: normalize(25),
              marginTop: normalize(25),
              marginBottom: normalize(-10),
              backgroundColor: 'white',
              borderRadius: normalize(20),
            }}>
            {/* {prize.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: normalize(20),
                    width: normalize(25),
                    borderRadius: normalize(50),
                    backgroundColor: item.color,
                  }}></View>
              );
            })} */}
            {lastWinners.length !== 0 &&
              lastWinners.map((item, i) => {
                if (parseInt(prize[i].name) == parseInt(item?.game_result)) {
                  console.log(
                    'LASTWIIIIIIIII',
                    prize[i].name,
                    item.game_result,
                    prize[i].color,
                  );
                  return (
                    <View
                      key={i}
                      style={{
                        height: normalize(20),
                        width: normalize(25),
                        borderRadius: normalize(50),
                        backgroundColor: prize[i].color,
                      }}></View>
                  );
                }
              })}
          </View>
        </View>
        <View>
          {/* <Text style={{color: 'white'}}>SECTION 1</Text> */}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: normalize(30),
            }}>
            <View style={styles.buttonRow}>
              {buttonArray.map((item, index) => (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  key={index}
                  onPress={() => handleEntryNumberPressed(item)}>
                  <Text style={styles.buttonTextStyle}>{item}</Text>
                  <Text
                    style={{
                      position: 'absolute',
                      top: normalize(55),
                      left: normalize(45),
                      fontSize: normalize(12),
                      color: 'black',
                    }}>
                    X{9}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        {/* <View>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: normalize(20),
              fontWeight: '800',
            }}>
            TOTAL AMOUNT: 2000
          </Text>
        </View> */}
        <View
          style={{
            marginLeft: normalize(35),
            marginTop: normalize(10),
          }}>
          <View style={styles.buttonRow}>
            {coinArray.map((item, index) => (
              <TouchableOpacity
                style={styles.coinButtonStyle}
                onPress={() => handleCoinPressed(item)}
                key={index}>
                <ImageBackground
                  source={item.coinImg}
                  style={styles.coinButton}>
                  <Text style={styles.coinText}>{item.amt}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  startText: {
    fontSize: normalize(14),
    color: '#000',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: normalize(20),
  },
  prizeText: {
    color: '#fff',
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  centerWheel: {
    width: normalize(SIZE),
    height: normalize(SIZE),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinBtn: {width: normalize(105), height: normalize(124)},
  spinWarp: {position: 'absolute'},
  itemWrap: {width: normalize(40), height: normalize(40)},

  buttonTextStyle: {
    textAlign: 'center',
    color: '#151201',
    fontSize: normalize(40),
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(75),
    width: normalize(66),
    backgroundColor: '#FDFD96',
    borderColor: '#FDA172',
    borderWidth: 2,
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

export default WheelOfFortune;
