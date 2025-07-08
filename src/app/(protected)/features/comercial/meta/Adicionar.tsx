import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import MetaForm from "@/presentation/components/comercial/meta/MetaForm";
import PageHeader from "@/presentation/components/ui/PageHeader";

export default function AdicionarMeta() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <PageHeader pageName="Adicionar meta"></PageHeader>
      <MetaForm onCancel={() => navigation.goBack()} />
    </View>
  );
}
