import { View, Text, SafeAreaView, ImageBackground, ScrollView, Platform } from 'react-native'
import { useRouter, router } from 'expo-router'
import React from 'react'

import BackButton from '../../../components/common/buttons/backbutton/BackButton'
import NotificationBox from '../../../components/notificationbox/NotificationBox'
import { images } from '../../../constants'

export default function Notification() {
    const route=useRouter();
    const data = [
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
        {
            content: 'Groupe modifié',
            date: '10/11/2023'
        },
    ]
    return (
        <SafeAreaView style={{ flex: 1}}>
            <View style={{ height: "35%" }}>
                <ImageBackground
                    source={images.contact}
                    resizeMode="cover"
                    style={[{ height: "100%", justifyContent: 'flex-start' }, Platform.OS == 'ios' ? { paddingTop: 20 } : { paddingTop: 40 }]}
                >
                    <BackButton onClick={() => router.back()} style={{ marginLeft: 20 }}/>
                    <Text
                    style={{
                        fontFamily: "montserrat-bold",
                        color: "white",
                        textTransform: "capitalize",
                        fontSize: 40,
                        margin: 50/2,
                        textAlign: "center",
                    }}
                    >
                        Notification
                    </Text>
                </ImageBackground>
            </View>

            <ScrollView 
                style={{
                    height: '65%',
                }}
                showsVerticalScrollIndicator={false}
            >
               <View 
                    style={{
                        // height: '100%',
                        marginHorizontal: 40,
                        gap: 20
                    }}
                >
                    {
                        data.map((value, index)=>(
                            <NotificationBox key={index} date={value.date} notification={value.content} />
                        ))
                    }
                </View>     
            </ScrollView>

        </SafeAreaView>
    )
}