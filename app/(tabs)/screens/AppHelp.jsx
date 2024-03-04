import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'

import BackButton from '../../../components/common/buttons/backbutton/BackButton'
import { COLORS, images} from '../../../constants'



export default function AppHelp() {

  const router = useRouter();
  return (
    <SafeAreaView style={{flex: 1}}>
        <View>
            <ImageBackground source={images.helpfont} resizeMode='cover' style={{height: '100%', width: '100%'}}>
                <View style={{height: '35%'}}>
                    <ImageBackground source={images.help} resizeMode='cover' style={{height: '100%', justifyContent: 'center'}}>
                        <BackButton onClick={()=>router.back()} style={{marginLeft: 20}} />
                        <Text style={{
                              fontFamily: 'montserrat-bold', 
                              color: 'white', 
                              textTransform: 'capitalize', 
                              fontSize: 40,
                              marginBottom: 50,
                              textAlign: 'center'
                        }}>
                            aide 
                        </Text>
                    </ImageBackground>
                </View>

                <View style={{margin: 90}}>

                    <View style={styles.line}/>

                    <Text style={styles.textContent}>1. comment s'inscrire ?</Text>

                    <View style={styles.line}/>

                    <Text  style={styles.textContent}>1. comment scanner ?</Text>

                    <View style={styles.line}/>

                  </View>
            </ImageBackground>
        </View>
        
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    textContent:{
      padding: 6, 
      marginBottom: 15,
      backgroundColor: 'white', 
      textAlign: 'left', 
      fontFamily: 'montserrat-bold', 
      textTransform: 'capitalize'
    },

    line: {
      marginBottom: 15, 
      height: '1%',
      backgroundColor: COLORS.secondary
      
    }
});