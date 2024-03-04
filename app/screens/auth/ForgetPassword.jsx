import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { forgetPassword, resetForgetPassword } from '../../../store/actions';

import { SIZES, STYLES, icons, COLORS } from '../../../constants';
import BackButton from '../../../components/common/buttons/backbutton/BackButton';
import NormalButton from '../../../components/common/buttons/normalbutton/NormalButton';
import InputBottomBorder from '../../../components/common/inputs/inputbottomborder/InputBottomBorder';
import ScreenGradient from '../../../components/common/screengradient/ScreenGradient';
import Toast from '../../../components/common/toast/Toast';


export default function ForgetPassword() {
    const router = useRouter();
    const dispatch = useDispatch();

    const forgetPasswordForm = useFormik({
            enableReinitialize: true,
            initialValues:{
                email: '',
            },
            validationSchema: Yup.object({
                email: Yup.string().email('Veuillez saisir une adresse email valide').required('Vous devez saisir votre adresse email')
            }),
            onSubmit: (values)=>{
                dispatch(forgetPassword(values));
            }
    })

    const SelectForgetPasswordLayoutState = (state) => state.forgetPasswordReducer;
    const SelectForgetPasswordLayoutProperties = createSelector(SelectForgetPasswordLayoutState, (state)=>({
        forgetPasswordLoading: state.forgetPasswordLoading,
        user: state.user,
        forgetPasswordError: state.forgetPasswordError
    }))
    const { forgetPasswordLoading, user, forgetPasswordError } = useSelector(SelectForgetPasswordLayoutProperties);

    useEffect(() => {
        if (user) {
            const requestInfos = {
                user: user.id, 
                email: user.email
            }
            dispatch(resetForgetPassword());
            router.push({ pathname: '/screens/auth/VerifyOTP', params: requestInfos});
        }
    }, [forgetPasswordLoading, user, forgetPasswordError])
    


    return (
        <ScreenGradient style={ STYLES.container }>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            {
                forgetPasswordError && (
                    <Toast text={forgetPasswordError} duration={2000} backgroundColor={'red'}/>
                )
            }

            <SafeAreaView style={[ SIZES.screenContainer, {justifyContent:'flex-start'} ]}>
                <View style={{ height: '35%'}} >
                    <Image source={icons.whiteLogo} resizeMode='contain' style={{ height: '40%', marginTop: '20%' }}/>
                </View>
                <View style={{
                    width: '100%',
                    flex: 1,
                    justifyContent: 'flex-start',
                    gap: 50
                }}>

                    <BackButton onClick={()=>router.back()}/>

                    <View style={{
                        paddingLeft: '5%'
                    }}>
                        <Text 
                            style={{ 
                                fontFamily: 'montserrat-extrabold',
                                fontSize: 18,
                                color: 'white'
                            }}
                        >
                            Mot de passe oublié ?
                        </Text>
                    </View>

                    <View style={{
                        paddingLeft: '5%'
                    }}>
                        <View 
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Image source={icons.phone_number} resizeMode='contain' style={{ width: '15%', height: 35}}/>
                            <InputBottomBorder 
                                variant='secondary' 
                                width='85%' 
                                style={{ paddingHorizontal: 4 }} 
                                placeholder='Saisissez votre adresse email'
                                onChange={forgetPasswordForm.handleChange('email')}
                                keyboardType='email-address'
                                error={ forgetPasswordForm.errors.email && forgetPasswordForm.errors.email }
                                onBlur={forgetPasswordForm.handleBlur('email')}
                            />
                        </View>
                    </View>

                    <View style={{
                        paddingLeft: '5%',
                        height: 50
                    }}>
                        <NormalButton title='Envoyer' onClick={()=>forgetPasswordForm.handleSubmit()} loading={forgetPasswordLoading}/>
                    </View>

                </View>

            </SafeAreaView>
        </ScreenGradient>
    )
}