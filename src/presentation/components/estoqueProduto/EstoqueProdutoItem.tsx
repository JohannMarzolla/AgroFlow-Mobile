import { Text, View } from "react-native";
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";


export interface IEstoqueProdutoItem {
  estoqueProduto: EstoqueProduto;
}

export default function EstoqueProdutoItem({ estoqueProduto }: IEstoqueProdutoItem) {
 
  return (
    <View className="bg-white p-4 rounded shadow-md mb-4">
      
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-800 font-medium capitalize">
          {estoqueProduto.produtoNome}
        </Text>
        <Text className="text-gray-800 font-semibold text-lg">
           {estoqueProduto.unidadeMedidaSigla}
        </Text>
      </View>

      <View className="flex-row justify-between ">
        <Text className="text-gray-800 font-semibold text-lg">
           {estoqueProduto.quantidade}
        </Text>
       
       
      </View>
    </View>
  );
}
