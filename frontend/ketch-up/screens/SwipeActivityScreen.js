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


const DUMMY_DATA =
    [
        {
            "address": "7A Thu Khoa Huan, Ward, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh 70010, Vietnam",
            "id": "k6vn2xkf2g",
            "name": "awefwaefaw estaurant & Bar",
            "pic": "https://maps.googleapis.com/maps/api/place/photo?photoreference=AcJnMuG6q3z0kG0wL0rD9qCL98AK4MZZwlbnmGFVIl4jEUKAE-DkhoCLleKnJrAZ7C3ZsagrLdwj_PSoS00hiqWj9VIZk7rbcvPMaNfnUkbPpiPpw03o-dfnSYZctQmfTVruHnyk3oxQl5ezb3J0jYiXYclTFw8Sd93Kuh9W&sensor=false&maxheight=1365&maxwidth=2048&key=AIzaSyBAWSSsDlRFHA5iEawa6CuGFY357LxKbfE",
            "votes": [
            ]
        },
        {
            "address": "158 Pasteur, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000, Vietnam",
            "id": "1pkqoieuo",
            "name": "awefwefn Restaurant",
            "pic": "https://maps.googleapis.com/maps/api/place/photo?photoreference=AcJnMuGYtk0SF3pkL4r1x_s--mywTXosnz2cBqCe3LvxMJwBRYs4gVolqmyqxdBW7Flqr9r3NASSjL2PL4fmAg3z6cBWlhHLczTB_ELy9Txi43pWcPRxZD8yXBD4rkTq6_Emg19p53A71OcQ1LxewHPfA-sP5fE2UGrL8Nb5&sensor=false&maxheight=3024&maxwidth=4032&key=AIzaSyBAWSSsDlRFHA5iEawa6CuGFY357LxKbfE",
            "votes": [
            ]
        }
    ]


const SwipeActivityScreen = ({ route, navigation }) => {
    const { ketchId } = route.params
    const { user } = useAuth()
    const swipeRef = useRef(null)
    const [activities, setActivities] = useState([])
    const [stackSize, setStackSize] = useState(2)
    const [stackIndex, setStackIndex] = useState(0)
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
                 stackIndex < activities.length &&
                    <Swiper
                        containerStyle={{ backgroundColor: "transparent" }}
                        cards={activities}
                        stackSize={stackSize}
                        cardIndex={stackIndex}
                        animateCardOpacity
                        verticalSwipe={false}
                        onSwipedLeft={async (cardIndex) => {
                            console.log('Swipe PASS')
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
                                            <Text className="text-xl" style={{ overflow: "scroll" }}>{card.address}</Text>
                                        </View>
                                    </View>
                                </View>)
                        }
                        }
                    />
                }

            </View>
            <View className="flex flex-row justify-evenly">
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
            </View>
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
