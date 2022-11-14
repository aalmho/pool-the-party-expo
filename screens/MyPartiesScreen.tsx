import { StyleSheet } from "react-native";
import MyParties from "../components/MyParties";
import { Text, View } from "../components/Themed";

const MyPartiesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your parties</Text>
      <MyParties />
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
