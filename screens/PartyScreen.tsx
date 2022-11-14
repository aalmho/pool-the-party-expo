import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import React from "react";
import Party from "../components/Party";

const PartyScreen = ({ navigation, route }: RootStackScreenProps<"Party">) => {
  const { partyId } = route.params;
  return (
    <View style={styles.container}>
      <Party partyId={partyId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PartyScreen;
