import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import useAuth from '../hooks/useAuth.js';

import colors from "../styles"

import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';

const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledView = styled(View);


const { API_LINK } = require('../env.js')
const CreateKetchScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState("")
  const [error, setError] = useState("");
  const { user } = useAuth()
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
  };
  const createKetch = async () => {
    const response = await fetch(API_LINK + "/ketch", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
<<<<<<< HEAD
    },
    body: JSON.stringify({ name, deadline: Math.floor(date.getTime()), location,  userId: user})
    })
    const data = await response.json()
    if (response.status == 201){
      navigation.goBack()
    }else{
=======
      },
      body: JSON.stringify({ name, deadline: date, location, userId: user })
    })
    const data = await response.json()
    if (data.status == 201) {
      navigation.navigate("Ketch", { id: data.message })
    } else {
>>>>>>> 4da49c2 (ui)
      setError(data.message)
    }
  }
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'start',
      top: 210,
      backgroundColor: colors.ketchup.lighter,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      paddingHorizontal: 20,
    }}>
      <StyledTouchable className='mt-5 self-start' onPress={() => { navigation.goBack() }}>
        <FontAwesome5 name="chevron-down" size={24} color="black" />
      </StyledTouchable>
      <StyledText className='text-2xl font-semibold tracking-wider mb-5'>host a ketch</StyledText>
      <Text style={{ color: "red" }}>{error}</Text>

      <StyledText className='self-start mb-2 text-lg font-semibold'>Ketch Name:</StyledText>

      <TextInput
        style={{
          height: 50,
          width: "100%",
          // margin: 12,
          borderWidth: 2,
          paddingVertical: 12,
          paddingHorizontal: 15,
          // backgroundColor: colors.dark[50],
          borderRadius: 20,
          backgroundColor: colors.background,

        }}
        onChangeText={setName}
        value={name}
        placeholder="give this ketch a name!"
        placeholderTextColor={colors.dark[300]}
      />

      <StyledText className='self-start mt-2 mb-2 text-lg font-semibold'>Ketch Location:</StyledText>

      <TextInput
        style={{
          height: 50,
          width: "100%",
          // margin: 12,
          borderWidth: 2,
          paddingVertical: 12,
          paddingHorizontal: 15,
          // backgroundColor: colors.dark[50],
          borderRadius: 20,
          backgroundColor: colors.background,

        }}

        onChangeText={setLocation}

        value={location}
        placeholder="nashville, the moon, your mom's basement, etc"
        placeholderTextColor={colors.dark[300]}
      />

      <StyledView className='self-start items-start mt-3 flex-row'>
        <StyledText className='self-start mt-5 mb-2 text-lg font-semibold'>Deadline:   </StyledText>
        <StyledText className='self-start mt-5 mb-2 text-lg font-md'>{date.toDateString()}</StyledText>
        {/* <Text>{date.toLocaleString()}</Text> */}
        <StyledTouchable className='rounded-3xl bg-accent-std border-2 p-2 self-center ml-16' onPress={() => setOpen(true)} >
          <MaterialIcons name="date-range" size={24} color="black" />
        </StyledTouchable>

      </StyledView>

      {open && (
        <DateTimePicker
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      {/* <StyledText className='self-start mt-2 mb-2 text-lg font-semibold'>Ketch Location:</StyledText>

      <TextInput
        style={{
          height: 50,
          width: "100%",
          // margin: 12,
          borderWidth: 2,
          paddingVertical: 12,
          paddingHorizontal: 15,
          backgroundColor: colors.dark[50],
          borderRadius: 20,
          color: colors.dark[300],

        }}

        onChangeText={setLocation}

        value={location}
        placeholder="nashville, the moon, your mom's basement, etc"
        placeholderTextColor={colors.dark[300]}
      /> */}

      <StyledTouchable className='mt-5 py-2 px-6 border-2 bg-accent-std rounded-2xl' onPress={() => { createKetch() }}>
        <StyledText className='text-xl font-semibold '>create</StyledText>

      </StyledTouchable>

    </View>
  )
}

export default CreateKetchScreen