import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const Wishlist = () => {
  return (
    <View style={styles.container}>
      <Text>Naša lista želja</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
