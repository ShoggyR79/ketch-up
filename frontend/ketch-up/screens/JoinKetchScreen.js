import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from "nativewind";
import colors from "../styles"

import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledView = styled(View);

const { API_LINK } = require('../env.js')
const JoinKetchScreen = ({ navigation }) => {
    const [joinCode, setJoinCode] = React.useState("");
    const [error, setError] = React.useState("");
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
            body: JSON.stringify({ joinCode })
        })
        const data = await response.json()
        if (response.status === 201) {
            // success
            navigation.navigate("Ketch", { id: data })
        } else {
            // handle error
            setError(data)
        }
    }
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'start',
            top: 250,
            backgroundColor: colors.ketchup.lighter,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,

        }}>
            <StyledTouchable className='mt-5 ml-8 self-start' onPress={() => { navigation.goBack() }}>
                <FontAwesome5 name="chevron-down" size={24} color="black" />
            </StyledTouchable>
            <Text style={{ color: "gray", marginTop: 50 }}>{error}</Text>
            <StyledText className='text-2xl font-semibold tracking-wider mb-5'>type code</StyledText>

            <StyledView className='flex-row items-center'>
                <TextInput
                    style={{
                        height: 40,
                        width: 150,
                        margin: 12,
                        borderWidth: 2,
                        padding: 10,
                        backgroundColor: colors.dark[100],
                        borderRadius: 20,
                        padding: 20,
                        color: colors.dark[300],

                    }}
                    onChangeText={setJoinCode}
                    value={joinCode}
                    placeholder="code"
                    placeholderTextColor={colors.dark[300]}
                />
                <StyledTouchable className='rounded-3xl bg-light-100 p-2' onPress={() => { joinKetch() }}>
                    {/* <StyledText>Join</StyledText> */}
                    <AntDesign name="enter" size={24} color="black" />
                </StyledTouchable>

            </StyledView>
            {/* title="JOIN"
            onPress={() => { joinKetch() }} */}

            {/* <Button
                title="Go back" r
                onPress={() => { navigation.goBack() }}
            /> */}
        </View>
    )
}

export default JoinKetchScreen