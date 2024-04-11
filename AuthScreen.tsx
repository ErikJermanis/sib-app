import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Auth screen</Text>
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
