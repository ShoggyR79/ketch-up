import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import KetchesScreen from '../screens/KetchesScreen';
import CreateKetchScreen from '../screens/CreateKetchScreen';

import colors from "../styles";
import menuIcon from "../assets/icons/icon1.png";
import homeIcon from "../assets/icons/icon2.png";
import blobIcon from "../assets/icons/icon3.png";
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const KetchComponent = () => {
  return null;
}

const Tabbar = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator initialRouteName={"home"}

      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {

          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          // backgroundColor: colors.ketchup.std,
          backgroundColor: colors.dark[50],
          borderRadius: 15,
          height: 80,
          shadowColor: colors.dark[100],
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,

        },

      }}>

      <Tab.Screen name="home" component={HomeScreen} options={{

        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
            <Image style={{ width: 25, height: 25, tintColor: focused ? colors.ketchup.dark : colors.dark[200] }} source={homeIcon} />
            <Text style={{ fontWeight: 600, top: 8, color: focused ? colors.ketchup.dark : colors.dark[200] }}>home</Text>
          </View>
        ),
      }} ></Tab.Screen>

      {/* <Tab.Screen name = "CreateKetch" component = {KetchComponent} options = {{tabBarButton: () => (<KetchModal />)}}></Tab.Screen>  */}

      <Tab.Screen
        name="ketch"
        component={CreateKetchScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: -25, backgroundColor: colors.ketchup.light, height: 100, width: 100, borderRadius: 50, borderWidth: 15, borderColor: colors.background }}>
              <Image style={{ width: 30, height: 30, tintColor: focused ? colors.ketchup.dark : colors.dark[200] }} source={blobIcon} />
            </View>
          )
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Modal")
          }
        })}
      />

      <Tab.Screen name="Ketches" component={KetchesScreen} initialParams={{initialActive:"SCHEDULED"}} options={{
        // tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
            <Image style={{ width: 25, height: 25, tintColor: focused ? colors.ketchup.dark : colors.dark[200] }} source={menuIcon} />
            <Text style={{ fontWeight: 600, top: 8, color: focused ? colors.ketchup.dark : colors.dark[200] }}>ketches</Text>
          </View>
        ),
      }}
      />


    </Tab.Navigator>
  )
}

export default Tabbar