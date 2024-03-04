import React from 'react'
import { View, Text, Image } from 'react-native'

export default function TabIcon({icon, label}){
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <Image source={icon} style={{ height: 22, width: 22}}/>
            <Text style={{color: 'white', fontFamily: 'montserrat-bold'}}>{label}</Text>
        </View>
    )
}