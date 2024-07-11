import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopList from "./ShopList";
import Wishlist from "./Wishlist";
import { NavigationContainer } from "@react-navigation/native";
import appColors from "./appColors";
import ShoplistIcon from "./components/ShoplistIcon";
import WishlistIcon from "./components/WishlistIcon";

const Tab = createBottomTabNavigator();

function MainAppNavigation({ accessToken }: { accessToken: string }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: appColors.magnolia }}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: appColors.charcoal,
            position: "absolute",
            height: 45,
          },
          tabBarActiveTintColor: appColors.appleGreen,
          tabBarInactiveTintColor: appColors.magnolia,
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Kupovina"
          children={() => <ShopList accessToken={accessToken} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <ShoplistIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Želje"
          children={() => <Wishlist accessToken={accessToken} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <WishlistIcon color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainAppNavigation;
