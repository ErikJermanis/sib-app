import { Pressable, StyleSheet, Text, View } from "react-native";
import { WishlistRecord } from "../global.types";
import appColors from "../appColors";
import { Dispatch, SetStateAction } from "react";

type Props = {
  item: WishlistRecord;
  isSelected: boolean;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
};

const WishlistItem = ({ item, isSelected, setSelectedId }: Props) => {
  const handleSelect = () => {
    setSelectedId(item.id);
  };

  const handleCancel = () => {
    setSelectedId(null);
  };

  const handleComplete = () => {};

  const handleDelete = () => {};

  return (
    <View style={styles.wrapper}>
      {isSelected ? (
        <View style={styles.menu}>
          <Pressable onPress={handleCancel} style={styles.menuButton}>
            <Text>Odustani</Text>
          </Pressable>
          <Pressable onPress={handleComplete} style={styles.menuButton}>
            <Text style={styles.completedText}>Ispunjeno</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.menuButton}>
            <Text style={styles.deleteText}>Obriši</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.pressable} onLongPress={handleSelect}>
          <Text>{item.text}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  pressable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: appColors.charcoal,
    backgroundColor: appColors.magnoliaDark,
    paddingVertical: 5,
    paddingHorizontal: 8,
    minHeight: 40,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: appColors.charcoal,
    backgroundColor: appColors.magnoliaAccent,
    height: 40,
  },
  menuButton: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  completedText: {
    backgroundColor: appColors.appleGreen,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  deleteText: {
    color: appColors.danger,
  },
});

export default WishlistItem;
