import { View, Text, Button, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import AndroidStyles from '../AndroidStyles'

import colors from "../styles";
import { styled } from 'nativewind';

const StyledSafeAreaView = styled(SafeAreaView);


const ModalKetch = ({ navigation }) => {
  return (
    <StyledSafeAreaView className="flex-1 bg-background" style={{ ...AndroidStyles.droidSafeArea }}>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'start',
        top: 100,
        backgroundColor: colors.background
      }}>
        <Text style={{ fontSize: 30 }}>ready to ketch'up?</Text>
        <Button onPress={() => navigation.navigate("Create")} title="Create Ketch" />
        <Button onPress={() => navigation.navigate("Join")} title="Join Ketch" />
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    </StyledSafeAreaView>
  )
}

export default ModalKetch