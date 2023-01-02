import { StyleSheet } from "react-native";
import MyParties from "../components/MyParties";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

const MyPartiesScreen = ({ navigation }: RootTabScreenProps<"MyParties">) => {
  return (
    <View style={styles.container}>
      <MyParties navigation={navigation} />
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
});

export default MyPartiesScreen;
