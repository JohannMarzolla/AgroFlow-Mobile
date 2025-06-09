// produtos.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProducaoStackParamList } from "./ProducaoStack";
import { useProducao } from "@/presentation/contexts/ProducaoContext";
import Lista from "@/shared/utils/Lista";
import ProducaoItem from "@/presentation/components/Producao/ProducaoItem";

type ProdutosNavigationProp = NativeStackNavigationProp<ProducaoStackParamList, "Producao">;

export  function TelaDeProducao() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { producao } = useProducao();
  
  return (
    <View className="flex-1 pt-6 px-6">
      <TouchableHighlight
        className="bg-green-600 px-6 py-3 rounded-lg mb-6"
        underlayColor="#38a169"
        onPress={() => navigation.navigate("AdicionarProducao")} 
      >
        <Text className="text-white text-lg font-semibold text-center">Adicionar</Text>
      </TouchableHighlight>

      <Lista data={producao} keyExtractor={(prod)=> prod.id.toString()}  renderItem={({ item }) => <ProducaoItem producao={item} /> } />
    </View>
  );
}

export default function Producao() {
  return (
      <TelaDeProducao />
  );
}