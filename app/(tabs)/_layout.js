import { View, Text, Image, Platform, TouchableOpacity } from 'react-native'
import { Tabs, Stack } from 'expo-router'
import { icons } from '../../constants'
import { useRouter } from 'expo-router'
import { useAuthUser } from '../../hooks/useAuthUser'

export default function _layout() {
    const router = useRouter();
    const { logout } = useAuthUser();

    return (
        <>
            <Stack.Screen 
                options={{
                    headerShown: false
                }}
            />
            <Tabs 
                screenOptions={{
                    tabBarStyle: [{
                        backgroundColor: '#0085F6',
                        borderRadiusTop: 30,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: 80
                    }, Platform.OS === 'ios' && {paddingTop :20}],
                }}
            >
                <Tabs.Screen 
                    name='Home'
                    options={{
                        href: '/Home',
                        tabBarIcon: ({focused})=>{
                            return (
                                <Icon icon={icons.home} label='Accueil' focused={focused} />
                            )
                        },
                        headerLeft: ()=>(
                            <TouchableOpacity onPress={()=>{ logout(); router.push('/')}}>
                                <Image source={icons.logoColor} style={{ width: 45, height: 45, marginLeft: 10}} />
                            </TouchableOpacity>
                        ),
                        headerRight: ()=>(
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <TouchableOpacity onPress={()=>router.push('/screens/AppHelp')}>
                                    <Image source={icons.help} style={{ width: 33, height: 33}} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>router.push('/screens/Notification')}>
                                    <Image source={icons.notification} style={{ width: 33, height: 33}} />
                                </TouchableOpacity>
                            </View>
                        ),
                        headerTitle: '',
                        headerStyle: {
                            backgroundColor: 'transparent'
                        },
                        headerShadowVisible: false,
                        tabBarLabel: '',
                    }}
                />

                <Tabs.Screen 
                    name='QRCodeScreen'
                    options={{
                        href: '/QRCodeScreen',
                        headerShown: false,
                        tabBarIcon: ({focused})=>(
                            <Icon icon={icons.qrcode} label='Mon code QR' focused={focused} />
                        ),
                        tabBarLabel:''
                    }}
                />
                <Tabs.Screen 
                    name='ProfileHome'
                    options={{
                        href: '/ProfileHome',
                        headerShown: false,
                        tabBarIcon: ({ focused })=>(
                            <Icon icon={icons.profile} label='Mon profil' focused={ focused } />
                        ),
                        tabBarLabel:''
                    }}
                />

                {/* Screens  */}
                <Tabs.Screen 
                    name='screens/AppHelp'
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen 
                    name='screens/AppInformation'
                    options={{
                        href: null,
                    }}
                />
                <Tabs.Screen 
                    name='screens/EmergencyContact'
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen 
                    name='screens/Insurance'
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen 
                    name='screens/Landing'
                    options={{
                        href: null,
                    }}
                />
                <Tabs.Screen 
                    name='screens/Notification'
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen 
                    name='screens/PrivateInformation'
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />

                <Tabs.Screen 
                    name='screens/PublicInformation'
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen 
                    name='screens/profile/Contact'
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen 
                    name='screens/profile/Information'
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen 
                    name='screens/profile/LastUpdate'
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen 
                    name='screens/profile/Saving'
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen 
                    name='screens/profile/Adress'
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
            </Tabs>
        </>
    )
}

const Icon = ({ icon, label, focused })=>{
    return (
        <View style={[{flex: 1, justifyContent: 'center', alignItems:'center'}, !focused && { opacity: 0.7}]}>
            <Image source={icon} style={{ height: 22, width: 22}}/>
            <Text style={{color: 'white', fontFamily: 'montserrat-bold'}}>{label}</Text>
        </View>
    )
}