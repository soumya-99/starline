import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyBid from '../../page/myBid/MyBid';
import MyBidGameList from '../../page/myBid/MyBidGameList';
import BidDetails from '../../page/myBid/BidDetails';
import AllBid from '../../page/myBid/AllBid';

const Stack = createStackNavigator();
const MyBidNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#9AC4F8',
                },
                headerTintColor: 'white',
                headerBackTitle: 'Back',
            }}>

            <Stack.Screen
                name="MyBid"
                component={MyBid}
                options={{
                    headerShown: false,
                    tabBarLabel: 'GameTime',
                }}
            />

       
            <Stack.Screen
                name="AllBid"
                component={AllBid}
                options={{
                    headerShown: false,
                    tabBarLabel: 'GameTime',
                }}
            />

            <Stack.Screen
                name="MyBidGameList"
                component={MyBidGameList}
                options={{
                    headerShown: false,
                    tabBarLabel: 'GameTime',
                }}
            />
               <Stack.Screen
                name="BidDetails"
                component={BidDetails}
                options={{
                    headerShown: false,
                    tabBarLabel: 'GameTime',
                }}
            />
        </Stack.Navigator>
    )
}

export default MyBidNavigator

const styles = StyleSheet.create({})