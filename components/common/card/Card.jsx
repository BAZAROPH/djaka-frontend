import { View, Text } from 'react-native'
import React from 'react'

import { styles } from './CardStyle'

export default function Card({ children, style }) {
  return (
    <View style={[styles.card, {...style}]}>
        { children }
    </View>
  )
}