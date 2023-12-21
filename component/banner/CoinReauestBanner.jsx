import { StyleSheet, Text, View, Image, Dimensions,TouchableOpacity,Clipboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import normalize from 'react-native-normalize'
import { useDimensionsChange } from 'react-native-responsive-dimensions';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../src/context/AuthContext';
import { BASE_URL } from '../../src/config';
import axios from 'axios';

const CoinReauestBanner = () => {
  const { userInfo, isLoading } = useContext(AuthContext);
  const screenWidth = Dimensions.get('window').width;
  const logoWidth = screenWidth * 0.9; // 80% of the screen width
  const logoHeight = (logoWidth * 0.9) / 2; // Assuming the logo's aspect ratio is 3:1
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [upiData, setUpiData] = useState({});
  const [copied, setCopied] = useState(false);
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


  const handleCopyToClipboard = async () => {
    try {
      await Clipboard.setString(upiData.trans_no);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the "copied" status after 2 seconds
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Handle any errors that occur during the copy process
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.mobileNumberContainer}>
        <TouchableOpacity onPress={handleCopyToClipboard}>
        <View style={styles.rowContainer2}>
          <Text style={styles.mobileNumber}>{upiData.trans_no} </Text>
          <Text style={styles.mobileNumber2}>Copy</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <Image
            source={require('../../assets/icon/bkash.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Image
            source={require('../../assets/icon/Nagad.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Image
            source={require('../../assets/icon/rocket-removebg.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>
    </View>
  )
}

export default CoinReauestBanner

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'column', // Change to 'column' to stack mobileNumber and rowContainer vertically
    justifyContent: 'space-between',
    padding: normalize(10),
    marginBottom: normalize(10),
    borderRadius: normalize(8),
  },
  mobileNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileNumber: {
    fontSize: 40,
    color:"#fff",
    fontWeight: 'bold',
  },
  mobileNumber2: {
    fontSize: 18,
    color:"#fff",
    fontWeight: 'bold',
    backgroundColor:"#2a73e8",
    padding:5,
    borderRadius:5
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '30%', // Adjust the width as needed based on your layout
    height: 100, // Adjust the height as needed based on your layout
  },
  rowContainer2: {
    flexDirection: 'row',
    alignItems: 'center', // If you want to vertically align the texts
  },
})