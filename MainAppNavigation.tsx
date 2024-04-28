import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopList from "./ShopList";
import Wishlist from "./Wishlist";
import TabBarIcon from "./components/TabBarIcon";
import { NavigationContainer } from "@react-navigation/native";
import Reminders from "./Reminders";
import appColors from "./appColors";

const Tab = createBottomTabNavigator();

function MainAppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: appColors.charcoal,
          },
          tabBarActiveTintColor: appColors.appleGreen,
          tabBarInactiveTintColor: appColors.magnolia,
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
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
