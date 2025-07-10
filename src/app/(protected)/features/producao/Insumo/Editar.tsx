import { Insumo } from "@/domain/models/Insumo";
import InsumoForm from "@/presentation/components/Insumo/InsumoForm";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function EditarInsumo() {
    const route = useRoute();
    const { insumo } = route.params as { insumo:Insumo };
    const navigation = useNavigation();
  
    return (
      <PageAdicionarLayout  pageName="Editar Insumo">
        <InsumoForm insumo={insumo} onCancel={() => navigation.goBack()} />
      </PageAdicionarLayout>
    );
  }
  