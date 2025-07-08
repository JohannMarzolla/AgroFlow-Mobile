import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Lista from "@/shared/utils/Lista";
import { useFazenda } from "@/presentation/contexts/FazendaContext";
import { FazendaStackParamList } from "./FazendaStack";
import FazendaItem from "@/presentation/components/Fazenda/FazendaItem";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";

type ProdutosNavigationProp = NativeStackNavigationProp<FazendaStackParamList, "Fazenda">;

export  function TelaDeProducao() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { fazenda } = useFazenda();
  
  return (
    <View className="flex-1 bg-white">
        <PageHeader
        pageName="Fazenda"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarFazenda")}
      ></PageHeader>
        <View className="px-6 pb-4">
        <InputSelect
          label="Tipo"
          labelTextBold={false}
          // options={MetaConsts.Tipos}
        />
       
      </View>
      <Lista data={fazenda} keyExtractor={(item)=> item.id.toString()}  renderItem={({ item }) => <FazendaItem fazenda={item} /> } />
    </View>
  );
}

export default function Fazenda() {
  return (
      <TelaDeProducao />
  );
}