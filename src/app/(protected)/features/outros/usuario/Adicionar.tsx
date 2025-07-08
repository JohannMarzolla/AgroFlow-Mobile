import React from "react";
import { useNavigation } from "@react-navigation/native";
import UsuarioForm from "@/presentation/components/outros/usuario/UsuarioForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";

export default function AdicionarUsuario() {
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Adicionar usuario">
      <UsuarioForm onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
