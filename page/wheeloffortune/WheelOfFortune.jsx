import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import {GoGoSpin} from 'react-native-gogo-spin';
import Sound from 'react-native-sound';

import kingIm from '../../assets/king.png';
import prizeIm from '../../assets/prize.png';
// import whlIm from '../../assets/wheel.png';
// import whlIm from '../../assets/whl-2.png';
import whlIm from '../../assets/whl-2_work-1.png';
// import btnIm from '../../assets/btn.png';
import btnIm from '../../assets/btn-1.png';

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
  {name: '9', image: kingIm},
  {name: '1', image: prizeIm},
  {name: '2', image: prizeIm},
  {name: '0', image: prizeIm},
  {name: '3', image: prizeIm},
  {name: '8', image: prizeIm},
  {name: '7', image: prizeIm},
  {name: '6', image: prizeIm},
  {name: '5', image: prizeIm},
  {name: '4', image: prizeIm},
];

const SIZE = 270;
const WheelOfFortune = ({route}) => {
  const {userInfo} = useContext(AuthContext);
  const spinRef = useRef(null);
  const [prizeIdx, setprizeIdx] = useState(-1);

  // Enable playback in silence mode
  Sound.setCategory('Playback');

  // Load the sound file 'whoosh.mp3' from the app bundle
  // See notes below about preloading sounds within initialization code below.
  var whoosh = new Sound('whl2.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        whoosh.getDuration() +
        'number of channels: ' +
        whoosh.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
  });

  const doSpin = () => {
    const getIdx = Math.floor(Math.random() * prize.length);
    setprizeIdx(getIdx);
    spinRef?.current?.doSpinAnimate(getIdx);

    // whoosh.play();
    whoosh.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };
  const onEndSpin = endSuccess => {
    console.log('endSuccess', endSuccess);
  };

  const [serverTime, setServerTime] = useState();

  const serverFetchedTime = async () => {
    try {
      await axios
        .get(`${BASE_URL}/server_time`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then(res => {
          setServerTime(res.data.date_time);
        });
    } catch (error) {
      console.log('ERRR', error);
    }
  };

  // const {userInfo} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [gameTime, SetGameTime] = useState([]);
  const {getGameTime} = handleGetGameTime();

  const {game_id, item} = route.params;

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getGameTime(game_id, userInfo.token)
      .then(res => {
        SetGameTime(res.data.data);
        console.log('hsdiufyisdutgrgsfrsdgy', res.data.data);
      })
      .catch(error => console.error(error));
  }, [isFocused]);
  // game_time
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

  useEffect(() => {
    serverFetchedTime();
  }, []);

  console.log('qwertyuioppadjdsafskdgsufgvbs', serverTime);
  const futureGame = findFutureGame();
  console.log('qwertyuioppadjdsafskdgsufgvbsdsarfsedfrgtr', futureGame);
  const isLive = futureGame != null && futureGame == item.game_id;
  console.log('isLive', isLive);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <TitleBar />
      </View>
      <ScrollView>
        <View style={styles.rowContainer}>
          <Text style={styles.prizeText}>
            REWARD: {prizeIdx !== -1 ? prize[prizeIdx]?.name : ''}
          </Text>
          {/* <Image source={prize[prizeIdx]?.image} style={styles.itemWrap} /> */}
        </View>
        <View style={styles.centerWheel}>
          <GoGoSpin
            onEndSpinCallBack={onEndSpin}
            notShowDividLine={true}
            spinDuration={15000}
            spinReverse={true}
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
            style={styles.spinWarp}
            onPress={() => isLive && doSpin()}>
            <Image source={btnIm} style={styles.spinBtn} />
          </TouchableOpacity>
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
                <TouchableOpacity style={styles.buttonStyle} key={index}>
                  <Text style={styles.buttonTextStyle}>{item}</Text>
                  <Text
                    style={{
                      position: 'absolute',
                      top: normalize(60),
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
        <View>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: normalize(20),
              fontWeight: '800',
            }}>
            TOTAL AMOUNT: 2000
          </Text>
        </View>
        <View
          style={{
            marginLeft: normalize(35),
            marginTop: normalize(10),
          }}>
          <View style={styles.buttonRow}>
            {coinArray.map((item, index) => (
              <TouchableOpacity
                style={styles.coinButtonStyle}
                onPress={() => {}}
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
    marginVertical: normalize(10),
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
    height: normalize(80),
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
