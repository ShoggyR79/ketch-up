import { View, Text, Button, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import AndroidStyles from '../AndroidStyles'

import colors from "../styles";
import { styled } from 'nativewind';

import { AntDesign } from '@expo/vector-icons';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTouchable = styled(TouchableOpacity);



const ModalKetch = ({ navigation }) => {
  return (
    <StyledSafeAreaView className="flex-1 bg-background" style={{ ...AndroidStyles.droidSafeArea }}>
      <StyledTouchable className='mt-5 ml-5' onPress={() => { navigation.goBack() }}>
        <AntDesign name="left" size={24} color="black" />
      </StyledTouchable>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'start',
        top: 60,
        backgroundColor: colors.background
      }}>
        <Text style={{ fontSize: 30, fontWeight: "600", color: colors.ketchup.dark }}>ready to ketch'up?</Text>
        <View style={{
          marginTop: 70,

        }}>
          <TouchableOpacity style={{
            borderRadius: 20,
            borderWidth: 2,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            backgroundColor: colors.accent.light,

          }} onPress={() => navigation.navigate("Create")} title="Create Ketch">
            <StyledText className='font-semibold text-lg '>Create Ketch</StyledText>
          </TouchableOpacity>
          <StyledText className='self-center my-5 text-2xl'>or</StyledText>

          {/* <Button onPress={() => navigation.navigate("Join")} title="Join Ketch" /> */}
          <TouchableOpacity style={{
            borderRadius: 20,
            borderWidth: 2,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            backgroundColor: colors.accent.light,

          }} onPress={() => navigation.navigate("Join")}>
            <StyledText className='font-semibold text-lg'>Join Ketch</StyledText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} >
            <StyledText className='text-lg font-md self-center mt-8 font-md text-ketchup-dark'>another time</StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </StyledSafeAreaView>
  )
}

export default ModalKetch