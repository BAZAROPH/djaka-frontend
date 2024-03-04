import React from 'react'
import { View, Text, TextInput } from 'react-native'

import { styles } from './InputBottomBorderStyle.js'
import { COLORS } from '../../../../constants/theme.js'

export default function InputBottomBorder({placeholder, index, onChange, value, width, style, error=null, onBlur, variant, editable=true, keyboardType='default'}) {
    return (
        <View>
            <TextInput 
                style={[
                    styles.input(variant), 
                    { ...style },
                    width && {width: width},
                ]} 
                placeholder={placeholder} 
                onChangeText={(text)=>onChange(text, index)}
                value={value} 
                selectionColor={variant && variant === 'secondary' && COLORS.secondary}
                placeholderTextColor={variant && variant === 'secondary' && COLORS.secondary}
                onBlur={onBlur}
                editable={editable}
                keyboardType={keyboardType}
            />
            {error && (
                <View style={{ height: 20}}>
                    <Text style={[styles.error, { paddingTop: 2}]}>{error}</Text>
                </View>
            )}

            {/* {
                error && (
                    <Text style={styles.error}>{error}</Text>
                )
            } */}
    </View>
    )
} 