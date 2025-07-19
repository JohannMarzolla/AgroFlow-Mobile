import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EstoqueProduto from ".";
import { EstoqueProduto as EstoqueProdutoModel } from "@/domain/models/EstoqueProduto";
import EditarEstoqueProduto from "./Editar";

export type EstoqueProdutoStackParamList = {
  Lista: undefined;
  EditarEstoqueProduto: { estoqueProduto: EstoqueProdutoModel };
};

const Stack = createNativeStackNavigator<EstoqueProdutoStackParamList>();

export default function EstoqueProdutoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista"
        component={EstoqueProduto}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditarEstoqueProduto"
        component={EditarEstoqueProduto}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
