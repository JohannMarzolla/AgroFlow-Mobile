// produtos.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ListaProdutos from "@/presentation/components/Produto/ListaProdutos";
import { ProducaoStackParamList } from "./ProducaoStack";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import { useProducao } from "@/presentation/contexts/ProducaoContext";

type ProdutosNavigationProp = NativeStackNavigationProp<ProducaoStackParamList, "Producao">;

export  function TelaDeProducao() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { produtos } = useProdutos();
    
  return (
    <View className="flex-1 pt-6 px-6">
      <TouchableHighlight
        className="bg-green-600 px-6 py-3 rounded-lg mb-6"
        underlayColor="#38a169"
        onPress={() => navigation.navigate("AdicionarProducao")} // <- o nome da rota como definido no stack
      >
        <Text className="text-white text-lg font-semibold text-center">Adicionar</Text>
      </TouchableHighlight>

      <ListaProdutos produtos={produtos} />
    </View>
  );
}

export default function Producao() {
  return (
      <TelaDeProducao />
  );
}