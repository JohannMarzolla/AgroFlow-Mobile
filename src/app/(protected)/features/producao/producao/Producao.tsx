// produtos.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProducaoStackParamList } from "./ProducaoStack";
import { useProducao } from "@/presentation/contexts/ProducaoContext";
import Lista from "@/shared/utils/Lista";
import ProducaoItem from "@/presentation/components/Producao/ProducaoItem";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";
import { Producao as ProducaoModel } from "@/domain/models/Producao";

type ProdutosNavigationProp = NativeStackNavigationProp<ProducaoStackParamList, "Producao">;

export  function TelaDeProducao() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { producao, carregar, loading } = useProducao();
  
  return (
    <View className="flex-1 bg-white">
       <PageHeader
        pageName="Producao"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarProducao")}
      ></PageHeader>

        <View className="px-6 pb-4">
        <InputSelect
          label="Tipo"
          labelTextBold={false}
        />
       
      </View>

      <Lista
       data={producao} 
       keyExtractor={(prod)=> prod.id.toString()}  
       renderItem={({ item }) => <ProducaoItem producao={item} />}
       loadingMore={loading}
       onEndReached={() => carregar()}
       onEdit={(item: ProducaoModel) =>
        navigation.navigate("ProducaoDetalhes", { producao: item })
      }
        />
    </View>
  );
}

export default function Producao() {
  return (
      <TelaDeProducao />
  );
}