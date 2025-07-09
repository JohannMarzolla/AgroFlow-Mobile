import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";

export default function EditarEstoqueInsumo() {
  const route = useRoute();
  const { estoqueInsumo } = route.params as { estoqueInsumo: EstoqueInsumo };
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout  pageName="Editar estoqueInsumo">
      <text>ld</text>
    </PageAdicionarLayout>
  );
}
