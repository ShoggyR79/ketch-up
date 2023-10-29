import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from "nativewind";
import colors from "../styles"

import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth';


const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledView = styled(View);

const { API_LINK } = require('../env.js')
const JoinKetchScreen = ({ navigation }) => {
    const [joinCode, setJoinCode] = React.useState("");
    const [error, setError] = React.useState("");
    const { user } = useAuth()
    const joinKetch = async () => {
        // need to be 6 alphanumeric characters
        if (joinCode.length !== 6) {
            setError("Join code must be 6 characters long")
        }
        const response = await fetch(API_LINK + '/ketch/join', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ joinCode, userId: user })
        })
        const data = await response.json()

        console.log(data);

        if (response.status === 201) {
            // success
            navigation.goBack()
        } else if (response.status === 400) {
            // handle error
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

        }}>
            <StyledTouchable className='mt-5 ml-8 self-start' onPress={() => { navigation.goBack() }}>
                <FontAwesome5 name="chevron-down" size={24} color="black" />
            </StyledTouchable>
            <StyledText className='my-8 text-lg font-semibold'>{error}</StyledText>
            <StyledText className='text-2xl font-semibold tracking-wider mb-5'>type code</StyledText>

            <StyledView className='flex-row items-center'>
                <TextInput
                    style={{
                        height: 60,
                        width: 220,
                        margin: 12,
                        borderWidth: 2,
                        padding: 20,
                        backgroundColor: colors.background,
                        borderRadius: 20,
                        color: colors.dark[500],

                    }}
                    onChangeText={setJoinCode}
                    value={joinCode}
                    placeholder="code"
                    placeholderTextColor={colors.dark[300]}
                />
                <StyledTouchable className='rounded-3xl border-2 border-dark-300 bg-accent-dark p-3' onPress={() => { joinKetch() }}>
                    {/* <StyledText>Join</StyledText> */}
                    <AntDesign name="enter" size={32} color="white" />
                </StyledTouchable>

            </StyledView>

        </View>
    )
}

export default JoinKetchScreen