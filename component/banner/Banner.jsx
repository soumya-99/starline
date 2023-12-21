import { StyleSheet, Text, View,Image,Dimensions } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import { useDimensionsChange } from 'react-native-responsive-dimensions';

const Banner = () => {

    const screenWidth = Dimensions.get('window').width;
    const logoWidth = screenWidth * 0.9; // 80% of the screen width
const logoHeight = (logoWidth * 0.9) / 2; // Assuming the logo's aspect ratio is 3:1
  return (
    <View style={styles.container}>
     <View style={styles.card}>
     <Image source={require('../../assets/logo/starline.png')} resizeMode="contain"style={{ width: '100%', height: '100%' }} />
      </View>
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },

      card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: normalize(10),
        marginBottom: normalize(10),
        borderRadius: normalize(8),
        // backgroundColor:"#fff",
      
      },
})