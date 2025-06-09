import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import ProducaoStack from "./producao/ProducaoStack";
import ProdutosStack from "./produtos/ProdutosStack";
import FazendaStack from "./fazenda/FazendaStack";


export type AdministracaoStackParamList = {
  Fazenda: undefined;
  Produtos: undefined;
  Producao: undefined;

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
      <Stack.Screen name="Producao" component={ProducaoStack} />
    </Stack.Navigator>
  );
}