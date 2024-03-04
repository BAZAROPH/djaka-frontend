import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './NormalButtonStyle'

export default function NormalButton({ color, style, title, onClick, width, textStyle, loading=false }) {
    return (
        <TouchableOpacity 
            style={[
                styles.button(color), 
                {width: width}, { ...style }, 
                loading && {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5
            }]} 
            onPress={onClick} 
            disabled={loading}>
            <Text style={[styles.buttonText, { ...textStyle }]}>{title}</Text>
            {
               loading && <ActivityIndicator size={'small'} color={'white'}/>
            }
        </TouchableOpacity>
    )
}