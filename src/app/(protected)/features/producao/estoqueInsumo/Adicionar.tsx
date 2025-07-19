import React from "react";
import { useNavigation } from "@react-navigation/native";
import EstoqueInsumoForm from "@/presentation/components/estoqueInsumo/EstoqueInsumoForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";

export default function AdicionarEstoqueInsumo() {
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Adicionar Estoque de Insumos">
      <EstoqueInsumoForm onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
