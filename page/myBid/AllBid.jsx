import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { authstyles } from '../style/pagestyle'
import TitleBar from '../../component/titlebar/TitleBar'
import handleGetGameTime from '../../hooks/controller/Game/handleGetGameTime'
import { AuthContext } from '../../src/context/AuthContext'
import OfferText from '../../component/offerText/OfferText'
import Banner from '../../component/banner/Banner'
import TransComp from '../../component/trans_component/TransComp'
import { useIsFocused } from '@react-navigation/native';

const AllBid = ({ navigation, route }) => {
    const { userInfo } = useContext(AuthContext)
    const isFocused = useIsFocused();

    const { game_id, game_name } = route.params
    const { getGameTime } = handleGetGameTime()
    const [gameTime, SetGameTime] = useState()
    console.log(game_id)
    useEffect(() => {
        getGameTime(game_id, userInfo.token).then((res) => {
            SetGameTime(res.data.data)
        }).catch((error) => console.error(error))
    }, [isFocused])

    const GameTimeList = ({ item,index }) => {
        // console.log("hello  ", item)
        const ordinalNumber =
            (index + 1 === 1)
                ? '1st'
                : (index + 1 === 2)
                    ? '2nd'
                    : (index + 1 === 3) ?
                        '3rd' : `${index + 1}th`;
        return <>

            {/* Main Cointainer */}

            <TouchableOpacity
                onPress={() => navigation.navigate("BidDetails", {
                    itemData: item,
                    game_name
                })}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, alignItems: 'center', marginBottom: 10, marginTop: 10, marginLeft: 10, borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1 }}>


                {/* Game Name */}
                <View style={{ flexDirection: 'column' }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 16, fontWeight: 'bold', color: 'white', }}>
                        GAME TIME
                    </Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 16, fontWeight: 'bold', color: 'white', }}>
                        {item.game_time}
                    </Text>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 12, fontWeight: 'bold', color: 'white', }}>
                        RESULT :  {item.result_time}
                    </Text>
                </View>
                
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', letterSpacing: 1 }}>
                        {ordinalNumber} Baji
                    </Text>
                </View>

                {/* Play container */}
                <View
                    style={{ backgroundColor: 'yellow', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                        Show
                    </Text>
                </View >


            </TouchableOpacity>

        </>
    }

    return (
        <View style={authstyles.container}>
            <View style={authstyles.title}>
                <TitleBar />
            </View>
            <View style={authstyles.body}>
                {/* <Text>Profile</Text> */}
                <View style={styles.list_container}>
                    {/* <View style={styles.comp1}>
                        <OfferText />
                    </View> */}
                    <View style={styles.comp2}>
                        <Banner />
                    </View>
                    {/* <View style={styles.comp3}>
                        <TransComp />
                    </View> */}

                </View>
                <View style={styles.list_container2}>

                    <FlatList
                        data={gameTime}
                        keyExtractor={(item) => item.game_id}
                        renderItem={({ item, index }) => (
                            <GameTimeList item={item} index={index} />
                        )}
                    />

                </View>
            </View>


        </View>
    )
}

export default AllBid

const styles = StyleSheet.create({
    list_container: {
        flex: 1
    },
    list_container2: {
        flex: 4
    },
    // comp1:{
    //     flex:1
    //   },
      comp2:{
        flex:6
      },
      comp3:{
        flex:3
      },
})