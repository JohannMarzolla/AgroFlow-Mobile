import React from "react";
import { useNavigation } from "@react-navigation/native";
import MedidaForm from "@/presentation/components/Medida/MedidaForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";

export default function AdicionarMedida() {
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Adicionar Unidade de Medida">
      <MedidaForm onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
