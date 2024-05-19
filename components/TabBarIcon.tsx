import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Platform } from "react-native";

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={28} style={Platform.OS === "ios" ? { marginBottom: -30 } : {}} {...props} />;
}

export default TabBarIcon;
