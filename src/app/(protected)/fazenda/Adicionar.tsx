import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import FazendaForm from "@/presentation/components/Fazenda/FazendaForm";


export default function AdicionarFazenda() {
   const navigation = useNavigation();
   
  return (
    <View className="flex-1 p-6 bg-white">
      <FazendaForm/>
      <Pressable
        className="bg-red-500 mt-6 p-3 rounded"
         onPress={() => navigation.goBack()} 
      >
        <Text className="text-white text-center">Cancelar</Text>
      </Pressable>
    </View>
  );
}
