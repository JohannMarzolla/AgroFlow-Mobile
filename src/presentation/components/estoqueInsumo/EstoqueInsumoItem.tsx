import { Text, View } from "react-native";
import { EstoqueInsumo } from "@/domain/models/EstoqueInsumo";
import { formatarMoeda } from "@/shared/utils/formatarMoeda";

export interface IEstoqueInsumoItem {
  estoqueInsumo: EstoqueInsumo;
}

export default function EstoqueInsumoItem({
  estoqueInsumo,
}: IEstoqueInsumoItem) {
  return (
    <View className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-900 font-semibold capitalize text-lg">
          {estoqueInsumo.insumoNome}
        </Text>
        <Text className="text-gray-500 font-semibold">
          {estoqueInsumo.quantidade} {estoqueInsumo.unidadeMedidaSigla}
        </Text>
      </View>

      <View className="flex-row justify-between ">
        <Text className="text-gray-700">
          {formatarMoeda(estoqueInsumo.preco ?? 0)}
        </Text>
      </View>
    </View>
  );
}
