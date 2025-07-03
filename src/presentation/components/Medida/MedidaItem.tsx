import { Text, View } from "react-native";
import { Medida } from "@/domain/models/Medida";


export interface IMedidaItem {
  medida: Medida;

}

export default function MedidaItem({ medida }: IMedidaItem) {
 
  return (
    <View className="bg-white p-4 rounded shadow-md mb-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-800 font-medium capitalize">
          {medida.nome}
        </Text>
        <Text className="text-gray-800 font-medium capitalize">
          {medida.sigla}
        </Text>
      </View>
    </View>
  );
}
