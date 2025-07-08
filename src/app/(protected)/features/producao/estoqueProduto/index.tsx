import React from "react";
import { View, Text,  } from "react-native";
import { useEstoqueProduto } from "@/presentation/contexts/EstoqueProdutoContext";
import EstoqueProdutoItem from "@/presentation/components/estoqueProduto/EstoqueProdutoItem";
import Lista from "@/shared/utils/Lista";



function TelaDeEstoqueProduto() {
  const { estoqueProdutos } = useEstoqueProduto();


  return (
    <View className="flex-1 pt-6 px-6">
        <Lista
          data={estoqueProdutos}
          renderItem={({ item }) => <EstoqueProdutoItem estoqueProduto={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
  
  );
}

export default function EstoqueProduto() {
  return <TelaDeEstoqueProduto />;
} 