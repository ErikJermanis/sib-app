import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, RefreshControl, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import appColors from "./appColors";
import { useEffect, useState } from "react";
import { createItem, deleteCompletedItems, getItems } from "./crud";
import { ItemsRecord } from "./global.types";
import ShoplistItem from "./components/ShoplistItem";

const ShopList = ({ accessToken }: { accessToken: string }) => {
  const [items, setItems] = useState<ItemsRecord[] | null>(null);
  const [newItem, setNewItem] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getItems(accessToken);
      setItems(data);
    })();
  }, []);

  const handleSubmit = async () => {
    const created = await createItem(accessToken, newItem);
    if (created) {
      const newItems = await getItems(accessToken);
      setItems(newItems);
      setNewItem("");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const newItems = await getItems(accessToken);
    setItems(newItems);
    setIsRefreshing(false);
  };

  const handleDeleteCompleted = async () => {
    setIsDeleting(true);
    await deleteCompletedItems(accessToken);
    const newItems = await getItems(accessToken);
    setItems(newItems);
    setIsDeleting(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        fadingEdgeLength={70}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      >
        {items?.map((item) => (
          <ShoplistItem key={item.id} item={item} accessToken={accessToken} setItems={setItems} />
        ))}
        <View style={styles.inputView}>
          <View style={styles.circle}></View>
          <TextInput
            value={newItem}
            style={styles.input}
            onChangeText={setNewItem}
            onSubmitEditing={handleSubmit}
            placeholder="nešto..."
            placeholderTextColor={appColors.magnoliaAccent2}
          />
        </View>
        {items?.some((item) => item.completed) && (
          <Button
            title="Očisti kupljeno"
            color={appColors.danger}
            onPress={handleDeleteCompleted}
            disabled={isDeleting}
          />
        )}
        <View style={{ height: 70 }}></View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default ShopList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: appColors.magnolia,
    paddingTop: 10,
  },
  inputView: {
    paddingHorizontal: 14,
    display: "flex",
    flexDirection: "row",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.charcoal,
    marginTop: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    paddingBottom: 45,
    borderRadius: 6,
    backgroundColor: appColors.magnolia,
  },
});
