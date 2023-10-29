import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import useAuth from '../hooks/useAuth.js';


const { API_LINK } = require('../env.js')
const CreateKetchScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState("")
  const [error, setError] = useState("");
  const {user} = useAuth()
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };
  const createKetch = async () => {
    const response = await fetch(API_LINK+"/ketch", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, deadline: date, location,  userId: user})
    })
    const data = await response.json()
    if (data.status == 201){
      navigation.navigate("Ketch", { id: data.message })
    }else{
      setError(data.message)
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: "red" }}>{error}</Text>
      <Text>Ketch Name:</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={setName}
        value={name}
        placeholder="Enter ketch name"
      />
      <Text>Deadline:</Text>
      <Text>{date.toLocaleString()}</Text>

      <Button title="Set Deadline" onPress={() => setOpen(true)} />
      {open && (
        <DateTimePicker
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Text>Ketch Location:</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={setLocation}
        value={location}
        placeholder="Enter ketch name"
      />
      <Button
        title="CREATE"
        onPress={() => { createKetch() }}
      />
      <Button
        style={{
          margin:12
        }}
        title="Go back"
        onPress={() => { navigation.goBack() }}
      />
    </View>
  )
}

export default CreateKetchScreen