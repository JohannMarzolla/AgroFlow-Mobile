import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MetaStack from "./meta/MetaStack";

export type ComercialStackParamList = {
  Meta: undefined;
};

const Stack = createNativeStackNavigator<ComercialStackParamList>();

export default function ComercialStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="Meta" component={MetaStack} />
    </Stack.Navigator>
  );
}
