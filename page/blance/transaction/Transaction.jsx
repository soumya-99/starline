import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import TitleBar from '../../../component/titlebar/TitleBar'
import { authstyles } from '../../style/pagestyle'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import axios from 'axios';
import { BASE_URL } from '../../../src/config';
import { AuthContext } from '../../../src/context/AuthContext';
import { useIsFocused } from '@react-navigation/native'
import Banner from '../../../component/banner/Banner'
import TransComp from '../../../component/trans_component/TransComp'
const Transaction = () => {
  const { userInfo } = useContext(AuthContext)
  const [allTransaction, setAllTransaction] = useState([])
  const isFocused = useIsFocused();

  const handleGetTransaction = () => {
    axios.get(`${BASE_URL}/transaction`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }).then((res) => {
      setAllTransaction(res.data.data)
    }).catch(error => console.error(error.message))
  }

  useEffect(() => {
    handleGetTransaction()
  }, [isFocused])

  const TransactionCardUi = ({ item }) => {
    const newdate = new Date(item.created_at)
    return <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, marginBottom: 10, marginTop: 10, marginLeft: 10, width: '100%' }}>

      {/* card container */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Icon */}
        <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 50, marginRight: 10 }}>
          <FontAwesome name="trophy" size={30} color="#000000" />
        </View>
        {/* All Texts */}
        <View>
          <Text style={{ color: 'black', fontWeight: '500' }}>
            {item.amount}
          </Text>

          <Text style={{ color: 'black', fontWeight: '500' }}>
            {newdate.toLocaleString()}
          </Text>

          <Text style={{ color: 'black', fontWeight: '500' }}>
            Type : {(item.trns_flag == 'D') ? ("DEPOSIT") : (item.trns_flag == 'W' ? "WITHDRAL" : (item.trns_flag == 'WI' ? "WINING" : (item.trns_flag == 'EF' ? ("ENTRY FEE") : "")))}
          </Text>
        </View>
      </View>

      {/* Pending */}
      <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Text style={{ backgroundColor: "#fff", fontSize: 14, color: "black", fontWeight: '600', padding: 10, borderRadius: 5 }}>
          {item.status == "0" ? "PENDING" : "SUCCESSFUL"}
        </Text>
      </View>

    </View>
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
        {/* <Text>Trans</Text> */}
        <FlatList
          data={allTransaction}
          keyExtractor={(item) => item.game_id}
          renderItem={({ item, index }) => (
            <TransactionCardUi item={item} />
          )}
        />
        </View>
      </View>


    </View>
  )
}

export default Transaction

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
})