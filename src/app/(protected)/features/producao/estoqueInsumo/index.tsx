import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import { useEstoqueInsumo } from "@/presentation/contexts/EstoqueInsumoContext";
import EstoqueInsumoItem from "@/presentation/components/estoqueInsumo/EstoqueInsumoItem";
import PaginatedList from "@/presentation/components/ui/PaginatedList";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EstoqueInsumoStackParamList } from "./EstoqueInsumoStack";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";
import { EstoqueInsumo as EstoqueInsumoModel } from "@/domain/models/EstoqueInsumo";

type EstoqueInsumoNavigationProp = NativeStackNavigationProp<
  EstoqueInsumoStackParamList,
  "Lista"
>;

export default function EstoqueInsumo() {
  const { estoqueInsumos, carregar, loading } = useEstoqueInsumo();
  const navigation = useNavigation<EstoqueInsumoNavigationProp>();

  return (
    <View className="flex-1 ">
      <PageHeader
        pageName="Estoque Insumo"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarEstoqueInsumo")}
      ></PageHeader>

      <PaginatedList
        data={estoqueInsumos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EstoqueInsumoItem estoqueInsumo={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: EstoqueInsumoModel) =>
          navigation.navigate("EditarEstoqueInsumo", { estoqueInsumo: item })
        }
      />
    </View>
  );
}
