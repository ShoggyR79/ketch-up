import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { styled } from "nativewind";
import colors from "../styles";

import { StatusBar } from 'expo-status-bar';

const pfp = require('../assets/pfp_test.jpeg')
const bg = require('../assets/background_test.jpeg')

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);


const HomeScreen = () => {
  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StatusBar backgroundColor={colors.dark[50]} />
      <View style={{ width: "100%" }}>

        <View style={{
          height: 200,
          width: "120%",
          // borderRadiuas: 999,
          borderBottomEndRadius: 180,
          borderBottomStartRadius: 180,
          marginTop: -100,
          overflow: "hidden",
          alignSelf: "center",
          // position: "absolute",
          backgroundColor: colors.ketchup.light
        }} />



        <StyledView className='flex-1 items-center'>
          <Image source={pfp}
            resizeMode='contain'
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              borderColor: colors.dark[300],
              borderWidth: 3,
              marginTop: -90,
              // zIndex: 1,
              // position: "absolute",
            }}>
          </Image>


        </StyledView>

        <View style={{ marginVertical: 80, }}>
          <Text style={{
            fontSize: 20,
            color: colors.dark[300],
            // marginVertical: 80,
            alignSelf: 'center',
            fontWeight: '600',

          }}>
            Du Duong
          </Text>
          <StyledView className='flex-row w-100 h-16 mt-2 items-center justify-around'>
            <StyledView className='items-center'>
              <Text style={{ fontSize: "20", fontWeight: "600" }}>20</Text>
              <Text style={{ fontSize: "16" }}>Ketches</Text>
            </StyledView>
            <StyledView className='items-center '>
              <Text style={{ fontSize: "20", fontWeight: "600" }}>5</Text>
              <Text style={{ fontSize: "16" }}>Streak</Text>
            </StyledView>
            <StyledView className='items-center '>
              <Text style={{ fontSize: "20", fontWeight: "600" }}>5</Text>
              <Text style={{ fontSize: "16" }}>Ongoing</Text>
            </StyledView>
          </StyledView>
        </View>

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginVertical: -40,
        }}>
          <TouchableOpacity>
            <Image source={pfp} style={{
              width: 120,
              height: 120,
              marginBottom: 5,

            }} />

          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={pfp} style={{
              width: 120,
              height: 120,
              marginBottom: 5,
            }} />

          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={pfp} style={{
              width: 120,
              height: 120,
              marginBottom: 5,
            }} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={pfp} style={{
              width: 120,
              height: 120,
              marginBottom: 5,
            }} />
          </TouchableOpacity>

        </View>
      </View>




    </StyledSafeAreaView>
  )
}

export default HomeScreen