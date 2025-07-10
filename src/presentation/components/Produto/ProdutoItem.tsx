import { Text, View } from "react-native";
import { Produto } from "@/domain/models/Produto";

export interface IProdutoItem {
  produto: Produto;
}

export default function ProdutoItem({ produto }: IProdutoItem) {
  return (
    <View className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200">
      <View className="flex-row justify-between">
        <Text className="text-gray-900 font-semibold capitalize text-lg">
          {produto.nome}
        </Text>

        <Text className="text-gray-700 capitalize">
          {produto.unidadeMedidaSigla}
        </Text>
      </View>
    </View>
  );
}
