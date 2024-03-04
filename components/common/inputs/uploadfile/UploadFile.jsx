import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { styles } from './UploadFileStyle'
import { icons } from '../../../../constants';

export default function UploadFile({ image, setImage, field }) {

    const chooseImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if(!result.canceled){
            setImage(field, { uri: result.assets[0].uri, file: {
                uri: result.assets[0].uri,
                name: 'image.jpg',
                type: result.assets[0].type,
            }});
        }
    }
    return (
        <>
            {image && <Image source={image} style={{ width: 200, height: 200, marginBottom: 10 }} />}
            <TouchableOpacity style={styles.box} onPress={chooseImage}>
                <Image source={icons.picture} style={styles.image} />
                <Text style={styles.text}>Photo</Text>
            </TouchableOpacity>
        </>
    )
}