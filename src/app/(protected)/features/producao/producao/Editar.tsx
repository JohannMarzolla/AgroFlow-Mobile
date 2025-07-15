import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Producao } from "@/domain/models/Producao";
import ProducaoForm from "@/presentation/components/Producao/ProducaoForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";


export default function EditarProducao() {
  const route = useRoute();
  const { producao } = route.params as { producao: Producao };
  const navigation = useNavigation();

   return(
    <PageAdicionarLayout pageName="Editar Producao">
    <ProducaoForm producao={producao} onCancel={() => navigation.goBack()} />
  </PageAdicionarLayout>
   )
}
