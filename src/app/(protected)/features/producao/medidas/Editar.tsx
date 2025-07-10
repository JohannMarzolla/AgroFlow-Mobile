import { Medida } from "@/domain/models/Medida";
import PageAdicionarLayout from "@/presentation/components/ui/PageAdicionarLayout";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function EditarEstoqueInsumo() {
    const route = useRoute();
    const { medida} = route.params as { medida: Medida };
    const navigation = useNavigation();
  
    return (
      <PageAdicionarLayout  pageName="Editar unidadeMedida">
        <text>ld</text>
      </PageAdicionarLayout>
    );
  }
  