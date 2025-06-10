import { Insumo } from "@/domain/models/Insumo";
import { Text, View } from "react-native";



export interface IinsumoItem {
  insumo: Insumo;
}

export default function InsumoItem({ insumo }: IinsumoItem){


    return (
       <View className="bg-white p-4 rounded shadow-md mb-4">
         <View className="flex-row justify-between mb-2">
           <Text className="text-gray-800 font-medium capitalize">
             {insumo.nome}
           </Text>
           <Text className="text-gray-800 font-medium capitalize">
             {insumo.unidadeMedida.sigla}
           </Text>
         </View>
       </View>
     );
}