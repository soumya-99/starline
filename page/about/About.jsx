import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import TitleBar from '../../component/titlebar/TitleBar'
import { authstyles } from '../style/pagestyle'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { BASE_URL } from '../../src/config'
import { AuthContext } from '../../src/context/AuthContext'
import normalize from 'react-native-normalize'

const About = () => {
  const { userInfo, isLoading } = useContext(AuthContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [upiData, setUpiData] = useState({});

  useEffect(() => {
    if (isFocused) {
      get_game_info();
    }
  }, [navigation.isFocused()]);

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

  console.log("dsjhfjhd",upiData.tandc);
  return (
    <View style={authstyles.container}>
    <View style={authstyles.title}>
      <TitleBar />
    </View>
    <View style={authstyles.body}>
      <View style={styles.card}>
          <Text style={{color:"#000",fontSize:16}}>{upiData.tandc}</Text>
        </View>
    </View>
  </View>
  )
}

export default About

const styles = StyleSheet.create({
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
    marginBottom: normalize(25),
    marginTop:normalize(25),
  },
})