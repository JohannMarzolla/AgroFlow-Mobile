import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { useAuth } from "@/presentation/contexts/AuthContext";
import Transacoes from "./Transacoes";
import Home from "./Home";
import Logout from "./Logout";
import { TransacaoProvider } from "@/presentation/contexts/TransacaoContext";
import { ProdutosProvider } from "@/presentation/contexts/ProdutoContext";
import { ProducaoProvider } from "@/presentation/contexts/ProducaoContext";
import { FazendaProvider } from "@/presentation/contexts/FazendaContext";
import { MedidaProvider } from "@/presentation/contexts/MedidaContext";
import { EstoqueProdutoProvider } from "@/presentation/contexts/EstoqueProdutoContext";
import DrawerContentCustom from "./drawer/DrawerContentCustom";
import AdministracaoStack from "./features/adiministracaoModulo/AdministracaoStack";
import ProducaoModuloStack from "./features/producaoModulo/ProducaoModuloStack";
import { InsumoProvider } from "@/presentation/contexts/InsumoContext";

const Drawer = createDrawerNavigator();

export default function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const customScreenOptions: DrawerNavigationOptions = {
    headerStyle: { backgroundColor: "#004D61" },
    headerTintColor: "white",
    headerTitleAlign: "center",
  };

  return (
    <TransacaoProvider>
      <MedidaProvider>
      <InsumoProvider> 
      <FazendaProvider>
      <ProdutosProvider>
       <ProducaoProvider>
        <EstoqueProdutoProvider>
        <Drawer.Navigator screenOptions={customScreenOptions}  drawerContent={(props) => <DrawerContentCustom {...props} />}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Transações" component={Transacoes} />
          <Drawer.Screen name="Producao" component={ProducaoModuloStack} />
          <Drawer.Screen name="Administracao" component={AdministracaoStack} />
          <Drawer.Screen name="Sair" component={Logout} />
        </Drawer.Navigator>
        </EstoqueProdutoProvider>
        </ProducaoProvider>
      </ProdutosProvider>
      </FazendaProvider>
      </InsumoProvider>
      </MedidaProvider>
    </TransacaoProvider>
  );
}
