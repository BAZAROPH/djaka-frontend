import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground } from "react-native";
import { icons, COLORS, images } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import RoundButton from "../../../../components/common/buttons/roundbutton/RoundButton";
import Animation from "../../../../components/headeranimation/Animation";
import Card from "../../../../components/common/card/Card";
import { useRouter } from "expo-router";

export default function LastUpdate() {
  const router = useRouter();
  const navigation = () =>{
    router.push('/ProfileHome')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animation title="Dernière mise à jour" navigation={navigation} />
      <ImageBackground
        source={images.save}
        resizeMode="cover" style={styles.backgroundStyle}>
        <View style={styles.dateContent}>
          <Text style={styles.title}>Dernière mise à jour</Text>
          <Text style={styles.lastUpdateText}>La dernière mise à jour a été effectuer le</Text>
          <Text style={styles.dateText}>07 | 11 | 2023</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateContent: {
    marginLeft: 30,
  },
  backgroundStyle:{
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  title: {
    color: "#0085F6",
    fontFamily: "montserrat-light",
    fontSize: 12,
    fontStyle: "normal",
  },
  lastUpdateText:{
    marginTop: 20,
    color: "#D6D7D8",
    fontFamily: "montserrat-light",
    fontSize: 14,
    fontStyle: "normal",
  },
  dateText: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: "montserrat-light",
    color: '#000'
  },
});
