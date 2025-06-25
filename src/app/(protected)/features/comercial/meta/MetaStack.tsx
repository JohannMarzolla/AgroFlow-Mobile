import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Meta from "./Meta";
import AdicionarMeta from "./Adicionar";
import { MetaProvider } from "@/presentation/contexts/comercial/MetaContext";

export type MetaStackParamList = {
  Lista: undefined;
  AdicionarMeta: undefined;
};

const Stack = createNativeStackNavigator<MetaStackParamList>();

export default function MetaStack() {
  return (
    <MetaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Lista" component={Meta} />
        <Stack.Screen
          name="AdicionarMeta"
          component={AdicionarMeta}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </MetaProvider>
  );
}
