// ProdutosStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Produtos from ".";
import AdicionarProduto from "./adicionar";


export type ProdutosStackParamList = {
  Produtos: undefined;
  AdicionarProduto: undefined;
};

const Stack = createNativeStackNavigator<ProdutosStackParamList>();

export default function ProdutosStack() {
  return (
   <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Produtos" component={Produtos}   />
     <Stack.Screen
    name="AdicionarProduto"
    component={AdicionarProduto}
    options={{
        headerShown: false, 
    }}
  />
</Stack.Navigator>
)}