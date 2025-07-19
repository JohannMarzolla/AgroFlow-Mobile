import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import UsuarioForm from "@/presentation/components/outros/usuario/UsuarioForm";
import { Usuario } from "@/domain/models/outros/Usuario";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";

export default function EditarUsuario() {
  const route = useRoute();
  const { usuario } = route.params as { usuario: Usuario };
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Editar Usuário">
      <UsuarioForm usuario={usuario} onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
