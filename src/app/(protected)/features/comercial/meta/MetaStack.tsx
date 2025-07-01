import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Metas from "./Meta";
import AdicionarMeta from "./Adicionar";
import { MetaProvider } from "@/presentation/contexts/comercial/MetaContext";
import EditarMeta from "./Editar";
import { Meta } from "@/domain/models/comercial/Meta";

export type MetaStackParamList = {
  Lista: undefined;
  AdicionarMeta: undefined;
  EditarMeta: { meta: Meta };
};

const Stack = createNativeStackNavigator<MetaStackParamList>();

export default function MetaStack() {
  return (
    <MetaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Lista" component={Metas} />
        <Stack.Screen
          name="AdicionarMeta"
          component={AdicionarMeta}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditarMeta"
          component={EditarMeta}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </MetaProvider>
  );
}
