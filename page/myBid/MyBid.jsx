import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import { authstyles } from '../style/pagestyle';
import Banner from '../../component/banner/Banner';
import TransComp from '../../component/trans_component/TransComp';
import handleGetGameName from '../../hooks/controller/Game/handleGetGameName';
import { AuthContext } from '../../src/context/AuthContext';
import LudoImage from '../../assets/icon/dice.png'
import { useIsFocused } from '@react-navigation/native';

const MyBid = ({ navigation }) => {
  const isFocused = useIsFocused();

  const { userInfo } = useContext(AuthContext)
  const [gameNameList, setGameNameList] = useState()
  const { getGameList } = handleGetGameName()
  useEffect(() => {
    if (!userInfo) {
      return
    }
    getGameList(userInfo?.token).then(res => {
      const data = res.data.data
      console.log(data)
      setGameNameList(data)
    }).catch(error => console.error(error))
  }, [isFocused])



  const GameListTwo = ({ item, index }) => {
    return <>

      {/* Main Cointainer */}
      <View style={{ width: "100%" }}>

        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, alignItems: 'center', marginBottom: 10, marginTop: 10, marginLeft: 10, }}>

          <View style={{ position: 'absolute', left: -10, top: -10, height: 50, width: 50, borderWidth: 2, borderBottomColor: "red", borderTopColor: 'yellow', borderLeftColor: 'green',backgroundColor:'#fff'  }}>
            {/* image */}
            <Image
              source={LudoImage}
              style={{width:'100%',height:'100%'}}
              resizeMode='cover'
            />
          </View>
          {/* Game Name */}
          <Text  style={{ fontSize: 16, fontWeight: 'bold', color: 'white', left: 30, maxWidth: "70%", textAlign: 'center', width: "70%" ,backgroundColor:"#ff2937"}}>
            {item.game_name}
          </Text>

          {/* Play container */}
          <TouchableOpacity
            onPress={() => navigation.navigate('AllBid', {
              game_id: item.game_id,
              game_name: item.game_name
            })}
            style={{ backgroundColor: 'yellow', paddingVertical: 5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
              Bid
            </Text>
          </TouchableOpacity >


        </View>
      </View>
    </>
  }
  return (
    <View style={authstyles.container}>
      <View style={authstyles.title}>
        <TitleBar />
      </View>
      <View style={authstyles.body}>
        {/* <Text>My Bid</Text> */}

        <View style={styles.list_container}>
          {/* <View style={styles.comp1}>
           <OfferText/>
          </View> */}
          <View style={styles.comp2}>
            <Banner />
          </View>
          {/* <View style={styles.comp3}>
            <TransComp />
          </View> */}

        </View>
        <View style={styles.list_container2}>


          <FlatList
            data={gameNameList}
            keyExtractor={(item) => item.game_id}
            renderItem={({ item, index }) => (
              <GameListTwo item={item} index={index} />
            )}
          />



        </View>
      </View>
    </View>
  );
};

export default MyBid;

const styles = StyleSheet.create({
  list_container: {
    flex: 1
  },
  list_container2: {
    flex: 4
  },
  comp1: {
    flex: 1
  },
  comp2: {
    flex: 5
  },
  comp3: {
    flex: 3
  },
});
