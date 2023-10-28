import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Tabbar from './Tab';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    user = "sfe"; // placeholder
    // const {user} = useAuth();
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {user ? (
                    <>
                        <Stack.Screen name="Tab" component={Tabbar} />
                    </>
                ) :
                    <>
                        <Stack.Screen name="Login" children={LoginScreen} />
                        <Stack.Screen name="Register" children={RegisterScreen} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator