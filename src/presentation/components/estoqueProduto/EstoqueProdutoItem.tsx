import { Text, View } from "react-native";
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import { formatarMoeda } from "@/shared/utils/formatarMoeda";

export interface IEstoqueProdutoItem {
  estoqueProduto: EstoqueProduto;
}

export default function EstoqueProdutoItem({
  estoqueProduto,
}: IEstoqueProdutoItem) {
  return (
    <View className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-900 font-semibold capitalize text-lg">
          {estoqueProduto.produtoNome}
        </Text>
        <Text className="text-gray-500 font-semibold">
          {estoqueProduto.quantidade} {estoqueProduto.unidadeMedidaSigla}
        </Text>
      </View>

      <View className="flex-row justify-between ">
        <Text className="text-gray-700">
          {formatarMoeda(estoqueProduto.preco ?? 0)}
        </Text>
      </View>
    </View>
  );
}
