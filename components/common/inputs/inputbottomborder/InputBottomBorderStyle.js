import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
    input: (variant=null) => ({
        borderBottomWidth: 2,
        borderColor: variant === 'secondary' ? COLORS.secondary : '#cccccc',
        color: variant === 'secondary' ? 'white' : '#cccccc',
        height: 35,
        fontFamily: 'montserrat-light'
    }),
    error: {
        color: COLORS.error
    }
})