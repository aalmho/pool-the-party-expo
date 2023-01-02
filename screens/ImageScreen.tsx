import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { RootStackScreenProps } from "../types";

const { width, height } = Dimensions.get("window");

const ImageScreen = ({ navigation, route }: RootStackScreenProps<"Image">) => {
  const { imageUrl } = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageUrl }}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "50%",
    width: width,
  },
});

export default ImageScreen;
