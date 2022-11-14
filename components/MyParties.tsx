import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Text } from "react-native";

const MyParties = () => {
  const [partyName, setPartyName] = useState("");
  const [partyId, setPartyId] = useState("");

  useEffect(() => {
    getParty();
  }, []);

  const getParty = async () => {
    let { data, error, status } = await supabase
      .from("parties")
      .select(`party_id, name`)
      .eq("party_id", "1234")
      .single();
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      setPartyName(data.name);
      setPartyId(data.party_id);
    }
  };

  return (
    <View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.text}>{partyName}</Text>
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.text}>{partyId}</Text>
      </View>
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
