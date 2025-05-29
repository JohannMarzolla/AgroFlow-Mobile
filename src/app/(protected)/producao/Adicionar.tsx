import { View, Text, Pressable } from "react-native";
import React from "react";
import ProdutoForm from "@/presentation/components/Produto/ProdutoForm";
import { useNavigation } from "@react-navigation/native";


export default function AdicionarProducao() {
   const navigation = useNavigation();
   
  return (
    <View className="flex-1 p-6 bg-white">
      <ProdutoForm/>
      <Pressable
        className="bg-red-500 mt-6 p-3 rounded"
         onPress={() => navigation.goBack()} 
      >
        <Text className="text-white text-center">Cancelar</Text>
      </Pressable>
    </View>
  );
}
