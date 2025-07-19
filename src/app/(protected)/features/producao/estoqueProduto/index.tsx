import React from "react";
import { View, Text } from "react-native";
import { useEstoqueProduto } from "@/presentation/contexts/EstoqueProdutoContext";
import EstoqueProdutoItem from "@/presentation/components/estoqueProduto/EstoqueProdutoItem";
import PaginatedList from "@/presentation/components/ui/PaginatedList";
import { EstoqueProduto as EstoqueProdutoModel } from "@/domain/models/EstoqueProduto";
import { useNavigation } from "@react-navigation/native";
import { EstoqueProdutoStackParamList } from "./EstoqueProdutoStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PageHeader from "@/presentation/components/ui/PageHeader";

type EstoqueProdutoNavigationProp = NativeStackNavigationProp<
  EstoqueProdutoStackParamList,
  "Lista"
>;

function TelaDeEstoqueProduto() {
  const { estoqueProdutos, loading, carregar } = useEstoqueProduto();

  const navigation = useNavigation<EstoqueProdutoNavigationProp>();

  return (
    <View className="flex-1 ">
      <PageHeader pageName="Estoque de produtos"></PageHeader>

      <PaginatedList
        data={estoqueProdutos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EstoqueProdutoItem estoqueProduto={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: EstoqueProdutoModel) =>
          navigation.navigate("EditarEstoqueProduto", { estoqueProduto: item })
        }
      />
    </View>
  );
}

export default function EstoqueProduto() {
  return <TelaDeEstoqueProduto />;
}
