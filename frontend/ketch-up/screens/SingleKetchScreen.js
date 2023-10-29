import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import {Image} from 'expo-image'
import React, { useEffect, useState } from 'react'
import { styled } from 'nativewind'
import colors from "../styles"

import { AntDesign } from '@expo/vector-icons';

import AndroidStyles from '../AndroidStyles';
import { API_LINK } from '../env'
const StyledSafeAreaView = styled(SafeAreaView)
const StyledView = styled(View);
const StyledText = styled(Text);

const pfp = require("../assets/pfp_test.jpeg")

const defaultKetch = {
    name : "Ketch Name",
    status: "IN PROGRESS",
    deadline: "'05 October 2011 14:48 UTC'",
    photo:"",
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
    const {ketchId} = route.params
    const [curKetch, setKetch] = useState(defaultKetch)
    useEffect(()=>{
        console.log(API_LINK + '/ketch/' + ketchId)
        fetch(API_LINK + '/ketch/' + ketchId).then((response) => response.json())
        .then((ketchObject) => setKetch(ketchObject))
    
    }, [ketchId])
    return (
        <StyledSafeAreaView className='flex-1 justify-end bg-ketchup-light' style={{...AndroidStyles.droidSafeArea}}>
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
                        <StyledText className='mt-1 text-lg font-md text-grey'>Status: 
                            {
                                curKetch.status == "SCHEDULED" &&
                                <StyledText className="text-ketchup-dark">{" " + curKetch.status}</StyledText>
                            }
                            {
                                curKetch.status == "PLANNED" &&
                                <StyledText className="text-yellow-500">{" " + curKetch.status}</StyledText>
                            }
                            {
                                curKetch.status == "COMPLETED" &&
                                <StyledText className="text-green-600">{" " + curKetch.status}</StyledText>  
                            }
                            {
                                curKetch.status == "CANCELED" &&
                                <StyledText className="text-red-600">{" " + curKetch.status}</StyledText>
                            }
                        </StyledText>
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
                                    height: "60%",

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

                <TouchableOpacity onPress={() => navigation.navigate("Swipe")}>
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
                        <StyledText className='text-xl font-semibold tracking-wider'>pick activity</StyledText>
                    </View>
                </TouchableOpacity>



            </StyledView>


        </StyledSafeAreaView >
    )
}

export default SingleKetchScreen