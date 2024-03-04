import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
    input: (variant, editable)=>({
        borderWidth: 1,
        borderColor: variant === 'form' ? '#53B0FF' : COLORS.secondary,
        color: 'white',
        height: 35,
        paddingHorizontal: 7,
        fontFamily: 'montserrat-light',
        fontSize: variant === 'form' ? 13 : 15,
        backgroundColor: !editable ? '#53B0FF' : 'transparent',
    }),
    icon: {
        height: 20,
        width: 20
    },

    error: {
        color: COLORS.error
    }
})