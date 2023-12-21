import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import { authstyles } from '../style/pagestyle';
import TitleBar from '../../component/titlebar/TitleBar';
import Banner from '../../component/banner/Banner';
import TransComp from '../../component/trans_component/TransComp';

const MyBidGameList = ({navigation}) => {
  return (
    <View style={authstyles.container}>
    <View style={authstyles.title}>
      <TitleBar />
    </View>
    <View style={authstyles.body}>

    <View style={styles.list_container}>
          {/* <View style={styles.comp1}>
           <OfferText/>
          </View> */}
          <View style={styles.comp2}>
            <Banner/>
          </View>
          <View style={styles.comp3}>
            <TransComp />
          </View>
          
        </View>
        <View style={styles.list_container2}>
      {/* <Text>My Bid</Text> */}
      <TouchableOpacity
        onPress={()=> navigation.navigate("BidDetails")}
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
          borderColor: 'rgba(255, 255, 255, 0.5)',
          borderWidth: 1,
        }}>
        {/* Game Name */}
        <View style={{flexDirection: 'column'}}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
            1St Baji
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
            {"15:22:32"}
          </Text>
          {/* <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>
            RESULT : {"16:00:00"}
          </Text> */}
        </View>

        {/* Play container */}
        <View
          style={{
            backgroundColor: 'yellow',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            Play
          </Text>
        </View>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default MyBidGameList;

const styles = StyleSheet.create({
  list_container: {
    flex: 2
  },
  list_container2: {
    flex: 3
  },
  comp1:{
    flex:1
  },
  comp2:{
    flex:5
  },
  comp3:{
    flex:3
  },
});
