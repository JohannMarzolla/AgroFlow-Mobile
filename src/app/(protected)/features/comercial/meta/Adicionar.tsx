import React from "react";
import { useNavigation } from "@react-navigation/native";
import MetaForm from "@/presentation/components/comercial/meta/MetaForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";

export default function AdicionarMeta() {
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Adicionar Meta">
      <MetaForm onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
