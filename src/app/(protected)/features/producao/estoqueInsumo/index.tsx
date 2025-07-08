import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import { useProducao } from "@/presentation/contexts/EstoqueInsumoContext";
import EstoqueInsumoItem from "@/presentation/components/estoqueInsumo/EstoqueInsumoItem";
import Lista from "@/shared/utils/Lista";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EstoqueInsumoStackParamList } from "./EstoqueInsumoStack";

type EstoqueInsumoNavigationProp = NativeStackNavigationProp<EstoqueInsumoStackParamList, "EstoqueInsumo">;

export default function EstoqueInsumo() {
  const { estoqueInsumos } = useProducao();
  const navigation = useNavigation<EstoqueInsumoNavigationProp>();
  console.log("estoque insumo item", estoqueInsumos )

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
        data={estoqueInsumos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EstoqueInsumoItem estoqueInsumo={item} />}
        
      />
    </View>
  );
} 