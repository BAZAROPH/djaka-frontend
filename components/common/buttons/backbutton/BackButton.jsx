import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './BackButtonStyle'
import { icons } from '../../../../constants'

export default function BackButton({ color, style, onClick }) {
    return (
        <TouchableOpacity style={[{...style}]} onPress={onClick}>
            <Image source={color==='black' ? icons.arrowBlack : icons.arrowWhite} style={styles.button}/>
        </TouchableOpacity>
    )
}