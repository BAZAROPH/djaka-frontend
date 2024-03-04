import React, { useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker';

import FromBottomModal from '../modal/FromBottomModal'
import { styles } from './SelectBoxPickerStyle'
import { COLORS, icons } from '../../../constants'

export default function SelectBoxPicker({options, selected, setSelected, style, element_index=null, variant, error, disabled=false}) {
    const [ showModal, setShowModal ] = useState(false);
    const showModalToggle = ()=>{
        setShowModal(!showModal)
    }
    return (
        <>
            {
                variant === 'border' ? (
                    <>
                        <Pressable disabled={disabled} style={[styles.border, {...style}, disabled && { backgroundColor: disabled ? '#53B0FF' : 'transparent' }]} onPress={showModalToggle}>
                            <Text style={{fontSize: 15}}>{selected}</Text>
                            <Image source={icons.arrowGray} style={[styles.icon, { height: 12, width: 12}]}/>
                        </Pressable>
                        {
                            error && (
                                <Text style={{color: COLORS.error}}>{error}</Text>
                            )
                        }
                    </>
                ):(
                    <>
                        <Pressable disabled={disabled} style={[styles.box, {...style}, disabled && { backgroundColor: disabled ? '#53B0FF' : 'transparent' }]} onPress={showModalToggle}>
                            <Text style={styles.selected}>{selected}</Text>
                            <Image source={icons.bottomArrow} style={styles.icon}/>
                        </Pressable>
                        {
                            error && (
                                <Text style={{color: COLORS.error}}>{error}</Text>
                            )
                        }
                    </>
                )
            }
            <FromBottomModal modalVisible={showModal} setModalVisible={setShowModal}>
                <Picker
                    selectedValue={selected}
                    onValueChange={(value, index)=>{
                        setSelected(value, element_index)
                    }}
                >
                    {
                        options?.map((value, index)=>(
                            <Picker.Item key={index} label={value} value={value} />
                        ))
                    }
                </Picker>
            </FromBottomModal>
        </>
    )
}