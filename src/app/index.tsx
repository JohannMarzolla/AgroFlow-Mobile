import { useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import { AuthService } from "@/application/services/outros/AuthService";

export default function Index() {
  useEffect(() => {
    const checkAuth = async () => {
      const userId = await AuthService.getLoggedUser();
      router.replace(userId ? "/(protected)/Home" : "/(auth)/login");
      if (!userId) await SplashScreen.hideAsync();
    };

    checkAuth();
  }, []);

  return null;
}
