import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopList from "./ShopList";
import Wishlist from "./Wishlist";
import TabBarIcon from "./components/TabBarIcon";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function MainAppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#fcebde",
          },
          tabBarActiveTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name="Popis za kupnju"
          component={ShopList}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
          }}
        />
        <Tab.Screen
          name="Naša lista želja"
          component={Wishlist}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainAppNavigation;
