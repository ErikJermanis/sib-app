import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import appColors from "./appColors";
import { SafeAreaView } from "react-native-safe-area-context";

const Reminders = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Podsjetnici</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Reminders;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: appColors.magnolia,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
