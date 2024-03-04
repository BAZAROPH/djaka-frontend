import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

export const styles = StyleSheet.create({
    box: { 
        width: '70%', 
        position: 'relative', 
        backgroundColor: '#53B0FF',
        height: 35,
        flex: 1,
        justifyContent: 'center' 
    },
    text: { 
        fontFamily: 'montserrat-bold',
        color: 'white',
        textAlign: 'center',
    },
    image: {
        height: 18,
        width: 18,
        position: 'absolute',
        left: 10
    }

})