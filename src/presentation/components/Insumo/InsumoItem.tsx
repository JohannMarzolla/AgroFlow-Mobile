import { Insumo } from "@/domain/models/Insumo";
import { Text, View } from "react-native";

export interface IinsumoItem {
  insumo: Insumo;
}

export default function InsumoItem({ insumo }: IinsumoItem) {
 
  return (
    <View className="rounded-2xl p-4 mb-4 bg-gray-200 shadow-sm">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-900 font-semibold capitalize text-lg">
          {insumo.nome}
        </Text>
        <Text className="text-gray-700 capitalize">
          {insumo.unidadeMedidaSigla}
        </Text>
      </View>
    </View>
  );
}
