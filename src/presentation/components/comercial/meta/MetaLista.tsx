import { FlatList, ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { MetaItem } from "./MetaItem";
import { Meta } from "@/domain/models/comercial/Meta";
import { router } from "expo-router";

export interface MetaListaOptions {
  metas: Meta[];
  loadingMore: boolean;
  onEndReached: () => void;
  onEdit: (meta: Meta) => void;
}

export default function MetaLista({
  metas = [],
  loadingMore,
  onEndReached,
  onEdit,
}: MetaListaOptions) {
  if (!metas?.length && !loadingMore) {
    return <Text className="text-agroflow-gray text-center">Não há dados</Text>;
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <MetaItem meta={item} onPress={() => onEdit(item)} />
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
