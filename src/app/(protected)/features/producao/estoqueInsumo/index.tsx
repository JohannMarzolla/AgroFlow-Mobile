import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import { useProducao } from "@/presentation/contexts/EstoqueInsumoContext";
import EstoqueInsumoItem from "@/presentation/components/estoqueInsumo/EstoqueInsumoItem";
import Lista from "@/shared/utils/Lista";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EstoqueInsumoStackParamList } from "./EstoqueInsumoStack";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";

type EstoqueInsumoNavigationProp = NativeStackNavigationProp<EstoqueInsumoStackParamList, "EstoqueInsumo">;

export default function EstoqueInsumo() {
  const { estoqueInsumos } = useProducao();
  const navigation = useNavigation<EstoqueInsumoNavigationProp>();
  console.log("estoque insumo item", estoqueInsumos )

  return (
    <View className="flex-1 bg-white">
        <PageHeader
        pageName="Estoque Insumo"
        showAdd={true}
        onAdicionar={() => navigation.navigate("AdicionarEstoqueInsumo")}
      ></PageHeader>
        <View className="px-6 pb-4">
        <InputSelect
          label="Tipo"
          labelTextBold={false}
          // options={MetaConsts.Tipos}
        />
       
      </View>
      <Lista
        data={estoqueInsumos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EstoqueInsumoItem estoqueInsumo={item} />}
        
      />
    </View>
  );
} 