import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "@/presentation/contexts/AuthContext";
import Toast from "react-native-toast-message";
import "react-native-reanimated";

// Import your global CSS file
import "./global.css";
import GlobalLoading from "@/presentation/components/ui/Loading";
import { NotificacaoToastCustom } from "@/presentation/components/outros/notificacao/NotificacaoToastCustom";

SplashScreen.preventAutoHideAsync();

const toastConfig = {
  notificacao: (props: any) => <NotificacaoToastCustom {...props} />,
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthProvider>
      <Toast config={toastConfig} />
      <GlobalLoading />
    </>
  );
}
