import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
    input: (variant, editable)=>(
        {
            borderWidth: 1,
            borderColor: variant === 'form' ? '#53B0FF' : COLORS.secondary,
            paddingHorizontal: 7,
            height: 35,
            color: 'white',
            fontFamily: 'montserrat-light',
            fontSize: variant === 'form' ? 13 : 15,
            backgroundColor: !editable ? '#53B0FF' : 'transparent',
        }
    ),
    error: {
        color: COLORS.error
    }
})