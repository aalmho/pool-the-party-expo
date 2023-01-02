import { useState, useEffect, FC } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList, RootTabParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type Party = {
  party_id: string;
  name: string;
};

interface MyPartiesProps {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, "MyParties", undefined>,
    NativeStackNavigationProp<RootStackParamList>
  >;
}

const MyParties: FC<MyPartiesProps> = (props) => {
  const { navigation } = props;
  const [parties, setParties] = useState<Party[]>();

  useEffect(() => {
    getParty();
  }, []);

  const getParty = async () => {
    const userKey = await AsyncStorage.getItem("@user_key");
    if (userKey) {
      let { data, error, status } = await supabase
        .from("parties")
        .select(`party_id, name`)
        .eq("user_key", JSON.parse(userKey));
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setParties(data);
      }
    }
  };

  return (
    <View>
      {parties?.map((party) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Party", { partyId: party.party_id })
          }
        >
          <View key={party.party_id} style={styles.verticallySpaced}>
            <Text style={styles.text}>{party.name}</Text>
            <Text style={styles.text}>{party.party_id}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  text: {
    color: "white",
  },
});

export default MyParties;
