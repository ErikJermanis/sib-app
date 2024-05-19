import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopList from "./ShopList";
import Wishlist from "./Wishlist";
import TabBarIcon from "./components/TabBarIcon";
import { NavigationContainer } from "@react-navigation/native";
import Reminders from "./Reminders";
import appColors from "./appColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

function MainAppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: appColors.magnolia }}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: appColors.charcoal,
            position: "absolute",
            bottom: Platform.OS === "ios" ? 25 : 5,
            left: 5,
            right: 5,
            elevation: 0,
            borderRadius: 25,
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
          component={ShopList}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
          }}
        />
        <Tab.Screen
          name="Želje"
          component={Wishlist}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
          }}
        />
        <Tab.Screen
          name="Podsjetnici"
          component={Reminders}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainAppNavigation;
