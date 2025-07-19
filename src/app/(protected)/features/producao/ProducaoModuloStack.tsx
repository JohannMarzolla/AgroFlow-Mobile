import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProducaoStack from "./producao/ProducaoStack";
import ProdutosStack from "./produtos/ProdutosStack";
import FazendaStack from "./fazenda/FazendaStack";
import InsumoStack from "./Insumo/InsumoStack";
import EstoqueProdutoStack from "./estoqueProduto/EstoqueProdutoStack";
import EstoqueInsumoStack from "./estoqueInsumo/EstoqueInsumoStack";
import MedidasStack from "./medidas/MedidasStack";

export type ProducaoStackParamList = {
  Medidas: undefined;
  Fazenda: undefined;
  Produtos: undefined;
  Cadastro: undefined;
  Insumo: undefined;
  EstoqueProduto: undefined;
  EstoqueInsumo: undefined;
};

const Stack = createNativeStackNavigator<ProducaoStackParamList>();

export default function ProducaoModuloStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="Medidas" component={MedidasStack} />
      <Stack.Screen name="Fazenda" component={FazendaStack} />
      <Stack.Screen name="Produtos" component={ProdutosStack} />
      <Stack.Screen name="Insumo" component={InsumoStack} />
      <Stack.Screen name="Cadastro" component={ProducaoStack} />
      <Stack.Screen name="EstoqueProduto" component={EstoqueProdutoStack} />
      <Stack.Screen name="EstoqueInsumo" component={EstoqueInsumoStack} />
    </Stack.Navigator>
  );
}
