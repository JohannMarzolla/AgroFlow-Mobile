import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { useAuth } from "@/presentation/contexts/AuthContext";
import Transacoes from "./Transacoes";
import Home from "./Home";
import Logout from "./Logout";
import { TransacaoProvider } from "@/presentation/contexts/TransacaoContext";
import ProdutosStack from "./produtos/ProdutosStack";
import { ProdutosProvider } from "@/presentation/contexts/ProdutoContext";
import Cadastro from "./Cadastro";
import ProducaoStack from "./producao/ProducaoStack";
import { ProducaoProvider } from "@/presentation/contexts/ProducaoContext";
import { FazendaProvider } from "@/presentation/contexts/FazendaContext";
import FazendaStack from "./fazenda/FazendaStack";

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
      <FazendaProvider>
      <ProdutosProvider>
       <ProducaoProvider>
        <Drawer.Navigator screenOptions={customScreenOptions}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Transações" component={Transacoes} />
          <Drawer.Screen name="Fazendas" component={FazendaStack} />
          <Drawer.Screen name="Produtos" component={ProdutosStack} />
          <Drawer.Screen name="Produção" component={ProducaoStack} />
          <Drawer.Screen name="Cadastro" component={Cadastro} />
          <Drawer.Screen name="Sair" component={Logout} />
        </Drawer.Navigator>
        </ProducaoProvider>
      </ProdutosProvider>
      </FazendaProvider>
    </TransacaoProvider>
  );
}
