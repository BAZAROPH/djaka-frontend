import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './RoundButtonStyle';
import { COLORS, icons } from '../../../../constants';

export default function RoundButton({ style, title, onClick, icon, iconPlace, width }) {
    return (
        <TouchableOpacity style={{width: width}} onPress={onClick}>
            <LinearGradient
                style={[styles.button, {...style}, {height: 30}]}
                colors={COLORS.blueGradient}
                start={{ x: 0.2, y: 1 }}
                end={{x: 1, y: 0}}
            >
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:10}}>
                    {
                        iconPlace === 'left' && (
                            <Image source={icon} resizeMode='cover' style={{ height: '60%', width: 15 }}/>
                        )
                    }

                    <Text style={[styles.buttonText]} >{title}</Text>

                    {
                        iconPlace === 'right' && (
                            <Image source={icon} resizeMode='cover' style={{ height: '60%', width: 15 }}/>
                        )
                    }
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}
