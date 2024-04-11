import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./AuthScreen";
import MainAppNavigation from "./MainAppNavigation";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      const token = await SecureStore.getItemAsync("auth-token");
      if (!token) {
        setIsAuthenticated(true);
        setIsAppReady(true);
        return;
      }
      const isAuthenticatedRes = await fetch("https://sib-api.erikjermanis.me/is-authenticated", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (isAuthenticatedRes.ok) {
        setIsAuthenticated(true);
      }
      setIsAppReady(true);
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Aplikacija" component={MainAppNavigation} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Prijava" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
