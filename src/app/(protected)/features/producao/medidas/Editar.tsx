import { Medida } from "@/domain/models/Medida";
import MedidaForm from "@/presentation/components/Medida/MedidaForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function EditarMedida() {
  const route = useRoute();
  const { medida } = route.params as { medida: Medida };
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Editar Unidade de Medida">
      <MedidaForm medida={medida} onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
