import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
    container: {

    },
    notificationBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        maxHeight: 60,
        width: '100%',
    },
    blueLine: {
        width: '3%',
        backgroundColor: COLORS.lightBlue,
        height: '100%',
        borderRadius: 3
    },
    notification: {
        backgroundColor: 'rgba(217, 217, 217, 0.15)',
        height: '100%',
        width: '97%',
        justifyContent:'center' ,
        alignItems: 'left',
        paddingLeft: 10,
        borderRadius: 5
    },
    date: {
        textAlign: 'right',
    }
});