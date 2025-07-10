import React from "react";
import { View, Text,  } from "react-native";
import { useEstoqueProduto } from "@/presentation/contexts/EstoqueProdutoContext";
import EstoqueProdutoItem from "@/presentation/components/estoqueProduto/EstoqueProdutoItem";
import Lista from "@/shared/utils/Lista";
import { EstoqueProduto as EstoqueProdutoModel } from "@/domain/models/EstoqueProduto";
import { useNavigation } from "@react-navigation/native";
import { EstoqueProdutoStackParamList } from "./EstoqueProdutoStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type EstoqueProdutoNavigationProp = NativeStackNavigationProp<EstoqueProdutoStackParamList, "EstoqueProduto">;


function TelaDeEstoqueProduto() {
  const { estoqueProdutos , loading, carregar} = useEstoqueProduto();

  const navigation = useNavigation<EstoqueProdutoNavigationProp>();

  return (
    <View className="flex-1 pt-6 px-6">
          <Lista
       data={estoqueProdutos} 
       keyExtractor={(item)=> item.id.toString()}  
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