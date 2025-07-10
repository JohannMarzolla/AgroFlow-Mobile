import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EstoqueInsumo from ".";
import AdicionarEstoqueInsumo from "./Adicionar";
import EditarEstoqueInsumo from "./Editar";
import { EstoqueInsumo  as EstoqueInsumoModel} from "@/domain/models/EstoqueInsumo";

export type EstoqueInsumoStackParamList = {
  EstoqueInsumo: undefined;
  AdicionarEstoqueInsumo: undefined;
  EditarEstoqueInsumo: { estoqueInsumo: EstoqueInsumoModel };
};

const Stack = createNativeStackNavigator<EstoqueInsumoStackParamList>();

export default function EstoqueInsumoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EstoqueInsumo" component={EstoqueInsumo} />
      <Stack.Screen name="AdicionarEstoqueInsumo" component={AdicionarEstoqueInsumo} />
      <Stack.Screen
          name="EditarEstoqueInsumo"
          component={EditarEstoqueInsumo}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
} 