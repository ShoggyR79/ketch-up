import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { styled } from 'nativewind';
import colors from "../styles";
import KetchCard from './components/KetchCard';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';


const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);
const StyledView = styled(View);

const ketchType = ["scheduled", "planning", "completed", "canceled"]
const data = [];


const KetchesScreen = () => {
  const [activeKetchType, setActiveKetchType] = useState("scheduled");
  const [isEmpty, setIsEmpty] = useState(false);
  return (
    <StyledSafeAreaView className='flex-1 bg-background'>
      <StyledView className='p-5'>
        <StyledView>
          <StyledText className='font-semibold text-xl'>manage my ketches</StyledText>

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

          <StyledView className='flex mt-6 w-100 items-center '>
            {isEmpty ? (
              <Text>nothing to see here!</Text>
            ) : (
              // data?.map((ketch) => {
              //   <KetchCard
              //     item = {ketch}

              //   />
              // })
              <TouchableOpacity
                style={{
                  width: "100%",
                  borderColor: colors.dark[100],
                  borderWidth: 2,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 20,
                  flexDirection: 'row',

                }}>
                <Image source={require("../assets/pfp_test.jpeg")}
                  style={{
                    resizeMode: "contain",
                    height: 80,
                    width: 80,
                    borderRadius: 999,
                  }} />
                <StyledView className='ml-5'>
                  <StyledText className='text-lg font-medium'>Ketch Name</StyledText>
                  <StyledText>Nov 1, 2023</StyledText>
                  <StyledText>with Jerry, Sharkie</StyledText>

                </StyledView>

                <Entypo name="dots-three-vertical" size={30} color={colors.dark[200]}></Entypo>



              </TouchableOpacity>

            )}
          </StyledView>

        </StyledView>

      </StyledView>

      <View>

      </View>
    </StyledSafeAreaView>
  )
}

export default KetchesScreen