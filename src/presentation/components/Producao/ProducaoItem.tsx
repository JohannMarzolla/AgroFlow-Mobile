import { Text, View, Pressable } from "react-native";
import { Producao } from "@/domain/models/Producao";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProducaoStackParamList } from "@/app/(protected)/features/producaoModulo/producao/ProducaoStack";

type ProducaoNavigationProp = NativeStackNavigationProp<ProducaoStackParamList, "Producao">;

export interface IProducaoItem {
  producao: Producao;
}

export default function ProducaoItem({ producao }: IProducaoItem) {
  const navigation = useNavigation<ProducaoNavigationProp>();
 
  return (
    <Pressable 
      className="bg-white p-4 rounded shadow-md mb-4"
      onPress={() => navigation.navigate("ProducaoDetalhes", { producao })}
    >
      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-800 font-medium capitalize">
          {producao.produtoNome}
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
           {producao.fazendaNome}
        </Text>
      </View>
    </Pressable>
  );
}
