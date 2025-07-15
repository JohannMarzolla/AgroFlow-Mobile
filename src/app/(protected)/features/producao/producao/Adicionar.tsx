import React from "react";
import { useNavigation } from "@react-navigation/native";
import ProducaoForm from "@/presentation/components/Producao/ProducaoForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";


export default function AdicionarProducao() {
   const navigation = useNavigation();
   
  return (
    <PageAdicionarLayout pageName="Adicionar Producao">
    <ProducaoForm onCancel={() => navigation.goBack()} />
  </PageAdicionarLayout>
  );
}
