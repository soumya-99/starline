import React, { useEffect, useRef, useState,useContext } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';
import { BASE_URL } from '../../src/config';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../src/context/AuthContext';

// const OfferText = () => {


const OfferText = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { userInfo, isLoading } = useContext(AuthContext);

    const [useOffData, setOffData] = useState("");
    useEffect(() => {
        if (isFocused) {
        get_game_info();
        animateMarquee();
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
            setOffData(gameinfo.data.offer);
            console.log("offer_test", gameinfo.data.offer);
        }).catch(er => {
            console.log("result Network ", er);
        });
    }


    const screenWidth = Dimensions.get('window').width;

    const logoWidth = screenWidth * 1;
    // const logoHeight = (logoWidth * 0.9) / 2;

    const text = useOffData;
    const duration = 10000;
    // const screenWidth=350;
    const translateX = useRef(new Animated.Value(logoWidth)).current;

   console.log("abcdes",text)

    const animateMarquee = () => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: -text.length * 20, // Adjust this factor to control the speed of marquee
                duration,
                useNativeDriver: true,
            })
        ).start();
    };
    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.text, { transform: [{ translateX }] }]} numberOfLines={1}   >
                {text}
            </Animated.Text>
        </View>
    )
}

export default OfferText

const styles = StyleSheet.create({
    container: {
        flex:1,
        overflow: 'hidden',
    },
    text: {
        fontSize: 25,
        textAlign: 'left',
        fontWeight: "bold",
        color: "#fff",
        width:"100%"
        // You can add other text styles as needed
    },
})