import { FlatList} from "react-native";
import { Text } from "react-native";
import { Produto } from "@/domain/models/Produto";
import ProdutoItem from "../Produto/ProdutoItem";

export interface IListaProdutos {
  produtos: Produto[];
}

export default function ListaProdutos({produtos}: IListaProdutos) {
  if (!produtos?.length ) {
    return (
      <Text className="text-fiap-gray text-center">Não há produtos</Text>
    );
  }

  console.log("produtos em LIsta produtos", produtos)
  return (
    <FlatList
  style={{ flex: 1 }}
  keyExtractor={(produto) => produto.id as string}
  data={produtos}
  extraData={produtos} // 👈 Isso força a FlatList a re-renderizar quando `produtos` mudar
  renderItem={({ item }) => <ProdutoItem produto={item} />}
  onEndReachedThreshold={0.1}
  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
/>
)}