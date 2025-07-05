import { Text, View } from "react-native";
import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";

export interface IEstoqueInsumoItem {
  estoqueInsumo: EstoqueInsumo;
}

export default function EstoqueInsumoItem({ estoqueInsumo }: IEstoqueInsumoItem) {
  return (
    <View className="bg-white p-4 rounded shadow-md mb-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-800 font-medium capitalize">
          {estoqueInsumo.insumoNome}
        </Text>
        <Text className="text-gray-800 font-semibold text-lg">
          {estoqueInsumo.unidadeMedidaSigla}
        </Text>
      </View>
      <View className="flex-row justify-between ">
        <Text className="text-gray-800 font-semibold text-lg">
          {estoqueInsumo.quantidade}
        </Text>
        <Text className="text-gray-800 font-semibold text-lg">
          R$ {estoqueInsumo.preco.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
