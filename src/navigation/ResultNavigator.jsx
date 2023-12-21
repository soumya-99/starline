import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ResultDetails from '../../page/result/ResultDetails';
import Result from '../../page/result/Result';

const Stack = createStackNavigator();
const ResultNavigator = () => {
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


                <Stack.Screen
                    name="resultNav"
                    component={Result}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'GameTime',
                    }}
                />

                <Stack.Screen
                    name="ResultDetails"
                    component={ResultDetails}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'GameTime',
                    }}
                />
            </Stack.Navigator>
        </>
    )
}

export default ResultNavigator

const styles = StyleSheet.create({})