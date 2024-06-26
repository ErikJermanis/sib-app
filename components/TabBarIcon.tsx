import FontAwesome from "@expo/vector-icons/FontAwesome";

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={28} {...props} />;
}

export default TabBarIcon;
