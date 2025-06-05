import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Lista from "@/shared/utils/Lista";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { FazendaStackParamList } from "./FazendaStack";
import FazendaItem from "@/presentation/components/Fazenda/FazendaItem";

type ProdutosNavigationProp = NativeStackNavigationProp<FazendaStackParamList, "Fazenda">;

export  function TelaDeProducao() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { fazenda } = useFazenda();
  
  return (
    <View className="flex-1 pt-6 px-6">
      <TouchableHighlight
        className="bg-green-600 px-6 py-3 rounded-lg mb-6"
        underlayColor="#38a169"
        onPress={() => navigation.navigate("AdicionarFazenda")} 
      >
        <Text className="text-white text-lg font-semibold text-center">Adicionar</Text>
      </TouchableHighlight>

      <Lista data={fazenda} keyExtractor={(item)=> item.id.toString()}  renderItem={({ item }) => <FazendaItem fazenda={item} /> } />
    </View>
  );
}

export default function Fazenda() {
  return (
      <TelaDeProducao />
  );
}