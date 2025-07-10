import { Text, View, Pressable } from "react-native";
import { Producao } from "@/domain/models/Producao";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProducaoStackParamList } from "@/app/(protected)/features/producao/producao/ProducaoStack";

type ProducaoNavigationProp = NativeStackNavigationProp<
  ProducaoStackParamList,
  "Producao"
>;

export interface IProducaoItem {
  producao: Producao;
}

export default function ProducaoItem({ producao }: IProducaoItem) {
  const navigation = useNavigation<ProducaoNavigationProp>();

  return (
    <Pressable
      className="rounded-xl p-4 mb-3 shadow-sm bg-gray-200"
      onPress={() => navigation.navigate("ProducaoDetalhes", { producao })}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-900 font-semibold capitalize text-lg">
          {producao.produtoNome}
        </Text>
        <Text className="text-gray-700 font-semibold">
          {producao.quantidade}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-gray-800">{producao.fazendaNome}</Text>
        <Text className="text-gray-600 capitalize">{producao.status}</Text>
      </View>
    </Pressable>
  );
}
