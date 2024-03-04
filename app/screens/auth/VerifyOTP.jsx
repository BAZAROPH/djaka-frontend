import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter, Stack, useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useFormik } from 'formik';
import * as Yup from 'yup'

import OTPInput from '../../../components/common/inputs/otpinput/OTPInput'
import ScreenGradient from '../../../components/common/screengradient/ScreenGradient'
import { COLORS, SIZES, STYLES, icons } from '../../../constants'
import BackButton from '../../../components/common/buttons/backbutton/BackButton'
import Toast from '../../../components/common/toast/Toast';

import { verifyOTP, resetVerifyOTP , resendOTP, resetResendOTP} from '../../../store/actions';


export default function VerifyOTP() {
    const router = useRouter();
    const requestInfos = useLocalSearchParams();
    const dispatch = useDispatch();

    const OTPForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            otp: '',
            email: requestInfos.email,
            user: requestInfos.user
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                        .required('Vous devez renseigner le code OTP'),
            
        }),
        onSubmit: (values) => {
            dispatch(verifyOTP(values));
        }
    })

    const saveOTP = (value)=>{
        OTPForm.setFieldValue('otp', value)
    }

    const resendNewOTP = ()=>{
        const data = {
            id: requestInfos.user
        }
        dispatch(resendOTP(data));
    }

    const selectLayoutVerifyOTPState = (state)=> state.verifyOTPReducer;
    const seletecLayoutVerifyOTPProperties = createSelector(selectLayoutVerifyOTPState, (state)=>({
        verifyOTPLoading: state.verifyOTPLoading,
        verifyOTPSuccess: state.verifyOTPSuccess,
        verifyOTPError: state.verifyOTPError,
    }))
    const { verifyOTPLoading, verifyOTPSuccess, verifyOTPError } = useSelector(seletecLayoutVerifyOTPProperties)

    const selectLayoutResendOTPState = (state)=> state.resendOTPReducer;
    const seletecLayoutResendOTPProperties = createSelector(selectLayoutResendOTPState, (state)=>({
        resendOTPLoading: state.resendOTPLoading,
        resendOTPSuccess: state.resendOTPSuccess,
        resendOTPError: state.resendOTPError,
    }))
    const { resendOTPLoading, resendOTPSuccess, resendOTPError } = useSelector(seletecLayoutResendOTPProperties)


    useEffect(() => {
        if (resendOTPSuccess) {
            dispatch(resetResendOTP());
        }
    }, [  resendOTPLoading, resendOTPSuccess, resendOTPError ])

    useEffect(() => {
        if (verifyOTPSuccess) {
            dispatch(resetVerifyOTP());
            router.push({ pathname: '/screens/auth/ResetPassword', params: requestInfos})
        }
        if (verifyOTPError) {
            setTimeout(() => {
                dispatch(resetVerifyOTP());
            }, 3000);
        }
    }, [  verifyOTPLoading, verifyOTPSuccess, verifyOTPError ])
    

    return (
        <ScreenGradient style={[ STYLES.container]}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            {
                resendOTPSuccess && (
                    <Toast text={resendOTPSuccess} duration={3000} backgroundColor={'white'} textColor={COLORS.secondary} />
                )
            }
            {
                verifyOTPError && (
                    <Toast text={verifyOTPError} duration={3000} backgroundColor={'red'} />
                )
            }
            <SafeAreaView style={[ SIZES.screenContainer, { height: '65%' } ]}>
                <View style={{height: '50%'}}>
                    <Image source={icons.whiteLogo} resizeMode='contain' style={{ height: '40%', marginTop: '20%' }}/>
                </View>
                <View style={{height: '50%', width: '100%'}}>
                    <BackButton onClick={()=>router.back()}/>
                    <View style={{
                        gap: 10,
                        marginTop: 10,
                    }}>
                        <Text 
                            style={{ 
                                fontFamily: 'montserrat-extrabold',
                                textTransform: 'uppercase',
                                fontSize: 18,
                                color: 'white'
                            }}
                        >
                            Consultez vos mails
                        </Text>
                        
                        <Text style={{ color: 'white', fontSize: 11, fontFamily: 'montserrat-light'}}>
                            Nous avons envoyé le code de réinitialisation sur votre boite mail
                        </Text>
                        
                        <View style={{height: '50%'}}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                            }}>
                                <OTPInput onChange={saveOTP} error={(OTPForm.touched.otp && OTPForm.errors.otp)}/>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ height: '35%', backgroundColor: 'white', width: '100%' }}>
                <View style={{ alignItems: 'center', marginTop: 20, gap: 10}}>

                    <View style={{ height: 30, width: '80%'}}>
                        <TouchableOpacity 
                            style={[
                                { backgroundColor: '#008AFF', padding: 6, borderRadius: 4 },
                                verifyOTPLoading && {flex:1, flexDirection: 'row', gap: 5, justifyContent: 'center'}
                            ]} 
                            onPress={()=>{OTPForm.handleSubmit()}}
                            disabled={verifyOTPLoading}
                        >
                            <Text style={{ color: 'white', fontFamily: 'montserrat-bold', textAlign: 'center' }}>Vérifier</Text>
                            {
                                verifyOTPLoading && <ActivityIndicator size={'small'} color={'white'}/>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 30, width: '80%'}}>

                        <TouchableOpacity 
                            style={[
                                { backgroundColor: 'rgba(0, 138, 255, 0.05)', padding: 6, borderRadius: 4 },
                                resendOTPLoading && {flex:1, flexDirection: 'row', gap: 5, justifyContent: 'center'}
                            ]} 
                            onPress={()=>resendNewOTP()}
                            disabled={resendOTPLoading}
                        >
                            <Text style={{ color: 'black', fontFamily: 'montserrat-light', textAlign: 'center' }}>Renvoyer le code</Text>
                            {
                                resendOTPLoading && <ActivityIndicator size={'small'} color={'black'}/>
                            }
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </ScreenGradient>
    )
}