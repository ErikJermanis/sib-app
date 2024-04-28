import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import appColors from "./appColors";
import { SafeAreaView } from "react-native-safe-area-context";

const Wishlist = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Naša lista želja</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: appColors.magnolia,
    alignItems: "center",
    justifyContent: "center",
  },
});
