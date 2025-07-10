import { Text, View } from "react-native";
import { Medida } from "@/domain/models/Medida";

export interface IMedidaItem {
  medida: Medida;
}

export default function MedidaItem({ medida }: IMedidaItem) {
  return (
    <View className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-900 font-semibold capitalize text-lg">
          {medida.nome}
        </Text>
        <Text className="text-gray-700 capitalize">{medida.sigla}</Text>
      </View>
    </View>
  );
}
