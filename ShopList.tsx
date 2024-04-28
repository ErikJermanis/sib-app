import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import appColors from "./appColors";

const ShopList = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Popis za kupnju</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default ShopList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: appColors.magnolia,
    alignItems: "center",
    justifyContent: "center",
  },
});
