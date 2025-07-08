import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EstoqueProduto from ".";

export type EstoqueProdutoStackParamList = {
  EstoqueProduto: undefined;

};

const Stack = createNativeStackNavigator<EstoqueProdutoStackParamList>();

export default function EstoqueProdutoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="EstoqueProduto" 
        component={EstoqueProduto} 
        options={{
          headerShown: false, 
      }}
      />
 
    </Stack.Navigator>
  );
} 