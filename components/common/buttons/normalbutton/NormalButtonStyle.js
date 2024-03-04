import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants'

export const styles = StyleSheet.create({
    button: (color) => (
        {
            backgroundColor: color === 'transparent' ? 'transparent' : color === 'tertiary' ? COLORS.tertiary : COLORS.secondary,
            borderRadius: 2,
            padding: 12,
            borderWidth: 0.5,
            borderColor: '#58BAFF',
        }
    ),
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'montserrat-bold'
    }
})