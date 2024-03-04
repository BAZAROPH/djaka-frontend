import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import * as SecureStore from 'expo-secure-store'
import { verifyOTP, resetVerifyOTP , resendOTP, resetResendOTP} from '../../../../store/actions';


import OTPInput from '../../../../components/common/inputs/otpinput/OTPInput'
import NormalButton from '../../../../components/common/buttons/normalbutton/NormalButton';
import Toast from '../../../../components/common/toast/Toast';
import { COLORS } from '../../../../constants';

export default function VerifyContact({ setActiveStep }) {
    const dispatch = useDispatch();
    const [ time, setTime ] = useState(20);
    const [userRegistered, setUserRegistered] = useState(null);

    const verifyContactForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            otp: '',
            user: null
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required('Vous devez renseigner le code OTP')
                .matches(/^[0-9]+$/, 'Votre saisie doit contenir uniquement des chiffres')
        }),
        onSubmit: (values)=>{
            dispatch(verifyOTP(values));
        }
    })

    const saveOTP = (value)=>{
        verifyContactForm.setFieldValue('otp', value)
    }


    const resendNewOTP = ()=>{
        const data = {
            id: userRegistered.id
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

        const timeOutInterval= setInterval(() => {
            setTime(()=> time > 0 ? time - 1 : 0)
        }, 1000);

        return () => {
            clearTimeout(timeOutInterval);
        }
    }, [time])

    const getRegisteredUser = async ()=>{
        let user = await SecureStore.getItemAsync('registerUser');
        if(user){
            user =  JSON.parse(user);
            setUserRegistered(user);
            verifyContactForm.setFieldValue('user', user.id)
        }
    }
    
    useEffect(() => {
        getRegisteredUser()
    }, [])


    useEffect(() => {
        if(verifyOTPSuccess && verifyOTPSuccess.error === false){
            setActiveStep(3)
            dispatch(resetVerifyOTP())
        }
    }, [verifyOTPLoading, verifyOTPSuccess, verifyOTPError])

    useEffect(() => {
        if(resendOTPSuccess){
            dispatch(resetResendOTP())
            setTime(20)
        }
    }, [resendOTPLoading, resendOTPSuccess, resendOTPError])
    
    
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: '50%',
        }}>
            {
                resendOTPSuccess && (
                    <Toast text={resendOTPSuccess} duration={2000} backgroundColor={'white'} textColor={COLORS.secondary} />
                )
            }
            {
                verifyOTPError && (
                    <Toast text={verifyOTPError} duration={3000} backgroundColor={'red'} />
                )
            }
            <View>
                <OTPInput onChange={saveOTP} error={(verifyContactForm.touched.otp && verifyContactForm.errors.otp)}/>
            </View>
            <View style={{width: '100%', marginBottom: 20}}>
                <TouchableOpacity style={[{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}]} disabled={time > 0} onPress={()=>{resendNewOTP()}}>
                    <Text style={[{textAlign: 'right', fontFamily: 'montserrat-light', color: 'white', textDecorationLine: 'underline'}, time > 0 && { opacity: 0.5 }]}>Renvoyer le code</Text>
                    { time > 0 && (
                        <View style={{ width: 20}}>
                            <Text  style={{textAlign: 'right', fontFamily: 'montserrat-bold', color: 'white'}}>{time}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
                <NormalButton 
                    width='50%'
                    title='Valider' 
                    style={{ textAlign: 'center', opacity: 1, height: ''}}
                    onClick={()=>{verifyContactForm.handleSubmit()}}
                    loading={verifyOTPLoading}
                />
            </View>
        </SafeAreaView>
    )
}