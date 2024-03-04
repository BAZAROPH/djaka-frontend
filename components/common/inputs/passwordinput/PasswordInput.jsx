import React, { useState } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native'

import { styles } from './PasswordInputStyle';
import { COLORS, icons } from '../../../../constants';

export default function PasswordInput({ onChange, value, placeholder, width, style, variant='normal', onBlur, error=null, editable=true }) {
    const [ hiddePassword, setHiddePassword ] = useState(true);
    const displayPasswordToggle = ()=>{
        setHiddePassword(!hiddePassword);
    }
    return (
        <>
            <View style={[{...style}, styles.input(variant, editable) , { width: width }, error && { borderColor: COLORS.error}]}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4}}>
                    <TextInput 
                        style={[{width: '90%', color: 'white'}]} 
                        placeholder={placeholder} 
                        placeholderTextColor={'white'} 
                        selectionColor='white'
                        secureTextEntry={ hiddePassword }
                        onChangeText={(text)=>onChange(text)}
                        value={value}
                        onBlur={onBlur}
                        editable={editable}
                    />
                    <TouchableOpacity onPress={displayPasswordToggle}>
                        <Image source={hiddePassword ? icons.eyehidde : icons.eye} resizeMode='contain' style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                
            </View>
            {
                error && (
                    <Text style={styles.error}>{error}</Text>
                )
            }
        </>
    )
}
