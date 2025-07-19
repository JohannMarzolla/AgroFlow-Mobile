// ProdutosStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Produtos from ".";
import AdicionarProduto from "./adicionar";
import EditarProduto from "./Editar";
import { Produto } from "@/domain/models/Produto";

export type ProdutosStackParamList = {
  Lista: undefined;
  AdicionarProduto: undefined;
  EditarProduto: { produto: Produto };
};

const Stack = createNativeStackNavigator<ProdutosStackParamList>();

export default function ProdutosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lista" component={Produtos} />
      <Stack.Screen
        name="AdicionarProduto"
        component={AdicionarProduto}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditarProduto"
        component={EditarProduto}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
