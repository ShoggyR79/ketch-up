import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import colors from "../styles"

import { AntDesign } from '@expo/vector-icons';


const StyledSafeAreaView = styled(SafeAreaView)
const StyledView = styled(View);
const StyledText = styled(Text);

const pfp = require("../assets/pfp_test.jpeg")

const ketchParticipants = [{ name: "bubu", image: pfp }, { name: "jerry", image: pfp }, { name: "sharkie", image: pfp }]

const SingleKetchScreen = ({ navigation }) => {
    return (
        <StyledSafeAreaView className='flex-1 justify-end bg-ketchup-light'>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{
                position: "absolute",
                top: 60,
                left: 20,
            }}>
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <StyledView className='w-full h-4/5 bg-background b-0 self-end rounded-t-3xl'>
                <StyledView className='flex-1 items-center'>
                    <Image source={pfp}
                        resizeMode='contain'
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
                        <StyledText className='font-bold text-xl'>Hangout Name</StyledText>
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
                        <StyledText className='mt-1 text-lg font-md text-ketchup-dark'>in-planning ketch</StyledText>
                        {/* </View> */}

                    </StyledView>

                    <StyledView className="w-full mt-3 self-start  justify-self-start px-5">
                        <View>
                            <StyledText className='font-semibold text-lg'>Deadline</StyledText>
                            <View>
                                <StyledText className="mt-2 text-lg">November 1, 2023</StyledText>
                            </View>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <StyledText className='font-semibold text-lg'>Activity</StyledText>
                            <View>
                                <StyledText className="mt-2 text-lg">undecided</StyledText>
                            </View>
                        </View>
                        <View style={{ width: "100%", marginTop: 15 }}>
                            <StyledText className='font-semibold text-lg'>Participants</StyledText>
                            <FlatList
                                data={ketchParticipants}
                                keyExtractor={item => item.name}
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
                                            height: 60,
                                            width: "100%",
                                            // width: "fit-content",
                                            // height: "fit-content",

                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "between",

                                        }}>
                                        <Image resizeMode="contain" style={{ width: 40, height: 40, marginRight: 10, borderRadius: 999 }} source={item.image} />
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