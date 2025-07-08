import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Lista from "@/shared/utils/Lista";
import { useInsumo } from "@/presentation/contexts/InsumoContext";
import InsumoItem from "@/presentation/components/Insumo/InsumoItem";
import { InsumoStackParamList } from "./InsumoStack";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";

type InsumoNavigationProp = NativeStackNavigationProp<InsumoStackParamList, "Insumo">;

export  function TelaDeProducao() {
  const navigation = useNavigation<InsumoNavigationProp>();
  const { insumos } = useInsumo();

  
  return (
    <View className="flex-1 bg-white">
    <PageHeader
    pageName="Insumo"
    showAdd={true}
    onAdicionar={() => navigation.navigate("AdicionarInsumo")}
  ></PageHeader>
    <View className="px-6 pb-4">
    <InputSelect
      label="Tipo"
      labelTextBold={false}
      // options={MetaConsts.Tipos}
    />
   
  </View>

      <Lista data={insumos} keyExtractor={(item)=> item.id.toString()}  renderItem={({ item }) => <InsumoItem insumo={item} /> } />
    </View>
  );
}

export default function Insumo() {
  return (
      <TelaDeProducao />
  );
}