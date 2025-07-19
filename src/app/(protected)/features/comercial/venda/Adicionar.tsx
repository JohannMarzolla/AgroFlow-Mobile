import React from "react";
import { useNavigation } from "@react-navigation/native";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import VendaForm from "@/presentation/components/comercial/meta/Venda/VendaForm";

export default function AdicionarVenda() {
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Adicionar venda">
      <VendaForm onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
