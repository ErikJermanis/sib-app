import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { ItemsRecord } from "../global.types";
import appColors from "../appColors";
import { getItems, toggleItemCompleted } from "../crud";

const ShoplistItem = ({
  item,
  accessToken,
  setItems,
}: {
  item: ItemsRecord;
  accessToken: string;
  setItems: Dispatch<SetStateAction<ItemsRecord[] | null>>;
}) => {
  const [isPending, setIsPending] = useState(false);

  const toggleComplete = async () => {
    setIsPending(true);
    const success = await toggleItemCompleted(accessToken, item.id, !item.completed);
    if (success) {
      const newItems = await getItems(accessToken);
      setItems(newItems);
    }
    setIsPending(false);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={toggleComplete} hitSlop={{ bottom: 8, left: 12, right: 12, top: 8 }}>
        <View style={item.completed || isPending ? completedItemCircleStyle : styles.circle}></View>
      </Pressable>
      <Text style={item.completed || isPending ? completedItemTextStyle : styles.text}>{item.item}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomColor: appColors.magnoliaAccent,
    borderBottomWidth: 1,
  },
  text: {
    paddingLeft: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.charcoal,
  },
});

const completedItemTextStyle = StyleSheet.compose(styles.text, {
  color: appColors.officeGreen,
  textDecorationLine: "line-through",
});
const completedItemCircleStyle = StyleSheet.compose(styles.circle, {
  backgroundColor: appColors.appleGreen,
});

export default ShoplistItem;
