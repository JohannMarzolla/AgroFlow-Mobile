import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedidaStack from "./medidas/MedidasStack";
import Notificacao from "./notificacao/Notificacao";
import UsuarioStack from "./usuario/UsuarioStack";

export type AdministracaoStackParamList = {
  Medidas: undefined;
  Notificacao: undefined;
  Usuario: undefined;
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
      <Stack.Screen name="Notificacao" component={Notificacao} />
      <Stack.Screen name="Usuario" component={UsuarioStack} />
    </Stack.Navigator>
  );
}
