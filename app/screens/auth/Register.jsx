import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Platform, Dimensions, StatusBar, KeyboardAvoidingView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import BackButton from '../../../components/common/buttons/backbutton/BackButton'
import Steplines from '../../../components/steplines/Steplines'
import ScreenGradient from '../../../components/common/screengradient/ScreenGradient'
import { icons, SIZES, STYLES } from '../../../constants'

import FirstStep from './registersteps/FirstStep'
import SecondStep from './registersteps/SecondStep'
import ThirdStep from './registersteps/ThirdStep'
import VerifyContact from './registersteps/VerifyContact'

const screenHeight = Dimensions.get('window').height;

export default function Register() {
    const router = useRouter();
    const steplines = [1, 2, 3, 4]
    const [ activeStep, setActiveStep ] = useState(1);
    const [ step, setStep ] = useState(<FirstStep setActiveStep={setActiveStep}/>)
    useEffect(() => {
        switch (activeStep) {
            case 1:
                setStep(<FirstStep setActiveStep={setActiveStep}/>)
                break;

            case 2:
                setStep(<VerifyContact setActiveStep={setActiveStep}/>)
                break;

            case 3:
                setStep(<SecondStep setActiveStep={setActiveStep}/>)
                break;
            
            case 4:
                setStep(<ThirdStep setActiveStep={setActiveStep}/>)
                break;
            default:
                setStep(<FirstStep setActiveStep={setActiveStep}/>)
                break;
        }
    }, [activeStep])
    
    return (
        <ScreenGradient style={[STYLES.container]}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom',
                    animationDuration: 600,
                }}
            />
            <SafeAreaView style={[ SIZES.screenContainer, {justifyContent:'flex-start'} ]}>
                <View style={[{
                    width: '100%',
                    paddingTop: StatusBar.currentHeight
                }]}>
                    {
                        activeStep < 3 && (
                            <BackButton onClick={()=>{ activeStep > 1 ? setActiveStep(activeStep - 1) : router.back()}} />
                        )
                    }

                    <View style={{ marginTop: 20}}>
                        <Text style={{ fontFamily: 'montserrat-bold', color: 'white', fontSize: 20 }}>Je m'enregistre</Text>
                        <Steplines steplines={steplines} style={{ marginTop: 30 }} activeStep={activeStep} width='95%' />
                    </View>
                    <ScrollView
                        style={{
                            marginTop: 30,
                            paddingBottom: 40,
                            height: Platform.OS == 'ios' ? screenHeight*0.78 : screenHeight*0.84
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        <KeyboardAvoidingView enabled behavior={'padding'} style={{flex:1}} keyboardVerticalOffset={screenHeight*0.2}>
                            { step }
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ScreenGradient>
    )
}
