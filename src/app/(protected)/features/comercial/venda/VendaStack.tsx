import Venda from "./Venda"; // <-- componente de tela
import { Venda as VendaModel } from "@/domain/models/comercial/Venda"; // <-- model, só para tipagem
import { VendaProvider } from "@/presentation/contexts/comercial/VendaContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdicionarVenda from "./Adicionar";
import EditarVenda from "./Editar";

export type VendaStackParamList = {
  Venda: undefined;
  AdicionarVenda: undefined;
  EditarVenda: { venda: VendaModel };
};

const Stack = createNativeStackNavigator<VendaStackParamList>();

export default function VendaStack() {
  return (
    <VendaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Venda" component={Venda} />
        <Stack.Screen
          name="AdicionarVenda"
          component={AdicionarVenda}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditarVenda"
          component={EditarVenda}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </VendaProvider>
  );
}