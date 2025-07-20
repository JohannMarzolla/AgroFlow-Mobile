import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Producao from "./Producao";
import AdicionarProducao from "./Adicionar";
import { Producao as ProducaoModel } from "@/domain/models/Producao";
import EditarProducao from "./Editar";

export type ProducaoStackParamList = {
  Cadastro: undefined;
  AdicionarProducao: undefined;
  EditarProducao: { producao: ProducaoModel };
};

const Stack = createNativeStackNavigator<ProducaoStackParamList>();

export default function ProducaoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cadastro" component={Producao} />
      <Stack.Screen
        name="AdicionarProducao"
        component={AdicionarProducao}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditarProducao"
        component={EditarProducao}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
