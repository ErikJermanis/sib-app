import { Pressable, StyleSheet, Text } from "react-native";
import appColors from "../appColors";
import { useState } from "react";

type Props = {
  number: number | null;
  onPress?: (number: number) => void;
};

function KeyboardButton({ number, onPress }: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPressIn={onPress ? () => setIsPressed(true) : undefined}
      onPressOut={onPress ? () => setIsPressed(false) : undefined}
      onPress={onPress ? () => onPress(number!) : undefined}
      style={isPressed ? pressedStyle : styles.wrapper}
    >
      <Text style={styles.text}>{number}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: appColors.magnolia,
    backgroundColor: appColors.charcoal,
  },
  text: {
    fontSize: 36,
    color: appColors.magnolia,
    fontWeight: "bold",
  },
});

const pressedStyle = StyleSheet.compose(styles.wrapper, {
  backgroundColor: appColors.night,
});

export default KeyboardButton;
