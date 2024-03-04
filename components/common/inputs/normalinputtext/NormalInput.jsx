import { View, Text, TextInput } from 'react-native'
import React from 'react'

import { styles } from './NormalInputStyle'
import { COLORS } from '../../../../constants'

export default function NormalInput({onChange, index, value, placeholder, width, style, editable=true, inputStyle, variant='normal', keyboardType='default', error=null, onBlur }) {
    return (
        <View style={[{...style}, { width: width }]}>
            <TextInput 
                style={[styles.input(variant, editable), {...inputStyle}, error && { borderColor: COLORS.error}]} 
                placeholder={placeholder} 
                placeholderTextColor={'white'} 
                selectionColor={'white'} 
                onChangeText={(text)=>onChange(text, index)}
                value={value}
                editable={editable}
                keyboardType={keyboardType}
                onBlur={onBlur}
            />
            {
                error && (
                    <Text style={styles.error}>{error}</Text>
                )
            }
        </View>
    )
}
