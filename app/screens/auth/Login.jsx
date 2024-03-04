import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { login, resetLogin } from '../../../store/actions.js';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import * as SecureStore from 'expo-secure-store'
import { getToken } from '../../../Helpers/api_helper.js';

import ScreenGradient from '../../../components/common/screengradient/ScreenGradient';
import BackButton from '../../../components/common/buttons/backbutton/BackButton';
import NormalButton from '../../../components/common/buttons/normalbutton/NormalButton.jsx';
import NormalInput from '../../../components/common/inputs/normalinputtext/NormalInput.jsx';
import PasswordInput from '../../../components/common/inputs/passwordinput/PasswordInput.jsx';
import { COLORS, SIZES, STYLES, icons } from '../../../constants';
import Toast from '../../../components/common/toast/Toast.jsx';
import { useAuthUser } from '../../../hooks/useAuthUser.js';


export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, token } = useAuthUser();

    const loginForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: '',
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Veuillez saisir une adresse email valide').required('Vous devez renseigner votre email'),
            password: Yup.string().min(8, 'Votre mot de passe doit faire minimun 8 caractères').required('Vous devez renseigner votre mot de passe'),
        }),
        onSubmit: (values) => {
            let data = {...values}
            dispatch(login(data))
        }
    })

    const loginLayoutState = (state) => state.loginReducer;
    const loginLayoutProperties = createSelector(loginLayoutState, (state)=>({
        loginLoading: state.loginLoading,
        authUser: state.authUser,
        loginError: state.loginError,
    }))
    const { loginLoading, authUser, loginError } = useSelector(loginLayoutProperties);

    useEffect(() => {
        if (authUser) {
            SecureStore.setItemAsync('authUser', JSON.stringify(authUser));
            dispatch(resetLogin())
            getToken()
            router.push('/(tabs)/Home')
        }
    }, [loginLoading, authUser, loginError])

    useEffect(() => {
        if(user){
            router.push('/(tabs)/Home')
        }
    }, [user])
    
    

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
                {
                    loginError && (
                        <Toast text={loginError} duration={3000} backgroundColor={'red'} />
                    )
                }
                <View style={{ height: '35%' }} >
                    <Image source={icons.whiteLogo} resizeMode='contain' style={{ height: '40%', marginTop: '20%' }}/>
                </View>
                <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>

                    <BackButton onClick={()=>router.back()}/>

                    <View style={{ marginTop: 40 }}>
                        <Text 
                            style={{ 
                                fontFamily: 'montserrat-extrabold', 
                                textTransform: 'uppercase',
                                fontSize: 18,
                                color: 'white'
                            }}
                        >
                            Adresse email
                        </Text>
                    </View>
                    <View 
                        style={{
                            marginTop: 25,
                        }}
                    >
                        <NormalInput
                            width='100'
                            variant='form' 
                            placeholder={'Saisissez votre adresse email'}
                            keyboardType='email-address'
                            onChange={loginForm.handleChange('email')} 
                            value={loginForm.values.email || ''}
                            onBlur={loginForm.handleBlur('email')}
                        />
                    </View>
                    {(loginForm.touched.prefix && loginForm.errors.prefix) && <Text style={{color: COLORS.error}}>{loginForm.errors.prefix}</Text>}
                    {(loginForm.touched.email && loginForm.errors.email) && <Text style={{color: COLORS.error}}>{loginForm.errors.email}</Text>}

                    <View style={{ marginTop: 30 }}>
                        <Text 
                            style={{ 
                                fontFamily: 'montserrat-extrabold', 
                                textTransform: 'uppercase',
                                fontSize: 18,
                                color: 'white'
                            }}
                        >
                            Mot de passe
                        </Text>
                    </View>
                    <View 
                        style={{
                            marginTop: 10
                        }}
                    >
                        <PasswordInput 
                            width='100%'
                            variant='form'
                            onChange={loginForm.handleChange('password')} 
                            value={loginForm.values.password || ''}
                            error={(loginForm.touched.password && loginForm.errors.password) && loginForm.errors.password} 
                            onBlur={loginForm.handleBlur('password')}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={()=>router.push('/screens/auth/ForgetPassword')}>
                            <Text style={{ textAlign: 'right', color: 'white', fontFamily: 'montserrat-light'}}>Mot de passe oublié ?</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{ alignItems: 'center', marginTop: '15%' }}>
                        <NormalButton 
                            width='40%' 
                            title='Valider' 
                            style={{ textAlign: 'center'}}
                            onClick={()=>{loginForm.handleSubmit()}}
                            loading={loginLoading}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ScreenGradient>
    )
}