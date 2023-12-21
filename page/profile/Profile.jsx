import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import TitleBar from '../../component/titlebar/TitleBar'
import { authstyles } from '../style/pagestyle'
import Banner from '../../component/banner/Banner'
import TransComp from '../../component/trans_component/TransComp'
import normalize from 'react-native-normalize'
import { AuthContext } from '../../src/context/AuthContext'

const Profile = () => {
  const { userInfo, isLoading } = useContext(AuthContext);
  console.log("hel",userInfo.user.name);
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
        <View style={styles.card}>
          <Text style={{color:"#000",fontSize:16}}>Name:{userInfo.user.name}</Text>
          <Text style={{color:"#000",fontSize:16}}>Mobile No:{userInfo.user.mobile_no}</Text>
          <Text style={{color:"#000",fontSize:16}}>Id :SL{userInfo.user.id}</Text>
        </View>
        </View>
      
    </View>


  </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  list_container: {
    flex: 2
  },
  list_container2: {
    flex: 3
  },
  // comp1:{
  //   flex:1
  // },
  comp2:{
    flex:5
  },
  comp3:{
    flex:3
  },
  
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: normalize(8),
    padding: normalize(16),
   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: normalize(0.3),
    shadowRadius: normalize(4),
    elevation: normalize(5),
    marginBottom: normalize(15)
  },
})