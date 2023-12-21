import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import TitleBar from '../../component/titlebar/TitleBar'
import { authstyles } from '../style/pagestyle'
import normalize from 'react-native-normalize'
import { AuthContext } from '../../src/context/AuthContext'
import axios from 'axios'
import { BASE_URL } from '../../src/config'
import Banner from '../../component/banner/Banner'
import TransComp from '../../component/trans_component/TransComp'

const Contact = () => {
  const { userInfo, isLoading } = useContext(AuthContext);
  const [upiData, setUpiData] = useState({});
  useEffect(() => {
    get_game_info();
  }, []);
  const get_game_info = async () => {
    await axios.get(`${BASE_URL}/offer`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }).then(res => {
      console.log("res", res);
      let gameinfo = res.data;
      setUpiData(gameinfo.data);
      console.log("gamecontact", gameinfo);
    }).catch(er => {
      console.log("result Network ", er);
    });
  }



  const handleWhatsApp = () => {
    const url = `whatsapp://send?phone=${upiData.whatsapp}`;
    // const url = `whatsapp://send?phone=917319328962`;
    Linking.openURL(url).catch(() => alert('Make sure WhatsApp is installed on your device'));
    
  };

  const handleMobile = () => {
    Linking.openURL(`tel:${upiData.mobile}`);
    // Linking.openURL(`tel:7319328962`);
  };
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
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/logo/phone.png')} style={styles.image} resizeMode="contain" />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleMobile}>
              <Text style={styles.buttonText}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleWhatsApp}>
              <Text style={styles.buttonText}>Whatsapp Now</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>


    </View>
  )
}

export default Contact

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


  imageContainer: {
    alignItems: 'center', // Center  horizontally
    justifyContent: 'center', // Center vertically
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: 'cover',
   
  },
  button: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10
  },
  button2: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})