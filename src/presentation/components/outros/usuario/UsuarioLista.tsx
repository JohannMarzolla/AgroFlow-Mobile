import { FlatList, ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { Usuario } from "@/domain/models/outros/Usuario";
import { UsuarioItem } from "./UsuarioItem";

export interface UsuarioListaOptions {
  usuarios: Usuario[];
  loadingMore: boolean;
  onEndReached: () => void;
  onEdit: (meta: Usuario) => void;
}

export default function UsuarioLista({
  usuarios = [],
  loadingMore,
  onEndReached,
  onEdit,
}: UsuarioListaOptions) {
  if (!usuarios?.length && !loadingMore) {
    return <Text className="text-agroflow-gray text-center">Não há dados</Text>;
  }

  return (
    <FlatList
      data={usuarios}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <UsuarioItem usuario={item} onPress={() => onEdit(item)} />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator size="large" /> : null
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
}
