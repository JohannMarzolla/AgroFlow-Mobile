import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProducaoStackParamList } from "./ProducaoStack";
import { useProducao } from "@/presentation/contexts/ProducaoContext";
import PaginatedList from "@/presentation/components/ui/PaginatedList";
import ProducaoItem from "@/presentation/components/Producao/ProducaoItem";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";
import { Producao as ProducaoModel } from "@/domain/models/Producao";

type ProdutosNavigationProp = NativeStackNavigationProp<
  ProducaoStackParamList,
  "Lista"
>;

export function TelaDeProducao() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { producao, carregar, loading } = useProducao();

  return (
    <View className="flex-1">
      <PageHeader
        pageName="Produções"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarProducao")}
      ></PageHeader>

      <View className="px-6 pb-4">
        <InputSelect label="Tipo" labelTextBold={false} />
      </View>

      <PaginatedList
        data={producao}
        keyExtractor={(prod) => prod.id.toString()}
        renderItem={({ item }) => <ProducaoItem producao={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: ProducaoModel) =>
          navigation.navigate("EditarProducao", { producao: item })
        }
      />
    </View>
  );
}

export default function Producao() {
  return <TelaDeProducao />;
}
