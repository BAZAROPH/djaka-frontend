import { View, Text, Platform, ImageBackground } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';


import BackButton from '../common/buttons/backbutton/BackButton'


export default function Header({ backgroundImage, lightText, boldText }) {
    const router = useRouter();
  return (
    <View 
        style={{ height: "40%" }}
    >
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={[{ height: Platform.OS == 'ios' ? '100%' : '105%', justifyContent: 'flex-start' }, Platform.OS == 'ios' ? { paddingTop: 20 } : { paddingTop: 40 }]}
        >
            <BackButton onClick={()=>router.back()} style={{ marginLeft: 20 }}/>
            <Text
                style={{
                    width: '80%',
                    color: "white",
                    textTransform: "capitalize",
                    fontSize: 40,
                    marginLeft: 25,
                    marginTop: 25,
                    textAlign: "left",
                }}
            >
                {lightText} <Text style={{fontFamily: 'montserrat-bold', textTransform: 'lowercase'}}>{boldText}</Text>
            </Text>

        </ImageBackground>
    </View>
  )
}