import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { supabase } from "../lib/supabase";
import { RootTabScreenProps } from "../types";

const createRandomPartyId = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const idLength = 5;
  let id = "";
  for (let i = 0; i <= idLength; i++) {
    let randomNumber = Math.floor(Math.random() * characters.length);
    id += characters.substring(randomNumber, randomNumber + 1);
  }
  return id;
};

const CreatePartyScreen = ({
  navigation,
}: RootTabScreenProps<"CreateParty">) => {
  const [inputText, setInputText] = useState("");
  const createPartyAndNavigate = async (name: string) => {
    const partyId = createRandomPartyId();
    await supabase
      .from("parties")
      .insert({ party_id: partyId, name: name })
      .then(() => navigation.navigate("Party", { partyId: partyId }));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create party</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter party name"
        value={inputText}
        onChangeText={(text: string) => setInputText(text)}
        onSubmitEditing={() => {
          setInputText("");
          createPartyAndNavigate(inputText);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    marginTop: 100,
    backgroundColor: "grey",
    borderRadius: 30,
    height: 50,
    padding: 10,
    width: "60%",
  },
});

export default CreatePartyScreen;
