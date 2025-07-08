import { View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import UsuarioForm from "@/presentation/components/outros/usuario/UsuarioForm";
import { Usuario } from "@/domain/models/outros/Usuario";

export default function EditarUsuario() {
  const route = useRoute();
  const { usuario } = route.params as { usuario: Usuario };
  const navigation = useNavigation();

  return (
    <View className="flex-1 p-6 bg-white">
      <UsuarioForm usuario={usuario} onCancel={() => navigation.goBack()} />
    </View>
  );
}
