import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProdutosStackParamList } from "./ProdutosStack";
import { useProdutos } from "@/presentation/contexts/ProdutoContext";
import ProdutoItem from "@/presentation/components/Produto/ProdutoItem";
import PaginatedList from "@/presentation/components/ui/PaginatedList";
import PageHeader from "@/presentation/components/ui/PageHeader";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { UsuarioSetorEnum } from "@/domain/enum/outros/usuario.enum";
import { Produto as ProdutoModel } from "@/domain/models/Produto";

type ProdutosNavigationProp = NativeStackNavigationProp<
  ProdutosStackParamList,
  "Lista"
>;

export function TelaDeProdutos() {
  const navigation = useNavigation<ProdutosNavigationProp>();
  const { produtos, carregar, loading } = useProdutos();
  const { user } = useAuth();

  const userCanEdit =
    user?.setor === UsuarioSetorEnum.ADMIN ||
    user?.setor === UsuarioSetorEnum.PRODUCAO;

  return (
    <View className="flex-1">
      <PageHeader
        pageName="Produto"
        showAdd={userCanEdit}
        onAdicionar={() => navigation.navigate("AdicionarProduto")}
      ></PageHeader>

      <PaginatedList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProdutoItem produto={item} />}
        loadingMore={loading}
        onEndReached={() => carregar()}
        onEdit={(item: ProdutoModel) =>
          navigation.navigate("EditarProduto", { produto: item })
        }
      />
    </View>
  );
}

export default function Produtos() {
  return <TelaDeProdutos />;
}
