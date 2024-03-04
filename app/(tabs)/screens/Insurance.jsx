import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import Checkbox from 'expo-checkbox';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { getMedicalInformation } from '../../../store/actions';

import Card from '../../../components/common/card/Card';
import { COLORS, STYLES,images } from '../../../constants'
import RoundButton from '../../../components/common/buttons/roundbutton/RoundButton';
import InputBottomBorder from "../../../components/common/inputs/inputbottomborder/InputBottomBorder";
import Header from '../../../components/header/Header';

export default function Insurance() {

    const [checkHidden, setCheckHidden] = useState(false)
    const dispatch = useDispatch();

    const insuranceRegist = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            number: '',
            
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vous devez renseigner le nom'),
            number: Yup.string().required('Vous devez renseigner le numéro'),
            
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const selectLayoutInsuranceState = (state)=> state.getMedicalInformationsReducer;
    const selectLayoutInsuranceProperties = createSelector(selectLayoutInsuranceState, (state)=>({
        getMedicalInformationsLoading: state.getMedicalInformationsLoading,
        medicalInformations: state.medicalInformations,
        getMedicalInformationsError: state.getMedicalInformationsError,
    }));

    const { getMedicalInformationsLoading, medicalInformations, getMedicalInformationsError } = useSelector(selectLayoutInsuranceProperties);

    useEffect(() => {
        dispatch(getMedicalInformation());
    }, [])
    

    useEffect(() => {
        console.log(getMedicalInformationsLoading, medicalInformations, getMedicalInformationsError);
    }, [ getMedicalInformationsLoading, medicalInformations, getMedicalInformationsError ])
    
   return (
      <SafeAreaView style={STYLES.container}>
         <ImageBackground source={images.emergencyfont} resizeMode='cover' style={{height: '100%', width: '100%'}}>
               <Header backgroundImage={images.emergency} lightText='Informations' boldText="d'assurance"/>

               <View 
                  style={{ 
                     flex: 1, 
                     justifyContent: 'center', 
                     alignItems: 'center',
                  }}>

                     <Card 
                        style={{
                           width: '90%', 
                           height: '100%', 
                           padding: 20, 
                           }}>

                        <ScrollView 
                           style={{
                              height: '65%',
                           }}
                           showsVerticalScrollIndicator={false}>

                           <View>
                              <Text style={style.label}>nom de la compagnie d'assurance</Text>
                              <InputBottomBorder 
                                 placeholder="IMAC Assurances" 
                                 style={style.inputValue} 
                                 onChange={insuranceRegist.handleChange('name')} 
                                 value={insuranceRegist.values.name || ''}
                                 error={(insuranceRegist.touched.name)} 
                                 onBlur={insuranceRegist.handleBlur('name')}
                                 
                                 />

                                    {insuranceRegist.touched.name && insuranceRegist.errors.name && (
                                         <Text style={{color: COLORS.error}}>{insuranceRegist.errors.name}</Text>
                                    )}
                           </View>

                           <View style={{marginTop: 20}}>
                              <Text style={style.label}>Numéro de la police d’assurance</Text>
                              <InputBottomBorder 
                                 placeholder="124-5176-3648"
                                 style={style.inputValue} 
                                 onChange={insuranceRegist.handleChange('number')} 
                                 value={insuranceRegist.values.number || ''}
                                 onBlur={insuranceRegist.handleBlur('number')}
                                 error={(insuranceRegist.touched.number)}

                              />

                                 {insuranceRegist.touched.number && insuranceRegist.errors.number && (
                                    <Text style={{color: COLORS.error}}>{insuranceRegist.errors.number}</Text>
                                 )}
                              
                           </View>

                           <View style={{marginTop: 20}}>
                              <Text style={style.label}>Date d’expiration</Text>
                              <Text style={[style.inputValue,{fontFamily: 'montserrat-light', marginTop: 5}]}>14 | 04 | 2025</Text>
                           </View>

                           <View 
                              style={{
                                 marginTop: 25, 
                                 flexDirection: 'row', 
                                 alignItems:'center', 
                                 gap: 7
                              }}
                           > 
                              <Checkbox 
                                 value={checkHidden}
                                 onValueChange={setCheckHidden}
                                 style={{ borderRadius: 100, height: 15, width: 15, borderColor: '#313131', borderWidth: 1 }} 
                                 color={checkHidden ? COLORS.secondary : undefined}
                              />
                              <Text 
                                 style={{
                                    fontFamily: 'montserrat-light',
                                    color: '#313131',
                                    fontSize: 15}}>Cacher
                              </Text>
                           </View>

                           <View 
                              style={{
                                 left: 40, 
                                 width: '70%',
                                 backgroundColor: 'white', 
                                 top: 35, 
                                 zIndex: 1
                              }}
                              >
                              <Text 
                                 style={{
                                    fontFamily: 'montserrat-bold', 
                                    fontSize: 14, textAlign: 'center'
                                 }}
                              >
                                 Vos données d'assurance
                              </Text>  
                           </View>

                           <View style={{marginTop: 25, borderWidth: 2, borderColor: COLORS.lightBlue, padding: 15, gap: 15}}>
                              <Text>IMAC Assurances</Text>
                              <Text>Numéro de la police d’assurance: 124-5176-3648</Text>
                              <Text>Date d’expiration: 14/04/2025</Text>
                           </View>


                           <View
                              style={{	
                                 alignItems: 'center',
                                 marginTop: 30
                              }}
                           >
                                 
                              <RoundButton 
                                 style={{
                                    alignItems: 'center'
                                 }}
                                 title="Mettre à jour" width="50%" />

                           </View>

                        </ScrollView>

                     </Card>
               </View>
         </ImageBackground>
      </SafeAreaView>
   )
}


const style = StyleSheet.create({

   inputValue:{
      color: "#000",
      fontSize: 16
   },

   label:{
      textTransform: 'capitalize', 
      fontFamily: "montserrat-light", 
      fontSize: 12
   }
});