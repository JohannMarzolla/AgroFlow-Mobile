import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Lista from "@/shared/utils/Lista";

import { useMedida } from "@/presentation/contexts/MedidaContext";
import MedidaItem from "@/presentation/components/Medida/MedidaItem";
import { MedidaStackParamList } from "./MedidasStack";

type MedidaNavigationProp = NativeStackNavigationProp<MedidaStackParamList, "Medida">;

export  function TelaDeProducao() {
  const navigation = useNavigation<MedidaNavigationProp>();
  const { medida } = useMedida();
  
  
  return (
    <View className="flex-1 pt-6 px-6">
      <TouchableHighlight
        className="bg-green-600 px-6 py-3 rounded-lg mb-6"
        underlayColor="#38a169"
        onPress={() => navigation.navigate("AdicionarMedida")} 
      >
        <Text className="text-white text-lg font-semibold text-center">Adicionar</Text>
      </TouchableHighlight>

      <Lista data={medida} keyExtractor={(item)=> item.id.toString()}  renderItem={({ item }) => <MedidaItem medida={item} /> } />
    </View>
  );
}

export default function Medida() {
  return (
      <TelaDeProducao />
  );
}