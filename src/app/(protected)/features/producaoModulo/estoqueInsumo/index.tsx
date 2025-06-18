import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import { useProducao } from "@/presentation/contexts/EstoqueInsumoContext";
import EstoqueInsumoItem from "@/presentation/components/estoqueInsumo/EstoqueInsumoItem";
import Lista from "@/shared/utils/Lista";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EstoqueInsumoStackParamList } from "./EstoqueInsumoStack";

// Tipagem correta:
type EstoqueInsumoNavigationProp = NativeStackNavigationProp<EstoqueInsumoStackParamList, "EstoqueInsumo">;

export default function EstoqueInsumo() {
  const { insumos } = useProducao();
  const navigation = useNavigation<EstoqueInsumoNavigationProp>();

  return (
    <View className="flex-1 pt-6 px-6">
      <TouchableHighlight
        className="bg-green-600 px-6 py-3 rounded-lg mb-6"
        underlayColor="#38a169"
        onPress={() => navigation.navigate("AdicionarEstoqueInsumo")}
      >
        <Text className="text-white text-lg font-semibold text-center">Adicionar</Text>
      </TouchableHighlight>
      <Lista
        data={insumos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EstoqueInsumoItem estoqueInsumo={item} />}
        
      />
    </View>
  );
} 