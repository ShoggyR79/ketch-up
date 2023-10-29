import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native'
import { styled } from 'nativewind';
import colors from "../styles";
import KetchCard from './components/KetchCard';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth';

import AndroidStyles from '../AndroidStyles';
const { API_LINK } = require('../env.js')

const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);
const StyledView = styled(View);

const ketchType = ["SCHEDULED", "PLANNED", "COMPLETED", "CANCELED"]
const data = [];


const KetchesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [activeKetchType, setActiveKetchType] = useState("SCHEDULED");
  const [isEmpty, setIsEmpty] = useState(false);
  const [ketchList, setKetchList] = useState([])

  useEffect(() => {
    fetch(API_LINK + '/user/' + user).then((response) => response.json())
      .then((data) => setKetchList(data.message.ketches))
  }, [user])
  return (
    <StyledSafeAreaView className='flex-1 bg-background' style={{ ...AndroidStyles.droidSafeArea, height: "80%" }}>
      <StyledView className='p-5'>
        <StyledView>
          <StyledText className='font-semibold text-2xl'>manage my ketches</StyledText>

          {/* filter */}
          <View>
            <FlatList
              data={ketchType}
              keyExtractor={item => item}
              contentContainerStyle={{ columnGap: 10 }}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setActiveKetchType(item);
                  }}
                  style={{
                    marginTop: 16,
                    paddingVertical: 5,
                    paddingHorizontal: 8,
                    borderRadius: 20,
                    borderColor: item === activeKetchType ? colors.ketchup.dark : colors.dark[200],
                    borderWidth: 2,


                  }}>
                  <Text
                    style={{
                      color: item === activeKetchType ? colors.ketchup.dark : colors.dark[200],
                      fontWeight: item === activeKetchType ? "600" : "400",
                      fontSize: 14,
                    }}>{item}</Text>
                </TouchableOpacity>
              )}>

            </FlatList>
          </View>
          {/*Display ketches by categories*/}

          <StyledView className='flex mt-6 w-100 items-center'>
            {isEmpty ? (
              <Text>nothing to see here!</Text>
            ) :
              <View style={{ height: '88%' }}>
                <FlatList
                  data={ketchList.filter(item => item.status === activeKetchType)}
                  keyExtractor={item => item._id}
                  style={{
                    overflow: "scroll",
                  }}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        width: "100%",
                        borderColor: colors.dark[200],
                        borderWidth: 3,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 20,
                        flexDirection: 'row',
                        marginBottom: 8,
                        justifyContent: "space-between"

                      }}>
                      <StyledView className='flex-row'>
                        <Image source={item.photo}
                          style={{
                            contentFit: "contain",
                            height: 80,
                            width: 80,
                            borderRadius: 999,
                          }} />
                        <StyledView className='ml-5 justify-around'>
                          <StyledText className='text-lg font-medium'>{item.name}</StyledText>
                          <StyledText>{item.deadline}</StyledText>
                          <StyledText className='text-dark-200'>with {
                            item.users.filter(elem => elem != user).map(u => u.name).join(",").length > 30 ?
                              item.users.filter(elem => elem != user).map(u => u.name).join(",").substr(0, 27) + "..." :
                              item.users.filter(elem => elem != user).map(u => u.name).join(",")
                          }</StyledText>

                        </StyledView>
                      </StyledView>

                      <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { navigation.navigate("Ketch", { ketchId: item._id }) }
                      }>
                        <Entypo name="dots-three-vertical" size={30} color={colors.dark[200]} />
                      </TouchableOpacity>

                    </View>
                  )}
                >
                </FlatList>
              </View>

            }
          </StyledView>

        </StyledView>

      </StyledView>

      <View>

      </View>
    </StyledSafeAreaView>
  )
}

export default KetchesScreen