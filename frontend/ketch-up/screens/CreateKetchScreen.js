import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styled } from "nativewind";
import {DatePicker} from 'react-native-date-picker'


const { API_LINK } = require('../env.js')
const CreateKetchScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [error, setError] = useState("");

  const createKetch = async () => {

  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: "red" }}>{error}</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={setName}
        value={name}
        placeholder="useless placeholder"
      />
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={setName}
        value={name}
        placeholder="useless placeholder"
      />
      <Button
        title="CREATE"
        onPress={() => { createKetch() }}
      />
      <Button
        title="Go back"
        onPress={() => { navigation.goBack() }}
      />
    </View>
  )
}

export default CreateKetchScreen