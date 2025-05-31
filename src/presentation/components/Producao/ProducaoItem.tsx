import { Text, View } from "react-native";
import { Produto } from "@/domain/models/Produto";
import { Producao } from "@/domain/models/Producao";


export interface IProducaoItem {
  producao: Producao;
}

export default function ProducaoItem({ producao }: IProducaoItem) {
 
  return (
    <View className="bg-white p-4 rounded shadow-md mb-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-800 font-medium capitalize">
          {producao.produto.nome}
        </Text>
         <Text className="text-gray-800 font-medium capitalize">
          {producao.quantidade}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-gray-800 font-semibold text-lg">
           {producao.status}
        </Text>
       
        <Text className="text-gray-800 font-semibold text-lg">
          {/* Formata a data como string */}
          {new Date(producao.data).toLocaleDateString('pt-BR')}
        </Text>
        <View className="flex-row space-x-4">
        </View>
      </View>
    </View>
  );
}
