import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EstoqueInsumo from ".";
import AdicionarEstoqueInsumo from "./Adicionar";

export type EstoqueInsumoStackParamList = {
  EstoqueInsumo: undefined;
  AdicionarEstoqueInsumo: undefined;
};

const Stack = createNativeStackNavigator<EstoqueInsumoStackParamList>();

export default function EstoqueInsumoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EstoqueInsumo" component={EstoqueInsumo} />
      <Stack.Screen name="AdicionarEstoqueInsumo" component={AdicionarEstoqueInsumo} />
    </Stack.Navigator>
  );
} 