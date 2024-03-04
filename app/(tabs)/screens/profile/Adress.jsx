import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { icons, COLORS, images } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import RoundButton from "../../../../components/common/buttons/roundbutton/RoundButton";
import Animation from "../../../../components/headeranimation/Animation";
import Card from "../../../../components/common/card/Card";
import InputBottomBorder from "../../../../components/common/inputs/inputbottomborder/InputBottomBorder";
import { useRouter } from "expo-router";

export default function Adress() {
  const router = useRouter();
  const navigation = () =>{
    router.push('/ProfileHome')
  }
  return (
    <SafeAreaView style={styles.container}>
      <Animation title="Adresse" navigation={navigation} />
      <ImageBackground
        source={images.save}
        resizeMode="cover"
        style={styles.backgroundStyle}
      >
        <View style={styles.inputContainer}>
          <View style={styles.inputContent}>
            <Text style={styles.label}>Adresse</Text>
            <InputBottomBorder
              value="Cocody Faya"
              style={styles.inputValueColor}
            />
          </View>
        </View>
        <View style={styles.centeredBottom}>
            <RoundButton title="Utiliser ma position actuel" 
              iconPlace="left" 
              icon={icons.location} width={320} 
            />
          </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundStyle: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
  },
  label: {
    color: "#0085F6",
    fontFamily: "montserrat-bold",
    fontSize: 12,
    fontStyle: "normal",
  },
  inputContent: {
    marginBottom: 10,
  },
  inputContainer: {
    height: "60%",
    width: "85%",
    marginLeft: 30,
  },
  inputValueColor: {
    color: "#000",
    fontSize: 16,
    fontFamily: "montserrat-light",
    fontWeight: "500",
    fontStyle: "normal",
  },
  centeredBottom: {
    height: "40%",
    flexDirection: "row",
    justifyContent: "center"
  },
});
