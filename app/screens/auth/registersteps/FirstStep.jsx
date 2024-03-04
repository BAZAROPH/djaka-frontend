import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import * as SecureStore from 'expo-secure-store'

import NormalInput from '../../../../components/common/inputs/normalinputtext/NormalInput'
import PasswordInput from '../../../../components/common/inputs/passwordinput/PasswordInput'
import Datepicker from '../../../../components/common/inputs/datepicker/Datepicker'
import SelectBoxPicker from '../../../../components/common/selectbox/SelectBoxPicker'
import { COLORS, icons } from '../../../../constants'
import NormalButton from '../../../../components/common/buttons/normalbutton/NormalButton';
import Toast from '../../../../components/common/toast/Toast';

import { postRegister, resetPostRegister, updateRegisteredUser, resetUpdateRegisteredUser } from '../../../../store/actions';



export default function FirstStep({ setActiveStep }) {
    const dispatch = useDispatch();
    const [ birth_date, setBirthdate ] = useState(new Date(Date.now()));
    const genderOptions = ['Masculin', 'Féminin'];
    const [registeredUser, setRegisteredUser] = useState(null);

    const bloodOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', '0-'];
    
    const firstStepForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            area_code: '+225',
            password: '',
            confirm_password: '',
            birth_date: birth_date,
            gender: genderOptions[0],
            size: '',
            blood_type: bloodOptions[0],
            weight: '',
            health_problems: [
                {
                    label: '',
                    hidde: false
                }
            ],
        },
        validationSchema: Yup.object({
            last_name: Yup.string().required('Vous devez renseigner votre nom'),
            first_name: Yup.string().required('Vous devez renseigner votre prénom'),
            email: Yup.string().email('Veuillez saisir une adresse email valide').required('Vous devez renseigner votre email'),
            phone_number: Yup.string()
                        .matches(/^[0-9]{10,}$/, 'Contact invalide')
                        .required('Vous devez renseigner votre contact'),
            password: Yup.string().min(8, 'Votre mot de passe doit faire minimun 8 caractères')
                        .matches(/[0-9]/, 'Votre mot de passe doit contenir au moins un chiffre')
                        .matches(/[A-Z]/, 'Votre mot de passe doit contenir au moins une lettre majuscule')
                        .matches(/[a-z]/, 'Votre mot de passe doit contenir au moins une lettre minuscule')
                        .required('Vous devez renseigner un mote de passe'),
            confirm_password: Yup.string().required('Vous devez confirmer le mot de passe').oneOf([Yup.ref('password')], 'Les deux mots de passe sont différents'),
            size: Yup.string().matches(/^-?\d*\.?\d*$/, 'La taille doit être un nombre'),
            weight: Yup.string().matches(/^-?\d*\.?\d*$/, 'Le poids doit être un nombre')
        }),
        onSubmit: (values) => {
            // const data = {...values, birth_date: values.birth_date.toLocaleString() }
            if(registeredUser === null){
                dispatch(postRegister(values))
            }else{
                const data = {
                    email: firstStepForm.values.email,
                    phone_number: firstStepForm.values.phone_number,
                    user: registeredUser.id,
                    password: firstStepForm.values.password,
                    confirm_password: firstStepForm.values.confirm_password,
                }
                dispatch(updateRegisteredUser(data))
            }
        }
    })

    const saveDate = (date)=>{
        firstStepForm.setFieldValue('birth_date', date)
    }
    
    const addHealthProblem = ()=>{
        firstStepForm.setValues({ ...firstStepForm.values, health_problems: [...firstStepForm.values.health_problems, { label: '', hidde: false}]})
    }

    const removeHealthProblem = (index)=>{
        firstStepForm.setFieldValue('health_problems', firstStepForm.values.health_problems.filter((value, _) => index !== _));
    }

    const saveHealthProblemLabel = (label, index)=>{
        firstStepForm.setValues({
            ...firstStepForm.values,
            health_problems: firstStepForm.values.health_problems?.map((value, _) =>
              _ === index ? { ...value, label: label } : value
            ),
        });
    }

    const saveHealthProblemHidde = (state, index) => {
        firstStepForm.setValues({
          ...firstStepForm.values,
          health_problems: firstStepForm.values.health_problems?.map((value, _) =>
            _ === index ? { ...value, hidde: !state } : value
          ),
        });
    };

    const selectLayoutRegisterState = (state) => state.registerUserReducer;
    const selectLayoutRegisterProperties = createSelector(selectLayoutRegisterState, (state) => ({
        registerLoading: state.registerLoading,
        registerUser: state.registerUser,
        registerError: state.registerError,
    }));
    const { registerLoading, registerUser, registerError } = useSelector(selectLayoutRegisterProperties);

    const selectLayoutUpdateRegisteredUserState = (state) => state.updateRegisteredUserReducer;
    const selectLayoutUpdateRegisteredProperties = createSelector(selectLayoutUpdateRegisteredUserState, (state) => ({
        updateRegisteredUserLoading: state.updateRegisteredUserLoading,
        data: state.data,
        updateRegisteredUserError: state.updateRegisteredUserError,
    }));
    const { updateRegisteredUserLoading, data, updateRegisteredUserError } = useSelector(selectLayoutUpdateRegisteredProperties);
    
    useEffect(() => {
        if(registerUser){
            SecureStore.setItemAsync('registerUser', JSON.stringify(registerUser))
            SecureStore.setItemAsync('password', JSON.stringify(firstStepForm.values.password))
            dispatch(resetPostRegister())
            setActiveStep(2)
        }

    }, [registerLoading, registerUser, registerError])

    useEffect(() => {
        if(data){
            SecureStore.setItemAsync('registerUser', JSON.stringify(data))
            SecureStore.setItemAsync('password', JSON.stringify(firstStepForm.values.password))
            dispatch(resetUpdateRegisteredUser())
            setActiveStep(2)
        }

    }, [updateRegisteredUserLoading, data, updateRegisteredUserError])

    const getRegisteredUser = async ()=>{
        let user = await SecureStore.getItemAsync('registerUser');
        let password = await SecureStore.getItemAsync('password');
        if(user){
            user = JSON.parse(user)
            setRegisteredUser(user);
            firstStepForm.setFieldValue('first_name', user.first_name)
            firstStepForm.setFieldValue('last_name', user.last_name)
            firstStepForm.setFieldValue('email', user.email)
            firstStepForm.setFieldValue('phone_number', user.phone_number)
            firstStepForm.setFieldValue('password', user.password)
            firstStepForm.setFieldValue('confirm_password', user.confirm_password)
        }
        
        if(password){
            password = JSON.parse(password)
            firstStepForm.setFieldValue('password', password)
            firstStepForm.setFieldValue('confirm_password', password)
        }
    }
    
    useEffect(() => {
        getRegisteredUser()
    }, [])
    
    return (
        <SafeAreaView style={{
            gap: 10,
        }}>
            {/* <KeyboardAvoidingView enabled behavior={'padding'} style={{flex:1}} keyboardVerticalOffset={250}> */}

            {
                registerError && (
                    <Toast text={registerError} duration={3000} backgroundColor={'red'} />
                )
            }
            {
                updateRegisteredUserError && (
                    <Toast text={updateRegisteredUserError} duration={3000} backgroundColor={'red'} />
                )
            }
            <View>
                <Text style={style.label}>Nom</Text>
                <NormalInput 
                    style={{ marginTop: 2}}
                    placeholder='Nom' 
                    variant='form' 
                    onChange={firstStepForm.handleChange('last_name')} 
                    value={ firstStepForm.values.last_name || ''}
                    error={(firstStepForm.touched.last_name && firstStepForm.errors.last_name) && firstStepForm.errors.last_name} 
                    onBlur={firstStepForm.handleBlur('last_name')}
                    editable={registeredUser===null}
                />
            </View>

            <View>
                <Text style={style.label}>Prénom</Text>
                <NormalInput 
                    style={{ marginTop: 2}} 
                    placeholder='Prénom' 
                    variant='form'
                    onChange={firstStepForm.handleChange('first_name')} 
                    value={ firstStepForm.values.first_name || ''}
                    error={(firstStepForm.touched.first_name && firstStepForm.errors.first_name) && firstStepForm.errors.first_name} 
                    onBlur={firstStepForm.handleBlur('first_name')}
                    editable={registeredUser===null}
                />
            </View>

            <View>
                <Text style={style.label}>Email</Text>
                <NormalInput 
                    style={{ marginTop: 2}} 
                    placeholder='Email' 
                    variant='form' 
                    onChange={firstStepForm.handleChange('email')} 
                    value={ firstStepForm.values.email || ''}
                    error={(firstStepForm.touched.email && firstStepForm.errors.email) && firstStepForm.errors.email} 
                    onBlur={firstStepForm.handleBlur('email')}
                />
            </View>

            <View>
                <Text style={style.label}>Contact</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center'}}>
                    <NormalInput style={{ marginTop: 2}} width='20%' variant='form' value='+225' editable={false}
                    />
                     <NormalInput 
                        style={{ marginTop: 2}} 
                        width={'75%'}
                        placeholder='Contact' 
                        variant='form' 
                        keyboardType='phone-pad'
                        onChange={firstStepForm.handleChange('phone_number')} 
                        value={ firstStepForm.values.phone_number || ''}
                        error={(firstStepForm.touched.phone_number && firstStepForm.errors.phone_number) && firstStepForm.errors.phone_number} 
                        onBlur={firstStepForm.handleBlur('phone_number')}
                    />
                </View>
            </View>

            <View>
                <Text style={style.label}>Mot de passe</Text>
                <PasswordInput 
                    style={{ marginTop: 2}} 
                    placeholder='Mot de passe'
                    variant='form'
                    onChange={firstStepForm.handleChange('password')} 
                    value={firstStepForm.values.password || ''}
                    error={(firstStepForm.touched.password && firstStepForm.errors.password) && firstStepForm.errors.password} 
                    onBlur={firstStepForm.handleBlur('password')}
                    // editable={registeredUser===null}
                />
            </View>

            <View>
                <Text style={style.label}>Confirmer le mot de passe</Text>
                <PasswordInput 
                    style={{ marginTop: 2}} 
                    placeholder='Confirmer le mot de passe' 
                    variant='form'
                    onChange={firstStepForm.handleChange('confirm_password')} 
                    value={firstStepForm.values.confirm_password || ''}
                    error={(firstStepForm.touched.confirm_password && firstStepForm.errors.confirm_password) && firstStepForm.errors.confirm_password} 
                    onBlur={firstStepForm.handleBlur('confirm_password')}
                    // editable={registeredUser===null}
                />
            </View>

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                {
                    Platform.OS == 'ios' ? (
                        <View style={{ width: '48%'}}>
                            <Text style={style.label}>Date de naissance</Text>
                            <Datepicker 
                                value={firstStepForm.values.birth_date} 
                                setValue={saveDate}
                                error={(firstStepForm.touched.birth_date && firstStepForm.errors.birth_date) && firstStepForm.errors.birth_date}
                                disabled={registeredUser!==null}
                            />
                        </View>
                    ):(
                        <View style={{
                            width: '48%'
                        }}>
                            <Text style={style.label}>Date de naissance</Text>
                            <Datepicker 
                                value={firstStepForm.values.birth_date} 
                                setValue={saveDate}
                                error={(firstStepForm.touched.birth_date && firstStepForm.errors.birth_date) && firstStepForm.errors.birth_date} 
                                disabled={registeredUser!==null}
                            />
                        </View>
                    )
                }
                <View style={{ width: '48%' }}>
                    <Text style={style.label}>Sexe</Text>
                    <SelectBoxPicker 
                        options={genderOptions} 
                        selected={firstStepForm.values.gender || ''} 
                        setSelected={firstStepForm.handleChange('gender')} 
                        style={{marginTop: 2}}
                        error={(firstStepForm.touched.gender && firstStepForm.errors.gender) && firstStepForm.errors.gender} 
                        disabled={registeredUser!==null}
                    />
                </View>
            </View>

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>

                <View style={{ width: '48%' }}>
                    <Text style={style.label}>Taille</Text>
                    <NormalInput 
                        style={{ marginTop: 2}} 
                        placeholder='174 cm' 
                        keyboardType='numeric'
                        variant='form'
                        onChange={firstStepForm.handleChange('size')} 
                        value={firstStepForm.values.size || ''}
                        error={(firstStepForm.touched.size && firstStepForm.errors.size) && firstStepForm.errors.size} 
                        onBlur={firstStepForm.handleBlur('size')}
                        editable={registeredUser===null}
                    />
                </View>

                <View style={{ width: '48%' }}>
                    <Text style={style.label}>Groupe sanguin</Text>
                    <SelectBoxPicker 
                        options={bloodOptions} 
                        selected={firstStepForm.values.blood_type || ''}  
                        setSelected={firstStepForm.handleChange('blood_type')} 
                        style={{marginTop: 2}}
                        error={(firstStepForm.touched.blood_type && firstStepForm.errors.blood_type) && firstStepForm.errors.blood_type} 
                        disabled={registeredUser!==null}
                    />
                </View>

            </View>


            <View>
                <Text style={style.label}>Poids</Text>
                <NormalInput 
                    style={{ marginTop: 2}} 
                    placeholder='92 Kg' 
                    variant='form' 
                    keyboardType='numeric'
                    onChange={firstStepForm.handleChange('weight')} 
                    value={firstStepForm.values.weight || ''}
                    error={(firstStepForm.touched.weight && firstStepForm.errors.weight) && firstStepForm.errors.weight} 
                    onBlur={firstStepForm.handleBlur('weight')}
                    editable={registeredUser===null}
                />
            </View>
            
            {
                firstStepForm.values.health_problems.map((problem, index)=>(
                    <View key={index}>
                        <View style={{ flex:1, flexDirection: 'row', alignItems:'center', gap: 18}}>
                            <Text style={style.label}>Problème de santé</Text>
                            <View style={{ flex:1, flexDirection: 'row', alignItems:'center', gap: 7}}> 
                                <Checkbox 
                                    value={problem?.hidde}
                                    onValueChange={()=>saveHealthProblemHidde(problem?.hidde, index)}
                                    style={{ borderRadius: 100, height: 15, width: 15, borderColor: 'white', borderWidth: 1 }} 
                                    color={problem?.hidde ? COLORS.secondary : undefined}
                                    disabled={registeredUser!==null}
                                />
                                <Text style={style.label}>Cacher</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginTop: 4
                        }}>

                            <View style={{ width: '90%' }}>
                                <NormalInput placeholder='Ajouter des problèmes de santé actuel' variant='form' keyboardType='numeric' index={index} onChange={saveHealthProblemLabel} editable={registeredUser===null}/>
                            </View>

                            <View style={{ width: '10%' , flex: 1, justifyContent: 'center', alignItems: 'center', height: 35, gap: 2}}>
                                <TouchableOpacity onPress={()=>addHealthProblem()}>
                                    <Image source={icons.greenPlus} style={{ height: 15, width: 15 }}/>
                                </TouchableOpacity>
                                {
                                    firstStepForm.values.health_problems.length > 1 && (
                                        <TouchableOpacity onPress={()=>removeHealthProblem(index)}>
                                            <Image source={icons.whiteSub} style={{ height: 15, width: 15 }}/>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                ))
            }

            <View style={{ marginTop: 20, alignItems: 'center'}}>
                <NormalButton title='Suivant' width='40%' style={{ backgroundColor: 'rgba(123, 239, 255, 0.30)'}} onClick={()=>firstStepForm.handleSubmit()} loading={registerLoading ? registerLoading : updateRegisteredUserLoading }/>
            </View>
            {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    label: {
        fontFamily: 'montserrat-bold',
        color: 'white',
        fontSize: 15
    }
})