import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ProducaoForm from "@/presentation/components/Producao/ProducaoForm";


export default function AdicionarProducao() {
   const navigation = useNavigation();
   
  return (
    <View className="flex-1 p-6 bg-white">
      <ProducaoForm/>
      <Pressable
        className="bg-red-500 mt-6 p-3 rounded"
         onPress={() => navigation.goBack()} 
      >
        <Text className="text-white text-center">Cancelar</Text>
      </Pressable>
    </View>
  );
}
