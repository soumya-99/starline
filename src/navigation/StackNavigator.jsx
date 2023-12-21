import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../../page/auth/Login';
import { Text,View } from 'react-native';
import Registar from '../../page/auth/Registar';
import GameTime from '../../page/home/GameTime';
import GameEntry from '../../page/home/GameEntry';
import MyBidGameList from '../../page/myBid/MyBidGameList';
import BidDetails from '../../page/myBid/BidDetails';
import ResultDetails from '../../page/result/ResultDetails';

const Stack = createStackNavigator();
const StackNavigator = () => {
  const { userInfo, isLoading } = useContext(AuthContext);
  console.log('navbar token', userInfo);

  if (isLoading) {
    return <View style={{flex:1,backgroundColor:'#7915ab',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'white',fontSize:20,fontWeight:'500'}}>
        Fetching User...
      </Text>
    </View>
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9AC4F8',
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
        }}>
        {userInfo?.token ? (
          <>
            <Stack.Screen
              name="Home"
              component={DrawerNavigator}
              options={{
                headerShown: false,
                tabBarLabel: 'Home',
              }}
            />









          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                tabBarLabel: 'login',
              }}
            />

            <Stack.Screen
              name="Registar"
              component={Registar}
              options={{
                headerShown: false,
                tabBarLabel: 'Registar',
              }}
            />
          </>
        )}

        {/* <Stack.Screen name="Login" component={Login} /> */}
      </Stack.Navigator>
    </>
  );
};

export { StackNavigator };
