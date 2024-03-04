import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store';

import Card from '../../components/common/card/Card';
import { COLORS, SIZES, STYLES, icons, images } from '../../constants';

export default function Home() {
    const router = useRouter();
    
    return (
        <SafeAreaView style={[STYLES.container]}>
            <ImageBackground source={images.homebg} resizeMode='cover' style={{height: '100%', width: '100%'}}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>
                    <View style={{ width: '90%', paddingTop: '5%', height: '100%' }}>

                        <Card style={{ width: '100%', backgroundColor: COLORS.lightBlue, height:'20%' }}>

                        </Card>

                        <Text style={{ marginTop: 10, fontSize: 20, color: COLORS.lightBlue, fontFamily: 'montserrat-bold'}}>Bienvenu Méra,</Text>

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', gap: 20, marginTop: 20}} >

                            <Card style={{width: '100%', height: '28%'}}>
                                <Text style={{ fontFamily: 'montserrat-bold' }}>Informations</Text>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <TouchableOpacity style={{ maxWidth: '25%', flex:1, justifyContent: 'center',alignItems: 'center'}} onPress={()=>router.push('/screens/PrivateInformation')}>
                                        <Image source={icons.privacy} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>Informations privées</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ maxWidth: '25%', flex:1, justifyContent: 'center',alignItems: 'center'}} onPress={()=>router.push('/screens/PublicInformation')}>
                                        <Image source={icons.publicinfos} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>Informations publiques</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ maxWidth: '25%', flex:1, justifyContent: 'center',alignItems: 'center'}} onPress={()=>router.push('/screens/EmergencyContact')}>
                                        <Image source={icons.alarm} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}} >Contacts d'urgence</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ maxWidth: '25%', flex:1, justifyContent: 'center',alignItems: 'center'}} onPress={()=>router.push('/screens/Insurance')}>
                                        <Image source={icons.insurance} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>Informations d'assurance</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>

                            <Card style={{width: '100%', height: '28%'}}>
                                <Text style={{ fontFamily: 'montserrat-bold' }}>Numéro d'urgence</Text>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginHorizontal: 20}}>
                                    <TouchableOpacity style={{ maxWidth: '30%', flex:1, justifyContent: 'center',alignItems: 'center'}}>
                                        <Image source={icons.policy} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>Police Secours</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ maxWidth: '30%', flex:1, justifyContent: 'center',alignItems: 'center'}}>
                                        <Image source={icons.pomper} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>Sapeur Pompiers</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ maxWidth: '30%', flex:1, justifyContent: 'center',alignItems: 'center'}}>
                                        <Image source={icons.samu} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>SAMU</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>

                            {/* <Card style={{width: '100%', height: '28%'}}>
                                <Text style={{ fontFamily: 'montserrat-bold' }}>Informations</Text>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <TouchableOpacity style={{ maxWidth: '25%', flex:1, justifyContent: 'center',alignItems: 'center'}}>
                                        <Image source={icons.privacy} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>Informations privées</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ maxWidth: '25%', flex:1, justifyContent: 'center',alignItems: 'center'}}>
                                        <Image source={icons.publicinfos} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>Informations privées</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ maxWidth: '25%', flex:1, justifyContent: 'center',alignItems: 'center'}}>
                                        <Image source={icons.alarm} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>Informations privées</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ maxWidth: '25%', flex:1, justifyContent: 'center',alignItems: 'center'}}>
                                        <Image source={icons.insurance} style={{ height: 40, width: 40}} />
                                        <Text style={{fontSize: 'montserrat-light', fontSize: 10, textAlign: 'center'}}>Informations privées</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card> */}

                            {/* <Card></Card>
                            <Card></Card> */}
                        </View>
                    </View>
                    
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}