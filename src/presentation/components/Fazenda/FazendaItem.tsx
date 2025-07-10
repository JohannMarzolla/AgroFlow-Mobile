import { Text, View } from "react-native";
import { Fazenda } from "@/domain/models/Fazenda";

export interface IFazendaItem {
  fazenda: Fazenda;
}

export default function FazendaItem({ fazenda }: IFazendaItem) {
  return (
    <View className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200">
      <View className="flex-row justify-between">
        <Text className="font-semibold text-gray-900 capitalize text-lg">
          {fazenda.nome}
        </Text>
      </View>
    </View>
  );
}
