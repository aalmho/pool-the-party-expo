import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Button,
  RefreshControl,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

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

const Party = (partyId: { partyId: string }) => {
  const [party, setParty] = useState<Party>();
  const [refreshing, setRefreshing] = useState(false);

  console.log(partyId.partyId);

  useEffect(() => {
    getParty();
  }, []);

  const getParty = async () => {
    const { data, error, status } = await supabase
      .from("parties")
      .select(
        "name, id, user_id, images(id, image_url, image_text, created_at)"
      )
      .eq("party_id", partyId.partyId)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      const party: Party = await JSON.parse(JSON.stringify(data));
      setParty(party);
    }
  };

  const insertImageReference = async (fileName: string) => {
    const imagePath = "/storage/v1/object/public/images/";
    const publicUrl =
      "https://hgarommhvwvvrhwvsebz.supabase.co" + imagePath + fileName;
    const { error } = await supabase.from("images").insert({
      image_text: fileName,
      party_id: party?.id,
      image_url: publicUrl,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.cancelled) {
      const fileExt = result.uri.split(".").pop();
      const generatedFileName = `${partyId.partyId}${Math.random()}.${fileExt}`;

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
      await supabase.storage.from("images").upload(generatedFileName, formData);
      insertImageReference(generatedFileName).then(() => getParty());
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
      <Image
        key={img.id}
        style={styles.image}
        source={{ uri: img.image_url }}
      ></Image>
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
      <View style={styles.verticallySpaced}>
        <Text style={styles.text}>{party?.name}</Text>
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
