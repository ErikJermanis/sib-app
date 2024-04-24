import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import AuthScreen from "./AuthScreen";
import MainAppNavigation from "./MainAppNavigation";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const prepareApp = async () => {
      const token = await SecureStore.getItemAsync("auth-token");
      if (!token) {
        setIsAppReady(true);
        return;
      }
      const isAuthenticatedRes = await fetch("https://sib-api.erikjermanis.me/is-authenticated", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (isAuthenticatedRes.ok) {
        setAccessToken(token);
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

  return isAuthenticated ? (
    <MainAppNavigation />
  ) : (
    <AuthScreen setIsAuthenticated={setIsAuthenticated} setAccessToken={setAccessToken} />
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
