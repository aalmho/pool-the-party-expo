import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React, { useState } from "react";

const JoinPartyScreen = ({ navigation }: RootTabScreenProps<"Join">) => {
  const [inputText, setInputText] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Join</Text>
        <Text style={styles.subTitle}>The party starts and ends here</Text>
        <TextInput
          style={styles.input}
          value={inputText}
          placeholder="Enter party code"
          onChangeText={(text: string) => setInputText(text)}
          onSubmitEditing={() => {
            if (inputText.length > 0) {
              setInputText("");
              navigation.navigate("Party", { partyId: inputText });
            }
          }}
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitle: {
    marginTop: 20,
    fontSize: 15,
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

export default JoinPartyScreen;
