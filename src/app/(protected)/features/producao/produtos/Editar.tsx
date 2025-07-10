import { Produto } from "@/domain/models/Produto";
import ProdutoForm from "@/presentation/components/Produto/ProdutoForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function EditarProduto() {
    const route = useRoute();
    const { produto } = route.params as { produto: Produto };
    const navigation = useNavigation();
  
    return (
      <PageAdicionarLayout  pageName="Editar Produto">
        <ProdutoForm produto={produto} onCancel={() => navigation.goBack()} />
      </PageAdicionarLayout>
    );
  }
  