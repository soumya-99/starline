import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import Home from "../../page/home/Home";
import MyBid from "../../page/myBid/MyBid";
import Contact from "../../page/contact/Contact";
import Result from "../../page/result/Result";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import HomeNavigation from "./HomeNavigation";
import MyBidNavigator from "./MyBidNavigator";
import ResultNavigator from "./ResultNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={() => ({
      headerShown: false,
      tabBarInactiveTintColor: 'white',
      tabBarActiveTintColor: '#EF69BE',
      tabBarStyle: {
        height: 70,
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom: 15,
        backgroundColor: '#2B2730',
        borderTopWidth: 0,
      }
    })}>
      <Tab.Screen name="Home" component={HomeNavigation} options={{
        headerShown: false,
        tabBarLabel: 'Home',

        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="apps" color={color} size={size} />

        ),
      }} />
      <Tab.Screen name="My Bid" component={MyBidNavigator} options={{
        headerShown: false,
        tabBarLabel: 'My Bid',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="waterfall-chart" color={color} size={size} />

        ),
      }} />
      <Tab.Screen name="Result" component={ResultNavigator} options={{
        headerShown: false,
        tabBarLabel: 'Result',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="trophy" color={color} size={size} />

        ),
      }} />
      <Tab.Screen name="Contact" component={Contact} options={{
        headerShown: false,
        tabBarLabel: 'Contacts',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="help-center" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;