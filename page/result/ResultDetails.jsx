import { StyleSheet, Text, View, ScrollView, PixelRatio } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { authstyles } from '../style/pagestyle';
import TitleBar from '../../component/titlebar/TitleBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ExampleOne from './Test';
import handleGetGameName from '../../hooks/controller/Game/handleGetGameName';
import { AuthContext } from '../../src/context/AuthContext';
import handleGetResult from '../../hooks/controller/Game/Results/handleGetResult';
import handleGetGameTime from '../../hooks/controller/Game/handleGetGameTime';
import { useIsFocused } from '@react-navigation/native';

const ResultDetails = ({ navigation, route }) => {
  const [active, setActive] = useState(false)
  const { userInfo } = useContext(AuthContext)
  const [results, setResults] = useState()
  const { getResult } = handleGetResult()
  const { game_id } = route.params
  const { getGameTime } = handleGetGameTime()
  const [gameLength, SetGameLength] = useState()
  const isFocused = useIsFocused();

  function handleSingleorPattiData() {
    setActive(false)
  }

  function handleJoriData() {
    setActive(true)
  }


  useEffect(() => {
    getGameTime(game_id, userInfo.token).then((res) => {
      SetGameLength(res.data.data.length)
    }).catch((error) => console.error(error))
  }, [isFocused])
  useEffect(() => {
    if (!userInfo) {
      return
    }
    getResult(game_id, userInfo?.token).then(res => {
      const data = res.data.data
      console.log(data)
      setResults(data)
    }).catch(error => console.error(error))
  }, [isFocused])
  return (
    <View style={authstyles.container}>
      <View style={authstyles.title}>
        <TitleBar />
      </View>
      <View style={authstyles.body}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.buttonTextStyle}>
            Game Mode
          </Text>
          {/* TWO BUTTONs */}
          <View style={{ flexDirection: 'row' }}>
            {/* SINGLE/PATTI Button  */}
            <TouchableOpacity
              onPress={handleSingleorPattiData}
              style={{ backgroundColor: (!active ? "rgba(255, 0, 0, 1)" : "rgba(255, 0, 0, 0.2)"), borderRadius: 5 }}>
              <Text style={styles.buttonTextStyle}>
                Single / Patti
              </Text>
            </TouchableOpacity>
            {/* Jodi Button */}
            <TouchableOpacity
              onPress={handleJoriData}
              style={{ backgroundColor: (active ? "red" : "rgba(255, 0, 0, 0.2)"), marginLeft: 10, borderRadius: 5 }}>
              <Text style={styles.buttonTextStyle}>
                Jodi
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Table */}
        <ScrollView>
          {results && results.map((props, index) =>
            <ExampleOne data={[props]} isSingle={active} gameLength={gameLength} />
          )}
        </ScrollView>

      </View>
    </View>
  );
};

export default ResultDetails;

const styles = StyleSheet.create({
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
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: '600',
    padding: 10,
    fontSize: 16,
    letterSpacing: 2,

  }
});



{/* Table */ }

    //   <View
    //   style={{
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderTopRightRadius: 5,
    //     borderTopLeftRadius: 5,
    //     backgroundColor: '#d2bdc8',
    //     marginTop: 30,

    //   }}>
    //   {/* blanck text */}
    //   <Text
    //     style={{
    //       ...styles.cellText,
    //       width: 75

    //     }}>
    //     {' Date '}
    //   </Text>
    //   {/* single Text */}
    //   <Text
    //     style={{
    //       ...styles.cellText,

    //       textAlign: 'center',
    //     }}>
    //     {'Single'}
    //   </Text>
    //   {/* Juri Text */}
    //   <Text
    //     style={{
    //       ...styles.cellText,
    //       borderRightWidth: 0,
    //       textAlign: 'center',
    //     }}>
    //     {'Judi'}
    //   </Text>
    //   {/* Patti Text */}
    //   <Text
    //     style={{
    //       ...styles.cellText,
    //       borderRightWidth: 0,
    //       textAlign: 'center',
    //     }}>
    //     {'Patti'}
    //   </Text>
    //   {/* Blanck text */}
    //   <Text
    //     style={{
    //       ...styles.cellText,

    //     }}>
    //     {'Status'}
    //   </Text>
    // </View>
    // <ScrollView>
    //   <View
    //     style={{
    //       flexDirection: 'row',
    //       alignItems: 'center',
    //       justifyContent: 'space-around',
    //       borderWidth: 1,
    //       backgroundColor: '#d2bdc8',
    //     }}>
    //     <View>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-around',
    //           alignItems: 'center',
    //           borderBottomWidth: 1,
    //           borderStyle: 'dashed'
    //         }}>
    //         {/* Text 1 */}
    //         <Text style={{ ...styles.cellText, borderLeftWidth: 0 }}>
    //           {''}
    //         </Text>
    //         {/* single Text */}
    //         <Text style={styles.cellText}>{''}</Text>
    //         {/* Juri Text */}
    //         <Text style={styles.cellText}>{''}</Text>
    //         {/* Patti Text */}
    //         <Text style={{ ...styles.cellText, borderRightWidth: 1 }}>
    //           {''}
    //         </Text>
    //       </View>

    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-around',
    //           alignItems: 'center',
    //         }}>
    //         {/* Text 1 */}
    //         <Text style={{ ...styles.cellText, borderLeftWidth: 0 }}>
    //           {''}
    //         </Text>
    //         {/* single Text */}
    //         <Text style={styles.cellText}>{''}</Text>
    //         {/* Juri Text */}
    //         <Text style={styles.cellText}>{''}</Text>
    //         {/* Patti Text */}
    //         <Text style={{ ...styles.cellText, borderRightWidth: 1 }}>
    //           {''}
    //         </Text>
    //       </View>
    //     </View>

    //     {/* delete button */}
    //     <View

    //       style={{
    //         paddingHorizontal: 2,
    //         height: 30,
    //         justifyContent: 'center',
    //         borderRadius: 2,
    //       }}>

    //       <Text style={{ fontWeight: '700', fontSize: 12, color: 'black' }}>
    //         Win
    //       </Text>

    //     </View>
    //   </View>
    // </ScrollView>