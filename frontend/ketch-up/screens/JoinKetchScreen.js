import { View, Text, Button, TextInput } from 'react-native'
import React from 'react'
import { styled } from "nativewind";

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
            justifyContent: 'center',
            top: 200,
            backgroundColor: "black",
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,

        }}>
            <Text style={{ color: "red" }}>{error}</Text>
            <TextInput
                style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
                onChangeText={setJoinCode}
                value={joinCode}
                placeholder="useless placeholder"
            />
            <Button
                title="JOIN"
                onPress={() => { joinKetch() }}
            />
            <Button
                title="Go back" r
                onPress={() => { navigation.goBack() }}
            />
        </View>
    )
}

export default JoinKetchScreen