import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import EstoqueProdutoForm from "@/presentation/components/estoqueProduto/EstoqueProdutoForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function EditarEstoqueProduto() {
  const route = useRoute();
  const { estoqueProduto } = route.params as { estoqueProduto: EstoqueProduto };
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Editar Estoque de Produto">
      <EstoqueProdutoForm
        estoqueProduto={estoqueProduto}
        onCancel={() => navigation.goBack()}
      />
      .
    </PageAdicionarLayout>
  );
}
