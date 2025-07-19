import React from "react";
import { useNavigation } from "@react-navigation/native";
import InsumoForm from "@/presentation/components/Insumo/InsumoForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";

export default function AdicionarInsumo() {
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Adicionar Insumo">
      <InsumoForm onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
