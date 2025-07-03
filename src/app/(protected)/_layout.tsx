import { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { useAuth } from "@/presentation/contexts/AuthContext";
import Home from "./Home";
import Logout from "./Logout";
import { ProdutosProvider } from "@/presentation/contexts/ProdutoContext";
import { ProducaoProvider } from "@/presentation/contexts/ProducaoContext";
import { FazendaProvider } from "@/presentation/contexts/FazendaContext";
import { MedidaProvider } from "@/presentation/contexts/MedidaContext";
import { EstoqueProdutoProvider } from "@/presentation/contexts/EstoqueProdutoContext";
import DrawerContentCustom from "./drawer/DrawerContentCustom";
import AdministracaoStack from "./features/adiministracaoModulo/AdministracaoStack";
import ProducaoModuloStack from "./features/producaoModulo/ProducaoModuloStack";
import { InsumoProvider } from "@/presentation/contexts/InsumoContext";
import { EstoqueInsumoProvider } from "@/presentation/contexts/EstoqueInsumoContext";
import { colors } from "@/shared/constants/colors";
import { useNotificacaoWS } from "@/presentation/hooks/useNotificacaoWS";
import { Redirect, SplashScreen } from "expo-router";
import ComercialStack from "./features/comercial/ComercialStack";
import { NotificacaoProvider } from "@/presentation/contexts/outros/NotificacaoContext";

const Drawer = createDrawerNavigator();

export default function App() {
  const { validateLogged, isAuthenticated } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useNotificacaoWS();

  useEffect(() => {
    const check = async () => {
      await validateLogged();
      setCheckingAuth(false);
      await SplashScreen.hideAsync();
    };
    check();
  }, []);

  if (checkingAuth) return null;
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  const customScreenOptions: DrawerNavigationOptions = {
    headerStyle: { backgroundColor: colors.agroflow.green },
    headerTintColor: "white",
    headerTitleAlign: "center",
  };

  return (
    <NotificacaoProvider>
      <MedidaProvider>
        <EstoqueInsumoProvider>
          <InsumoProvider>
            <FazendaProvider>
              <ProdutosProvider>
                <ProducaoProvider>
                  <EstoqueProdutoProvider>
                    <Drawer.Navigator
                      screenOptions={customScreenOptions}
                      drawerContent={(props) => (
                        <DrawerContentCustom {...props} />
                      )}
                    >
                      <Drawer.Screen name="Home" component={Home} />
                      <Drawer.Screen
                        name="Producao"
                        component={ProducaoModuloStack}
                      />
                      <Drawer.Screen
                        name="Comercial"
                        component={ComercialStack}
                      />
                      <Drawer.Screen
                        name="Administracao"
                        component={AdministracaoStack}
                      />
                      <Drawer.Screen name="Sair" component={Logout} />
                    </Drawer.Navigator>
                  </EstoqueProdutoProvider>
                </ProducaoProvider>
              </ProdutosProvider>
            </FazendaProvider>
          </InsumoProvider>
        </EstoqueInsumoProvider>
      </MedidaProvider>
    </NotificacaoProvider>
  );
}
