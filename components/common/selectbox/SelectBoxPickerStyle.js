import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
    box: {
        height: 35,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    icon: { 
        height: 10, 
        width: 10,
    },
    selected: {
        color: 'white',
        fontSize: 13
    },
    border: {
        borderBottomWidth: 2,
        borderColor:'#cccccc',
        color: '#cccccc',
        height: 35,
        fontFamily: 'montserrat-light',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    }
})