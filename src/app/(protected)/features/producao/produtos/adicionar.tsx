import React from "react";
import ProdutoForm from "@/presentation/components/Produto/ProdutoForm";
import { useNavigation } from "@react-navigation/native";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";

export default function AdicionarProduto() {
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Adicionar Produto">
      <ProdutoForm onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
