import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdicionarInsumo from "./Adicionar";
import Insumo from "./Insumo";


export type InsumoStackParamList = {
  Insumo: undefined;
  AdicionarInsumo: undefined;
};

const Stack = createNativeStackNavigator<InsumoStackParamList>();

export default function InsumoStack() {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Insumo" component={Insumo}   />
     <Stack.Screen
    name="AdicionarInsumo"
    component={AdicionarInsumo}
    options={{
        headerShown: false, 
    }}
  />
</Stack.Navigator>
)}