import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PaginatedList from "@/presentation/components/ui/PaginatedList";
import { useInsumo } from "@/presentation/contexts/InsumoContext";
import InsumoItem from "@/presentation/components/Insumo/InsumoItem";
import { InsumoStackParamList } from "./InsumoStack";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";
import { Insumo as InsumoModel } from "@/domain/models/Insumo";

type InsumoNavigationProp = NativeStackNavigationProp<
  InsumoStackParamList,
  "Lista"
>;

export function TelaDeProducao() {
  const navigation = useNavigation<InsumoNavigationProp>();
  const { insumos, carregar, loading } = useInsumo();

  return (
    <View className="flex-1 ">
      <PageHeader
        pageName="Insumo"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarInsumo")}
      ></PageHeader>

      <View className="px-6 pb-4">
        <InputSelect
          label="Tipo"
          labelTextBold={false}
          // options={MetaConsts.Tipos}
        />
      </View>

      <PaginatedList
        data={insumos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <InsumoItem insumo={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: InsumoModel) =>
          navigation.navigate("EditarInsumo", { insumo: item })
        }
      />
    </View>
  );
}

export default function Insumo() {
  return <TelaDeProducao />;
}
