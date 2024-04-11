import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ShopList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Popis za kupnju</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

export default ShopList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcebde",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
