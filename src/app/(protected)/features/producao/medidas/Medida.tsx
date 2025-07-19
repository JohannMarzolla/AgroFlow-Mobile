import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PaginatedList from "@/presentation/components/ui/PaginatedList";
import { useMedida } from "@/presentation/contexts/MedidaContext";
import MedidaItem from "@/presentation/components/Medida/MedidaItem";
import { MedidaStackParamList } from "./MedidasStack";
import PageHeader from "@/presentation/components/ui/PageHeader";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { Medida as MedidaModel } from "@/domain/models/Medida";

type MedidaNavigationProp = NativeStackNavigationProp<
  MedidaStackParamList,
  "Medida"
>;

export function TelaDeProducao() {
  const navigation = useNavigation<MedidaNavigationProp>();
  const { medida, carregar, loading } = useMedida();
  const { user } = useAuth();

  const userCanEdit =
    user?.setor === UsuarioSetorEnum.ADMIN ||
    user?.setor === UsuarioSetorEnum.PRODUCAO;

  return (
    <View className="flex-1">
      <PageHeader
        pageName="Unidades de Medida"
        showAdd={userCanEdit}
        onAdicionar={() => navigation.navigate("AdicionarMedida")}
      ></PageHeader>

      <PaginatedList
        data={medida}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MedidaItem medida={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: MedidaModel) =>
          navigation.navigate("EditarMedida", { medida: item })
        }
      />
    </View>
  );
}

export default function Medida() {
  return <TelaDeProducao />;
}
