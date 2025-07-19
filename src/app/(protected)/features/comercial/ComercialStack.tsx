import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MetaStack from "./meta/MetaStack";
import VendaStack from "./venda/VendaStack";

export type ComercialStackParamList = {
  Meta: undefined;
  Venda: undefined;
};

const Stack = createNativeStackNavigator<ComercialStackParamList>();

export default function ComercialStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="Meta" component={MetaStack} />
      <Stack.Screen name="Venda" component={VendaStack} />
    </Stack.Navigator>
  );
}
