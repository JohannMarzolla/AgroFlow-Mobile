import { Text, View } from "react-native";
import { Produto } from "@/domain/models/Produto";


export interface IProdutoItem {
  produto: Produto;
}

export default function ProdutoItem({ produto }: IProdutoItem) {
 
  return (
    <View className="bg-white p-4 rounded shadow-md mb-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-800 font-medium capitalize">
          {produto.nome}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-gray-800 font-semibold text-lg">
           {produto.unidadeMedida.sigla}
        </Text>
        <View className="flex-row space-x-4">
        </View>
      </View>
    </View>
  );
}
