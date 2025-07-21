import { Venda } from "@/domain/models/comercial/Venda";
import VendaForm from "@/presentation/components/comercial/Venda/VendaForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function EditarVenda() {
  const route = useRoute();
  const { venda } = route.params as { venda: Venda };
  const navigation = useNavigation();

  return (
    <PageAdicionarLayout pageName="Editar venda">
      <VendaForm venda={venda} onCancel={() => navigation.goBack()} />
    </PageAdicionarLayout>
  );
}
