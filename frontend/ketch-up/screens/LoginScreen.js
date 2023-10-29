import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native'
import React, {useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import {styled} from "nativewind"

const LoginScreen = ({navigation}) => {
    const {handleLogin} = useAuth();
    const [error, setError] = useState("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (email, password) => {
        const response = await handleLogin(email, password)
        if (response.status === 'error') {
            setError(response.message)
        }
    }
    return (
        <View className="flex-1 bg-ketchup-light">
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
                           style={{width: 200, height: 200, alignSelf: "center", justifyContent: "center"}}/>
                </View>
            </SafeAreaView>
            <View className="flex-1 bg-[#FBEEE8] px-8 pt-8"
                  style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <View className="form space-y-2">
                    <Text style={{color: "red"}}>{error}</Text>
                    <Text className="text-gray-700 ml-4">Email</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"/>
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"/>
                    <TouchableOpacity
                        onPress={async () => await login(email, password)}
                        className="py-3 bg-accent-std rounded-xl">
                        <Text className="font-xl font-bold text-center text-gray-700">
                            Login
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center mt-7">
                        <Text className="text-gray-500 font font-semibold">Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text className="font-semibold text-ketchup-light"> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen