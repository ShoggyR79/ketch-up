import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { styled } from 'nativewind'
import colors from "../styles"

import { AntDesign } from '@expo/vector-icons';

import AndroidStyles from '../AndroidStyles';
import * as ImagePicker from 'expo-image-picker';

import { API_LINK } from '../env'
const StyledSafeAreaView = styled(SafeAreaView)
const StyledView = styled(View);
const StyledText = styled(Text);

const pfp = require("../assets/pfp_test.jpeg")

const defaultKetch = {
    name: "Ketch Name",
    status: "IN PROGRESS",
    deadline: "'05 October 2011 14:48 UTC'",
    photo: "",
    creator: "",
    joincode: "",
    preference: {},
    swiped: [],
    users: [],
    activity: {
        name: "",
        pic: "",
        address: ""
    }
}

const SingleKetchScreen = ({ route, navigation }) => {
    const { ketchId } = route.params
    const [curKetch, setKetch] = useState(defaultKetch)
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // ImagePicker saves the taken photo to disk and returns a local URI to it
            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            // Upload the image using the fetch and FormData APIs
            let formData = new FormData();
            // Assume "photo" is the name of the form field the server expects
            formData.append('photo', { uri: localUri, name: filename, type });

            const response = await fetch(API_LINK + "/ketch/complete", {
                method: 'POST',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });

            if (response.status === 204) {
                navigation.navigate("Ketch", { id: ketchId })
            }
        }
    };
    useEffect(() => {
        fetch(API_LINK + '/ketch/' + ketchId).then((response) => response.json())
            .then((data) => { setKetch(data.message); })
    }, [ketchId])
    return (
        <StyledSafeAreaView className='flex-1 justify-end bg-ketchup-light' style={{ ...AndroidStyles.droidSafeArea }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{
                position: "absolute",
                top: 60,
                left: 20,
            }}>
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <StyledView className='w-full h-5/6 bg-background b-0 self-end rounded-t-3xl'>
                <StyledView className='flex-1 items-center'>
                    <Image source={curKetch.photo}
                        contentFit='contain'
                        style={{
                            height: 155,
                            width: 155,
                            borderRadius: 999,
                            borderColor: colors.dark[300],
                            borderWidth: 3,
                            marginTop: -90,
                            // zIndex: 1,
                            // position: "absolute",
                        }}>
                    </Image>

                    <StyledView className='mt-4 items-center'>
                        <StyledText className='font-bold text-xl'>{curKetch.name}</StyledText>
                        {/* <View style={{
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            borderRadius: 10,
                            borderWidth: 1,
                            marginTop: 5,
                            alignItems: 'center',
                            justifyContent: "center",
                            backgroundColor: 
                        }}> */}
                        {/* <StyledView className='flex-row mt-2 justify-center items-center'> */}
                        {/* <StyledView className='border-2 p-2 border-dark-200 rounded-xl mx-1'> */}
                        <StyledView className='border-2 px-3 py-2 my-2 bg-accent-light border-dark-200 rounded-xl mx-1'>
                            <StyledText className='mt-1 text-2xl font-semibold text-dark-300 '>Code: KBHDSF</StyledText>
                        </StyledView>
                        <StyledText className=' text-md font-semibold text-ketchup-dark'>in-planning ketch</StyledText>
                        {/* </StyledView> */}


                        {/* </StyledView> */}

                        {/* </View> */}

                    </StyledView>

                    <StyledView className="w-full mt-3 self-start  justify-self-start px-5">
                        <View>
                            <StyledText className='font-semibold text-lg'>Deadline</StyledText>
                            <View>
                                <StyledText className="mt-2 text-lg">{(new Date(curKetch.deadline)).toDateString()}</StyledText>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <StyledText className='font-semibold text-lg'>Activity</StyledText>
                            <View>
                                <StyledText className="mt-2 text-lg">{curKetch.activity.name}</StyledText>
                            </View>
                        </View>
                        <View style={{ width: "100%", marginTop: 15 }}>
                            <StyledText className='font-semibold text-lg'>Participants - ({curKetch.users.length})</StyledText>
                            <FlatList
                                data={curKetch.users}
                                keyExtractor={item => item._id}
                                contentContainerStyle={{ columnGap: 10 }}
                                // horizontal
                                style={{
                                    flexGrow: 0,
                                    overflow: "scroll",
                                    // height: "80%",
                                    height: "55%",

                                }}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            marginTop: 10,
                                            paddingVertical: 10,
                                            paddingHorizontal: 10,
                                            borderRadius: 10,
                                            borderColor: colors.dark[200],
                                            borderWidth: 2,
                                            height: 80,
                                            width: "100%",
                                            // width: "fit-content",
                                            // height: "fit-content",

                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "between",

                                        }}>
                                        <Image contentFit="contain" style={{ width: 50, height: 50, marginRight: 10, borderRadius: 999 }} source={item.icon} />
                                        <Text
                                            style={{
                                                color: colors.dark[300],
                                                fontWeight: "600",
                                                fontSize: 18,
                                            }}>{item.name}
                                        </Text>

                                    </View>

                                )}>

                            </FlatList>

                        </View>



                    </StyledView>



                </StyledView>

                <TouchableOpacity onPress={() => navigation.navigate("Swipe", { ketchId })}>
                    <View style={{
                        marginTop: 30,
                        height: 60,
                        backgroundColor: colors.accent.std,
                        width: "90%",
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: colors.dark[300],
                    }}>
                        <StyledText className='text-xl font-semibold tracking-wider'>Pick Activity</StyledText>
                    </View>
                </TouchableOpacity>
                {
                    curKetch.status === "SCHEDULED" &&
                    <TouchableOpacity onPress={pickImage}>
                        <View style={{
                            marginTop: 30,
                            height: 60,
                            backgroundColor: colors.accent.std,
                            width: "90%",
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 20,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: colors.dark[300],
                        }}>
                            <StyledText className='text-xl font-semibold tracking-wider'>Upload Image</StyledText>
                        </View>
                    </TouchableOpacity>
                }


            </StyledView>


        </StyledSafeAreaView >
    )
}

export default SingleKetchScreen