import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Tabbar from './Tab';
import useAuth from '../hooks/useAuth';
import CreateKetchScreen from '../screens/CreateKetchScreen';
import JoinKetchScreen from '../screens/JoinKetchScreen';
import ModalKetch from '../screens/ModalKetch';
import SingleKetchScreen from '../screens/SingleKetchScreen';
import SwipeActivityScreen from '../screens/SwipeActivityScreen';
import KetchesScreen from '../screens/KetchesScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    // user = ""; // placeholder
    const { user } = useAuth();
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {user ? (
                    <>
                        <Stack.Group>
                            <Stack.Screen name="Tab" component={Tabbar} />
                            <Stack.Screen name="Join" component={JoinKetchScreen} />
                            <Stack.Screen name="Create" component={CreateKetchScreen} />
                            <Stack.Screen name="Ketch" component={SingleKetchScreen} />
                            <Stack.Screen name="Swipe" component={SwipeActivityScreen} />
                            <Stack.Screen name="Ketches" component={KetchesScreen} />


                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: "containedTransparentModal" }}>
                            <Stack.Screen name="Modal" component={ModalKetch} />
                        </Stack.Group>
                    </>
                ) :
                    <>
                        <Stack.Group>
                            <Stack.Screen name="Login" component={LoginScreen} />
                            <Stack.Screen name="Register" component={RegisterScreen} />
                        </Stack.Group>
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator