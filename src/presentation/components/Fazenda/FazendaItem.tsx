import { Text, View } from "react-native";
import { Fazenda } from "@/domain/models/Fazenda";


export interface IFazendaItem {
  fazenda: Fazenda;
}

export default function FazendaItem({ fazenda }: IFazendaItem) {
 
  return (
    <View className="bg-white p-4 rounded shadow-md mb-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-800 font-medium capitalize">
          {fazenda.nome}
        </Text>
      </View>
    </View>
  );
}
