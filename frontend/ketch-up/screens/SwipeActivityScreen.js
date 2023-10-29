import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Image} from 'expo-image'
import {React, useRef} from 'react'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Swiper from "react-native-deck-swiper"
import {styled} from "nativewind"
import colors from "../styles";
import * as string_decoder from "string_decoder";
import {Entypo, AntDesign} from "@expo/vector-icons";


const DUMMY_DATA = [
   {
       name: 'Touch Grass',
       pic: 'https://media.istockphoto.com/id/1349781282/photo/human-palm-touching-lawn-grass-low-angle-view.jpg?s=612x612&w=0&k=20&c=SPV9QmWhfdk1D1QXNPzZaYbHnaO5CEZpUmRDoEJjTpw=',
       address: 'Alumni Lawn',
       id: 1
   },
   {
       name: 'Get Boba',
       pic: 'https://images.pexels.com/photos/6412837/pexels-photo-6412837.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
       address: 'Sweet Dots',
       id: 2
   },
   {
       name: 'Touch Grassier Grass',
       pic: 'https://i.pinimg.com/originals/b6/e5/eb/b6e5ebb4d04abc63772d43d4e827c120.png',
       address: 'Centennial Park',
       id: 3
   },
   {
       name: 'Get Dumpy Dumplings',
       pic: 'https://st2.depositphotos.com/2252541/6847/i/450/depositphotos_68475787-stock-photo-dim-sum.jpg',
       address: 'Dumpling House',
       id: 4
   }
]


const SwipeActivityScreen = () => {
   const swipeRef = useRef(null)
   return (
       <SafeAreaView className="flex-1">
           <View className="flex-1 -mt-6">
               <Swiper
                   ref={swipeRef}
                   containerStyle={{backgroundColor: "transparent"}}
                   cards={DUMMY_DATA}
                   stackSize={DUMMY_DATA.length}
                   cardIndex={0}
                   animateCardOpacity
                   verticalSwipe={false}
                   onSwipedLeft={() => {
                       console.log('Swipe PASS')
                   }}
                   onSwipedRight={() => {
                       console.log('Swipe MATCH')
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
                   renderCard={(card) => (
                       <View key={card.id} className="relative bg-accent-std h-3/4 rounded-xl">
                           <Image
                               source={{uri: card.pic}}
                               className="absolute top-0 h-full w-full rounded-xl"
                           />
                           <View
                               className="absolute bottom-0 bg-orange-100 w-full flex-row justify-start items-center h-40 px-6 py-2 rounded-b"
                               style={styles.cardShadow}>
                               <View>
                                   <Text className="text-2xl font-bold mt-3 mb-3">{card.name}</Text>
                                   <Text className="text-xl">{card.address}</Text>
                               </View>
                           </View>
                       </View>)
                   }
               />
           </View>
           <View className="flex flex-row justify-evenly">
               <TouchableOpacity
                   onPress={() => swipeRef.current.swipeLeft()}
                   className="items-center justify-center rounded-full w-16 h-16 bg-red-200">
                   <Entypo name={"cross"} size={24} color="#8C1926"/>
               </TouchableOpacity>


               <TouchableOpacity
                   onPress={() => swipeRef.current.swipeRight()}
                   className="items-center justify-center rounded-full w-16 h-16 bg-green-200">
                   <AntDesign name={"heart"} size={24} color="green"/>
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
