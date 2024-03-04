import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { icons, images } from "../../../../constants";
import { COLORS } from "../../../../constants";
import InputBottomBorder from "../../../../components/common/inputs/inputbottomborder/InputBottomBorder";
import Checkbox from 'expo-checkbox';
import { ScrollView } from "react-native-gesture-handler";
import RoundButton from "../../../../components/common/buttons/roundbutton/RoundButton";
import Animation from "../../../../components/headeranimation/Animation";
import { useRouter } from "expo-router";

export default function Information() {
  const router = useRouter();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [healthIssues, setHealthIssues] = useState([{ id: 1, value: "Toux" }]);
  const [allergies, setAllergies] = useState([{ id: 1, value: "Pollen" }]);

  const addHealthIssue = () => {
    const newId = healthIssues.length + 1;
    setHealthIssues([...healthIssues, { id: newId, value: "" }]);
  };

  const removeHealthIssue = (id) => {
    setHealthIssues(healthIssues.filter((issue) => issue.id !== id));
  };

  const addAllergy = () => {
    const newId = allergies.length + 1;
    setAllergies([...allergies, { id: newId, value: "" }]);
  };

  const removeAllergy = (id) => {
    setAllergies(allergies.filter((allergy) => allergy.id !== id));
  };

  const navigation = () =>{
    router.push('/ProfileHome')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.addressfont}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <Animation title="Informations personnelles" navigation={navigation} />
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <View style={styles.inputContent}>
              <Text style={styles.label}>Nom et prénom</Text>
              <InputBottomBorder value="Mera Klyne" style={styles.inputValueColor} />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.label}>Email</Text>
              <InputBottomBorder value="meraklynegeek@gmail.com" style={styles.inputValueColor} />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.label}>Numéro de téléphone</Text>
              <InputBottomBorder value="05 86 66 64 58" style={styles.inputValueColor} />
            </View>
            <View style={styles.pairInput}>
              <View style={styles.inputContent}>
                <Text style={styles.label}>Date de naissance</Text>
                <InputBottomBorder value="22/04/1998" style={styles.inputValueColor} />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.label}>Taille</Text>
                <InputBottomBorder value="171" width={210} style={styles.inputValueColor} />
              </View>
            </View>
            <View style={styles.pairInput}>
              <View style={styles.inputContent}>
                <Text style={styles.label}>Groupe Sanguin</Text>
                <InputBottomBorder value="O+" style={styles.inputValueColor} />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.label}>Poids</Text>
                <InputBottomBorder value="55" width={210} style={styles.inputValueColor} />
              </View>
            </View>

            <View style={styles.inputContent}>
              <Text style={styles.label}>Problèmes de santé actuels</Text>
              {healthIssues.map((issue) => (
                <View key={issue.id}>
                  <InputBottomBorder
                    value={issue.value}
                    onChangeText={(text) => {
                      const updatedIssues = healthIssues.map((item) =>
                        item.id === issue.id ? { ...item, value: text } : item
                      );
                      setHealthIssues(updatedIssues);
                    }}
                    style={styles.inputValueColor}
                  />
                  <View style={styles.checboxElementPosition}>
                    <View style={styles.section}>
                      <View style={styles.sectionLeft}>
                        <Checkbox
                          style={styles.checkbox}
                          value={isChecked}
                          onValueChange={setChecked}
                        />
                        <Text style={styles.checboxText}>Cacher</Text>
                      </View>
                    </View>
                    <View style={styles.sectionRight}>
                      <TouchableOpacity onPress={addHealthIssue}>
                        <Image source={icons.plus} style={styles.plusIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => removeHealthIssue(issue.id)}>
                        <Image source={icons.sub} style={styles.subIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.label}>Ajouter des allergies</Text>
              {allergies.map((allergy) => (
                <View key={allergy.id}>
                  <InputBottomBorder
                    value={allergy.value}
                    onChangeText={(text) => {
                      const updatedAllergies = allergies.map((item) =>
                        item.id === allergy.id ? { ...item, value: text } : item
                      );
                      setAllergies(updatedAllergies);
                    }}
                    style={styles.inputValueColor}
                  />
                  <View style={styles.checboxElementPosition}>
                    <View style={styles.section}>
                      <View style={styles.sectionLeft}>
                        <Checkbox
                          style={styles.checkbox}
                          value={isChecked}
                          onValueChange={setChecked}
                        />
                        <Text style={styles.checboxText}>Cacher</Text>
                      </View>
                    </View>
                    <View style={styles.sectionRight}>
                      <TouchableOpacity onPress={addAllergy}>
                        <Image source={icons.plus} style={styles.plusIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => removeAllergy(allergy.id)}>
                        <Image source={icons.sub} style={styles.subIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.label}>Ajouter vos actuelles médications</Text>
              <InputBottomBorder value="Sekisan" style={styles.inputValueColor} />
            </View>
          </View>
          <View style={styles.centeredBottom}>
            <RoundButton title="Mettre à jour" width={195} />
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
  backgroundImg: {
    height: "100%",
    width: "100%",
  },
  inputContainer: {
    width: "85%",
    marginLeft: 30,
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
  pairInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputValueColor: {
    color: "#000",
    fontSize: 16,
    fontFamily: "montserrat-light",
    fontWeight: "500",
    fontStyle: "normal",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  sectionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  checboxText: {
    color: "#313131",
    margin: 8,
    fontSize: 12,
    fontStyle: "italic",
    letterSpacing: -0.66,
  },
  checboxElementPosition: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  plusIcon: {
    width: 20,
    height: 20,
  },
  subIcon: {
    width: 20,
    height: 20,
  },
  centeredBottom: {
    marginTop: 20,
    marginBottom: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
  },
});