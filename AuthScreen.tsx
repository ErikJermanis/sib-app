import { StatusBar } from "expo-status-bar";
import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

type Props = {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setAccessToken: Dispatch<SetStateAction<string>>;
};

const AuthScreen = ({ setIsAuthenticated, setAccessToken }: Props) => {
  const [pin, setPin] = useState("");

  const handleAuth = async () => {
    try {
      const result = await fetch("https://sib-api.erikjermanis.me/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Otp: pin }),
      });
      if (result.ok) {
        const { token } = await result.json();
        await SecureStore.setItemAsync("auth-token", token);
        setAccessToken(token);
        setIsAuthenticated(true);
      } else {
        setPin("");
        Alert.alert("Neispravan PIN", "Pokušaj ponovo", [{ text: "OK" }], { cancelable: false });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="PIN" keyboardType="number-pad" value={pin} onChangeText={setPin} />
      <Button title="Potvrdi" onPress={handleAuth} />
      <StatusBar style="auto" />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
