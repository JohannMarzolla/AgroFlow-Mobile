// produtos.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProdutosStackParamList } from "./ProdutosStack"; 
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import ProdutoItem from "@/presentation/components/Produto/ProdutoItem";
import Lista from "@/shared/utils/Lista";


type ProdutosNavigationProp = NativeStackNavigationProp<ProdutosStackParamList, "Produtos">;

export  function TelaDeProdutos() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { produtos } = useProdutos();
    console.log("produtos em tela de  produtos", produtos)


  return (
    <View className="flex-1 pt-6 px-6">
      <TouchableHighlight
        className="bg-green-600 px-6 py-3 rounded-lg mb-6"
        underlayColor="#38a169"
        onPress={() => navigation.navigate("AdicionarProduto")} 
      >
        <Text className="text-white text-lg font-semibold text-center">Adicionar</Text>
      </TouchableHighlight>

      <Lista data={produtos} keyExtractor={(item)=> item.id.toString()}  renderItem={({ item }) => <ProdutoItem produto={item} /> }/>
    </View>
  );
}

export default function Produtos() {
  return (
      <TelaDeProdutos />
  );
}