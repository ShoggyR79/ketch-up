import { View, Text, Button } from 'react-native'
import React from 'react'

import colors from "../styles";

const ModalKetch = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background}}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.navigate("Create")} title="Create Ketch" />
      <Button onPress={() => navigation.navigate("Join")} title="Join Ketch" />
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  )
}

export default ModalKetch