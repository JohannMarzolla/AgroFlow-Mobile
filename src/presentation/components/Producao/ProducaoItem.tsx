import { Text, View } from "react-native";
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
          {producao.status}
        </Text>
      </View>

      <View className="flex-row justify-between ">
        <Text className="text-gray-800 font-semibold text-lg">
           {producao.quantidade}
        </Text>
         <Text className="text-gray-800 font-semibold text-lg">
           {producao.fazenda.nome}
        </Text>
       
        <Text className="text-gray-800 font-semibold text-lg">
          {new Date(producao.data).toLocaleDateString('pt-BR')}
        </Text>
      </View>
    </View>
  );
}
