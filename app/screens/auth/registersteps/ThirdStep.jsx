import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from 'yup'
import * as SecureStore from 'expo-secure-store'


import NormalInput from "../../../../components/common/inputs/normalinputtext/NormalInput";
import NormalButton from "../../../../components/common/buttons/normalbutton/NormalButton";
import SelectBoxPicker from "../../../../components/common/selectbox/SelectBoxPicker";
import { COLORS } from "../../../../constants";
import Toast from "../../../../components/common/toast/Toast";

import { getCountries, getCities, getTowns, updateMedicalInformation, resetUpdateMedicalInformation } from "../../../../store/actions";

export default function ThirdStep() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [ countriesOptions, setCountriesOptions ] = useState([]);
    const [ citiesOptions, setCitiesOptions ] = useState([]);
    const [ townsOptions, setTownsOptions ] = useState([]);
    const [saveCities, setSaveCities] = useState(null)



    const selectLayoutCountriesState = (state) => state.getCountriesReducer;
    const selectLayoutCountriesProperties = createSelector(selectLayoutCountriesState, (state) => ({
        getCountriesLoading: state.getCountriesLoading,
        countries: state.countries,
        getCountriesError: state.getCountriesError,
    }));
    const { getCountriesLoading, countries, getCountriesError } = useSelector(selectLayoutCountriesProperties);


    const selectLayoutCitiesState = (state) => state.getCitiesReducer;
    const selectLayoutCitiesProperties = createSelector(selectLayoutCitiesState, (state)=>({
        getCitiesLoading: state.getCitiesLoading,
        cities: state.cities,
        getCitiesError: state.getCitiesError
    }))
    const { getCitiesLoading, cities, getCitiesError } = useSelector(selectLayoutCitiesProperties)

    const selectLayoutTownState =  (state) => state.getTownReducer;
    const selectLayoutTownsProperties = createSelector(selectLayoutTownState, (state)=>({
        getTownLoading: state.getTownLoading,
        towns: state.towns,
        getTownError: state.getTownError,
    }))
    const { getTownLoading, towns, getTownError } = useSelector(selectLayoutTownsProperties)

    const selecteUpdateMedicalInformationLayoutState = (state) => state.updateMedicalInformationReducer;
    const selecteUpdateMedicalInformationLayoutProperties = createSelector(selecteUpdateMedicalInformationLayoutState, (state)=>({
        updateMedicalInformationLoading: state.updateMedicalInformationLoading,
        medicalInformations: state.medicalInformations,
        updateMedicalInformationError: state.updateMedicalInformationError
    }))
    const {updateMedicalInformationLoading, medicalInformations, updateMedicalInformationError} = useSelector(selecteUpdateMedicalInformationLayoutProperties)

    const thirdStepForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            cmu: '',
            nationality: {
                value: '',
                hidden: false
            },
            country: '',
            city: '',
            town: '',
            district: '',
            user: null
        },
        validationSchema: Yup.object({
            cmu: Yup.string().matches(/[0-9]/, 'Numéro CMU invalide'),
        }),
        onSubmit: (values)=>{
            const data = new FormData()
            data.append('insurance', JSON.stringify({name: '', number: values.cmu, date: ''}))
            data.append('nationality', JSON.stringify(values.nationality))
            data.append('country', countries.find((elt)=>elt.name===values.country).id)
            data.append('city', saveCities.find((elt)=>elt.name===values.city).id)
            data.append('town', towns.find((elt)=>elt.name===values.town).id)
            data.append('district', values.district)
            data.append('user', values.user)

            dispatch(updateMedicalInformation(data));
        }
    })

    const saveNationalityName = (value)=>{
        thirdStepForm.setFieldValue('nationality.value', value)
    }

    const saveNationalityHidden = ()=>{
        thirdStepForm.setFieldValue('nationality.hidden', !thirdStepForm.values.nationality.hidden)
    }

    const saveCountry = (selected)=>{
        thirdStepForm.setFieldValue('country', selected);
    }
    
    const saveCity = (selected)=>{
        thirdStepForm.setFieldValue('city', selected);
    }
    
    const saveTown = (selected)=>{
        thirdStepForm.setFieldValue('town', selected);
    }

    const getRegisteredUser = async ()=>{
        let user = await SecureStore.getItemAsync('registerUser');
        if(user){
            user =  JSON.parse(user);
            thirdStepForm.setFieldValue('user', user.id)
        }
    }

    useEffect(() => {
        getRegisteredUser()

        dispatch(getCountries());
        dispatch(getCities());
        dispatch(getTowns());
    }, []);

    useEffect(() => {
        if(countries){
            setCountriesOptions(countries.map((country)=>country.name))
            thirdStepForm.setFieldValue('country', countries[0].name)
        }
    }, [getCountriesLoading, countries, getCountriesError]);

    useEffect(() => {
        if(cities){
            setCitiesOptions(cities.map((city) => city.name));
            thirdStepForm.setFieldValue('city', cities[0].name)
            setSaveCities(cities)
        }
    }, [getCitiesLoading, cities, getCitiesError]);

    useEffect(() => {
        if(towns){
            setTownsOptions(towns.map((town) => town.name));
            thirdStepForm.setFieldValue('town', towns[0].name)
        }
    }, [ getTownLoading, towns, getTownError ]);

    useEffect(() => {
        if (medicalInformations) {
            dispatch(resetUpdateMedicalInformation());
            SecureStore.deleteItemAsync('registerUser');
            SecureStore.deleteItemAsync('password');
            router.push('/screens/auth/Login')
        }
    }, [updateMedicalInformationLoading, medicalInformations, updateMedicalInformationError])
    

    return (getCountriesLoading || getCitiesLoading) ? (
        <ActivityIndicator color={'#ffff'} size={'large'} />
    ) : (
        <SafeAreaView
            style={{
                gap: 10,
            }}
        >
            {
                updateMedicalInformationError && (
                    <Toast text={updateMedicalInformationError} duration={3000} backgroundColor={'red'} />
                )
            }

            <View style={{ gap: 5 }}>
                <Text style={[style.label, { fontSize: 12 }]}>Numéro CMU</Text>
                <NormalInput 
                    placeholder="- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -" 
                    onChange={thirdStepForm.handleChange('cmu')} 
                    value={thirdStepForm.values.cmu || ''}
                    error={(thirdStepForm.touched.cmu && thirdStepForm.errors.cmu) && thirdStepForm.errors.cmu} 
                    onBlur={thirdStepForm.handleBlur('cmu')}
                />
            </View>

            <View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={[style.label, { width: "50%" }]}>Nationalité</Text>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 7 }}>
                        <Checkbox
                            value={thirdStepForm.values.nationality.hidden}
                            onValueChange={saveNationalityHidden}
                            style={{ borderRadius: 100, height: 15, width: 15, borderColor: "white", borderWidth: 1 }}
                            color={thirdStepForm.values.nationality.hidden ? COLORS.secondary : undefined}
                        />
                        <Text style={[style.label, { fontFamily: "montserrat-light" }]}>Cacher</Text>
                    </View>
                </View>
                <NormalInput 
                    style={{ marginTop: 2 }} 
                    placeholder="Nationalité" 
                    variant="form" 
                    onChange={saveNationalityName} 
                    value={thirdStepForm.values.nationality.value || ''}
                />
            </View>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ width: "48%", gap: 5 }}>
                    <Text style={[style.label]}>Pays</Text>
                    <SelectBoxPicker options={countriesOptions} selected={thirdStepForm.values.country} setSelected={saveCountry} />
                </View>

                <View style={{ width: "48%", gap: 5 }}>
                    <Text style={[style.label, { fontSize: 12 }]}>Ville</Text>
                    <SelectBoxPicker options={citiesOptions} selected={thirdStepForm.values.city} setSelected={saveCity} />
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ width: "48%", gap: 5 }}>
                    <Text style={[style.label]}>Commune</Text>
                    <SelectBoxPicker options={townsOptions} selected={thirdStepForm.values.town} setSelected={saveTown} />
                </View>

                <View style={{ width: "48%", gap: 5 }}>
                    <Text style={[style.label, { fontSize: 12 }]}>Quartier</Text>
                    <NormalInput 
                        style={{ marginTop: 2 }} 
                        placeholder="Quartier" 
                        variant="form" 
                        onChange={thirdStepForm.handleChange('district')} 
                        value={thirdStepForm.values.district || ''}
                        error={(thirdStepForm.touched.district && thirdStepForm.errors.district) && thirdStepForm.errors.district} 
                        onBlur={thirdStepForm.handleBlur('district')}
                    />
                </View>
            </View>

            <View style={{ alignItems: "center", marginTop: "15%" }}>
                <NormalButton width="40%" color="tertiary" title="Valider" style={{ textAlign: "center", borderColor: COLORS.tertiary }} onClick={() => thirdStepForm.handleSubmit()} />
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    label: {
        fontFamily: "montserrat-bold",
        color: "white",
        fontSize: 15,
    },
});
