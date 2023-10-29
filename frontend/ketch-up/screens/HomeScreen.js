import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { React, useState, useEffect } from 'react'
import { Image } from 'expo-image';
import { styled } from "nativewind";
import colors from "../styles";

import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth';
import { API_LINK } from '../env';

import AndroidStyles from '../AndroidStyles'

const pfp = require('../assets/pfp_test.jpg')


const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);


const HomeScreen = () => {
  const { user, handleLogout } = useAuth();
  const [name, setName] = useState("");
  const [streak, setStreak] = useState(0)
  const [ongoing, setOngoing] = useState(0)
  const [icon, setIcon] = useState("")
  const [photos, setPhotos] = useState([])
  const [ketchList, setKetchList] = useState([])
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    fetch(API_LINK + '/user/' + user).then((response) => response.json())
      .then((data) => {
        setName(data.messsage.name)
        setStreak(data.messsage.streak)
        setIcon(data.messsage.icon)
        setKetchList(data.messsage.ketches)
      })
  }, [user])

  return (
    <StyledSafeAreaView className="flex-1 bg-background" style={{ ...AndroidStyles.droidSafeArea, height: "80%" }}>
      <StatusBar backgroundColor={colors.dark[50]} />

      <View style={{ width: "100%" }}>

        <View style={{
          height: 200,
          width: "120%",
          // borderRadiuas: 999,
          borderBottomEndRadius: 180,
          borderBottomStartRadius: 180,
          marginTop: -60,
          overflow: "hidden",
          alignSelf: "center",
          // position: "absolute",
          backgroundColor: colors.ketchup.light
        }} />



        <StyledView className='flex-1 items-center'>
          <Image source={icon}
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
          <TouchableOpacity style={{
            position: "absolute",
            right: 15,
            top: -30,
            // borderWidth: 1,
            // borderColor: colors.light,
            padding: 15,
            borderRadius: 999,
          }}
            onPress={handleLogout}>
            <Feather name="log-out" size={24} color="black" style={{ zIndex: 1 }} />
          </TouchableOpacity>


        </StyledView>

        <View style={{ marginVertical: 80, }}>
          <Text style={{
            fontSize: 20,
            color: colors.dark[300],
            // marginVertical: 80,
            alignSelf: 'center',
            fontWeight: '600',

          }}>
            {name}
          </Text>
          <StyledView className='flex-row w-100 h-16 mt-2 items-center justify-around'>
            <StyledView className='items-center'>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>{ketchList.length}</Text>
              <Text style={{ fontSize: 16 }}>Ketches</Text>
            </StyledView>
            <StyledView className='items-center '>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>{streak}</Text>
              <Text style={{ fontSize: 16 }}>Streak</Text>
            </StyledView>
            <StyledView className='items-center '>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>{ketchList.length - ketchList.filter(elem => elem.status === "COMPLETED").length}</Text>
              <Text style={{ fontSize: 16 }}>Ongoing</Text>
            </StyledView>
          </StyledView>
        </View>

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginVertical: -40,
        }}>
          <View style= {{
            width: "100%",
          }}>
            <FlatList
              data={ketchList.concat(ketchList).concat(ketchList).filter(item => item.status == "COMPLETED")}
              keyExtractor={item => item._id}
              contentContainerStyle={{ columnGap: 10 }}
              numColumns={3}
              style={{
                flexGrow: 0,
                overflow: "scroll",
                height: "60%",
                width: "100%",
              }}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <Image source={item.photo} style={{
                    width: width*2/7,
                    height: width*2/7,
                    margin: 6
                  }} />
                </TouchableOpacity>
              )}>
            </FlatList>
          </View>
        </View>
      </View>




    </StyledSafeAreaView>
  )
}

export default HomeScreen