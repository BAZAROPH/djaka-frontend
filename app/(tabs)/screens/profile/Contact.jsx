import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
import { useRouter, Stack } from "expo-router";
import React from "react";
import { images } from "../../../../constants";
import BackButton from "../../../../components/common/buttons/backbutton/BackButton";

export default function Contact() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: "35%" }}>
            <ImageBackground
                source={images.contact}
                resizeMode="cover"
                style={[{ height: "100%", justifyContent: 'flex-start' }, Platform.OS == 'ios' ? { paddingTop: 20 } : { paddingTop: 40 }]}
            >
                <BackButton onClick={() => router.back()} style={{ marginLeft: 20 }}/>
                <Text
                style={{
                    fontFamily: "montserrat-bold",
                    color: "white",
                    fontSize: Platform.OS === 'ios' ? 35 : 40,
                    margin: Platform.OS === 'ios' ? 40 : 50/2,
                    textAlign: "center",
                }}
                >
                Contactez-Nous
                </Text>
            </ImageBackground>
        </View>

        <ScrollView>
            <View style={{ margin: 70 }}>
                <Text style={styles.textContent}>
                    Emensis itaque difficultatibus multis et nive obrutis callibus plurimis ubi prope Rauracum ventum est 
                    ad supercilia fluminis Rheni, resistente multitudine Alamanna pontem suspendere navium conpage Romani 
                    vi nimia vetabantur ritu grandinis undique convolantibus telis, et cum id inpossibile videretur, 
                    imperator cogitationibus magnis attonitus, quid capesseret ambigebat.
                </Text>
                <Text style={styles.textContent}>
                    Quanta autem vis amicitiae sit, ex hoc intellegi maxime potest, quod ex infinita societate 
                    generis humani, quam conciliavit ipsa natura, ita contracta res est et adducta in angustum ut 
                    omnis caritas aut inter duos aut inter paucos iungeretur.
                    Quanta autem vis amicitiae sit, ex hoc intellegi maxime potest, quod ex infinita societate 
                    generis humani, quam conciliavit ipsa natura, ita contracta res est et adducta in angustum ut 
                    omnis caritas aut inter duos aut inter paucos iungeretur.
                </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    textContent: {
        marginBottom: 15,
        textAlign: "justify",
        fontFamily: "montserrat-light",
        fontSize: 13,
        lineHeight: 13.41,
    },
});
