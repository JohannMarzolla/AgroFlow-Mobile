import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedidaStack from "./medidas/MedidasStack";
import Cadastro from "./Cadastro";
import Notificacao from "./notificacao/Notificacao";

export type AdministracaoStackParamList = {
  Medidas: undefined;
  Cadastro: undefined;
  Notificacao: undefined;
};

const Stack = createNativeStackNavigator<AdministracaoStackParamList>();

export default function AdministracaoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="Medidas" component={MedidaStack} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Notificacao" component={Notificacao} />
    </Stack.Navigator>
  );
}
