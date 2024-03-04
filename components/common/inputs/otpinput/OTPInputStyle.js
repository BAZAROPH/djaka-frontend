import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
    OTPInput: (length=5)=>({
        height: 60,
        width: `${(100/length)-4}%`,
        borderWidth: 2,
        borderRadius: 10,
        // borderColor: COLORS.secondary,
        borderColor: length === 5 ? '#53B0FF' : COLORS.secondary,
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        fontFamily: 'montserrat-light'
    }),
    error: {
        color: COLORS.error,
        textAlign:'center',
        marginBottom: 10
    }
})