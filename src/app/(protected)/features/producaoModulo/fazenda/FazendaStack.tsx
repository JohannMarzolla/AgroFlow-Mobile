import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdicionarFazenda from "./Adicionar";
import Fazenda from "./Fazenda";


export type FazendaStackParamList = {
  Fazenda: undefined;
  AdicionarFazenda: undefined;
};

const Stack = createNativeStackNavigator<FazendaStackParamList>();

export default function FazendaStack() {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Fazenda" component={Fazenda}   />
     <Stack.Screen
    name="AdicionarFazenda"
    component={AdicionarFazenda}
    options={{
        headerShown: false, 
    }}
  />
</Stack.Navigator>
)}