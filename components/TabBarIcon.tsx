import FontAwesome from "@expo/vector-icons/FontAwesome";

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  console.log(props.color);
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default TabBarIcon;
