import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import {authstyles} from '../style/pagestyle';
import Icon from 'react-native-vector-icons/Entypo';

import normalize from 'react-native-normalize';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import OvalShapeButton from '../../component/Small/OvalShapeButton';
import handleGetGameName from '../../hooks/controller/Game/handleGetGameName';
import {AuthContext} from '../../src/context/AuthContext';
import TransComp from '../../component/trans_component/TransComp';
import Banner from '../../component/banner/Banner';
import OfferText from '../../component/offerText/OfferText';
import {useIsFocused} from '@react-navigation/native';
import {Button} from 'react-native-paper';

const Home = ({navigation}) => {
  const isFocused = useIsFocused();

  const {userInfo} = useContext(AuthContext);
  const [gameNameList, setGameNameList] = useState();
  const {getGameList} = handleGetGameName();

  function getColorByLetter(letter) {
    const alphabets = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    const colors = [
      '#FF6633',
      '#FFB399',
      '#FF33FF',
      '#8062D6',
      '#00B3E6',
      '#E6B333',
      '#3366E6',
      '#999966',
      '#99FF99',
      '#B34D4D',
      '#80B300',
      '#809900',
      '#E6B3B3',
      '#6680B3',
      '#66991A',
      '#FF99E6',
      '#CCFF1A',
      '#FF1A66',
      '#E6331A',
      '#33FFCC',
      '#66994D',
      '#B366CC',
      '#4D8000',
      '#B33300',
      '#CC80CC',
      '#66664D',
      '#991AFF',
    ];
    let upperLetter = letter.toUpperCase();

    const isAmpersandPresent = alphabets.includes(upperLetter);
    if (isAmpersandPresent) {
      return colors[alphabets.indexOf(upperLetter)];
    } else {
      return '#000000';
    }
  }

  const GameListTwo = ({item, index}) => {
    return (
      <>
        {/* Main Cointainer */}
        <View style={{width: '100%'}}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 15,
              alignItems: 'center',
              marginBottom: 10,
              marginTop: 10,
              marginLeft: 10,
            }}>
            <View
              style={{
                position: 'absolute',
                left: -10,
                top: -10,
                height: 50,
                width: 50,
                borderWidth: 2,
                borderBottomColor: 'red',
                borderTopColor: 'yellow',
                borderLeftColor: 'green',
                backgroundColor: '#fff',
              }}>
              {/* image */}
              <Image
                source={require('../../assets/icon/dice.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>
            {/* Game Name */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                left: 30,
                maxWidth: '70%',
                textAlign: 'center',
                width: '70%',
                backgroundColor: '#ff2937',
              }}>
              {item.game_name}
            </Text>

            {/* Play container */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('GameTime', {
                  game_id: item.game_id,
                  game_name: item.game_name,
                })
              }
              style={{
                backgroundColor: 'yellow',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                Play
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  const GameListCustom = ({item, index}) => {
    return (
      <>
        {/* Main Cointainer */}
        <View style={{width: '100%'}}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 15,
              alignItems: 'center',
              marginBottom: 10,
              marginTop: 10,
              marginLeft: 10,
            }}>
            <View
              style={{
                position: 'absolute',
                left: -10,
                top: -10,
                height: 50,
                width: 50,
                borderWidth: 2,
                borderBottomColor: 'red',
                borderTopColor: 'yellow',
                borderLeftColor: 'green',
                backgroundColor: '#fff',
              }}>
              {/* image */}
              <Image
                source={require('../../assets/icon/dice.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>
            {/* Game Name */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                left: 30,
                maxWidth: '70%',
                textAlign: 'center',
                width: '70%',
                backgroundColor: '#ff2937',
              }}>
              {item.game_name}
            </Text>

            {/* Play container */}
            <TouchableOpacity
              onPress={() => navigation.navigate('TgrVsElphnt')}
              style={{
                backgroundColor: 'yellow',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                Play
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    getGameList(userInfo?.token)
      .then(res => {
        const data = res.data.data;
        console.log(data);
        setGameNameList(data);
      })
      .catch(error => console.error(error));
  }, [isFocused]);

  return (
    <View style={authstyles.container}>
      <View style={authstyles.title}>
        <TitleBar />
      </View>
      <View style={authstyles.body}>
        <View style={styles.list_container}>
          <View style={styles.comp1}>
            <OfferText />
          </View>
          <View style={styles.comp2}>
            <Banner />
          </View>
          <View style={styles.comp3}>
            <TransComp />
          </View>
        </View>
        <View style={styles.list_container2}>
          <View style={styles.list_sub_container}>
            {/* <FlatList
              data={gameNameList}
              keyExtractor={item => item.game_id}
              renderItem={({item, index}) => (
                <GameListTwo item={item} index={index} />
              )}
            /> */}

            <GameListCustom
              item={{game_name: 'Tiger Vs Elephant', game_id: 21}}
              index={3}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  list_container: {
    flex: 2,
  },
  list_container2: {
    flex: 3,
  },
  comp1: {
    flex: 1,
  },
  comp2: {
    flex: 5,
  },
  comp3: {
    flex: 3,
  },

  ovalContainer: {
    marginBottom: 10,
  },
  oval: {
    left: 110,
    width: PixelRatio.roundToNearestPixel(65), // Adjust the width and height as per your desired oval size
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 100, // Half of the width to create an illusion of an oval
    backgroundColor: 'green', // Set the green background color here
    transform: [{scaleX: 5}], // Scale the view horizontally to create the oval shape
  },

  ovalText: {
    width: '100%',
    position: 'absolute',
    top: PixelRatio.roundToNearestPixel(40),
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },

  gameName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFAD7',
  },
  card: {
    backgroundColor: '#060047',

    paddingVertical: 8,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 10,
  },

  playText: {
    fontWeight: 'bold',
    color: '#FF90BB',
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },

  // =======================================

  container2: {
    flex: 1,
  },

  infocon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(5),
  },
  textCont: {
    fontSize: normalize(18),
    color: 'white',
    flex: 7,
  },
  iconCont: {
    flex: 1,
    paddingVertical: normalize(5),
    color: 'white',
    marginHorizontal: normalize(10),
    color: 'black',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.1),
  },
  icon: {
    borderRadius: normalize(25),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(15),
    padding: normalize(1),
    backgroundColor: 'green',
    flex: 1,
  },
  btnContainer: {
    padding: 50,
    width: '100%',
  },
});
