import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native'
import { useRouter, Stack } from 'expo-router';

import ScreenGradient from '../components/common/screengradient/ScreenGradient';
import NormalButton from '../components/common/buttons/normalbutton/NormalButton'
import { SIZES, icons, STYLES } from '../constants';


const index = () => {
    const router = useRouter();
    return (
        <ScreenGradient style={STYLES.container}>
            <Stack.Screen 
                options={{
                    headerShown: false,
                }}
            />
            <SafeAreaView style={[ SIZES.screenContainer ]}>
                <View style={{paddingBottom: 100}}>
                    <Image source={icons.whiteLogo} resizeMode='contain' style={{height: 140}} />
                </View>
                <NormalButton 
                    title='Se Connecter' 
                    width='75%' 
                    onClick={()=>router.push('/screens/auth/Login')}
                />
                <NormalButton 
                    title="Je m'enregistre" 
                    width='75%'
                    color={'transparent'} 
                    style={{ 
                        marginTop: 20
                    }}
                    onClick={()=>router.push('/screens/auth/Register')}
                />
            </SafeAreaView>
        </ScreenGradient>
    )
}

export default index