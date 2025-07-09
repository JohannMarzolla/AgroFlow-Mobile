import React from "react";
import { View, Text,  } from "react-native";
import { useEstoqueProduto } from "@/presentation/contexts/EstoqueProdutoContext";
import EstoqueProdutoItem from "@/presentation/components/estoqueProduto/EstoqueProdutoItem";
import Lista from "@/shared/utils/Lista";



function TelaDeEstoqueProduto() {
  const { estoqueProdutos , loading, carregar} = useEstoqueProduto();


  return (
    <View className="flex-1 pt-6 px-6">
          <Lista
       data={estoqueProdutos} 
       keyExtractor={(item)=> item.id.toString()}  
       renderItem={({ item }) => <EstoqueProdutoItem estoqueProduto={item} />}
       loadingMore={loading}
       onEndReached={() => carregar()}
      //  onEdit={(item: ProducaoModel) =>
      //   navigation.navigate("ProducaoDetalhes", { producao: item })
      // }
        />
      </View>
  
  );
}

export default function EstoqueProduto() {
  return <TelaDeEstoqueProduto />;
} 