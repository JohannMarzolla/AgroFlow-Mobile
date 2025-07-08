import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdicionarUsuario from "./Adicionar";
import EditarUsuario from "./Editar";
import { Usuario } from "@/domain/models/outros/Usuario";
import { UsuarioProvider } from "@/presentation/contexts/outros/UsuarioContext";
import Usuarios from "./Usuario";

export type UsuarioStackParamList = {
  Lista: undefined;
  AdicionarUsuario: undefined;
  EditarUsuario: { usuario: Usuario };
};

const Stack = createNativeStackNavigator<UsuarioStackParamList>();

export default function UsuarioStack() {
  return (
    <UsuarioProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Lista" component={Usuarios} />
        <Stack.Screen
          name="AdicionarUsuario"
          component={AdicionarUsuario}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditarUsuario"
          component={EditarUsuario}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </UsuarioProvider>
  );
}
