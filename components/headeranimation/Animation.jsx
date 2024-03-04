import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { icons, images } from "../../constants";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

const Animation = ({ title, navigation }) => {
  const router = useRouter();
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
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
    } else {
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
    }
  }, [isFocused]);

  return (
    <View style={{ height: "35%" }}>
      <ImageBackground
        source={images.address}
        resizeMode="cover"
        style={styles.headerBgImg}
      >
        <Animated.View
          style={[
            styles.userImagePosition,
            {
              transform: [
                { translateY: translateY },
                { translateX: translateX },
              ],
            },
          ]}
        >
        <TouchableOpacity onPress={navigation}>
          <View style={styles.centeredElement}>
              <Image
                source={icons.user}
                resizeMode="contain"
                style={styles.centeredImage}
              />
            </View>
            <Text style={styles.userName}>Méra Klyne</Text>
        </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.textPosition,
            { transform: [{ translateY: translateY }] },
          ]}
        >
          <Text style={styles.infoText}>{title}</Text>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({
    headerBgImg: {
      height: "100%",
      justifyContent: "center",
    },
    userImagePosition: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === 'ios' ? 150 : 180,
    marginBottom: Platform.OS === 'ios' ? 40 : 0,
    marginLeft: Platform.OS === 'ios' ? -70 : -90,
  },
  userName: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
    fontStyle: "normal",
    color: "#fff",
    fontFamily: "montserrat-light",
  },
  centeredElement: {
    alignItems: "center",
  },
  centeredImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  infoText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: 'montserrat-bold',
    color: "#fff",
  },
  textPosition: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === 'ios' ? 0 : 40,
  },
});

