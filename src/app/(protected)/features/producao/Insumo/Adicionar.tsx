import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import InsumoForm from "@/presentation/components/Insumo/InsumoForm";


export default function AdicionarInsumo() {
   const navigation = useNavigation();
   
  return (
    <View className="flex-1 p-6 bg-white">
      <InsumoForm/>
      <Pressable
        className="bg-red-500 mt-6 p-3 rounded"
         onPress={() => navigation.goBack()} 
      >
        <Text className="text-white text-center">Cancelar</Text>
      </Pressable>
    </View>
  );
}
