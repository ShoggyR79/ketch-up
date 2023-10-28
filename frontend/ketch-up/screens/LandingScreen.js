import { View, Text, Button } from 'react-native'
import React from 'react'

import colors from "../styles";

const LandingScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background}}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.navigate("Login")} title="Login" />
      <Button onPress={() => navigation.navigate("Register")} title="Register" />
    </View>
  )
}

export default LandingScreen