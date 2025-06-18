import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import ProducaoStack from "./producao/ProducaoStack";
import ProdutosStack from "./produtos/ProdutosStack";
import FazendaStack from "./fazenda/FazendaStack";
import InsumoStack from "./Insumo/InsumoStack";
import EstoqueProdutoStack from "./estoqueProduto/EstoqueProdutoStack";


export type AdministracaoStackParamList = {
  Fazenda: undefined;
  Produtos: undefined;
  Producao: undefined;
  Insumo: undefined;
  EstoqueProduto: undefined;
};

const Stack = createNativeStackNavigator<AdministracaoStackParamList>();

export default function ProducaoModuloStack() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        animation: "none" 
      }}
    >
      <Stack.Screen name="Fazenda" component={FazendaStack} />
      <Stack.Screen name="Produtos" component={ProdutosStack} />
       <Stack.Screen name="Insumo" component={InsumoStack} />
      <Stack.Screen name="Producao" component={ProducaoStack} />
      <Stack.Screen name="EstoqueProduto" component={EstoqueProdutoStack} />
    </Stack.Navigator>
  );
}