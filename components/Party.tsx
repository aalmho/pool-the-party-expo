import { useState, useEffect, useCallback, FC } from "react";
import { supabase } from "../lib/supabase";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  Button,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type PartyImage = {
  id: string;
  image_url: string;
  image_text: string;
  created_at: Date;
};

export type Party = {
  name: string;
  id: string;
  images: PartyImage[];
  user_id: string;
  party_id: string;
};

const deviceWidth = Dimensions.get("window").width;

interface PartyProps {
  partyId: string;
  navigation: NativeStackNavigationProp<RootStackParamList, "Party", undefined>;
}

const Party: FC<PartyProps> = (props) => {
  const { partyId, navigation } = props;
  const [party, setParty] = useState<Party>();
  const [refreshing, setRefreshing] = useState(false);
  navigation.setOptions({ title: party?.name });

  useEffect(() => {
    getParty();
  }, []);

  const getParty = async () => {
    const { data, error, status } = await supabase
      .from("parties")
      .select(
        "name, id, user_id, images(id, image_url, image_text, created_at)"
      )
      .eq("party_id", partyId)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      const party: Party = await JSON.parse(JSON.stringify(data));
      setParty(party);
    }
  };

  const insertImageReference = async (fileName: string, user_key: string) => {
    const imagePath = "/storage/v1/object/public/images/";
    const publicUrl =
      "https://hgarommhvwvvrhwvsebz.supabase.co" + imagePath + fileName;
    const { error } = await supabase.from("images").insert({
      image_text: fileName,
      party_id: party?.id,
      image_url: publicUrl,
      user_key: JSON.parse(user_key),
    });
  };

  const pickImage = async () => {
    const user_key = await AsyncStorage.getItem("@user_key");
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.cancelled) {
      const fileExt = result.uri.split(".").pop();
      const generatedFileName = `${partyId}${Math.random()}.${fileExt}`;

      const formData = new FormData();
      formData.append(
        "files",
        JSON.parse(
          JSON.stringify({
            uri: result.uri,
            type: "image/jpeg",
            name: generatedFileName,
          })
        )
      );
      if (user_key) {
        await supabase.storage
          .from("images")
          .upload(generatedFileName, formData);
        insertImageReference(generatedFileName, user_key).then(() =>
          getParty()
        );
      }
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getParty().then(() => setRefreshing(false));
  }, []);

  const images = party?.images
    ?.sort(
      (a: PartyImage, b: PartyImage) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .map((img) => (
      <TouchableOpacity
        key={img.id}
        onPress={() =>
          navigation.navigate("Image", { imageUrl: img.image_url })
        }
      >
        <Image style={styles.image} source={{ uri: img.image_url }}></Image>
      </TouchableOpacity>
    ));

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Add a picture to the party" onPress={pickImage} />
      </View>
      <View style={styles.container}>{images}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  text: {
    color: "white",
  },
  image: {
    width: deviceWidth / 2,
    height: deviceWidth / 2,
  },
});

export default Party;
