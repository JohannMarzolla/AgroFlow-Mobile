import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import MetaForm from "@/presentation/components/comercial/meta/MetaForm";

export default function AdicionarMeta() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 p-6 bg-white">
      <MetaForm onCancel={() => navigation.goBack()} />
    </View>
  );
}
