import React, { useState } from 'react'
import { Pressable, Text, Platform, DateP } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import FromBottomModal from '../../modal/FromBottomModal';
import { COLORS } from '../../../../constants';

export default function Datepicker({ value, setValue, error, disabled=false }) {
    const [showPicker, setShowPicker] = useState(false);
    const savePickerValue = (event, value)=>{
        if(value){
            setValue(value);
            setShowPicker(Platform.OS === 'ios'); 
        }
    }

    const showPickerToggle = ()=>{
        setShowPicker(!showPicker)
    }

    return (
        <>
            {
                Platform.OS == 'ios' ? (
                   <>
                     <Pressable
                        disabled={disabled}
                        style={{
                            borderWidth: 1,
                            height: 35,
                            marginTop: 2,
                            flex: 1,
                            justifyContent: 'center',
                            borderColor: '#53B0FF',
                            backgroundColor: disabled ? '#53B0FF' : 'transparent',
                        }}
                        onPress={()=>showPickerToggle()}
                    >
                        
                        <Text style={{ color: 'white', paddingLeft: 10, fontSize: 13 }}> {value ? moment(value).format('DD/MM/YYYY') : ' jj / mm / aaaa '} </Text>
                    </Pressable>
                    <FromBottomModal modalVisible={showPicker} setModalVisible={setShowPicker}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={value}
                            mode="date"
                            display="spinner"
                            onChange={savePickerValue}
                        />
                    </FromBottomModal>
                    {
                        error && (
                            <Text style={{color: COLORS.error}}>{error}</Text>
                        )
                    }
                   </>
                ) : (
                    <>
                        <Pressable
                            disabled={disabled}
                            style={{
                                borderWidth: 1,
                                height: 35,
                                marginTop: 2,
                                flex: 1,
                                justifyContent: 'center',
                                borderColor: '#53B0FF',
                                backgroundColor: disabled ? '#53B0FF' : 'transparent',
                            }}
                            onPress={()=>showPickerToggle()}
                        >
                            
                            <Text style={{ color: 'white', paddingLeft: 10, fontSize: 13 }}> {value ? moment(value).format('DD/MM/YYYY') : ' jj / mm / aaaa '} </Text>
                        </Pressable>
                        {
                            showPicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={value}
                                    mode="date"
                                    display="default"
                                    onChange={savePickerValue}
                                />
                        )}

                        {
                            error && (
                                <Text style={{color: COLORS.error}}>{error}</Text>
                            )
                        }
                    </>
                )
            }
        </>
    )
}