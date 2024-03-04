import { View, Text, Image } from 'react-native'
import React from 'react'
import { styles } from './NotificationBoxStyle'
export default function NotificationBox({date, notification, style, width}) {
    return (
        <View>
            <View style={styles.notificationBox}>
                <View style={styles.blueLine} />
                <View style={styles.notification}>
                    <Text style={{color: 'black', textAlignVertical: 'center', fontSize: 18}}>{notification}</Text>
                </View>
            </View>
            <View style={{marginTop: 4}}>
                <Text style={{textAlign: 'right', fontWeight: '300'}}>{date}</Text>
            </View>
        </View>
    )
}