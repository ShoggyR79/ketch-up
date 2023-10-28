import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import useAuth from '../hooks/useAuth'
// import 

const LoginScreen = () => {
    const navigation = useNavigation();
    return (
        <View classname="flex-1 bg-white" style={{ backgroundColor: '#BC4749' }}>
            <SafeAreView classname="flex">
                <View classname="flex-row justify-start">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        classname='bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4'
                    >
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View classname="flex-row justify-center">
              // Put smth here
                    <Image source={require('../assets/icon.png')} style={{ width: 200, height: 200 }} />
                </View>
            </SafeAreView>
        </View>
    )
}

export default LoginScreen