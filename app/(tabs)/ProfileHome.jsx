import React, {useRef, useEffect, useState} from "react";
import { View, Text, SafeAreaView, Image, ImageBackground, Animated } from "react-native";

import { Tabs } from "expo-router";
import ScreenGradient from "../../components/common/screengradient/ScreenGradient";
import { icons, images } from "../../constants";
import Stack from "expo-router";
import { COLORS } from "../../constants";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router'
import { useIsFocused } from "@react-navigation/native";
import { getPersonalInformation } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {createSelector} from 'reselect'

export default function ProfileHome() {
  const router = useRouter();
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: -100,
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: -100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(getPersonalInformation());
  }, []);
  
  const selectLayoutProfileState = (state) => state.getPersonalInformationReducer;
  const selectLayoutProfileProperties = createSelector(selectLayoutProfileState, (state)=>({
    getPersonalInformationLoading: state.getPersonalInformationLoading,
    personalInformation: state.personalInformation,
    getPersonalInformationError: state.getPersonalInformationError
  }))
  
  const {
    getPersonalInformationLoading, 
    personalInformation, 
    getPersonalInformationError
  } = useSelector(selectLayoutProfileProperties)
   
  useEffect(() =>{
    console.log(personalInformation);
  }, [personalInformation]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.addressfont}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <View style={{ height: "35%" }}>
          <ImageBackground
            source={images.address}
            resizeMode="cover"
            style={styles.headerBgImg}>
            <Animated.View
              style={[
                styles.userImagePosition,
                {
                  transform: [
                    { translateY: translateY },
                    { translateX: translateX },
                  ],
                },
              ]}>
              <View>
                <View style={styles.centeredElement}>
                  <Image
                    source={icons.user}
                    resizeMode="cover"
                    style={styles.centeredImage}
                  />
                </View>
                <Text style={styles.userName}>Méra Klyne</Text>
              </View>
            </Animated.View>
          </ImageBackground>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.TouchableContent} onPress={()=>router.push('/screens/profile/Information')}>
            <LinearGradient
              colors={COLORS.lightMenuBlue}
              style={styles.linearGradient}
              start={{ x: 1, y: 0.2 }} 
              end={{x: 0, y: 1}}
            >
              <Text style={styles.textTouchable}>Information personnelles</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableContent} onPress={()=>router.push('/screens/profile/Adress')}>
            <LinearGradient
              colors={COLORS.lightMenuBlue}
              style={styles.linearGradient}
              start={{ x: 1, y: 0.2 }} 
              end={{x: 0, y: 1}}
            >
              <Text style={styles.textTouchable}>Adresse</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableContent} onPress={()=>router.push('/screens/profile/Saving')}>
            <LinearGradient
              colors={COLORS.lightMenuBlue}
              style={styles.linearGradient}
              start={{ x: 1, y: 0.2 }} 
              end={{x: 0, y: 1}}
            >
              <Text style={styles.textTouchable}>Date d'enregistrement</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableContent} onPress={()=>router.push('/screens/profile/LastUpdate')}>
            <LinearGradient
              colors={COLORS.lightMenuBlue}
              style={styles.linearGradient}
              start={{ x: 1, y: 0.2 }} 
              end={{x: 0, y: 1}}
            >
              <Text style={styles.textTouchable}>Dernière mise à jour</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.secondContainer}>
          <TouchableOpacity style={styles.itemContainer} onPress={()=>router.push('/screens/profile/Contact')}>
            <Image
              source={icons.contact}
              resizeMode="cover"
              style={styles.icon}
            />
            <Text style={styles.text}>Contactez-nous</Text>
          </TouchableOpacity>
          <View style={[styles.itemContainer, styles.rightItemContainer]}>
            <Image
              source={icons.logout}
              resizeMode="cover"
              style={styles.icon}
            />
            <TouchableOpacity>
              <Text style={styles.text}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  principalViewHeight: {
    height: "40%",
  },
  headerBgImg: {
    height: "100%",
    justifyContent: "center",
  },
  backgroundImg: {
    height: "100%",
    width: "100%",
  },
  userImagePosition: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    top: Platform.OS === 'ios' ? "500%" : "460%",
    textAlign: "center",
    fontSize: 32,
    fontFamily: "montserrat-light",
  },
  centeredElement: {
    alignItems: "center",
  },
  centeredImage: {
    position: "absolute",
    padding: 20,
    top: 45,
  },
  menuContainer: {
    marginTop: Platform.OS === 'ios' ? 60 : 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TouchableContent: {
    marginTop: 10,
    width: 252,
    height: 33,
    backgroundColor: COLORS.secondary,
  },
  textTouchable: {
    textAlign: "center",
    lineHeight: 19.5,
  },
  linearGradient: {
    width: 252,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
  },
  secondContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 80,
    marginBottom: 80,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightItemContainer: {
    justifyContent: "flex-end",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  text: {
    fontSize: 11,
  },
});
