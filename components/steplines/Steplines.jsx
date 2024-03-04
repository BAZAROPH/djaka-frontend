import { View, Text } from 'react-native'
import React from 'react'

import { styles } from './SteplinesStyles';

export default function Steplines({ steplines, activeStep, width, style }) {
    return (
        <View style={[ styles.box, { width: width } ]}>
            { 
                steplines.map((step, index)=>{
                    return <View key={index} style={[ styles.step(steplines.length, step, activeStep), { ...style } ]} />   
                })
            }
        </View>
    )
}