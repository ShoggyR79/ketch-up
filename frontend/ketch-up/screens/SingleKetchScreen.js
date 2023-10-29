import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { styled } from 'nativewind'
import colors from "../styles"

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AndroidStyles from '../AndroidStyles';
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

    const [swiped, setSwiped] = useState(true);

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
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <StyledText className="mt-2 text-lg">{curKetch.activity.name}</StyledText>
                                <TouchableOpacity style=
                                    {{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        paddingVertical: 5,
                                        paddingHorizontal: 8,

                                    }}>
                                    <StyledText className='mr-2'>Finalize</StyledText>
                                    <Feather name="skip-forward" size={24} color="black" />
                                </TouchableOpacity>
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
                                            backgroundColor: swiped ? colors.accent.light : colors.ketchup.lighter,

                                        }}>
                                        <Image contentFit="contain" style={{ width: 50, height: 50, marginRight: 10, borderRadius: 999, borderWidth: 2, borderColor: colors.dark[200] }} source={item.icon} />
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

                <StyledView className='flex-row mx-6 mt-10 justify-between items-center'>



                    <TouchableOpacity style={{
                        // marginTop: 30,
                        height: 60,
                        backgroundColor: colors.accent.std,
                        width: "80%",
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 16,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: colors.dark[300],
                    }} onPress={() => navigation.navigate("Swipe", { ketchId })}>

                        <StyledText className='text-xl font-semibold tracking-wider'>pick activity</StyledText>
                        {/* </View> */}
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        // marginTop: 30,
                        height: 60,
                        backgroundColor: colors.dark[100],
                        width: 60,
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 16,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: colors.dark[300],

                    }}>
                        <MaterialIcons name="delete" size={24} color="black" />
                    </TouchableOpacity>

                </StyledView>



            </StyledView>


        </StyledSafeAreaView >
    )
}

export default SingleKetchScreen