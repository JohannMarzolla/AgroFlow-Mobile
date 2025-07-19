import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MetaForm from "@/presentation/components/comercial/meta/MetaForm";
import { Meta } from "@/domain/models/comercial/Meta";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";

export default function EditarMeta() {
  const route = useRoute();
  const { meta } = route.params as { meta: Meta };
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Editar Meta">
      <MetaForm meta={meta} onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
