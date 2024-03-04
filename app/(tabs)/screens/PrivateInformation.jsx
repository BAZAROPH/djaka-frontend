import React from "react";
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import Card from "../../../components/common/card/Card";
import { COLORS, images } from "../../../constants";
import Header from "../../../components/header/Header";

export default function PrivateInformation() {
    const router = useRouter();

    return (
        <SafeAreaView>
            <ImageBackground source={images.emergencyfont} resizeMode='cover' style={{height: '100%', width: '100%'}} >
                <Header backgroundImage={images.privateinfo} lightText="Informations" boldText="privées" />

                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "35%",
                    }}
                >
                    <View style={{ width: "90%" }}>
                        <Card
                            style={{
                                width: "100%",
                                height: "100%",
                                padding: 20,
                            }}
                        >
                            <ScrollView
                                style={{
                                    height: "65%",
                                }}
                                showsVerticalScrollIndicator={false}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        marginTop: 30,
                                    }}
                                >
                                    <ScrollView
                                        style={{
                                            height: "65%",
                                        }}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <View>
                                            <View style={styles.textInfo}>
                                                <Text style={styles.labelContent}>Problèmes de santé actuels</Text>
                                                <View
                                                    style={[
                                                        styles.textContent,
                                                        {
                                                            alignItems: "baseline",
                                                            flexDirection: "row",
                                                            gap: 10,
                                                        },
                                                    ]}
                                                >
                                                    <View
                                                        style={{
                                                            marginLeft: 5,
                                                            borderRadius: 100,
                                                            backgroundColor: COLORS.secondary,
                                                            width: "2%",
                                                            height: "30%",
                                                        }}
                                                    />
                                                    <Text>Toux</Text>
                                                </View>
                                            </View>

                                            <View style={styles.textInfo}>
                                                <Text style={styles.labelContent}>Allergies</Text>
                                                <View
                                                    style={[
                                                        styles.textContent,
                                                        {
                                                            alignItems: "baseline",
                                                            flexDirection: "row",
                                                            gap: 10,
                                                        },
                                                    ]}
                                                >
                                                    <View
                                                        style={{
                                                            marginLeft: 5,
                                                            borderRadius: 100,
                                                            backgroundColor: COLORS.secondary,
                                                            width: "2%",
                                                            height: "30%",
                                                        }}
                                                    />
                                                    <Text>Pollen</Text>
                                                </View>
                                            </View>

                                            <View style={styles.textInfo}>
                                                <Text style={styles.labelContent}>Médécin traitant</Text>
                                                <Text style={styles.textContent}>Dr Jean</Text>
                                            </View>

                                            <View style={styles.textInfo}>
                                                <Text style={styles.labelContent}>Contact du Médecin traitant</Text>
                                                <Text style={styles.textContent}>07 08 74 64 12</Text>
                                            </View>

                                            <View style={styles.textInfo}>
                                                <Text style={styles.labelContent}>Médécin traitant</Text>
                                                <Text style={styles.textContent}>Dr Jean</Text>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </ScrollView>
                        </Card>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textInfo: {
        paddingTop: 10,
        gap: 3,
    },

    labelContent: {
        color: "rgb(169,169,169)",
        textTransform: "capitalize",
    },

    textContent: {
        backgroundColor: "rgba(135,206,250, 0.2)",
        textTransform: "capitalize",
    },
});
