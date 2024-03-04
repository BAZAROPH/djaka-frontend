import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground } from "react-native";
import { icons, COLORS, images } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import RoundButton from "../../../../components/common/buttons/roundbutton/RoundButton";
import Animation from "../../../../components/headeranimation/Animation";
import Card from "../../../../components/common/card/Card";
import { useRouter } from "expo-router";

export default function Saving() {
  const router = useRouter();
  const navigation = () =>{
    router.push('/ProfileHome')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animation title="Date d’enregistrement" navigation={navigation} />
      <ImageBackground
        source={images.save}
        resizeMode="cover">
        <View style={styles.dateContent}>
          <Text style={styles.title}>Date d’enregistrement</Text>
          <View style={styles.contentCard}>
            <Image source={icons.rectangle} style={styles.sizeRectangle} />
            <Card style={styles.Sizecard}>
              <Text style={styles.monthText}>Novembre</Text>
              <View style={styles.dayPosition}>
                <View style={styles.cerclePosition}>
                  <Image source={icons.cercle} />
                  <Image source={icons.cercle} />
                </View>
                <View style={styles.daycercle}>
                  <Text style={styles.dayText}>05</Text>
                </View>
                <View style={styles.cerclePosition}>
                  <Image source={icons.cercle} />
                  <Image source={icons.cercle} />
                </View>
              </View>
              <Text style={styles.yearText}>2023</Text>
            </Card>
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
  dateContent: {
    marginLeft: 30,
  },
  title: {
    color: "#0085F6",
    fontFamily: "montserrat-light",
    fontSize: 12,
    fontStyle: "normal",
  },
  Sizecard: {
    width: "75%",
    height: "63%",
    backgroundColor: "#FBFBFB",
    // Ombre pour Android
    elevation: 3,
    // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: "rgba(0, 0, 0, 0.11)",
  },
  sizeRectangle: {
    height: "3%",
  },
  contentCard: {
    marginTop: 40,
  },
  daycercle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(0, 133, 246, 0.07)",
    justifyContent: "center",
    alignItems: "center",
  },
  dayPosition: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Platform.OS === 'ios' ? -2 : 5,
    marginBottom: 15,
  },
  cerclePosition: {
    paddingHorizontal: 20,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    textAlign: "center",
    color: "#0085F6",
    fontSize: 30.69,
    fontStyle: "normal"
  },
  yearText:{
    marginTop: Platform.OS === 'ios' ? -7 : 0,
    textAlign: "center",
    color: "rgba(0, 133, 246, 0.52)",
    fontSize: 13
  },
  monthText:{
    color: "rgba(0, 133, 246, 0.52)",
    fontSize: 14,
  }
});
