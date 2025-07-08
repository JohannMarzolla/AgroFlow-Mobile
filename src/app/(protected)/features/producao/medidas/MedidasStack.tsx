import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdicionarMedida from "./Adicionar";
import Medida from "./Medida";


export type MedidaStackParamList = {
  Medida: undefined;
  AdicionarMedida: undefined;
};

const Stack = createNativeStackNavigator<MedidaStackParamList>();

export default function MedidaStack() {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Medida" component={Medida}   />
     <Stack.Screen
    name="AdicionarMedida"
    component={AdicionarMedida}
    options={{
        headerShown: false, 
    }}
  />
</Stack.Navigator>
)}