import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import MedidaStack from "./medidas/MedidasStack";
import Cadastro from "./Cadastro";

export type AdministracaoStackParamList = {
  Medidas: undefined;
  Cadastro: undefined;
};

const Stack = createNativeStackNavigator<AdministracaoStackParamList>();

export default function AdministracaoStack() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        animation: "none" 
      }}
    >
      <Stack.Screen name="Medidas" component={MedidaStack} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}