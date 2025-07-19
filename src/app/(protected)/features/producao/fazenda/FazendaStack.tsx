import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdicionarFazenda from "./Adicionar";
import Fazenda from "./Fazenda";
import EditarFazenda from "./Editar";
import { Fazenda as fazendaModel } from "@/domain/models/Fazenda";

export type FazendaStackParamList = {
  Lista: undefined;
  AdicionarFazenda: undefined;
  EditarFazenda: { fazenda: fazendaModel };
};

const Stack = createNativeStackNavigator<FazendaStackParamList>();

export default function FazendaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lista" component={Fazenda} />
      <Stack.Screen
        name="AdicionarFazenda"
        component={AdicionarFazenda}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditarFazenda"
        component={EditarFazenda}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
