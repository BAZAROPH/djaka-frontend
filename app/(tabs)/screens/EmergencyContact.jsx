import React, { useState } from "react";
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import BackButton from "../../../components/common/buttons/backbutton/BackButton";
import RoundButton from "../../../components/common/buttons/roundbutton/RoundButton";
import { COLORS, STYLES, icons, images } from "../../../constants";
import InputBottomBorder from "../../../components/common/inputs/inputbottomborder/InputBottomBorder";
import { LinearGradient } from "expo-linear-gradient";
import SelectBoxPicker from "../../../components/common/selectbox/SelectBoxPicker";

import Header from "../../../components/header/Header";

export default function EmergencyContact() {
    const router = useRouter();
    const [relation, setRelation] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <Header backgroundImage={images.emergency} lightText="Contacts" boldText="d'urgence" />

            <ImageBackground source={images.emergencyfont} resizeMode={"stretch"} style={styles.screenBackground}>
                <ScrollView>
                    <View style={styles.centredElement}>
                        <LinearGradient colors={COLORS.blueGradient} start={{ x: 0.2, y: 1 }} end={{ x: 1, y: 0 }} width={203} height={25.5}>
                            <Text style={styles.blocText}>Contact d’urgence 1</Text>
                        </LinearGradient>

                        <View>
                            <InputBottomBorder value="Charles" width={200} style={styles.inputValueColor} />
                        </View>

                        <View style={styles.pairInput}>
                            <View style={styles.inputContent}>
                                <InputBottomBorder value="+225" width={43} style={styles.inputValueColor} />
                            </View>
                            <View style={styles.inputContent}>
                                <InputBottomBorder value="07 00 00 00 00" width={139} style={styles.inputValueColor} />
                            </View>
                        </View>

                        <View style={{ width: "50%" }}>
                            <SelectBoxPicker variant="border" selected={"Conjoint"} options={["Ami(e)", "Famille", "Conjoint"]} setSelected={setRelation} />
                        </View>

                        <View style={styles.horizontalLine}></View>

                        <LinearGradient colors={COLORS.blueGradient} start={{ x: 0.2, y: 1 }} end={{ x: 1, y: 0 }} width={203} height={25.5}>
                            <Text style={styles.blocText}>Contact d’urgence 2</Text>
                        </LinearGradient>
                        <View>
                            <InputBottomBorder value="Charles" width={200} style={styles.inputValueColor} />
                        </View>
                        <View style={styles.pairInput}>
                            <View style={styles.inputContent}>
                                <InputBottomBorder value="+225" width={43} style={styles.inputValueColor} />
                            </View>
                            <View style={styles.inputContent}>
                                <InputBottomBorder value="07 00 00 00 01" width={139} style={styles.inputValueColor} />
                            </View>
                        </View>
                        <View style={styles.centeredBottom}>
                            <RoundButton title="Mettre à jour" width={195} />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTitle: {
        width: "60%",
        color: "#fff",
        fontSize: 40,
        margin: 50 / 2,
        textAlign: "left",
    },
    horizontalLine: {
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "rgba(217, 217, 217, 0.24)",
        width: 355,
        height: 6,
    },
    secondHorizontalLine: {
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "#CCD7E1",
        width: 191.041,
        height: 1,
    },
    textBold: {
        fontFamily: "montserrat-bold",
        textTransform: "lowercase",
        fontSize: 40,
    },
    headerBackgroundProperties: {
        height: "100%",
        justifyContent: "flex-start",
        paddingTop: Platform.OS === "ios" ? 20 : 40,
    },
    screenBackground: {
        flex: 1,
    },
    backgroundBloc: {
        marginBottom: 7,
        backgroundColor: COLORS.primary,
        width: 203,
        height: 25.5,
    },
    centredElement: {
        height: "62%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    blocText: {
        color: "#FFF",
        fontFamily: "montserrat-light",
        fontSize: 16.658,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
    },
    inputValueColor: {
        marginTop: 15,
        color: "#000",
        fontSize: 16,
        fontFamily: "montserrat-light",
        fontWeight: "500",
        fontStyle: "normal",
    },
    pairInput: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputContent: {
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    centeredBottom: {
        marginTop: 20,
        marginBottom: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
