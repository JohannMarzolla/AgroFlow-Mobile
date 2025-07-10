import { Fazenda } from "@/domain/models/Fazenda";
import FazendaForm from "@/presentation/components/Fazenda/FazendaForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function EditarFazenda() {
    const route = useRoute();
    const { fazenda } = route.params as { fazenda: Fazenda };
    const navigation = useNavigation();
  
    return (
      <PageAdicionarLayout  pageName="Editar fazenda">
        <FazendaForm fazenda={fazenda} onCancel={() => navigation.goBack()} />
      </PageAdicionarLayout>
    );
  }
  