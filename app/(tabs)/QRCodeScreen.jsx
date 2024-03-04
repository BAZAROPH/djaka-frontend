import React,  { useRef, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, Share} from 'react-native'
import { useRouter } from 'expo-router'
import QRCode from 'react-native-qrcode-svg'
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

import BackButton from '../../components/common/buttons/backbutton/BackButton'
import { COLORS, icons } from '../../constants'
import { useAuthUser } from '../../hooks/useAuthUser'
import Toast from '../../components/common/toast/Toast';

export default function QRCodeScreen() {
  const router = useRouter();
  const { user } = useAuthUser();
  const viewShotRef = useRef(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(null)
  const [savedError, setSavedError] = useState(null)

  useEffect(() => {
    checkMediaLibraryPermission();
  }, []);

  const checkMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setMediaLibraryPermission(status === 'granted');
  };

  const saveQRCode = async () => {
    try {
      if (!mediaLibraryPermission) {
        console.error('Permission MEDIA_LIBRARY is required');
        return;
      }

      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1.0,
      });

      const asset = await MediaLibrary.createAssetAsync(uri);

      const album = await MediaLibrary.getAlbumAsync('Djaka QR Codes');
      if (album === null) {
        await MediaLibrary.createAlbumAsync('Djaka QR Codes', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      setSavedSuccess('QR code enregistrée avec succès')
    } catch (error) {
        setSavedError(error)
    }
    setTimeout(() => {
        setSavedSuccess(null)
        setSavedError(null)
    }, 3000);
  };

  const shareQRCode = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1.0,
      });
  
      await Share.share({
        title: 'Partage du Code QR',
        message: 'Consultez ce Code QR généré pour mes informations',
        url: uri,
      });
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
        {
            savedSuccess && (
                <Toast text={savedSuccess} duration={2000} backgroundColor={'white'} textColor={COLORS.secondary} />
            )
        }
        {
            savedError && (
                <Toast text={savedError} duration={3000} backgroundColor={'red'} />
            )
        }
        <View 
            style={{ 
              marginTop: '10%', 
              marginLeft: '5%'
            }}>

            <BackButton onClick={()=>router.back()} color='black'/>
        </View>

        <View 
            style={{ 
              justifyContent: 'center',
              alignItems: 'center',
              height: '60%', 
            }}>

            {/* <Image source={icons.qrcode} resizeMode='contain' style={{height: '60%', width: '60%'}}/> */}
            <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
                <QRCode value={`https://api-sidle.dev-meraky.com/consultation/${user && user.user.public_id}`} size={230} logo={icons.logoColor}/>
                {/* <QRCode  value='www.google.com'/> */}
            </ViewShot>
        </View>

        <View style={{ alignItems: 'center'}}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={()=>{shareQRCode()}}
            >

                <Text 
                    style={styles.buttonContent}>
                    Partager le code QR
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => saveQRCode()}
            >

                <Text 
                    style={styles.buttonContent}>
                    Enregistrer le code QR
                </Text>
            </TouchableOpacity>
            <View style={styles.border}/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    button:{
      backgroundColor: "white",
      width: "70%",
      padding: 10,
      marginVertical: 10,
      borderRadius: 4,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      elevation: 5,
    },

    buttonContent:{
      color: "black",
      textAlign: "center",
    },

    border:{
      backgroundColor: COLORS.secondary,
      height: '15%', 
      width: '80%',
      top: -20,
      zIndex: -1,
    }
});