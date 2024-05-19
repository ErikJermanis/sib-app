import { StatusBar } from "expo-status-bar";
import { Button, FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import appColors from "./appColors";
import { SafeAreaView } from "react-native-safe-area-context";

const renderItem: ListRenderItem<{ id: number; title: string }> = ({ item }) => (
  <View>
    <Text>{item.title}</Text>
  </View>
);

const items = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  title: `Ići u Dumboku, uzeti naš roštilj i napraviti lijepi ljubavni ručak - ${index + 1}`,
}));
const Wishlist = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.listContainer}>
        <FlatList data={items} renderItem={renderItem} keyExtractor={(item) => String(item.id)} />
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button title="Dodaj novu želju" onPress={() => {}} />
      </View> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: appColors.magnolia,
    paddingBottom: 50,
    // alignItems: "center",
    // justifyContent: "center",
  },
  listContainer: {
    height: "100%",
  },
  buttonContainer: {
    height: 100,
  },
});
