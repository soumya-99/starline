import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { authstyles } from '../../style/pagestyle'
import TitleBar from '../../../component/titlebar/TitleBar'
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { BASE_URL } from '../../../src/config';
import { AuthContext } from '../../../src/context/AuthContext';
import TransComp from '../../../component/trans_component/TransComp';
import CoinReauestBanner from '../../../component/banner/CoinReauestBanner';



const data = [
  { label: 'BKash', value: '1' },
  { label: 'Nagad', value: '2' },
  { label: 'ROCKET', value: '3' },

];

const Deposit = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [paymentMod, setPaymentMod] = useState();

  const [isFocus, setIsFocus] = useState(false);
  const [transactionNumber, onChangeTransactionNumber] = useState();
  const [amount, onChangeAmount] = useState();
  const { userInfo } = useContext(AuthContext)

  const handleRequest = async () => {
    if (!value && !transactionNumber && !amount) {
      return alert("please fill all the value")
    }

    if (amount < 200) {
      return alert("please add more than 200")
    }
    console.log(amount,paymentMod,transactionNumber)
    axios.post(`${BASE_URL}/deposit_amt`, {
      amt: amount,
      paymod: paymentMod,
      transNo: transactionNumber
    }, {
      headers: {
        'Accept': 'application/json', 
        'Authorization': `Bearer ${userInfo.token}`
      }
    }).then((res) => {
      console.log(res.data)
      if (res.data.status == "SUCCESS") {
        navigation.navigate('Transaction')
      }
      if (res.data.status == "ERROR") {
        alert(res.data.data)
        return
      }
      setValue(null)
      onChangeAmount()
      onChangeTransactionNumber()
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
            <CoinReauestBanner />
          </View>
          {/* <View style={styles.comp3}>
            <TransComp />
          </View> */}

        </View>
        <View style={styles.list_container2}>

        <View style={styles.container}>
          {/* tittle */}
          <Text style={styles.titleText}>
            Send Money
          </Text>

          {/* choose payment method */}
          {/* Label */}
          <Text style={styles.textLabel}>
            Choose Payment Method
          </Text>
          {/* DropDown */}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setPaymentMod(item.label)
              setIsFocus(false);
            }}
          />
          {/* Transaction number Label */}
          <Text style={styles.textLabel}>
            Transaction Number
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTransactionNumber}
            value={transactionNumber}
            placeholder='Enter Number'
            placeholderTextColor={'grey'}

          />
          {/* Amount Label */}
          <Text style={styles.textLabel}>
            Transaction Amount
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeAmount}
            value={amount}
            placeholder='Enter Amount'
            keyboardType='number-pad'
            placeholderTextColor={'grey'}

          />
          {/* Action Button */}
          <TouchableOpacity
            onPress={handleRequest}
            style={{ padding: 10, backgroundColor: '#00631f', alignSelf: 'center', marginTop: 10, borderRadius: 5 }}>
            <Text style={styles.textButton}>
              REQUEST
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>


    </View>
  )
}

export default Deposit


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
  container: {
    backgroundColor: '#3367fe',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  titleText: {
    color: '#363134',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    padding: 5
  },

  textLabel: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
    margin: 5,
    marginBottom: 1,
    elevation: 100,
    letterSpacing: 1,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',

  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  itemTextStyle:{
    color:'black'
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    borderRadius: 5
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    padding: 5,
    fontSize: 16,
    fontWeight: '600',

  }
})