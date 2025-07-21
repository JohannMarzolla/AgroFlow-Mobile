import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";
import EstoqueInsumoForm from "@/presentation/components/estoqueInsumo/EstoqueInsumoForm";

export default function EditarEstoqueInsumo() {
  const route = useRoute();
  const { estoqueInsumo } = route.params as { estoqueInsumo: EstoqueInsumo };
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Editar Estoque de Insumo">
      <EstoqueInsumoForm
        estoqueInsumo={estoqueInsumo}
        onCancel={() => navigation.goBack()}
      />
    </PageAdicionarLayout>
  );
}
