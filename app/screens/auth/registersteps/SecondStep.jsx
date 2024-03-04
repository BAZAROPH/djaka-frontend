import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as SecureStore from 'expo-secure-store'
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { resetUpdateMedicalInformation, updateMedicalInformation } from '../../../../store/actions';
import mime from 'mime';
import axios from 'axios';

import HiddableIncrementableInput from '../../../../components/common/inputs/hiddableincrementable/HiddableIncrementableInput'
import UploadFile from '../../../../components/common/inputs/uploadfile/UploadFile'
import NormalInput from '../../../../components/common/inputs/normalinputtext/NormalInput'
import NormalButton from '../../../../components/common/buttons/normalbutton/NormalButton';
import { COLORS } from '../../../../constants';
import SelectBoxPicker from '../../../../components/common/selectbox/SelectBoxPicker';
import Toast from '../../../../components/common/toast/Toast';

export default function SecondStep({ setActiveStep }) {
    const dispatch = useDispatch()
    const secondStepForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            allergies: [{ value: '', hidden: false }],
            medications: [{ value: '', hidden: false }],
            image: null,
            referring_doctor: { name: '', hidden: false },
            referring_doctor_contact: { value: '', hidden: false },
            last_diseases: [{ value: '', hidden: false }, { value: '', hidden: false }, { value: '', hidden: false }],
            last_vaccines: [{ value: '', hidden: false }, { value: '', hidden: false }, { value: '', hidden: false }],
            emergency_contacts: [{ name: '', contact: '', relation: 'Ami(e)' }],
            user: null
        },
        // validationSchema: Yup.object({
        //     referring_doctor_contact: Yup.object().shape({
        //         value: Yup.string().matches(/^[0-9]{10,}$/, 'Contact invalide'),
        //     }),
        //     emergency_contacts: Yup.array().of(
        //         Yup.object().shape({
        //             contact: Yup.string().matches(/^[0-9]{10,}$/, 'Contact invalide'),
        //         })
        //     )

        // }),
        onSubmit: async (values)=>{
            const data = new FormData();
            if(values.image != null){
                const file = {
                    uri:  values.image.file.uri,
                    type: mime.getType(values.image.file.uri),
                    name: values.image.file.uri.split("/").pop()
                }
                data.append('image', file);
            }
            data.append('allergies', JSON.stringify(values.allergies))
            data.append('medications', JSON.stringify(values.medications))
            data.append('diseases', JSON.stringify(values.last_diseases))
            data.append('vaccines', JSON.stringify(values.last_vaccines))
            data.append('referring_doctor', JSON.stringify(values.referring_doctor))
            data.append('referring_doctor_contact', JSON.stringify(values.referring_doctor_contact))
            data.append('emergency_contacts', JSON.stringify(values.emergency_contacts))
            data.append('user',values. user)
            dispatch(updateMedicalInformation(data));

            // await axios.post('http://192.168.1.4:8000/api/djaka/medical-informations/update', data, {
            //       headers: {
            //         'Content-Type': 'multipart/form-data',
            //       },
            // }).then((response)=>{
            //     console.log(response);
            // }).catch((error)=>console.log(error));
        }
    })

    const addEmergencyContact = ()=>{
        secondStepForm.setFieldValue('emergency_contacts', [...secondStepForm.values.emergency_contacts, { name: '', contact: '', relation: '' }]);
    }

    const saveReferringDoctorName = (value)=>{
        secondStepForm.setFieldValue('referring_doctor', { name: value ,hidden: secondStepForm.values.referring_doctor.hidden });
    }

    const saveReferringDoctorContact = (value)=>{
        secondStepForm.setFieldValue('referring_doctor_contact', { name: value ,hidden: secondStepForm.values.referring_doctor_contact.hidden });
    }

    const saveDiseaseName = (value, index)=>{
        secondStepForm.setFieldValue(`last_diseases[${index}].value`, value);
    }

    const saveDiseaseHidden = ()=>{
        secondStepForm.values.last_diseases.map((elt, index)=>{
            secondStepForm.setFieldValue(`last_diseases[${index}].hidden`, !elt.hidden);
        })
    }

    const saveVaccinesName = (value, index)=>{
        secondStepForm.setFieldValue(`last_vaccines[${index}].value`, value);
    }

    const saveVaccinesHidden = ()=>{
        secondStepForm.values.last_vaccines.map((elt, index)=>{
            secondStepForm.setFieldValue(`last_vaccines[${index}].hidden`, !elt.hidden);
        })
    }

    const saveEmergencyContactName = (value, index)=>{
        secondStepForm.setFieldValue(`emergency_contacts[${index}].name`, value);
    }

    const saveEmergencyContactContact = (value, index)=>{
        secondStepForm.setFieldValue(`emergency_contacts[${index}].contact`, value);
    }

    const saveEmergencyContactRelation = (value, index)=>{
        secondStepForm.setFieldValue(`emergency_contacts[${index}].relation`, value);
    }

    const getRegisteredUser = async ()=>{
        let user = await SecureStore.getItemAsync('registerUser');
        if(user){
            user =  JSON.parse(user);
            secondStepForm.setFieldValue('user', user.id)
        }
    }
    
    useEffect(() => {
        getRegisteredUser()
    }, [])

    const selecteUpdateMedicalInformationLayoutState = (state) => state.updateMedicalInformationReducer;
    const selecteUpdateMedicalInformationLayoutProperties = createSelector(selecteUpdateMedicalInformationLayoutState, (state)=>({
        updateMedicalInformationLoading: state.updateMedicalInformationLoading,
        medicalInformations: state.medicalInformations,
        updateMedicalInformationError: state.updateMedicalInformationError
    }))
    const {updateMedicalInformationLoading, medicalInformations, updateMedicalInformationError} = useSelector(selecteUpdateMedicalInformationLayoutProperties)

    useEffect(() => {
        if (medicalInformations) {
            dispatch(resetUpdateMedicalInformation())
            setActiveStep(4)
        }
    }, [updateMedicalInformationLoading, medicalInformations, updateMedicalInformationError])
    
    return (
        <SafeAreaView style={{
            gap: 10,
        }}>
            {
                updateMedicalInformationError && (
                    <Toast text={updateMedicalInformationError} duration={3000} backgroundColor={'red'} />
                )
            }
            <View>
                <Text style={style.label}>Ajouter des allergies</Text>
                <HiddableIncrementableInput style={{ marginTop: 2 }} fields={secondStepForm.values.allergies} setFields={secondStepForm.setFieldValue} field='allergies' placeholder='Ajouter des problèmes de santé actuel'/>
            </View>

            <View>
                <Text style={style.label}>Ajouter vos actuelles médications</Text>
                <HiddableIncrementableInput style={{ marginTop: 2 }} fields={secondStepForm.values.medications} setFields={secondStepForm.setFieldValue} field={'medications'} placeholder='Ajouter vos actuelles médications'/>
            </View>

            <View>
                <UploadFile image={secondStepForm.values.image} setImage={secondStepForm.setFieldValue} field='image'/>
            </View>

            <View>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <Text style={[style.label, { width: '50%' } ]}>Médecin traitant</Text>
                    <View style={{ flex:1, flexDirection: 'row', alignItems:'center', gap: 7}}> 
                        <Checkbox 
                            value={secondStepForm.values.referring_doctor.hidden}
                            onValueChange={()=>secondStepForm.setFieldValue('referring_doctor', { name: secondStepForm.values.referring_doctor.name, hidden: !secondStepForm.values.referring_doctor.hidden })}
                            style={{ borderRadius: 100, height: 15, width: 15, borderColor: 'white', borderWidth: 1 }} 
                            color={secondStepForm.values.referring_doctor.hidden ? COLORS.secondary : undefined}
                        />
                        <Text style={[style.label, {fontFamily: 'montserrat-light'}]}>Cacher</Text>
                    </View>
                </View>
                <NormalInput style={{ marginTop: 2}} placeholder='Nom du médecin traitant' variant='form' value={secondStepForm.values.referring_doctor.name} onChange={saveReferringDoctorName}/>
            </View>

            <View>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <Text style={[style.label, { width: '50%' } ]}>Contact du médecin</Text>
                    <View style={{ flex:1, flexDirection: 'row', alignItems:'center', gap: 7}}> 
                        <Checkbox 
                            value={secondStepForm.values.referring_doctor_contact.hidden}
                            onValueChange={()=>secondStepForm.setFieldValue('referring_doctor_contact', { name: secondStepForm.values.referring_doctor_contact.name, hidden: !secondStepForm.values.referring_doctor_contact.hidden })}
                            style={{ borderRadius: 100, height: 15, width: 15, borderColor: 'white', borderWidth: 1 }} 
                            color={secondStepForm.values.referring_doctor_contact.hidden ? COLORS.secondary : undefined}
                        />
                        <Text style={[style.label, {fontFamily: 'montserrat-light'}]}>Cacher</Text>
                    </View>
                </View>
                <NormalInput 
                    style={{ marginTop: 2}}
                    placeholder='Contact du médecin traitant' 
                    variant='form' 
                    value={secondStepForm.values.referring_doctor_contact.name} 
                    onChange={saveReferringDoctorContact} 
                    error={(secondStepForm.touched.referring_doctor_contact && secondStepForm.errors.referring_doctor_contact) && firstStepForm.errors.last_name}
                    onBlur={secondStepForm.handleBlur('referring_doctor_contact')}
                    keyboardType='phone-pad'
                />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                <View style={{ width: '48%', gap: 7}}>
                    <Text style={[style.label, {fontSize: 12}]}>Les 3 dernières maladies</Text>
                    <NormalInput placeholder='Maladie 1' variant='form' value={secondStepForm.values.last_diseases[0].value} onChange={saveDiseaseName} index={0}/>
                    <NormalInput placeholder='Maladie 2' variant='form' value={secondStepForm.values.last_diseases[1].value} onChange={saveDiseaseName} index={1}/>
                    <NormalInput placeholder='Maladie 3' variant='form' value={secondStepForm.values.last_diseases[2].value} onChange={saveDiseaseName} index={2}/>
                    <View style={{ flex:1, flexDirection: 'row', alignItems:'center', gap: 7}}> 
                        <Checkbox 
                            value={secondStepForm.values.last_diseases[0].hidden}
                            onValueChange={saveDiseaseHidden}
                            style={{ borderRadius: 100, height: 15, width: 15, borderColor: 'white', borderWidth: 1 }} 
                            color={secondStepForm.values.last_diseases[0].hidden ? COLORS.secondary : undefined}
                        />
                        <Text style={[style.label, {fontFamily: 'montserrat-light'}]}>Cacher</Text>
                    </View>
                </View>

                <View style={{ width: '48%', gap: 7}}>
                    <Text style={[style.label, {fontSize: 12}]}>Les 3 derniers vaccins</Text>
                    <NormalInput placeholder='Vaccin 1' variant='form' value={secondStepForm.values.last_vaccines[0].value} onChange={saveVaccinesName} index={0}/>
                    <NormalInput placeholder='Vaccin 2' variant='form' value={secondStepForm.values.last_vaccines[1].value} onChange={saveVaccinesName} index={1}/>
                    <NormalInput placeholder='Vaccin 3' variant='form' value={secondStepForm.values.last_vaccines[2].value} onChange={saveVaccinesName} index={2}/>
                    <View style={{ flex:1, flexDirection: 'row', alignItems:'center', gap: 7}}> 
                        <Checkbox 
                            value={secondStepForm.values.last_vaccines[0].hidden}
                            onValueChange={saveVaccinesHidden}
                            style={{ borderRadius: 100, height: 15, width: 15, borderColor: 'white', borderWidth: 1 }} 
                            color={secondStepForm.values.last_vaccines[0].hidden ? COLORS.secondary : undefined}
                        />
                        <Text style={[style.label, {fontFamily: 'montserrat-light'}]}>Cacher</Text>
                    </View>
                </View>
            </View>
            
            <View>
                <Text style={[style.label, { marginBottom: 4}]}>Personnes à contacter en cas d’urgences</Text>
                {
                    secondStepForm.values.emergency_contacts.map((value, index)=>{
                        return (
                            <View key={index} style={{ marginBottom: 10}}>
                                <NormalInput placeholder='Nom de la personne à contacter en cas d’urgences' variant='form' onChange={saveEmergencyContactName} value={secondStepForm.values.emergency_contacts[index].name} index={index}/>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                                    <NormalInput value={'+225'} variant='form' editable={false} width='20%' index={index}/>
                                    <View style={{ width: '75%', alignItems: 'flex-end'}}>
                                        <NormalInput placeholder='numéro de téléphone' variant='form' width='100%' onChange={saveEmergencyContactContact} value={secondStepForm.values.emergency_contacts[index].contact} index={index}  keyboardType='phone-pad'/>
                                        <SelectBoxPicker options={['Ami(e)', 'Famille', 'Conjoint']} selected={secondStepForm.values.emergency_contacts[index].relation} element_index={index} style={{ marginTop: 4, width: '100%'}} setSelected={saveEmergencyContactRelation}/>
                                        <TouchableOpacity 
                                            style={{ backgroundColor: '#53B0FF', paddingHorizontal: 10, paddingVertical: 5, borderBottomLeftRadius: 10, marginTop: 5 }}
                                            onPress={addEmergencyContact}
                                        >
                                            <Text style={[style.label]}>Ajouter</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
            
            <View style={{ alignItems: 'center' }}>
                <NormalButton width='40%' title='Suivant' style={{ textAlign: 'center'}} onClick={()=>{secondStepForm.handleSubmit()}} loading={updateMedicalInformationLoading}/>
            </View>
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