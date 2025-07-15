import { Text, View } from "react-native";
import { Producao } from "@/domain/models/Producao";



export interface IProducaoItem {
  producao: Producao;
}

export default function ProducaoItem({ producao }: IProducaoItem) {

  return (

    <View className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-900 font-semibold capitalize text-lg">
          {producao.produtoNome}
        </Text>
        <Text className="text-gray-700 font-semibold">
          {producao.quantidadePlanejada}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-gray-800">{producao.fazendaNome}</Text>
        <Text className="text-gray-600 capitalize">{producao.status}</Text>
      </View>
      </View>
   
  );
}
