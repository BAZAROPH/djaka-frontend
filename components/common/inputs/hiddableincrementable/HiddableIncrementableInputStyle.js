import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8
    },
    iconBox: {
        gap: 2,
    },
    icon:{
        width: 15,
        height: 15,
    },
    hiddeBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        gap: 10
    },
    hiddeText: {
        color: 'white',
        fontFamily: 'montserrat-light',
    },
    checkbox: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white',
        height: 15,
        width: 15,
    }
})