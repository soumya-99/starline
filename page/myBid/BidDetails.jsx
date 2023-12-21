import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { authstyles } from '../style/pagestyle';
import TitleBar from '../../component/titlebar/TitleBar';
import Banner from '../../component/banner/Banner';
import TransComp from '../../component/trans_component/TransComp';
import DatePicker from 'react-native-date-picker'
import axios from 'axios';
import { BASE_URL } from '../../src/config';
import { AuthContext } from '../../src/context/AuthContext';

const BidDetails = ({ navigation, route }) => {
  const { itemData, game_name } = route.params
  const { userInfo } = useContext(AuthContext)

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [gameBidArray, setGameBidArray] = useState([])

  const handleGetBidList = async () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    await axios.get(`${BASE_URL}/my-bid?fDate=${formattedDate}&game_id=${itemData.game_id}`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }).then((res) => {
      setGameBidArray(res.data.data)
    }).catch(error => console.error(error))
  }
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
            <Banner />
          </View>
          {/* <View style={styles.comp3}>
            <TransComp />
          </View> */}

        </View>
        <View style={styles.list_container2}>

          {/* Game Name */}

          <View style={{ marginBottom: 20 }}>
            <Text style={{ textAlign: 'center', color: 'red', fontSize: 30, fontWeight: '600' }}>
              {game_name}
            </Text>
          </View>


          {/* ROW of date and show button */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{ backgroundColor: '#d2bdc8' }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                Date : - {date.toLocaleDateString()}
              </Text>
              <DatePicker
                modal
                mode='date'
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGetBidList}
              style={{ backgroundColor: '#d2bdc8' }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                Show
              </Text>
            </TouchableOpacity>
          </View>

          {/* Table */}
          {/* Table Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
              backgroundColor: '#d2bdc8',
              marginTop: 30,

            }}>
            {/* blanck text */}
            <Text
              style={{
                ...styles.cellText,
                width: 78,
                textAlign:'center'
              }}>
              {' Date '}
            </Text>
            {/* single Text */}
            <Text
              style={{
                ...styles.cellText,

                textAlign: 'center',
              }}>
              {'Single'}
            </Text>
            {/* Juri Text */}
            <Text
              style={{
                ...styles.cellText,
                borderRightWidth: 0,
                textAlign: 'center',
              }}>
              {'Judi'}
            </Text>
            {/* Patti Text */}
            <Text
              style={{
                ...styles.cellText,
                borderRightWidth: 0,
                textAlign: 'center',
              }}>
              {'Patti'}
            </Text>
            {/* Blanck text */}
            <Text
              style={{
                ...styles.cellText,

              }}>
              {'Status'}
            </Text>
          </View>
          <ScrollView>
          {gameBidArray && gameBidArray.map((props,index)=>{
         
            let newdate =    props.created_at  ?  new Date(props.created_at) : false
         
            return  <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              borderWidth: 1,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                paddingHorizontal: 2,
                height: 30,
                justifyContent: 'center',
                borderRadius: 2,
              }}>

              <Text style={{ fontWeight: '700', fontSize: 12, color: 'black', width: 50 }}>
                {newdate && newdate?.toLocaleDateString()}
              </Text>

            </View>
            {/* table start */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderStyle: 'dashed'
                }}>

                {/* single Text */}
                <Text style={styles.cellText}>{props.single || " - "}</Text>
                {/* Juri Text */}
                <Text style={styles.cellText}>{props.jodi || " - "}</Text>
                {/* Patti Text */}
                <Text style={{ ...styles.cellText, borderRightWidth: 1 }}>
                  {props.patti || " - "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>

                {/* single Text */}
                <Text style={styles.cellText}>{props.single_amt}</Text>
                {/* Juri Text */}
                <Text style={styles.cellText}>{props.jodi_amt}</Text>
                {/* Patti Text */}
                <Text style={{ ...styles.cellText, borderRightWidth: 1 }}>
                  {props.patti_amt}
                </Text>
              </View>
            </View>

            {/* delete button */}
            <View
              style={{
                paddingHorizontal: 2,
                height: 30,
                justifyContent: 'center',
                borderRadius: 2,
              }}>

              <Text style={{ fontWeight: '700', fontSize: 12, color: 'black', }}>
                {props.trns_flag == "WI" ? "WIN" : "      "}
              </Text>

            </View>
          </View>
          })}
          </ScrollView>
        </View>

      </View>
    </View>
  );
};

export default BidDetails;

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
  inputContainer: {
    backgroundColor: '#3fc367',
    width: '100%',
    borderRadius: 10,
    elevation: 8,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: '900',
    color: 'black',
  },
  textInputStyle: {
    width: PixelRatio.roundToNearestPixel(95),
    maxWidth: PixelRatio.roundToNearestPixel(95),
    height: 40,
    margin: 5,
    marginVertical: 4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: 'white',
    color: 'black',
    elevation: 5,
  },

  cellText: {
    borderLeftWidth: 1,
    paddingHorizontal: 2,
    width: 65,
    fontWeight: '500',
    color: 'black',
    textAlign:'center'
  },
});
