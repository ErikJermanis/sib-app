import { StatusBar } from "expo-status-bar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import appColors from "./appColors";
import { SafeAreaView } from "react-native-safe-area-context";
import KeyboardButton from "./components/KeyboardButton";

type Props = {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setAccessToken: Dispatch<SetStateAction<string>>;
};

const AuthScreen = ({ setIsAuthenticated, setAccessToken }: Props) => {
  const [pin, setPin] = useState("");

  const handlePinChange = (value: number) => {
    if (pin.length > 3) return;
    setPin((prev) => prev + String(value));
  };

  const handleAuth = async () => {
    try {
      const result = await fetch("https://sib.erikjermanis.me/api/authenticate", {
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

  useEffect(() => {
    if (pin.length === 4) {
      handleAuth();
    }
  }, [pin]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.pinContainer}>
        <View style={pin.length > 0 ? filledCircle : styles.circle} />
        <View style={pin.length > 1 ? filledCircle : styles.circle} />
        <View style={pin.length > 2 ? filledCircle : styles.circle} />
        <View style={pin.length > 3 ? filledCircle : styles.circle} />
      </View>
      <View style={styles.keyboardContainer}>
        <View style={styles.flexRow}>
          <KeyboardButton number={1} onPress={handlePinChange} />
          <KeyboardButton number={2} onPress={handlePinChange} />
          <KeyboardButton number={3} onPress={handlePinChange} />
        </View>
        <View style={styles.flexRow}>
          <KeyboardButton number={4} onPress={handlePinChange} />
          <KeyboardButton number={5} onPress={handlePinChange} />
          <KeyboardButton number={6} onPress={handlePinChange} />
        </View>
        <View style={styles.flexRow}>
          <KeyboardButton number={7} onPress={handlePinChange} />
          <KeyboardButton number={8} onPress={handlePinChange} />
          <KeyboardButton number={9} onPress={handlePinChange} />
        </View>
        <View style={styles.flexRow}>
          <KeyboardButton number={null} />
          <KeyboardButton number={0} onPress={handlePinChange} />
          <KeyboardButton number={null} />
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: appColors.magnolia,
  },
  pinContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: appColors.charcoal,
    borderRadius: 9,
    marginHorizontal: 5,
  },
  keyboardContainer: {
    flex: 1,
    display: "flex",
    borderWidth: 1,
    borderColor: appColors.magnolia,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
});

const filledCircle = StyleSheet.compose(styles.circle, {
  backgroundColor: appColors.charcoal,
});
