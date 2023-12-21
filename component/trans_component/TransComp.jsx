
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import normalize from 'react-native-normalize';
import { useNavigation } from '@react-navigation/native';

const TransComp = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('Deposit')}>
          <View style={styles.con}>
            <Text style={styles.textcont}>Send Money</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Withdrawal')}>
          <View style={styles.con}>
            <Text style={styles.textcont}>Withdrawal</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity  onPress={() => navigation.navigate('Transaction')}>
          <View style={styles.con}>
            <Text style={styles.textcont}>Transaction</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
      
      },
      con: {
        flex: 1,
        width: normalize(100),
        height: normalize(100),
        borderRadius: normalize(15), // Half of width and half of height for oval shape
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        justifyContent: 'center',
        alignItems: 'center',
        borderBlockColor:"red",
       
       
      },
      textcont: {
        
        padding: normalize(15),
        fontSize: normalize(14),
        fontWeight: 'bold',
        color:"black"
      },
});

export default TransComp;