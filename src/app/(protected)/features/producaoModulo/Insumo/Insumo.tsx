import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Lista from "@/shared/utils/Lista";
import { useInsumo } from "@/presentation/contexts/InsumoContext";
import InsumoItem from "@/presentation/components/Insumo/InsumoItem";
import { InsumoStackParamList } from "./InsumoStack";

type InsumoNavigationProp = NativeStackNavigationProp<InsumoStackParamList, "Insumo">;

export  function TelaDeProducao() {
  const navigation = useNavigation<InsumoNavigationProp>();
  const { insumo } = useInsumo();

  
  return (
    <View className="flex-1 pt-6 px-6">
      <TouchableHighlight
        className="bg-green-600 px-6 py-3 rounded-lg mb-6"
        underlayColor="#38a169"
        onPress={() => navigation.navigate("AdicionarInsumo")} 
      >
        <Text className="text-white text-lg font-semibold text-center">Adicionar</Text>
      </TouchableHighlight>

      <Lista data={insumo} keyExtractor={(item)=> item.id.toString()}  renderItem={({ item }) => <InsumoItem insumo={item} /> } />
    </View>
  );
}

export default function Insumo() {
  return (
      <TelaDeProducao />
  );
}