import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { React, useRef, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from "react-native-deck-swiper"
import { styled } from "nativewind"
import colors from "../styles";
import * as string_decoder from "string_decoder";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { API_LINK } from '../env'
import useAuth from '../hooks/useAuth';



const DUMMY_DATA = []

const StyledSafeArea = styled(SafeAreaView)


const SwipeActivityScreen = ({ route, navigation }) => {
    const { ketchId } = route.params
    const { user } = useAuth()
    const swipeRef = useRef(null)
    const [activities, setActivities] = useState([])
    const [stackSize, setStackSize] = useState(2)
    const [stackIndex, setStackIndex] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        fetch(API_LINK + '/ketch/' + ketchId).then((response) => response.json())
            .then((data) => {
                let temp = []
                for (const id in data.message.preference) {
                    const obj = data.message.preference[id]
                    if (obj && !obj.votes.find((vote) => vote == user) && !obj.voteNo.find((vote) => vote == user)) {
                        const activity = {
                            id,
                            ...obj
                        }
                        temp.push(activity)
                    }
                }
                setStackSize(temp.length)
                setStackIndex(0);
                setActivities(temp)
            })
            .catch((error) => console.error(error))
    }, [ketchId])

    return (
        <SafeAreaView className="flex-1">
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                className="mt-6 mr-4 self-end items-center justify-center rounded-full w-20 h-20 bg-ketchup-light border-dark-300 border-2">
                <Entypo name={"cross"} size={40} color="black" />
            </TouchableOpacity>
            <View className="flex-1 -mt-6">
                {activities.length > 0 &&
                currentIndex < activities.length &&
                    <Swiper
                        containerStyle={{ backgroundColor: "transparent" }}
                        cards={activities}
                        stackSize={stackSize}
                        cardIndex={stackIndex}
                        animateCardOpacity
                        verticalSwipe={false}
                        onSwipedLeft={async (cardIndex) => {
                            console.log('Swipe PASS')
                            setCurrentIndex(currentIndex + 1)
                            const card = activities[cardIndex]
                            const response = await fetch(API_LINK + "/ketch/swipe", {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    hangoutId: card.id,
                                    userId: user,
                                    dir: "left"
                                })
                            })
                        }}
                        onSwipedRight={async (cardIndex) => {
                            console.log('Swipe MATCH')
                            setCurrentIndex(currentIndex + 1)
                            const card = activities[cardIndex]
                            const response = await fetch(API_LINK + "/ketch/swipe", {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    hangoutId: card.id,
                                    userId: user,
                                    dir: "right",
                                    ketchId
                                })
                            })
                            // const data = await response.json()
                            // if(data.status == 400){

                            // }
                        }}
                        overlayLabels={{
                            left: {
                                title: "NAHH",
                                style: {
                                    label: {
                                        textAlign: "right",
                                        color: "red",
                                    },
                                },
                            },
                            right: {
                                title: "YESSS",
                                style: {
                                    label: {
                                        color: "#4DED30"
                                    }
                                }
                            }
                        }}
                        renderCard={(card) => {
                            return (
                                <View key={card.id} className="relative bg-accent-std h-3/4 rounded-xl">
                                    <Image
                                        source={{ uri: card.pic }}
                                        className="absolute top-0 h-full w-full rounded-xl"
                                    />
                                    <View
                                        className="absolute bottom-0 bg-orange-100 w-full flex-row justify-start items-center h-40 px-6 py-2 rounded-b"
                                        style={styles.cardShadow}>
                                        <View>
                                            <Text className="text-2xl font-bold mt-3 mb-3">{card.name}</Text>
                                            <Text numberOfLines={2} ellipsizeMode='tail' className="text-xl">{card.address}</Text>
                                        </View>
                                    </View>
                                </View>)
                        }
                        }
                    />
                }
                {
                    activities.length > 0 &&
                    currentIndex >= activities.length &&
                    <View className="flex-1">
                        <Text className="justify-center items-center self-center mt-80 flex-1 font-bold txt-2xl text-ketchup-light">No more options left T.T</Text>
                    </View>
                }

            </View>
            {/* <View className="flex flex-row justify-evenly">
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    className="items-center justify-center rounded-full w-16 h-16 bg-red-200">
                    <Entypo name={"cross"} size={24} color="#8C1926" />
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    className="items-center justify-center rounded-full w-16 h-16 bg-green-200">
                    <AntDesign name={"heart"} size={24} color="green" />
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}


export default SwipeActivityScreen


const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.5
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,


        elevation: 2
    }
})
