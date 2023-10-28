import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

import { styled } from "nativewind";
import colors from "../styles";

const StyledSafeAreaView = styled(SafeAreaView);


const HomeScreen = () => {
  return (
    <SafeAreaView className = "flex-1 bg-background">
      <View>
        <TouchableOpacity>

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen