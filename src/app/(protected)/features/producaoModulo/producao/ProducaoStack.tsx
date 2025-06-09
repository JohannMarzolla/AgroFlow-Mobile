import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Producao from "./Producao";
import AdicionarProducao from "./Adicionar";

export type ProducaoStackParamList = {
  Producao: undefined;
  AdicionarProducao: undefined;
};

const Stack = createNativeStackNavigator<ProducaoStackParamList>();

export default function ProducaoStack() {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Producao" component={Producao}   />
     <Stack.Screen
    name="AdicionarProducao"
    component={AdicionarProducao}
    options={{
        headerShown: false, 
    }}
  />
</Stack.Navigator>
)}