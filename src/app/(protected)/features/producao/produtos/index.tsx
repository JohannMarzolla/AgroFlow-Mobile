// produtos.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProdutosStackParamList } from "./ProdutosStack"; 
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import ProdutoItem from "@/presentation/components/Produto/ProdutoItem";
import Lista from "@/shared/utils/Lista";
import PageHeader from "@/presentation/components/ui/PageHeader";
import InputSelect from "@/presentation/components/ui/InputSelect";


type ProdutosNavigationProp = NativeStackNavigationProp<ProdutosStackParamList, "Produtos">;

export  function TelaDeProdutos() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { produtos , carregar, loading} = useProdutos();


  return (
    <View className="flex-1 bg-white">
    <PageHeader
    pageName="Produto"
    showAdd={true}
    onAdicionar={() => navigation.navigate("AdicionarProduto")}
  >
    
  </PageHeader>

    <View className="px-6 pb-4">
    <InputSelect
      label="Tipo"
      labelTextBold={false}
      
    />
   
  </View>

  <Lista
       data={produtos} 
       keyExtractor={(item)=> item.id.toString()}  
       renderItem={({ item }) => <ProdutoItem produto={item} />}
       loadingMore={loading}
       onEndReached={() => carregar()}
      //  onEdit={(item: ProducaoModel) =>
      //   navigation.navigate("ProducaoDetalhes", { producao: item })
      // }
        />
    </View>
  );
}

export default function Produtos() {
  return (
      <TelaDeProdutos />
  );
}