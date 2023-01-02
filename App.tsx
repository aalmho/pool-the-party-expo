import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const createRandomPartyId = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const idLength = 10;
  let id = "";
  for (let i = 0; i <= idLength; i++) {
    let randomNumber = Math.floor(Math.random() * characters.length);
    id += characters.substring(randomNumber, randomNumber + 1);
  }
  return id;
};

export default function App() {
  const [userKey, setUserKey] = useState("");
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getUserKey = async () => {
    const userKey = await AsyncStorage.getItem("@user_key");
    if (userKey === null) {
      // verify with phonenumber
      const jsonValue = JSON.stringify(createRandomPartyId());
      await AsyncStorage.setItem("@user_key", jsonValue).then(() =>
        setUserKey(jsonValue)
      );
    }
  };

  getUserKey();

  if (!isLoadingComplete && userKey === "") {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
