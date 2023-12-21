import React, { useContext, useEffect, useState } from "react";
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./TabNavigator";
import Login from "../../page/auth/Login";
import Contact from "../../page/contact/Contact";
import Profile from "../../page/profile/Profile";
import Transaction from "../../page/blance/transaction/Transaction";
import Deposit from "../../page/blance/transaction/Deposit";
import Withdrawal from "../../page/blance/transaction/Withdrawal";
import Whatsapp from "../../page/contact/Whatsapp";
import About from "../../page/about/About";
import { StyleSheet, View, Text, Alert, Image, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import FontAwesome from "react-native-vector-icons/FontAwesome5"
import normalize from "react-native-normalize";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import Shere from "../../page/contact/Shere";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";


const Drawer = createDrawerNavigator();

const screenWidth = Dimensions.get('window').width;

const logoWidth = screenWidth * 0.3; // 80% of the screen width
const logoHeight = (logoWidth * 0.9) / 2; // Assuming the logo's aspect ratio is 3:1

function ImageDrawerContent(navigation ) {
    const { userInfo, isLoading } = useContext(AuthContext);
    const [wlBal, setWlBal] = useState();
    const isFocused = useIsFocused();
    useEffect(() => {
        getGameNameData();
    }, [isFocused]);

    const getGameNameData = async () => {
        await axios.get(`${BASE_URL}/total_money_Wallet`, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }).then(res => {
            let resData = res.data;
            setWlBal(resData.data[0].total_value_amount);
            console.log('wbBlance', wlBal);

        }).catch(er => {
            console.log("login Network ", er);
        });
    }



    return (
        <DrawerContentScrollView {...navigation}>
            <View style={styles.cont}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{
                        justifyContent: 'center',
                        marginHorizontal: normalize(2)
                    }}>
                        <Image source={require('../../assets/logo/starline.png')} resizeMode="contain" style={{ width: logoWidth, height: logoHeight }} />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.textview}>{userInfo?.user?.name.toUpperCase()}</Text>
                    <Text style={styles.textview}>৳ {wlBal}</Text>
                </View>
            </View>

            <DrawerItemList {...navigation} />
        </DrawerContentScrollView>
    );
}

const DrawerNavigator = () => {


    const Logout = () => {
        const { logout } = useContext(AuthContext);
        const navigation = useNavigation();
        logout();
        navigation.navigate('Login')

    }

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                activeTintColor: 'red',
                drawerStyle: {
                    backgroundColor: 'red',
                    width: 240,
                    
                },
                drawerActiveTintColor:"black",
                drawerInactiveTintColor:"white",
                drawerActiveBackgroundColor:"white"
            
            }}
          


            drawerContent={(props) => <ImageDrawerContent {...props} />}
        >

            <Drawer.Screen name="STARLINE" component={BottomTabNavigator} options={{
                drawerLabel: 'Home',
                drawerIcon: ({ focused, color, size }) => (
                    // <MaterialIcons name="home" color={color} size={size} />
                    <MaterialIcons
                        name={focused ? 'apps' : 'apps'}
                        size={size}
                        color={color}
                    />
                ),
            }} />
            <Drawer.Screen name="Profile" component={Profile}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        // <MaterialIcons name="home" color={color} size={size} />
                        <FontAwesome
                            name={focused ? 'user' : 'user'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="Transaction" component={Transaction} options={{
                drawerIcon: ({ focused, color, size }) => (
                    // <MaterialIcons name="home" color={color} size={size} />
                    <FontAwesome
                        name={focused ? 'chart-line' : 'chart-line'}
                        size={size}
                        color={color}
                    />
                ),
            }} />
            <Drawer.Screen name="Deposit" component={Deposit} options={{
                drawerIcon: ({ focused, color, size }) => (
                    // <MaterialIcons name="home" color={color} size={size} />
                    <MaterialIcons
                        name={focused ? 'bar-chart' : 'bar-chart'}
                        size={size}
                        color={color}
                    />
                ),
            }} />
            <Drawer.Screen name="Withdrawal" component={Withdrawal} options={{
                drawerIcon: ({ focused, color, size }) => (
                    // <MaterialIcons name="home" color={color} size={size} />
                    <MaterialIcons
                        name={focused ? 'show-chart' : 'show-chart'}
                        size={size}
                        color={color}
                    />
                ),
            }} />
            <Drawer.Screen name="WhatsApp" component={Whatsapp} options={{
                drawerIcon: ({ focused, color, size }) => (
                    // <MaterialIcons name="home" color={color} size={size} />
                    <FontAwesome
                        name={focused ? 'whatsapp' : 'whatsapp'}
                        size={size}
                        color={color}
                    />
                ),
            }} />
            <Drawer.Screen name="Contact" component={Contact} options={{
                drawerIcon: ({ focused, color, size }) => (
                    // <MaterialIcons name="home" color={color} size={size} />
                    <MaterialIcons
                        name={focused ? 'chat-bubble-outline' : 'chat-bubble-outline'}
                        size={size}
                        color={color}
                    />
                ),
            }} />
            <Drawer.Screen name="About" component={About} options={{
                drawerIcon: ({ focused, color, size }) => (
                    // <MaterialIcons name="home" color={color} size={size} />
                    <MaterialIcons
                        name={focused ? 'info-outline' : 'info-outline'}
                        size={size}
                        color={color}
                    />
                ),
            }} />



            <Drawer.Screen name="Refer & Earn" component={Shere} options={{
                drawerIcon: ({ focused, color, size }) => (
                    // <MaterialIcons name="home" color={color} size={size} />
                    <MaterialIcons
                        name={focused ? 'send' : 'send'}
                        size={size}
                        color={color}
                    />
                ),
            }} />



            <Drawer.Screen name="Logout" component={Logout} options={{
                drawerIcon: ({ focused, color, size }) => (
                    // <MaterialIcons name="home" color={color} size={size} />
                    <MaterialIcons
                        name={focused ? 'logout' : 'logout'}
                        size={size}
                        color={color}
                    />
                ),
            }} />


        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: '#f0f0f0',
    },

    cont: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: normalize(1),
        marginBottom: normalize(20),
        margin: normalize(10),
    },
    textview: {
        justifyContent: 'center',
        color: "#fff",
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});