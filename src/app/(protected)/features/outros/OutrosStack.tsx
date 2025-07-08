import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notificacao from "./notificacao/Notificacao";
import UsuarioStack from "./usuario/UsuarioStack";

export type OutrosStackParamList = {
  Notificacao: undefined;
  Usuario: undefined;
};

const Stack = createNativeStackNavigator<OutrosStackParamList>();

export default function OutrosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="Notificacao" component={Notificacao} />
      <Stack.Screen name="Usuario" component={UsuarioStack} />
    </Stack.Navigator>
  );
}
