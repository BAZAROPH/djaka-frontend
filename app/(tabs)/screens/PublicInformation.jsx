import React from "react";
import { View, Text, SafeAreaView, ImageBackground, Image, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import Card from "../../../components/common/card/Card";
import RoundButton from "../../../components/common/buttons/roundbutton/RoundButton";
import { STYLES, icons, images } from "../../../constants";
import Header from "../../../components/header/Header";

export default function PublicInformation() {
    const router = useRouter();

    return (
        <SafeAreaView style={STYLES.container}>
            <ImageBackground source={images.emergencyfont} resizeMode="cover" style={{ height: "100%", width: "100%" }}>

                <Header backgroundImage={images.publicinfo} lightText="Informations" boldText="publiques" />
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
                                    <Image source={icons.user} resizeMode="cover" style={{ alignItems: "flex-start" }} />

                                    <View style={styles.textInfo}>
                                        <Text style={styles.labelContent}>Nom</Text>
                                        <Text style={styles.textContent}>méra</Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: 10,
                                        }}
                                    >
                                        <View style={{ width: "40%" }}>
                                            <View style={styles.textInfo}>
                                                <Text style={styles.labelContent}>Contact</Text>
                                                <Text style={styles.textContent}>05 86 66 64 58</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: "60%" }}>
                                            <View style={styles.textInfo}>
                                                <Text style={styles.labelContent}>date de naissance</Text>
                                                <Text style={styles.textContent}>22/04/1998</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: 10,
                                        }}
                                    >
                                        <View style={[styles.textInfo, { width: "30%" }]}>
                                            <Text style={styles.labelContent}>taille</Text>
                                            <Text style={styles.textContent}>171</Text>
                                        </View>

                                        <View style={[styles.textInfo, { width: "30%" }]}>
                                            <Text style={styles.labelContent}>poids</Text>
                                            <Text style={styles.textContent}>55</Text>
                                        </View>

                                        <View style={[styles.textInfo, { width: "40%" }]}>
                                            <Text style={styles.labelContent}>groupe sanguin</Text>
                                            <Text style={styles.textContent}>O+</Text>
                                        </View>
                                    </View>

                                    <View style={styles.textInfo}>
                                        <Text style={styles.labelContent}>Ajouter vos actuelles médications</Text>
                                        <Text style={styles.textContent}>Sekisan</Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: 20,
                                        }}
                                    >
                                        <View style={[styles.textInfo, { width: "50%" }]}>
                                            <Text style={styles.labelContent}>Les 3 dernières maladies</Text>
                                            <Text style={styles.textContent}>paludisme</Text>
                                            <Text style={[styles.textContent, { marginTop: 5 }]}>paludisme</Text>
                                        </View>

                                        <View style={[styles.textInfo, { width: "50%" }]}>
                                            <Text style={styles.labelContent}>Les 3 derniers vaccins</Text>
                                            <Text style={styles.textContent}>Tétanos</Text>
                                            <Text style={[styles.textContent, { marginTop: 5 }]}>Hépatite B</Text>
                                            <Text style={[styles.textContent, { marginTop: 5 }]}>Méningite</Text>
                                        </View>
                                    </View>

                                    <View style={styles.textInfo}>
                                        <Text style={styles.labelContent}>numéro de carte CMU</Text>
                                        <Text style={styles.textContent}>Lorem ipsum dolor sit amet.</Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: 20,
                                        }}
                                    >
                                        <View style={[styles.textInfo, { width: "50%" }]}>
                                            <Text style={styles.labelContent}>Ville</Text>
                                            <Text style={styles.textContent}>abidjan</Text>
                                        </View>

                                        <View style={[styles.textInfo, { width: "50%" }]}>
                                            <Text style={styles.labelContent}>nationalite</Text>
                                            <Text style={styles.textContent}>ivoirienne</Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: 20,
                                        }}
                                    >
                                        <View style={[styles.textInfo, { width: "50%" }]}>
                                            <Text style={styles.labelContent}>quartier</Text>
                                            <Text style={styles.textContent}>yopougon</Text>
                                        </View>

                                        <View style={[styles.textInfo, { width: "50%" }]}>
                                            <Text style={styles.labelContent}>commune</Text>
                                            <Text style={styles.textContent}>azito</Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            alignItems: "center",
                                            marginTop: 10,
                                        }}
                                    >
                                        <RoundButton
                                            style={{
                                                alignItems: "center",
                                                marginTop: 10,
                                            }}
                                            title="Mettre à jour"
                                            width="50%"
                                        />
                                    </View>
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
