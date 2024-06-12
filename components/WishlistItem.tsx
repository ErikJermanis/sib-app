import { Pressable, StyleSheet, Text, View } from "react-native";
import { WishlistRecord } from "../global.types";
import appColors from "../appColors";
import { Dispatch, SetStateAction } from "react";
import { deleteRecord, modifyRecordCompleted } from "../crud";

type Props = {
  accessToken: string;
  item: WishlistRecord;
  isSelected: boolean;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
  setRecords: Dispatch<SetStateAction<WishlistRecord[] | null | undefined>>;
};

const WishlistItem = ({ item, isSelected, setSelectedId, accessToken, setRecords }: Props) => {
  const handleSelect = async () => {
    if (item.completed) {
      setRecords((prev) => prev!.map((record) => (record.id === item.id ? { ...record, completed: false } : record)));
      await modifyRecordCompleted(accessToken, false, item.id);
    } else {
      setSelectedId(item.id);
    }
  };

  const handleCancel = () => {
    setSelectedId(null);
  };

  const handleComplete = async () => {
    setSelectedId(null);
    setRecords((prev) => prev!.map((record) => (record.id === item.id ? { ...record, completed: true } : record)));
    await modifyRecordCompleted(accessToken, true, item.id);
  };

  const handleDelete = async () => {
    setSelectedId(null);
    setRecords((prev) => prev!.filter((record) => record.id !== item.id));
    await deleteRecord(accessToken, item.id);
  };

  return (
    <View style={item.completed ? completedWrapperStyle : styles.wrapper}>
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
        <Pressable style={item.completed ? completedPressableStyle : styles.pressable} onLongPress={handleSelect}>
          <Text style={{ textDecorationLine: item.completed ? "line-through" : "none" }}>{item.text}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  pressable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: appColors.magnoliaDark,
    paddingVertical: 5,
    paddingHorizontal: 8,
    minHeight: 40,
    shadowColor: appColors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
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

const completedWrapperStyle = StyleSheet.compose(styles.wrapper, {
  opacity: 0.5,
});

const completedPressableStyle = StyleSheet.compose(styles.pressable, {
  backgroundColor: appColors.officeGreen,
});

export default WishlistItem;
