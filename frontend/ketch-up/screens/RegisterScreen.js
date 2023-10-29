import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import { styled } from "nativewind"

const { API_LINK } = require('../env.js')

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { handleLogin } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Password do not match. Please try again.');
      return;
    }
    // call register api
    // if sucessful -> handleLogin(email, password)
    const response = await fetch(API_LINK + '/user/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    if (response.status === 201) {
      handleLogin(email, password)
    }
  }

  return (
    <View className="flex-1 bg-ketchup-light">
      <Text style={{ color: "red" }}>{errorMessage}</Text>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4'
          >
            {/* <ArrowLeftIcon size="20" color="black" /> */}
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require('../assets/icons/icon3.png')}
            style={{ width: 200, height: 200, alignSelf: "center", justifyContent: "center" }} />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-[#FBEEE8] px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter name" />
          <Text className="text-gray-700 ml-4">Email</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter email" />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password" />
          <Text className="text-gray-700 ml-4">Confirm Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text)
            }}
            placeholder="Confirm Password" />
          {errorMessage !== '' && <Text style={{ color: 'red', marginBottom: 10 }}>
            {errorMessage}
          </Text>}
          <TouchableOpacity
            onPress={handleSignUp}
            className="py-3 bg-accent-std rounded-xl">
            <Text className="font-xl font-bold text-center text-gray-700">
              Register
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="font-semibold text-ketchup-light"> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default RegisterScreen