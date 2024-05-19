import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  InputAccessoryView,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import appColors from "./appColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { WishlistRecord } from "./global.types";
import WishlistItem from "./components/WishlistItem";
import { getRecords } from "./crud";

const items: WishlistRecord[] = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  text: `Ići u Dumboku, uzeti naš roštilj i napraviti lijepi ljubavni ručak - ${index + 1}`,
  createdAt: "",
  updatedAt: "",
}));

const Wishlist = ({ accessToken }: { accessToken: string }) => {
  const [newWish, setNewWish] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [records, setRecords] = useState<WishlistRecord[] | null>();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getRecords(accessToken);
      setRecords(data);
    })();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const newRecords = await getRecords(accessToken);
    setRecords(newRecords);
    setIsRefreshing(false);
  };

  const handleSubmit = async () => {
    const res = await fetch("https://sib-api.erikjermanis.me/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ text: newWish }),
    });
    if (res.ok) {
      setNewWish("");
      const newRecords = await getRecords(accessToken);
      setRecords(newRecords);
    }
  };

  const renderItem: ListRenderItem<WishlistRecord> = ({ item }) => (
    <WishlistItem item={item} isSelected={selectedId === item.id} setSelectedId={setSelectedId} />
  );

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.listContainer}>
          <FlatList
            data={records}
            renderItem={renderItem}
            extraData={selectedId}
            keyExtractor={(item) => String(item.id)}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
          />
          <View style={styles.buttonContainer}>
            <TextInput
              value={newWish}
              placeholder="Dodaj novu želju"
              style={styles.input}
              placeholderTextColor={appColors.magnolia}
              inputAccessoryViewID="wishInputId"
              onChangeText={setNewWish}
              onSubmitEditing={handleSubmit}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID="wishInputId" backgroundColor={appColors.night}>
          <Text style={styles.inputAccessoryText}>{newWish}</Text>
        </InputAccessoryView>
      )}
    </>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: appColors.magnolia,
    paddingBottom: 50,
  },
  listContainer: {
    height: "100%",
  },
  buttonContainer: {
    height: Platform.OS === "ios" ? 40 : "auto",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  input: {
    backgroundColor: appColors.night,
    color: appColors.magnolia,
    paddingVertical: Platform.OS === "ios" ? 12 : 3,
    paddingHorizontal: Platform.OS === "ios" ? 14 : 10,
    borderRadius: 6,
    marginBottom: Platform.OS === "ios" ? 43 : 0,
  },
  inputAccessoryText: {
    color: appColors.magnolia,
  },
});
