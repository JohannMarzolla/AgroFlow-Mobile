import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { VendaStackParamList } from "./VendaStack";
import { useVenda } from "@/presentation/contexts/comercial/VendaContext";
import PageHeader from "@/presentation/components/ui/PageHeader";
import { Venda as VendaModel } from "@/domain/models/comercial/Venda";
import VendaItem from "@/presentation/components/comercial/Venda/VendaItem";
import PaginatedList from "@/presentation/components/ui/PaginatedList";

type VendaNavigationProp = NativeStackNavigationProp<
  VendaStackParamList,
  "Lista"
>;

export function Tela() {
  const navigation = useNavigation<VendaNavigationProp>();
  const { vendas, loading, carregar } = useVenda();

  return (
    <View className="flex-1">
      <PageHeader
        pageName="Vendas"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarVenda")}
      />

      <PaginatedList
        data={vendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <VendaItem venda={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: VendaModel) =>
          navigation.navigate("EditarVenda", { venda: item })
        }
      />
    </View>
  );
}

export default function Venda() {
  return <Tela />;
}
