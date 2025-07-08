import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import UsuarioForm from "@/presentation/components/outros/usuario/UsuarioForm";

export default function AdicionarUsuario() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 p-6 bg-white">
      <UsuarioForm onCancel={() => navigation.goBack()} />
    </View>
  );
}
