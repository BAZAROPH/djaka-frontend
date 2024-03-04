import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import ScreenGradient from "../../../components/common/screengradient/ScreenGradient";
import { SIZES, STYLES, icons } from "../../../constants";
import PasswordInput from "../../../components/common/inputs/passwordinput/PasswordInput";
import Toast from "../../../components/common/toast/Toast";

import { resetPassword, resetResetPassword } from "../../../store/actions";


export default function ResetPassword() {
    const router = useRouter();
    const dispatch = useDispatch();
    const requestInfos = useLocalSearchParams();

    const resetPasswordForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: "",
            confirm_password: "",
            user: requestInfos.user
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "Votre mot de passe doit faire minimun 8 caractères")
                .matches(/[0-9]/, "Votre mot de passe doit contenir au moins un chiffre")
                .matches(/[A-Z]/, "Votre mot de passe doit contenir au moins une lettre majuscule")
                .matches(/[a-z]/, "Votre mot de passe doit contenir au moins une lettre minuscule")
                .required("Vous devez renseigner un mot de passe"),
            confirm_password: Yup.string()
                .required("Vous devez confirmer le mot de passe")
                .oneOf([Yup.ref("password")], "Les deux mots de passe sont différents"),
        }),
        onSubmit: (values) => {
            // console.log(values);
            dispatch(resetPassword(values));
        },
    });

    const selectLayoutResetPasswodState = (state)=> state.resetPasswordReducer;
    const seletecLayoutResetPasswodProperties = createSelector(selectLayoutResetPasswodState, (state)=>({
        resetPasswordLoading: state.resetPasswordLoading,
        response: state.response,
        resetPasswordError: state.resetPasswordError,
    }))
    const { resetPasswordLoading, response, resetPasswordError } = useSelector(seletecLayoutResetPasswodProperties)

    useEffect(() => {
        if (response) {
            dispatch(resetResetPassword());
            router.push('/screens/auth/Login');

        }
    }, [resetPasswordLoading, response, resetPasswordError])
    

    return (
        <ScreenGradient style={[STYLES.container]}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            {
                response && (
                    <Toast text={response.message} duration={2000} backgroundColor={'green'} textColor={'green'} />
                )
            }
            {
                resetPasswordError && (
                    <Toast text={resetPasswordError} duration={3000} backgroundColor={'red'} />
                )
            }
            <SafeAreaView style={[SIZES.screenContainer, { height: "65%" }]}>
                <View style={{ height: "50%" }}>
                    <Image source={icons.whiteLogo} resizeMode="contain" style={{ height: "40%", marginTop: "20%" }} />
                </View>
                <View style={{ height: "50%", width: "100%" }}>
                    {/* <BackButton onClick={() => router.back()} /> */}
                    <View
                        style={{
                            gap: 10,
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "montserrat-extrabold",
                                fontSize: 18,
                                color: "white",
                            }}
                        >
                            Entrez un nouveau mot de passe
                        </Text>

                        <View
                            style={{
                                marginTop: 10,
                            }}
                        >
                            <PasswordInput
                                placeholder="Nouveau mot de passe"
                                width="100%"
                                variant="form"
                                onChange={resetPasswordForm.handleChange("password")}
                                value={resetPasswordForm.values.password || ""}
                                error={resetPasswordForm.touched.password && resetPasswordForm.errors.password && resetPasswordForm.errors.password}
                                onBlur={resetPasswordForm.handleBlur("password")}
                            />
                        </View>
                        <View
                            style={{
                                marginTop: 30,
                            }}
                        >
                            <PasswordInput
                                placeholder="Confirmer le mot de passe"
                                width="100%"
                                variant="form"
                                onChange={resetPasswordForm.handleChange("confirm_password")}
                                value={resetPasswordForm.values.confirm_password || ""}
                                error={resetPasswordForm.touched.confirm_password && resetPasswordForm.errors.confirm_password && resetPasswordForm.errors.confirm_password}
                                onBlur={resetPasswordForm.handleBlur("confirm_password")}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ height: "35%", backgroundColor: "white", width: "100%", alignItems: 'center'}}>
                <View style={{ height: 30, width: '80%', marginTop: 10}}>
                    <TouchableOpacity 
                        style={[
                            { backgroundColor: '#008AFF', padding: 6, borderRadius: 4 },
                            resetPasswordLoading && {flex:1, flexDirection: 'row', gap: 5, justifyContent: 'center'}
                        ]} 
                        onPress={()=>{resetPasswordForm.handleSubmit()}}
                        disabled={resetPasswordLoading}
                    >
                        <Text style={{ color: 'white', fontFamily: 'montserrat-bold', textAlign: 'center' }}>Envoyer</Text>
                        {
                            resetPasswordLoading && <ActivityIndicator size={'small'} color={'white'}/>
                        }
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScreenGradient>
    );
}
