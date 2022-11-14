import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React from "react";

const JoinPartyScreen = ({ navigation }: RootTabScreenProps<"Join">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join</Text>
      <Text style={styles.subTitle}>The party starts and ends here</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter party code"
        onSubmitEditing={({ nativeEvent: { text } }) =>
          navigation.navigate("Party", { partyId: text })
        }
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
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
