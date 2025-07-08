import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import UsuarioForm from "@/presentation/components/outros/usuario/UsuarioForm";
import PageHeader from "@/presentation/components/ui/PageHeader";

export default function AdicionarUsuario() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <PageHeader pageName="Adicionar usuario"></PageHeader>
      <UsuarioForm onCancel={() => navigation.goBack()} />
    </View>
  );
}
