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

const GameTime = ({ navigation, route }) => {
    const isFocused = useIsFocused();

    const { userInfo } = useContext(AuthContext)
    const { game_id, game_name } = route.params
    const { getGameTime } = handleGetGameTime()
    const [gameTime, SetGameTime] = useState([])

    const [currentTime, setCurrentTime] = useState("");

    // ata a6e karon ami time take direct 24 hours a nichhi
    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        getGameTime(game_id, userInfo.token).then((res) => {
            SetGameTime(res.data.data)
        }).catch((error) => console.error(error))
    }, [isFocused])

    // game_time
    const findFutureGame = () => {
        for (let i = 0; i < gameTime?.length; i++) {
            const checkgameTime = gameTime[i].game_time
            // console.log(checkgameTime,currentTime,"\n")
            if (checkgameTime > currentTime) {
                return gameTime[i].game_id;
            }
        }
        return null; // Return null if no future game is found
    };
    const findFutureGameTwo = () => {
        let futureGameId = null; // Initialize to null by default

        gameTime?.forEach((game) => {
            const checkgameTime = game.game_time;
            //   console.log(checkgameTime, currentTime);

            if (checkgameTime > currentTime) {
                futureGameId = game.game_id;
                // If you want to stop the iteration after finding the first future game, you can use 'return false;'
            }
        });
        console.log(futureGameId)
        return futureGameId; // Return null if no future game is found, or the game_id of the first future game found
    };

    const findFutureGameThree = () => {
        for (let i = 0; i < gameTime?.length; i++) {
            const checkgameTime = gameTime[i].game_time
            console.log(checkgameTime)
            // console.log(checkgameTime,currentTime,"\n")
            if (checkgameTime > currentTime) {
                return gameTime?.game_id;
            }
        }
        return null; // Return null if no future game is found
    };

    useEffect(() => {
        // if (gameTime.length != 0) {
        //    const kk =  findFutureGameThree()
        //     console.log(kk)
        // }
    }, [gameTime])


    const GameTimeList = ({ item, index }) => {
        const futureGame = findFutureGame()
        const isLive = futureGame != null && futureGame == item.game_id
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
                onPress={() => isLive && navigation.navigate("GameEntry", {
                    itemData: item
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
                    style={{ backgroundColor: (isLive ? "yellow" : "#fff"), paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                        {isLive ? "Play " : "Close"}
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

export default GameTime

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
    comp2: {
        flex: 6
    },
    comp3: {
        flex: 3
    },
})