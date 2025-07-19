import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdicionarInsumo from "./Adicionar";
import Insumo from "./Insumo";
import { Insumo as InsumoModel } from "@/domain/models/Insumo";
import EditarInsumo from "./Editar";

export type InsumoStackParamList = {
  Lista: undefined;
  AdicionarInsumo: undefined;
  EditarInsumo: { insumo: InsumoModel };
};

const Stack = createNativeStackNavigator<InsumoStackParamList>();

export default function InsumoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lista" component={Insumo} />
      <Stack.Screen
        name="AdicionarInsumo"
        component={AdicionarInsumo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditarInsumo"
        component={EditarInsumo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
