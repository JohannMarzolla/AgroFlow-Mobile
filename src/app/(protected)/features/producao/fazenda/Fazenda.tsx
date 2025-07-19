import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PaginatedList from "@/presentation/components/ui/PaginatedList";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { FazendaStackParamList } from "./FazendaStack";
import FazendaItem from "@/presentation/components/Fazenda/FazendaItem";
import PageHeader from "@/presentation/components/ui/PageHeader";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { Fazenda as FazendaModel } from "@/domain/models/Fazenda";

type ProdutosNavigationProp = NativeStackNavigationProp<
  FazendaStackParamList,
  "Lista"
>;

export function TelaDeProducao() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { fazenda, carregar, loading } = useFazenda();
  const { user } = useAuth();

  const userCanEdit =
    user?.setor === UsuarioSetorEnum.ADMIN ||
    user?.setor === UsuarioSetorEnum.PRODUCAO;

  return (
    <View className="flex-1 ">
      <PageHeader
        pageName="Fazendas"
        showAdd={userCanEdit}
        onAdicionar={() => navigation.navigate("AdicionarFazenda")}
      ></PageHeader>

      <PaginatedList
        data={fazenda}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FazendaItem fazenda={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: FazendaModel) =>
          navigation.navigate("EditarFazenda", { fazenda: item })
        }
      />
    </View>
  );
}

export default function Fazenda() {
  return <TelaDeProducao />;
}
